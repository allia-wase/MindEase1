// Global state
let currentUser = null;
let currentAssessment = {
    questions: [],
    currentQuestion: 0,
    answers: []
};

// Assessment questions
const assessmentQuestions = [
    {
        id: 1,
        text: "Over the last 2 weeks, how often have you been bothered by feeling down, depressed, or hopeless?",
        options: ["Not at all", "Several days", "More than half the days", "Nearly every day"]
    },
    {
        id: 2,
        text: "How often have you had little interest or pleasure in doing things?",
        options: ["Not at all", "Several days", "More than half the days", "Nearly every day"]
    },
    {
        id: 3,
        text: "How often have you had trouble falling or staying asleep, or sleeping too much?",
        options: ["Not at all", "Several days", "More than half the days", "Nearly every day"]
    },
    {
        id: 4,
        text: "How often have you been feeling tired or having little energy?",
        options: ["Not at all", "Several days", "More than half the days", "Nearly every day"]
    },
    {
        id: 5,
        text: "How often have you had poor appetite or overeating?",
        options: ["Not at all", "Several days", "More than half the days", "Nearly every day"]
    },
    {
        id: 6,
        text: "How often have you felt bad about yourself - or that you are a failure or have let yourself or your family down?",
        options: ["Not at all", "Several days", "More than half the days", "Nearly every day"]
    },
    {
        id: 7,
        text: "How often have you had trouble concentrating on things, such as reading the newspaper or watching television?",
        options: ["Not at all", "Several days", "More than half the days", "Nearly every day"]
    },
    {
        id: 8,
        text: "Have you been moving or speaking so slowly that other people could have noticed? Or the opposite - being so fidgety or restless that you have been moving around a lot more than usual?",
        options: ["Not at all", "Several days", "More than half the days", "Nearly every day"]
    },
    {
        id: 9,
        text: "How often have you had thoughts that you would be better off dead, or of hurting yourself in some way?",
        options: ["Not at all", "Several days", "More than half the days", "Nearly every day"]
    },
    {
        id: 10,
        text: "If you checked off any problems, how difficult have these problems made it for you to do your work, take care of things at home, or get along with other people?",
        options: ["Not difficult at all", "Somewhat difficult", "Very difficult", "Extremely difficult"]
    }
];

// Motivational quotes
const motivationalQuotes = [
    {
        text: "You don't have to control your thoughts. You just have to stop letting them control you.",
        author: "Dan Millman"
    },
    {
        text: "Your present circumstances don't determine where you can go; they merely determine where you start.",
        author: "Nido Qubein"
    },
    {
        text: "The only journey is the journey within.",
        author: "Rainer Maria Rilke"
    },
    {
        text: "Mental health... is not a destination, but a process. It's about how you drive, not where you're going.",
        author: "Noam Shpancer"
    },
    {
        text: "What mental health needs is more sunlight, more candor, and more unashamed conversation.",
        author: "Glenn Close"
    },
    {
        text: "You are not your illness. You have an individual story to tell. You have a name, a history, a personality. Staying yourself is part of the battle.",
        author: "Julian Seifter"
    },
    {
        text: "There is hope, even when your brain tells you there isn't.",
        author: "John Green"
    },
    {
        text: "It's okay to not be okay. It's okay to show it. It's okay to ask for help.",
        author: "Unknown"
    },
    {
        text: "Healing takes time, and asking for help is a courageous step.",
        author: "Mariska Hargitay"
    },
    {
        text: "Your mental health is a priority. Your happiness is essential. Your self-care is a necessity.",
        author: "Unknown"
    }
];

// Crisis resources
const crisisResources = [
    {
        name: "National Suicide Prevention Lifeline",
        phone: "988",
        description: "Available 24/7 for suicide prevention and mental health crisis"
    },
    {
        name: "Crisis Text Line",
        phone: "Text HOME to 741741",
        description: "Free 24/7 crisis support via text message"
    },
    {
        name: "Emergency Services",
        phone: "911",
        description: "For immediate life-threatening emergencies"
    },
    {
        name: "Campus Counseling Center",
        phone: "(555) 123-HELP",
        description: "University mental health services"
    }
];

// Theme functionality
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeButton(newTheme);
}

function updateThemeButton(theme) {
    const themeBtn = document.getElementById('theme-toggle');
    const icon = themeBtn.querySelector('i');
    const text = themeBtn.querySelector('.theme-text');
    
    if (theme === 'dark') {
        icon.className = 'fas fa-sun';
        text.textContent = 'Light Mode';
    } else {
        icon.className = 'fas fa-moon';
        text.textContent = 'Dark Mode';
    }
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeButton(savedTheme);
}

