document.addEventListener('DOMContentLoaded', function() {
    // Efecto de scroll suave para los enlaces
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Resaltar la sección actual en el menú de navegación
    const currentPage = location.pathname.split('/').pop();
    document.querySelectorAll('nav a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // Animación para las tarjetas de verbos
    const verbCards = document.querySelectorAll('.verb-card');
    verbCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
        });
    });

    // Para la página de práctica (practica.html)
    if (currentPage === 'practica.html') {
        // Aquí iría el código para los ejercicios interactivos
        console.log('Cargando ejercicios interactivos...');
        
        // Ejemplo de un ejercicio de completar espacios
        const fillBlankExercises = document.querySelectorAll('.fill-blank-exercise');
        fillBlankExercises.forEach(exercise => {
            const blanks = exercise.querySelectorAll('input[type="text"]');
            const checkBtn = exercise.querySelector('.check-btn');
            const feedback = exercise.querySelector('.feedback');
            
            checkBtn.addEventListener('click', function() {
                let allCorrect = true;
                blanks.forEach(blank => {
                    const correctAnswer = blank.dataset.correct;
                    if (blank.value.trim().toLowerCase() !== correctAnswer.toLowerCase()) {
                        blank.style.borderColor = 'var(--error-color)';
                        allCorrect = false;
                    } else {
                        blank.style.borderColor = 'var(--success-color)';
                    }
                });
                
                if (allCorrect) {
                    feedback.textContent = '¡Correcto! Buen trabajo.';
                    feedback.style.color = 'var(--success-color)';
                } else {
                    feedback.textContent = 'Algunas respuestas son incorrectas. Revisa y intenta de nuevo.';
                    feedback.style.color = 'var(--error-color)';
                }
            });
        });
    }
    
    // Para la página de quiz (quiz.html)
    if (currentPage === 'quiz.html') {
        // Aquí iría el código para el quiz interactivo
        console.log('Cargando quiz interactivo...');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // SOPA DE LETRAS
    const wordSearchGrid = [
        ['A', 'N', 'D', 'U', 'V', 'E', 'X', 'Y', 'Z', 'W'],
        ['Q', 'W', 'E', 'R', 'T', 'P', 'U', 'D', 'E', 'M'],
        ['F', 'U', 'I', 'S', 'T', 'E', 'V', 'B', 'N', 'K'],
        ['H', 'I', 'C', 'E', 'L', 'O', 'P', 'A', 'S', 'D'],
        ['E', 'S', 'T', 'U', 'V', 'E', 'F', 'G', 'H', 'J'],
        ['V', 'I', 'N', 'E', 'T', 'U', 'V', 'I', 'M', 'O'],
        ['P', 'L', 'O', 'K', 'I', 'J', 'U', 'H', 'Y', 'G'],
        ['T', 'U', 'V', 'E', 'R', 'T', 'Y', 'U', 'I', 'O'],
        ['D', 'I', 'J', 'E', 'P', 'L', 'O', 'K', 'I', 'J'],
        ['F', 'U', 'I', 'M', 'N', 'B', 'V', 'C', 'X', 'Z']
    ];

    const wordList = ['anduve', 'tuve', 'estuve', 'pude', 'hice', 'vine', 'fui', 'dije'];
    let foundWords = [];

    function renderWordSearch() {
        const table = document.getElementById('wordSearch');
        table.innerHTML = '';
        
        for (let i = 0; i < wordSearchGrid.length; i++) {
            const row = document.createElement('tr');
            
            for (let j = 0; j < wordSearchGrid[i].length; j++) {
                const cell = document.createElement('td');
                cell.textContent = wordSearchGrid[i][j];
                cell.dataset.row = i;
                cell.dataset.col = j;
                
                cell.addEventListener('click', function() {
                    highlightWord(cell);
                });
                
                row.appendChild(cell);
            }
            
            table.appendChild(row);
        }
    }

    function highlightWord(cell) {
        cell.classList.toggle('highlight');
    }

    document.getElementById('checkWordSearch').addEventListener('click', function() {
        const highlightedCells = document.querySelectorAll('#wordSearch td.highlight');
        const feedback = document.getElementById('wordSearchFeedback');
        
        // Verificar palabras encontradas (simplificado para el ejemplo)
        feedback.textContent = '¡Buen trabajo! Encontraste algunas palabras.';
        feedback.style.color = 'var(--success-color)';
    });

    // JUEGO DE MEMORIA
    const memoryCards = [
        { id: 1, content: 'andar', pair: 'anduve' },
        { id: 2, content: 'anduve', pair: 'andar' },
        { id: 3, content: 'tener', pair: 'tuve' },
        { id: 4, content: 'tuve', pair: 'tener' },
        { id: 5, content: 'hacer', pair: 'hice' },
        { id: 6, content: 'hice', pair: 'hacer' },
        { id: 7, content: 'venir', pair: 'vine' },
        { id: 8, content: 'vine', pair: 'venir' },
        { id: 9, content: 'poder', pair: 'pude' },
        { id: 10, content: 'pude', pair: 'poder' },
        { id: 11, content: 'saber', pair: 'supe' },
        { id: 12, content: 'supe', pair: 'saber' },
        { id: 13, content: 'querer', pair: 'quise' },
        { id: 14, content: 'quise', pair: 'querer' },
        { id: 15, content: 'decir', pair: 'dije' },
        { id: 16, content: 'dije', pair: 'decir' }
    ];

    let flippedCards = [];
    let matchedPairs = 0;
    let attempts = 0;

    function renderMemoryGame() {
        const gameContainer = document.getElementById('memoryGame');
        gameContainer.innerHTML = '';
        
        // Mezclar las cartas
        const shuffledCards = [...memoryCards].sort(() => 0.5 - Math.random()).slice(0, 8);
        const pairedCards = [...shuffledCards, ...shuffledCards.map(card => ({
            id: card.id + 100, // IDs diferentes para las parejas
            content: card.pair,
            pair: card.content
        }))].sort(() => 0.5 - Math.random());
        
        pairedCards.forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.className = 'memory-card';
            cardElement.textContent = card.content;
            cardElement.dataset.id = card.id;
            cardElement.dataset.pair = card.pair;
            
            cardElement.addEventListener('click', flipCard);
            gameContainer.appendChild(cardElement);
        });
        
        // Resetear estadísticas
        matchedPairs = 0;
        attempts = 0;
        document.getElementById('attempts').textContent = attempts;
        document.getElementById('matches').textContent = matchedPairs;
    }

    function flipCard() {
        if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
            this.classList.add('flipped');
            flippedCards.push(this);
            
            if (flippedCards.length === 2) {
                attempts++;
                document.getElementById('attempts').textContent = attempts;
                checkForMatch();
            }
        }
    }
    const sentenceOrder = document.getElementById('sentenceOrder');
