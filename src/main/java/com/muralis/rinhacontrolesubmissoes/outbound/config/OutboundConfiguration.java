package com.muralis.rinhacontrolesubmissoes.outbound.config;

import com.amazonaws.ClientConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan(basePackages = { "com.muralis.rinhacontrolesubmissoes.outbound" })
public class OutboundConfiguration {

	@Bean
	public ClientConfiguration clientConfiguration() {
		return new ClientConfiguration().withConnectionTimeout(1000);
	}

}
