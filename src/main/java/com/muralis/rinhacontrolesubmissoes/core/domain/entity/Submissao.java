package com.muralis.rinhacontrolesubmissoes.core.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
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
