package com.muralis.rinhacontrolesubmissoes.core.dto;

import com.muralis.rinhacontrolesubmissoes.core.domain.entity.Categoria;
import com.muralis.rinhacontrolesubmissoes.core.domain.entity.Usuario;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;

public record CadastrarUsuarioCommand(@Email @NotNull String email, @NotNull Categoria categoria) {

	public Usuario toUsuario() {
		return Usuario.builder().id(email).categoria(categoria).build();
	}

}
