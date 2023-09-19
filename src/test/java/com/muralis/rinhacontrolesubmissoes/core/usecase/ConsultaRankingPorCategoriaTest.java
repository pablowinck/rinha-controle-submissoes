package com.muralis.rinhacontrolesubmissoes.core.usecase;

import com.muralis.rinhacontrolesubmissoes.core.domain.entity.Categoria;
import com.muralis.rinhacontrolesubmissoes.core.domain.entity.Ranking;
import com.muralis.rinhacontrolesubmissoes.core.domain.repository.RankingRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Pageable;
import org.springframework.test.context.ActiveProfiles;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test")
class ConsultaRankingPorCategoriaTest {

    @Autowired
    private ConsultaRankingPorCategoria consultaRankingPorCategoria;

    @Autowired
    private RankingRepository rankingRepository;


    @Test
    @DisplayName("Deve retornar o ranking por categoria")
    void deveRetornarORankingPorCategoria() {
        Ranking ranking = Ranking.builder()
                .userId("123")
                .categoria(Categoria.PESO_PENA)
                .nota(10D)
                .build();
        rankingRepository.save(ranking);
        ranking = Ranking.builder()
                .userId("1234")
                .categoria(Categoria.PESO_PENA)
                .nota(9D)
                .build();
        rankingRepository.save(ranking);
        ranking = Ranking.builder()
                .userId("12345")
                .categoria(Categoria.PESO_PESADO)
                .nota(9D)
                .build();
        rankingRepository.save(ranking);
        var pesoPena = consultaRankingPorCategoria.execute("PESO_PENA", Pageable.ofSize(10));
        assertNotNull(pesoPena);
        assertEquals(2, pesoPena.getTotalElements());
    }

    @Test
    @DisplayName("Deve retornar o ranking sem filtrar por categoria")
    void deveRetornarORankingSemFiltrarPorCategoria() {
        Ranking ranking = Ranking.builder()
                .userId("123")
                .categoria(Categoria.PESO_PENA)
                .nota(10D)
                .build();
        rankingRepository.save(ranking);
        ranking = Ranking.builder()
                .userId("1234")
                .categoria(Categoria.PESO_PENA)
                .nota(9D)
                .build();
        rankingRepository.save(ranking);
        ranking = Ranking.builder()
                .userId("12345")
                .categoria(Categoria.PESO_PESADO)
                .nota(9D)
                .build();
        rankingRepository.save(ranking);
        var rankingSemFiltro = consultaRankingPorCategoria.execute(null, Pageable.ofSize(10));
        assertNotNull(rankingSemFiltro);
        assertEquals(3, rankingSemFiltro.getTotalElements());
    }


}