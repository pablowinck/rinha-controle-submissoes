package com.muralis.rinhacontrolesubmissoes.core.events;

import com.muralis.rinhacontrolesubmissoes.core.domain.entity.Submissao;
import org.springframework.context.ApplicationEvent;

public class SubmissaoSalva extends ApplicationEvent {

	public SubmissaoSalva(Submissao submissao) {
		super(submissao);
	}

	public Submissao getSubmissao() {
		return (Submissao) this.getSource();
	}

}