// Show/hide sections
function showSection(sectionId) {
    console.log('Showing section:', sectionId);
    
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        
        // Clear any error messages when switching sections
        const loginError = document.getElementById('login-error');
        const signupError = document.getElementById('signup-error');
        if (loginError) loginError.textContent = '';
        if (signupError) signupError.textContent = '';
        
        // Clear form fields when showing login/signup
        if (sectionId === 'login') {
            document.getElementById('login-form')?.reset();
        } else if (sectionId === 'signup') {
            document.getElementById('signup-form')?.reset();
        }
        
        // Load section-specific data
        if (sectionId === 'dashboard') {
            loadDashboardData();
        } else if (sectionId === 'quotes') {
            loadDailyQuote();
        } else if (sectionId === 'advisor') {
            loadAppointments();
        } else if (sectionId === 'crisis') {
            loadCrisisResources();
        }
    }
}

// Auth functions
async function signup(event) {
    if (event) event.preventDefault();
    
    const userData = {
        firstName: document.getElementById('signup-firstname')?.value || 'Demo',
        lastName: document.getElementById('signup-lastname')?.value || 'User',
        email: document.getElementById('signup-email')?.value || 'demo@university.edu',
        password: document.getElementById('signup-password')?.value || 'password',
        university: document.getElementById('signup-university')?.value || 'Demo University',
        studentId: document.getElementById('signup-studentid')?.value || '12345'
    };

    try {
        console.log('Signup data:', userData);
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Demo success
        const demoUser = {
            id: 1,
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            university: userData.university,
            studentId: userData.studentId
        };
        
        localStorage.setItem('token', 'demo-token-' + Date.now());
        localStorage.setItem('user', JSON.stringify(demoUser));
        currentUser = demoUser;
        
        // Update UI and redirect to dashboard
        updateUI();
        showSection('dashboard');
        
    } catch (error) {
        console.error('Signup error:', error);
        document.getElementById('signup-error').textContent = 'Signup failed. Please try again.';
    }
}

async function login(event) {
    if (event) event.preventDefault();
    
    const credentials = {
        email: document.getElementById('login-email')?.value || 'demo@university.edu',
        password: document.getElementById('login-password')?.value || 'password'
    };

    try {
        console.log('Login credentials:', credentials);
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Demo success
        const demoUser = {
            id: 1,
            firstName: 'Demo',
            lastName: 'User',
            email: credentials.email,
            university: 'Demo University',
            studentId: '12345'
        };
        
        localStorage.setItem('token', 'demo-token-' + Date.now());
        localStorage.setItem('user', JSON.stringify(demoUser));
        currentUser = demoUser;
        
        // Update UI and redirect to dashboard
        updateUI();
        showSection('dashboard');
        
    } catch (error) {
        console.error('Login error:', error);
        document.getElementById('login-error').textContent = 'Login failed. Please try again.';
    }
}

function logout() {
    console.log('Logging out');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    currentUser = null;
    updateUI();
    showSection('home');
}

// Update UI based on auth state
function updateUI() {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    console.log('Updating UI - Token exists:', !!token, 'User data:', !!userData);
    
    if (token && userData) {
        try {
            currentUser = JSON.parse(userData);
            
            // Update navigation buttons
            document.getElementById('login-btn').style.display = 'none';
            document.getElementById('signup-btn').style.display = 'none';
            document.getElementById('logout-btn').style.display = 'block';
            document.getElementById('dashboard-link').style.display = 'block';
            document.getElementById('advisor-link').style.display = 'block';
            document.getElementById('quotes-link').style.display = 'block';
            
            // Update user name in dashboard
            const userNameElement = document.getElementById('user-name');
            if (userNameElement && currentUser.firstName) {
                userNameElement.textContent = currentUser.firstName;
            }
            
            console.log('User is logged in:', currentUser);
            
        } catch (error) {
            console.error('Error parsing user data:', error);
            // Clear invalid data
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            currentUser = null;
        }
    } else {
        // User is not logged in
        document.getElementById('login-btn').style.display = 'block';
        document.getElementById('signup-btn').style.display = 'block';
        document.getElementById('logout-btn').style.display = 'none';
        document.getElementById('dashboard-link').style.display = 'none';
        document.getElementById('advisor-link').style.display = 'none';
        document.getElementById('quotes-link').style.display = 'none';
        currentUser = null;
        console.log('User is not logged in');
    }
}

// Load dashboard data
function loadDashboardData() {
    loadMoodHistory();
    loadDailyQuote();
    loadLastAssessment();
    loadAdvisorStatus();
}

