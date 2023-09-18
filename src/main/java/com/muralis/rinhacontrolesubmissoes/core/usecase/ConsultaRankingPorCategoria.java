package com.muralis.rinhacontrolesubmissoes.core.usecase;

import com.muralis.rinhacontrolesubmissoes.core.domain.entity.Categoria;
import com.muralis.rinhacontrolesubmissoes.core.domain.entity.Ranking;
import com.muralis.rinhacontrolesubmissoes.core.domain.repository.RankingRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

@Component
@Log4j2
@RequiredArgsConstructor
public class ConsultaRankingPorCategoria {

	private final RankingRepository rankingRepository;

	@Cacheable("ranking")
	public Page<Ranking> execute(String categoria, Pageable pageable) {
		log.info("Buscando ranking por categoria {}", categoria);
		var ranking = categoria != null ? rankingRepository.findAllByCategoriaOrderByNotaDesc(Categoria.valueOf(categoria), pageable)
				: rankingRepository.findAll(pageable);
		log.info("Ranking por categoria {} encontrado {}", categoria, ranking);
		return ranking;
	}

}
