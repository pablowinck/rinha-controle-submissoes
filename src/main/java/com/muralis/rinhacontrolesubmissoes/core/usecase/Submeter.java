package com.muralis.rinhacontrolesubmissoes.core.usecase;

import com.muralis.rinhacontrolesubmissoes.core.domain.entity.DomainException;
import com.muralis.rinhacontrolesubmissoes.core.domain.entity.Submissao;
import com.muralis.rinhacontrolesubmissoes.core.domain.entity.Usuario;
import com.muralis.rinhacontrolesubmissoes.core.domain.event.SubmissaoSalva;
import com.muralis.rinhacontrolesubmissoes.core.domain.repository.ArquivoSubmissaoRepository;
import com.muralis.rinhacontrolesubmissoes.core.domain.repository.SubmissaoRepository;
import com.muralis.rinhacontrolesubmissoes.core.domain.repository.UsuarioRepository;
import com.muralis.rinhacontrolesubmissoes.core.dto.SubmeterAplicacaoCommand;
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

	private final UsuarioRepository usuarioRepository;

	private final ApplicationEventPublisher publisher;

	public Submissao execute(SubmeterAplicacaoCommand command) {
		log.info("Submetendo aplicação: {}", command);
		usuarioRepository.findById(command.getUserId())
			.map(Usuario::getCategoria)
			.ifPresentOrElse(command::setCategoria, () -> {
				throw DomainException.USUARIO_NAO_CADASTRADO();
			});
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