// Mood tracking
function trackMood(element) {
    const token = localStorage.getItem('token');
    if (!token) {
        showSection('login');
        return;
    }

    const mood = element.getAttribute('data-mood');
    
    try {
        // Visual feedback
        document.querySelectorAll('.mood-option').forEach(opt => {
            opt.classList.remove('selected');
        });
        element.classList.add('selected');

        // For demo - store mood in localStorage
        const moodEntry = {
            mood: mood,
            date: new Date().toISOString(),
            emoji: getMoodEmoji(mood)
        };
        
        let moodHistory = JSON.parse(localStorage.getItem('moodHistory') || '[]');
        moodHistory.unshift(moodEntry);
        localStorage.setItem('moodHistory', JSON.stringify(moodHistory));
        
        loadMoodHistory();
        
        // Show success message
        alert('Mood tracked successfully!');
        
    } catch (error) {
        console.error('Failed to track mood:', error);
        alert('Failed to track mood. Please try again.');
    }
}

// Load mood history
function loadMoodHistory() {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
        // For demo - load from localStorage
        const moodHistory = JSON.parse(localStorage.getItem('moodHistory') || '[]');
        const historyDiv = document.getElementById('mood-history');
        
        if (moodHistory.length > 0) {
            const lastEntry = moodHistory[0];
            historyDiv.innerHTML = `
                <p><strong>Last mood:</strong> ${lastEntry.emoji} ${lastEntry.mood.replace('_', ' ')}</p>
                <small>${new Date(lastEntry.date).toLocaleDateString()}</small>
                ${moodHistory.length > 1 ? `<p><small>Total entries: ${moodHistory.length}</small></p>` : ''}
            `;
        } else {
            historyDiv.innerHTML = '<p>Track your first mood to see your history here!</p>';
        }
    } catch (error) {
        console.error('Failed to load mood history:', error);
    }
}

function getMoodEmoji(mood) {
    const emojis = {
        'very_sad': '😢',
        'sad': '😔',
        'neutral': '😐',
        'happy': '😊',
        'very_happy': '😄'
    };
    return emojis[mood] || '😐';
}

// Load daily quote
function loadDailyQuote() {
    const today = new Date().toDateString();
    const storedQuote = localStorage.getItem('dailyQuote');
    const storedDate = localStorage.getItem('dailyQuoteDate');
    
    let quote;
    
    if (storedQuote && storedDate === today) {
        quote = JSON.parse(storedQuote);
    } else {
        // Get random quote
        const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
        quote = motivationalQuotes[randomIndex];
        localStorage.setItem('dailyQuote', JSON.stringify(quote));
        localStorage.setItem('dailyQuoteDate', today);
    }
    
    // Update dashboard preview
    const quotePreview = document.getElementById('daily-quote-preview');
    if (quotePreview) {
        document.getElementById('quote-text').textContent = `"${quote.text}"`;
        document.getElementById('quote-author').textContent = `- ${quote.author}`;
    }
    
    // Update quotes page
    const dailyQuoteElement = document.getElementById('daily-quote');
    const dailyAuthorElement = document.getElementById('daily-author');
    if (dailyQuoteElement && dailyAuthorElement) {
        dailyQuoteElement.textContent = `"${quote.text}"`;
        dailyAuthorElement.textContent = `- ${quote.author}`;
    }
}

// Assessment functions
function startAssessment() {
    const token = localStorage.getItem('token');
    if (!token) {
        showSection('login');
        return;
    }

    currentAssessment.questions = assessmentQuestions;
    currentAssessment.currentQuestion = 0;
    currentAssessment.answers = [];
    
    showQuestion();
    showSection('assessment');
}

function showQuestion() {
    const question = currentAssessment.questions[currentAssessment.currentQuestion];
    const container = document.getElementById('question-container');
    
    container.innerHTML = `
        <div class="question">
            <div class="question-text">${question.text}</div>
            <div class="options">
                ${question.options.map((option, index) => `
                    <div class="option" onclick="selectAnswer(${index})">
                        ${option}
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    // Update selected answer if exists
    const currentAnswer = currentAssessment.answers[currentAssessment.currentQuestion];
    if (currentAnswer !== undefined) {
        container.querySelectorAll('.option')[currentAnswer.answer]?.classList.add('selected');
    }
    
    // Update progress
    const progress = ((currentAssessment.currentQuestion + 1) / currentAssessment.questions.length) * 100;
    document.getElementById('progress-fill').style.width = `${progress}%`;
    document.getElementById('progress-text').textContent = 
        `Question ${currentAssessment.currentQuestion + 1} of ${currentAssessment.questions.length}`;
    
    // Update navigation buttons
    document.getElementById('prev-btn').disabled = currentAssessment.currentQuestion === 0;
    document.getElementById('next-btn').textContent = 
        currentAssessment.currentQuestion === currentAssessment.questions.length - 1 ? 
        'Finish' : 'Next';
}

