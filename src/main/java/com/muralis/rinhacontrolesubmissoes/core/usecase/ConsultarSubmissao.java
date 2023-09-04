package com.muralis.rinhacontrolesubmissoes.core.usecase;

import com.muralis.rinhacontrolesubmissoes.core.domain.entity.DomainException;
import com.muralis.rinhacontrolesubmissoes.core.domain.entity.Submissao;
import com.muralis.rinhacontrolesubmissoes.core.domain.repository.SubmissaoRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Component;

@Component
@Log4j2
public record ConsultarSubmissao(SubmissaoRepository submissaoRepository) {

    public Submissao execute(String id) {
        log.info("Consultando submissão com id {}", id);
        Submissao submissao = submissaoRepository.findById(id).orElseThrow(DomainException::NOT_FOUND);
        log.info("Submissão encontrada: {}", submissao);
        return submissao;
    }

}
