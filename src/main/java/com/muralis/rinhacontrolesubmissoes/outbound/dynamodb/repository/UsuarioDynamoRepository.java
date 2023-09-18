package com.muralis.rinhacontrolesubmissoes.outbound.dynamodb.repository;

import com.muralis.rinhacontrolesubmissoes.core.domain.entity.Usuario;
import com.muralis.rinhacontrolesubmissoes.core.domain.repository.UsuarioRepository;
import org.socialsignin.spring.data.dynamodb.repository.DynamoDBCrudRepository;
import org.socialsignin.spring.data.dynamodb.repository.EnableScan;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Repository;

@EnableScan
@Repository
@Profile("!test")
public interface UsuarioDynamoRepository extends UsuarioRepository, DynamoDBCrudRepository<Usuario, String> {

}