function selectAnswer(answerIndex) {
    // Remove selected class from all options
    document.querySelectorAll('.option').forEach(opt => {
        opt.classList.remove('selected');
    });
    
    // Add selected class to clicked option
    event.target.classList.add('selected');
    
    // Store answer
    currentAssessment.answers[currentAssessment.currentQuestion] = {
        questionId: currentAssessment.currentQuestion + 1,
        answer: answerIndex
    };
}

function previousQuestion() {
    if (currentAssessment.currentQuestion > 0) {
        currentAssessment.currentQuestion--;
        showQuestion();
    }
}

function nextQuestion() {
    if (currentAssessment.answers[currentAssessment.currentQuestion] === undefined) {
        alert('Please select an answer before continuing.');
        return;
    }
    
    if (currentAssessment.currentQuestion < currentAssessment.questions.length - 1) {
        currentAssessment.currentQuestion++;
        showQuestion();
    } else {
        submitAssessment();
    }
}

function submitAssessment() {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
        // Calculate score (0-3 for each question, total 0-30)
        let totalScore = 0;
        currentAssessment.answers.forEach(answer => {
            totalScore += answer.answer; // 0-3 points per question
        });
        
        // Determine severity
        let severity, recommendations;
        if (totalScore <= 4) {
            severity = "Minimal depression";
            recommendations = [
                "Continue maintaining your current wellness practices",
                "Regular exercise and social connection are beneficial",
                "Consider periodic self-check-ins"
            ];
        } else if (totalScore <= 9) {
            severity = "Mild depression";
            recommendations = [
                "Practice regular self-care activities",
                "Consider talking to a counselor or therapist",
                "Maintain social connections and physical activity",
                "Monitor your mood regularly"
            ];
        } else if (totalScore <= 14) {
            severity = "Moderate depression";
            recommendations = [
                "Schedule an appointment with a mental health professional",
                "Consider therapy or counseling",
                "Practice daily mindfulness and self-care",
                "Reach out to trusted friends or family",
                "Consider joining a support group"
            ];
        } else if (totalScore <= 19) {
            severity = "Moderately severe depression";
            recommendations = [
                "Seek professional help immediately",
                "Consider medication evaluation with a psychiatrist",
                "Regular therapy sessions recommended",
                "Develop a safety plan with your therapist",
                "Engage in structured daily activities"
            ];
        } else {
            severity = "Severe depression";
            recommendations = [
                "Urgent professional intervention needed",
                "Contact a mental health professional immediately",
                "Consider crisis resources if having suicidal thoughts",
                "Regular monitoring and treatment essential",
                "Build a strong support network"
            ];
        }
        
        const assessmentResult = {
            totalScore: totalScore,
            severity: severity,
            recommendations: recommendations,
            date: new Date().toISOString()
        };
        
        // Store result
        localStorage.setItem('lastAssessment', JSON.stringify(assessmentResult));
        
        showResults(assessmentResult);
        
    } catch (error) {
        console.error('Failed to submit assessment:', error);
        alert('Failed to submit assessment. Please try again.');
    }
}

function showResults(assessment) {
    const resultsDiv = document.getElementById('results-content');
    
    let severityClass = 'severity-low';
    if (assessment.totalScore > 14) severityClass = 'severity-high';
    else if (assessment.totalScore > 9) severityClass = 'severity-moderate';
    
    resultsDiv.innerHTML = `
        <div class="results-card">
            <h3>Assessment Complete!</h3>
            <div class="severity-indicator ${severityClass}">${assessment.severity}</div>
            <p><strong>Score:</strong> ${assessment.totalScore}/30</p>
            <p><strong>Date:</strong> ${new Date(assessment.date).toLocaleDateString()}</p>
            <div style="margin: 1.5rem 0;">
                <h4>Recommendations:</h4>
                <ul>
                    ${assessment.recommendations.map(rec => `<li>${rec}</li>`).join('')}
                </ul>
            </div>
            <p style="color: var(--text-secondary); font-size: 0.9rem;">
                <strong>Disclaimer:</strong> This assessment is for informational purposes only and is not a substitute for professional medical advice. 
                If you're experiencing severe symptoms, please seek professional help immediately.
            </p>
        </div>
    `;
    
    showSection('results');
}

