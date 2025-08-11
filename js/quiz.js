// js/quiz.js

document.addEventListener('DOMContentLoaded', function () {
    console.log("Quiz JavaScript cargado correctamente");

    // Variables del quiz
    let currentQuestion = 0;
    let score = 0;
    let userAnswers = [];

    // Elementos del DOM (corregidos)
    const startBtn = document.getElementById('startQuiz');
    const quizIntro = document.querySelector('.quiz-intro');
    const quizForm = document.getElementById('quizForm');
    const quizQuestions = document.querySelectorAll('.quiz-question');
    const prevBtn = document.getElementById('prevQuestion');
    const nextBtn = document.getElementById('nextQuestion');
    const questionCounter = document.getElementById('questionCounter');
    const quizResults = document.getElementById('quiz-results');
    const scoreDisplay = document.getElementById('score-display');
    const feedback = document.getElementById('feedback');

    // Preguntas y respuestas correctas (nuevo formato)
    const questions = [
        {
            question: "1. Yo _____ (ir) al parque ayer.",
            options: { A: "fui", B: "fuiste", C: "fue" },
            correctAnswer: "A",
            explanation: "'Fui' es la forma correcta del verbo 'ir' en primera persona del pretérito."
        },
        {
            question: "2. Ella _____ (tener) una fiesta el sábado.",
            options: { A: "tiene", B: "tuve", C: "tuvo" },
            correctAnswer: "C",
            explanation: "'Tuvo' es la forma correcta del verbo 'tener' en tercera persona del pretérito."
        },
        {
            question: "3. Nosotros _____ (hacer) la tarea anoche.",
            options: { A: "hacemos", B: "hicimos", C: "hacíamos" },
            correctAnswer: "B",
            explanation: "'Hicimos' es la forma correcta del verbo 'hacer' en primera persona plural del pretérito."
        },
        {
            question: "4. ¿Tú _____ (poder) encontrar las llaves?",
            options: { A: "puedes", B: "podías", C: "pudiste" },
            correctAnswer: "C",
            explanation: "'Pudiste' es la forma correcta del verbo 'poder' en segunda persona del pretérito."
        },
        {
            question: "5. Ellos _____ (venir) a la fiesta el viernes.",
            options: { A: "vienen", B: "vinieron", C: "venían" },
            correctAnswer: "B",
            explanation: "'Vinieron' es la forma correcta del verbo 'venir' en tercera persona plural del pretérito."
        },
        {
            question: "6. Yo _____ (saber) la respuesta ayer.",
            options: { A: "sé", B: "supe", C: "sabía" },
            correctAnswer: "B",
            explanation: "'Supe' es la forma correcta del verbo 'saber' en primera persona del pretérito."
        },
        {
            question: "7. Ustedes _____ (estar) en la reunión.",
            options: { A: "están", B: "estuvieron", C: "estaban" },
            correctAnswer: "B",
            explanation: "'Estuvieron' es la forma correcta del verbo 'estar' en segunda persona plural del pretérito."
        },
        {
            question: "8. Él _____ (querer) comprar el coche.",
            options: { A: "quiere", B: "quería", C: "quiso" },
            correctAnswer: "C",
            explanation: "'Quiso' es la forma correcta del verbo 'querer' en tercera persona del pretérito."
        },
        {
            question: "9. Nosotros _____ (decir) la verdad.",
            options: { A: "decimos", B: "dijimos", C: "decíamos" },
            correctAnswer: "B",
            explanation: "'Dijimos' es la forma correcta del verbo 'decir' en primera persona plural del pretérito."
        },
        {
            question: "10. Tú _____ (poner) los libros en la mesa.",
            options: { A: "pones", B: "pusiste", C: "ponías" },
            correctAnswer: "B",
            explanation: "'Pusiste' es la forma correcta del verbo 'poner' en segunda persona del pretérito."
        },
        {
            question: "11. Ellas _____ (traer) los refrescos.",
            options: { A: "traen", B: "traían", C: "trajeron" },
            correctAnswer: "C",
            explanation: "'Trajeron' es la forma correcta del verbo 'traer' en tercera persona plural del pretérito."
        },
        {
            question: "12. Yo _____ (andar) por el parque todo el día.",
            options: { A: "ando", B: "anduve", C: "andaba" },
            correctAnswer: "B",
            explanation: "'Anduve' es la forma correcta del verbo 'andar' en primera persona del pretérito."
        },
        {
            question: "13. ¿Quién _____ (hacer) este pastel?",
            options: { A: "hace", B: "hizo", C: "hacía" },
            correctAnswer: "B",
            explanation: "'Hizo' es la forma correcta del verbo 'hacer' en tercera persona del pretérito."
        },
        {
            question: "14. Vosotros _____ (ser) muy amables.",
            options: { A: "sois", B: "fuisteis", C: "erais" },
            correctAnswer: "B",
            explanation: "'Fuisteis' es la forma correcta del verbo 'ser' en segunda persona plural del pretérito."
        },
        {
            question: "15. Ella _____ (ver) la película anoche.",
            options: { A: "ve", B: "vio", C: "veía" },
            correctAnswer: "B",
            explanation: "'Vio' es la forma correcta del verbo 'ver' en tercera persona del pretérito."
        }
    ];

    // Inicializar el quiz
    function initQuiz() {
        quizIntro.style.display = 'none';
        quizForm.style.display = 'block';
        showQuestion(currentQuestion);
        userAnswers = new Array(quizQuestions.length).fill(null);
    }

    // Mostrar pregunta específica
    function showQuestion(index) {
        quizQuestions.forEach(q => q.style.display = 'none');
        quizQuestions[index].style.display = 'block';
        questionCounter.textContent = `Pregunta ${index + 1} de ${quizQuestions.length}`;
        prevBtn.style.display = index === 0 ? 'none' : 'inline-block';
        nextBtn.style.display = index === quizQuestions.length - 1 ? 'none' : 'inline-block';
        document.querySelector('.submit-btn').style.display =
            index === quizQuestions.length - 1 ? 'inline-block' : 'none';

        if (userAnswers[index] !== null) {
            const selectedInput = quizQuestions[index].querySelector(`input[value="${userAnswers[index]}"]`);
            if (selectedInput) selectedInput.checked = true;
        }
    }

    // Guardar respuesta
    function saveAnswer() {
        const selectedOption = quizQuestions[currentQuestion].querySelector('input[type="radio"]:checked');
        if (selectedOption) {
            userAnswers[currentQuestion] = selectedOption.value;
        }
    }

    // Calcular puntaje
    function calculateScore() {
        score = 0;
        for (let i = 0; i < quizQuestions.length; i++) {
            if (userAnswers[i] === questions[i].correctAnswer) {
                score++;
            }
        }
        return score;
    }

    // Mostrar resultados
    function showResults() {
        let feedbackHtml = "<h3>Revisión de respuestas:</h3><ol>";
        let score = 0;

        questions.forEach((question, index) => {
            const userAnswer = userAnswers[index];
            const isCorrect = userAnswer === question.correctAnswer;

            if (isCorrect) {
                score++;
                feedbackHtml += `
                    <li class="correct-answer">
                        <strong>Pregunta ${index + 1}:</strong> Correcta ✓
                        <div class="explanation">${question.explanation}</div>
                    </li>
                `;
            } else {
                const correctOption = question.options[question.correctAnswer];
                feedbackHtml += `
                    <li class="incorrect-answer">
                        <strong>Pregunta ${index + 1}:</strong> 
                        Tu respuesta: ${userAnswer ? question.options[userAnswer] : 'No respondida'} ✗
                        <div class="correct-answer">Respuesta correcta: ${question.correctAnswer}. ${correctOption}</div>
                        <div class="explanation">${question.explanation}</div>
                    </li>
                `;
            }
        });

        feedbackHtml += "</ol>";

        const percentage = Math.round((score / questions.length) * 100);
        let resultMessage = "";
        let resultImage = "";

        if (percentage >= 90) {
            resultMessage = "¡Excelente! Dominas los verbos en pretérito.";
            resultImage = "https://cdn.pixabay.com/photo/2017/01/31/15/33/achievement-2025867_640.png";
        } else if (percentage >= 70) {
            resultMessage = "¡Buen trabajo! Pero aún puedes mejorar.";
            resultImage = "https://cdn.pixabay.com/photo/2016/03/31/17/38/achievement-1294004_640.png";
        } else {
            resultMessage = "Sigue practicando. Revisa la sección de gramática.";
            resultImage = "https://cdn.pixabay.com/photo/2016/03/31/18/31/book-1294379_640.png";
        }

        quizForm.style.display = "none";
        quizResults.style.display = "block";

        scoreDisplay.innerHTML = `
            <h3>${resultMessage}</h3>
            <p>Obtuviste <strong>${score}/${questions.length}</strong> (${percentage}%)</p>
            ${resultImage ? `<img src="${resultImage}" alt="Resultado" width="100">` : ''}
        `;

        feedback.innerHTML = feedbackHtml;
    }

    // Event Listeners
    startBtn.addEventListener('click', initQuiz);
    prevBtn.addEventListener('click', function () {
        saveAnswer();
        currentQuestion--;
        showQuestion(currentQuestion);
    });
    nextBtn.addEventListener('click', function () {
        saveAnswer();
        currentQuestion++;
        showQuestion(currentQuestion);
    });
    quizForm.addEventListener('submit', function (e) {
        e.preventDefault();
        saveAnswer();
        calculateScore();
        showResults();
    });

    // Mostrar primera pregunta si hay error al cargar
    setTimeout(() => {
        if (quizQuestions.length > 0 && quizForm.style.display === 'none') {
            showQuestion(0);
        }
    }, 1000);
});
