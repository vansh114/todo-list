
const inputTask = document.getElementById("input-task");
const listContainer = document.getElementById("list-container");

function addTask(){

    if(inputTask.value === ""){
        alert("You must enter something");
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = inputTask.value.trim();
        listContainer.appendChild(li);

        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputTask.value = "";
    saveData();
}

listContainer.addEventListener("click", function(e){
    if(e.target.tagName == "LI"){
        e.target.classList.toggle("checked");
        saveData();
    }
    else if(e.target.tagName == "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
}, false)

listContainer.addEventListener("dblclick", function(e){
    if(e.target.tagName == "LI"){
        let li = e.target;
        let oldText = li.firstChild.textContent.trim();

        let input = document.createElement("input");
        input.type = "text";
        input.value = oldText;
        input.classList.add("edit-task");

        li.textContent = "";
        li.appendChild(input);
        input.focus();

        input.addEventListener("keydown", function(e){
            if(e.key === "Enter"){
                saveEditedTask(li, input);
            }
        });
    }
})

function saveEditedTask(li, input){
    
    let newText = input.value.trim();

    if(newText !== ""){
        li.textContent = newText;
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    saveData();
}

function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}

function showData(){
    listContainer.innerHTML = localStorage.getItem("data");
}

showData();