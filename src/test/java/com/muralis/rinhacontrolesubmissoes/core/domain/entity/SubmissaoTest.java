package com.muralis.rinhacontrolesubmissoes.core.domain.entity;

import com.muralis.rinhacontrolesubmissoes.core.domain.generator.SubmissaoGenerator;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.io.IOException;

import static org.junit.jupiter.api.Assertions.*;

class SubmissaoTest {

	@Test
	@DisplayName("Submissao é invalida para processamento quando situacao for PROCESSANDO")
	void submissaoEInvalidaParaProcessamentoQuandoSituacaoForPROCESSANDO() {
		var submissao = Submissao.builder().situacao(SituacaoSubmissao.PROCESSANDO).build();
		assertTrue(submissao.isInvalidaParaProcessamento());
	}

	@Test
	@DisplayName("Submissao é invalida para processamento quando situacao for SUCESSO")
	void submissaoEInvalidaParaProcessamentoQuandoSituacaoForSUCESSO() {
		var submissao = Submissao.builder().situacao(SituacaoSubmissao.SUCESSO).build();
		assertTrue(submissao.isInvalidaParaProcessamento());
	}

	@Test
	@DisplayName("Deve processar submissao")
	void deveProcessarSubmissao() throws IOException {
		SubmissaoGenerator submissaoGenerator = new SubmissaoGenerator();
		var submissao = Submissao.builder().situacao(SituacaoSubmissao.AGUARDANDO_PROCESSAMENTO).build();
		submissao.processar(ArquivoSubmissao.builder()
			.id("123")
			.inputStream(submissaoGenerator.arquivoValido.getInputStream())
			.build());
		assertNotNull(submissao.getNota());
		assertEquals(SituacaoSubmissao.SUCESSO, submissao.getSituacao());
	}

}