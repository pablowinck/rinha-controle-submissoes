const fs = require('fs');
const summaryFolder = process.argv[2];
const scoreFolder = process.argv[3];

console.log("running compilar-nota.js with args: ", {summaryFolder, scoreFolder});

const data = fs.readFileSync(summaryFolder, 'utf8');
const jsonData = JSON.parse(data);
const weights = {
    'http_req_duration': -0.4,
    'http_req_failed': -0.3,
    'http_reqs': 0.2,
    'checks': 0.1
};

let weightedScore = 0;
let totalWeight = 0;

for (const [metric, weight] of Object.entries(weights)) {
    let value;
    if (metric === 'http_reqs' || metric === 'checks') {
        value = jsonData.metrics[metric]?.count || jsonData.metrics[metric]?.passes || 0;
    } else {
        value = jsonData.metrics[metric]?.avg || 0;
    }

    const normalizedValue = value;

    weightedScore += normalizedValue * weight;
    totalWeight += Math.abs(weight);
}

const result = weightedScore / (totalWeight * 100);
const finalScore = weightedScore < 0 ? 0 : result;
let count = 0;
fetch("http://localhost:9999/contagem-pessoas").then((res) => res.json())
    .then((data) => {
        count = data.count;
    }).finally(() => {
    console.log("writing score to file: ", {score: finalScore, count: 0});
    fs.writeFileSync(scoreFolder, JSON.stringify({
        score: finalScore,
        count: count,
    }));
});
