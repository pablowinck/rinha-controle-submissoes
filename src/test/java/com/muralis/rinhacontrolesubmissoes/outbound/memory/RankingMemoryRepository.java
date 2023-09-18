package com.muralis.rinhacontrolesubmissoes.outbound.memory;

import com.muralis.rinhacontrolesubmissoes.core.domain.entity.Ranking;
import com.muralis.rinhacontrolesubmissoes.core.domain.repository.RankingRepository;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
@Profile("test")
public class RankingMemoryRepository implements RankingRepository {

	List<Ranking> rankings = new ArrayList<>();

	@Override
	public Optional<Ranking> findByUserId(String userId) {
		return rankings.stream().filter(ranking -> ranking.getUserId().equals(userId)).findFirst();
	}

	@Override
	public Ranking save(Ranking ranking) {
		rankings.removeIf(r -> r.getUserId().equals(ranking.getUserId()));
		rankings.add(ranking);
		return ranking;
	}

}
