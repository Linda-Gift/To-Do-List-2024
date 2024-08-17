let form = document.getElementById("form")
let todoInput = document.getElementById("todo-input")
let todoItemContainer = document.getElementById("todo-item-container")

// Array collecting all todo Item Object Literals
let todoItemsArray = []

// Collecting todo from todo input field
form.addEventListener("submit", collectTodo)
function collectTodo(event){
    event.preventDefault()
    let todoInputValue = todoInput.value
    
    if(todoInputValue.length === 0){
        alert("Enter A Todo Item")
    }else{
        const todoObjectLiteral = {
            todoItemEntered : todoInputValue,
            completed : false
        }
        // Push the todo object into the todo items array
        todoItemsArray.push(todoObjectLiteral)
    }
    // Send todo object literals to local storage
    localStorage.setItem("todos", JSON.stringify(todoItemsArray))
    form.reset()
    fetchTodoItems()
    showTodosOnUI()
}


// Fetch todo items from local storage
function fetchTodoItems(){
    if(localStorage.getItem("todos")){
        todoItemsArray = JSON.parse(localStorage.getItem("todos"))
    }
    showTodosOnUI()
}
fetchTodoItems()


// Show Todo Items on UI
function showTodosOnUI(){
    todoItemContainer.innerHTML = ``
    todoItemsArray.forEach(function(todoItem, index){
        let todoToBePrinted = todoItem.todoItemEntered
        
        let todoItemDiv = document.createElement("div")
        todoItemDiv.classList.add("todo-item")
        todoItemDiv.setAttribute("id", `${index}`)

        let leftSideDiv = document.createElement("div")
        leftSideDiv.classList.add("left-side")

        let unCheckedIcon = document.createElement("i")
        unCheckedIcon.classList.add("fa-regular", "fa-circle")
        unCheckedIcon.setAttribute("data-action", "check")

        let checkedIcon = document.createElement("i")
        checkedIcon.classList.add("fa-solid", "fa-circle-check")
        checkedIcon.setAttribute("data-action", "check")

        let todoText = document.createElement("p")
        todoText.textContent = todoToBePrinted
        todoText.setAttribute("data-action", "check")

        let rightSideDiv = document.createElement("div")
        rightSideDiv.classList.add("right-side")

        let editIcon = document.createElement("i")
        editIcon.classList.add("fa-solid" , "fa-pen")
        editIcon.setAttribute("data-action", "edit")

        let deleteicon = document.createElement("i")
        deleteicon.classList.add("fa-solid", "fa-trash")
        deleteicon.setAttribute("data-action", "delete")


        if(!todoItem.completed){
            leftSideDiv.append(unCheckedIcon, todoText)
            rightSideDiv.append(editIcon, deleteicon)
            todoItemDiv.append(leftSideDiv, rightSideDiv)
            todoItemContainer.append(todoItemDiv)
        }else{
            leftSideDiv.append(checkedIcon, todoText)
            rightSideDiv.append(editIcon, deleteicon)
            todoItemDiv.append(leftSideDiv, rightSideDiv)
            todoItemContainer.append(todoItemDiv)
            todoText.style.textDecoration = "line-through"
        }
    })
}


todoItemContainer.addEventListener("click", targetTodoItem)
function targetTodoItem(event){
    let targetOfUser = event.target
    let grandParentElement = targetOfUser.parentElement.parentElement
    if(!grandParentElement.classList.contains("todo-item")) return
    
    let todoID = Number(grandParentElement.id)
    let clickedAction = targetOfUser.dataset.action

    if(clickedAction === "check"){
        checkATodoItem(todoID)
    }

}

function checkATodoItem(ID){
    todoItemsArray = todoItemsArray.map(function(todoObject, index){
        if(index === ID){
            return{
                todoItemEntered : todoObject.todoItemEntered,
                completed : !todoObject.completed
            }
        }else{
            return{
                todoItemEntered : todoObject.todoItemEntered,
                completed : todoObject.completed
            }
        }
    })

    showTodosOnUI()
}