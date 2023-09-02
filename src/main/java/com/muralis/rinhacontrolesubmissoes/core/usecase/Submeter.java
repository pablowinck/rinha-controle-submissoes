package com.muralis.rinhacontrolesubmissoes.core.usecase;

import com.muralis.rinhacontrolesubmissoes.core.domain.entity.Submissao;
import com.muralis.rinhacontrolesubmissoes.core.domain.repository.ArquivoSubmissaoRepository;
import com.muralis.rinhacontrolesubmissoes.core.domain.repository.SubmissaoRepository;
import com.muralis.rinhacontrolesubmissoes.core.dto.SubmeterAplicacaoCommand;
import com.muralis.rinhacontrolesubmissoes.core.events.SubmissaoSalva;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Component;

@Component
@Log4j2
@RequiredArgsConstructor
public class Submeter {

	private final ArquivoSubmissaoRepository arquivoSubmissaoRepository;

	private final SubmissaoRepository submissaoRepository;

	private final ApplicationEventPublisher publisher;

	public Submissao execute(SubmeterAplicacaoCommand command) {
		log.info("Submetendo aplicação: {}", command);
		var submissao = command.toSubmissao();
		var arquivoSubmissao = command.toArquivoSubmissao();
		log.info("Salvando arquivo da submissão: {}", arquivoSubmissao);
		arquivoSubmissaoRepository.save(arquivoSubmissao);
		log.info("Arquivo da submissão salvo com sucesso: {}", arquivoSubmissao);
		log.info("Salvando submissão: {}", submissao);
		submissaoRepository.save(submissao);
		log.info("Submissão salva com sucesso: {}", submissao);
		this.publisher.publishEvent(new SubmissaoSalva(submissao));
		return submissao;
	}

}
