package com.muralis.rinhacontrolesubmissoes.outbound.sqs.config;

import com.amazonaws.auth.DefaultAWSCredentialsProviderChain;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.sqs.AmazonSQSAsync;
import com.amazonaws.services.sqs.AmazonSQSAsyncClientBuilder;
import io.awspring.cloud.messaging.core.QueueMessagingTemplate;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Configuration
@ComponentScan(basePackages = { "com.muralis.rinhacontrolesubmissoes.outbound.sqs" })
public class SQSConfig {

	@Bean
	@Profile("!test")
	public AmazonSQSAsync amazonSQSAsync() {
		return AmazonSQSAsyncClientBuilder.standard()
			.withCredentials(DefaultAWSCredentialsProviderChain.getInstance())
			.withRegion(Regions.US_EAST_1)
			.build();
	}

	@Bean
	@Profile("!test")
	public QueueMessagingTemplate queueMessagingTemplate(AmazonSQSAsync amazonSQSAsync) {
		return new QueueMessagingTemplate(amazonSQSAsync);
	}

}
