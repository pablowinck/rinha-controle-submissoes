package com.muralis.rinhacontrolesubmissoes.core.usecase;

import com.muralis.rinhacontrolesubmissoes.core.domain.entity.Categoria;
import com.muralis.rinhacontrolesubmissoes.core.domain.entity.DomainException;
import com.muralis.rinhacontrolesubmissoes.core.domain.generator.SubmissaoGenerator;
import com.muralis.rinhacontrolesubmissoes.core.domain.repository.ArquivoSubmissaoRepository;
import com.muralis.rinhacontrolesubmissoes.core.domain.repository.SubmissaoRepository;
import com.muralis.rinhacontrolesubmissoes.core.dto.SubmeterAplicacaoCommand;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test")
class ConsultarSubmissaoTest {

	@Autowired
	private ConsultarSubmissao consultarSubmissao;

	@Autowired
	private SubmissaoRepository submissaoRepository;

	@Autowired
	private Submeter submeter;

	@Autowired
	private ArquivoSubmissaoRepository arquivoSubmissaoRepository;

	@Test
	@DisplayName("Dado consulta de submissao, quando encontrada, deve retornar uma submissao valida")
	void dadoConsultaDeSubmissaoQuandoEncontradaDeveRetornarUmaSubmissaoValida() {
		// given
		SubmissaoGenerator submissaoGenerator = new SubmissaoGenerator();
		var command = SubmeterAplicacaoCommand.builder()
			.userId(submissaoGenerator.usuarioValido)
			.categoria(Categoria.PESO_PENA)
			.linguagem(submissaoGenerator.linguagemValida)
			.arquivo(submissaoGenerator.arquivoValido)
			.build();

		// when
		var submissao = submeter.execute(command);
		var submissaoConsultada = consultarSubmissao.execute(submissao.getId());

		// then
		assertNotNull(submissaoConsultada);
		assertEquals(submissao.getId(), submissaoConsultada.getId());
		assertEquals(submissao.getUserId(), submissaoConsultada.getUserId());
		assertEquals(submissao.getCategoria(), submissaoConsultada.getCategoria());
		assertEquals(submissao.getLinguagem(), submissaoConsultada.getLinguagem());
		assertEquals(submissao.getSituacao(), submissaoConsultada.getSituacao());
		assertEquals(submissao.getNota(), submissaoConsultada.getNota());
		arquivoSubmissaoRepository.deleteById(submissao.getId());
	}

	@Test
	@DisplayName("Dado consulta de submissao, quando nao encontrada, deve retornar uma exception")
	void dadoConsultaDeSubmissaoQuandoNaoEncontradaDeveRetornarUmaException() {
		DomainException domainException = assertThrows(DomainException.class, () -> consultarSubmissao.execute("123"));
		assertEquals("Registro não encontrado", domainException.getMessage());
		assertEquals(404, domainException.getStatusCode());
	}

}