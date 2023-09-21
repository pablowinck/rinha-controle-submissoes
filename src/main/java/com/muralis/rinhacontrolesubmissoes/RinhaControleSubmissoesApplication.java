package com.muralis.rinhacontrolesubmissoes;

import com.muralis.rinhacontrolesubmissoes.core.config.CoreConfiguration;
import com.muralis.rinhacontrolesubmissoes.inbound.config.InboundConfiguration;
import com.muralis.rinhacontrolesubmissoes.outbound.config.OutboundConfiguration;
import jakarta.annotation.PostConstruct;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.TimeZone;

@SpringBootApplication
public class RinhaControleSubmissoesApplication {

	public static void main(String[] args) {
		SpringApplication.run(
				new Class[] { CoreConfiguration.class, OutboundConfiguration.class, InboundConfiguration.class }, args);
	}

	@PostConstruct
	public void init(){
		TimeZone.setDefault(TimeZone.getTimeZone("America/Sao_Paulo"));
	}

}
