let unParsedUser = localStorage.getItem('active')
let user = JSON.parse(unParsedUser)
let userTodo = user.todo
console.log(user);
let nameDiv = document.querySelector('.name')
nameDiv.innerText += ` ${user.firstName} ${user.lastName}!`
function loadArray() {
    if(userTodo.length !== 0) {
        show()
        cont.style.visibility = 'visible'
    }
}
const logOut = ()=> {
    window.location.href = './login.html'
    localStorage.removeItem('active')
}


let inp = document.querySelector('input')    
let btn = document.querySelector('.btn')
btn.addEventListener('click', check)
let cont = document.querySelector('.container')
let data 
let con

loadArray()
function check(){
    if (inp.value === '') {
        alert('Pls write the title or body of the note before saving') 
    }
    else {
        save()
    }
}

function save() {
    let obj = {
        title: inp.value,
    }
    userTodo.push(obj)
    show()
    console.log(user);
    inp.value = ''
    cont.style.visibility = 'visible'
}
function show () {
    localStorage.setItem('active', JSON.stringify(user))
    data = ''
    userTodo.forEach((things, index)=> {
        con = `<div class="created">
                    ${things.title.substr(0,11)} 
                    <button class="edit" onclick="edit(${index})">Edit</button> 
                    <button class="delete" onclick="remove(${index})">Delete</button>
                </div>`
        data += con
    })
    cont.innerHTML = data
}
// Delete Function
function remove(index) {
    if (index === userTodo.length) {
        userTodo.pop()
    }
    else {
        userTodo.splice(index, 1)
    }
    show()
}
// Edit Function
function edit(index) { 
    let con = ''
    let data = ''
    let inp = document.querySelector('input')

    inp.value = userTodo[index].title
    if (index === userTodo.length) {
        userTodo.pop()
    }
    else {
        userTodo.splice(index, 1)
    }
    show()
}