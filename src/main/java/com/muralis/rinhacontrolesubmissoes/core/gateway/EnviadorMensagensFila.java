package com.muralis.rinhacontrolesubmissoes.core.gateway;

import com.muralis.rinhacontrolesubmissoes.core.dto.ProcessarSubmissaoCommand;
import com.muralis.rinhacontrolesubmissoes.core.events.SubmissaoSalva;
import org.springframework.context.event.EventListener;

import java.util.logging.Logger;

public interface EnviadorMensagensFila {

	Logger log = Logger.getLogger(EnviadorMensagensFila.class.getName());

	<T> void enviar(String nomeFila, T mensagem);

	@EventListener
	default void on(SubmissaoSalva event) {
		log.info("Enviando mensagem para fila ProcessaSubmissaoRinha: " + event.getSubmissao().getId());
		enviar("ProcessaSubmissaoRinha", new ProcessarSubmissaoCommand(event.getSubmissao().getId()));
		log.info("Mensagem enviada para fila ProcessaSubmissaoRinha: " + event.getSubmissao().getId());
	}

}
