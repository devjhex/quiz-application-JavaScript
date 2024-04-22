
const numberInput = document.querySelector('#number');
let initialInputValue = numberInput.value;

const addBtn = document.querySelector('.add');
const minusBtn = document.querySelector('.minus');

const step = 1;
const maximum = 15;
const minimum = 5;

window.addEventListener('DOMContentLoaded', ()=>{

fetchCategoriesAndPopulateSelectMenu();

});

async function fetchCategoriesAndPopulateSelectMenu(){
  try {
    const fetchedCategories = await fetchCategories();

    /* populate select menu */
    populateSelectMenu(fetchedCategories);

    /* remove the loader from the start */
    toggleStartLoader('removeLoader');

  } catch (error) {
    console.error('Error fetching categories', error)
  }
}

function toggleStartLoader(operation){
  const startImgContainer =  document.querySelector('.startImgContainer');
  const startBtnContainer = document.querySelector('.startBtnContainer');
  const loadingText = document.querySelector('.loadingText');

  if(operation === 'addLoader') {

     /* add the loader for the start */
     startImgContainer.classList.add('animate-hexPulse');
     startBtnContainer.classList.add('hidden');
     loadingText.classList.add('hidden');

  }else if(operation === 'removeLoader') {

     /* remove the loader from the start */
     startImgContainer.classList.remove('animate-hexPulse');
     startBtnContainer.classList.remove('hidden');
     loadingText.classList.add('hidden');
  }

}

async function fetchCategories() {
   try{
    const response = await fetch('https://opentdb.com/api_category.php');

    const data = await response.json();

    return data['trivia_categories'];
   }

   catch (error) {
    throw new Error('Error  fetching categories', error);
   }
}

function populateSelectMenu(categories) {
    const categoriesElement = document.querySelector('#categories');

    /* assuming the categories is an array. */
    categories.forEach(category=>{
      const option = document.createElement('option');
      option.value = category.id;
      option.setAttribute('data-id', category.id);
      option.textContent = category.name;

      categoriesElement.appendChild(option);
    });
}


function increment () {
  const numberOfQuestions = document.querySelector('#number');
  let value = parseInt(numberOfQuestions.value);

  if(value < maximum) {
    value+=step;
  }
  else if(isNaN(value)){
    value = minimum;
  }
  return value;
}

function decrement () {
  const numberOfQuestions = document.querySelector('#number');
  let value = parseInt(numberOfQuestions.value);

  if(value > minimum) {
    value-=step;
  }
  else if(isNaN(value)){
    value = minimum;
  }
  return value;
}

function updateInput(input) {
  const numberOfQuestions = document.querySelector('#number');
  numberOfQuestions.value = input; 
  verifyInput();
}

function verifyInput() {
  const startBtn = document.querySelector('.startBtn');

  if(!isNaN(numberInput.value)) {

    /* Check if the input is in the range of the min and max */
    if (numberInput.value > maximum) {

      /* add the maximum limit notification to the user. */
      if (!startBtn.getAttribute('disabled')) {
        startBtn.setAttribute('disabled', 'true');
      }
      showNotification('exceededLimit');
    }
    else if(numberInput.value < minimum) {

      if(!startBtn.getAttribute('disabled')){
        startBtn.setAttribute('disabled', 'true');
      }
      showNotification('belowLimit');
    }

    else if((numberInput.value >= minimum) && numberInput.value <= maximum ){
      /* remove the notification from the display if present. */
      startBtn.removeAttribute('disabled');
      hideNotification();
    }
  }else {
    
    if(!startBtn.getAttribute('disabled')) {
      startBtn.setAttribute('disabled', 'true');
    }
    showNotification('text');
  }
}

function showNotification(invalidInput) {
  const inputContainer = document.querySelector('.inputContainer');
  const notificationElement = document.querySelector(".invalidNotificationContainer");
  let message = notificationElement.querySelector('p');

  if(invalidInput === 'text'){
    message.textContent = "Yov have entered text instead of numbers !!!";
  }else if(invalidInput === 'exceededLimit'){
    message.textContent = "You have exceeded the maximum limit !!!"
  }else if(invalidInput === 'belowLimit'){
    message.textContent = "You have gone below the minimum limit.";
  }

  inputContainer.classList.add('animate-invalid');
  notificationElement.classList.remove('hidden');
}

function hideNotification() {
  const inputContainer = document.querySelector('.inputContainer');
  const notificationElement = document.querySelector(".invalidNotificationContainer");

  inputContainer.classList.remove('animate-invalid');
  notificationElement.classList.add('hidden');
}

addBtn.addEventListener('click', ()=>{
  updateInput(increment());
});
minusBtn.addEventListener('click', ()=>{
  updateInput(decrement());
});
numberInput.addEventListener('input', verifyInput);