const form = document.querySelector("form");
const newTask = document.querySelector("input");
const list = document.querySelector("ul");
let listArray = [];

form.addEventListener("submit", (event) => {
    event.preventDefault();
    addTaskToArray(newTask.value);
})

addTaskToArray = (text) => {
    listArray.push(text);
    displayArrayToList(listArray);
    newTask.value = "";
}

displayArrayToList = (array) => {
    //clears the ul
    list.innerHTML = "";
    //for each item in the array
    array.forEach((task, index) => {
        //create a li
        const li = document.createElement("li");
        //create a button to delete
        const deleteBtn = document.createElement("button");
        //change its text to an X marker
        deleteBtn.textContent = "X";
        deleteBtn.classList.add("delete");
        deleteBtn.addEventListener("click", () => deleteTask(index));
        //attach the button to the li
        li.appendChild(deleteBtn);
        const liText = document.createTextNode(" " + task);
        li.appendChild(liText);
        //attach the li as a child of the ul
        list.appendChild(li);
    });
}

deleteTask = (index) => {
    listArray.splice(index, 1);
    displayArrayToList(listArray);
}
