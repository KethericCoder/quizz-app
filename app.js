"use strict";
/**
 * Example store structure
 */
const store = {
  // 5 or more questions are required
  questions: [
    {
      question: 'What is the technical name for the "#" symbol ?',
      answers: ["Hashtag", "Pound", "Octothorpe", "Number Sign"],
      correctAnswer: "Pound",
    },
    {
      question:
        "IBM created one of the earliest computer programming languages in what year?",
      answers: ["1991", "1974", "1980", "1957"],
      correctAnswer: "1980",
    },
    {
      question: "Whom do many historians consider the first programmer?",
      answers: ["Ada Lovelace", "Charles Babbage", "Bill Gates", "Lord Byron"],
      correctAnswer: "Ada Lovelace",
    },
    //question 3
    {
      question: "Which of the following operators has the highest precedence?",
      answers: ["*", "&&", "!=", "!"],
      correctAnswer: "!=",
    },
    //question 4
    {
      question: 'Who wrote the classic manual, "The C Programming Language"?',
      answers: [
        "Hall and Oats",
        "Kernighan and Ritchie",
        "Steve Jobs",
        "Corky Romano",
      ],
      correctAnswer: "Kernighan and Ritchie",
    },
    //question 5
  ],
};

let state = {
  quizStarted: "off",
  questionNumber: 0,
  score: 0,
};
let num = 0;

function quizHomePage() {
  return `
      <div class="startpage">
        <h2>Start Quiz</h2>
      </div>
      <div class="startpage">
        <button class="start">
          <span class="begin">Begin</span>
        </button>
      </div>`;
}

/*function quizEndPage() {
  return `
      <div class="endpage">
        <h2>Restart Quiz</h2>
        <button class="reset-button">
          <span class="reset">Retry</span>
        </button>
      </div>`;
} */

/*function generateState() {
  return `
      <div class='state'>
      <p>Question: ${state.questionNumber + 1} of 5</p>
      <p>Current Score: ${state.score} of 5</p>
      </div>`;
}*/

function generateQuestionPage(store, number) {
  console.log("store" + store);
  console.log("number" + number);
  console.log("store" + store.questions);
  return `
        <h1>${store.questions[number].question}</hi>
        <form class="form">
          <div class='answers-container'>
            <input class='answer' type="radio" name='answer' value='0' required>${store.questions[number].answers[0]}<br />
            <input class='answer' type="radio" name='answer' value='1' required>${store.questions[number].answers[1]}<br />
            <input class='answer' type="radio" name='answer' value='2' required>${store.questions[number].answers[2]}<br />
            <input class='answer' type="radio" name='answer' value='3' required>${store.questions[number].answers[3]}<br />
          </div>
          <div class="submit-button">
            <button class="subutton">
            <span class="submitbuttonlabel">Submit</span>
            </button>
          </div>  
        </form>
        <div class="state">
          <p>Question: ${state.questionNumber + 1} of 5</p>
          <p>Current Score: ${state.score} of 5</p>
        </div>`;
}

function generateResult() {
  let message = "";

  if (state.score === 5) {
    // todo: how to get message out to user?
    message = "New High Score";
  } else if (3 <= state.score < 5) {
    message = "Better luck next time";
  } else {
    message = "Try Again";
  }

  return `
  <div class="result">
    <h2>You Have Answered ${state.score} of 5 questions<br>${message}</h2>
  </div>
  <div class="result">
    <button class="playagain">
      <span class="play">Play Again</span>
    </button>
  </div>`;
}

function footer() {
  return `
  <div class="footer">
    <footer>
      <span class="copyright">Abdu & Katie 2020 &copy;</span>
    </footer>
  </div>`;
}

function renderResult() {
  const resultPage = generateResult();
  $("main").html(resultPage);
}

function renderHomePage() {
  const homepage = quizHomePage();
  $("main").html(homepage);
}

function renderEndPage() {
  const endpage = quizEndPage();
  $("main").html(endpage);
}

function renderQuestionPage() {
  const questionsString = generateQuestionPage(store, state.questionNumber);
  $("main").html(questionsString);
}

function generateCorrect() {
  let userAnswer = $('input[class="answer"]:checked').val();
  console.log(userAnswer);
  if(store.questions[state.questionNumber].answers[userAnswer] === store.questions[num].correctAnswer) {
    console.log(state.score);
    state.score += 1;
    $("#myselect option:selected").text();
    return `
      <div class="nextpage">
        <h2>Bravo You got it <br>${store.questions[num].correctAnswer}</h2>
      </div>
      <div class="nextpage">
        <button class="next">
          <span class="nex">Next</span>
        </button>
      </div>`;
  } else {
    return `
      <div class="nextpage">
        <h2> Incorrect! <br>Correct Answer is ${store.questions[num].correctAnswer} </h2>
      </div>
      <div class="nextpage">
        <button class="next">
          <span class="nex">Next</span>
        </button>
      </div>`;
  }
}

function renderCorrect() {
  const correctans = generateCorrect();
  $("main").html(correctans);
}

function handleCorrect() {
  $("main").on("click", ".next", () => {
    if (state.questionNumber === 4) {
      renderResult();
    } else {
      state.questionNumber += 1;
      num += 1;
      renderQuestionPage();
    }
  });
}

function handleSubmit() {
  $("main").on("click", ".subutton", () => {
    event.preventDefault();
    console.log($('input:checked'));
    if($('input[class="answer"]:checked').val() === undefined) {
      console.log('choose one');
    }
    else {
      renderCorrect();
    }
  });
}
function handleResult() {
  $("main").on("click", ".result", () => {
    renderHomePage();
    state.quizStarted = "off";
    state.questionNumber = 0;
    state.score = 0;
    num = 0;
  });
}

function handleStart() {
  $("main").on("click", ".start", () => {
    renderQuestionPage();
    state.quizStarted = "on";
  });
}

function handleQuiz() {
  renderHomePage();
  //renderQuestionPage();
  handleStart();
  handleSubmit();
  handleResult();
  handleCorrect();
  renderFooter();

  //renderQuizStarted();
  //handleCorrectAnswer();
  //handleItemCheckClicked();
  //handleDeleteItemClicked();
}

$(handleQuiz);
