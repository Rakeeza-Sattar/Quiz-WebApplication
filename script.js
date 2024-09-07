const questions = [
    {
        question: "What is the capital city of Pakistan?",
        optionA: "Lahore",
        optionB: "Karachi",
        optionC: "Islamabad",
        optionD: "Rawalpindi",
        correctOption: "optionC"
    },
    {
        question: "Which is the national language of Pakistan?",
        optionA: "Punjabi",
        optionB: "Urdu",
        optionC: "Sindhi",
        optionD: "Pashto",
        correctOption: "optionB"
    },
    {
        question: "Who was the founder of Pakistan?",
        optionA: "Allama Iqbal",
        optionB: "Liaquat Ali Khan",
        optionC: "Quaid-e-Azam Muhammad Ali Jinnah",
        optionD: "Zulfikar Ali Bhutto",
        correctOption: "optionC"
    },
    {
        question: "In which year did Pakistan gain independence?",
        optionA: "1940",
        optionB: "1947",
        optionC: "1956",
        optionD: "1965",
        correctOption: "optionB"
    },
    {
        question: "Which is the national sport of Pakistan?",
        optionA: "Cricket",
        optionB: "Hockey",
        optionC: "Football",
        optionD: "Squash",
        correctOption: "optionB"
    },
    {
        question: "Which is the largest province of Pakistan by area?",
        optionA: "Punjab",
        optionB: "Sindh",
        optionC: "Balochistan",
        optionD: "Khyber Pakhtunkhwa",
        correctOption: "optionC"
    },
    {
        question: "Which river is the longest in Pakistan?",
        optionA: "River Jhelum",
        optionB: "River Ravi",
        optionC: "River Chenab",
        optionD: "River Indus",
        correctOption: "optionD"
    },
    {
        question: "Which is the national flower of Pakistan?",
        optionA: "Rose",
        optionB: "Tulip",
        optionC: "Jasmine",
        optionD: "Sunflower",
        correctOption: "optionC"
    },
    {
        question: "What is the currency of Pakistan?",
        optionA: "Rupee",
        optionB: "Taka",
        optionC: "Rial",
        optionD: "Dinar",
        correctOption: "optionA"
    },
    {
        question: "Which mountain is the highest in Pakistan?",
        optionA: "Nanga Parbat",
        optionB: "K2",
        optionC: "Gasherbrum",
        optionD: "Broad Peak",
        correctOption: "optionB"
    }
];

let shuffledQuestions = [] // array to hold the shuffled selected questions

function handleQuestions() { 
    while (shuffledQuestions.length <= 9) {
        const random = questions[Math.floor(Math.random() * questions.length)]
        if (!shuffledQuestions.includes(random)) {
            shuffledQuestions.push(random)
        }
    }
}

let questionNumber = 1 
let playerScore = 0  
let wrongAttempt = 0 
let indexNumber = 0 

// Function to display the next question in the array
function NextQuestion(index) {
    handleQuestions()
    const currentQuestion = shuffledQuestions[index]
    document.getElementById("display-question").innerHTML = currentQuestion.question;
    document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
    document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
    document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
    document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;
}

function checkForAnswer() {
    const currentQuestion = shuffledQuestions[indexNumber]
    const currentQuestionAnswer = currentQuestion.correctOption
    const options = document.getElementsByName("option");
    let correctOption = null

    options.forEach((option) => {
        if (option.value === currentQuestionAnswer) {
            correctOption = option.labels[0].id
        }
    })

    // Checking if the selected option is correct
    if (options[0].checked === false && options[1].checked === false && 
        options[2].checked === false && options[3].checked === false) {
        document.getElementById('option-modal').style.display = "flex"
    }

    options.forEach((option) => {
        if (option.checked === true && option.value === currentQuestionAnswer) {
            document.getElementById(correctOption).style.backgroundColor = "green"
            playerScore++
            indexNumber++
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }

        else if (option.checked && option.value !== currentQuestionAnswer) {
            const wrongLabelId = option.labels[0].id
            document.getElementById(wrongLabelId).style.backgroundColor = "red"
            document.getElementById(correctOption).style.backgroundColor = "green"
            wrongAttempt++
            indexNumber++
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }
    })
}

// Function to handle next question
function handleNextQuestion() {
    checkForAnswer()
    unCheckRadioButtons()
    setTimeout(() => {
        if (indexNumber <= 9) {
            NextQuestion(indexNumber)
        }
        else {
            handleEndGame()
        }
        resetOptionBackground()
    }, 1000);
}

// Uncheck the radio buttons
function unCheckRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}

// Reset the background of option labels
function resetOptionBackground() {
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById(option.labels[0].id).style.backgroundColor = ""
    })
}

// End the game and display results
function handleEndGame() {
    let remark = null
    let remarkColor = null

    if (playerScore <= 3) {
        remark = "Poor Performance, Keep Trying."
        remarkColor = "red"
    }
    else if (playerScore >= 4 && playerScore < 7) {
        remark = "Average, You Can Do Better."
        remarkColor = "orange"
    }
    else if (playerScore >= 7) {
        remark = "Excellent, Keep the Good Work."
        remarkColor = "green"
    }
    const playerGrade = (playerScore / 10) * 100

    // Display result in the modal
    document.getElementById('remarks').innerHTML = remark
    document.getElementById('remarks').style.color = remarkColor
    document.getElementById('grade-percentage').innerHTML = playerGrade
    document.getElementById('wrong-answers').innerHTML = wrongAttempt
    document.getElementById('right-answers').innerHTML = playerScore
    document.getElementById('score-modal').style.display = "flex"
}

// Close the score modal and reset the game
function closeScoreModal() {
    questionNumber = 1
    playerScore = 0
    wrongAttempt = 0
    indexNumber = 0
    shuffledQuestions = []
    NextQuestion(indexNumber)
    document.getElementById('score-modal').style.display = "none"
}

// Close the option modal
function closeOptionModal() {
    document.getElementById('option-modal').style.display = "none"
}
