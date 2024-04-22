
let questions = [];
let questionDatabase;

const loader = document.querySelector('.loader');
const questionPage = document.querySelector('.questionPage');
const questionContainer = questionPage.querySelector('.questionContainer');

const progressBar = document.querySelector('progress');

let progressNotification = document.querySelector('.progressNotification');

let chosenAnswer = false;
let counter = 0;
let results = {
};

 function generateQuestion() {
    let randomQuestionIndex = Math.floor(Math.random() * questions.length);/* Generate according to the length that is remained. */

    let questionObject = questions[randomQuestionIndex];

    /* remove the question from the array. */
    questions.splice(randomQuestionIndex,1);

    return questionObject;
    
}

 function renderQuestion() {
    
    let questionObject = generateQuestion();

    if(questionObject) {
         /* Put the question on the webpage */
    let markup = `<div class="py-8 flex flex-col items-center gap-[2rem] questionSection animate-fadeIn">
    <h1 class="w-10/12 max-w-[600px] text-[1.5rem] sm:text-[2rem] md:text-[2.5rem] text-orange-500 font-bold font-sans text-left question" data-id="${questionObject.id}">${questionObject.question}</h1>

<div class="w-10/12 max-w-[600px] p-2 flex items-start flex-col gap-[1rem] answers">
   <div class="option">

    <input type="radio" id="choice1" class="hidden peer/choice1 group" name="answer">
        <div class="w-full border border-orange-500 text-orange-500 peer-checked/choice1:bg-orange-500 peer-checked/choice1:text-[#6a2d66] p-2 md:p-4 rounded-[.5rem] transition-all duration-[.5s]">
            
            <div class="flex items-start gap-[1rem] ">

            <span class="font-bold md:text-[1.5rem] ">A. </span>

            <div>
                
                <label for="choice1" class="block  text-[1.1rem] sm:text-[1.5rem] cursor-pointer text-left font-semibold choice">${questionObject.choice1}</label>
            </div>
        
            </div>
        </div>
   </div>
   <div class="option">
    <input type="radio" id="choice2" class="hidden peer/choice2" name="answer">
        <div class="w-full border border-orange-500 text-orange-500 peer-checked/choice2:bg-orange-500 peer-checked/choice2:text-[#6a2d66] p-2 md:p-4 rounded-[.5rem] transition-all duration-[.5s]">
            
            <div class="flex items-start gap-[1rem]">

            <span class="font-bold md:text-[1.5rem]">B. </span>

            <div>
                
                <label for="choice2" class="block text-[1.1rem] sm:text-[1.5rem] cursor-pointer text-left font-semibold choice">${questionObject.choice2}</label>
            </div>
        
            </div>
        </div>
   </div>
   <div class="option">
    <input type="radio" id="choice3" class="hidden peer/choice3" name="answer">
        <div class="w-full border border-orange-500 text-orange-500 peer-checked/choice3:bg-orange-500 peer-checked/choice3:text-[#6a2d66] p-2 md:p-4 rounded-[.5rem] transition-all duration-[.5s]">
            
            <div class="flex items-start gap-[1rem]">

            <span class="font-bold md:text-[1.5rem] ">C.</span>

            <div>
                
                <label for="choice3" class="block text-[1.1rem] sm:text-[1.5rem] cursor-pointer text-left font-semibold choice">${questionObject.choice3}</label>
            </div>
        
            </div>
        </div>
   </div>
   <div class="option">
    <input type="radio" id="choice4" class="hidden peer/choice4" name="answer">
        <div class="w-full border border-orange-500 text-orange-500 peer-checked/choice4:bg-orange-500 peer-checked/choice4:text-[#6a2d66] p-2 md:p-4 rounded-[.5rem] transition-all duration-[.5s]">
            
            <div class="flex items-start gap-[1rem]">

            <span class="font-bold md:text-[1.5rem]">D.</span>

            <div>
                
                <label for="choice4" class="block text-[1.1rem] sm:text-[1.5rem] cursor-pointer text-left font-semibold choice">${questionObject.choice4}</label>
            </div>
        
            </div>
        </div>
   </div>

   
   
</div>
<div class="w-10/12 max-w-[600px] flex items-center">
            ${questions.length > 0 ? `<button class="block ml-auto bg-orange-500 text-[#6A2D66] p-2 md:p-3 rounded-[.5rem] font-bold text-xl sm:text-2xl disabled:bg-orange-300 disabled:text-slate-500 transition-colors duration-[.3s] nextBtn " disabled>Next</button>` : `<button class="h-full ml-auto bg-orange-500 text-[#6A2D66] p-2 md:p-3 rounded-[.5rem] font-bold text-xl sm:text-2xl disabled:bg-orange-300 disabled:text-slate-500 transition-colors duration-[.3s] nav-link submitBtn" disabled data-target='results'>See Results</button>`}
            
        </div>
    </div>`;
    questionContainer.innerHTML = markup;

      /* Add event listeners on the inputs */
      document.querySelectorAll('input').forEach(input=>{
        input.addEventListener('input',(event)=>{

            enableButton();
            
        })
    })

    if(questions.length > 0) {

    /* Add event listeners on the next button */
    document.querySelector('.nextBtn').addEventListener('click', ()=>{

        /* save clicked answer on click */
        saveAnswer(getUserAnswer());

        /* render the nextQuestion */
        if(questions.length > 0) {
            /* reset the chosenAnswer variable for the user to answer the next question. */
            chosenAnswer = !chosenAnswer
            renderQuestion();
        }else {
            return;
        }

    })

    }else if(questions.length === 0) {
        document.querySelector('.submitBtn').addEventListener('click', ()=>{

            /* save clicked answer on click */
            saveAnswer(getUserAnswer()); 

            /* summarize results and save them to local storage.*/
            localStorage.setItem('results', JSON.stringify(summarizeResults(results)));

            /* For the user to see the answers input */
            localStorage.setItem('userAnswers', JSON.stringify(results));

            /* reset the defaults for the loader */
            // loaderToggle('addLoader');

        })
    }
    
    updateProgress();
    } else {
        throw new Error('The question Object is empty.');
    }
}

 function updateProgress() {
    counter ++;
    progressBar.value = counter;
    progressNotification.textContent = `${counter}/${questionDatabase.length}`;
}

 function getUserAnswer(){
    let options = Array.from(questionContainer.querySelectorAll('[type="radio"]'));
    let userAnswerObject;
    

    options.forEach(option=>{

        if (option.checked) {
            let questionElement = option.closest('.answers').previousElementSibling;
            let answerElement = option.parentElement.querySelector('label');

            userAnswerObject = {
                userAnswer:answerElement.textContent,
                userChoiceNumber:option.id,
                questionId:parseInt(questionElement.dataset.id)
            }
            return userAnswerObject;
        }
    });

    return userAnswerObject;
}

 function saveAnswer(userAnswerObj){
   
    let questionObject;

    /* Get the question from the shallow copy array. */
    questionObject = questionDatabase.filter(question=>{
        return question.id === userAnswerObj.questionId; 
    })[0];


    /* Add the question and answer info to the results object. */

    results[`question_${userAnswerObj.questionId}`] = {
        question:questionObject.question,
        correctAnswer:questionObject.answer,
        ...userAnswerObj,
        userCorrect:questionObject.answer === userAnswerObj.userAnswer
    };

}


 function enableButton() {
    chosenAnswer = !chosenAnswer;
    let nextBtn = document.querySelector('.nextBtn');
    let submitBtn = document.querySelector('.submitBtn')
    if(nextBtn){
        nextBtn.removeAttribute('disabled');
    }else {
        submitBtn.removeAttribute('disabled');
    }
}


 function resetDefaults() {
    chosenAnswer = false;

    /* clear the local storage */
    localStorage.clear();

    /* clear the previous results */
    results = {};

    /* Clear the questions array. */

     /* Reset the counter of the application */
     counter = 0;
}

 function summarizeResults(obj){
    let summary = {
        answersGotCorrect:0,
        outOf:questionDatabase.length
    };

    /* Get the answers the user answered right. */
    Object.keys(obj).forEach(key=>{

        if(results[key].userCorrect) {

            summary.answersGotCorrect++;
        }
    });

    /* Convert the answers  the user got correct to percentage and add it to the summary.*/
    summary.percentage = summary.answersGotCorrect / summary.outOf * 100;

    return summary;


}