if (sentenceOrder) {
    let draggedWord = null;

    document.querySelectorAll('.word-draggable').forEach(word => {
        word.addEventListener('dragstart', () => draggedWord = word);
        word.addEventListener('dragover', e => e.preventDefault());
        word.addEventListener('drop', function() {
            if (draggedWord && draggedWord !== this) {
                const draggedIndex = [...sentenceOrder.children].indexOf(draggedWord);
                const targetIndex = [...sentenceOrder.children].indexOf(this);
                if (draggedIndex > targetIndex) {
                    sentenceOrder.insertBefore(draggedWord, this);
                } else {
                    sentenceOrder.insertBefore(draggedWord, this.nextSibling);
                }
            }
        });
    });

    document.getElementById('checkSentenceOrder').addEventListener('click', () => {
        const currentOrder = [...sentenceOrder.children].map(c => c.textContent).join(' ');
        const correctOrder = "ayer fui al cine";
        const feedback = document.getElementById('sentenceOrderFeedback');
        if (currentOrder === correctOrder) {
            feedback.textContent = "✅ ¡Correcto!";
            feedback.style.color = "var(--success-color)";
        } else {
            feedback.textContent = "❌ Orden incorrecto. Intenta de nuevo.";
            feedback.style.color = "var(--error-color)";
        }
    });
}

