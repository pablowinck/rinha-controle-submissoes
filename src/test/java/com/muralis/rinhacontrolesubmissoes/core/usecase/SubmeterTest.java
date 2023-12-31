package com.muralis.rinhacontrolesubmissoes.core.usecase;

import com.muralis.rinhacontrolesubmissoes.core.domain.entity.Categoria;
import com.muralis.rinhacontrolesubmissoes.core.domain.entity.DomainException;
import com.muralis.rinhacontrolesubmissoes.core.domain.entity.Usuario;
import com.muralis.rinhacontrolesubmissoes.core.domain.generator.SubmissaoGenerator;
import com.muralis.rinhacontrolesubmissoes.core.domain.repository.ArquivoSubmissaoRepository;
import com.muralis.rinhacontrolesubmissoes.core.domain.repository.SubmissaoRepository;
import com.muralis.rinhacontrolesubmissoes.core.domain.repository.UsuarioRepository;
import com.muralis.rinhacontrolesubmissoes.core.dto.ProcessarSubmissaoCommand;
import com.muralis.rinhacontrolesubmissoes.core.dto.SubmeterAplicacaoCommand;
import com.muralis.rinhacontrolesubmissoes.core.event.MensagemPostadaNaFilaEmMemoria;
import lombok.SneakyThrows;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.event.ApplicationEvents;
import org.springframework.test.context.event.RecordApplicationEvents;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
@ActiveProfiles("test")
@RecordApplicationEvents
class SubmeterTest {

	@Autowired
	private Submeter submeter;

	@Autowired
	private ArquivoSubmissaoRepository arquivoSubmissaoRepository;

	@Autowired
	private SubmissaoRepository submissaoRepository;

	@Autowired
	private UsuarioRepository usuarioRepository;

	@SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
	@Autowired
	private ApplicationEvents applicationEvents;

	@SneakyThrows
	@Test
	@DisplayName("Quando submeter uma submissão então deve salvar o arquivo da submissao")
	void quandoSubmeterUmaSubmissaoEntaoDeveSalvarOArquivoDaSubmissao() {
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

		// then
		var arquivoOptional = arquivoSubmissaoRepository.findById(submissao.getId());
		Assertions.assertTrue(arquivoOptional.isPresent());
		var arquivo = arquivoOptional.get();
		assertNotNull(arquivo);
		assertEquals(submissao.getId(), arquivo.getId());
		assertEquals(submissao.getNomeArquivo(), arquivo.getNomeArquivo());
		arquivoSubmissaoRepository.deleteById(submissao.getId());
	}

	@Test
	@DisplayName("Quando submeter uma submissão então deve salvar a submissão")
	void quandoSubmeterUmaSubmissaoEntaoDeveSalvarASubmissao() {
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
		assertNotNull(submissao.getId());

		// then
		var submissaoOptional = submissaoRepository.findById(submissao.getId());
		Assertions.assertTrue(submissaoOptional.isPresent());
		var submissaoSalva = submissaoOptional.get();
		assertNotNull(submissaoSalva);
		assertEquals(submissao.getId(), submissaoSalva.getId());
		assertEquals(submissao.getNomeArquivo(), submissaoSalva.getNomeArquivo());
		submissaoRepository.deleteById(submissaoSalva.getId());
		arquivoSubmissaoRepository.deleteById(submissaoSalva.getId());
	}

	@Test
	@DisplayName("Quando submeter uma submissão então deve publicar o evento de submissão")
	void quandoSubmeterUmaSubmissaoEntaoDevePublicarOEventoDeSubmissao() {
		// given
		SubmissaoGenerator submissaoGenerator = new SubmissaoGenerator();
		var command = SubmeterAplicacaoCommand.builder()
			.userId(submissaoGenerator.usuarioValido)
			.categoria(Categoria.PESO_PENA)
			.linguagem(submissaoGenerator.linguagemValida)
			.arquivo(submissaoGenerator.arquivoValido)
			.build();

		// when
		submeter.execute(command);

		// then
		assertEquals(1, applicationEvents.stream(MensagemPostadaNaFilaEmMemoria.class).count());
		var submissaoOptional = applicationEvents.stream(MensagemPostadaNaFilaEmMemoria.class).findFirst();
		Assertions.assertTrue(submissaoOptional.isPresent());
		var submissao = submissaoOptional.get();
		ProcessarSubmissaoCommand processarSubmissaoCommand = submissao.getMensagem();
		assertEquals(command.getId(), processarSubmissaoCommand.getId());
		submissaoRepository.deleteById(command.getId());
		arquivoSubmissaoRepository.deleteById(command.getId());
	}

	@Test
	@DisplayName("Caso usuário não cadastrado então deve lançar exceção")
	void casoUsuarioNaoCadastradoEntaoDeveLancarExcecao() {
		// given
		SubmissaoGenerator submissaoGenerator = new SubmissaoGenerator();
		var command = SubmeterAplicacaoCommand.builder()
			.userId("nao-cadastrado")
			.categoria(Categoria.PESO_PENA)
			.linguagem(submissaoGenerator.linguagemValida)
			.arquivo(submissaoGenerator.arquivoValido)
			.build();

		// when
		var exception = Assertions.assertThrows(DomainException.class, () -> submeter.execute(command));

		// then
		assertEquals("Usuário não cadastrado", exception.getMessage());
	}

	@Test
	@DisplayName("Deve setar a categoria do usuário na submissão")
	void deveSetarACategoriaDoUsuarioNaSubmissao() {
		// given
		SubmissaoGenerator submissaoGenerator = new SubmissaoGenerator();
		Usuario usuario = Usuario.builder()
			.categoria(Categoria.PESO_PESADO)
			.id(submissaoGenerator.usuarioValido)
			.build();
		usuarioRepository.save(usuario);
		var command = SubmeterAplicacaoCommand.builder()
			.userId(submissaoGenerator.usuarioValido)
			.categoria(Categoria.PESO_PENA)
			.linguagem(submissaoGenerator.linguagemValida)
			.arquivo(submissaoGenerator.arquivoValido)
			.build();

		// when
		var submissao = submeter.execute(command);

		// then
		assertEquals(Categoria.PESO_PESADO, submissao.getCategoria());
		submissaoRepository.deleteById(submissao.getId());
		arquivoSubmissaoRepository.deleteById(submissao.getId());
	}

}