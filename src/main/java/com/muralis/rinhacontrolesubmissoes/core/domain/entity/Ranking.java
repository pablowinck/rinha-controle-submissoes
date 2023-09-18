package com.muralis.rinhacontrolesubmissoes.core.domain.entity;

import com.amazonaws.services.dynamodbv2.datamodeling.*;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.muralis.rinhacontrolesubmissoes.core.domain.mapper.LocalDateTimeConverter;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@DynamoDBTable(tableName = "RankingRinha")
@Getter
@Setter
public class Ranking {

	@DynamoDBHashKey(attributeName = "id")
	private String id;

	@DynamoDBTypeConverted(converter = LocalDateTimeConverter.class)
	@JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss")
	private LocalDateTime dataEnvio;

	private String userId;

	private String linguagem;

	@DynamoDBTypeConvertedEnum
	@DynamoDBIndexHashKey(globalSecondaryIndexName = "categoria-nota-index", attributeName = "categoria")
	private Categoria categoria;

	@DynamoDBIndexRangeKey(globalSecondaryIndexName = "categoria-nota-index", attributeName = "nota")
	private String nota;

	@DynamoDBIgnore
	public boolean notaMaiorQue(String notaParaComparar) {
		BigDecimal nota = new BigDecimal(this.nota);
		BigDecimal notaComparar = new BigDecimal(notaParaComparar);
		return nota.compareTo(notaComparar) > 0;
	}

	public void atualizar(Submissao submissao) {
		this.dataEnvio = submissao.getDataEnvio();
		this.linguagem = submissao.getLinguagem();
		this.categoria = submissao.getCategoria();
		this.nota = submissao.getNota();
		this.userId = submissao.getUserId();
	}

}
