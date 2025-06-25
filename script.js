// Variables globales
let currentQuestion = 0;
let answers = [];
let currentAssessmentType = '';
let chatbotCollapsed = false;

// Datos de evaluaciones
const assessmentData = {
    ansiedad: {
        title: "Test de Ansiedad GAD-7",
        questions: [
            "¿Con qué frecuencia te has sentido nervioso/a, ansioso/a o muy alterado/a?",
            "¿Con qué frecuencia no has podido parar o controlar tus preocupaciones?",
            "¿Con qué frecuencia te has preocupado demasiado por diferentes cosas?",
            "¿Con qué frecuencia has tenido dificultad para relajarte?",
            "¿Con qué frecuencia te has sentido tan inquieto/a que te ha sido difícil quedarte quieto/a?",
            "¿Con qué frecuencia te has sentido fácilmente molesto/a o irritable?",
            "¿Con qué frecuencia has sentido miedo como si algo terrible fuera a pasar?"
        ],
        options: [
            "Nunca (0 puntos)",
            "Varios días (1 punto)",
            "Más de la mitad de los días (2 puntos)",
            "Casi todos los días (3 puntos)"
        ]
    },
    depresion: {
        title: "Test de Depresión PHQ-9",
        questions: [
            "¿Poco interés o placer en hacer las cosas?",
            "¿Te has sentido decaído/a, deprimido/a o sin esperanza?",
            "¿Problemas para conciliar el sueño, mantenerse dormido/a o dormir demasiado?",
            "¿Te has sentido cansado/a o con poca energía?",
            "¿Poco apetito o comer en exceso?",
            "¿Te has sentido mal contigo mismo/a o que eres un fracaso?",
            "¿Problemas para concentrarte en cosas como leer o ver televisión?",
            "¿Te has movido o hablado tan lento que otras personas lo han notado?",
            "¿Pensamientos de que estarías mejor muerto/a o de hacerte daño?"
        ],
        options: [
            "Para nada (0 puntos)",
            "Varios días (1 punto)",
            "Más de la mitad de los días (2 puntos)",
            "Casi todos los días (3 puntos)"
        ]
    },
    sueno: {
        title: "Evaluación de Calidad del Sueño",
        questions: [
            "¿Cuánto tiempo tardas en dormirte normalmente?",
            "¿Con qué frecuencia te despiertas durante la noche?",
            "¿Cómo calificas la calidad general de tu sueño?",
            "¿Te sientes descansado/a al despertar?",
            "¿Tienes dificultad para mantener el sueño?"
        ],
        options: [
            "Excelente/Nunca (0 puntos)",
            "Bueno/Raramente (1 punto)",
            "Regular/Algunas veces (2 puntos)",
            "Malo/Frecuentemente (3 puntos)"
        ]
    },
    estres: {
        title: "Escala de Estrés Percibido",
        questions: [
            "¿Con qué frecuencia te has sentido afectado/a por algo inesperado?",
            "¿Con qué frecuencia te has sentido incapaz de controlar las cosas importantes de tu vida?",
            "¿Con qué frecuencia te has sentido nervioso/a o estresado/a?",
            "¿Con qué frecuencia has estado seguro/a de poder manejar tus problemas personales?",
            "¿Con qué frecuencia has sentido que las cosas van como tú quieres?"
        ],
        options: [
            "Nunca (0 puntos)",
            "Casi nunca (1 punto)",
            "De vez en cuando (2 puntos)",
            "A menudo (3 puntos)",
            "Muy a menudo (4 puntos)"
        ]
    }
};

// Contenido educativo
const articles = [
    {
        title: "Entendiendo la Ansiedad",
        content: "La ansiedad es una respuesta natural del cuerpo ante situaciones percibidas como amenazantes. Sin embargo, cuando se vuelve excesiva o persistente, puede interferir con la vida diaria. Los síntomas incluyen preocupación excesiva, tensión muscular, fatiga y dificultad para concentrarse.",
        category: "ansiedad"
    },
    {
        title: "Señales de Depresión",
        content: "La depresión es más que sentirse triste ocasionalmente. Es un trastorno del estado de ánimo que afecta cómo te sientes, piensas y manejas las actividades diarias. Los síntomas incluyen tristeza persistente, pérdida de interés, cambios en el apetito y problemas de sueño.",
        category: "depresion"
    },
    {
        title: "Técnicas de Relajación",
        content: "Las técnicas de relajación pueden ayudar a reducir el estrés y la ansiedad. Algunas técnicas efectivas incluyen la respiración profunda, la relajación muscular progresiva, la meditación mindfulness y la visualización guiada.",
        category: "tecnicas"
    },
    {
        title: "Importancia del Sueño",
        content: "Un sueño de calidad es fundamental para la salud mental. La falta de sueño puede empeorar los síntomas de ansiedad y depresión. Mantener una rutina de sueño regular, crear un ambiente propicio para dormir y evitar cafeína antes de acostarse son estrategias importantes.",
        category: "sueno"
    }
];

