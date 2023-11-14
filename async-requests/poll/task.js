const poolTitleElement = document.getElementById("poll__title");
const poolAnswersElement = document.getElementById("poll__answers");

class PoolQuestion {
    constructor(id, questionText, answersTexts) {
        this.id = id;
        this.questionText = questionText;
        this.answersTexts = answersTexts;
    }
}

class StatItem {
    constructor(answer, votes, allVotes) {
        this.answer = answer;
        this.votes = votes;
        this.allVotes = allVotes;
    }
}

function getPoolQuestionFromSite() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://students.netoservices.ru/nestjs-backend/poll", false);
    xhr.send();
    if (xhr.status >= 200 && xhr.status < 300) {
        const response = JSON.parse(xhr.responseText);
        return new PoolQuestion(response.id, response.data.title, response.data.answers);
    } else {
        alert(xhr.statusText);
        return null;
    }
}

function createAnswerElement(answerText, num) {
    const element = document.createElement("button");
    element.classList.add("poll__answer");
    element.textContent = answerText;
    element.dataset.num = num;
    element.addEventListener("click", () => onClickOnAnswerButton.call(element));
    return element;
}

function onClickOnAnswerButton() {
    const answerElement = this;
    const questionId = poolTitleElement.dataset.id;
    const answerNum = answerElement.dataset.num;
    sendAnswerToSiteAndDisplayResultOnPage(questionId, answerNum);
}

function sendAnswerToSiteAndDisplayResultOnPage(questionId, answerNum) {
    const xhr = new XMLHttpRequest;
    xhr.open( 'POST', 'https://students.netoservices.ru/nestjs-backend/poll', false);
    xhr.setRequestHeader( 'Content-type', 'application/x-www-form-urlencoded' );
    xhr.send( `vote=${questionId}&answer=${answerNum}`);
    if (xhr.status >= 200 && xhr.status < 300) {
        alert("Ответ отправлен!")
        const response = JSON.parse(xhr.responseText);
        const allVotes = response.stat.map(el => el.votes).reduce((acc, current) => acc + current, 0);
        displayStat(response.stat.map(el => new StatItem(el.answer, el.votes, allVotes)));
    } else {
        alert(xhr.statusText);
    }
}

function displayStat(statItems) {
    clearPoolAnswers();
    for (const statItem of statItems) {
        poolAnswersElement.appendChild(createStatItemElement(statItem));
    }
}

function clearPoolQuestionOnPage() {
    poolTitleElement.innerHTML = "";
    poolAnswersElement.innerHTML = "";
}

function clearPoolAnswers() {
    poolAnswersElement.innerHTML = "";
}

function createStatItemElement(statItem) {
    const element = document.createElement("div");
    element.innerHTML = `${statItem.answer} <b>${(statItem.votes / statItem.allVotes * 100).toFixed(2)}%</b>`
    return element;
}

function addPoolQuestionOnPage(poolQuestion) {
    poolTitleElement.innerHTML = poolQuestion.questionText;
    poolTitleElement.dataset.id = poolQuestion.id;
    let num = 0;
    for (const answerText of poolQuestion.answersTexts) {
        poolAnswersElement.appendChild(createAnswerElement(answerText, num++));
    }
}

clearPoolQuestionOnPage();
const poolQuestion = getPoolQuestionFromSite();
if (poolQuestion) {
    addPoolQuestionOnPage(poolQuestion);
}