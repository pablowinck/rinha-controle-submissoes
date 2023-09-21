package com.muralis.rinhacontrolesubmissoes.core.domain.entity;

import com.amazonaws.services.dynamodbv2.datamodeling.*;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.muralis.rinhacontrolesubmissoes.core.domain.mapper.LocalDateTimeConverter;
import com.muralis.rinhacontrolesubmissoes.core.domain.service.CLIRunner;
import com.muralis.rinhacontrolesubmissoes.core.dto.ScoreDTO;
import lombok.*;
import lombok.extern.log4j.Log4j2;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.nio.file.attribute.PosixFileAttributes;
import java.nio.file.attribute.PosixFilePermission;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Set;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@DynamoDBTable(tableName = "SubmissoesRinha")
@Getter
@Setter
@Log4j2
public class Submissao {

	@DynamoDBHashKey(attributeName = "id")
	private String id;

	@Builder.Default
	@DynamoDBTypeConvertedEnum
	private SituacaoSubmissao situacao = SituacaoSubmissao.AGUARDANDO_PROCESSAMENTO;

	@Builder.Default
	@DynamoDBTypeConverted(converter = LocalDateTimeConverter.class)
	@JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss")
	@DynamoDBIndexRangeKey(globalSecondaryIndexName = "userId-index", attributeName = "dataEnvio")
	private LocalDateTime dataEnvio = LocalDateTime.now();

	@DynamoDBIndexHashKey(globalSecondaryIndexName = "userId-index", attributeName = "userId")
	private String userId;

	private String linguagem;

	@DynamoDBTypeConvertedEnum
	private Categoria categoria;

	private Double nota;

	private HashMap<String, String> metricas;

	@DynamoDBIgnore
	@JsonIgnore
	public String getNomeArquivo() {
		return id + ".yml";
	}

	@DynamoDBIgnore
	@JsonIgnore
	public boolean isInvalidaParaProcessamento() {
		return situacao.equals(SituacaoSubmissao.SUCESSO) || situacao.equals(SituacaoSubmissao.PROCESSANDO);
	}

	@SneakyThrows
	public synchronized void processar(ArquivoSubmissao arquivoSubmissao) {
		InputStream inputStream = arquivoSubmissao.toInputStream();
		Path tempDirectory = Files.createTempDirectory(id);
		File tempFile = new File(tempDirectory.toString() + "/" + arquivoSubmissao.getNomeArquivo());
		Files.copy(inputStream, tempFile.toPath());
		Path healthcheck = createTempFileFromResource("compilador-metricas/healthcheck", "sh", tempDirectory);
		Path k6Index = createTempFileFromResource("compilador-metricas/index", "js", tempDirectory);
		Path waitforfile = createTempFileFromResource("compilador-metricas/wait-for-file", "sh", tempDirectory);
		Path compilarNota = createTempFileFromResource("compilador-metricas/compilar-nota", "js", tempDirectory);
		Path summary = createOutputPath("summary.json", tempDirectory);
		Path k6Logs = createOutputPath("k6.log", tempDirectory);
		Path scoreOutput = createOutputPath("score.json", tempDirectory);
		CLIRunner.getInstance()
			.add("docker rm -f $(docker ps -a -q)")
			.add("docker volume rm $(docker volume ls -q)")
			.add("sleep 5")
			.add("docker-compose -f " + tempFile + " rm -f")
			.add("docker-compose -f " + tempFile + " build --pull")
			.add("yes Y | docker-compose -f " + tempFile + " up -d")
			.add(healthcheck.toString())
			.add("nohup k6 run " + k6Index + " --summary-export=" + summary + " &> " + k6Logs + " &")
			.add(waitforfile + " " + summary)
			.add("node " + compilarNota + " " + summary + " " + scoreOutput)
			.add(waitforfile + " " + scoreOutput)
			.add("sleep 5")
			.add("docker-compose -f " + tempFile + " down --volumes")
			.add("docker rm -f $(docker ps -a -q)")
			.add("docker volume rm $(docker volume ls -q)")
			.run();
		var score = Files.readString(scoreOutput);
		ObjectMapper objectMapper = new ObjectMapper();
		objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
		var scoreDTO = objectMapper.readValue(score, ScoreDTO.class);
		this.nota = scoreDTO.score();
		this.metricas = new HashMap<>();
		this.metricas.put("performance", scoreDTO.performance().toString());
		this.metricas.put("correctness", scoreDTO.correctness().toString());
		this.metricas.put("stability", scoreDTO.stability().toString());
		Files.deleteIfExists(tempFile.toPath());
		this.situacao = SituacaoSubmissao.SUCESSO;
	}

	private Path createTempFileFromResource(String resource, String extension, Path tempDirectory) {
		String fileName = resource.split("/")[1];
		try (InputStream inputStream = getClass().getClassLoader()
			.getResourceAsStream(resource.concat(".").concat(extension))) {
			Path tempFile = Files.createTempFile(tempDirectory, fileName, "." + extension);
			assert inputStream != null;
			Files.copy(inputStream, tempFile, StandardCopyOption.REPLACE_EXISTING);
			allowPermissions(tempFile);
			return tempFile;
		}
		catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	private void allowPermissions(Path tempFile) throws IOException {
		Set<PosixFilePermission> perms = Files.readAttributes(tempFile, PosixFileAttributes.class).permissions();
		perms.add(PosixFilePermission.OWNER_WRITE);
		perms.add(PosixFilePermission.OWNER_READ);
		perms.add(PosixFilePermission.OWNER_EXECUTE);
		perms.add(PosixFilePermission.GROUP_WRITE);
		perms.add(PosixFilePermission.GROUP_READ);
		perms.add(PosixFilePermission.GROUP_EXECUTE);
		perms.add(PosixFilePermission.OTHERS_WRITE);
		perms.add(PosixFilePermission.OTHERS_READ);
		perms.add(PosixFilePermission.OTHERS_EXECUTE);
		Files.setPosixFilePermissions(tempFile, perms);
	}

	private Path createOutputPath(String filename, Path tempDirectory) {
		try {
			return new File(String.valueOf(tempDirectory.resolve(filename))).toPath();
		}
		catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	public Ranking toRanking() {
		return Ranking.builder()
			.id(UUID.randomUUID().toString())
			.dataEnvio(dataEnvio)
			.userId(userId)
			.linguagem(linguagem)
			.categoria(categoria)
			.nota(nota)
			.build();
	}

}
