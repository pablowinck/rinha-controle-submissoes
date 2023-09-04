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

}
