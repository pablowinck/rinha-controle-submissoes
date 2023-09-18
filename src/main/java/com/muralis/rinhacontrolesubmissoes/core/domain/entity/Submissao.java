package com.muralis.rinhacontrolesubmissoes.core.domain.entity;

import com.amazonaws.services.dynamodbv2.datamodeling.*;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.muralis.rinhacontrolesubmissoes.core.domain.mapper.LocalDateTimeConverter;
import com.muralis.rinhacontrolesubmissoes.core.domain.service.CLIRunner;
import com.muralis.rinhacontrolesubmissoes.core.dto.ScoreDTO;
import lombok.*;

import java.io.File;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.LocalDateTime;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@DynamoDBTable(tableName = "SubmissoesRinha")
@Getter
@Setter
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

	private String nota;

	private String quantidadePessoasInseridas;

	@DynamoDBIgnore
	@JsonIgnore
	public String getNomeArquivo() {
		return id + ".yml";
	}

	@DynamoDBIgnore
	public boolean isInvalidaParaProcessamento() {
		return situacao.equals(SituacaoSubmissao.SUCESSO) || situacao.equals(SituacaoSubmissao.PROCESSANDO);
	}

	@SneakyThrows
	public synchronized void processar(ArquivoSubmissao arquivoSubmissao) {
		InputStream inputStream = arquivoSubmissao.toInputStream();
		Path tempDirectory = Files.createTempDirectory(id);
		File tempFile = new File(tempDirectory.toString() + "/" + arquivoSubmissao.getNomeArquivo());
		Files.copy(inputStream, tempFile.toPath());
		var compiladorUrl = getClass().getClassLoader().getResource("compilador-metricas");
		CLIRunner.getInstance()
			.add("docker rm -f $(docker ps -a -q)")
			.add("docker volume rm $(docker volume ls -q)")
			.add("sleep 5")
			.add("docker-compose -f " + tempFile + " up -d")
			.add(compiladorUrl.getPath() + "/healthcheck.sh")
			.add("nohup k6 run " + compiladorUrl.getPath() + "/index.js --summary-export=" + compiladorUrl.getPath()
					+ "/summary.json &> " + compiladorUrl.getPath() + "/k6.log &")
			.add(compiladorUrl.getPath() + "/wait-for-file.sh " + compiladorUrl.getPath() + "/summary.json")
			.add("node " + compiladorUrl.getPath() + "/compilar-nota.js " + compiladorUrl.getPath() + "/summary.json "
					+ compiladorUrl.getPath() + "/score.json")
			.add("sleep 5")
			.add("docker-compose -f " + tempFile + " down --volumes")
			.add("docker rm -f $(docker ps -a -q)")
			.add("docker volume rm $(docker volume ls -q)")
			.add("rm -rf " + tempDirectory)
			.run();
		var score = Files.readString(Path.of(compiladorUrl.getPath() + "/score.json"));
		ObjectMapper objectMapper = new ObjectMapper();
		var scoreDTO = objectMapper.readValue(score, ScoreDTO.class);
		this.nota = scoreDTO.score().toString();
		this.quantidadePessoasInseridas = scoreDTO.count().toString();
		CLIRunner.getInstance()
			.add("rm -rf " + compiladorUrl.getPath() + "/score.json")
			.add("rm -rf " + compiladorUrl.getPath() + "/summary.json")
			.run();
		this.situacao = SituacaoSubmissao.SUCESSO;
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
