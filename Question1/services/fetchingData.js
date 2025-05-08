const axios = require("axios");

const apiURLs = {
  p: "http://20.244.56.144/evaluation-service/primes",
  f: "http://20.244.56.144/evaluation-service/fibo",
  e: "http://20.244.56.144/evaluation-service/even",
  r: "http://20.244.56.144/evaluation-service/rand",
};

module.exports = async function getNumbersData(type) {
  const url = apiURLs[type];
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 500);

  try {
    const response = await axios.get(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    return { numbers: response.data.numbers, timeout: false };
  } catch {
    clearTimeout(timeoutId);
    return { numbers: [], timeout: true };
  }
};
