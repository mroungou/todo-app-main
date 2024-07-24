const themeChangeBtns = document.querySelectorAll('.toggle');
const body = document.getElementById('body');
const todoInput = document.getElementById('create-todo-input');
const taskForm = document.getElementById('input');
const deleteBtn = document.getElementById('delete-btn');
const clearBtn = document.getElementById('btn-clear');
const allFilterBtn = document.getElementById('all');
const activeFilterBtn = document.getElementById('active');
const completedFilterBtn = document.getElementById('completed');
const activeTasksCount = document.getElementById('items-left-number');
const taskItems = document.querySelectorAll('.form-control');
const tasksContainer = document.getElementById('tasks-container');

const taskData = JSON.parse(localStorage.getItem("tasks")) || [];
let currentTask = {};

const addTask = () => {
    // this will be used to check if there are any tasks with the same id - 
    // if there are none it will add if there are matches it will not
    const dataArrIndex = taskData.findIndex((item) => item.id === currentTask.id);

    const taskObj = {
        // creates a unique id for each task that is added - the date.now() method will
        // unique numbers from the year 1970 seconds elapsed
        id: `${todoInput.value.toLowerCase().split(" ").join("-")}-${Date.now()}`,
        title: todoInput.value
    };

    // findIndex method will return -1 if there is no match found
    // if there is no match found I want to add using unshift at the beginning of the array
    if (dataArrIndex === -1) {
        taskData.unshift(taskObj)
        activeTasksCount.innerText = taskData.length;
    } else {
        taskData[dataArrIndex] = taskObj;
    }

    localStorage.setItem("tasks", JSON.stringify(taskData));
    updateTasksContainer();
    reset();
}

const updateTasksContainer = () => {
    tasksContainer.innerHTML = "";

    taskData.forEach(
        ({id, title}) => {
        (tasksContainer.innerHTML += `
            <div class="item" id=${id}>
                <label class="form-control">
                    <input type="checkbox">
                    ${title}
                </label>
                <img class="delete-btn" id="delete-btn" onlick="deleteTask(this)" src="./images/icon-cross.svg" alt="Delete Task">
            </div>
        `)
        }
    );
};

const reset = () => {
    todoInput.value = "";
    currentTask = {};

    if (taskData.length) {
        updateTasksContainer();
    }
}

const deleteTask = (buttonEl) => {
    const dataArrIndex = taskData.findIndex((item) => item.id === buttonEl.parentElement.id)

    buttonEl.parentElement.remove();
    taskData.splice(dataArrIndex, 1);
    localStorage.setItem("tasks", JSON.stringify(taskData));

    console.log('hi')
};


themeChangeBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
    })
})

taskForm.addEventListener('submit', (e) => {
    e.preventDefault();

    addTask();
})

taskItems.forEach((item) => {
    item.addEventListener('click', () => {
        item.parentElement.parentElement.classList.toggle('done');
    })
})


