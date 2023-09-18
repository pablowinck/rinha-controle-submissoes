package com.muralis.rinhacontrolesubmissoes.inbound.controller;

import com.muralis.rinhacontrolesubmissoes.core.domain.entity.Usuario;
import com.muralis.rinhacontrolesubmissoes.core.dto.CadastrarUsuarioCommand;
import com.muralis.rinhacontrolesubmissoes.core.usecase.CadastrarUsuario;
import com.muralis.rinhacontrolesubmissoes.core.usecase.ConsultarUsuarioPorEmail;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1/usuarios")
@RequiredArgsConstructor
public class UsuarioController {

	private final CadastrarUsuario cadastrarUsuario;

	private final ConsultarUsuarioPorEmail consultarUsuarioPorEmail;

	@PostMapping
	public ResponseEntity<Usuario> cadastrarUsuario(@Valid @RequestBody CadastrarUsuarioCommand command) {
		return ResponseEntity.status(HttpStatus.CREATED).body(cadastrarUsuario.execute(command));
	}

	@GetMapping("/{email}")
	public ResponseEntity<?> consultarUsuarioPorEmail(@PathVariable String email) {
		var usuario = consultarUsuarioPorEmail.execute(email);
		return ResponseEntity.ok(usuario);
	}

}
