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
        let newDiv = $(`<div class="${task.completed} container card">
            <p class="card-body">${task.name}</p>
            <button class="completeBtn btn btn-success">Complete</button>
            <button class="deleteBtn btn btn-danger">Delete</button>
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
    let taskId = $(this).parent().data('id');
    console.log(taskId);
    $.ajax({
        method: 'PUT',
        url: `/tasks/complete/${taskId}`
      })
      .then( function(response) {
        console.log('task completed');
        displayTasks();
      })
      .catch( function(error) {
        console.log('Error on completeing task', error);
      })
}//end completeTask

function deleteTask() {
    let taskId = $(this).parent().data('id');
    console.log(taskId);
    $.ajax({
        method: 'DELETE',
        url: `/tasks/${taskId}`
      })
      .then(function(response){
        console.log('Deleted task');
        displayTasks(); 
      })
      .catch( function(error) {
        console.log('Error deleteing task:', error);
    })
}//end deleteTask