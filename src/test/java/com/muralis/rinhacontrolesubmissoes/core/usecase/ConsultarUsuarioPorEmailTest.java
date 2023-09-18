package com.muralis.rinhacontrolesubmissoes.core.usecase;

import com.muralis.rinhacontrolesubmissoes.core.domain.entity.Categoria;
import com.muralis.rinhacontrolesubmissoes.core.domain.entity.DomainException;
import com.muralis.rinhacontrolesubmissoes.core.dto.CadastrarUsuarioCommand;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test")
class ConsultarUsuarioPorEmailTest {

	@Autowired
	private ConsultarUsuarioPorEmail consultarUsuarioPorEmail;

	@Autowired
	private CadastrarUsuario cadastrarUsuario;

	@Test
	@DisplayName("Deve consultar usuario por email")
	void deveConsultarUsuarioPorEmail() {
		var email = "teste@teste.com";
		cadastrarUsuario.execute(new CadastrarUsuarioCommand(email, Categoria.PESO_PENA));
		var usuario = consultarUsuarioPorEmail.execute(email);
		assertNotNull(usuario);
		assertEquals(email, usuario.getId());
	}

	@Test
	@DisplayName("Deve retornar exception quando usuario nao for encontrado")
	void deveRetornarExceptionQuandoUsuarioNaoForEncontrado() {
		var email = "nao@encontrado.com";
		var exception = assertThrows(DomainException.class, () -> consultarUsuarioPorEmail.execute(email));
		assertEquals("Registro não encontrado", exception.getMessage());
	}

}