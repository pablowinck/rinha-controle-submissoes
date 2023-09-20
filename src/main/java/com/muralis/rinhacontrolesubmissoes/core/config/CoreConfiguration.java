package com.muralis.rinhacontrolesubmissoes.core.config;

import org.springframework.boot.actuate.autoconfigure.security.servlet.EndpointRequest;
import org.springframework.boot.actuate.health.HealthEndpoint;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@ComponentScan(basePackages = "com.muralis.rinhacontrolesubmissoes.core")
@EnableAutoConfiguration
@EnableCaching
public class CoreConfiguration {

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http.authorizeHttpRequests(authorize -> authorize.requestMatchers(EndpointRequest.to(HealthEndpoint.class))
			.permitAll()
			.anyRequest()
			.authenticated())
			.oauth2ResourceServer((oauth2) -> oauth2.jwt(Customizer.withDefaults()))
			.cors(cors -> cors.configurationSource(request -> {
				var corsConfiguration = new org.springframework.web.cors.CorsConfiguration();
				corsConfiguration.addAllowedOrigin("*");
				corsConfiguration.addAllowedMethod("*");
				corsConfiguration.addAllowedHeader("*");
				return corsConfiguration;
			}));
		return http.build();
	}

}
