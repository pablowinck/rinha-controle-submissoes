package com.muralis.rinhacontrolesubmissoes.core.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.muralis.rinhacontrolesubmissoes.core.domain.entity.ArquivoSubmissao;
import com.muralis.rinhacontrolesubmissoes.core.domain.entity.Categoria;
import com.muralis.rinhacontrolesubmissoes.core.domain.entity.Submissao;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SubmeterAplicacaoCommand {

	@NotNull(message = "O campo userId é obrigatório")
	@NotBlank(message = "O campo userId é obrigatório")
	private String userId;

	@JsonIgnore
	private Categoria categoria;

	@NotNull(message = "O campo linguagem é obrigatório")
	@NotBlank(message = "O campo linguagem é obrigatório")
	private String linguagem;

	@NotNull(message = "O campo arquivo é obrigatório")
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
