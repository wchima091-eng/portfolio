/* ==========================================================
   FEATURE 1: HEADING DYNAMIC SWITCHER (IF/ELSE CONDITIONAL)
   ========================================================== */
const mainHeading = document.querySelector('#welcome-heading');
const changeButton = document.querySelector('#update-btn');

function toggleHeadingText() {
    if (mainHeading.textContent === "About Me") {
        mainHeading.textContent = "Welcome to Chima's Engineering Portfolio!";
        mainHeading.style.color = "#4A90E2";
        changeButton.textContent = "Click to Reset Heading";
    } else {
        mainHeading.textContent = "About Me";
        mainHeading.style.color = "navy";
        changeButton.textContent = "Click to Update Heading";
    }
}

changeButton.addEventListener('click', toggleHeadingText);

/* ==========================================================
   FEATURE 2: VISITOR GREETING PROCESSING (FORM VALUES)
   ========================================================== */
const nameInput = document.querySelector('#user-name-input');
const submitButton = document.querySelector('#submit-btn');
const greetingDisplay = document.querySelector('#greeting-display');

function displayPersonalGreeting() {
    const visitorName = nameInput.value;
    
    if (visitorName === "") {
        greetingDisplay.textContent = "Please enter a name first!";
        greetingDisplay.style.color = "red";
    } else {
        greetingDisplay.textContent = "Hello, " + visitorName + "! Welcome to my development portfolio.";
        greetingDisplay.style.color = "green";
        nameInput.value = ""; 
    }
}

submitButton.addEventListener('click', displayPersonalGreeting);
