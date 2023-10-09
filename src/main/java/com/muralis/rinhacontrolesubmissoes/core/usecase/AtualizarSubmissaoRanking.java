package com.muralis.rinhacontrolesubmissoes.core.usecase;

import com.muralis.rinhacontrolesubmissoes.core.domain.entity.Submissao;
import com.muralis.rinhacontrolesubmissoes.core.domain.event.SubmissaoProcessada;
import com.muralis.rinhacontrolesubmissoes.core.domain.repository.RankingRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
@Log4j2
@RequiredArgsConstructor
public class AtualizarSubmissaoRanking {

	private final RankingRepository rankingRepository;

	private static final LocalDate dataLimite = LocalDate.of(2023, 10, 8);

	@EventListener
	public void on(SubmissaoProcessada submissaoProcessada) {
		Submissao submissao = submissaoProcessada.getSubmissao();
		log.info("Atualizando ranking com submissao {}", submissao);
		rankingRepository.findByUserId(submissao.getUserId()).ifPresentOrElse(ranking -> {
			if (submissao.getDataEnvio().toLocalDate().isAfter(dataLimite))
				return;
			if (ranking.notaMaiorQue(submissao.getNota())) {
				log.info("Submissao {} não altera ranking", submissao);
				return;
			}
			ranking.atualizar(submissao);
			rankingRepository.save(ranking);
		}, () -> rankingRepository.save(submissao.toRanking()));
		log.info("Ranking atualizado com submissao {}", submissao);
	}

}
