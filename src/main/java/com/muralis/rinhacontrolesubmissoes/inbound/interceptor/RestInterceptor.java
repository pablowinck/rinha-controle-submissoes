package com.muralis.rinhacontrolesubmissoes.inbound.interceptor;

import com.muralis.rinhacontrolesubmissoes.core.domain.entity.DomainException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.NoHandlerFoundException;

@RestControllerAdvice
@Slf4j
public class RestInterceptor {

	@ExceptionHandler(MissingServletRequestParameterException.class)
	protected ResponseEntity<ResponseWithMessage> handleMissingServletRequestParameter(
			MissingServletRequestParameterException ex) {
		String message = "O campo " + ex.getParameterName() + " é obrigatório.";
		log.error(message);
		return ResponseEntity.status(HttpStatus.BAD_REQUEST)
			.body(ResponseWithMessage.builder().mensagem(message).build());
	}

	@ExceptionHandler(HttpMessageNotReadableException.class)
	protected ResponseEntity<ResponseWithMessage> handleMessageNotReadable() {
		String message = "O corpo da requisição não pôde ser lido.";
		log.error(message);
		return ResponseEntity.status(HttpStatus.BAD_REQUEST)
			.body(ResponseWithMessage.builder().mensagem(message).build());
	}

	@ExceptionHandler(NoHandlerFoundException.class)
	protected ResponseEntity<ResponseWithMessage> handleNoHandlerFoundException() {
		String message = "Recurso não encontrado.";
		log.error(message);
		return ResponseEntity.status(HttpStatus.NOT_FOUND)
			.body(ResponseWithMessage.builder().mensagem(message).build());
	}

	@ExceptionHandler(HttpRequestMethodNotSupportedException.class)
	protected ResponseEntity<ResponseWithMessage> handleHttpRequestMethodNotSupported() {
		String message = "O método HTTP na solicitação não é permitido no resurso.";
		log.error(message);
		return ResponseEntity.status(HttpStatus.METHOD_NOT_ALLOWED)
			.body(ResponseWithMessage.builder().mensagem(message).build());
	}

	@ExceptionHandler(DomainException.class)
	protected ResponseEntity<ResponseWithMessage> handleDomainException(DomainException ex) {
		log.error(ex.getMessage());
		return ResponseEntity.status(ex.getStatusCode())
			.body(ResponseWithMessage.builder().mensagem(ex.getMessage()).build());
	}

}
