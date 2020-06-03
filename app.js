'use strict';

function init() {
  addHandlers();
  render();
}

function restartGame() {
  STORE.quizStarted = false;
  STORE.questionNumber = 0;
  STORE.score = 0;
}

function checkAnswer() {
  let correctAnswer = STORE.questions[STORE.questionNumber].correctAnswer;
  if (STORE.selectedAnswer === correctAnswer) {
    STORE.score++;
  }
  giveFeedback(correctAnswer);
}

function nextQuestion() {
  // go to the next question, or end the game
  STORE.questionAnswered = false;
  STORE.selectedAnswer = '';
  STORE.questionNumber++;
  render();
}

function gradeResults() {
  let obj = { title: '', message: '' };
  if (STORE.score >= .8 * STORE.questions.length) {
    obj.title = '🎉 Good job!';
    obj.message = `You got ${STORE.score} question${STORE.score !== 1 ? 's' : ''} correct!<br>
                  Someone should give you a ribbon!`;
  } else if (STORE.score >= .5 * STORE.questions.length) {
    obj.title = '😨 Wow...';
    obj.message = `You only managed to get ${STORE.score} question${STORE.score !== 1 ? 's' : ''} right.<br>
                  Go read a book or something.`;
  } else if (STORE.score > 0) {
    obj.title = '🤔 Hmmm...';
    obj.message = `It takes a certain kind of person to get only ${STORE.score} question${STORE.score !== 1 ? 's' : ''} right.<br>
                  We're praying for you.`;
  } else {
    obj.title = '👀 Yikes...';
    obj.message = 'We <em>literally cannot</em> understand how you didn\'t get anything right. Good job?';
  }

  return obj;
}

function addHandlers() {
  startGameHandler();
  cardClickHandler();
  cardHoverHandler();
  formSubmitHandler();
  restartGameHandler();
  nextHandler();
}

function startGameHandler() {
  $('main').on('click', '#startGame', () => {
    STORE.quizStarted = true;
    render();
    if (STORE.demoCompleted === false) demonstrateScroll();
  });
}

function restartGameHandler() {
  $('main').on('click', '#restart', () => {
    restartGame();
    render();
  });
}

function cardClickHandler() {
  $('main').on('change', '.card', e => {
    let element = $(e.target).closest('label').find('input');
    let text = element.val();
    STORE.selectedAnswer = text;

    let width = $('body').outerWidth();

    // auto submit on mobile devices
    if (width < 500) {
      element.closest('form').submit();
    } else {
      render();
      $('main').find('input:checked').focus().click();
    }
  });
}

**
 *Listens for hover of the .card and updates the answer card to match
*/
function cardHoverHandler() {
  $('main').on('mouseover', '.card', e => {
    let element = $(e.target).closest('label');
    try {
      element.find('input').focus().click();
    } catch (e) { /* ignored */ }
  });
}

/**
 *Listens for the form submit event and checks the answer
*/
function formSubmitHandler() {
  $('main').on('submit', 'form', e => {
    e.preventDefault();
    checkAnswer();
  });
}

/**
 *Listenes for next question button click and goes to next
*/
function nextHandler() {
  $('main').on('click', '#nextButton', e => {
    e.preventDefault();
    nextQuestion();
  });
}

// =============================================================
// TEMPLATE GENERATION FUNCTIONS
// =============================================================

/**
 *Returns the start page template
*/
function renderMainPage() {
  return `
  <div class="container">
    <section id="middle">
      ${STORE.quizStarted === false ? `
      <button class="btn btn-default" id="startGame">Start Game</button>
      ` : `
      <article id="result">
        <h2>${gradeResults().title}</h2>
        <p>${gradeResults().message}</p>
        <p>*All the rude messages are <em>entirely</em> sarcastic. 💖</p>
        <button class="btn btn-default btn-small" id="restart">Start Over</button>
      </article>
      `}
    </section>
    <section id="bottom">
      <div class="credits">
        <h3>Quiz Against Humanity ${STORE.appVesion}</h3>
        <p>
          Designed & developed by<br>
          <a id="rg" href="https://github.com/Vicious27" target="_blank">@vicious27</a> 
          and <a id="mk" href="https://github.com/malcolmkiano" target="_blank">@malcolmkiano</a>
        </p>
      </div>
    </section>
  </div>
  `;
}