const videos = [
    {
        title: "Técnicas de Respiración para la Ansiedad",
        description: "Aprende ejercicios de respiración que puedes usar en cualquier momento para calmar la ansiedad.",
        duration: "8 min"
    },
    {
        title: "Mindfulness para Principiantes",
        description: "Una introducción práctica a la meditación mindfulness y sus beneficios para la salud mental.",
        duration: "12 min"
    },
    {
        title: "Rutinas de Sueño Saludables",
        description: "Consejos para establecer rutinas que mejoren la calidad de tu descanso nocturno.",
        duration: "10 min"
    }
];

const downloads = [
    {
        title: "Diario de Emociones",
        type: "PDF",
        description: "Plantilla para registrar y reflexionar sobre tus emociones diarias."
    },
    {
        title: "Guía de Técnicas de Relajación",
        type: "PDF",
        description: "Manual completo con ejercicios paso a paso para la relajación."
    },
    {
        title: "Planificador de Bienestar",
        type: "PDF",
        description: "Herramienta para planificar actividades que promuevan tu bienestar mental."
    }
];

// Respuestas del chatbot
const chatbotResponses = {
    ansiedad: [
        "Entiendo que te sientes ansioso/a. La ansiedad es muy común y hay técnicas que pueden ayudarte. ¿Te gustaría que te enseñe algunos ejercicios de respiración?",
        "Cuando sientes ansiedad, trata de hacer respiración profunda: inhala por 4 segundos, mantén por 4, exhala por 6. ¿Quieres intentarlo?",
        "La ansiedad puede ser abrumadora. Recuerda que es temporal y que tienes el control. ¿Hay algo específico que te está preocupando?"
    ],
    tristeza: [
        "Lamento que te sientes triste. Es normal tener estos sentimientos. ¿Te gustaría hablar sobre lo que está pasando?",
        "La tristeza es una emoción válida. A veces ayuda hablar con alguien o hacer una actividad que te guste. ¿Qué solía hacerte feliz?",
        "Es importante cuidarte cuando te sientes así. ¿Has considerado contactar a un profesional de salud mental?"
    ],
    insomnio: [
        "Los problemas de sueño pueden afectar mucho tu bienestar. ¿Has probado establecer una rutina antes de dormir?",
        "Para mejorar el sueño, trata de: evitar pantallas 1 hora antes de dormir, mantener tu habitación fresca y oscura, y relajarte con lectura o música suave.",
        "El insomnio puede tener varias causas. Si persiste, es recomendable consultar con un especialista."
    ],
    ayuda: [
        "Me alegra que busques ayuda profesional. En nuestra plataforma puedes encontrar profesionales certificados. ¿Te gustaría que te ayude a encontrar uno?",
        "Buscar ayuda profesional es un paso muy valiente e importante. ¿Prefieres terapia psicológica o necesitas evaluación psiquiátrica?",
        "Hay diferentes tipos de terapia disponibles. Te recomiendo revisar nuestro directorio de profesionales para encontrar el mejor para ti."
    ],
    general: [
        "Estoy aquí para apoyarte. ¿Podrías contarme más sobre cómo te sientes?",
        "Gracias por compartir conmigo. ¿Hay algo específico en lo que te gustaría que te ayude?",
        "Tu bienestar mental es importante. ¿Has considerado alguna de nuestras herramientas de autoevaluación?"
    ]
};

// Inicialización cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeModals();
    initializeProfessionalFilters();
    initializeChatbot();
});

// Navegación
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Cerrar menú al hacer click en un enlace
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });
}

// Función para scroll suave
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Inicializar modales
function initializeModals() {
    // Cerrar modales al hacer click en X
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });
    
    // Cerrar modales al hacer click fuera
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
}

// Funciones de evaluación
function startAssessment(type) {
    currentAssessmentType = type;
    currentQuestion = 0;
    answers = [];
    
    const modal = document.getElementById('assessmentModal');
    const title = document.getElementById('assessmentTitle');
    const assessmentContent = document.getElementById('assessmentContent');
    const resultsContent = document.getElementById('resultsContent');
    
    title.textContent = assessmentData[type].title;
    assessmentContent.style.display = 'block';
    resultsContent.style.display = 'none';
    
    showQuestion();
    modal.style.display = 'block';
}

function showQuestion() {
    const data = assessmentData[currentAssessmentType];
    const questionText = document.getElementById('questionText');
    const optionsContainer = document.getElementById('optionsContainer');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    
    questionText.textContent = `${currentQuestion + 1}. ${data.questions[currentQuestion]}`;
    
    optionsContainer.innerHTML = '';
    data.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        optionDiv.textContent = option;
        optionDiv.onclick = () => selectOption(index);
        
        if (answers[currentQuestion] === index) {
            optionDiv.classList.add('selected');
        }
        
        optionsContainer.appendChild(optionDiv);
    });
    
    prevBtn.style.display = currentQuestion > 0 ? 'block' : 'none';
    nextBtn.style.display = currentQuestion < data.questions.length - 1 ? 'block' : 'none';
    submitBtn.style.display = currentQuestion === data.questions.length - 1 ? 'block' : 'none';
}

function selectOption(optionIndex) {
    answers[currentQuestion] = optionIndex;
    
    document.querySelectorAll('.option').forEach(option => {
        option.classList.remove('selected');
    });
    
    document.querySelectorAll('.option')[optionIndex].classList.add('selected');
}

function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion();
    }
}

