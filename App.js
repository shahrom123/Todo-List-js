let inputPost = document.getElementById("post");
let listToDo = document.getElementById("todos");

let todoItems = [];
let defaultCategory = "";


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

    deleteBtn.addEventListener("click", function () {
        //  if(confirm("do you want delete this task?"))
        let liId = li.getAttribute("data-id");
        if (todo.id == liId) {
            li.remove();
            DeleteToDoItemfromArray(todo.id);
        }
    });
    return deleteBtn;
}

function createLiElement(todo) {
    const li = document.createElement("li");

    li.setAttribute("data-id", todo.id);

    const checkBox = createCheckBox(li, todo);
    const deleteBtn = createDeleteBtn(li, todo);



    li.innerHTML = todo.text;

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
    if (category !== 'all') {
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

            listToDo.innerHTML = "";

            todoItems.forEach(item => {
                const li = createLiElement(item);
                listToDo.appendChild(li);
                console.log(todoItems);
            });
        }
        else {
            filterItems = todoItems.filter(i => i.categoryName === category);

            listToDo.innerHTML = "";

            filterItems.forEach(item => {
                const li = createLiElement(item);
                listToDo.appendChild(li);
                console.log(filterItems);
            });

        }
}
function CountCategorySport() {
    const count = todoItems.filter(i => i.categoryName === 'sport');
    console.log(count);
    const n = count.length;
    // n.innerHTML
    return n;
}
function CountCategoryfamily() {
    const count = todoItems.filter(i => i.categoryName === 'family');
    console.log(count);
}
function CountCategoryWork() {
    const count = todoItems.filter(i => i.categoryName === 'work');
    console.log(count);
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
