const btn = document.getElementById("btn_add-todo");
const textUser = document.getElementById("text_user-todo");
const WorkTodo = document.querySelector(".inwork-todo");
const closeWorkTodo = document.querySelector(".closework-todo");
const lowBlock = document.querySelector(".low-block");


//хранение тасков активных
let tasks = [];


//хранение тасков удаленных
let deleTasks = []


//создаем объект тасков
function Users(information){
   this.id = tasks.length + 1;
   this.time = new Date().toLocaleDateString();
   this.information = information;
   this.isChecked = false;
}


//создание блоков тасков
function block(todo){
   WorkTodo.innerHTML = "";
   closeWorkTodo.innerHTML = "";

   todo.forEach((task) => {
      const check = task.isChecked ? "checked" : ""

      const blockHtml = 
      `<div class="tasks-todo ${check}">
                  <div class="hight-block" id="${task.id}">
                      <div class="one-block">
                          <input type="checkbox" class="btn-checkbox" ${check}>
                          <div class="new-task">
                              <p class="text-task">${task.information}</p>  
                          </div>
                      </div>
                      <div class="two-block">
                          <div class="btn-task">
                              <span>Приоритет задачи</span>
                              <select name="priority" id="priority-list">
                                  <option selected disabled>Выберите приоритет</option>
                                  <option value="" class="one-options">Высокий</option>
                                  <option value="" class="two-options">Средний</option>
                                  <option value="" class="three-options">Низкий</option>
                              </select>
                              <button class="delete-task">Х</button>
                              <p class="date-creation">Дата начала ${task.time}</p>
                          </div>
                      </div>
                  </div>
      
               </div>
               </div>
               `



               if(task.isChecked){
                  return closeWorkTodo.innerHTML += blockHtml
               } 
               else {
                  return WorkTodo.innerHTML += blockHtml
               }
   })

   

}


//добавление тасков
btn.addEventListener("click", () => {
   if(textUser.value){
      tasks.unshift(new Users(textUser.value))    
      block(tasks)
      textUser.value = "";
   }
   else {
      alert("введите текст")
   }
})


//поиск клика по чекбокс
WorkTodo.onclick = (event) => {
   const target = event.target
   if(target.classList.contains("btn-checkbox")) {
      console.log(target.checked)
      const isComplited = target.checked
      const taskTarget = target.parentElement.parentElement
      const taskid = taskTarget.getAttribute('id')
      changeCheked(taskid, isComplited, tasks)
      block(tasks)
      console.log(tasks)

   }
   if(target.classList.contains("delete-task")) {
      const taskTarget = target.parentElement.parentElement.parentElement
      const taskid = taskTarget.getAttribute('id')
      deleteTask(taskid, tasks)
      block(tasks)
   }

}

closeWorkTodo.onclick = (event) => {
   const target = event.target
   if(target.classList.contains("btn-checkbox")) {
      console.log(target.checked)
      const isComplited = target.checked
      const taskTarget = target.parentElement.parentElement
      const taskid = taskTarget.getAttribute('id')
      changeCheked(taskid, isComplited, tasks)
      block(tasks)
      console.log(tasks)
   }
   if(target.classList.contains("delete-task")) {
      const taskTarget = target.parentElement.parentElement.parentElement
      const taskid = taskTarget.getAttribute('id')
      deleteTask(taskid, tasks)
      block(tasks)
   }

}


//функция измения статуса
function changeCheked(id, status, list) {
   list.forEach((task) => {
      if(task.id == id) {
         task.isChecked = status
      }
   })
}


//удаление задачи
function deleteTask(id, list) {
   list.forEach((task, index) => {
      if(task.id == id){
         deleTasks.push(list.splice(index, 1))
      }
   })
}
