package com.muralis.rinhacontrolesubmissoes.inbound.interceptor;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ResponseWithMessage {

	private String mensagem;

}
