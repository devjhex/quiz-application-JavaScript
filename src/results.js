
function generateComment () {
    let results = JSON.parse(localStorage.getItem('results'));
    let marks = results.percentage;
    if (marks >= 80) {
        return "Excellent work Keep it up!!!"
    }
    if (marks <= 70 && marks >= 50 ) {
        return "Nice work but you need to do some more practice!!!";
    }
    if (marks < 50) {
        return "You need to do some reading whoever you are😂😂!!!";
    }
}

export function renderComment() {
    let results = JSON.parse(localStorage.getItem('results'));
    const percentageElement = document.querySelector('.results');
    const commentElement = document.querySelector('.comment');

    commentElement.textContent = generateComment();
    percentageElement.textContent = `${Math.floor(results.percentage)}%`;
}