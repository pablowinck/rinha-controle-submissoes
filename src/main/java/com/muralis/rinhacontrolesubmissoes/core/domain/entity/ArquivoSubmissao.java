package com.muralis.rinhacontrolesubmissoes.core.domain.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.SneakyThrows;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;

@Getter
public class ArquivoSubmissao extends ByteArrayOutputStream {

	private final String id;

	@Builder
	@SneakyThrows
	public ArquivoSubmissao(String id, InputStream inputStream) {
		this.id = id;
		if (inputStream != null)
			inputStream.transferTo(this);
	}

	public String getNomeArquivo() {
		return id + ".yml";
	}

	@Override
	public String toString() {
		return "ArquivoSubmissao (id=" + id + ")";
	}

	public InputStream toInputStream() {
		return new ByteArrayInputStream(this.toByteArray());
	}

}
