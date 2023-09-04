package com.muralis.rinhacontrolesubmissoes.inbound.controller;

import com.muralis.rinhacontrolesubmissoes.core.domain.entity.Submissao;
import com.muralis.rinhacontrolesubmissoes.core.dto.SubmeterAplicacaoCommand;
import com.muralis.rinhacontrolesubmissoes.core.usecase.ConsultarSubmissao;
import com.muralis.rinhacontrolesubmissoes.core.usecase.Submeter;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1/submissoes")
public record SubmissaoController(Submeter submeter, ConsultarSubmissao consultarSubmissao) {

	@PostMapping
	public ResponseEntity<Submissao> submeterAplicacao(@Valid @ModelAttribute SubmeterAplicacaoCommand command) {
		Submissao submissao = submeter.execute(command);
		return ResponseEntity.ok(submissao);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Submissao> consultarSubmissao(@PathVariable String id) {
		Submissao submissao = consultarSubmissao.execute(id);
		return ResponseEntity.ok(submissao);
	}

}
