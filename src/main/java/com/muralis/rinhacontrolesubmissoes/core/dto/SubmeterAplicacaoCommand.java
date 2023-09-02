package com.muralis.rinhacontrolesubmissoes.core.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.muralis.rinhacontrolesubmissoes.core.domain.entity.ArquivoSubmissao;
import com.muralis.rinhacontrolesubmissoes.core.domain.entity.Categoria;
import com.muralis.rinhacontrolesubmissoes.core.domain.entity.Submissao;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SubmeterAplicacaoCommand {

	private String userId;

	private Categoria categoria;

	private String linguagem;

	private MultipartFile arquivo;

	@JsonIgnore
	private final String id = UUID.randomUUID().toString();

	public Submissao toSubmissao() {
		return Submissao.builder().id(id).userId(userId).linguagem(linguagem).categoria(categoria).build();
	}

	@SneakyThrows
	public ArquivoSubmissao toArquivoSubmissao() {
		return ArquivoSubmissao.builder().id(id).inputStream(arquivo.getInputStream()).build();
	}

}
