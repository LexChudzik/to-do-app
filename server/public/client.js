$(document).ready(readyNow);

function readyNow() {
    console.log('jQ');
    displayTasks();
    listeners();
}

function listeners() {
    $('#addBtn').on('click', addTask);
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
        let newDiv = $(`<div class="${task.comleted}">
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

function addTask(params) {
    
}