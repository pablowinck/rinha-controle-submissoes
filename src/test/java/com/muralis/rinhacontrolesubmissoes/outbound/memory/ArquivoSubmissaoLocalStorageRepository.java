package com.muralis.rinhacontrolesubmissoes.outbound.memory;

import com.muralis.rinhacontrolesubmissoes.core.domain.entity.ArquivoSubmissao;
import com.muralis.rinhacontrolesubmissoes.core.domain.repository.ArquivoSubmissaoRepository;
import lombok.SneakyThrows;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Repository;

import java.io.File;
import java.io.FileOutputStream;
import java.util.Optional;

@Repository
@Profile("test")
public class ArquivoSubmissaoLocalStorageRepository implements ArquivoSubmissaoRepository {

	@Override
	public Optional<ArquivoSubmissao> findById(String id) {
		return new File(id + ".yml").exists() ? Optional.of(ArquivoSubmissao.builder().id(id).build())
				: Optional.empty();
	}

	@Override
	@SneakyThrows
	public void save(ArquivoSubmissao arquivoSubmissao) {
		FileOutputStream fos = new FileOutputStream(arquivoSubmissao.getNomeArquivo());
		fos.write(arquivoSubmissao.toByteArray());
		fos.flush();
		fos.close();
	}

	@Override
	public void deleteById(String id) {
		if (!new File(id + ".yml").delete())
			throw new RuntimeException("Não foi possível deletar o arquivo " + id);
	}

}