/**
 *Returns the game page template
*/
function renderGamePage() {
  let currentQuestion = STORE.questions[STORE.questionNumber];
  return `
  ${renderScoreAndQuestionNumber()}
  <form class="container">
    ${STORE.questionAnswered === true ? renderFeedback() : ''}
    ${renderQuestion(currentQuestion)}
    ${renderAnswers(currentQuestion)}
  </form>
  `;
}

/**
 *Returns the score & question number template
*/
function renderScoreAndQuestionNumber() {
  return `
  <section id="info">
    <p>Score: <span>${STORE.score}/${STORE.questions.length}</span></p>
    <p>Question: <span>${STORE.questionNumber + 1}/${STORE.questions.length}</span></p>
  </section>
  `;
}

/**
 *Returns the feedback (if the question was answered)
*/
function renderFeedback() {
  let q = STORE.questions[STORE.questionNumber];
  let a = STORE.selectedAnswer;
  let isCorrectAnswer = (a === q.correctAnswer);
  let isLastQuestion = (STORE.questionNumber === STORE.questions.length - 1);
  return `
  <section id="feedback">
    <article>
      ${isCorrectAnswer === true ? `
      <h2>Nice!</h2>
      <p>
        '<span class="right">${a}</span>' was the right answer.<br>
        So you <em>do</em> have a brain!
      </p>
      <p>Go you! 🙄</p>
      ` : `
      <h2>Whoops!</h2>
      <p>
        '<span class="wrong">${a}</span>' wasn't the right answer.<br>
        If you were smarter, you would have picked '<span class="right">${q.correctAnswer}</span>'.
      </p>
      <p>Oh, well. 🤷‍♂️</p>
      `}
      Find out more <a target="_blank" href="${q.source}">here</a>.
      <a href="#" id="nextButton" class="btn btn-alt">${isLastQuestion ? 'See my results' : 'Next Question'}</a>
    </article>
  </section>
  `;
}

/**
 *Returns the question template
*/
function renderQuestion(q) {
  return `
  <section id="middle">
    <article>
      <p id="question" class="card card-question">
        <span>${q.question}</span>
      </p>
      <p id="answer" class="card">
        <span>${STORE.selectedAnswer ? STORE.selectedAnswer : 'Your answer goes here.'}</span>
        <input class="btn btn-alt" type="submit" value="Click here to submit" />
      </p>
    </article>
  </section>
  `;
}

/**
 *Returns the answer template
*/
function renderAnswers(q) {
  let answersHTML = '';
  for (let i = 0; i < q.answers.length; i++) {
    let answer = q.answers[i];
    let isCheckedAnswer = STORE.selectedAnswer === answer ? true : false;

    answersHTML += `
    <label for="answer${i}" class="card ${STORE.questionAnswered === true ? answer === q.correctAnswer ? 'card-correct' : '' : ''}">
      <input required type="radio" ${isCheckedAnswer === true ? 'checked' : ''} name="answer" value="${answer}" id="answer${i}">
      <span>${answer}</span>
    </label>
    `;
  }

  return `
  <section id="bottom">
    <div class="cards ${STORE.questionAnswered === true ? 'answered' : ''}">
      ${answersHTML}
    </div>
  </section>
  `;
}



// =============================================================
// DOM READY FUNCTION
// =============================================================
$(init);
  // 5 or more questions are required
  const questionsArray = [
    //question 0
    // Answers are indexed starting from 0
    {
        questionText: 'What is the technical name for the '#' symbol ?',
        questionChoice: ['Hashtag', 'Pound', 'Octothorpe', 'Number Sign'],
        questionAnswer: 2,
    },
    //question 1
    {
        questionText: 'IBM created one of the earliest computer programming languages in what year?',
        questionChoice: ['1991', '1974', '1980', '1957'],
        questionAnswer: 3
    },
    //question 2
    {
        questionText: 'Whom do many historians consider the first programmer?',
        questionChoice: ['Ada Lovelace', 'Charles Babbage', 'Bill Gates', 'Lord Byron'],
        questionAnswer: 0,
    },
    //question 3
    {
        questionText: 'Which of the following operators has the highest precedence?',
        questionChoice: ['*', '&&', '!=', '!'],
        questionAnswer: 3,
    },
    //question 4
    {
        questionText: 'Who wrote the classic manual, "The C Programming Language"?',
        questionChoice: ['Hall and Oats', 'Kernighan and Ritchie', 'Steve Jobs', 'Corky Romano'],
        questionAnswer: 1,
    },
    //question 5
    {
        questionText: 'Which SQL command would you use to retrieve a record from the database?',
        questionChoice: ['SELECT', 'GET', 'RETREIVE', '#FIND'],
        questionAnswer: 0,
    },
  ];
  let quizStarted: false,
  let questionNumber: 0,
  let score: 0
  let totalQuestion: questionsArray.length; 

