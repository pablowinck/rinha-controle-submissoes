package com.muralis.rinhacontrolesubmissoes.core.usecase;

import com.muralis.rinhacontrolesubmissoes.core.domain.entity.DomainException;
import com.muralis.rinhacontrolesubmissoes.core.domain.entity.SituacaoSubmissao;
import com.muralis.rinhacontrolesubmissoes.core.domain.entity.Submissao;
import com.muralis.rinhacontrolesubmissoes.core.domain.event.SubmissaoProcessada;
import com.muralis.rinhacontrolesubmissoes.core.domain.repository.ArquivoSubmissaoRepository;
import com.muralis.rinhacontrolesubmissoes.core.domain.repository.SubmissaoRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Component;

@Component
@Log4j2
@RequiredArgsConstructor
public class ProcessarSubmissao {

	private final SubmissaoRepository submissaoRepository;

	private final ArquivoSubmissaoRepository arquivoSubmissaoRepository;

	private final ApplicationEventPublisher publisher;

	public void execute(String submissaoId) {
		log.info("Buscando submissao {}", submissaoId);
		Submissao submissao = submissaoRepository.findById(submissaoId)
			.orElseThrow(DomainException::SUBMISSAO_NOT_FOUND);
		log.info("Submissao encontrada {}", submissao);
		submissao.setSituacao(SituacaoSubmissao.PROCESSANDO);
		submissaoRepository.save(submissao);
		try {
			log.info("Buscando arquivo submissao {}", submissao.getId());
			var arquivoSubmissao = arquivoSubmissaoRepository.findById(submissao.getId())
				.orElseThrow(DomainException::NOT_FOUND);
			log.info("Arquivo submissao {} encontrado", arquivoSubmissao.getId());
			log.info("Processando submissao {}", submissaoId);
			submissao.processar(arquivoSubmissao);
			log.info("Submissao {} processada com sucesso", submissaoId);
			publisher.publishEvent(new SubmissaoProcessada(submissao));
		}
		catch (Exception exception) {
			log.error("Erro ao processar submissao {}", submissaoId, exception);
			submissao.setSituacao(SituacaoSubmissao.FALHA);
		}
		finally {
			submissaoRepository.save(submissao);
		}
	}

}