function nextQuestion() {
    if (answers[currentQuestion] !== undefined && currentQuestion < assessmentData[currentAssessmentType].questions.length - 1) {
        currentQuestion++;
        showQuestion();
    }
}

function submitAssessment() {
    if (answers.length === assessmentData[currentAssessmentType].questions.length) {
        showResults();
    }
}

function showResults() {
    const assessmentContent = document.getElementById('assessmentContent');
    const resultsContent = document.getElementById('resultsContent');
    const resultText = document.getElementById('resultText');
    const recommendations = document.getElementById('recommendations');
    
    const score = answers.reduce((sum, answer) => sum + answer, 0);
    const maxScore = assessmentData[currentAssessmentType].options.length - 1;
    const totalMaxScore = maxScore * assessmentData[currentAssessmentType].questions.length;
    
    let level, description, recs;
    
    const percentage = (score / totalMaxScore) * 100;
    
    if (percentage <= 25) {
        level = "Bajo";
        description = "Tus niveles parecen estar en un rango normal. Mantén tus hábitos saludables.";
        recs = [
            "Continúa con tus rutinas de autocuidado",
            "Mantén conexiones sociales saludables",
            "Practica técnicas de relajación regularmente"
        ];
    } else if (percentage <= 50) {
        level = "Moderado";
        description = "Experimentas algunos síntomas que podrían beneficiarse de atención.";
        recs = [
            "Considera hablar con un profesional de salud mental",
            "Practica técnicas de manejo del estrés",
            "Mantén una rutina de ejercicio regular",
            "Asegúrate de dormir lo suficiente"
        ];
    } else if (percentage <= 75) {
        level = "Alto";
        description = "Tus síntomas sugieren que podrías beneficiarte significativamente de apoyo profesional.";
        recs = [
            "Te recomendamos contactar a un profesional de salud mental",
            "Considera terapia psicológica",
            "Practica técnicas de relajación diariamente",
            "Mantén un diario de emociones"
        ];
    } else {
        level = "Muy Alto";
        description = "Tus síntomas indican que es importante buscar ayuda profesional pronto.";
        recs = [
            "Es importante que contactes a un profesional de salud mental",
            "Si tienes pensamientos de autolesión, busca ayuda inmediata",
            "Contacta a nuestra línea de crisis: 113",
            "No estás solo/a, hay ayuda disponible"
        ];
    }
    
    resultText.innerHTML = `
        <div style="text-align: center; margin-bottom: 20px;">
            <h4>Nivel: ${level}</h4>
            <p>Puntuación: ${score}/${totalMaxScore}</p>
            <p>${description}</p>
        </div>
    `;
    
    recommendations.innerHTML = `
        <h4>Recomendaciones:</h4>
        <ul>
            ${recs.map(rec => `<li>${rec}</li>`).join('')}
        </ul>
        <div style="margin-top: 20px;">
            <button class="btn-outline" onclick="scrollToSection('profesionales'); closeAssessmentModal();">Buscar Profesional</button>
            <button class="btn-outline" onclick="showEmergencyModal()" style="margin-left: 10px;">Ayuda Inmediata</button>
        </div>
    `;
    
    assessmentContent.style.display = 'none';
    resultsContent.style.display = 'block';
}

function closeAssessmentModal() {
    document.getElementById('assessmentModal').style.display = 'none';
}

// Event listeners para los botones de evaluación
document.addEventListener('DOMContentLoaded', function() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    const closeResults = document.getElementById('closeResults');
    
    if (prevBtn) prevBtn.onclick = previousQuestion;
    if (nextBtn) nextBtn.onclick = nextQuestion;
    if (submitBtn) submitBtn.onclick = submitAssessment;
    if (closeResults) closeResults.onclick = closeAssessmentModal;
});

// Funciones de contenido
function showArticles() {
    const contentModal = document.getElementById('contentModal');
    const contentModalBody = document.getElementById('contentModalBody');
    
    contentModalBody.innerHTML = `
        <h2>Artículos Educativos</h2>
        <div class="articles-container">
            ${articles.map(article => `
                <div class="article-card" style="margin-bottom: 20px; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
                    <h3>${article.title}</h3>
                    <p>${article.content}</p>
                    <span style="color: #667eea; font-size: 0.9em;">#${article.category}</span>
                </div>
            `).join('')}
        </div>
    `;
    
    contentModal.style.display = 'block';
}

function showVideos() {
    const contentModal = document.getElementById('contentModal');
    const contentModalBody = document.getElementById('contentModalBody');
    
    contentModalBody.innerHTML = `
        <h2>Videos Educativos</h2>
        <div class="videos-container">
            ${videos.map(video => `
                <div class="video-card" style="margin-bottom: 20px; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; display: flex; align-items: center;">
                    <div style="width: 60px; height: 60px; background: #667eea; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 15px;">
                        <i class="fas fa-play" style="color: white; font-size: 1.5rem;"></i>
                    </div>
                    <div>
                        <h4>${video.title}</h4>
                        <p>${video.description}</p>
                        <span style="color: #666;">Duración: ${video.duration}</span>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    
    contentModal.style.display = 'block';
}

