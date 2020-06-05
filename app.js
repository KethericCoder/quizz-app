'use strict'; /**
   * Example store structure
   */
const store = {
  // 5 or more questions are required
  questions: [
    {
      question: 'What is the technical name for the "#" symbol ?',
      answers: [
        'Hashtag', 'Pound', 'Octothorpe', 'Number Sign'
      ],
      correctAnswer: 'Pound'
    },
    {
      question: 'IBM created one of the earliest computer programming languages in what year?',
      answers: [
        '1991', '1974', '1980', '1957'
      ],
      correctAnswer: '1980'
    },
    {
      question: 'Whom do many historians consider the first programmer?',
      answers: ['Ada Lovelace', 'Charles Babbage', 'Bill Gates', 'Lord Byron'],
      correctAnswer: 'Ada Lovelace',
    },
    //question 3
    {
      question: 'Which of the following operators has the highest precedence?',
      answers: ['*', '&&', '!=', '!'],
      correctAnswer: '!=',
    },
    //question 4
    {
      question: 'Who wrote the classic manual, "The C Programming Language"?',
      answers: ['Hall and Oats', 'Kernighan and Ritchie', 'Steve Jobs', 'Corky Romano'],
      correctAnswer: 'Kernighan and Ritchie',
    },
    //question 5
  ],
};

let state = {
  quizStarted: 'off',
  questionNumber: 0,
  score: 0
};
let num = 0;

function quizHomePage() {
  return `
      <div class="startpage">
        <h2> Start Quiz </h2>
        <button class="start">
          <span class="begin">Begin</span>
        </button>
      </div>`;
}
    


/*function generateState() {
  return `
      <div class='state'>
      <p>Question: ${state.questionNumber + 1} of 5</p>
      <p>Current Score: ${state.score} of 5</p>
      </div>`;
}
*/
  
function generateQuestionPage(store, number) {
  console.log('store' + store);
  console.log('number' + number);
  console.log('store' + store.questions);
  return `
        <h1>${store.questions[number].question}</hi>
        <form class="form">
          <div class = "answers">
            <select id="myselect">
              <option value="1">${store.questions[number].answers[0]}</option>
              <option value="2">${store.questions[number].answers[1]}</option>
              <option value="3">${store.questions[number].answers[2]}</option>
              <option value="4">${store.questions[number].answers[3]}</option>
            </select>
          </div>
          <div class='submit-button'>
            <button class="subutton">
            <span class='submitbuttonlabel'>Submit</span>
            </button>
          </div>
          
        </form>
        <div class='state'>
            <p>Question: ${state.questionNumber + 1} of 5</p>
            <p>Current Score: ${state.score} of 5</p>
         </div>`;

}

function generateResult() {
  let message = '';

  if (state.score === 5) {
    // todo: how to get message out to user?
    message = 'New High Score';
  } else if (3 <= state.score < 5) {
    message = 'Better luck next time';
  }
  else {
    message = 'Try Again';
  }

  return `
  <div class="result">
    <h2>You Have Answered ${state.score} of 5 questions<br>${message}</h2>
    <button class="result">
      <span class="play">Play Again</span>
    </button>
  </div>`;

}

function renderResult() {
  const resultPage = generateResult();
  $('main').html(resultPage);
}



function renderHomePage() {
  const homepage = quizHomePage();
  $('main').html(homepage);
      
}


      
// insert that HTML into the DOM
      
  

    
      


function renderQuestionPage() {
  const questionsString = generateQuestionPage(store, state.questionNumber);
  $('main').html(questionsString);
  
}

function generateCorrect() {
  console.log($( '#myselect option:selected' ).text());
  if($('#myselect option:selected').text() === store.questions[num].correctAnswer) {
    console.log(state.score);
    state.score += 1;
    $( '#myselect option:selected' ).text();
    return `
      <div class="nextpage">
        <h2>Bravo You got it <br>${store.questions[num].correctAnswer}</h2>
        <button class="next">
          <span class="nex">Next</span>
        </button>
      </div>`;
  }
  else {
    return `
      <div class="nextpage">
        <h2> Incorrect! <br>Correct Answer is ${store.questions[num].correctAnswer} </h2>
        <button class="next">
          <span class="nex">Next</span>
        </button>
      </div>`;
  }
}

function renderCorrect() {
  const correctans = generateCorrect();
  $('main').html(correctans);
}

function handleCorrect() {
  $('main').on('click', '.next', () => {
    if(state.questionNumber === 4) {
      renderResult();
    }
    else {
      state.questionNumber += 1;
      num += 1;
      renderQuestionPage();
    }
  });
}
    
function handleSubmit() {
  $('main').on('click', '.subutton', () => {
    event.preventDefault();
    renderCorrect();
  });

}
function handleResult() {
  $('main').on('click', '.result', () => {
    renderHomePage();
    state.quizStarted ='off';
    state.questionNumber = 0;
    state.score = 0;
    num = 0;
  });
}



function handleStart() {
  $('main').on('click', '.start', () => {
    renderQuestionPage();
    state.quizStarted ='on';
  });
  
}
//todo: need to have an event handler for submit button
// submit button should check answer and determine correct answer, update score, i++ question #, then call render qus page
// should also determine if the quiz is over 
// need end page, reset button, reset button handler will start quiz over
function handleQuiz() {
  renderHomePage();
  //renderQuestionPage();
  handleStart();
  handleSubmit();
  handleResult();
  handleCorrect();
  
  
  //renderQuizStarted();
  //handleCorrectAnswer();
  //handleItemCheckClicked();
  //handleDeleteItemClicked();
    
}

$(handleQuiz);
//your code here
//});





/**
   * 
   * Technical requirements:
   * 
   * Your app should include a render() function, that regenerates the view each time the store is updated. 
   * See your course material, consult your instructor, and reference the slides for more details.
   *
   * NO additional HTML elements should be added to the index.html file.
   *
   * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
   *
   * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
   * 
   */

/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates

/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store

/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)