/* === Ejercicio: Verdadero o falso === */
document.querySelectorAll('.tf-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const feedback = this.parentElement.nextElementSibling;
        if (this.dataset.correct === "true") {
            feedback.textContent = "✅ Correcto";
            feedback.style.color = "var(--success-color)";
        } else {
            feedback.textContent = "❌ Incorrecto";
            feedback.style.color = "var(--error-color)";
        }
    });
});

/* === Ejercicio: Completar huecos === */
document.querySelectorAll('.word-option').forEach(word => {
    word.addEventListener('dragstart', e => e.dataTransfer.setData('text', word.textContent));
});

document.querySelectorAll('.blank-drop').forEach(blank => {
    blank.addEventListener('dragover', e => e.preventDefault());
    blank.addEventListener('drop', function(e) {
        e.preventDefault();
        const droppedWord = e.dataTransfer.getData('text');
        this.textContent = droppedWord;
        const feedback = document.getElementById('dragDropFeedback');
        if (droppedWord === this.dataset.answer) {
            feedback.textContent = "✅ Correcto";
            feedback.style.color = "var(--success-color)";
        } else {
            feedback.textContent = "❌ Incorrecto";
            feedback.style.color = "var(--error-color)";
        }
    });
});
    function checkForMatch() {
        const [card1, card2] = flippedCards;
        
        if (card1.textContent === card2.dataset.pair || card2.textContent === card1.dataset.pair) {
            // Pareja encontrada
            matchedPairs++;
            document.getElementById('matches').textContent = matchedPairs;
            
            // Deshabilitar las cartas
            card1.removeEventListener('click', flipCard);
            card2.removeEventListener('click', flipCard);
            
            // Cambiar color para indicar acierto
            card1.style.backgroundColor = 'var(--success-color)';
            card2.style.backgroundColor = 'var(--success-color)';
            
            flippedCards = [];
            
            // Verificar si se completó el juego
            if (matchedPairs === 8) {
                setTimeout(() => {
                    alert('¡Felicidades! Completaste el juego de memoria.');
                }, 500);
            }
        } else {
            // No es pareja, voltear de nuevo
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                flippedCards = [];
            }, 1000);
        }
    }

    document.getElementById('resetMemoryGame').addEventListener('click', renderMemoryGame);

    // RELACIONAR COLUMNAS
    let draggedItem = null;

    document.querySelectorAll('.matching-item').forEach(item => {
        item.addEventListener('dragstart', function() {
            draggedItem = this;
            setTimeout(() => this.style.opacity = '0.4', 0);
        });
        
        item.addEventListener('dragend', function() {
            setTimeout(() => this.style.opacity = '1', 0);
        });
    });

    document.querySelectorAll('.drop-area').forEach(area => {
        area.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.style.borderColor = 'var(--accent-color)';
        });
        
        area.addEventListener('dragleave', function() {
            this.style.borderColor = '#ccc';
        });
        
        area.addEventListener('drop', function(e) {
            e.preventDefault();
            this.style.borderColor = '#ccc';
            
            if (draggedItem.dataset.value === this.dataset.value) {
                this.textContent = draggedItem.textContent + ' - ' + this.textContent;
                draggedItem.style.display = 'none';
            }
        });
    });

    document.getElementById('checkMatching').addEventListener('click', function() {
        const feedback = document.getElementById('matchingFeedback');
        const matchedItems = document.querySelectorAll('.drop-area');
        let correctMatches = 0;
        
        matchedItems.forEach(item => {
            if (item.textContent.includes('-')) {
                correctMatches++;
            }
        });
        
        if (correctMatches === 4) {
            feedback.textContent = '¡Perfecto! Todas las coincidencias son correctas.';
            feedback.style.color = 'var(--success-color)';
        } else {
            feedback.textContent = `Tienes ${correctMatches} de 4 correctas. Sigue practicando.`;
            feedback.style.color = 'var(--error-color)';
        }
    });

    // EJERCICIO DE CONTEXTO
    document.querySelectorAll('.word-option').forEach(option => {
        option.addEventListener('click', function() {
            const targetBlank = document.querySelector(`.blank[data-answer="${this.dataset.target}"]`);
            
            if (targetBlank && !targetBlank.textContent) {
                targetBlank.textContent = this.textContent;
                this.classList.add('selected');
            } else if (targetBlank && targetBlank.textContent === this.textContent) {
                targetBlank.textContent = '';
                this.classList.remove('selected');
            }
        });
    });

    document.getElementById('checkContext').addEventListener('click', function() {
        const blanks = document.querySelectorAll('.blank');
        let correctAnswers = 0;
        
        blanks.forEach(blank => {
            if (blank.textContent === blank.dataset.answer) {
                blank.style.color = 'var(--success-color)';
                correctAnswers++;
            } else if (blank.textContent) {
                blank.style.color = 'var(--error-color)';
            }
        });
        
        const feedback = document.getElementById('contextFeedback');
        feedback.textContent = `Tienes ${correctAnswers} de ${blanks.length} correctas.`;
        feedback.style.color = correctAnswers === blanks.length ? 'var(--success-color)' : 'var(--error-color)';
    });

    // BONUS: Mostrar sección adicional
    document.getElementById('showBonus').addEventListener('click', function() {
        document.getElementById('bonusSection').classList.remove('hidden');
        this.style.display = 'none';
    });

    // Inicializar juegos
    renderWordSearch();
    renderMemoryGame();
});

