package com.muralis.rinhacontrolesubmissoes.outbound.memory;

import com.muralis.rinhacontrolesubmissoes.core.domain.entity.Submissao;
import com.muralis.rinhacontrolesubmissoes.core.domain.repository.SubmissaoRepository;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
@Profile("test")
public class SubmissaoMemoryRepository implements SubmissaoRepository {

	private final List<Submissao> submissoes = new ArrayList<>();

	@Override
	public Optional<Submissao> findById(String id) {
		return submissoes.stream().filter(submissao -> Optional.ofNullable(submissao.getId()).orElse("").equals(id)).findFirst();
	}

	@Override
	public Submissao save(Submissao submissao) {
		submissoes.add(submissao);
		return submissao;
	}

	@Override
	public void deleteById(String id) {
		submissoes.removeIf(submissao -> submissao.getId().equals(id));
	}

	@Override
	public List<Submissao> findAllByUserIdOrderByDataEnvioDesc(String userId) {
		return submissoes.stream().filter(submissao -> submissao.getUserId().equals(userId))
				.sorted((s1, s2) -> s2.getDataEnvio().compareTo(s1.getDataEnvio()))
				.limit(10).toList();
	}

}
