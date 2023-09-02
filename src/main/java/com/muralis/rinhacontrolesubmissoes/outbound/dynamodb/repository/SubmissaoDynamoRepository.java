package com.muralis.rinhacontrolesubmissoes.outbound.dynamodb.repository;

import com.muralis.rinhacontrolesubmissoes.core.domain.entity.Submissao;
import com.muralis.rinhacontrolesubmissoes.core.domain.repository.SubmissaoRepository;
import org.socialsignin.spring.data.dynamodb.repository.EnableScan;
import org.springframework.context.annotation.Profile;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@EnableScan
@Repository
@Profile("!test")
public interface SubmissaoDynamoRepository
		extends SubmissaoRepository, CrudRepository<Submissao, String> {

}