function showDownloads() {
    const contentModal = document.getElementById('contentModal');
    const contentModalBody = document.getElementById('contentModalBody');
    
    contentModalBody.innerHTML = `
        <h2>Recursos Descargables</h2>
        <div class="downloads-container">
            ${downloads.map(download => `
                <div class="download-card" style="margin-bottom: 20px; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <h4>${download.title}</h4>
                        <p>${download.description}</p>
                        <span style="color: #667eea;">Tipo: ${download.type}</span>
                    </div>
                    <button class="btn-primary" onclick="downloadResource('${download.title}')">
                        <i class="fas fa-download"></i> Descargar
                    </button>
                </div>
            `).join('')}
        </div>
    `;
    
    contentModal.style.display = 'block';
}

function downloadResource(title) {
    alert(`Descargando: ${title}\n\nEn una implementación real, esto iniciaría la descarga del archivo.`);
}

function showEmergencyContacts() {
    const contentModal = document.getElementById('contentModal');
    const contentModalBody = document.getElementById('contentModalBody');
    
    contentModalBody.innerHTML = `
        <h2>Contactos de Emergencia</h2>
        <div class="emergency-contacts-list">
            <div class="emergency-contact" style="margin-bottom: 20px; padding: 20px; background: #ffebee; border-radius: 10px; border-left: 4px solid #ff6b6b;">
                <h3><i class="fas fa-phone"></i> Línea Nacional de Prevención del Suicidio</h3>
                <p><strong>113</strong> - Disponible 24/7</p>
            </div>
            <div class="emergency-contact" style="margin-bottom: 20px; padding: 20px; background: #e8f5e8; border-radius: 10px; border-left: 4px solid #4caf50;">
                <h3><i class="fab fa-whatsapp"></i> WhatsApp de Crisis</h3>
                <p><strong>+51 999 123 456</strong></p>
            </div>
            <div class="emergency-contact" style="margin-bottom: 20px; padding: 20px; background: #e3f2fd; border-radius: 10px; border-left: 4px solid #2196f3;">
                <h3><i class="fas fa-hospital"></i> SAMU - Emergencias Médicas</h3>
                <p><strong>106</strong></p>
            </div>
            <div class="emergency-contact" style="margin-bottom: 20px; padding: 20px; background: #fff3e0; border-radius: 10px; border-left: 4px solid #ff9800;">
                <h3><i class="fas fa-shield-alt"></i> Policía Nacional</h3>
                <p><strong>105</strong></p>
            </div>
        </div>
    `;
    
    contentModal.style.display = 'block';
}

function closeContentModal() {
    document.getElementById('contentModal').style.display = 'none';
}

// Modal de emergencia
function showEmergencyModal() {
    document.getElementById('emergencyModal').style.display = 'block';
}

function closeEmergencyModal() {
    document.getElementById('emergencyModal').style.display = 'none';
}

function startEmergencyChat() {
    closeEmergencyModal();
    if (chatbotCollapsed) {
        toggleChatbot();
    }
    addBotMessage("Estoy aquí para ayudarte en esta situación de crisis. ¿Estás en peligro inmediato? Si es así, por favor llama al 113 o ve a la sala de emergencias más cercana.");
}

// Filtros de profesionales
function initializeProfessionalFilters() {
    const searchInput = document.getElementById('searchProfessional');
    const specialtyFilter = document.getElementById('specialtyFilter');
    const locationFilter = document.getElementById('locationFilter');
    
    if (searchInput) {
        searchInput.addEventListener('input', filterProfessionals);
    }
    if (specialtyFilter) {
        specialtyFilter.addEventListener('change', filterProfessionals);
    }
    if (locationFilter) {
        locationFilter.addEventListener('change', filterProfessionals);
    }
}

