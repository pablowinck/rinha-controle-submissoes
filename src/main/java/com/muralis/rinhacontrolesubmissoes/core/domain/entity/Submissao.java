package com.muralis.rinhacontrolesubmissoes.core.domain.entity;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class Submissao {

	@Getter
	private String id;

	@Builder.Default
	private SituacaoSubmissao situacao = SituacaoSubmissao.AGUARDANDO_PROCESSAMENTO;

	private String dataEnvio;

	private String userId;

	private String linguagem;

	private Categoria categoria;

	private String nota;

	private String quantidadePessoasInseridas;

	public String getNomeArquivo() {
		return id + ".yml";
	}

}
