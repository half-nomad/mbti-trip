const screens = {
  start: document.getElementById("start-screen"),
  question: document.getElementById("question-screen"),
  result: document.getElementById("result-screen"),
};

let current = 0;
let answers = [];
let locked = false; // 빠르게 두 번 누르면 다음 질문까지 골라지는 것을 막는다

function show(name) {
  for (const key in screens) screens[key].hidden = key !== name;
}

function startQuiz() {
  current = 0;
  answers = [];
  show("question");
  renderQuestion();
}

function renderQuestion() {
  const q = QUESTIONS[current];
  document.getElementById("progress-text").textContent = `${current + 1} / ${QUESTIONS.length}`;
  document.getElementById("progress-bar").style.width = `${((current + 1) / QUESTIONS.length) * 100}%`;
  document.getElementById("question-text").textContent = q.text;

  const box = document.getElementById("options");
  box.replaceChildren();
  for (const option of q.options) {
    const btn = document.createElement("button");
    btn.className = "option";
    btn.textContent = option.label;
    btn.addEventListener("click", () => choose(option.letter));
    box.appendChild(btn);
  }
}

function choose(letter) {
  if (locked) return;
  locked = true;
  setTimeout(() => (locked = false), 400);
  answers.push(letter);
  current++;
  if (current < QUESTIONS.length) renderQuestion();
  else showResult();
}

// 축마다 앞 글자를 더 많이 골랐으면 앞 글자, 아니면(같을 때 포함) 뒤 글자.
// E/I는 질문이 2개라 둘 다 E를 골라야 E가 된다.
function getType() {
  const count = (l) => answers.filter((a) => a === l).length;
  return [["E", "I"], ["S", "N"], ["T", "F"], ["J", "P"]]
    .map(([a, b]) => (count(a) > count(b) ? a : b))
    .join("");
}

function showResult() {
  const type = getType();
  const city = CITIES[type];

  document.getElementById("result-type").textContent = type;
  document.getElementById("result-city").textContent = city.name;
  document.getElementById("result-country").textContent = city.country === city.name ? "" : city.country;
  document.getElementById("result-intro").textContent = city.intro;

  const photo = document.getElementById("result-photo");
  photo.src = `images/${city.photo.file}`;
  photo.alt = `${city.name} 풍경`;

  const credit = document.getElementById("result-credit");
  credit.textContent = `${city.photo.artist} (${city.photo.license})`;
  credit.href = city.photo.page;

  const list = document.getElementById("result-todos");
  list.replaceChildren();
  for (const todo of city.todos) {
    const li = document.createElement("li");
    li.textContent = todo;
    list.appendChild(li);
  }

  show("result");
}

document.getElementById("start-btn").addEventListener("click", startQuiz);
document.getElementById("retry-btn").addEventListener("click", () => show("start"));