<<<<<<< HEAD
  function enterHere() {
    $('.start-button').click(function () {
        $('.start-section').hide();
        $('.question-section').show();
        $('.final-section').hide();
        console.log('1.startChoppin ran');
        currentQuestionNumber = 0;
        console.log('currentQuestionNumber');
    })
};

function generateQuestionPage() {
  return `
<<<<<<< HEAD
    <li>
      <span class="shopping-item js-shopping-item ${item.checked ? "shopping-item__checked" : ''}">${item.name}</span>
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
=======
      <span class=".start-button"</span>
      <div class="enter-here">
        <button type='submit' class="next"> 
            <span class="button-label">Answers</span>
        </button>
        <button  type='submit' class="next">
            <span class="button-label">Answer1</span>
>>>>>>> 4dbb2f95e4ffef546831e7bb01b712d8c66c6ee2
        </button>
        <button  type='submit' class="next">
            <span class="button-label">Answer1</span>
        </button><button  type='submit' class="next">
            <span class="button-label">Answer1</span>
        </button>
      </div>`
    </li>;
}

<<<<<<< HEAD
function renderQuestions() {
=======
/*function renderShoppingList() {
>>>>>>> 4dbb2f95e4ffef546831e7bb01b712d8c66c6ee2
  // render the shopping list in the DOM
  console.log('`renderQuestions` ran');
  const firstquestio = generateShoppingItemsString(STORE);

  // insert that HTML into the DOM
  $('.js-shopping-list').html(shoppingListItemsString);
}

function handleNewItemSubmit() {
  $('#js-shopping-list-form').submit(function(event) {
    event.preventDefault();
    console.log('`handleNewItemSubmit` ran');
    const newItemName = $('.js-shopping-list-entry').val();
    $('.js-shopping-list-entry').val('');
    addItemToShoppingList(newItemName);
    renderShoppingList();
  });
}

function toggleCheckedForListItem(itemId) {
  console.log("Toggling checked property for item with id " + itemId);
  const item = STORE.find(item => item.id === itemId);
  item.checked = !item.checked;
}


function getItemIdFromElement(item) {
  return $(item)
    .closest('li')
    .data('item-id');
}

function handleItemCheckClicked() {
  $('.js-shopping-list').on('click', `.js-item-toggle`, event => {
    console.log('`handleItemCheckClicked` ran');
    const id = getItemIdFromElement(event.currentTarget);
    toggleCheckedForListItem(id);
    renderShoppingList();
  });
}


// name says it all. responsible for deleting a list item.
function deleteListItem(itemId) {
  console.log(`Deleting item with id  ${itemId} from shopping list`)

  // as with `addItemToShoppingLIst`, this function also has the side effect of
  // mutating the global STORE value.
  //
  // First we find the index of the item with the specified id using the native
  // Array.prototype.findIndex() method. Then we call `.splice` at the index of 
  // the list item we want to remove, with a removeCount of 1.
  const itemIndex = STORE.findIndex(item => item.id === itemId);
  STORE.splice(itemIndex, 1);
}


function handleDeleteItemClicked() {
  // like in `handleItemCheckClicked`, we use event delegation
  $('.js-shopping-list').on('click', '.js-item-delete', event => {
    // get the ID of the item from the HTML
    const itemId = getItemIdFromElement(event.currentTarget);
    // delete the item
    deleteListItem(itemId);
    // render the updated shopping list
    renderShoppingList();
  });
}

// this function will be our callback when the page loads. it's responsible for
// initially rendering the shopping list, and activating our individual functions
// that handle new item submission and user clicks on the "check" and "delete" buttons
// for individual shopping list items.
function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
}

// when the page loads, call `handleShoppingList`
$(handleShoppingList);
=======
 
>>>>>>> 6ea8e54631f906dd24842a28068ee789c5236c11

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