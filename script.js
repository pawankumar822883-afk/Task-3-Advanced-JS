// --- INTERACTIVE QUIZ LOGIC ---
const questions = [
    { q: "Which language is used for web styling?", a: [{t: "CSS", c: true}, {t: "Java", c: false}] },
    { q: "What does API stand for?", a: [{t: "Application Programming Interface", c: true}, {t: "Apple Pie Item", c: false}] }
];

let currentQuestionIndex = 0;
const questionEl = document.getElementById('question-text');
const answerButtonsEl = document.getElementById('answer-buttons');

function startQuiz() {
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionEl.innerText = question.q;
    answerButtonsEl.innerHTML = '';
    question.a.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.t;
        button.onclick = () => {
            alert(answer.c ? "Correct! 🎉" : "Wrong! ❌");
            currentQuestionIndex = (currentQuestionIndex + 1) % questions.length;
            showQuestion(questions[currentQuestionIndex]);
        };
        answerButtonsEl.appendChild(button);
    });
}

// --- API FETCH LOGIC ---
// Using a free Public API (wttr.in) to avoid API Key complexity
async function fetchWeather() {
    const city = document.getElementById('city-input').value;
    const display = document.getElementById('weather-display');
    
    if(!city) return alert("Please enter a city");

    display.innerHTML = "Fetching data...";

    try {
        // wttr.in is a great public API for learning fetching without keys
        const response = await fetch(`https://wttr.in/${city}?format=j1`);
        const data = await response.json();
        
        const temp = data.current_condition[0].temp_C;
        const desc = data.current_condition[0].weatherDesc[0].value;

        display.innerHTML = `
            <div style="margin-top:15px; border-top: 1px solid #ddd; padding-top:10px;">
                <h3>${city.toUpperCase()}</h3>
                <p>Temperature: <strong>${temp}°C</strong></p>
                <p>Condition: ${desc}</p>
            </div>
        `;
    } catch (error) {
        display.innerHTML = "Failed to load data. Please try again.";
    }
}

// Event Listeners
document.getElementById('fetch-btn').addEventListener('click', fetchWeather);
window.onload = startQuiz;
