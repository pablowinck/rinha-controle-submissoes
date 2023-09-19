package com.muralis.rinhacontrolesubmissoes.outbound.s3.repository;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.S3Object;
import com.muralis.rinhacontrolesubmissoes.core.domain.entity.ArquivoSubmissao;
import com.muralis.rinhacontrolesubmissoes.core.domain.repository.ArquivoSubmissaoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@RequiredArgsConstructor
@Repository
@Profile("!test")
public class ArquivoSubmissaoS3Repository implements ArquivoSubmissaoRepository {

	private final AmazonS3 amazonS3;

	@Value("${muralis.submissao.bucket:submissoes-rinha-backend-2}")
	private String bucket;

	@Override
	public Optional<ArquivoSubmissao> findById(String id) {
		S3Object object = amazonS3.getObject(bucket, id + ".yml");
		return Optional.of(ArquivoSubmissao.builder().id(id).inputStream(object.getObjectContent()).build());
	}

	@Override
	public void save(ArquivoSubmissao arquivoSubmissao) {
		ObjectMetadata metadata = new ObjectMetadata();
		metadata.setContentLength(arquivoSubmissao.size());
		amazonS3.putObject(bucket, arquivoSubmissao.getNomeArquivo(), arquivoSubmissao.toInputStream(), metadata);
	}

	@Override
	public void deleteById(String id) {
		amazonS3.deleteObject(bucket, id + ".yml");
	}

}
