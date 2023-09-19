package com.muralis.rinhacontrolesubmissoes.core.domain.generator;

import com.muralis.rinhacontrolesubmissoes.core.domain.utils.LocalMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import java.net.URL;

public class SubmissaoGenerator {

	public final String usuarioValido = "valid_user" + System.currentTimeMillis();

	public final String linguagemValida = "Java";

	public final MultipartFile arquivoValido = criaArquivoValido();

	private MultipartFile criaArquivoValido() {
		URL nodeUrl = this.getClass().getClassLoader().getResource("projects/node.yml");
		return new LocalMultipartFile(nodeUrl);
	}

}
