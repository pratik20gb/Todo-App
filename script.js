// Wait for the entire HTML document to load before executing the code
document.addEventListener("DOMContentLoaded", () => {
    // Get references to input field, button, and list container for tasks
    const todoInput = document.getElementById("todo-input");
    const addTaskButton = document.getElementById("add-task-btn");
    const todoList = document.getElementById("todo-list");
  
    // Retrieve tasks from local storage if available; otherwise, start with an empty array
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  
    // Render each task from local storage on page load
    tasks.forEach((task) => renderTasks(task));
  
    // Event listener for the "Add Task" button
    addTaskButton.addEventListener("click", () => {
      // Trim any extra spaces from the input field value
      const taskText = todoInput.value.trim();
  
      // Do nothing if the input field is empty
      if (taskText === "") return;
  
      // Create a new task object with a unique ID, text, and completed status
      const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false,
      };
  
      // Add the new task to the tasks array
      tasks.push(newTask);
  
      // Save the updated tasks array to local storage
      saveTasks();
      renderTasks(newTask);
  
      // Clear the input field for new entries
      todoInput.value = ""; 
  
      // Log the updated tasks array to the console for debugging
      console.log(tasks);
    });
  
    // Function to render each task in the todo list
    function renderTasks(task) {
      const li = document.createElement('li')
      li.setAttribute('data-id', task.id)
      li.innerHTML =`
        <span>${task.text}</span>
        <button>delete</button>
      `;
      li.addEventListener('click',(e)=>{
        if(e.target.tagName === 'BUTTON')return
        task.completed = !task.completed
        li.classList.toggle('completed')
        saveTasks()
      })
      li.querySelector('button').addEventListener('click',(e)=>{
        e.stopPropagation() // prevent toggle from firing (read docs)
        tasks =tasks.filter(t=> t.id !==task.id)
        li.remove()
        saveTasks();
      })
      todoList.appendChild(li)
    }
  
    // Function to save tasks to local storage as a string
    function saveTasks() {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }); 
  