/* === Ejercicio: Ordenar frase === */
const sentenceOrder = document.getElementById('sentenceOrder');
if (sentenceOrder) {
    let draggedWord = null;

    document.querySelectorAll('.word-draggable').forEach(word => {
        word.addEventListener('dragstart', () => draggedWord = word);
        word.addEventListener('dragover', e => e.preventDefault());
        word.addEventListener('drop', function() {
            if (draggedWord && draggedWord !== this) {
                const draggedIndex = [...sentenceOrder.children].indexOf(draggedWord);
                const targetIndex = [...sentenceOrder.children].indexOf(this);
                if (draggedIndex > targetIndex) {
                    sentenceOrder.insertBefore(draggedWord, this);
                } else {
                    sentenceOrder.insertBefore(draggedWord, this.nextSibling);
                }
            }
        });
    });

    document.getElementById('checkSentenceOrder').addEventListener('click', () => {
        const currentOrder = [...sentenceOrder.children].map(c => c.textContent).join(' ');
        const correctOrder = "ayer fui al cine";
        const feedback = document.getElementById('sentenceOrderFeedback');
        if (currentOrder === correctOrder) {
            feedback.textContent = "✅ ¡Correcto!";
            feedback.style.color = "var(--success-color)";
        } else {
            feedback.textContent = "❌ Orden incorrecto. Intenta de nuevo.";
            feedback.style.color = "var(--error-color)";
        }
    });
}

/* === Ejercicio: Verdadero o falso === */
document.querySelectorAll('.tf-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const feedback = this.parentElement.nextElementSibling;
        if (this.dataset.correct === "true") {
            feedback.textContent = "✅ Correcto";
            feedback.style.color = "var(--success-color)";
        } else {
            feedback.textContent = "❌ Incorrecto";
            feedback.style.color = "var(--error-color)";
        }
    });
});

/* === Ejercicio: Completar huecos === */
document.querySelectorAll('.word-option').forEach(word => {
    word.addEventListener('dragstart', e => e.dataTransfer.setData('text', word.textContent));
});

document.querySelectorAll('.blank-drop').forEach(blank => {
    blank.addEventListener('dragover', e => e.preventDefault());
    blank.addEventListener('drop', function(e) {
        e.preventDefault();
        const droppedWord = e.dataTransfer.getData('text');
        this.textContent = droppedWord;
        const feedback = document.getElementById('dragDropFeedback');
        if (droppedWord === this.dataset.answer) {
            feedback.textContent = "✅ Correcto";
            feedback.style.color = "var(--success-color)";
        } else {
            feedback.textContent = "❌ Incorrecto";
            feedback.style.color = "var(--error-color)";
        }
    });
});

