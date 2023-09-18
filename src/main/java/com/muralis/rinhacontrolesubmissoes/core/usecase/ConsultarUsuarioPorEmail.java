package com.muralis.rinhacontrolesubmissoes.core.usecase;

import com.muralis.rinhacontrolesubmissoes.core.domain.entity.DomainException;
import com.muralis.rinhacontrolesubmissoes.core.domain.entity.Usuario;
import com.muralis.rinhacontrolesubmissoes.core.domain.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Component;

@Component
@Log4j2
@RequiredArgsConstructor
public class ConsultarUsuarioPorEmail {

	private final UsuarioRepository usuarioRepository;

	@Cacheable("usuarios")
	public Usuario execute(String email) {
		log.info("Consultando usuário por email {}", email);
		var usuario = usuarioRepository.findById(email).orElseThrow(DomainException::NOT_FOUND);
		log.info("Usuário encontrado {}", usuario);
		return usuario;
	}

}
