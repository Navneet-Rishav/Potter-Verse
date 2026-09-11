// Potter-Verse — original sorting quiz logic.
// All questions, options, and results below are written for this project
// and are not drawn from any official sorting questionnaire.

const QUESTIONS = [
  {
    q: "A project at work suddenly falls apart the night before it's due. What's your first move?",
    options: [
      { text: "Stay up and fix it myself, whatever it takes.", house: "crimson" },
      { text: "Figure out the fastest path to a win, even if it means cutting a corner.", house: "emerald" },
      { text: "Sit down and calmly map out exactly what went wrong first.", house: "bronze" },
      { text: "Call the team — we fix this together or not at all.", house: "gold" },
    ],
  },
  {
    q: "Pick the compliment you'd rather receive.",
    options: [
      { text: "\"You're fearless.\"", house: "crimson" },
      { text: "\"You're going to go far.\"", house: "emerald" },
      { text: "\"You're the smartest person I know.\"", house: "bronze" },
      { text: "\"You're the most loyal friend I have.\"", house: "gold" },
    ],
  },
  {
    q: "You find a locked door with no explanation. What do you do?",
    options: [
      { text: "Try to break it down.", house: "crimson" },
      { text: "Look for a key someone else overlooked.", house: "emerald" },
      { text: "Study the lock until you understand exactly how it works.", house: "bronze" },
      { text: "Ask around — someone probably knows a story about that door.", house: "gold" },
    ],
  },
  {
    q: "What's worse — losing, or losing unfairly?",
    options: [
      { text: "Losing. I'd rather go down swinging fair.", house: "crimson" },
      { text: "Neither — I'd rather find a way to not lose at all.", house: "emerald" },
      { text: "Losing without understanding why.", house: "bronze" },
      { text: "Losing a friend over the game.", house: "gold" },
    ],
  },
  {
    q: "Choose a motto to live by.",
    options: [
      { text: "\"Leap, and the net will appear.\"", house: "crimson" },
      { text: "\"Ambition is the first step to greatness.\"", house: "emerald" },
      { text: "\"Question everything, assume nothing.\"", house: "bronze" },
      { text: "\"Patience and loyalty outlast talent.\"", house: "gold" },
    ],
  },
];

const RESULTS = {
  crimson: {
    title: "The Crimson House",
    text: "Bold, quick to act, and happiest when there's something worth standing up for. You lead with your heart — just remember to look before you leap.",
  },
  emerald: {
    title: "The Emerald House",
    text: "Sharp, driven, and always thinking two steps ahead. You know what you want and you're not shy about going after it.",
  },
  bronze: {
    title: "The Bronze House",
    text: "Curious to a fault and happiest with a good puzzle. You'd rather understand the 'why' than take anything on faith.",
  },
  gold: {
    title: "The Golden House",
    text: "Steady, fair, and fiercely loyal. You're the person people call first when things go wrong — and the one who actually shows up.",
  },
};

let current = 0;
const scores = { crimson: 0, emerald: 0, bronze: 0, gold: 0 };

const wrap = document.getElementById("quiz-question-wrap");
const progressBar = document.getElementById("quiz-progress-bar");
const resultBox = document.getElementById("quiz-result");
const resultTitle = document.getElementById("quiz-result-title");
const resultText = document.getElementById("quiz-result-text");
const restartBtn = document.getElementById("quiz-restart");

function renderQuestion() {
  const item = QUESTIONS[current];
  progressBar.style.width = `${((current) / QUESTIONS.length) * 100 + 20}%`;

  const optionsHtml = item.options
    .map(
      (opt, i) =>
        `<button class="quiz-option" data-house="${opt.house}" data-index="${i}">${opt.text}</button>`
    )
    .join("");

  wrap.innerHTML = `<p class="quiz-question">${current + 1}. ${item.q}</p><div class="quiz-options">${optionsHtml}</div>`;

  wrap.querySelectorAll(".quiz-option").forEach((btn) => {
    btn.addEventListener("click", () => {
      scores[btn.dataset.house] += 1;
      current += 1;
      if (current < QUESTIONS.length) {
        renderQuestion();
      } else {
        showResult();
      }
    });
  });
}

function showResult() {
  progressBar.style.width = "100%";
  wrap.innerHTML = "";
  const winner = Object.keys(scores).reduce((a, b) => (scores[a] >= scores[b] ? a : b));
  const result = RESULTS[winner];
  resultTitle.textContent = result.title;
  resultText.textContent = result.text;
  resultBox.hidden = false;
}

function resetQuiz() {
  current = 0;
  Object.keys(scores).forEach((k) => (scores[k] = 0));
  resultBox.hidden = true;
  renderQuestion();
}

restartBtn.addEventListener("click", resetQuiz);

renderQuestion();
