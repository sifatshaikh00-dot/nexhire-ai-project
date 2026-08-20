function registerUser(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    const user = {
        name: name,
        email: email,
        password: password
    };

    localStorage.setItem("nexhireUser", JSON.stringify(user));

    alert("Registration successful!");

    window.location.href = "index.html";
}


function loginUser(event) {
    event.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const savedUser = JSON.parse(localStorage.getItem("nexhireUser"));

    if (!savedUser) {
        alert("No account found. Please register first.");
        return;
    }

    if (email === savedUser.email && password === savedUser.password) {

        localStorage.setItem("loggedIn", "true");

        alert("Login successful!");

        window.location.href = "dashboard.html";

    } else {
        alert("Invalid email or password!");
    }
}


function logoutUser() {

    localStorage.removeItem("loggedIn");

    window.location.href = "index.html";
}


function startInterview() {

    alert("Mock Interview module coming soon!");

}
// =========================
// MOCK INTERVIEW
// =========================

const interviewQuestions = [
    "What is Object-Oriented Programming and what are its main principles?",
    "What is the difference between an Array and an ArrayList?",
    "What is inheritance in Java?",
    "What is the difference between method overloading and method overriding?",
    "Why should we hire you for this role?"
];

let currentQuestion = 0;
let answers = [];

function loadInterviewQuestion() {

    const question = document.getElementById("question");

    if (!question) {
        return;
    }

    question.innerText = interviewQuestions[currentQuestion];

    document.getElementById("currentNumber").innerText =
        String(currentQuestion + 1).padStart(2, "0");

    document.getElementById("questionNumber").innerText =
        "Question " + (currentQuestion + 1) +
        " of " + interviewQuestions.length;

    const progress =
        ((currentQuestion + 1) / interviewQuestions.length) * 100;

    document.getElementById("progress").style.width =
        progress + "%";

    document.getElementById("answer").value = "";

    document.getElementById("wordCount").innerText =
        "0 words";
}


function submitAnswer() {

    const answerBox = document.getElementById("answer");

    if (!answerBox) {
        return;
    }

    const answer = answerBox.value.trim();

    if (answer === "") {
        alert("Please enter your answer first.");
        return;
    }

    answers.push({
        question: interviewQuestions[currentQuestion],
        answer: answer
    });

    currentQuestion++;

    if (currentQuestion < interviewQuestions.length) {

        loadInterviewQuestion();

    } else {

        alert("Interview completed successfully!");

        localStorage.setItem(
            "nexhireInterviewAnswers",
            JSON.stringify(answers)
        );

        window.location.href = "result.html";
    }
}


// WORD COUNT

document.addEventListener("DOMContentLoaded", function () {

    const answerBox = document.getElementById("answer");

    if (answerBox) {

        answerBox.addEventListener("input", function () {

            const text = answerBox.value.trim();

            const words =
                text === "" ? 0 : text.split(/\s+/).length;

            document.getElementById("wordCount").innerText =
                words + " words";

        });

        loadInterviewQuestion();
    }

});