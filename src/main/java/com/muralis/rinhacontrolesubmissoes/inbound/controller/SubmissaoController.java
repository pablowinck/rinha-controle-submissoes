package com.muralis.rinhacontrolesubmissoes.inbound.controller;

import com.muralis.rinhacontrolesubmissoes.core.domain.entity.Submissao;
import com.muralis.rinhacontrolesubmissoes.core.dto.SubmeterAplicacaoCommand;
import com.muralis.rinhacontrolesubmissoes.core.usecase.Submeter;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/submissoes")
public record SubmissaoController(Submeter submeter) {

	@PostMapping
	public ResponseEntity<Submissao> submeterAplicacao(@ModelAttribute SubmeterAplicacaoCommand command) {
		Submissao submissao = submeter.execute(command);
		return ResponseEntity.ok(submissao);
	}

}
