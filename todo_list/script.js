const input = document.querySelector('#input-field')
const add = document.querySelector('#btn')
const taskArea = document.querySelector('#tasks')

let taskArray = []

// store task in the local storage
function storeInLocalStorage() {
    localStorage.setItem(
        'task:',
        JSON.stringify(taskArray)
    )
}

// delete task from the array
function deleteTask(id) {
    taskArray = taskArray.filter(
        task => task.id !== id
    )

    storeInLocalStorage()
}

// rendering task 
function renderTask(task) {
    const li = document.createElement('li')

    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.checked = task.completed

    const span = document.createElement('span')
    span.textContent = task.text

    if (task.completed) {
        span.style.textDecoration = 'line-through'
        span.style.opacity = '0.6'
    }

    const editBtn = document.createElement('button')
    editBtn.classList.add('edit-btn')
    editBtn.innerHTML =
        '<img src="edit.png" alt="Edit">'

    const trash = document.createElement('button')
    trash.classList.add('delete-btn')
    trash.innerHTML =
        '<img src="delete.png" alt="Delete">'

    li.appendChild(checkbox)
    li.appendChild(span)
    li.appendChild(editBtn)
    li.appendChild(trash)

    taskArea.appendChild(li)

    checkbox.addEventListener('change', function () {
        task.completed = checkbox.checked
        if (task.completed) {
            span.style.textDecoration =
                'line-through'
            span.style.opacity = '0.6'
        }
        else {
            span.style.textDecoration = 'none'
            span.style.opacity = '1'
        }
        storeInLocalStorage()
    })

    editBtn.addEventListener('click', function () {
        const newText = prompt(
            'Edit Task',
            task.text
        )
        if (newText === null) {
            return
        }
        if (newText.trim() === '') {
            alert('Task cannot be empty')
            return
        }
        task.text = newText.trim()
        span.textContent = task.text
        storeInLocalStorage()
    })

    trash.addEventListener('click', function () {
        deleteTask(task.id)
        li.remove()
    })
}

// action to be perform when "ADD" button clicked
function buttonClick() {
    const userInput = input.value.trim()
    if (userInput === '') {
        alert('Please provide the tasks.')
        return
    }
    const task = {
        id: Date.now(),
        text: userInput,
        completed: false
    }
    taskArray.push(task)
    storeInLocalStorage()
    renderTask(task)
    input.value = ''
}

// add events
add.addEventListener('click', buttonClick)

input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        buttonClick()
    }
})

// updating the page from local storage after refresh
const savedTasks =
    JSON.parse(localStorage.getItem('task:'))
if (savedTasks) {
    taskArray = savedTasks
    taskArray.forEach(task => {
        renderTask(task)
    })
}