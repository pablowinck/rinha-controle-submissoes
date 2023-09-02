package com.muralis.rinhacontrolesubmissoes.core.domain.entity;

import com.amazonaws.services.dynamodbv2.datamodeling.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.muralis.rinhacontrolesubmissoes.core.domain.mapper.LocalDateTimeConverter;
import lombok.*;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@DynamoDBTable(tableName = "SubmissoesRinha")
@Getter
public class Submissao {

	@DynamoDBHashKey(attributeName = "id")
	private String id;

	@Builder.Default
	@DynamoDBTypeConvertedEnum
	private SituacaoSubmissao situacao = SituacaoSubmissao.AGUARDANDO_PROCESSAMENTO;

	@Builder.Default
	@DynamoDBTypeConverted(converter = LocalDateTimeConverter.class)
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

}
