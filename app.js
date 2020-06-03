/**
 * Example store structure
 */
  // 5 or more questions are required
  const questionsArray = [
    //question 0
    {
        questionText: 'The best tool to peel a ginger is...',
        questionChoice: ['Vegetalble peeler', 'Cheese grater', 'Paring Knife', 'Spoon'],
        questionAnswer: 3,
    },
    //question 1
    {
        questionText: 'The ingredient that enhances the level of spiciness of a dish is…',
        questionChoice: ['Salt', 'Garlic', 'Paprika', 'Fat'],
        questionAnswer: 1
    },
    //question 2
    {
        questionText: 'To sear a protein, usually it\'s best to…',
        questionChoice: ['Let the protein sits in the pan for one side as long as possible', 'Flip the protein in the pan as many times as possible', 'Cook the protein with the thinnest pan', 'Start the cooking process from an oven'],
        questionAnswer: 0,
    },
    //question 3
    {
        questionText: 'The ingredient that can contribute the taste of sweet in a dish is…',
        questionChoice: ['Paprika', 'Onion', 'Garlic', 'Fish Sauce'],
        questionAnswer: 1,
    },
    //question 4
    {
        questionText: 'Poaching is...',
        questionChoice: ['Cooking in loew heat', 'Cooking by simmering in liquid', 'Cooking something halfway done', 'Cooking something under 30 seconds'],
        questionAnswer: 1,
    },
    //question 5
    {
        questionText: 'Sunny-side-up egg is...',
        questionChoice: ['A half boiled egg', 'A pan fried egg cooked halfway done', 'A pan fired egg with broken yolk', 'A grilled egg'],
        questionAnswer: 1,
    },
  ];
  let quizStarted: false,
  let questionNumber: 0,
  let score: 0
  let totalQuestion: questionsArray.length; 


function generateItemElement(item) {
  return `
    
      <span class="shopping-item js-shopping-item ${item.checked ? "shopping-item__checked" : ''}">${item.name}</span>
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
        </button>
      </div>`;
}

function renderShoppingList() {
  // render the shopping list in the DOM
  console.log('`renderShoppingList` ran');
  const shoppingListItemsString = generateShoppingItemsString(STORE);

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