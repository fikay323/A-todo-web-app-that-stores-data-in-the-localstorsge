let unParsedUser = localStorage.getItem('active')
let user = JSON.parse(unParsedUser)
console.log(user);
let nameDiv = document.querySelector('.name')
nameDiv.innerText += ` ${user.firstName} ${user.lastName}!`
const logOut = ()=> {
    window.location.href = './login.html'
    localStorage.removeItem('active')
}


let inp = document.querySelector('input')    
let btn = document.querySelector('.btn')
btn.addEventListener('click', check)
let cont = document.querySelector('.container')
let array = []
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
    con =''
    let obj = {
        title: inp.value,
    }
    array.push(obj)
    localStorage.setItem('todo', JSON.stringify(array))
    show()
    inp.value = ''
    cont.style.visibility = 'visible'
}
function show () {
    data = ''
    console.log(data);
    array.forEach((things, index)=> {
        con = `<div class="created">${things.title.substr(0,11)} 
        <button class="edit" onclick="edit(${index})">Edit</button> 
        <button class="delete" onclick="remove(${index})">Delete</button>
        </div>`
        data += con
    })
    cont.innerHTML = data
}
// Delete Function
function remove(index) {
    let con = ''
    let data = ''
    if (index === array.length) {
        array.pop()
    }
    else {
        array.splice(index, 1)
    }
    localStorage.setItem('todo', JSON.stringify(array))
    array.forEach((thing, index) => {
        con = `<div class="created">${thing.title.substr(0,11)} 
                <button class="edit">Edit</button> 
                <button class="delete" onclick="remove(${index})">Delete</button>
                </div>`
                data += con
            }) 
    cont.innerHTML = data
}
// Edit Function
function edit(index) { 
    let con = ''
    let data = ''
    let inp = document.querySelector('input')

    inp.value = array[index].title
    if (index === array.length) {
        array.pop()
    }
    else {
        array.splice(index, 1)
    }
    array.forEach((thing, index) => {
        con = `<div class="created">${thing.title.substr(0,11)} 
        <button class="edit">Edit</button> 
        <button class="delete" onclick="remove(${index})">Delete</button>
        </div>`
        data += con
    }) 
    cont.innerHTML = data
}
function loadArray() {
    if(localStorage.todo) {
        let todo = JSON.parse(localStorage.getItem('todo'))
        todo.forEach(each => {
            array.push(each)
        })
        console.log(array);
        show()
        cont.style.visibility = 'visible'
    }
}