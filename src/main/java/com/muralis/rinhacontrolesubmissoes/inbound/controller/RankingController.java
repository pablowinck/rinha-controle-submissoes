package com.muralis.rinhacontrolesubmissoes.inbound.controller;

import com.muralis.rinhacontrolesubmissoes.core.domain.entity.Ranking;
import com.muralis.rinhacontrolesubmissoes.core.usecase.ConsultaRankingPorCategoria;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/ranking")
@RequiredArgsConstructor
public class RankingController {

	private final ConsultaRankingPorCategoria consultaRankingPorCategoria;

	@GetMapping
	public ResponseEntity<Page<Ranking>> execute(@RequestParam(required = false) String categoria, Pageable pageable) {
		return ResponseEntity.ok(consultaRankingPorCategoria.execute(categoria, pageable));
	}

}
