package com.muralis.rinhacontrolesubmissoes.core.usecase;

import com.muralis.rinhacontrolesubmissoes.core.domain.entity.Categoria;
import com.muralis.rinhacontrolesubmissoes.core.domain.entity.DomainException;
import com.muralis.rinhacontrolesubmissoes.core.domain.entity.SituacaoSubmissao;
import com.muralis.rinhacontrolesubmissoes.core.domain.generator.SubmissaoGenerator;
import com.muralis.rinhacontrolesubmissoes.core.domain.repository.ArquivoSubmissaoRepository;
import com.muralis.rinhacontrolesubmissoes.core.domain.repository.SubmissaoRepository;
import com.muralis.rinhacontrolesubmissoes.core.dto.SubmeterAplicacaoCommand;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test")
class ProcessarSubmissaoTest {

	@Autowired
	private ProcessarSubmissao processarSubmissao;

	@Autowired
	private SubmissaoRepository submissaoRepository;

	@Autowired
	private ArquivoSubmissaoRepository arquivoSubmissaoRepository;

	@Autowired
	private Submeter submeter;

	@Test
	@DisplayName("Deve lançar exceção quando submissão não for encontrada")
	void deveLancarExcecaoQuandoSubmissaoNaoForEncontrada() {
		DomainException domainException = assertThrows(DomainException.class, () -> this.processarSubmissao.execute("not-found"));
		assertEquals("Submissão não encontrada", domainException.getMessage());
	}

	@Test
	@DisplayName("Deve lançar exceção quando submissão estiver com status inválido")
	@Disabled
	void deveLancarExcecaoQuandoSubmissaoEstiverComStatusDiferenteDeAguardandoProcessamento() {
		SubmissaoGenerator submissaoGenerator = new SubmissaoGenerator();
		var command = SubmeterAplicacaoCommand.builder()
			.userId(submissaoGenerator.usuarioValido)
			.categoria(Categoria.PESO_PENA)
			.linguagem(submissaoGenerator.linguagemValida)
			.arquivo(submissaoGenerator.arquivoValido)
			.build();
		var submissao = submeter.execute(command);
		submissao.setSituacao(SituacaoSubmissao.SUCESSO);
		submissaoRepository.save(submissao);
		DomainException domainException = assertThrows(DomainException.class,
				() -> this.processarSubmissao.execute(submissao.getId()));
		assertEquals("Situação da submissão é inválida para processamento", domainException.getMessage());
		arquivoSubmissaoRepository.deleteById(submissao.getId());
	}

	@Test
	@DisplayName("Deve alterar status para erro quando não for possível processar a submissão")
	@Disabled
	void deveAlterarStatusParaErroQuandoNaoForPossivelProcessarSubmissao() {
		assertThrows(DomainException.class, () -> this.processarSubmissao.execute("123"));
	}

	@Test
	@DisplayName("Deve alterar a nota e a quantidade de pessoas inseridas quando for possível processar a submissão")
	@Disabled
	void deveAlterarNotaEQuantidadePessoasInseridasQuandoForPossivelProcessarSubmissao() {
		this.processarSubmissao.execute("123");
	}

}