package com.muralis.rinhacontrolesubmissoes.core.config;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan(basePackages = "com.muralis.rinhacontrolesubmissoes.core")
@EnableAutoConfiguration
@EnableCaching
public class CoreConfiguration {

}
