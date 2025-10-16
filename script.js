const quiz = [
  { question: "What is the main purpose of Gensyn?", options: ["Decentralized file storage", "Decentralized machine learning compute network", "Blockchain-based social media", "NFT marketplace"], answer: 1 },
  { question: "What type of hardware resources does Gensyn primarily use?", options: ["CPUs", "FPGAs", "GPUs", "ASICs"], answer: 2 },
  { question: "What problem does Gensyn aim to solve in AI training?", options: ["Model overfitting", "Data labeling costs", "Trustless verification of distributed training", "Internet latency"], answer: 2 },
  { question: "What is RL-Swarm used for in Gensyn?", options: ["Managing AI model checkpoints", "Running reinforcement learning training and rankings", "Creating token rewards for validators", "Storing datasets on-chain"], answer: 1 },
  { question: "Who can contribute to Gensyn’s network?", options: ["Only major AI companies", "Anyone with compatible hardware", "Only validators approved by the foundation", "Only academic institutions"], answer: 1 },
  { question: "What ensures that compute providers perform training tasks correctly?", options: ["Manual audits", "Trust-based scoring", "Cryptographic and gradient-based verification", "Reputation system"], answer: 2 },
  { question: "What is BlockAssist?", options: ["A node energy manager", "An AI assistant that learns from players’ actions in Minecraft", "A wallet for GSYN tokens", "A dataset marketplace"], answer: 1 },
  { question: "When was the Gensyn public Testnet launched?", options: ["March 2024", "March 2025", "June 2023", "January 2025"], answer: 1 },
  { question: "Who is the CEO and co-founder of Gensyn?", options: ["Elon Musk", "Ben Fielding", "David Magerman", "Oliver Jones"], answer: 1 },
  { question: "Which of the following were lead investors in Gensyn?", options: ["Andreessen Horowitz (a16z) and CoinFund", "Binance Labs and Sequoia Capital", "Paradigm and Coinbase Ventures", "Lightspeed and Polychain"], answer: 0 }
];

let current = 0;
let score = 0;

const questionText = document.getElementById("questionText");
const optionsContainer = document.getElementById("optionsContainer");
const nextBtn = document.getElementById("nextBtn");
const progressText = document.getElementById("progressText");

function renderQuestion(idx) {
  const q = quiz[idx];
  questionText.textContent = q.question;
  progressText.textContent = `Question ${idx + 1} of ${quiz.length}`;
  optionsContainer.innerHTML = "";
  nextBtn.style.display = "none";

  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = opt;
    btn.onclick = () => handleAnswer(btn, i === q.answer);
    optionsContainer.appendChild(btn);
  });
}

function handleAnswer(button, isCorrect) {
  if (isCorrect) {
    button.classList.add("correct");
    score++;
  } else {
    button.classList.add("wrong");
  }
  [...optionsContainer.children].forEach(b => b.classList.add("disabled"));
  nextBtn.style.display = "inline-block";
}

nextBtn.onclick = () => {
  if (current < quiz.length - 1) {
    current++;
    renderQuestion(current);
  } else {
    showResults();
  }
};

function showResults() {
  let message = "";
  let artSrc = "";

  if (score === quiz.length) {
    message = `🏆 Perfect! You scored ${score} out of ${quiz.length}.`;
    artSrc = "images/quiz1.png";
  } else if (score >= quiz.length / 2) {
    message = `🎉 Great job! You scored ${score} out of ${quiz.length}.`;
    artSrc = "images/quiz2.png";
  } else {
    message = `✨ Keep trying! You scored ${score} out of ${quiz.length}.`;
    artSrc = "images/quiz3.png";
  }

  progressText.textContent = "";
  questionText.textContent = message;
  optionsContainer.innerHTML = "";
  nextBtn.style.display = "none";

  const resultArt = document.createElement("img");
  resultArt.src = artSrc;
  resultArt.alt = "Result Art";
  resultArt.className = "result-art";
  resultArt.style.width = "200px";
  resultArt.style.margin = "20px auto";
  resultArt.style.display = "block";
  resultArt.style.borderRadius = "12px";
  resultArt.style.boxShadow = "0 4px 12px rgba(0,0,0,0.25)";
  optionsContainer.appendChild(resultArt);

  const playAgain = document.createElement("button");
  playAgain.textContent = "Play Again";
  playAgain.className = "option-btn";
  playAgain.style.marginTop = "20px";
  playAgain.onclick = resetQuiz;
  optionsContainer.appendChild(playAgain);
}

function resetQuiz() {
  current = 0;
  score = 0;
  renderQuestion(current);
}

// Init
renderQuestion(current);