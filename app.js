
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