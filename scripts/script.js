let addBtn = document.getElementById('add-btn');
let clearBtn = document.getElementById('clear-btn');
let saveBtn = document.getElementById('save-btn');
let taskListArea = document.getElementById('task-list');
let taskEntryBox = document.getElementById('task-entry-box');


function toggleComplete(){
    if(this.classList.contains('completed')){
        this.classList.remove('completed');
    }else{
        this.classList.add('completed');
    }
}

function listTask(task, complete){
    let listElem = document.createElement('li');
    let taskText = document.createTextNode(task);
    listElem.appendChild(taskText);
    listElem.classList.add('hover-item');

    if(complete){
        listElem.classList.add('completed');
    }

    taskListArea.appendChild(listElem);
    listElem.addEventListener('dblclick', toggleComplete);
    taskEntryBox.value = '';
}

function clearList(){
    clearBtn.blur();
    let allTasks = document.getElementsByClassName('hover-item');

    while(allTasks.length > 0){
        allTasks.item(0).remove();
    }
}

function addTask(){
    let task = taskEntryBox.value;
    addBtn.blur();
    listTask(task, false);
}

function saveList(){
    saveBtn.blur();
    let saveArr = [];

    for(let i=0;i<taskListArea.children.length;i++){
        let task = taskListArea.children.item(i);
        let taskInfo = {
            'line' : task.innerHTML,
            'completed' : task.classList.contains('completed')
        }
        saveArr.push(taskInfo);
    }    
    localStorage.setItem('taskList', JSON.stringify(saveArr));
    
}

function loadList(){
    if(localStorage.getItem('taskList') != null){
        let savedTasks = JSON.parse(localStorage.getItem('taskList'));

        for(let i=0; i<savedTasks.length;i++){
            let task = savedTasks[i];
            listTask(task.line, task.completed);
        }

    }
}

function checkForEnter(e){
    if(e.keyCode == 13){
        e.preventDefault();
        addTask();
    }
}

loadList();
addBtn.addEventListener('click', addTask);
clearBtn.addEventListener('click', clearList);
saveBtn.addEventListener('click', saveList);
taskEntryBox.addEventListener('keydown', checkForEnter);
