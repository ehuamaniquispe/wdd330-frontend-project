document.addEventListener("DOMContentLoaded", function() {
    showTasks();
  });

let tasks = JSON.parse(localStorage.getItem("taskList"));
if(tasks == undefined){
    tasks = [];    
}

document.getElementById("addBtn").addEventListener('click',()=>{
    console.log("at main.js ...")
    let task = document.getElementById("task").value;
    tasks.push(task);
    localStorage.setItem(`taskList`,JSON.stringify(tasks));
    showTasks();
});

let showTasks =() =>{
    let resultList = document.getElementById('resultList');
    resultList.innerHTML = "";//clear the list to be fetched again
    if (tasks){ //checking tasks to show in the list
        for(let i = 0;i<tasks.length; i++){
            let list = `<li>${tasks[i]}</li>`;
         
            resultList.innerHTML += list;
        }
    }
}

//TODO: create a button to delete information from local storage