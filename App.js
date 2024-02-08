
let inputPost = document.getElementById("post");
let listToDo = document.getElementById("todos");

let todoItems = [];
let defaultCategory = '';

function CountCategorySport() {

    const get = getCategory();

    if (get === 'sport' || get === 'work' || get === 'family') {

        const countCategory = todoItems.filter(i => i.categoryName === get).length + 1;

        const categoryElement = document.getElementById(get);

        categoryElement.innerText = `${get} ${countCategory}`;
    }
    const countAll = todoItems.length + 1;
    const allElement = document.getElementById("all");
    allElement.innerText = `all ${countAll}`;
}

function createCheckBox(li, todo) {
    const checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");

    checkBox.onchange = function (e) {
        if (e.target.checked == true) {
            li.classList.toggle("completed", true);
            li.classList.toggle("uncompleted", false);

        }
        else {
            li.classList.toggle("completed", false);
            li.classList.toggle("uncompleted", true);

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

    deleteBtn.addEventListener("click", function () {
        //  if(confirm("do you want delete this task?"))
        let liId = li.getAttribute("data-id");

        if (todo.id == liId) {
            li.remove();
            DeleteToDoItemfromArray(todo.id);
        }
        const countAll = todoItems.length;
        const allElement = document.getElementById("all");
        allElement.innerText = `all ${countAll}`;

        console.log(todo.categoryName);

        if (todo.categoryName === 'sport' || todo.categoryName === 'work' || todo.categoryName === 'family') {

            const countCategory = todoItems.filter(i => i.categoryName === todo.categoryName).length;

            const categoryElement = document.getElementById(todo.categoryName);

            categoryElement.innerText = `${todo.categoryName} ${countCategory}`;
        }
    });

    return deleteBtn;

}

function createLiElement(todo) {
    const li = document.createElement("li");

    li.setAttribute("data-id", todo.id);

    const checkBox = createCheckBox(li, todo);
    const deleteBtn = createDeleteBtn(li, todo);
    const clear = document.createElement("span");
    clear.innerText = todo.categoryName;
    console.log(todo.categoryName);

    li.innerText = todo.text;

    let br = document.createElement("br");
    li.appendChild(clear);
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

        const li = createLiElement(todo);

        listToDo.appendChild(li);

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
            });
        }
        else {
            filterItems = todoItems.filter(i => i.categoryName === category);

            listToDo.innerText = "";

            filterItems.forEach(item => {
                const li = createLiElement(item);
                listToDo.appendChild(li);
            });
        }
    return filterItems;
}

function addCount() {
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
