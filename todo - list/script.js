let inputBox = document.getElementById("inputbox")
let addBtn = document.querySelector(".addbtn")
let taskContainer = document.querySelector(".taskContainer")

function addTask(){
   if(inputBox.value === "") return;
  else{
 let li = document.createElement("li");
   li.innerHTML = inputBox.value;
   taskContainer.appendChild(li);
   let span = document.createElement("span")
   span.innerHTML = "\u00d7";
   li.appendChild(span)
  }
  inputBox.value = "";
    
}
taskContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked")
    }
    else if(e.target.tagName === "SPAN"){
       e.target.parentElement.remove()
    }
})

