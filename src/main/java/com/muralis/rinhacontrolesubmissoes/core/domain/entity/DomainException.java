package com.muralis.rinhacontrolesubmissoes.core.domain.entity;

import lombok.Getter;
import lombok.extern.log4j.Log4j2;

@Log4j2
@Getter
public class DomainException extends RuntimeException {

	private final int statusCode;

	public DomainException(String message, int statusCode) {
		super(message);
		this.statusCode = statusCode;
	}

	public static DomainException NOT_FOUND() {
		return new DomainException("Registro não encontrado", 404);
	}

	public static DomainException SUBMISSAO_NOT_FOUND() {
		return new DomainException("Submissão não encontrada", 404);
	}

	public static DomainException USUARIO_CADASTRADO() {
		return new DomainException("Usuário já cadastrado", 400);
	}

	public static DomainException USUARIO_NAO_CADASTRADO() {
		return new DomainException("Usuário não cadastrado", 400);
	}

}