function loadLastAssessment() {
    const lastAssessment = JSON.parse(localStorage.getItem('lastAssessment') || 'null');
    const lastAssessmentDiv = document.getElementById('last-assessment');
    
    if (lastAssessment) {
        let severityClass = 'severity-low';
        if (lastAssessment.totalScore > 14) severityClass = 'severity-high';
        else if (lastAssessment.totalScore > 9) severityClass = 'severity-moderate';
        
        lastAssessmentDiv.innerHTML = `
            <p><strong>Last Assessment:</strong> ${lastAssessment.severity}</p>
            <p><small>Score: ${lastAssessment.totalScore}/30 - ${new Date(lastAssessment.date).toLocaleDateString()}</small></p>
        `;
    } else {
        lastAssessmentDiv.innerHTML = '<p><small>No previous assessments</small></p>';
    }
}

// Advisor booking functions
function bookAdvisor(advisorName) {
    document.getElementById('selected-advisor').textContent = advisorName;
    document.getElementById('booking-form').style.display = 'block';
    
    // Set minimum date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const minDate = tomorrow.toISOString().split('T')[0];
    document.getElementById('booking-date').min = minDate + 'T09:00';
}

function cancelBooking() {
    document.getElementById('booking-form').style.display = 'none';
    document.getElementById('booking-date').value = '';
    document.getElementById('booking-notes').value = '';
}

function confirmBooking(event) {
    event.preventDefault();
    
    const advisorName = document.getElementById('selected-advisor').textContent;
    const dateTime = document.getElementById('booking-date').value;
    const notes = document.getElementById('booking-notes').value;
    
    const appointment = {
        advisor: advisorName,
        date: dateTime,
        notes: notes,
        created: new Date().toISOString()
    };
    
    // Store appointment
    let appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    appointments.push(appointment);
    localStorage.setItem('appointments', JSON.stringify(appointments));
    
    // Reset form
    cancelBooking();
    
    // Reload appointments
    loadAppointments();
    
    alert('Appointment booked successfully!');
}

function loadAppointments() {
    const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    const appointmentsList = document.getElementById('appointments-list');
    const advisorStatus = document.getElementById('advisor-status');
    
    if (appointments.length > 0) {
        // Sort by date
        appointments.sort((a, b) => new Date(a.date) - new Date(b.date));
        
        // Display in appointments list
        appointmentsList.innerHTML = appointments.map(appointment => `
            <div class="appointment-item">
                <div class="appointment-header">
                    <span class="appointment-advisor">${appointment.advisor}</span>
                    <span class="appointment-date">${new Date(appointment.date).toLocaleString()}</span>
                </div>
                ${appointment.notes ? `<p class="appointment-notes">${appointment.notes}</p>` : ''}
            </div>
        `).join('');
        
        // Update advisor status in dashboard
        const nextAppointment = appointments[0];
        advisorStatus.innerHTML = `
            <p><strong>Next appointment:</strong> ${nextAppointment.advisor}</p>
            <p><small>${new Date(nextAppointment.date).toLocaleString()}</small></p>
        `;
    } else {
        appointmentsList.innerHTML = '<p>No upcoming appointments</p>';
        advisorStatus.innerHTML = '<p>No upcoming appointments</p>';
    }
}

function loadAdvisorStatus() {
    loadAppointments(); // This updates both the advisor page and dashboard status
}

// Crisis resources
function loadCrisisResources() {
    const contactsDiv = document.getElementById('crisis-contacts');
    contactsDiv.innerHTML = crisisResources.map(contact => `
        <div class="contact-item">
            <div>
                <div class="contact-name">${contact.name}</div>
                <div style="color: var(--text-secondary); font-size: 0.9rem;">${contact.description}</div>
            </div>
            <div class="contact-phone">${contact.phone}</div>
        </div>
    `).join('');
}

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    console.log('MindEase app initialized');
    
    // Load theme
    loadTheme();
    
    // Update UI based on auth state
    updateUI();
    
    // Load crisis resources
    loadCrisisResources();
    
    // Load daily quote
    loadDailyQuote();
    
    // Check if user is logged in and show appropriate section
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
        console.log('User is logged in, showing dashboard');
        showSection('dashboard');
    } else {
        console.log('User is not logged in, showing home');
        showSection('home');
    }
    
    // Add debug event listeners
    document.addEventListener('click', function(e) {
        if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A') {
            console.log('Clicked:', e.target.textContent, e.target);
        }
    });
});

// Utility function to format dates
function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}
