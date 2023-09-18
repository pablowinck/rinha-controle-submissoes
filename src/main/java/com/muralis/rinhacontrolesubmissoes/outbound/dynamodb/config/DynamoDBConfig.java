package com.muralis.rinhacontrolesubmissoes.outbound.dynamodb.config;

import com.amazonaws.ClientConfiguration;
import com.amazonaws.auth.DefaultAWSCredentialsProviderChain;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapperConfig;
import org.socialsignin.spring.data.dynamodb.repository.EnableScanCount;
import org.socialsignin.spring.data.dynamodb.repository.config.EnableDynamoDBRepositories;
import org.springframework.context.annotation.*;

@Configuration
@ComponentScan(basePackages = { "com.muralis.rinhacontrolesubmissoes.outbound.dynamodb" })
@EnableDynamoDBRepositories(basePackages = { "com.muralis.rinhacontrolesubmissoes.outbound.dynamodb" })
@Profile("!test")
@EnableScanCount
public class DynamoDBConfig {

	@Bean
	@Primary
	public DynamoDBMapperConfig dynamoDBMapperConfig() {
		return DynamoDBMapperConfig.DEFAULT;
	}

	@Bean
	@Primary
	public DynamoDBMapper dynamoDBMapper(AmazonDynamoDB amazonDynamoDB, DynamoDBMapperConfig config) {
		return new DynamoDBMapper(amazonDynamoDB, config);
	}

	@Bean
	public AmazonDynamoDB amazonDynamoDB() {
		return AmazonDynamoDBClientBuilder.standard()
			.withClientConfiguration(clientConfiguration())
			.withRegion(Regions.US_EAST_1)
			.withCredentials(DefaultAWSCredentialsProviderChain.getInstance())
			.build();
	}

	private ClientConfiguration clientConfiguration() {
		return new ClientConfiguration().withConnectionTimeout(1000);
	}

}