function loaderToggle(event) {
    if(event === 'removeLoader') {
        loader.classList.add('hidden');
        questionPage.classList.remove('hidden');
    }else if(event === 'addLoader') {
        loader.classList.remove('hidden');
        questionPage.classList.add('hidden');
    }
}

function getUserData(){
    let selectedCategory = document.querySelector('#categories').value;
    let selectedNumber = document.querySelector('#number').value;

    return {selectedCategory,selectedNumber};      
}

function shuffleArray (array) {
    /* the Fish Yates algorithm */
    for (let i = array.length - 1; i > 0; i--) {
        
        let j = Math.floor(Math.random() * (i + 1));

        [array[i], array[j]] = [array[j], array[i]];

        return array;
        
    }
}

function generateUniqueNumber(){
    const timeStamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    
    return timeStamp + random;
}

function transformData (array){
    let newArray = array.map((questionObj) =>{
        let answers = [...questionObj['incorrect_answers'], questionObj['correct_answer']];

        let shuffledArray = shuffleArray(answers);
        return {
            id: generateUniqueNumber(),
            question:questionObj['question'],
            choice1:shuffledArray[0],
            choice2:shuffledArray[1],
            choice3:shuffledArray[2],
            choice4:shuffledArray[3],
            answer:questionObj['correct_answer']
            
        }
    });

    return newArray;
}

async function fetchQuestions(userData) {
    const baseURL = 'https://opentdb.com/api.php';

    let category = userData.selectedCategory === 'Any Category' ? '' : `&category=${userData.selectedCategory}`;

    fetch(`${baseURL}?amount=${userData.selectedNumber}${category}&type=multiple`)
    .then(response=>{

        if(!response.ok) throw new Error('Invalid Response');

        return response.json();
    }).then(data=>{

        questions = transformData(data.results);
        questionDatabase = Array.from(questions);

        progressBar.setAttribute('max', questions.length);

        renderQuestion();
        return data;
    })
    .catch((error)=>{

        console.error('Problem fetching the Data',error);

    }).finally(()=>{

        loaderToggle('removeLoader');
    })
}

export function initialize(){

    (async function startQuiz (){
        
        resetDefaults();

        loaderToggle('addLoader');

        let generatedQuestions = await fetchQuestions(getUserData());

    }());
}

