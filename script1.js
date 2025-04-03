const conversationStarters = [
    "What is one thing you've always wanted to tell me but never have?",
    "When was the last time you felt truly loved by me?",
    "What is your biggest fear about our relationship?",
    "How do you feel about the way we handle conflicts?",
    "What do you think is the strongest part of our relationship?",
    "How have I helped you grow as a person?",
    "What personal goals do you want to accomplish in the next 5 years?",
    "If you could change one thing about your past, what would it be?",
    "What is something you've always wanted to do together but haven't yet?",
    "If money and time weren't an issue, what would our dream life look like?",
    "How do you feel most loved? (Words, touch, time, gifts, or actions?)",
    "What is one thing I do that makes you feel incredibly special?",
    "What does love mean to you, and how do you show it?",
    "What's a small, everyday thing I could do to make you feel more loved?",
    "What is your happiest memory with me?",
    "What was your first impression of me? Has it changed?",
    "What do you remember most about our first date?",
    "If we could relive one moment together, what would it be?",
    "Where do you see our relationship in 10 years?",
    "What's something you want to experience together before we grow old?",
    "Have you ever been heartbroken? How did it shape you?",
    "Is there anything you're scared to tell me?",
    "What do you think we could improve in our relationship?",
    "When do you feel most vulnerable, and how can I support you?",
    "Do you believe in soulmates? Why or why not?",
    "What makes you feel most attracted to me?",
    "What's one thing I do that turns you on the most?",
    "How do you define intimacy beyond physical touch?",
    "What's your favorite way to be kissed or held?",
    "What's a fantasy or desire you've never shared with me?"
];

// Keep track of recently shown questions
let recentQuestions = [];
const MAX_RECENT_QUESTIONS = 5;

function getRandomQuestions(count) {
    // Filter out recent questions
    const availableQuestions = conversationStarters.filter(
        question => !recentQuestions.includes(question)
    );
    
    // If we don't have enough available questions, clear some from recent
    if (availableQuestions.length < count) {
        recentQuestions = recentQuestions.slice(-(MAX_RECENT_QUESTIONS - count));
        return getRandomQuestions(count);
    }
    
    // Shuffle available questions
    const shuffled = [...availableQuestions].sort(() => 0.5 - Math.random());
    const selectedQuestions = shuffled.slice(0, count);
    
    // Update recent questions
    recentQuestions = [...recentQuestions, ...selectedQuestions].slice(-MAX_RECENT_QUESTIONS);
    
    return selectedQuestions;
}

function updateButtonText() {
    const buttons = document.querySelectorAll('.question-btn');
    const randomQuestions = getRandomQuestions(2);
    
    buttons[0].textContent = randomQuestions[0];
    buttons[1].textContent = randomQuestions[1];
}

function handleQuestion1() {
    const question = document.querySelector('.question-btn:first-child').textContent;
    console.log('Selected question:', question);
    // Show new random questions after a short delay
    setTimeout(updateButtonText, 500);
}

function handleQuestion2() {
    const question = document.querySelector('.question-btn:last-child').textContent;
    console.log('Selected question:', question);
    // Show new random questions after a short delay
    setTimeout(updateButtonText, 500);
}

// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Check for saved theme preference or use system preference
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (prefersDarkScheme.matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
    }
}

// Toggle theme
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// Event listeners
themeToggle.addEventListener('click', toggleTheme);
prefersDarkScheme.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
    }
});

// Initialize theme and questions when the page loads
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    updateButtonText();
});
