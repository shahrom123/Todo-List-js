
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
    const selectedCategoryId = setCategory();
    const selectedCategory = constCategory.find(category => category.id === selectedCategoryId);

    const countAll = todoItems.length;
    const allElement = document.getElementById("0");

    const ConstCategoryAll = "all";

    allElement.innerText = `${ConstCategoryAll} , ${countAll}`;

    if (selectedCategoryId !== 0) {
        const countCategories = todoItems.filter(i => i.categoryId === selectedCategoryId).length;

        const categoryElement = document.getElementById(selectedCategoryId);

        categoryElement.innerText = `${selectedCategory.name}, ${countCategories}`;
    }
}



function createCheckBox(li) {
    const checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");

    checkBox.onchange = function (e) {
        li.classList.toggle("completed", e.target.checked);
    };
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
            countElementByCategoryAfterDelete(todo.categoryId);    
        }
    });

    return deleteBtn;
}

function countElementByCategoryAfterDelete(id) {

    const selectedCategory = constCategory.find(category => category.id === id);

    const countAll = todoItems.length;
    const allElement = document.getElementById("0");
    const ConstCategoryAll = "all";
    allElement.innerText = `${ConstCategoryAll} , ${countAll}`;
     
    if (id > 0) {
        const countCategories = todoItems.filter(i => i.categoryId === id).length;
       let IdToString = id.toString();
        const categoryElement = document.getElementById(IdToString);

        categoryElement.innerText = `${selectedCategory ? selectedCategory.name :" "}, ${countCategories}`;
    }
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
