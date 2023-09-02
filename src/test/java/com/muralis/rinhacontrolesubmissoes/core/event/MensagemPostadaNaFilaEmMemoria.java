package com.muralis.rinhacontrolesubmissoes.core.event;

import org.springframework.context.ApplicationEvent;

public class MensagemPostadaNaFilaEmMemoria extends ApplicationEvent {

	private String nomeFila;

	public <T> MensagemPostadaNaFilaEmMemoria(String nomeFila, T mensagem) {
		super(mensagem);
	}

	public String getNomeFila() {
		return nomeFila;
	}

	public <T> T getMensagem() {
		return (T) this.getSource();
	}

}
