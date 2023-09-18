package com.muralis.rinhacontrolesubmissoes.core.usecase;

import com.muralis.rinhacontrolesubmissoes.core.domain.entity.Submissao;
import com.muralis.rinhacontrolesubmissoes.core.domain.repository.SubmissaoRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Log4j2
@RequiredArgsConstructor
public class ConsultarUltimasSubmissoes {

	private final SubmissaoRepository submissaoRepository;

	@Cacheable("ultimasSubmissoes")
	public List<Submissao> execute(String userId) {
		log.info("Buscando as ultimas 10 submissoes do usuario {}", userId);
		var submissoes = submissaoRepository.findAllByUserIdOrderByDataEnvioDesc(userId);
		log.info("Submissoes encontradas: {}", submissoes);
		return submissoes;
	}

}
