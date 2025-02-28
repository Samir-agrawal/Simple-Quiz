const question = [
    {
        question: "What is the full form of HTML?",
        answer :[
            { text : "Hyper-Text-Markup-Language", correct: true },
            { text : "High-tech-machine-Learning", correct: false },
            { text : "Hyperlink-Text-Managing-Language", correct: false },
            { text : "Hybrid-Transfer-Markup-Logic", correct: false },
        ]
    },
    {
        question: "What is the full form of CPU?",
        answer :[
            { text : "Core-Processing-Utility", correct: false },
            { text : "Control-Processing-Unit", correct: true },
            { text : "Central-Program-Unit", correct: false },
            { text : "Computer-Processing-Unit", correct: false },
        ]
    },
    {
        question: "What is the full form of IP in networking?",
        answer : [
            { text : "Internet-Protocol", correct: true },
            { text : "Internal-Protocol", correct: false },
            { text : "International-Protocol", correct: false },
            { text : "Interim-Protocol", correct: false },
        ]
    },
    {
        question: "What is the full form of HTTP?",
        answer : [
            { text : "Hyper-Text-Transfer-Protocol", correct: true },
            { text : "High-tech-Transfer-Protocol", correct: false },
            { text : "Hyperlink-Transfer-Protocol", correct: false },
            { text : "Host-Text-Transfer-Path", correct: false },
        ]
    },
    {
        question: "What is the full form of RAM?",
        answer : [
            { text : "Randoised-Allocated-Memory", correct: false },
            { text : "ReadOnly-Access-Memory", correct: false },
            { text : "Random-Access-Memory", correct: true },
            { text : "Remote-Access-Memory", correct: false },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-btn");
const nextButton = document.getElementById("next-btn");

let currentQuesIndex = 0;
let score = 0;

function startQuiz(){
    currentQuesIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
} 
function showQuestion(){
    resetState();
    let currentQuestion = question[currentQuesIndex];
    let questionNo = currentQuesIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        
    });
}

function resetState(){
    nextButton.style.display="none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e)
{
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = "Your Score is " + score + " out of " + question.length;
    nextButton.innerHTML = "Restart";
    nextButton.style.display = "block";
}

function handleNextButton()
{
    currentQuesIndex++;
    if(currentQuesIndex < question.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click", () => {

    if(currentQuesIndex < question.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
}
);     

startQuiz();