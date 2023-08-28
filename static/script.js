const indentSpace = 4
const randId = (min, max) => Math.floor(Math.random() * (max-min)) + min

function getAllTasks() {
    fetch("/tasks")
        .then(res => res.json())
        .then(data => {
            document.getElementById("outputArea").textContent = JSON.stringify(data, null, indentSpace);
        })
        .catch(err => {
            document.getElementById("outputArea").textContent = "An error occurred. \n" + err;
        })
}

function getTaskById() {
    const taskId = document.getElementById("taskId").value;
    if (taskId) {
        fetch(`/tasks/${taskId}`)
            .then(res => res.json())
            .then(data => {
                document.getElementById("outputArea").textContent = JSON.stringify(data, null, indentSpace);
            })
            .catch(err => {
                document.getElementById("outputArea").textContent = "An error occurred. \n" + err;
            });
    }
}

function createTask() {
    const newTask = {
        task_id: randId(5, 1000),
        title: document.getElementById("newTaskTitle").value,
        description: document.getElementById("newTaskDescription").value
    };

    fetch("/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask)
    })
        .then(res => res.json())
        .then(data => {
            document.getElementById("outputArea").textContent = JSON.stringify(data, null, indentSpace);
        })
        .catch(err => {
            document.getElementById("outputArea").textContent = "An error occurred. \n" + err;
        });
}

function deleteTaskByID() {
    const taskId = document.getElementById("deleteTaskID").value
    if (taskId) {
        fetch(`/tasks/${taskId}`, {method: 'DELETE'})
            .then(res => res.json())
            .then(data => {
                document.getElementById("outputArea").textContent = JSON.stringify(data, null, indentSpace)
            })
            .catch(err => {
                document.getElementById("outputArea").textContent = "An error occurred. \n" + err;
            });
    }
}