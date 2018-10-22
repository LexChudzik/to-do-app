$(document).ready(readyNow);

function readyNow() {
    console.log('jQ');
    displayTasks();
    listeners();
}

function listeners() {
    $('#addBtn').on('click', addTask);
    $('#tasksDisplay').on('click', '.completeBtn', completeTask);
    $('#tasksDisplay').on('click', '.deleteBtn', deleteTask);
}

//display tasks on DOM
function displayTasks() {
    $('#tasksDisplay').empty();
    $.ajax({
        method: 'GET',
        url: '/tasks'
}).then(function(response){
    console.log(response);
    for (const task of response) {
        let newDiv = $(`<div class="${task.completed}">
            <p>${task.name}</p>
            <button class="completeBtn">Complete</button>
            <button class="deleteBtn">Delete</button>
        </div>`)
        $('#tasksDisplay').append(newDiv)
        newDiv.data('id', task.id);
    }//end for loop
}).catch(function (error) {
    console.log('Error displaying tasks:', error);
})
}//end displayTasks

//add task to db
function addTask(event) {
    event.preventDefault();
    let newTask = $("#taskIn").val();
    console.log(newTask);
    $.ajax({
        method: 'POST',
        url: '/tasks',
        data: {
            name: newTask
        }
    }).then(function(response){
        //refresh tasks
        displayTasks();
        // Clear input field
        $('#taskIn').val('');
    }).catch(function(error){
        alert(`Error adding task`, error);
})
}//end addTask

//set task as complete
function completeTask() {
    displayTasks();
}//end completeTask

function deleteTask() {
    displayTasks(); 
}//end deleteTask