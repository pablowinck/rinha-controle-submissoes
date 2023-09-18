package com.muralis.rinhacontrolesubmissoes.core.domain.repository;

import com.muralis.rinhacontrolesubmissoes.core.domain.entity.Usuario;
import org.springframework.cache.annotation.Cacheable;

import java.util.Optional;

public interface UsuarioRepository {

	Optional<Usuario> findById(String id);

	@Cacheable(value = "usuarios", key = "#usuario.id")
	Usuario save(Usuario usuario);

}
