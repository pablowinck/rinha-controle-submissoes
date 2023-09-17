package com.muralis.rinhacontrolesubmissoes.core.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProcessarSubmissaoCommand implements Serializable {

	private String id;

}
