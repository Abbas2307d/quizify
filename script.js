const questions = [
    {
        question: "Which is the largest animal in the World?",
        answers:[
                {text: "Shark", correct: false},
                {text: "Blue Whale", correct: true},
                {text: "Elephant", correct: false},
                {text: "Giraffe", correct: false},

        ]
    },

    {
        question: "Which is the smallest continent in the World?",
        answers:[
                {text: "Asia", correct: false},
                {text: "Arctic", correct: false},
                {text: "Australia", correct: true},
                {text: "Africa", correct: false},

        ]
    },

    {
        question: "How many days are there in a Leap Year?",
        answers:[
                {text: "365", correct: false},
                {text: "364", correct: false},
                {text: "367", correct: false},
                {text: "366", correct: true},

        ]
    },

    {
        question: "Which country's economy is the most strongest?",
        answers:[
                {text: "China", correct: false},
                {text: "Japan", correct: false},
                {text: "America", correct: true},
                {text: "India", correct: false},

        ]
    },

    {
        question: "How many colours are there in a rainbow?",
        answers:[
                {text: "seven", correct: true},
                {text: "five", correct: false},
                {text: "eigth", correct: false},
                {text: "six", correct: false},

        ]
    },
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
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.
    question;

    currentQuestion.answers.forEach(answer=> {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click" , selectAnswer);
    })
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
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");    
        }
        button.disabled = "true"
    });
    nextButton.style.display = "block";
}
function showScore(){
    resetState();
    questionElement.innerHTML = `You Scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again"
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++; 
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})
startQuiz();

