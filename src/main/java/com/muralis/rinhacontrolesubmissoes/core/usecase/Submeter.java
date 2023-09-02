package com.muralis.rinhacontrolesubmissoes.core.usecase;

import com.muralis.rinhacontrolesubmissoes.core.domain.entity.Submissao;
import com.muralis.rinhacontrolesubmissoes.core.domain.repository.ArquivoSubmissaoRepository;
import com.muralis.rinhacontrolesubmissoes.core.dto.SubmeterAplicacaoCommand;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Component;

@Component
@Log4j2
@RequiredArgsConstructor
public class Submeter {

	private final ArquivoSubmissaoRepository arquivoSubmissaoRepository;

	public Submissao execute(SubmeterAplicacaoCommand command) {
		log.info("Submetendo aplicação: {}", command);
		var submissao = command.toSubmissao();
		var arquivoSubmissao = command.toArquivoSubmissao();
		log.info("Salvando arquivo da submissão: {}", arquivoSubmissao);
		arquivoSubmissaoRepository.save(arquivoSubmissao);
		log.info("Arquivo da submissão salvo com sucesso: {}", arquivoSubmissao);
		return submissao;
	}

}
