'use strict';


const todoControl = document.querySelector('.todo-control'),
  headerInput = document.querySelector('.header-input'),
  todoList = document.querySelector('.todo-list'),
  todoCompleted = document.querySelector('.todo-completed');


const todoData = [];

const render = function(){

  todoList.textContent = '';
  todoCompleted.textContent = '';

  todoData.forEach(function(item){
    const li = document.createElement('li');
    li.classList.add('todo-item');
    li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
      '<div class="todo-buttons">' +
        '<button class="todo-remove"></button>' +
        '<button class="todo-complete"></button>' +
      '</div>';
      if(item.completed){
        todoCompleted.append(li);
      } else {
        todoList.append(li);
      }
    const btnTodoCompleted = li.querySelector('.todo-complete');
    btnTodoCompleted.addEventListener('click', function(){
      item.completed = !item.completed;
      render();
    })
  })

  for (let key in todoData){
    localStorage.setItem(todoData[key].value, JSON.stringify(todoData[key]))
  }

  let todoRemove = document.querySelectorAll('.todo-remove');
  todoRemove.forEach(function(name){
    name.addEventListener('click', function(event) {
      let elemKey = event.target.closest('.todo-item').querySelector('.text-todo').textContent;   
      todoData.forEach(function(e,i){
        if (e.value == elemKey){
          delete todoData[i];
        }
      })
      localStorage.removeItem(elemKey);
      render();
    })
  })    

};

todoControl.addEventListener('submit', function(event){
  event.preventDefault();
  if (headerInput.value !== ''){
    const newTodo = {
      value: headerInput.value,
      completed: false  
    };
    todoData.push(newTodo);
    headerInput.value = '';
  }
  render();
});   

let getLocal = function(){
  for(let i in localStorage) {
    if (localStorage.getItem(i)){
      todoData.push(JSON.parse(localStorage.getItem(i)));
    }
  }
};


getLocal();

render();