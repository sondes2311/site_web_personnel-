document.addEventListener('DOMContentLoaded', function () {
    // Sélectionner tous les boutons de bascule et les descriptions
    const toggleButtons = document.querySelectorAll('.toggle-description');
    const closeButtons = document.querySelectorAll('.close-btn');

    toggleButtons.forEach((button, index) => {
        const description = button.nextElementSibling;
        button.addEventListener('click', () => {
            description.style.display = 'block';
            description.setAttribute('aria-hidden', 'false');
            button.style.display = 'none';
        });
        closeButtons[index].addEventListener('click', () => {
            description.style.display = 'none';
            description.setAttribute('aria-hidden', 'true');
            button.style.display = 'inline-block';
        });
    });
});

      // Fonction pour afficher le contenu des pages sous forme de texte
      function showPageContent(event, pageType) {
        // Empêcher la redirection du lien
        event.preventDefault();

        // Récupérer l'élément où le contenu sera affiché
        const container = document.getElementById("content-container");

        // Vider le conteneur avant de charger les nouvelles pages
        container.innerHTML = '';

        // Déterminer quelle page charger en fonction du type de page
        let pageUrl = '';
        let pageTitle = '';

        if (pageType === 'parcours') {
            pageUrl = '../pages/parcours.html';
            pageTitle = 'Parcours';
        } else if (pageType === 'stages') {
            pageUrl = '../pages/stages.html';
            pageTitle = 'Stages';
        }
        else if (pageType === 'matieres') {
            pageUrl = '../pages/matieres.html';
            pageTitle = 'Matières';
        }
        else if (pageType === 'Manifestations') {
            pageUrl = '../pages/manifestatsion.html';
            pageTitle = 'Manifestations';
        }


        // Charger et afficher le contenu de la page spécifiée
        fetch(pageUrl)
            .then(response => response.text())
            .then(data => {
                container.innerHTML = `<h2>${pageTitle}</h2>` + data;
            })
            .catch(error => {
                container.innerHTML = `<h2>Erreur de chargement</h2><p>Impossible de charger le contenu.</p>`;
                console.error("Erreur de chargement de la page:", error);
            });
    }

    // Fonction pour activer/désactiver l'affichage du menu dropdown
    function toggleDropdown() {
        const dropdown = document.querySelector('.dropdown-menu');
        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    }


    const correctAnswers = {
        q1: "C",
        q2: "la somme de toutes les valeurs divisée par le nombre d'éléments",
        q3: "Faux",
        q4: ["B", "C", "D"],
        q5: "excel",
        q6: ["A", "B"],
        q7: "A",
        q8: "Faux",
        q9: ["A", "D"],
        q10: "des événements futurs en se basant sur des données historiques."
    };

    // Fonction pour calculer le score et afficher les réponses correctes
    document.getElementById("submitQuiz").addEventListener("click", function () {
        const form = document.getElementById("quizForm");
        let score = 0;
        
        // Vérifier si le formulaire est valide
        if (!form.checkValidity()) {
            alert("Veuillez répondre à toutes les questions.");
            return;
        }

        // Vérification des réponses
        for (let i = 1; i <= 10; i++) {
            if (Array.isArray(correctAnswers[`q${i}`])) {
                // Réponses multiples (questions avec cases à cocher)
                const userAnswers = [];
                document.querySelectorAll(`input[name='q${i}']:checked`).forEach(input => userAnswers.push(input.value));
                // On compare les réponses triées (afin de ne pas se soucier de l'ordre)
                if (userAnswers.length > 0) {
                    if (JSON.stringify(userAnswers.sort()) === JSON.stringify(correctAnswers[`q${i}`].sort())) {
                        score++;
                    }
                    // Affichage de la réponse correcte seulement si l'utilisateur a répondu
                    const answerText = `Réponse correcte : ${correctAnswers[`q${i}`].join(", ")}`;
                    const correctElement = document.getElementById(`correct-q${i}`);
                    correctElement.innerText = answerText;
                    correctElement.style.color = 'green'; // Appliquer la couleur verte
                }
            } else if (form.querySelector(`input[name='q${i}']:checked`)) {
                // Réponse unique (questions avec radio buttons)
                const userAnswer = form.querySelector(`input[name='q${i}']:checked`).value;
                if (userAnswer === correctAnswers[`q${i}`]) {
                    score++;
                }
                // Affichage de la réponse correcte seulement si l'utilisateur a répondu
                const correctElement = document.getElementById(`correct-q${i}`);
                correctElement.innerText = `Réponse correcte : ${correctAnswers[`q${i}`]}`;
                correctElement.style.color = 'green'; // Appliquer la couleur verte
            } else if (form.querySelector(`input[name='q${i}']`)) {
                // Réponse texte
                const userAnswerText = form.querySelector(`input[name='q${i}']`).value.trim().toLowerCase();
                if (userAnswerText === correctAnswers[`q${i}`].toLowerCase()) {
                    score++;
                }
                // Affichage de la réponse correcte seulement si l'utilisateur a répondu
                document.getElementById(`correct-q${i}`).innerText = userAnswerText ? `Réponse correcte : ${correctAnswers[`q${i}`]}` : '';
                document.getElementById(`correct-q${i}`).style.color = 'green';
            }
        }

        // Affichage du score
        document.getElementById("result").innerText = `Votre score est de ${score} / 10.`;
    });

// Animation du titre
let colors = ["#f2cc8f", "#e07a5f","#fff"];
let colorIndex = 0;

function changeTitleColor() {
    let title = document.querySelector("header h1");
    title.style.color = colors[colorIndex];
    colorIndex = (colorIndex + 1) % colors.length;
}
setInterval(changeTitleColor, 1000);

