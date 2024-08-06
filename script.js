let todoItemsContainer = document.getElementById("todoItemsContainer");
let addTodoButton = document.getElementById("addTodoButton");
let saveTodoButton = document.getElementById("saveTodoButton");

function getTodoListFromLocalStorage() {
  let stringifiedTodoList = localStorage.getItem("todoList");
  let parsedTodoList = JSON.parse(stringifiedTodoList);
  if (parsedTodoList === null) {
    return [];
  } else {
    return parsedTodoList;
  }
}

let todoList = getTodoListFromLocalStorage();
let todosCount = todoList.length;

saveTodoButton.onclick = function() {
  localStorage.setItem("todoList", JSON.stringify(todoList));
};

  let DateElement = document.getElementById("DateInput");
  let TitleElement=document.getElementById("TitleInput");
  let LocationElement=document.getElementById("LocationInput");
  let EventElement=document.getElementById("EventInput");

function onAddTodo() {
  let datevalue=DateElement.value;
  let titlevalue=TitleElement.value;
  let locationvalue=LocationElement.value;
  let eventvalue=EventElement.value;

  if (datevalue === "") {
    alert("Enter Valid Date");
    return;
  }
  if(titlevalue === ""){
    alert("Enter Event Title");
    return;
  }
  if(locationvalue===""){
    alert("Enter Event Location");
  }
  if(eventvalue===""){
    alert("Enter Event Details");
  }

  todosCount = todosCount + 1;

  let newTodo = {
    Date:datevalue,
    Title:titlevalue,
    Location:locationvalue,
    Event:eventvalue,
    uniqueNo: todosCount,
    isChecked: false
  };
  todoList.push(newTodo);
  createAndAppendTodo(newTodo);

  DateElement.value = "";
  TitleElement.value="";
  LocationElement.value="";
  EventElement.value="";
}

addTodoButton.onclick = function() {
  onAddTodo();
};

function onTodoStatusChange(checkboxId, labelId, todoId) {
  let checkboxElement = document.getElementById(checkboxId);
  let labelElement = document.getElementById(labelId);
  labelElement.classList.toggle("checked");

  let todoObjectIndex = todoList.findIndex(function(eachTodo) {
    let eachTodoId = "todo" + eachTodo.uniqueNo;

    if (eachTodoId === todoId) {
      return true;
    } else {
      return false;
    }
  });

  let todoObject = todoList[todoObjectIndex];

  if(todoObject.isChecked === true){
    todoObject.isChecked = false;
  } else {
    todoObject.isChecked = true;
  }

}

function onDeleteTodo(todoId) {
  let todoElement = document.getElementById(todoId);
  todoItemsContainer.removeChild(todoElement);

  let deleteElementIndex = todoList.findIndex(function(eachTodo) {
    let eachTodoId = "todo" + eachTodo.uniqueNo;
    if (eachTodoId === todoId) {
      return true;
    } else {
      return false;
    }
  });

  todoList.splice(deleteElementIndex, 1);
}


function createAndAppendTodo(todo) {
  let todoId = "todo" + todo.uniqueNo;
  let checkboxId = "checkbox" + todo.uniqueNo;
  let labelId = "label" + todo.uniqueNo;

  let todoElement = document.createElement("li");
  todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
  todoElement.id = todoId;
  todoItemsContainer.appendChild(todoElement);

  let inputElement = document.createElement("input");
  inputElement.type = "checkbox";
  inputElement.id = checkboxId;
  inputElement.checked = todo.isChecked;

  inputElement.onclick = function () {
    onTodoStatusChange(checkboxId, labelId, todoId);
  };

  inputElement.classList.add("checkbox-input");
  todoElement.appendChild(inputElement);

  let labelContainer = document.createElement("div");
  labelContainer.classList.add("label-container", "d-flex", "flex-row");
  todoElement.appendChild(labelContainer);
  
  let labelElement = document.createElement("label");
  labelElement.id = labelId;
  labelElement.classList.add("checkbox-label");

  let date=document.createElement("p");
  let title=document.createElement("h1");
  let location=document.createElement("h1");
  let detail=document.createElement("p");

  date.textContent=todo.Date;
  title.textContent=todo.Title;
  location.textContent=todo.Location;
  detail.textContent=todo.Event;

  date.classList.add("date");
  title.classList.add("title");
  location.classList.add("location");
  detail.classList.add("event");

  labelElement.appendChild(date);
  labelElement.appendChild(title);
  labelElement.appendChild(location);
  labelElement.appendChild(detail);
  
  if (todo.isChecked === true) {
    labelElement.classList.add("checked");
  }
  labelContainer.appendChild(labelElement);

  let deleteIconContainer = document.createElement("div");
  deleteIconContainer.classList.add("delete-icon-container");
  labelContainer.appendChild(deleteIconContainer);

  let deleteIcon = document.createElement("i");
  deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");

  deleteIcon.onclick = function () {
    onDeleteTodo(todoId);
  };

  deleteIconContainer.appendChild(deleteIcon);
}

for (let todo of todoList) {
  createAndAppendTodo(todo);
}


