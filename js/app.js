/* We write whole logic of project here */


document.addEventListener('DOMContentLoaded', function () {

    //Date implementation
    var date = new Date(),
        day = date.getDate(),
        month = date.getMonth(),
        year = date.getFullYear(),
        monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ],
        dateDisplay = document.querySelector('.date');

    dateDisplay.innerText = day + ' ' + monthNames[month] + ' ' + year;


    //Create new tasks

    var list = document.querySelector('ul');
    var nameInput = document.querySelector('#taskName');
    var setPriorityInput = document.getElementById('setPriority');
    var taskDeadlineInput = document.getElementById('taskDeadline');
    var taskDescriptionInput = document.getElementById('taskDescription');
    var confirmButton = document.getElementById('confirmButton');

    function setTaskPriority(element) {
        for (var i = 0; i < setPriorityInput.value; i++) {
            element.innerHTML += '<i class="fa fa-star"></i>';
        }
    }

    function addNewTask(event) {

        event.preventDefault();

        //New task
        var newTask = document.createElement('li');
        newTask.classList.add('task');

        //Task contents
        var taskContent = document.createElement('div');
        taskContent.classList.add('taskContent');

        //Task name and priority
        var namePriorityDiv = document.createElement('div');
        var name = document.createElement('p');
        name.classList.add('name');
        var priority = document.createElement('p');
        priority.classList.add('priority');

        //Task deadline and description
        var deadline = document.createElement('p');
        deadline.classList.add('deadline');
        var description = document.createElement('p');
        description.classList.add('description');

        //Action buttons
        var actionButtons = document.createElement('div');
        actionButtons.classList.add('actionButtons');

        var setDoneButton = document.createElement('button');
        setDoneButton.classList.add('setDoneButton');
        setDoneButton.innerText = 'Done';

        var editButton = document.createElement('button');
        editButton.classList.add('editButton');
        editButton.innerText = 'Edit';

        var deleteButton = document.createElement('button');
        deleteButton.classList.add('deletebutton');
        deleteButton.innerText = 'Delete';

        //Set values
        name.innerText = nameInput.value;
        setTaskPriority(priority);
        deadline.innerText = taskDeadlineInput.value;
        description.innerHTML = taskDescriptionInput.value;

        //Put everything together
        namePriorityDiv.appendChild(name);
        namePriorityDiv.appendChild(priority);
        namePriorityDiv.appendChild(deadline);
        taskContent.appendChild(namePriorityDiv);
        taskContent.appendChild(description);
        actionButtons.appendChild(setDoneButton);
        actionButtons.appendChild(editButton);
        actionButtons.appendChild(deleteButton);
        newTask.appendChild(taskContent);
        newTask.appendChild(actionButtons);
        list.appendChild(newTask);

    }
    confirmButton.addEventListener('click', addNewTask);
});
