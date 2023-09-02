package com.muralis.rinhacontrolesubmissoes.core.usecase;

import com.muralis.rinhacontrolesubmissoes.core.domain.entity.Categoria;
import com.muralis.rinhacontrolesubmissoes.core.domain.generator.SubmissaoGenerator;
import com.muralis.rinhacontrolesubmissoes.core.domain.repository.ArquivoSubmissaoRepository;
import com.muralis.rinhacontrolesubmissoes.core.domain.repository.SubmissaoRepository;
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
@ActiveProfiles("default")
@RecordApplicationEvents
class SubmeterTest {

	@Autowired
	private Submeter submeter;

	@Autowired
	private ArquivoSubmissaoRepository arquivoSubmissaoRepository;

	@Autowired
	private SubmissaoRepository submissaoRepository;

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

		// then
		var submissaoOptional = submissaoRepository.findById(submissao.getId());
		Assertions.assertTrue(submissaoOptional.isPresent());
		var submissaoSalva = submissaoOptional.get();
		assertNotNull(submissaoSalva);
		assertEquals(submissao.getId(), submissaoSalva.getId());
		assertEquals(submissao.getNomeArquivo(), submissaoSalva.getNomeArquivo());
		submissaoRepository.deleteById(submissao.getId());
		arquivoSubmissaoRepository.deleteById(submissao.getId());
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

}