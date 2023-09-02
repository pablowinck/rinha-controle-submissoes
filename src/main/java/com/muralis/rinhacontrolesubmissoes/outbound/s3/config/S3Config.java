package com.muralis.rinhacontrolesubmissoes.outbound.s3.config;

import com.amazonaws.ClientConfiguration;
import com.amazonaws.auth.DefaultAWSCredentialsProviderChain;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Configuration
@ComponentScan(basePackages = { "com.muralis.rinhacontrolesubmissoes.outbound.s3" })
@Profile("!test")
public class S3Config {

	@Bean
	public AmazonS3 amazonS3(ClientConfiguration clientConfiguration) {
		return AmazonS3ClientBuilder.standard()
			.withCredentials(DefaultAWSCredentialsProviderChain.getInstance())
			.withClientConfiguration(clientConfiguration)
			.withRegion(Regions.US_EAST_1)
			.build();
	}

}
