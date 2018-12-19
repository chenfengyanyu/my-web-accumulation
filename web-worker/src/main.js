const worker = new Worker("../src/worker.js");

worker.onmessage = e => {
  const message = e.data;
  console.log(`[From Worker]: ${message}`);
};

worker.postMessage("Marco!");

