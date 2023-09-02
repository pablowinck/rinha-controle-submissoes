package com.muralis.rinhacontrolesubmissoes.core.usecase;

import com.muralis.rinhacontrolesubmissoes.core.domain.entity.Categoria;
import com.muralis.rinhacontrolesubmissoes.core.domain.generator.SubmissaoGenerator;
import com.muralis.rinhacontrolesubmissoes.core.domain.repository.ArquivoSubmissaoRepository;
import com.muralis.rinhacontrolesubmissoes.core.dto.SubmeterAplicacaoCommand;
import lombok.SneakyThrows;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
@ActiveProfiles("test")
@Log4j2
class SubmeterTest {

	@Autowired
	private Submeter submeter;

	@Autowired
	private ArquivoSubmissaoRepository arquivoSubmissaoRepository;

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
		//when
		var submissao = submeter.execute(command);

		//then
		var arquivoOptional = arquivoSubmissaoRepository.findById(submissao.getId());
		Assertions.assertTrue(arquivoOptional.isPresent());
		var arquivo = arquivoOptional.get();
		assertNotNull(arquivo);
		assertEquals(submissao.getId(), arquivo.getId());
		assertEquals(submissao.getNomeArquivo(), arquivo.getNomeArquivo());
		arquivoSubmissaoRepository.deleteById(submissao.getId());
	}

}