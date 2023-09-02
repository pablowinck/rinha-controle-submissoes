package com.muralis.rinhacontrolesubmissoes.outbound.sqs.gateway;

import com.muralis.rinhacontrolesubmissoes.core.gateway.EnviadorMensagensFila;
import io.awspring.cloud.messaging.core.QueueMessagingTemplate;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

@Component
@Profile("!test")
public class SQSGateway implements EnviadorMensagensFila {

	private final QueueMessagingTemplate messagingTemplate;

	public SQSGateway(QueueMessagingTemplate messagingTemplate) {
		this.messagingTemplate = messagingTemplate;
	}

	@Override
	public <T> void enviar(String nomeFila, T mensagem) {
		messagingTemplate.convertAndSend(nomeFila, mensagem);
	}

}
