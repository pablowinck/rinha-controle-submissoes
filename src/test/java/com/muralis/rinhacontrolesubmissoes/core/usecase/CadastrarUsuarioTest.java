package com.muralis.rinhacontrolesubmissoes.core.usecase;

import com.muralis.rinhacontrolesubmissoes.core.domain.entity.Categoria;
import com.muralis.rinhacontrolesubmissoes.core.domain.repository.UsuarioRepository;
import com.muralis.rinhacontrolesubmissoes.core.dto.CadastrarUsuarioCommand;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test")
class CadastrarUsuarioTest {

	@Autowired
	private CadastrarUsuario cadastrarUsuario;

	@Autowired
	private UsuarioRepository usuarioRepository;

	@Test
	@DisplayName("Deve cadastrar um usuário")
	void deveCadastrarUmUsuario() {
		var command = new CadastrarUsuarioCommand("joao@mariajose.com", Categoria.PESO_PENA);

		var usuario = cadastrarUsuario.execute(command);

		assertNotNull(usuario.getId());
		assertEquals("joao@mariajose.com", usuario.getId());
		assertEquals(Categoria.PESO_PENA, usuario.getCategoria());
	}

	@Test
	@DisplayName("Deve lançar exceção ao cadastrar um usuário já cadastrado")
	void deveLancarExcecaoAoCadastrarUmUsuarioJaCadastrado() {
		var command = new CadastrarUsuarioCommand("teste@teste.com", Categoria.PESO_PENA);

		cadastrarUsuario.execute(command);

		var exception = assertThrows(RuntimeException.class, () -> cadastrarUsuario.execute(command));

		assertEquals("Usuário já cadastrado", exception.getMessage());
	}

}