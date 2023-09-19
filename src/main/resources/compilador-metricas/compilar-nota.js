// imports
const fs = require('fs');

// exec args
const summaryFolder = process.argv[2];
const scoreFolder = process.argv[3];

// Read Summary file from summaryFolder arg
const summaryJSON = JSON.parse(fs.readFileSync(summaryFolder));

// summaryJSON values
const data = {
    reqTotal: summaryJSON.metrics.http_reqs.count,
    reqTimedOut: summaryJSON.metrics.http_req_failed.fails,
    checksTotal: summaryJSON.metrics.checks.passes + summaryJSON.metrics.checks.fails,
    checksFailed: summaryJSON.metrics.checks.fails,
}

let totalScore = 0;

async function exec() {
    /**
     * Quantidade de requests sem timeout que representa uma nota 100 em performance.
     */
    const TARGET_REQUESTS = 1000000;

    /**
     * Usar um expoente de 0.5 significa que alcançar 25% do target de requisições
     * gera uma pontuação de 50/100 em performance.
     */
    const PERFORMANCE_SCORE_EXPONENT = 0.5;

    const PERFORMANCE_WEIGHT = 0.4;

    /**
     * Usar um expoente de 5 significa que alcançar 87% de taxa de checks com
     * sucesso gera uma pontuação de 50/100 em correctness.
     */
    const CORRECTNESS_SCORE_EXPONENT = 5;

    const CORRECTNESS_WEIGHT = 0.3;

    /**
     * Usar um expoente de 7 significa que alcançar 90% de taxa de requests completas
     * sem timeout gera uma pontuação de 50/100 em stability.
     */
    const STABILITY_SCORE_EXPONENT = 7;

    const STABILITY_WEIGHT = 0.3;

    /**
     * Quanto (de 0 a 1) que a pontuação final é reduzida por conta de pontuações
     * serem muito desiguais entre si.
     *
     * Ao usar valores próximos de 1, uma porção maior do resultado final será
     * removido quando as pontuações individuais forem muito desiguais. Usar o valor
     * 1 significa que o resultado final inteiro será multiplicado pelo fator de
     * uniformidade (média geométrica sobre média aritmética.)
     */
    const UNIFORMITY_PENALTY = 0.5;

    /**
     * @typedef Data Objeto representando as informações de uma avaliação que serão
     * usadas para gerar a nota.
     * @type {object}
     * @property {number} reqTotal - total de requests disparadas
     * @property {number} reqTimedOut - total de requests que falharam por timeout, precisa ser > 0
     * @property {number} checksTotal - total de checks realizados, precisa ser > 0
     * @property {number} checksFailed - Total de checks que falharam
     */

    /**
     * Recebe os dados de uma avaliação e compila uma nota. A nota retornada é um
     * número de 0 a 100.
     * @param {Data} data
     *  dados usados no cálculo.
     * @returns {number} Número de 0 a 100 que é a nota compilada.
     */
    function calculate(data) {
        console.log("calculating with data: {}", data);
        // Porcentagem do target que foi atingido.
        // O target é uma quantidade de requests.
        // O min(...) não deixa esta porcentagem ser maior que 100% (não deixa
        // exceder o target). Se você quiser permitir performance > 100%, é só
        // remover o min(...).
        const performancePercentage =
            Math.min(TARGET_REQUESTS, data.reqTotal - data.reqTimedOut) /
            TARGET_REQUESTS;

        // 0 a 100
        const performanceScore =
            Math.pow(performancePercentage, PERFORMANCE_SCORE_EXPONENT) * 100;
        console.log("performance calculated: {}", {performanceScore, performancePercentage});

        const correctnessPercentage =
            (data.checksTotal - data.checksFailed) / data.checksTotal;

        // 0 a 100
        const correctnessScore =
            Math.pow(correctnessPercentage, CORRECTNESS_SCORE_EXPONENT) * 100;
        console.log("correctness calculated: {}", {correctnessScore, correctnessPercentage})

        const stabilityPercentage =
            (data.reqTotal - data.reqTimedOut) / data.reqTotal;

        // 0 a 100
        const stabilityScore =
            Math.pow(stabilityPercentage, STABILITY_SCORE_EXPONENT) * 100;
        console.log("stability calculated: {}", {stabilityScore, stabilityPercentage})

        // Agora calculamos um fator de uniformidade que é a média geométrica sobre a
        // média aritmética.
        // Infelizmente, o javascript não tem média geométrica e temos que escrever
        // manualmente. É o produto dos itens elevado ao inverso do número de itens.
        // A média aritmética é mais fácil.
        const geomean = Math.pow(
            [performanceScore, correctnessScore, stabilityScore].reduce(
                (a, b) => a * b
            ),
            1 / 3
        );
        const arithmean =
            [performanceScore, correctnessScore, stabilityScore].reduce(
                (a, b) => a + b
            ) / 3;

        // Número que será próximo de 0 quando as pontuações são muito diferentes, e
        // próximo de 1 quando as pontuações são similares. Será exatamente 1 somente
        // quando as três pontuações forem idênticas.
        const uniformityFactor = geomean / arithmean;

        // Quase lá. Adicionamos as pontuações de acordo com os pesos. O resultado
        // será um número de 0 a 100.
        let finalScore =
            performanceScore * PERFORMANCE_WEIGHT +
            correctnessScore * CORRECTNESS_WEIGHT +
            stabilityScore * STABILITY_WEIGHT;

        // Último passo: Temos o uniformity factor que é um número pequeno quando
        // as pontuações são muito desiguais. Vamos imaginar que tiramos uma "porção"
        // do resultado final, e multiplicamos essa "porção" pelo uniformity factor
        // antes de devolvê-lo ao resultado final.
        // O tamanho dessa "porção" é determinado pelo uniformity penalty.
        let portion = finalScore * UNIFORMITY_PENALTY;
        finalScore = finalScore - portion;

        portion = portion * uniformityFactor;

        finalScore = finalScore + portion;
        performanceFinalScore = performanceScore.toFixed(1);
        correctnessFinalScore = correctnessScore.toFixed(1);
        stabilityFinalScore = stabilityScore.toFixed(1);
        console.debug(`RESULTADO FINAL:`);
        console.debug(`Performance ${performanceScore.toFixed(1)}/100`);
        console.debug(`Correctness ${correctnessScore.toFixed(1)}/100`);
        console.debug(`Stability ${stabilityScore.toFixed(1)}/100`);
        console.debug(`(Uniformity factor ${uniformityFactor.toFixed(1)})`);
        console.debug(" ");
        console.debug(`PONTUAÇÃO FINAL: ${finalScore.toFixed(1)}/100`);
        console.debug("");
        console.debug("");
        return finalScore;
    }

    totalScore += calculate(data);

    // Write Total Score on scoreFolder arg
    fs.createWriteStream(scoreFolder, {encoding: 'binary'})
        .write(JSON.stringify({
            score: totalScore,
            performance: performanceFinalScore,
            correctness: correctnessFinalScore,
            stability: stabilityFinalScore
        }));
}

exec();