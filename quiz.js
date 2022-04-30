const topics = Array.from(document.getElementsByClassName('subject'));
const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const quiz=document.getElementById('quiz')
const loader=document.getElementById('loader')
// const progressBarFull = document.getElementById('progressBarFull');
let currentQuestion;
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let questions = [];
let formattedQuestion={};
let a = 0;
let b = 0;
let flag = false;
let classToApply;
let topiclist;
let oldlength,length=6,y,x

let MAX_QUESTIONS;

if(topics.length!=0) {
    topiclist=topics
}

const fetchurldata = () => {
    let topicofquiz=localStorage.getItem("topic")
    console.log(topicofquiz);
    let x=topicofquiz;
    let y = localStorage.getItem("diff")
    let z = localStorage.getItem("que")
    MAX_QUESTIONS = z;
    console.log(MAX_QUESTIONS);
    // localStorage.clear();
fetch(
    // `https://opentdb.com/api.php?amount=10&category=23&difficulty=easy&type=multiple`
    `https://quizapi.io/api/v1/questions?apiKey=uH4hoEVtJk2hnzitFeJBIRzUAfb5GErOvefA2BSh&difficulty=${y}&limit=${z}&tags=${x}`
)
    .then((res) => {
        return res.json();
    })
    .then((loadedQuestions) => {
        questions = loadedQuestions.map((loadedQuestion) => {
            formattedQuestion = {
                question: loadedQuestion.question,
            };

            let correctanswers=loadedQuestion.correct_answers
            for (let i in correctanswers){
                if(correctanswers[i]=="true"){
                    b=i.charCodeAt(7);
                    formattedQuestion.answer=String(b-97+1)
                    break;
                }
            }
            // if(loadedQuestion.explaination!=null)
            // formattedQuestion.explaination=loadedQuestion.explanation;

            let answerChoices = Object.values(loadedQuestion.answers);
            answerChoices=answerChoices.filter(choice => choice!=null)
            formattedQuestion.notnull=answerChoices.length;
    
            answerChoices.forEach((choice, index) => {
                formattedQuestion['choice' + (index + 1)] = choice;
            });
            return formattedQuestion;
        });
        startGame();
    })
    .catch((err) => {
        console.error(err);
    });
}

fetchurldata()

//CONSTANTS
const CORRECT_BONUS = 1;

let startGame = () => {
    questionCounter = 1;
    score = 0;
    availableQuestions = [...questions];
    console.log(availableQuestions)
    console.log(questions)
    nextquestion();

    setTimeout(() => {
        
            loader.classList.add('hidden');
            quiz.classList.remove('hidden');
        
    },500);
};
let nextquestion;

nextquestion = () => {
    console.log(questionCounter);
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        return window.location.assign('quizend.html');
    }
    if (a != 0){
        a.remove(classToApply);
    }
    if(flag){
        // console.log(classToApply);
        b.remove("correct");
        flag = false;
    }

    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    questionCounter++;
//     //Update the progress bar
//     // progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    // console.log(availableQuestions)
    // console.log("currentQuestion : ",currentQuestion);
    question.innerText = currentQuestion.question;
    console.log(currentQuestion)
    oldlength=length
    length=currentQuestion.notnull
    console.log(oldlength,length )
    if(oldlength>length){
    for(let i=6; i>length; i--){
        y="option-"+i;
        console.log("y : ",y)
        x=document.getElementById(y)
        x.style.display="none";
    }
}
    else if(oldlength<length){
    for(let i=oldlength+1;i<length+1; i++){
        y="option-"+i;
        console.log("y : ",y)
        x=document.getElementById(y)
        x.style.display="flex";
    }
}
    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice'+number];
    });
    
    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
}
var btn = document.getElementById("btn");
btn.addEventListener("click",nextquestion)

choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];
        // console.log(selectedAnswer);

        classToApply =
            (selectedAnswer === currentQuestion.answer) ? 'correct' : 'incorrect';
        // console.log(selectedAnswer,formattedQuestion.answer)
        if (classToApply === 'correct') {
            incrementScore(CORRECT_BONUS);
        }else{
            let data = document.getElementsByClassName("choice-text");
        
            for(let i = 0; i<data.length; i++){
                if(data[i].dataset['number'] == currentQuestion.answer){
                    b = data[i].parentElement.classList;
                    b.add('correct');
                    flag = true;
                    break;
                }
            }
        }

        selectedChoice.parentElement.classList.add(classToApply);
        a = selectedChoice.parentElement.classList;
    });
});

let incrementScore = (num) => {
    // console.log("jatindada")
    score += num;
    scoreText.innerText = "Score " + String(score);
    // console.log(scoreText)
};