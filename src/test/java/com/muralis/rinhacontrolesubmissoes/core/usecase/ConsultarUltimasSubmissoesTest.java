package com.muralis.rinhacontrolesubmissoes.core.usecase;

import com.muralis.rinhacontrolesubmissoes.core.domain.entity.Submissao;
import com.muralis.rinhacontrolesubmissoes.core.domain.repository.SubmissaoRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
@ActiveProfiles("test")
class ConsultarUltimasSubmissoesTest {

	@Autowired
	private ConsultarUltimasSubmissoes consultarUltimasSubmissoes;

	@Autowired
	private SubmissaoRepository submissaoRepository;

	@DisplayName("Deve retornar as ultimas 10 submissoes")
	@Test
	void deveRetornarAsUltimas10Submissoes() {
		makeMoreThan10Submissoes();
		var submissoes = consultarUltimasSubmissoes.execute("1");
		assertEquals(10, submissoes.size());
	}

	private void makeMoreThan10Submissoes() {
		for (int i = 0; i < 15; i++) {
			Submissao submissao = new Submissao();
			submissao.setUserId("1");
			submissao.setDataEnvio(LocalDateTime.now());
			submissaoRepository.save(submissao);
		}
	}

}