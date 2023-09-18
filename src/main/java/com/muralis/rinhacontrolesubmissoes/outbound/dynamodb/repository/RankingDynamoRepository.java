package com.muralis.rinhacontrolesubmissoes.outbound.dynamodb.repository;

import com.muralis.rinhacontrolesubmissoes.core.domain.entity.Ranking;
import com.muralis.rinhacontrolesubmissoes.core.domain.repository.RankingRepository;
import org.socialsignin.spring.data.dynamodb.repository.DynamoDBCrudRepository;
import org.socialsignin.spring.data.dynamodb.repository.EnableScan;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Repository;

@EnableScan
@Repository
@Profile("!test")
public interface RankingDynamoRepository extends RankingRepository, DynamoDBCrudRepository<Ranking, String> {

}
