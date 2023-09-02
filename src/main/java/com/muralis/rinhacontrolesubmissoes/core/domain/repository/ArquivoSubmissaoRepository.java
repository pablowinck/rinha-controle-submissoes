package com.muralis.rinhacontrolesubmissoes.core.domain.repository;

import com.muralis.rinhacontrolesubmissoes.core.domain.entity.ArquivoSubmissao;

import java.util.Optional;

public interface ArquivoSubmissaoRepository {

	Optional<ArquivoSubmissao> findById(String id);

	void save(ArquivoSubmissao arquivoSubmissao);

	void deleteById(String id);

}
