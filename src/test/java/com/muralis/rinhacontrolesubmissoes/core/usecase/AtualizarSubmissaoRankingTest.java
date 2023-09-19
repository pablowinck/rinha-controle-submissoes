package com.muralis.rinhacontrolesubmissoes.core.usecase;

import com.muralis.rinhacontrolesubmissoes.core.domain.entity.Ranking;
import com.muralis.rinhacontrolesubmissoes.core.domain.entity.Submissao;
import com.muralis.rinhacontrolesubmissoes.core.domain.event.SubmissaoProcessada;
import com.muralis.rinhacontrolesubmissoes.core.domain.repository.RankingRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test")
class AtualizarSubmissaoRankingTest {

    @Autowired
    private AtualizarSubmissaoRanking atualizarSubmissaoRanking;

    @Autowired
    private RankingRepository rankingRepository;

    @DisplayName("Caso existir, deve atualizar o ranking com a submissão")
    @Test
    void deveAtualizarRankingComSubmissao() {
        Submissao submissao = Submissao.builder()
                .userId("123")
                .nota(10D)
                .build();
        Ranking ranking = Ranking.builder()
                .userId("123")
                .nota(5D)
                .build();
        rankingRepository.save(ranking);
        atualizarSubmissaoRanking.on(new SubmissaoProcessada(submissao));
        Ranking rankingSalvo = rankingRepository.findByUserId("123").orElseThrow();
        assertEquals(10D, rankingSalvo.getNota());
    }

    @Test
    @DisplayName("Caso não existir, deve criar o ranking com a submissão")
    void casoNaoExistirDeveCriarOrankingComSubmissao() {
        Submissao submissao = Submissao.builder()
                .userId("1234")
                .nota(10D)
                .build();
        atualizarSubmissaoRanking.on(new SubmissaoProcessada(submissao));
        Ranking rankingSalvo = rankingRepository.findByUserId("1234").orElseThrow();
        assertEquals(10D, rankingSalvo.getNota());
    }

    @Test
    @DisplayName("Caso a nota da submissão for menor que a nota do ranking, não deve atualizar o ranking")
    void casoNotaDaSubmissaoforMenorQueANotaDoRankingNaoDeveAtualizarORanking() {
        Submissao submissao = Submissao.builder()
                .userId("123")
                .nota(4D)
                .build();
        Ranking ranking = Ranking.builder()
                .userId("123")
                .nota(5D)
                .build();
        rankingRepository.save(ranking);
        atualizarSubmissaoRanking.on(new SubmissaoProcessada(submissao));
        Ranking rankingSalvo = rankingRepository.findByUserId("123").orElseThrow();
        assertEquals(5D, rankingSalvo.getNota());
    }

}