
let inputPost = document.getElementById("post");
let listToDo = document.getElementById("todos");

let todoItems = [];

const constCategory = [
    { id: 0, name: "All" },
    { id: 1, name: "family" },
    { id: 2, name: "Work" },
    { id: 3, name: "Sport" },
];


function addTodoTask() {
    if (inputPost.value === '')
        alert("You must write something");
    else {
        const selectedCategory = setCategory();
        const categoryObject = constCategory.find(category => category.id === selectedCategory);

        const todo = {
            id: Date.now(),
            text: inputPost.value,
            checked: false,
            categoryId: categoryObject ? categoryObject.id : 0,
        }

        todoItems.push(todo);
        const li = createLiElement(todo);
        listToDo.appendChild(li);
        countCategory();
        console.log(todoItems);
    }
}

function countCategory() {

    // const selectedCategoryId = setCategory()
    // const selectedCategory = constCategory.find(category => category.id === selectedCategoryId);
     const  sm = constCategory.find(c=>c.id===0); 
    if (sm) {
        const countAll = todoItems.length;
        const allElement = document.getElementById(sm);

        allElement.innerText = `${sm.name}, ${countAll}`;
    }

    if (selectedCategoryId !== 0) {
        const countCategory = todoItems.filter(i => i.categoryId === selectedCategoryId).length;

        const categoryElement = document.getElementById(selectedCategoryId);

        categoryElement.setAttribute("class", selectedCategoryId);
        categoryElement.innerText = `${selectedCategory.name}, ${countCategory}`;
    }
}

function createCheckBox(li, todo) {
    const checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");

    checkBox.onchange = function (e) {
        li.classList.toggle("completed", e.target.checked);
    };

    console.log(listToDo);
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
        let liId = li.getAttribute("data-id");

        if (todo.id == liId) {
            li.remove();
            deleteToDoItemfromArray(todo.id);
            countCategory();
        }
    });

    return deleteBtn;
}

function createLiElement(todo) {
    const li = document.createElement("li");

    li.setAttribute("data-id", todo.id);

    const checkBox = createCheckBox(li, todo);
    const deleteBtn = createDeleteBtn(li, todo);

    li.innerText = todo.text;

    const br = document.createElement("br");

    li.appendChild(checkBox);
    li.appendChild(deleteBtn);
    li.appendChild(br);

    li.classList.toggle("uncompleted", true);

    return li;
}

function setCategory() {
    const categoryId = document.getElementById("filterCategory");
    return parseInt(categoryId.value, 10);
}

function filterCategory(categoryId) {

    let filterItems = [];

    const converCategoryId = parseInt(categoryId, 10);

    if (converCategoryId === 0) {

        listToDo.innerText = "";

        todoItems.forEach(item => {
            const li = createLiElement(item);
            listToDo.appendChild(li);
        });


    }
    else {
        filterItems = todoItems.filter(i => i.categoryId === parseInt(categoryId, 10));

        listToDo.innerText = "";

        filterItems.forEach(item => {
            const li = createLiElement(item);
            listToDo.appendChild(li);
        });
    }
    return filterItems;
}

function deleteToDoItemfromArray(id) {

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
