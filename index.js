let categories = [];
let player1Score = 0;
let player2Score = 0;
let eliminateCategory = "";

const startTheGame = () => {
  const player1 = document.getElementById("player-1").value;
  const player2 = document.getElementById("player-2").value;

  console.log(player1, player2);

  if (player1 === "" || player2 === "") {
    alert("Please enter both the player's names");
    return;
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
    sessionStorage.setItem("categories", JSON.stringify(categories));
  } catch (error) {
    alert("Failed to fetch categories. Please try again later.");
    throw new Error("Failed to fetch categories: " + error.message);
  }
  iteratingCategories();
  document.getElementById("category-selection").style.display = "block";
};

const iteratingCategories = () => {
  const categorySelect = document.getElementById("category-select");
  categorySelect.innerHTML = "";
  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "Select a category";
  categorySelect.appendChild(defaultOption);
  categories = JSON.parse(sessionStorage.getItem("categories"));
  for (const category of categories) {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categorySelect.appendChild(option);
  }
};

//Explicitly given because iterating through and putting limit with api call as gives 2 easy 2 medium and 2 hard
const difficultyLevels = ["easy", "medium", "hard"];
let totalQuestions = [];

const fetchQuestions = async () => {
  const selectedCategory = document.getElementById("category-select").value;
  eliminateCategory = selectedCategory;
  if (!selectedCategory) {
    alert("Please select a category");
    return;
  }
  document.getElementById("category-selection").style.display = "none";
  totalQuestions = [];
  try {
    for (const difficulty of difficultyLevels) {
      const response = await fetch(
        `https://the-trivia-api.com/v2/questions?categories=${selectedCategory}&limit=2&difficulties=${difficulty}`
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

    const questionContainer = document.getElementById("questions-container");
    questionContainer.innerHTML = "";

    const button1 = document.createElement("button");
    button1.textContent = "End Game";
    button1.addEventListener("click", displayScores);

    const button2 = document.createElement("button");
    button2.textContent = "Next Quiz";
    button2.addEventListener("click", () => {
      categories = JSON.parse(sessionStorage.getItem("categories"));
      categories = categories.filter(
        (category) => category !== eliminateCategory
      );
      sessionStorage.setItem("categories", JSON.stringify(categories));

      if (categories.length === 0) {
        alert("No more categories left!");
        displayScores();
        return;
      }

      iteratingCategories();
      document.getElementById("category-selection").style.display = "block";
      questionContainer.style.display = "none";
    });

    questionContainer.appendChild(button1);
    questionContainer.appendChild(button2);
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
  const player1 = document.getElementById("player-1");
  const player2 = document.getElementById("player-2");
  questionContainer.innerHTML = `<h2>Final Scores:</h2>
                                     <p>Player 1 (${
                                       document.getElementById("player-1").value
                                     }): ${player1Score}</p>
                                     <p>Player 2 (${
                                       document.getElementById("player-2").value
                                     }): ${player2Score}</p>`;

  if (player1Score > player2Score) {
    alert(`${player1.value} is winner.`);
  } else if (player1Score < player2Score) {
    alert(`${player2.value} is winner.`);
  } else {
    alert("Trivia Drawn!!!");
  }
};
