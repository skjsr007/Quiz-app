const questions = [
    {
        question: "'OS' computer abbreviation usually means ?",
        answer:[
            {text: "Order of Significance", correct: false},
            {text: "Open Software", correct: false},
            {text: "Operating System", correct: true},
            {text: "Optical Sensor", correct: false}
        ]
    },
    {
        question: ".MOV extension refers usually to what kind of file ?",
        answer:[
            {text: "Image file", correct: false},
            {text: "Animation/movies file", correct: true},
            {text: "Audio", correct: false},
            {text: "MS Office document", correct: false}
        ]
    },
    {
        question: ".MPG extension refers usually to what kind of file ?",
        answer:[
            {text: "Word document", correct: false},
            {text: "Image file", correct: false},
            {text: "Animation/movie file", correct: true},
            {text: "Image file", correct: false}
        ]
    },
    {
        question: "What does VVVF stand for ?",
        answer:[
            {text: "Variant Voltage Vile Frequency", correct: false},
            {text: "Variable Velocity Variable Fun", correct: false},
            {text: "Very Very Vicious Frequency", correct: false},
            {text: "Variable Voltage Variable Frequency", correct: true}
        ]
    }
];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex+1;
    questionElement.innerHTML = questionNo+" . "+currentQuestion.question;

    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}
function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct == "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}
function showScore(){
    resetState();
    questionElement.innerHTML = `you scored ${score} out of ${questions.length}`;
    nextButton.innerHTML = "play Again";
    nextButton.style.display = "block";
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
};
nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});
startQuiz();