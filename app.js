'use strict';
/**
 * Example store structure
 */
  

$(document).ready(function($){
  let index = 0
  
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
        answer: ['Hall and Oats', 'Kernighan and Ritchie', 'Steve Jobs', 'Corky Romano'],
        correctAnswer: 'Kernighan and Ritchie',
      },
    //question 5
      {
        question: 'Which SQL command would you use to retrieve a record from the database?',
        answer: ['SELECT', 'GET', 'RETREIVE', '#FIND'],
        correctAnswer: 'SELECT',
      }
    ],
    quizStarted: false,
    questionNumber: 0,
    score: 0
  };

  function QuizHomePage() {
    
  }

 
  function generateItemElement() {
    return `
      <h1>${store.questions[index].question}</hi>
      <form>
        <div class = "answers">
          <div class = "answer01">
            <button class="answer1">
              <span class="answer1-label">${store.questions[index].answers[0]}</span><br>
            </button>
          </div>
          <div class = "answer01">
            <button class="answer1">
              <span class="answer1-label">${store.questions[index].answers[1]}</span><br>
            </button>
          </div>
          <div class = "answer01">
            <button class="answer1">
              <span class="answer1-label">${store.questions[index].answers[2]}</span><br>
            </button>
          </div>
          <div class = "answer01">
            <button class="answer1">
              <span class="answer1-label">${store.questions[index].answers[3]}</span><br>
            </button>
          </div>
        </div>
        
      </form>
    `;
  }

  function generateQuizApp(store, index) {
    console.log("Generating questions and answers");
  
    const task = generateItemElement(store, index);
    return task
  }

  function renderQuizApp() {
    // render the quiz app in the DOM
    console.log('`quiz app` ran');
    const questionsString = generateQuizApp();
  
    // insert that HTML into the DOM
    $('main').html(questionsString);
  }
  
  function handleCorrectAnswer() {
    $(".answers").on("click", ".answer01", event => {
      event.preventDefault();
      score.store += 1
      index += 1
    })
  }
  
  function handleQuiz() {
    renderQuizApp();
    handleCorrectAnswer();
    /*handleItemCheckClicked();
    handleDeleteItemClicked();*/
  
  }

  $(handleQuiz);
  //your code here
});





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