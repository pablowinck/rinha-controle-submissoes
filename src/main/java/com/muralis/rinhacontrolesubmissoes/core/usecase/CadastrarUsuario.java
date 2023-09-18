package com.muralis.rinhacontrolesubmissoes.core.usecase;

import com.muralis.rinhacontrolesubmissoes.core.domain.entity.DomainException;
import com.muralis.rinhacontrolesubmissoes.core.domain.entity.Usuario;
import com.muralis.rinhacontrolesubmissoes.core.domain.repository.UsuarioRepository;
import com.muralis.rinhacontrolesubmissoes.core.dto.CadastrarUsuarioCommand;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Log4j2
public class CadastrarUsuario {

	private final UsuarioRepository usuarioRepository;

	public Usuario execute(CadastrarUsuarioCommand command) {
		log.info("Cadastrando usuário {}", command);
		usuarioRepository.findById(command.email()).ifPresent(usuario -> {
			log.error("Usuário já cadastrado {}", usuario);
			throw DomainException.USUARIO_CADASTRADO();
		});
		var usuario = command.toUsuario();
		usuarioRepository.save(usuario);
		log.info("Usuário cadastrado {}", usuario);
		return usuario;
	}

}
