package com.muralis.rinhacontrolesubmissoes.outbound.memory;

import com.muralis.rinhacontrolesubmissoes.core.event.MensagemPostadaNaFilaEmMemoria;
import com.muralis.rinhacontrolesubmissoes.core.gateway.EnviadorMensagensFila;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

@Service
@Profile("test")
public class MemoryEnviadorMensagensFila implements EnviadorMensagensFila {

	private final ApplicationEventPublisher publisher;

	public MemoryEnviadorMensagensFila(ApplicationEventPublisher publisher) {
		this.publisher = publisher;
	}

	@Override
	public <T> void enviar(String nomeFila, T mensagem) {
		this.publisher.publishEvent(new MensagemPostadaNaFilaEmMemoria(nomeFila, mensagem));
	}

}
