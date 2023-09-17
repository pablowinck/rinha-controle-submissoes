package com.muralis.rinhacontrolesubmissoes.inbound.listener;

import com.amazon.sqs.javamessaging.message.SQSTextMessage;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.muralis.rinhacontrolesubmissoes.core.dto.ProcessarSubmissaoCommand;
import com.muralis.rinhacontrolesubmissoes.core.usecase.ProcessarSubmissao;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.context.annotation.Profile;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.stereotype.Component;

import javax.jms.JMSException;
import java.util.Objects;

@Component
@Profile("!test")
@RequiredArgsConstructor
@Log4j2
public class RinhaListener {

    private final ObjectMapper objectMapper;

    private final ProcessarSubmissao processarSubmissao;

    @JmsListener(destination = "ProcessaSubmissaoRinha")
    public void listenSQS(SQSTextMessage message) throws JMSException, JsonProcessingException {
        var text = message.getText();
        if (Objects.isNull(text)) {
            log.error("Mensagem inválida recebida do SQS");
            message.acknowledge();
            return;
        }
        var dto = objectMapper.readValue(text, ProcessarSubmissaoCommand.class);
        log.info("Recebendo mensagem do SQS: {}", dto);
        processarSubmissao.execute(dto.getId());
        message.acknowledge();
    }
}
