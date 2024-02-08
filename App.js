let inputPost = document.getElementById("post");
let listToDo = document.getElementById("todos");

let todoItems = [];
let defaultCategory = '';


function createCheckBox(li, todo) {
    const checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");

    checkBox.onchange = function (e) {
        if (e.target.checked == true) {
            li.classList.toggle("completed", true);
            li.classList.toggle("uncompleted", false);

            console.log(listToDo);
        }
        else {
            li.classList.toggle("completed", false);
            li.classList.toggle("uncompleted", true);

            console.log(listToDo);
        }
    };

    // if (todo.checked == false) {
    //     checkBox.setAttribute("type", "checkbox");
    //     listToDo1.setAttribute("class", "uncompleted");
    //     todo.checked = false;
    // }
    // else {
    //     checkBox.setAttribute("type", "checkbox");
    //     checkBox.setAttribute("checked", "checked");
    //     listToDo1.setAttribute("class", "completed");
    //     todo.checked = true;
    // }
    return checkBox;
}

function createDeleteBtn(li, todo) {

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "delete";

    deleteBtn.setAttribute("class", "delete");
    deleteBtn.setAttribute("onclick", "CountCategorySport()");
  
    deleteBtn.addEventListener("click", function () {
        //  if(confirm("do you want delete this task?"))
        let liId = li.getAttribute("data-id");
        if (todo.id == liId) {
            li.remove();
            DeleteToDoItemfromArray(todo.id);
        }
        console.log(todoItems);
    });
    return deleteBtn;
    
}

function createLiElement(todo) {
    const li = document.createElement("li");

    li.setAttribute("data-id", todo.id);

    const checkBox = createCheckBox(li, todo);
    const deleteBtn = createDeleteBtn(li, todo);

    li.innerText = todo.text;

    let br = document.createElement("br");

    li.appendChild(checkBox);
    li.appendChild(deleteBtn);
    li.appendChild(br);

    li.classList.toggle("uncompleted", true);

    return li;

}

function AddToDoTask() {
    if (inputPost.value === '')
        alert("You must write something");
    else {
        const todo = {
            text: inputPost.value,
            checked: false,
            id: Date.now(),
            categoryName: defaultCategory,
        }

        todoItems.push(todo);
        console.log(todoItems);

        const li = createLiElement(todo);

        listToDo.appendChild(li);

        console.log(listToDo);
    }
}
function getCategory() {
    const categoryName = document.getElementById("filterCategory");
    const category = categoryName.value;
    if (category === 'all') {
        defaultCategory = "";
    }
    else {
        defaultCategory = category;
    }

    console.log(defaultCategory);
    console.log(category);
    return category;
}

function filterCategory(category) {

    let filterItems = [];

    if (category)

        if (category === 'all') {

            listToDo.innerText = "";

            todoItems.forEach(item => {
                const li = createLiElement(item);
                listToDo.appendChild(li);
                console.log(todoItems);
            });
        }
        else {
            filterItems = todoItems.filter(i => i.categoryName === category);

            listToDo.innerText = "";

            filterItems.forEach(item => {
                const li = createLiElement(item);
                listToDo.appendChild(li);
                console.log(filterItems);
            });

        }

}

function CountCategorySport() {

    const get = getCategory();
    if (get === 'sport') {
        const countSport = todoItems.filter(i => i.categoryName === get);
        const countS = countSport.length+1 ;
        const d = document.getElementById("sport").innerText = " ";

        console.log(countS);

        document.getElementById("sport").innerText += get + "  " + countS;
    }
    else if (get === 'work') {
        const countSport = todoItems.filter(i => i.categoryName === get);
        const countS = countSport.length ;
        const d = document.getElementById("work").innerText = " ";

        console.log(countS);

        document.getElementById("work").innerText += get + "  " + countS;
    }
    else if (get === 'family') {
        const countSport = todoItems.filter(i => i.categoryName === get);
        const countS = countSport.length;
        const d = document.getElementById("family").innerText = " ";

        console.log(countS);

        document.getElementById("family").innerText += get + "  " + countS;
    }
    if (get || defaultCategory == '') {
        const countAll = todoItems.length;
        const d = document.getElementById("all").innerText = " ";

        console.log(countAll);
        const get = 'all';

        document.getElementById("all").innerText += get + "  " + countAll;
    }

}

function DeleteCount(){

    CountCategorySport();
    AddToDoTask();
}

function DeleteToDoItemfromArray(id) {
    let index = todoItems.findIndex(function (item) {
        return item.id === id;
    })
    if (index !== -1) {
        todoItems.splice(index, 1);
        console.log("deleted item from array successfully");
    }
    else
        console.log("item not found");
}
