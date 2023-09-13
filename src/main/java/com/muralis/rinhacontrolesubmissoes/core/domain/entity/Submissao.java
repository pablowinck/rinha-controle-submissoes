package com.muralis.rinhacontrolesubmissoes.core.domain.entity;

import com.amazonaws.services.dynamodbv2.datamodeling.*;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.muralis.rinhacontrolesubmissoes.core.domain.mapper.LocalDateTimeConverter;
import com.muralis.rinhacontrolesubmissoes.core.domain.service.CLIRunner;
import lombok.*;

import java.io.File;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.LocalDateTime;

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
	private LocalDateTime dataEnvio = LocalDateTime.now();

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

	public boolean isInvalidaParaProcessamento() {
		return situacao.equals(SituacaoSubmissao.SUCESSO) || situacao.equals(SituacaoSubmissao.PROCESSANDO);
	}

	@SneakyThrows
	public void processar(ArquivoSubmissao arquivoSubmissao) {
		this.situacao = SituacaoSubmissao.PROCESSANDO;
		InputStream inputStream = arquivoSubmissao.toInputStream();
		Path tempDirectory = Files.createTempDirectory(id);
		File tempFile = new File(tempDirectory.toString() + "/" + arquivoSubmissao.getNomeArquivo());
		Files.copy(inputStream, tempFile.toPath());
		var compiladorUrl = getClass().getClassLoader().getResource("compilador-metricas/index.js");
		CLIRunner.getInstance()
			.add("docker-compose -f " + tempFile + " up -d", null)
			.add("k6 run --out json=output.json " + compiladorUrl.getPath() + " --summary-export " + id + ".json",
					"output.json")
			.run();

	}

}
