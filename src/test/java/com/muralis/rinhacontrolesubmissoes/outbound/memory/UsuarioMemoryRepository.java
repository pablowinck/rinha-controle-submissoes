package com.muralis.rinhacontrolesubmissoes.outbound.memory;

import com.muralis.rinhacontrolesubmissoes.core.domain.entity.Usuario;
import com.muralis.rinhacontrolesubmissoes.core.domain.repository.UsuarioRepository;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
@Profile("test")
public class UsuarioMemoryRepository implements UsuarioRepository {

	List<Usuario> usuarios = new ArrayList<>();

	@Override
	public Optional<Usuario> findById(String id) {
		return usuarios.stream().filter(usuario -> usuario.getId().equals(id)).findFirst();
	}

	@Override
	public Usuario save(Usuario usuario) {
		usuarios.add(usuario);
		return usuario;
	}

}
