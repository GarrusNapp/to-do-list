/* We write whole logic of project here */

document.addEventListener("DOMContentLoaded", function() {
  //Example localStorage data
  var tasks = [
    {
      id: 1,
      title: "Make app done",
      date: "2017-11-01",
      priority: 5,
      description: "This is a test task",
      done: false
    },
    {
      id: 2,
      title: "Test app ",
      date: "2017-11-30",
      priority: 1,
      description: "",
      done: false
    }
  ];

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

  // Date conversion from yyyy-mm-dd to dd-mm-yyyy

    function convertDate(date) { //input needs to be a string (not a problem considering html date input returns a sting)
        var dateArray = [];
        var dateYear = date.slice(0, 4);
        var dateMonth = date.slice(5, 7);
        var dateDay = date.slice(8, 10);
        dateArray.push(dateDay, dateMonth, dateYear);
        return dateArray.join('.');
    }

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
  }

  function createTask(obj) {
    //New task
    var newTask = document.createElement("li");
    newTask.classList.add("task");

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
    setDoneButton.innerText = "Done";

    var editButton = document.createElement("button");
    editButton.classList.add("editButton");
    editButton.innerText = "Edit";

    var deleteButton = document.createElement("button");
    deleteButton.classList.add("deletebutton");
    deleteButton.innerText = "Delete";

    //Set values
    name.innerText = obj.title;
    priority.innerHTML = Array(obj.priority + 1).join(
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
    actionButtons.appendChild(editButton);
    actionButtons.appendChild(deleteButton);
    newTask.appendChild(taskContent);
    newTask.appendChild(actionButtons);
    list.appendChild(newTask);
  }

  function populateList() {
    tasks.forEach(function(task) {
      createTask(task);
    });
  }

  confirmButton.addEventListener("click", addNewTask);
  populateList();
});
