let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");
let deleteAll = document.querySelector(".deleteAll");

let arrayOfTasks = [];

if (window.localStorage.getItem("task")) {

arrayOfTasks = JSON.parse(window.localStorage.getItem("task"));

}
 getDataFromlocalStorage();

submit.onclick = function () {
	if(input.value !== ""){
           addTaskToArray(input.value);
           input.value = "";
	}else{
		alert("ENTER Task");
	}

	tasksDiv.style.height = "auto";
}

function addTaskToArray(tasksText){
  const task ={
  	id:Date.now(),
  	title:tasksText,
  	completed: false,
  };

  arrayOfTasks.push(task);

  addTaskToPage(arrayOfTasks);

  addTDataToLocalStorage(arrayOfTasks);		
}

   (addTaskToPage = function (arrayOfTasks){
	tasksDiv.innerHTML = "";
    arrayOfTasks.forEach((task) => {
         let div = document.createElement("div");
         div.className = "task";

         if(task.completed){
         	 div.className = "task done";

         }

         div.setAttribute("data-id",task.id);
         div.appendChild(document.createTextNode(task.title));

         let span = document.createElement("span");
         span.className = "del";
         span.appendChild(document.createTextNode("Delete"));

         div.appendChild(span);
         tasksDiv.appendChild(div);
    });

})((JSON.parse(window.localStorage.getItem("task")) || arrayOfTasks ));

function addTDataToLocalStorage(arrayOfTasks){
	window.localStorage.setItem("task",JSON.stringify(arrayOfTasks));
	deleteAll.style.visibility = "visible";
	 tasksDiv.style.height = "auto";
}
function getDataFromlocalStorage(){

 let data = window.localStorage.getItem("task");
  if(data){
  	
  	 let tasks = JSON.parse(data);
  	

  }
}

// delete task from page and localStorage
tasksDiv.addEventListener("click" , (e) => {
	// delete task from page
if(e.target.classList.contains("del")){
	e.target.parentElement.remove();
}


// 
 // delete task from localStorage
 deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
 toggelStatusTaskWith(e.target.getAttribute("data-id"));
 e.target.classList.toggle("done");
});

function deleteTaskWith (taskId){

 arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);

    addTDataToLocalStorage(arrayOfTasks);	
}

function toggelStatusTaskWith(taskId){
 for (let i = 0; i < arrayOfTasks.length; i++) {
 	if( arrayOfTasks[i].id == taskId ) {
 	arrayOfTasks[i].completed == false ? (arrayOfTasks[i].completed = true) : (arrayOfTasks[i].completed = false) ;
 
 	}
 	
 }
 addTDataToLocalStorage(arrayOfTasks);
}

deleteAll.addEventListener("click",(e) => {
     tasksDiv.innerHTML = "";
     localStorage.clear();
  });
 