function filterProfessionals() {
    const searchTerm = document.getElementById('searchProfessional').value.toLowerCase();
    const specialty = document.getElementById('specialtyFilter').value;
    const location = document.getElementById('locationFilter').value;
    
    const cards = document.querySelectorAll('.professional-card');
    
    cards.forEach(card => {
        const name = card.querySelector('h3').textContent.toLowerCase();
        const cardSpecialty = card.getAttribute('data-specialty');
        const cardLocation = card.getAttribute('data-location');
        
        const matchesSearch = name.includes(searchTerm) || 
                            card.querySelector('.specialty').textContent.toLowerCase().includes(searchTerm);
        const matchesSpecialty = !specialty || cardSpecialty === specialty;
        const matchesLocation = !location || cardLocation === location;
        
        if (matchesSearch && matchesSpecialty && matchesLocation) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function scheduleAppointment(professionalName) {
    alert(`Solicitud de cita enviada para ${professionalName}.\n\nEn una implementación real, esto abriría un formulario de agendamiento o conectaría con el sistema de citas del profesional.`);
}

// Funciones de comunidad
function showSupportGroups() {
    const contentModal = document.getElementById('contentModal');
    const contentModalBody = document.getElementById('contentModalBody');
    
    contentModalBody.innerHTML = `
        <h2>Grupos de Apoyo</h2>
        <div class="support-groups">
            <div class="group-card" style="margin-bottom: 20px; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
                <h3><i class="fas fa-heart"></i> Grupo de Apoyo para Ansiedad</h3>
                <p>Un espacio seguro para compartir experiencias sobre ansiedad y aprender técnicas de manejo.</p>
                <p><strong>Próxima reunión:</strong> Miércoles 7:00 PM</p>
                <button class="btn-primary">Unirse al grupo</button>
            </div>
            <div class="group-card" style="margin-bottom: 20px; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
                <h3><i class="fas fa-sun"></i> Superando la Depresión</h3>
                <p>Grupo de apoyo mutuo para personas que enfrentan síntomas depresivos.</p>
                <p><strong>Próxima reunión:</strong> Viernes 6:00 PM</p>
                <button class="btn-primary">Unirse al grupo</button>
            </div>
            <div class="group-card" style="margin-bottom: 20px; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
                <h3><i class="fas fa-users"></i> Familias y Salud Mental</h3>
                <p>Apoyo para familiares de personas con trastornos de salud mental.</p>
                <p><strong>Próxima reunión:</strong> Sábado 10:00 AM</p>
                <button class="btn-primary">Unirse al grupo</button>
            </div>
        </div>
    `;
    
    contentModal.style.display = 'block';
}

function showForums() {
    const contentModal = document.getElementById('contentModal');
    const contentModalBody = document.getElementById('contentModalBody');
    
    contentModalBody.innerHTML = `
        <h2>Foros de Discusión</h2>
        <div class="forums-list">
            <div class="forum-card" style="margin-bottom: 20px; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
                <h3><i class="fas fa-comments"></i> Estrategias de Afrontamiento</h3>
                <p>Comparte y descubre técnicas para manejar el estrés y la ansiedad.</p>
                <p><small>156 mensajes | Moderado por profesionales</small></p>
                <button class="btn-outline">Participar</button>
            </div>
            <div class="forum-card" style="margin-bottom: 20px; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
                <h3><i class="fas fa-heart"></i> Experiencias de Recuperación</h3>
                <p>Historias inspiradoras de superación y recuperación.</p>
                <p><small>89 mensajes | Moderado por profesionales</small></p>
                <button class="btn-outline">Participar</button>
            </div>
            <div class="forum-card" style="margin-bottom: 20px; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
                <h3><i class="fas fa-question-circle"></i> Preguntas Generales</h3>
                <p>Espacio para hacer preguntas sobre salud mental y tratamientos.</p>
                <p><small>234 mensajes | Moderado por profesionales</small></p>
                <button class="btn-outline">Participar</button>
            </div>
        </div>
    `;
    contentModal.style.display = 'block';
}

function showEvents() {
    const contentModal = document.getElementById('contentModal');
    const contentModalBody = document.getElementById('contentModalBody');
    
    contentModalBody.innerHTML = `
        <h2>Eventos Virtuales</h2>
        <div class="events-list">
            <div class="event-card" style="margin-bottom: 20px; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; border-left: 4px solid #667eea;">
                <div style="display: flex; justify-content: space-between; align-items: start;">
                    <div>
                        <h3><i class="fas fa-calendar-alt"></i> Taller: Manejo del Estrés</h3>
                        <p>Aprende técnicas efectivas para manejar el estrés diario y mejorar tu bienestar mental.</p>
                        <p><strong>Fecha:</strong> Viernes 28 de Junio, 7:00 PM</p>
                        <p><strong>Duración:</strong> 2 horas</p>
                        <p><strong>Instructor:</strong> Dr. Patricia López</p>
                    </div>
                    <button class="btn-primary" onclick="registerForEvent('Taller: Manejo del Estrés')">Inscribirse</button>
                </div>
            </div>
            <div class="event-card" style="margin-bottom: 20px; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; border-left: 4px solid #4caf50;">
                <div style="display: flex; justify-content: space-between; align-items: start;">
                    <div>
                        <h3><i class="fas fa-users"></i> Grupo de Meditación Mindfulness</h3>
                        <p>Sesión grupal de meditación guiada para principiantes y avanzados.</p>
                        <p><strong>Fecha:</strong> Sábado 29 de Junio, 9:00 AM</p>
                        <p><strong>Duración:</strong> 1 hora</p>
                        <p><strong>Facilitador:</strong> Lic. Roberto Vargas</p>
                    </div>
                    <button class="btn-primary" onclick="registerForEvent('Grupo de Meditación Mindfulness')">Inscribirse</button>
                </div>
            </div>
            <div class="event-card" style="margin-bottom: 20px; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; border-left: 4px solid #ff9800;">
                <div style="display: flex; justify-content: space-between; align-items: start;">
                    <div>
                        <h3><i class="fas fa-heart"></i> Charla: Salud Mental en Adolescentes</h3>
                        <p>Conferencia dirigida a padres y educadores sobre cómo apoyar la salud mental adolescente.</p>
                        <p><strong>Fecha:</strong> Domingo 30 de Junio, 4:00 PM</p>
                        <p><strong>Duración:</strong> 1.5 horas</p>
                        <p><strong>Ponente:</strong> Dra. Carmen Ruiz</p>
                    </div>
                    <button class="btn-primary" onclick="registerForEvent('Charla: Salud Mental en Adolescentes')">Inscribirse</button>
                </div>
            </div>
        </div>
    `;
    
    contentModal.style.display = 'block';
}

function registerForEvent(eventName) {
    alert(`¡Te has inscrito exitosamente al evento: "${eventName}"!\n\nRecibirás un correo de confirmación con el enlace de acceso 30 minutos antes del evento.`);
}

// Funciones adicionales del footer
function showContact() {
    const contentModal = document.getElementById('contentModal');
    const contentModalBody = document.getElementById('contentModalBody');
    
    contentModalBody.innerHTML = `
        <h2>Contacto</h2>
        <div class="contact-info">
            <div class="contact-section" style="margin-bottom: 30px;">
                <h3><i class="fas fa-envelope"></i> Correo Electrónico</h3>
                <p>contacto@mentalcare.pe</p>
                <p>Para consultas generales y soporte técnico</p>
            </div>
            <div class="contact-section" style="margin-bottom: 30px;">
                <h3><i class="fas fa-phone"></i> Teléfono</h3>
                <p>+51 1 234-5678</p>
                <p>Lunes a Viernes: 8:00 AM - 6:00 PM</p>
            </div>
            <div class="contact-section" style="margin-bottom: 30px;">
                <h3><i class="fas fa-map-marker-alt"></i> Dirección</h3>
                <p>Av. Javier Prado Este 123, San Isidro, Lima</p>
                <p>Perú</p>
            </div>
            <div class="contact-form" style="margin-top: 30px;">
                <h3>Envíanos un mensaje</h3>
                <form onsubmit="submitContactForm(event)" style="display: flex; flex-direction: column; gap: 15px;">
                    <input type="text" placeholder="Nombre completo" required style="padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
                    <input type="email" placeholder="Correo electrónico" required style="padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
                    <textarea placeholder="Mensaje" required style="padding: 10px; border: 1px solid #ddd; border-radius: 5px; height: 100px; resize: vertical;"></textarea>
                    <button type="submit" class="btn-primary">Enviar mensaje</button>
                </form>
            </div>
        </div>
    `;
    
    contentModal.style.display = 'block';
}

function submitContactForm(event) {
    event.preventDefault();
    alert('¡Gracias por tu mensaje! Te responderemos en un plazo de 24-48 horas.');
    closeContentModal();
}

function showFAQ() {
    const contentModal = document.getElementById('contentModal');
    const contentModalBody = document.getElementById('contentModalBody');
    
    contentModalBody.innerHTML = `
        <h2>Preguntas Frecuentes</h2>
        <div class="faq-list">
            <div class="faq-item" style="margin-bottom: 20px; border: 1px solid #e0e0e0; border-radius: 10px; overflow: hidden;">
                <div class="faq-question" onclick="toggleFAQ(0)" style="padding: 15px; background: #f8f9fa; cursor: pointer; font-weight: bold;">
                    <i class="fas fa-plus"></i> ¿Los test de autoevaluación son confidenciales?
                </div>
                <div class="faq-answer" id="faq-0" style="display: none; padding: 15px;">
                    Sí, todos nuestros test son completamente anónimos y confidenciales. No guardamos información personal y los resultados solo son visibles para ti.
                </div>
            </div>
            <div class="faq-item" style="margin-bottom: 20px; border: 1px solid #e0e0e0; border-radius: 10px; overflow: hidden;">
                <div class="faq-question" onclick="toggleFAQ(1)" style="padding: 15px; background: #f8f9fa; cursor: pointer; font-weight: bold;">
                    <i class="fas fa-plus"></i> ¿Cómo puedo contactar a un profesional?
                </div>
                <div class="faq-answer" id="faq-1" style="display: none; padding: 15px;">
                    Puedes usar nuestro directorio de profesionales para buscar especialistas por ubicación y especialidad. Cada perfil tiene un botón para agendar citas directamente.
                </div>
            </div>
            <div class="faq-item" style="margin-bottom: 20px; border: 1px solid #e0e0e0; border-radius: 10px; overflow: hidden;">
                <div class="faq-question" onclick="toggleFAQ(2)" style="padding: 15px; background: #f8f9fa; cursor: pointer; font-weight: bold;">
                    <i class="fas fa-plus"></i> ¿Qué hago en caso de crisis?
                </div>
                <div class="faq-answer" id="faq-2" style="display: none; padding: 15px;">
                    En situaciones de crisis, llama inmediatamente al 113 (Línea Nacional de Prevención del Suicidio) o ve a la sala de emergencias más cercana. También puedes usar nuestro chatbot de emergencia.
                </div>
            </div>
            <div class="faq-item" style="margin-bottom: 20px; border: 1px solid #e0e0e0; border-radius: 10px; overflow: hidden;">
                <div class="faq-question" onclick="toggleFAQ(3)" style="padding: 15px; background: #f8f9fa; cursor: pointer; font-weight: bold;">
                    <i class="fas fa-plus"></i> ¿Los profesionales están certificados?
                </div>
                <div class="faq-answer" id="faq-3" style="display: none; padding: 15px;">
                    Sí, todos los profesionales en nuestro directorio están debidamente certificados y registrados en el Colegio de Psicólogos del Perú o el Colegio Médico del Perú según corresponda.
                </div>
            </div>
        </div>
    `;
    
    contentModal.style.display = 'block';
}

function toggleFAQ(index) {
    const answer = document.getElementById(`faq-${index}`);
    const question = answer.previousElementSibling;
    const icon = question.querySelector('i');
    
    if (answer.style.display === 'none') {
        answer.style.display = 'block';
        icon.className = 'fas fa-minus';
    } else {
        answer.style.display = 'none';
        icon.className = 'fas fa-plus';
    }
}

// FUNCIONES DEL CHATBOT
function initializeChatbot() {
    // El chatbot empieza colapsado
    chatbotCollapsed = true;
    const chatbotBody = document.getElementById('chatbotBody');
    const toggleIcon = document.getElementById('chatToggleIcon');
    
    if (chatbotBody) {
        chatbotBody.style.display = 'none';
    }
    if (toggleIcon) {
        toggleIcon.className = 'fas fa-chevron-down';
    }
}

function toggleChatbot() {
    const chatbotBody = document.getElementById('chatbotBody');
    const toggleIcon = document.getElementById('chatToggleIcon');
    
    chatbotCollapsed = !chatbotCollapsed;
    
    if (chatbotCollapsed) {
        chatbotBody.style.display = 'none';
        toggleIcon.className = 'fas fa-chevron-down';
    } else {
        chatbotBody.style.display = 'block';
        toggleIcon.className = 'fas fa-chevron-up';
    }
}

function handleChatKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function sendMessage() {
    const chatInput = document.getElementById('chatInput');
    const message = chatInput.value.trim();
    
    if (message) {
        addUserMessage(message);
        chatInput.value = '';
        
        // Simular respuesta del bot después de un breve delay
        setTimeout(() => {
            const botResponse = generateBotResponse(message);
            addBotMessage(botResponse);
        }, 1000);
    }
}

function quickMessage(message) {
    addUserMessage(message);
    
    setTimeout(() => {
        const botResponse = generateBotResponse(message);
        addBotMessage(botResponse);
    }, 1000);
}

function addUserMessage(message) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'user-message';
    messageDiv.innerHTML = `
        <div class="message-content">
            ${message}
        </div>
        <div class="message-avatar">
            <i class="fas fa-user"></i>
        </div>
    `;
    chatMessages.appendChild(messageDiv);
    scrollToBottom();
}

function addBotMessage(message) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'bot-message';
    messageDiv.innerHTML = `
        <div class="message-avatar">
            <i class="fas fa-robot"></i>
        </div>
        <div class="message-content">
            ${message}
        </div>
    `;
    chatMessages.appendChild(messageDiv);
    scrollToBottom();
}

function scrollToBottom() {
    const chatMessages = document.getElementById('chatMessages');
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function generateBotResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    // Palabras clave para diferentes tipos de respuesta
    if (message.includes('ansioso') || message.includes('ansiedad') || message.includes('nervioso') || message.includes('preocup')) {
        return getRandomResponse(chatbotResponses.ansiedad);
    } else if (message.includes('triste') || message.includes('deprim') || message.includes('bajo') || message.includes('sin esperanza')) {
        return getRandomResponse(chatbotResponses.tristeza);
    } else if (message.includes('dormir') || message.includes('sueño') || message.includes('insomnio') || message.includes('desvel')) {
        return getRandomResponse(chatbotResponses.insomnio);
    } else if (message.includes('ayuda') || message.includes('profesional') || message.includes('psicolog') || message.includes('psiquiatra')) {
        return getRandomResponse(chatbotResponses.ayuda);
    } else if (message.includes('hola') || message.includes('buenos') || message.includes('buenas')) {
        return "¡Hola! Me alegra verte por aquí. Estoy aquí para apoyarte con cualquier pregunta sobre salud mental. ¿Cómo te sientes hoy?";
    } else if (message.includes('gracias')) {
        return "De nada, estoy aquí para ayudarte. ¿Hay algo más en lo que pueda apoyarte? Recuerda que también puedes usar nuestras herramientas de autoevaluación.";
    } else if (message.includes('test') || message.includes('evalua') || message.includes('cuestionario')) {
        return "Tenemos varios test de autoevaluación disponibles: ansiedad, depresión, calidad del sueño y estrés. ¿Te gustaría que te dirija a alguno en particular?";
    } else if (message.includes('emergencia') || message.includes('crisis') || message.includes('suicidio') || message.includes('morir')) {
        return "Si estás en crisis o tienes pensamientos de autolesión, es importante que busques ayuda inmediata. Llama al 113 (Línea Nacional de Prevención del Suicidio) o ve a emergencias. ¿Necesitas que te proporcione más números de contacto de emergencia?";
    } else {
        return getRandomResponse(chatbotResponses.general);
    }
}

function getRandomResponse(responses) {
    return responses[Math.floor(Math.random() * responses.length)];
}

// Agregar más artículos educativos
const additionalArticles = [
    {
        title: "Reconociendo los Síntomas del Trastorno de Pánico",
        content: "El trastorno de pánico se caracteriza por ataques de pánico recurrentes e inesperados. Los síntomas incluyen palpitaciones, sudoración, temblores, sensación de ahogo, dolor en el pecho, náuseas, mareos y miedo intenso. Estos episodios suelen durar entre 5 y 20 minutos. Es importante saber que aunque los síntomas son muy intensos, los ataques de pánico no son peligrosos para la vida. El tratamiento incluye terapia cognitivo-conductual y, en algunos casos, medicación.",
        category: "ansiedad"
    },
    {
        title: "El Impacto de las Redes Sociales en la Salud Mental",
        content: "Las redes sociales pueden tener efectos tanto positivos como negativos en nuestra salud mental. Por un lado, nos permiten mantenernos conectados y encontrar comunidades de apoyo. Sin embargo, el uso excesivo puede llevar a comparaciones sociales, FOMO (miedo a perderse algo), cyberbullying y alteraciones del sueño. Es importante establecer límites saludables: desconectarse antes de dormir, no compararse con otros online, y recordar que las redes sociales muestran solo una versión editada de la realidad.",
        category: "bienestar"
    },
    {
        title: "Mindfulness: Vivir en el Presente",
        content: "El mindfulness o atención plena es la práctica de estar completamente presente en el momento actual, sin juzgar. Esta técnica milenaria ha demostrado ser efectiva para reducir el estrés, la ansiedad y la depresión. Puedes practicar mindfulness a través de la meditación, ejercicios de respiración, o simplemente prestando atención completa a actividades cotidianas como comer o caminar. Empezar con 5-10 minutos diarios puede generar beneficios significativos para tu bienestar mental.",
        category: "tecnicas"
    },
    {
        title: "La Importancia de las Rutinas para la Salud Mental",
        content: "Mantener rutinas regulares puede ser fundamental para la estabilidad emocional y mental. Las rutinas proporcionan estructura, reducen la ansiedad por la incertidumbre y ayudan a desarrollar hábitos saludables. Incluye en tu rutina diaria: horarios regulares de sueño, comidas balanceadas, tiempo para el ejercicio, momentos de relajación y actividades que disfrutes. Durante períodos de estrés o cambios importantes, mantener al menos algunas rutinas básicas puede proporcionar un sentido de normalidad y control.",
        category: "bienestar"
    }
];

// Combinar artículos originales con adicionales
const allArticles = [...articles, ...additionalArticles];

// Actualizar la función showArticles para usar todos los artículos
function showArticles() {
    const contentModal = document.getElementById('contentModal');
    const contentModalBody = document.getElementById('contentModalBody');
    
    contentModalBody.innerHTML = `
        <h2>Artículos Educativos</h2>
        <div class="articles-container">
            ${allArticles.map(article => `
                <div class="article-card" style="margin-bottom: 20px; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
                    <h3>${article.title}</h3>
                    <p>${article.content}</p>
                    <span style="color: #667eea; font-size: 0.9em;">#${article.category}</span>
                </div>
            `).join('')}
        </div>
    `;
    
    contentModal.style.display = 'block';
}

// CSS adicional para el chatbot (esto debería ir en el CSS pero lo incluyo aquí para completar la funcionalidad)
const additionalStyles = `
    .user-message {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 15px;
        align-items: flex-start;
    }

    .user-message .message-content {
        background: #667eea;
        color: white;
        padding: 10px 15px;
        border-radius: 18px 18px 5px 18px;
        max-width: 80%;
        word-wrap: break-word;
    }

    .user-message .message-avatar {
        margin-left: 10px;
        width: 35px;
        height: 35px;
        background: #667eea;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 0.9rem;
    }

    .bot-message {
        display: flex;
        justify-content: flex-start;
        margin-bottom: 15px;
        align-items: flex-start;
    }

    .bot-message .message-content {
        background: #f1f1f1;
        color: #333;
        padding: 10px 15px;
        border-radius: 18px 18px 18px 5px;
        max-width: 80%;
        word-wrap: break-word;
    }

    .bot-message .message-avatar {
        margin-right: 10px;
        width: 35px;
        height: 35px;
        background: #4caf50;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 0.9rem;
    }

    .chat-messages {
        height: 300px;
        overflow-y: auto;
        padding: 15px;
        border-bottom: 1px solid #eee;
    }
`;

// Agregar estilos dinámicamente
function addChatbotStyles() {
    const style = document.createElement('style');
    style.textContent = additionalStyles;
    document.head.appendChild(style);
}

// Llamar a la función cuando se carga la página - SOLO para estilos
document.addEventListener('DOMContentLoaded', function() {
    addChatbotStyles();
    // Eliminamos cualquier inicialización de modal aquí
});

// Función para mostrar recursos por categoría
function showResourcesByCategory(category) {
    const relevantArticles = allArticles.filter(article => article.category === category);
    const contentModal = document.getElementById('contentModal');
    const contentModalBody = document.getElementById('contentModalBody');
    
    const categoryNames = {
        'ansiedad': 'Ansiedad',
        'depresion': 'Depresión',
        'tecnicas': 'Técnicas de Bienestar',
        'sueno': 'Sueño',
        'bienestar': 'Bienestar General'
    };
    
    contentModalBody.innerHTML = `
        <h2>Recursos sobre ${categoryNames[category] || category}</h2>
        <div class="category-resources">
            ${relevantArticles.map(article => `
                <div class="article-card" style="margin-bottom: 20px; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
                    <h3>${article.title}</h3>
                    <p>${article.content}</p>
                </div>
            `).join('')}
            ${relevantArticles.length === 0 ? '<p>No hay recursos específicos para esta categoría por el momento.</p>' : ''}
        </div>
        <div style="margin-top: 20px;">
            <button class="btn-outline" onclick="showArticles()">Ver todos los artículos</button>
        </div>
    `;
    
    contentModal.style.display = 'block';
}