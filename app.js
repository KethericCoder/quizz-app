'use strict';
/**
 * Example store structure
 */
  
  let number = 0;
  
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

  function quizHomePage() {
    return `
    <div class="startpage">
      <h2> Start Quizz </h2>
      <button class="start">
        <span class="begin">Begin</span>
      </button>
    </div>`
  }

 
  function generateQuizApp() {
      return `
      <h1>${store.questions[number].question}</hi>
      <form>
        <div class = "answers">
          <input type="radio"  name="ans" value="ans">
          <label for="ans">${store.questions[number].answers[0]}</label><br>
          <input type="radio"  name="ans" value="ans">
          <label for="ans">${store.questions[number].answers[1]}</label><br>
          <input type="radio"  name="ans" value="ans">
          <label for="ans">${store.questions[number].answers[2]}</label><br>
          <input type="radio"  name="ans" value="ans">
          <label for="ans">${store.questions[number].answers[3]}</label><br>
        </div>
        <div class='submit-button'>
          <button class="sub button">
          <span class='submitbuttonlabel'>Submit</span>
          </button>
        </div>
      </form>

      <div class = "score"> score ${store.score}</div>
      <div class = "questionnum"> question Number   ${store.questionNumber}</div>
      `;
  }



  function renderHomePage() {
    // render the quiz app in the DOM
    console.log('`quiz app` ran');

    const homepage = quizHomePage();
  // insert that HTML into the DOM
    
  $('main').html(quizHomePage);
   
    
  }

  function renderQuestionsPage() {
    const questionsString = generateQuizApp();
    $('main').html(questionString);
  }
  
  
  function start() {
    $(".start").click(function (event) {
      //event.preventDefault();
      $(renderQuestionsPage);
    })
    
    
  }
  
  function handleQuiz() {
    renderHomePage();
    start();
    //renderQuestionsPage();
    /*handleCorrectAnswer();
    /*QuizHomePage();
    /*handleItemCheckClicked();
    handleDeleteItemClicked();*/
  
  }

  $(handleQuiz);
  //your code here






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