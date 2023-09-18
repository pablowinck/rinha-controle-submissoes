package com.muralis.rinhacontrolesubmissoes.core.domain.entity;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;
class RankingTest {

    @Test
    @DisplayName("Caso nota maior que nota do ranking, entao deve retornar false")
    void casoNotaMaiorQueNotaDoRankingEntaoDeveRetornarFalse() {
        Ranking ranking = Ranking.builder().nota("1171.1425240904289").build();
        String notaParaComparar = "1172.1425240904289";
        boolean result = ranking.notaMaiorQue(notaParaComparar);
        assertFalse(result);
    }

    @Test
    @DisplayName("Caso nota menor que nota do ranking, entao deve retornar true")
    void casoNotaMenorQueNotaDoRankingEntaoDeveRetornarTrue() {
        Ranking ranking = Ranking.builder().nota("1171.1425240904289").build();
        String notaParaComparar = "1170.1425240904289";
        boolean result = ranking.notaMaiorQue(notaParaComparar);
        assertTrue(result);
    }

}