package com.muralis.rinhacontrolesubmissoes.core.domain.repository;

import com.muralis.rinhacontrolesubmissoes.core.domain.entity.Submissao;
import org.springframework.cache.annotation.CacheEvict;

import java.util.List;
import java.util.Optional;

public interface SubmissaoRepository {

	Optional<Submissao> findById(String id);

	@CacheEvict(value = "ultimasSubmissoes", key = "#submissao.userId")
	Submissao save(Submissao submissao);

	void deleteById(String id);

    List<Submissao> findAllByUserIdOrderByDataEnvioDesc(String userId);
}
