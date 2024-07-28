const themeChangeBtns = document.querySelectorAll('.toggle');
const body = document.getElementById('body');
const todoInput = document.getElementById('create-todo-input');
const taskForm = document.getElementById('input');
const deleteBtn = document.getElementById('delete-btn');
const clearBtn = document.getElementById('btn-clear');
const allFilterBtn = document.getElementById('all');
const activeFilterBtn = document.getElementById('active');
const completedFilterBtn = document.getElementById('completed');
const allFilterBtnMobile = document.getElementById('all-mobile');
const activeFilterBtnMobile = document.getElementById('active-mobile');
const completedFilterBtnMobile = document.getElementById('completed-mobile');
const activeTasksCount = document.getElementById('items-left-number');
const tasksContainer = document.getElementById('tasks-container');

let taskData = JSON.parse(localStorage.getItem("tasks")) || [];
let filteredTaskData = [...taskData];
let currentTask = {};

const addTask = () => {
    // this will be used to check if there are any tasks with the same id - 
    // if there are none it will add if there are matches it will n ot
    const dataArrIndex = taskData.findIndex((item) => item.id === currentTask.id);

    const taskObj = {
        // creates a unique id for each task that is added - the date.now() method will
        // unique numbers from the year 1970 seconds elapsed
        id: `${todoInput.value.toLowerCase().split(" ").join("-")}-${Date.now()}`,
        title: todoInput.value,
        completed: false //adding a completed property - this tracks whether a task has been completed
    };

    // findIndex method will return -1 if there is no match found
    // if there is no match found I want to add using unshift at the beginning of the array
    if (dataArrIndex === -1) {
        taskData.unshift(taskObj)
        activeTasksCount.innerText = taskData.filter(task => !task.completed).length;
    } else {
        taskData[dataArrIndex] = taskObj;
    }

    localStorage.setItem("tasks", JSON.stringify(taskData));
    filteredTaskData = [...taskData];
    updateTasksContainer();
    reset();
}

const updateTasksContainer = () => {
    tasksContainer.innerHTML = "";
    activeTasksCount.innerText = taskData.filter(task => !task.completed).length;

    filteredTaskData.forEach(
        ({id, title, completed}) => {
        (tasksContainer.innerHTML += `
            <div class="item  ${completed ? 'done': ''}" id=${id}>
                <label class="form-control">
                    <input type="checkbox" ${completed ? 'checked' : ''} onclick="toggleCompleted(this)">
                    ${title}
                </label>
                <img class="delete-btn" id="delete-btn" onclick="deleteTask(this)" src="./images/icon-cross.svg" alt="Delete Task">
            </div>
        `)
        }
    );

};

const reset = () => {
    todoInput.value = "";
    currentTask = {};

    if (taskData.length) {
        filteredTaskData = [...taskData];
        updateTasksContainer();
    }
}

const deleteTask = (buttonEl) => {
    const dataArrIndex = taskData.findIndex((item) => item.id === buttonEl.parentElement.id)

    buttonEl.parentElement.remove();
    taskData.splice(dataArrIndex, 1);
    localStorage.setItem("tasks", JSON.stringify(taskData));
    filteredTaskData = [...taskData];
    activeTasksCount.innerText = taskData.filter(task => !task.completed).length;
};


themeChangeBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
    })
})

window.addEventListener('DOMContentLoaded', () => {
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
    
        addTask();
    })

    updateTasksContainer();
})

const toggleCompleted = (todoItem) => {
    const taskId = todoItem.parentElement.parentElement.id;
    const task = taskData.find(task => task.id === taskId);
    task.completed = todoItem.checked;
    localStorage.setItem("tasks", JSON.stringify(taskData)); // Updates local storage
    filteredTaskData = [...taskData];
    updateTasksContainer();
    // todoItem.parentElement.parentElement.classList.toggle('done');
    // console.log('clicked')
}

const updateFilterButtonState = (selectedButton) => {
    const filterButtons = [allFilterBtn, activeFilterBtn, completedFilterBtn];
    filterButtons.forEach(btn => btn.classList.remove('selected'));
    selectedButton.classList.add('selected');
};

clearBtn.addEventListener('click', () => {
    taskData = taskData.filter(task => !task.completed)
    localStorage.setItem("tasks", JSON.stringify(taskData));
    filteredTaskData = [...taskData];
    updateTasksContainer();
});

allFilterBtn.addEventListener('click', () => {
    filteredTaskData = [...taskData];
    updateTasksContainer();
    updateFilterButtonState(allFilterBtn);
});

activeFilterBtn.addEventListener('click', () => {
    filteredTaskData = taskData.filter(task => !task.completed);
    updateTasksContainer();
    updateFilterButtonState(activeFilterBtn);
})

completedFilterBtn.addEventListener('click', () => {
    filteredTaskData = taskData.filter(task => task.completed)
    updateTasksContainer();
    updateFilterButtonState(completedFilterBtn)
})
allFilterBtnMobile.addEventListener('click', () => {
    filteredTaskData = [...taskData];
    updateTasksContainer();
    updateFilterButtonState(allFilterBtnMobile);
});

activeFilterBtnMobile.addEventListener('click', () => {
    filteredTaskData = taskData.filter(task => !task.completed);
    updateTasksContainer();
    updateFilterButtonState(activeFilterBtnMobile);
})

completedFilterBtnMobile.addEventListener('click', () => {
    filteredTaskData = taskData.filter(task => task.completed)
    updateTasksContainer();
    updateFilterButtonState(completedFilterBtnMobile)
})

todoInput.addEventListener('keyup', () => {
    if(todoInput.value === '') {
        todoInput.classList.remove('typing')
    } else {
        todoInput.classList.add('typing')
    }
})