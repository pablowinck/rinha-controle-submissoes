package com.muralis.rinhacontrolesubmissoes;

import com.muralis.rinhacontrolesubmissoes.core.config.CoreConfiguration;
import com.muralis.rinhacontrolesubmissoes.outbound.config.OutboundConfiguration;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class RinhaControleSubmissoesApplication {

	public static void main(String[] args) {
		SpringApplication.run(new Class[] { CoreConfiguration.class, OutboundConfiguration.class }, args);
	}

}
