package com.muralis.rinhacontrolesubmissoes.core.domain.entity;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTypeConverted;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTypeConvertedEnum;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.muralis.rinhacontrolesubmissoes.core.domain.mapper.LocalDateTimeConverter;
import lombok.*;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@DynamoDBTable(tableName = "CadastroUsuarioRinha")
@Getter
@Setter
public class Usuario {

	@DynamoDBHashKey(attributeName = "id")
	private String id;

	@DynamoDBTypeConverted(converter = LocalDateTimeConverter.class)
	@JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss")
	@Builder.Default
	private LocalDateTime dataCadastro = LocalDateTime.now();

	@DynamoDBTypeConvertedEnum
	private Categoria categoria;

}
