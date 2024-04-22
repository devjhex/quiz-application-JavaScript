
const generateUserAnswers = document.querySelector('.showResults');

function generateBannerMarkup (questionData) {
    return ` <div class="border-2 border-orange-500 p-4 rounded-[.5rem] flex flex-col gap-[1rem] md:w-11/12 max-w-[800px] md:mx-auto text-[1.3rem] md:text-[1.5rem] banner">
    <h1 class="text-orange-500 font-semibold userQuestion">${questionData.question}</h1>

    <div class="bg-orange-500 rounded-[.5rem] text-[#6A2D66] p-4 flex flex-col gap-[1rem]">

        <span class="${questionData.userCorrect ? `text-green-500` : `text-red-600` }  font-bold userAnswer">
            Your Answer : ${questionData.userAnswer}
        </span>
        ${questionData.userCorrect ? '' : `<span class="text-green-400 font-bold correctAnswer">
        Correct Answer : ${questionData.correctAnswer}
    </span>`}
        
        
    </div>
</div>`
}

function renderUserAnswers() {
    let markup = ``;
    const userAnswersContainer = document.querySelector('.userAnswersContainer');
    let userResults = JSON.parse(localStorage.getItem('userAnswers'));
    let data = Object.entries(userResults).map(item=>{
        return item[1];
    })
    data.sort((a,b)=>{
       return a["questionId"] - b["questionId"];
    })

    data.forEach(userAnswer=>{
        if (userAnswer.question) {
            let answerMarkup = generateBannerMarkup(userAnswer);
            markup+=answerMarkup;
        }
    });

    userAnswersContainer.innerHTML = markup;
}

generateUserAnswers.addEventListener('click', renderUserAnswers);