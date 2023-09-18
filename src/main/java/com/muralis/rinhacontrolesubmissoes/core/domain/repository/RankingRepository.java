package com.muralis.rinhacontrolesubmissoes.core.domain.repository;

import com.muralis.rinhacontrolesubmissoes.core.domain.entity.Categoria;
import com.muralis.rinhacontrolesubmissoes.core.domain.entity.Ranking;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface RankingRepository {

	Optional<Ranking> findByUserId(String userId);

	Ranking save(Ranking ranking);

	Page<Ranking> findAllByCategoriaOrderByNotaDesc(Categoria categoria, Pageable pageable);

	Page<Ranking> findAll(Pageable pageable);

}
