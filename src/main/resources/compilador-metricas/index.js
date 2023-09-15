import http from "k6/http";
import { check, group, sleep } from "k6";

export const options = {
  stages: [
    // load
    { duration: "1m", target: 200 },
    { duration: "30s", target: 0 }, // ramp down
    // smoke
    { duration: "1m", target: 3 },
    { duration: "30s", target: 0 }, // ramp down
    // stress
    { duration: "4m", target: 200 },
    { duration: "2m", target: 400 },
    { duration: "30s", target: 0 }, // ramp down
    // spike
    { duration: "2m", target: 2000 },
    { duration: "1m", target: 0 },
    { duration: "1m", target: 2000 },
    { duration: "1m", target: 0 },
  ],
};

function generateNickname() {
  return `user-${Math.random().toString(36).substring(2, 9)}`;
}

function successTestSuite({ res, nickname, userId }) {
  check(res, {
    "status is 200": (r) => r.status === 200,
    "nickname is unique": (r) => JSON.parse(r.body).apelido === nickname,
    "name is not null": (r) => JSON.parse(r.body).nome !== null,
    "nickname is not null": (r) => JSON.parse(r.body).apelido !== null,
    "name is a string": (r) => typeof JSON.parse(r.body).nome === "string",
    "stack is an array of strings": (r) => {
      const stack = JSON.parse(r.body).stack;
      if (!stack) return true;
      return (
        Array.isArray(stack) && stack.every((item) => typeof item === "string")
      );
    },
    "stack can be null": (r) =>
      JSON.parse(r.body).stack === null ||
      Array.isArray(JSON.parse(r.body).stack),
    "id is UUID and unique": (r) => {
      return /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/.test(
        userId,
      );
    },
  });
}

export default function () {
  const baseUrl = "http://localhost:9999";
  let userId;
  let nickname = generateNickname();
  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  group("Create Person", () => {
    group("Create Person Success", () => {
      const payload = JSON.stringify({
        apelido: nickname,
        nome: `Test User ${Math.random()}`,
        nascimento: "2000-10-01",
        stack: ["Node", "JavaScript"],
      });

      const res = http.post(`${baseUrl}/pessoas`, payload, params);
      userId = JSON.parse(res.body).id;

      successTestSuite({ res, nickname, userId });
    });

    group("Create Person Fail By Nickname More Than 32 Characters", () => {
      const payload = JSON.stringify({
        apelido: "user-123456789012345678901234567890123",
        nome: `Test User ${Math.random()}`,
        nascimento: "2000-10-01",
        stack: ["Node", "JavaScript"],
      });

      const res = http.post(`${baseUrl}/pessoas`, payload, params);

      check(res, {
        "status is 400": (r) => r.status === 400,
      });
    });

    group("Create Person Fail By Name More Than 100 Characters", () => {
      const payload = JSON.stringify({
        apelido: generateNickname(),
        nome: `Test ${() => {
          let res;
          for (let i = 0; i < 100; i++) {
            res += "a";
          }
        }}`,
        nascimento: "2000-10-01",
        stack: ["Node", "JavaScript"],
      });

      const res = http.post(`${baseUrl}/pessoas`, payload, params);

      check(res, {
        "status is 400": (r) => r.status === 400,
      });
    });

    group("Create Person Fail By Stack Not Being An Array", () => {
      const payload = JSON.stringify({
        apelido: generateNickname(),
        nome: `Test User ${Math.random()}`,
        nascimento: "2000-10-01",
        stack: "Node, JavaScript",
      });

      const res = http.post(`${baseUrl}/pessoas`, payload, params);

      check(res, {
        "status is 400": (r) => r.status === 400,
      });
    });

    group("Create Person Fail By Stack Containing Non-String Values", () => {
      const payload = JSON.stringify({
        apelido: generateNickname(),
        nome: `Test User ${Math.random()}`,
        nascimento: "2000-10-01",
        stack: ["Node", 123],
      });

      const res = http.post(`${baseUrl}/pessoas`, payload, params);

      check(res, {
        "status is 400": (r) => r.status === 400,
      });
    });

    group("Create Person Fail By Apelido is Null", () => {
      const payload = JSON.stringify({
        apelido: null,
        nome: `Test User ${Math.random()}`,
        nascimento: "2000-10-01",
        stack: ["Node", "JavaScript"],
      });

      const res = http.post(`${baseUrl}/pessoas`, payload, params);

      check(res, {
        "status is 400": (r) => r.status === 400,
      });
    });

    group("Create Person Fail By Nome is Null", () => {
      const payload = JSON.stringify({
        apelido: generateNickname(),
        nome: null,
        nascimento: "2000-10-01",
        stack: ["Node", "JavaScript"],
      });

      const res = http.post(`${baseUrl}/pessoas`, payload, params);

      check(res, {
        "status is 400": (r) => r.status === 400,
      });
    });

    sleep(1);
  });

  group("Get Person by ID", () => {
    const res = http.get(`${baseUrl}/pessoas/${userId}`);
    successTestSuite({ res, nickname, userId });
    sleep(1);
  });

  group("Search Persons", () => {
    const res = http.get(
      `${baseUrl}/pessoas?t=${nickname.substring(0, nickname.length - 2)}`,
    );

    check(res, {
      "status is 200": (r) => r.status === 200,
      "name is not null": (r) => JSON.parse(r.body)[0].nome !== null,
      "nickname is not null": (r) => JSON.parse(r.body)[0].apelido !== null,
      "name is a string": (r) => typeof JSON.parse(r.body)[0].nome === "string",
    });

    sleep(1);
  });

  group("Get Person Count", () => {
    const res = http.get(`${baseUrl}/contagem-pessoas`);
    check(res, {
      "status is 200": (r) => r.status === 200,
      "count is a number": (r) => typeof JSON.parse(r.body).count === "number",
    });

    sleep(1);
  });

  group("Get Person Count, Insert One and Get Count Again", () => {
    const res = http.get(`${baseUrl}/contagem-pessoas`);
    check(res, {
      "status is 200": (r) => r.status === 200,
    });

    const totalBefore = JSON.parse(res.body).count;

    const payload = JSON.stringify({
      apelido: generateNickname(),
      nome: `Test User ${Math.random()}`,
      nascimento: "2000-10-01",
      stack: ["Node", "JavaScript"],
    });

    http.post(`${baseUrl}/pessoas`, payload, params);

    const res2 = http.get(`${baseUrl}/contagem-pessoas`);

    check(res2, {
      "status is 200": (r) => r.status === 200,
    });

    const totalAfter = JSON.parse(res2.body).count;

    check(totalAfter, {
      "total increased": (r) => totalAfter > totalBefore,
    });

    sleep(1);
  });
}
