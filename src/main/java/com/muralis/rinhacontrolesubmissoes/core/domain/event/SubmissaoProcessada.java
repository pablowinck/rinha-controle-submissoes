package com.muralis.rinhacontrolesubmissoes.core.domain.event;

import com.muralis.rinhacontrolesubmissoes.core.domain.entity.Submissao;
import org.springframework.context.ApplicationEvent;

public class SubmissaoProcessada extends ApplicationEvent {

	public SubmissaoProcessada(Submissao submissao) {
		super(submissao);
	}

	public Submissao getSubmissao() {
		return (Submissao) getSource();
	}

}
