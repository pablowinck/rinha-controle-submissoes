const fs = require("fs");
const readline = require("readline");
const ProgressLogger = require("./progress-logger");

// Constants for metric weights
const WEIGHT = {
  POSITIVE: {
    DURATION: 0.5,
  },
  NEGATIVE: {
    FAILED: 0.1,
    CHECK_FAILED: 0.4,
  },
};

// Initialize an object to store metric values
const metrics = {
  http_req_duration: [],
  http_req_blocked: [],
  http_req_check_failed: [],
  http_req_failed: [],
};

/**
 * Calculate the average of an array of numbers.
 * @param {number[]} arr - The array of numbers
 * @returns {number} - The average value
 */
function calculateAverage(arr) {
  const sum = arr.reduce((a, b) => a + b, 0);
  return arr.length ? sum / arr.length : 0;
}

/**
 * Normalize a metric value based on a maximum value.
 * @param {number} value - The metric value to normalize
 * @param {number} maxValue - The maximum value for normalization
 * @returns {number} - The normalized value
 */
function normalize(value, maxValue) {
  if (!value) return 0;
  return value / maxValue;
}

function normalizeScoreValue(value, weight) {
  if (!value) return 0;
  const correctValue = value > 1 ? 1 : value;
  return weight * (weight - correctValue) * 100;
}

function sanitizeScore(score) {
  return score > 0 ? score : 0;
}

/**
 * Calculate the final score based on normalized metrics.
 * @param {Object} normalizedMetrics - The object containing normalized metric values
 * @returns {number} - The final score
 */
function calculateScore(normalizedMetrics) {
  const failedPoints = normalizeScoreValue(
    normalizedMetrics.http_req_failed,
    1,
  );
  const checkFailedPoints = normalizeScoreValue(
    normalizedMetrics.http_req_check_failed,
    1,
  );
  const durationPoints = normalizeScoreValue(
    normalizedMetrics.http_req_duration,
    1,
  );
  let score = 0;
  const noFailedCalls = failedPoints <= 0;
  const noCheckFailedCalls = checkFailedPoints <= 0;
  if (noFailedCalls) {
    console.log("[none-failed-calls] adding 5");
    score += 5;
  }
  if (noCheckFailedCalls) {
    console.log("[none-check-failed] adding 5");
    score += 5;
  }
  const durationScore = durationPoints * WEIGHT.POSITIVE.DURATION;
  const resilienceScore = (WEIGHT.NEGATIVE.FAILED * 100) - (failedPoints * WEIGHT.NEGATIVE.FAILED);
  const checkTestScore = (WEIGHT.NEGATIVE.CHECK_FAILED * 100) - (checkFailedPoints * WEIGHT.NEGATIVE.CHECK_FAILED);
  console.log(`\n[duration-score] adding ${durationScore.toFixed(4)}`);
  console.log(`[resilience-score] adding ${resilienceScore.toFixed(4)}`);
  console.log(`[check-test-score] adding ${checkTestScore.toFixed(4)}`);
  score += sanitizeScore(durationScore);
  score += sanitizeScore(resilienceScore);
  score += sanitizeScore(checkTestScore);
  score = score > 100 ? 100 : score;
  return score < 0 ? 0 : score;
}

// Create a read stream for the metrics file
const fileStream = fs.createReadStream("output.json");
const rl = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity,
});

const totalFileLength = fs.statSync("output.json").size;

const progressLogger = new ProgressLogger(totalFileLength, "#", "-");
let chunkCount = 0;
fileStream.on("data", (chunk) => {
  chunkCount += chunk.length;
  progressLogger.update(chunkCount);
});

// Read the file line by line and collect metric data
rl.on("line", (line) => {
  try {
    const parsedLine = JSON.parse(line);
    const { type, metric, data } = parsedLine;

    if (type === "Point" && metrics[metric] !== undefined) {
      metrics[metric].push(data.value);
    }
    if (metric === "checks" && data.value === 0) {
      metrics["http_req_check_failed"].push(1);
    }
    if (type === "Point") metrics["http_req_check_failed"].push(0);
  } catch (err) {
    console.error(`Error parsing line: ${err}`);
  }
});

// After reading the entire file, calculate and display the final score
rl.on("close", () => {
  const avgMetrics = {};
  for (const [metricName, values] of Object.entries(metrics)) {
    avgMetrics[metricName] = calculateAverage(values);
  }

  const normalizedMetrics = {
    http_req_duration: normalize(avgMetrics.http_req_duration, 1000),
    http_req_blocked: normalize(avgMetrics.http_req_blocked, 1000),
    http_req_failed: normalize(avgMetrics.http_req_failed, 1),
    http_reqs: normalize(avgMetrics.http_reqs, 100),
    http_req_check_failed: normalize(avgMetrics.http_req_check_failed, 1),
  };

  const finalScore = calculateScore(normalizedMetrics);
  console.log(`## Final Score: ${finalScore.toFixed(4)}`);
  fetch("http://localhost:9999/contagem-pessoas").then((res) => res.json())
    .then((data) => {
      fs.writeFileSync("score.json", JSON.stringify({
        score: finalScore,
        count: data.count,
      }));
    }).catch((_) => {
      fs.writeFileSync("score.json", JSON.stringify({
        score: finalScore,
        count: 0,
      }));
    })
});
