
// DOM ELEMENTS
let taskInput = document.querySelector("#task");
let btn = document.querySelector("#addBtn");
let list = document.querySelector(".list");
let template = document.querySelector("#taskTemplate");


// ADD NEW TASK
btn.addEventListener("click", function () {
    const taskText = taskInput.value.trim();

    if (taskText == "") return;

    let taskNode = template.content.cloneNode(true);

    taskNode.querySelector(".text").innerText = taskText;


    // Task actions: complete, delete, edit
    taskNode.querySelector(".complete").addEventListener("click", (e) => {
        e.target.closest(".task").classList.toggle("completed");
        saveTask();
    });

    taskNode.querySelector(".delete").addEventListener("click", (e) => {
        e.target.closest(".task").remove();
        saveTask();
    });

    taskNode.querySelector(".edit").addEventListener("click", (e) => {
        const span = e.target.closest(".task").querySelector(".text");
        const newText = prompt("Edit task", span.innerText);
        if (newText && newText.trim() != "") {
            span.innerText = newText;
            saveTask();
        }
    });

    list.appendChild(taskNode);
    saveTask();
    taskInput.value = "";
});


// SAVE TASKS TO LOCAL STORAGE
function saveTask() {
    const tasks = [];

    document.querySelectorAll(".task").forEach(task => {
        tasks.push({
            text: task.querySelector(".text").innerText,
            completed: task.classList.contains("completed")
        });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}


// LOAD SAVED TASKS ON PAGE LOAD
const savedTasks = JSON.parse(localStorage.getItem("tasks"));

if (savedTasks) {
    savedTasks.forEach(task => {
        const taskNode = template.content.cloneNode(true);

        taskNode.querySelector(".text").innerText = task.text;

        if (task.completed) {
            taskNode.querySelector(".task").classList.add("completed");
        }

        taskNode.querySelector(".complete").addEventListener("click", (e) => {
            e.target.closest(".task").classList.toggle("completed");
            saveTask();
        });

        taskNode.querySelector(".delete").addEventListener("click", (e) => {
            e.target.closest(".task").remove();
            saveTask();
        });

        taskNode.querySelector(".edit").addEventListener("click", (e) => {
            const span = e.target.closest(".task").querySelector(".text");
            const newText = prompt("Edit task", span.innerText);
            if (newText && newText.trim() != "") {
                span.innerText = newText;
                saveTask();
            }
        });

        list.appendChild(taskNode);
    });
}

// UPDATE CURRENT DATE
function upDate() {
    let current = new Date();

    document.getElementById("date").innerText = current.toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });
}

// Update date every 1 hour
setInterval(upDate, 3600000);
upDate();