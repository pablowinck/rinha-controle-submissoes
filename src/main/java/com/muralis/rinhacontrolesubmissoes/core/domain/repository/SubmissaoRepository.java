package com.muralis.rinhacontrolesubmissoes.core.domain.repository;

import com.muralis.rinhacontrolesubmissoes.core.domain.entity.Submissao;

import java.util.Optional;

public interface SubmissaoRepository {

	Optional<Submissao> findById(String id);

	Submissao save(Submissao submissao);

	void deleteById(String id);

}
