// public/worker.ts

self.onmessage = (e) => {
    const { id, text } = e.data;
  
    // Simulate toxicity detection (50% chance of being toxic)
    const isToxic = Math.random() < 0.5;
  
    postMessage({ id, isToxic });
  };
  