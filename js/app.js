/* We write whole logic of project here */

document.addEventListener("DOMContentLoaded", function() {

    var tasks = [];

    //Send data with set name and content
    function sendData(name, content) {
        localStorage.setItem(name, JSON.stringify( content ) );
    }
    //Download data with set name
    function downloadData(name) {
        return JSON.parse( localStorage.getItem(name) );
    }
    // Date conversion from yyyy-mm-dd to dd-mm-yyyy
    function convertDate(date) { //input needs to be a string (not a problem considering html date input returns a sting)
        var dateArray = [];
        var dateYear = date.slice(0, 4);
        var dateMonth = date.slice(5, 7);
        var dateDay = date.slice(8, 10);
        dateArray.push(dateDay, dateMonth, dateYear);
        return dateArray.join('.');

    }

    tasks = downloadData('toDoList');

    //If tasks are empty we need to check if the user is new or old and deleted his tasks
    if(tasks == null){
        if(!(downloadData('oldUser'))){
            let firstTasks = [
                {
                    id: 1,
                    title: "This is exmaple task, try to do new one yourself",
                    date: "2018-11-01",
                    priority: 5,
                    description: "This is a place where description will show up",
                    done: false
                },
                {
                    id: 2,
                    title: "This is how task looks like, when u set it done",
                    date: "2017-11-30",
                    priority: 1,
                    description: "There is my description",
                    done: true
                }
            ];
            sendData('oldUser', 1);
            sendData('toDoList', firstTasks);
            tasks = downloadData('toDoList');
        }
    }

    //Sorting functions
    function sortFromHighestPriority(){
        console.log(tasks);
        tasks.sort(function (a,b) {
            return  b.priority - a.priority;
        });
        console.log(tasks);

        populateList();
    }

    function sortFromLowestPriority(){
        console.log(tasks);
        tasks.sort(function (a,b) {
            return  a.priority - b.priority;
        });
        console.log(tasks);

        populateList();
    }

    function sortFromOldest() {
        console.log(tasks);
        tasks.sort(function (a, b) {
            return new Date(a.date) - new Date(b.date);
        });
        console.log(tasks);

        populateList();
    }

    function sortFromFurthest() {
        console.log(tasks);
        tasks.sort(function (a, b) {
            return  new Date(b.date) - new Date(a.date);
        });
        console.log(tasks);

        populateList();
    }

    function sortByDone(){
        let items = tasks;
        let doneArray = [];
        tasks.forEach(function (item) {
            if(item.done){
                doneArray.push(item);
            }
        });

        tasks = doneArray;
        populateList();
        tasks = items;
    }

    function sortByUndone(){
        let items = tasks;
        let undoneArray = [];
        tasks.forEach(function (item) {
            if(!item.done){
                undoneArray.push(item);
            }
        });

        tasks = undoneArray;
        populateList();
        tasks = items;
    }

    //Functions for add task and filter buttons

    function showForm() {
      document.getElementsByClassName("createTask")[0].classList.remove("invisible");
    }

    function toggleFilters() {
      document.getElementsByClassName("filters")[0].classList.toggle("invisible");
    }

    //Date implementation
    var date = new Date(),
        day = date.getDate(),
        month = date.getMonth(),
        year = date.getFullYear(),
        monthNames = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ],
        dateDisplay = document.querySelector(".date");

    dateDisplay.innerText = day + " " + monthNames[month] + " " + year;

    //Create new tasks

    var list = document.querySelector("ul");
    var confirmButton = document.getElementById("confirmButton");

    function addNewTask(event) {
        event.preventDefault();

        var nameInput = document.getElementById("taskName");
        var setPriorityInput = document.getElementById("setPriority");
        var taskDeadlineInput = document.getElementById("taskDeadline");
        var taskDescriptionInput = document.getElementById("taskDescription");

        var newTask = {
            id: tasks.length + 1,
            title: nameInput.value,
            date: taskDeadlineInput.value,
            priority: setPriorityInput.value,
            description: taskDescriptionInput.value,
            done: false
        };

        tasks.push(newTask);
        sendData('toDoList', tasks);
        populateList();
    }

    function createTask(obj) {
        //New task
        var newTask = document.createElement("li");
        newTask.classList.add("task");
        if(obj.done){
            newTask.classList.add("done");
        }

        //Task contents
        var taskContent = document.createElement("div");
        taskContent.classList.add("taskContent");

        //Task name and priority
        var namePriorityDiv = document.createElement("div");
        var name = document.createElement("p");
        name.classList.add("name");
        var priority = document.createElement("p");
        priority.classList.add("priority");

        //Task deadline and description
        var deadline = document.createElement("p");
        deadline.classList.add("deadline");
        var description = document.createElement("p");
        description.classList.add("description");

        //Action buttons
        var actionButtons = document.createElement("div");
        actionButtons.classList.add("actionButtons");

        var setDoneButton = document.createElement("button");
        setDoneButton.classList.add("setDoneButton");
        setDoneButton.classList.add("fas", "fa-check-square");
        setDoneButton.innerText = "Done";

        var deleteButton = document.createElement("button");
        deleteButton.classList.add("deleteButton");
        deleteButton.classList.add("fas", "fa-trash");
        deleteButton.innerText = "Delete";

        //Set values
        name.innerText = obj.title;
        priority.innerHTML = Array( parseInt(obj.priority) + 1).join(
            '<i class="fa fa-star"></i>'
        );
        deadline.innerText = convertDate(obj.date);
        description.innerHTML = obj.description;

        //Put everything together
        namePriorityDiv.appendChild(name);
        namePriorityDiv.appendChild(priority);
        namePriorityDiv.appendChild(deadline);
        taskContent.appendChild(namePriorityDiv);
        taskContent.appendChild(description);
        actionButtons.appendChild(setDoneButton);
        actionButtons.appendChild(deleteButton);
        newTask.appendChild(taskContent);
        newTask.appendChild(actionButtons);
        list.appendChild(newTask);
    }

    //Creates lists of all done and delete buttons, then adds event listeners to them. Needs to be called inside populate list to work consistently.
    function makeButtonsWork() {
        var doneButtons = document.querySelectorAll('.setDoneButton'),
            deleteButtons = document.querySelectorAll('.deleteButton');

        function markTaskAsDone(event) {
            event.target.parentElement.parentElement.classList.toggle('done');
        }

        function deleteTask(event) {
            event.target.parentElement.parentElement.parentElement.removeChild(this.parentElement.parentElement);
        }

        for (var doneButton of doneButtons) {
            doneButton.addEventListener('click', markTaskAsDone);
        }

        for (var deleteButton of deleteButtons) {
            deleteButton.addEventListener('click', deleteTask);
        }
    }

    function populateList() {
        var listOfTasks = document.querySelectorAll('.task');
        for (var task of listOfTasks) {
            task.parentElement.removeChild(task);

        }
        tasks.forEach(function (task) {
            createTask(task);
        });

        makeButtonsWork(); //adds eventListeners to all of the buttons within the created tasks.
    }

    confirmButton.addEventListener("click", addNewTask);
    populateList();


    //Assign sorting functions to proper buttons
    var lowestPriorityButton = document.querySelector('.filters>div:nth-of-type(2) .fa-arrow-alt-circle-down');
    var highestPriorityButton = document.querySelector('.filters>div:nth-of-type(2) .fa-arrow-alt-circle-up');

    lowestPriorityButton.addEventListener('click', sortFromHighestPriority);
    highestPriorityButton.addEventListener('click', sortFromLowestPriority);

    var oldestButton = document.querySelector('.filters>div:nth-of-type(1) .fa-arrow-alt-circle-down');
    var newestButton = document.querySelector('.filters>div:nth-of-type(1) .fa-arrow-alt-circle-up');

    oldestButton.addEventListener('click', sortFromFurthest);
    newestButton.addEventListener('click', sortFromOldest);

    var doneButton = document.querySelector('.filters>div:nth-of-type(3) .fa-check-circle');
    var undoneButton = document.querySelector('.filters>div:nth-of-type(3) .fa-times-circle');

    doneButton.addEventListener('click', sortByDone);
    undoneButton.addEventListener('click', sortByUndone);

    var addTaskButton = document.getElementById("addTask");
    var toggleFiltersButton = document.getElementsByClassName("toggleFilters")[0];

    addTaskButton.addEventListener('click', showForm);
    toggleFiltersButton.addEventListener('click', toggleFilters);

});
