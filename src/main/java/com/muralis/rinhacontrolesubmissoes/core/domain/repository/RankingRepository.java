package com.muralis.rinhacontrolesubmissoes.core.domain.repository;

import com.muralis.rinhacontrolesubmissoes.core.domain.entity.Ranking;

import java.util.Optional;

public interface RankingRepository {

	Optional<Ranking> findByUserId(String userId);

	Ranking save(Ranking ranking);

}
