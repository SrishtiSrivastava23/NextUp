let tasks = [];

const addTask = () => {
    const taskInput = document.getElementById('taskInput');
    const text = taskInput.value.trim();

    if (text) {
        tasks.push({ text: text, completed: false });
        taskInput.value = "";
        updateTasksList();
        updateStats();
    }
};

const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTasksList();
    updateStats();
};

const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTasksList();
    updateStats();
};

const editTask = (index) => {
    const newText = prompt("Edit task:", tasks[index].text);
    if (newText !== null) {
        tasks[index].text = newText.trim();
        updateTasksList();
        updateStats();
    }
};

const updateStats = () => {
  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const progressBar = document.getElementById('progress');
  const numbers = document.getElementById('numbers');

  numbers.textContent = `${completedTasks} / ${totalTasks}`;

  if (totalTasks === 0) {
    progressBar.style.width = '0%';
    progressBar.style.opacity = '0';   // Hide the bar
  } else {
    progressBar.style.width = `${progress}%`;
    progressBar.style.opacity = '1';   // Show the bar
  }

  if (tasks.length && completedTasks === totalTasks) {
    blastConfetti();
  }
};


const updateTasksList = () => {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');

        listItem.innerHTML = `
            <div class="taskItem">
                <div class="task ${task.completed ? "completed" : ""}">
                    <input type="checkbox" class="checkbox" ${task.completed ? 'checked' : ''} />
                    <p>${task.text}</p>
                </div>
                <div class="icons">
                    <img src="./img/edit.png" class="editBtn" data-index="${index}" alt="Edit">
                    <img src="./img/bin.png" class="deleteBtn" data-index="${index}" alt="Delete">
                </div>
            </div>
        `;

        // Event Listeners
        listItem.querySelector('.checkbox').addEventListener('change', () => toggleTaskComplete(index));
        listItem.querySelector('.editBtn').addEventListener('click', () => editTask(index));
        listItem.querySelector('.deleteBtn').addEventListener('click', () => deleteTask(index));

        taskList.append(listItem);
    });
};

document.getElementById('newTask').addEventListener('click', function(e) {
    e.preventDefault();
    addTask();
});

const blastConfetti = ()=>{
const defaults = {
  spread: 360,
  ticks: 100,
  gravity: 0,
  decay: 0.94,
  startVelocity: 30,
};

function shoot() {
  confetti({
    ...defaults,
    particleCount: 30,
    scalar: 1.2,
    shapes: ["circle", "square"],
    colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
  });

  confetti({
    ...defaults,
    particleCount: 20,
    scalar: 2,
    shapes: ["emoji"],
    shapeOptions: {
      emoji: {
        value: ["🦄", "🌈"],
      },
    },
  });
}

setTimeout(shoot, 0);
setTimeout(shoot, 100);
setTimeout(shoot, 200);}
