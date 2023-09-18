package com.muralis.rinhacontrolesubmissoes.outbound.memory;

import com.muralis.rinhacontrolesubmissoes.core.domain.entity.Categoria;
import com.muralis.rinhacontrolesubmissoes.core.domain.entity.Ranking;
import com.muralis.rinhacontrolesubmissoes.core.domain.repository.RankingRepository;
import org.springframework.context.annotation.Profile;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
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

	@Override
	public Page<Ranking> findAllByCategoriaOrderByNotaDesc(Categoria categoria, Pageable pageable) {
		var size = pageable.getPageSize();
		var page = pageable.getPageNumber();
		var start = size * page;
		var end = start + size;
		var filteredRanking = this.rankings.stream()
			.filter(ranking -> ranking.getCategoria().equals(categoria))
			.sorted((r1, r2) -> r2.getNota().compareTo(r1.getNota()))
			.toList();
		if (end > filteredRanking.size()) {
			end = filteredRanking.size();
		}
		var subList = filteredRanking.subList(start, end);
		return new PageImpl<>(subList, pageable, filteredRanking.size());
	}

	@Override
	public Page<Ranking> findAll(Pageable pageable) {
		var size = pageable.getPageSize();
		var page = pageable.getPageNumber();
		var start = size * page;
		var end = start + size;
		if (end > rankings.size()) {
			end = rankings.size();
		}
		var subList = rankings.subList(start, end);
		return new PageImpl<>(subList, pageable, rankings.size());
	}

}
