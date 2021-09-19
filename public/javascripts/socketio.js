
// new shit


const questionForm = document.getElementById('questionForm')
const socket = io()



// listen to chat form submission
questionForm.addEventListener('submit', event => {
    // prevent form from submitting
    event.preventDefault()
    // where event.target.elements.question.value is the actual text
    console.log(event.target.elements.questionField.value)
    socket.emit('question', { text: event.target.elements.questionField.value })
    clearAndRefocus(event.target.elements.questionField)
})



function displayQuestion(question) {
    const questions = document.querySelector('.questions')
    const newQuestion = document.createElement('div')
    newQuestion.id = 'question';
    newQuestion.classList.add('question')
    newQuestion.classList.add('slowfade-in')
    newQuestion.classList.add('d-flex')
    newQuestion.classList.add('flex-column')
    newQuestion.classList.add('justify-content-center')
    newQuestion.classList.add('align-items-center')
    let y = 6 * Math.random();
    let x = 60 * Math.random();
    newQuestion.style.top = y + "rem";
    newQuestion.style.left = x + "rem";

    const params = new URLSearchParams(window.location.search)

    newQuestion.innerHTML =
        `
                        <div class="question-text">
                            jj
                        </div>
                        <div class="row mb-2">

                            <button class="col btn btn-primary">like</button>
                            <% if (name) { %>
                                <button class="col btn btn-secondary">pop</button>
                                <% } %>
                        </div>
                        
                        `

    questions.appendChild(newQuestion)
    console.log('end of displayquestion')
    console.log(questions)
    console.log(newQuestion)
}

socket.on('question', question => {
    displayQuestion(question)
})

function clearAndRefocus(field) {
    field.value = '';
    field.focus()
}