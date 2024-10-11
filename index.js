let categories = [];
let player1Score = 0;
let player2Score = 0;

const startTheGame = () => {
  const player1 = document.getElementById("player-1").value;
  const player2 = document.getElementById("player-2").value;

  console.log(player1, player2);

  if (player1 === "" || player2 === "") {
    alert("Please enter both the player's names");
  } else {
    document.getElementById("player-setup").style.display = "none";
  }

  fetchCategories();
};

const removeDuplicates = (arr) => {
  return arr.filter((item, index) => arr.indexOf(item) === index);
};

const fetchCategories = async () => {
  try {
    const response = await fetch("https://the-trivia-api.com/v2/questions");
    const data = await response.json();
    for (let i = 0; i < data.length; i++) {
      categories.push(data[i].category);
    }
    categories = removeDuplicates(categories);
    console.log(categories);
    categories.sort();
  } catch (error) {
    console.log(error);
  }
  const categorySelect = document.getElementById("category-select");
  for (const category of categories) {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categorySelect.appendChild(option);
  }
  document.getElementById("category-selection").style.display = "block";
};

const difficultyLevels = ["easy", "medium", "hard"];
let totalQuestions = [];

const fetchQuestions = async () => {
  const selectedCategory = document.getElementById("category-select").value;
  if (!selectedCategory) {
    alert("Please select a category");
    return;
  }
  document.getElementById("category-selection").style.display = "none";
  try {
    for (const difficulty of difficultyLevels) {
      const response = await fetch(
        `https://the-trivia-api.com/v2/questions?categories=${selectedCategory}&limit=2&difficulty=${difficulty}`
      );
      const data = await response.json();
      totalQuestions = totalQuestions.concat(data);
    }
  } catch (error) {
    console.error("API Error", error);
  }

  let questionIndex = 0;
  document.getElementById("questions-container").style.display = "block";
  displayNextQuestion(questionIndex);
};

const displayNextQuestion = (questionIndex) => {
  if (questionIndex >= totalQuestions.length) {
    console.log("All questions answered");
    displayScores();
    return;
  }

  const questionObj = totalQuestions[questionIndex];
  const player1 = document.getElementById("player-1").value;
  const player2 = document.getElementById("player-2").value;
  const questionContainer = document.getElementById("questions-container");

  questionContainer.innerHTML = "";
  const heading = document.createElement("h3");
  heading.textContent =
    questionIndex % 2 === 0 ? `${player1}'s turn` : `${player2}'s turn`;
  questionContainer.appendChild(heading);

  const questionDisplay = document.createElement("p");
  questionDisplay.textContent = questionObj.question.text;
  questionContainer.appendChild(questionDisplay);

  //Found it to be difficult when compared to giving text field as an answer field
  //https://www.javatpoint.com/how-to-check-a-radio-button-using-javascript
  const input = document.createElement("input");
  const options = questionObj.incorrectAnswers.concat(
    questionObj.correctAnswer
  );
  options.sort(() => Math.random() - 0.5);

  options.forEach((option) => {
    const label = document.createElement("label");
    const radioInput = document.createElement("input");
    radioInput.type = "radio";
    radioInput.name = "answer-value";
    radioInput.value = option;
    label.appendChild(radioInput);
    label.appendChild(document.createTextNode(option));
    questionContainer.appendChild(label);
    questionContainer.appendChild(document.createElement("br"));
  });

  const submitAnswer = document.createElement("button");
  submitAnswer.textContent = "Submit";
  questionContainer.appendChild(submitAnswer);

  const evaluateAnswer = () => {
    const attemptedAnswer = document.querySelector(
      'input[name="answer-value"]:checked'
    );
    if (
      attemptedAnswer.value.toLowerCase() ===
      questionObj.correctAnswer.toLowerCase()
    ) {
      console.log("Correct Answer");
      if (questionIndex === 0 || questionIndex === 1) {
        if (questionIndex % 2 === 0) {
          player1Score += 10;
        } else {
          player2Score += 10;
        }
      } else if (questionIndex === 2 || questionIndex === 3) {
        if (questionIndex % 2 === 0) {
          player1Score += 15;
        } else {
          player2Score += 15;
        }
      } else {
        if (questionIndex % 2 === 0) {
          player1Score += 20;
        } else {
          player2Score += 20;
        }
      }
    }
    questionIndex++;
    displayNextQuestion(questionIndex);
  };

  submitAnswer.addEventListener("click", evaluateAnswer);
};

const displayScores = () => {
  const questionContainer = document.getElementById("questions-container");
  questionContainer.innerHTML = `<h2>Final Scores:</h2>
                                     <p>Player 1 (${
                                       document.getElementById("player-1").value
                                     }): ${player1Score}</p>
                                     <p>Player 2 (${
                                       document.getElementById("player-2").value
                                     }): ${player2Score}</p>`;
};
