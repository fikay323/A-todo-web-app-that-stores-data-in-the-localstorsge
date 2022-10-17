let body = document.querySelector('.body')
let actual = document.querySelector('body')
let editLayer = document.querySelector('.edit-layer')
let info = document.querySelector('.info')
let total = document.querySelector('.total')
let allStudents = []
const getLocal = ()=>{
    if(localStorage.length>1) { 
        for(let i = 0; i< localStorage.length; i++) {
           if(localStorage.key(i) !== 'active') {
                let bob = localStorage.getItem(localStorage.key(i))
                let parsebob = JSON.parse(bob)
                if(typeof parsebob === 'object') {
                    allStudents.push(parsebob)
                }
            }
        }
        let filtered = allStudents.filter(function (el) {
            return el != null;
        })
        allStudents = filtered
        display()
    }
}
const checkEmpty = ()=>{
    let isEmpty = false
    if(first.value === '' || second.value === '' || third.value === '' || fourth.value === '') {
        isEmpty = true
    }
    isEmpty ? alert('Pls fill in all the required fields') : checkEmail()
}
const checkEmail = ()=>{
    let isFound = false
    if (localStorage.length > 0) {
        for(let k = 0; k< localStorage.length; k++) {
            let bob = localStorage.getItem(localStorage.key(k))
            let parsebob = JSON.parse(bob)
            if(typeof parsebob === 'object' && parsebob.email == third.value) {
                isFound = true
                break
            }
        }
    }
    isFound ? alert('An account has already been registered with this email') : signUp()
}
function padLeadingZeros(num, size) {
    let s = num+"";
    for(let i = s.length; i < size; i++) {
        s='0'+s
    }
    return s
}
const signUp = ()=>{
    let obj = {}
    obj.firstName = first.value
    obj.lastName = second.value
    obj.email = third.value
    obj.passWord = fourth.value
    obj.formerEmail = ''
    obj.todo = []
    allStudents.push(obj);
    localStorage.setItem(localStorage.length, JSON.stringify(obj))
    display()
    first.value=''
    second.value=''
    third.value=''
    fourth.value=''
}
var data
const display = ()=>{
    data =''
    if (allStudents.length > 0) {
        total.innerHTML = allStudents.length
    }
    else {
        total.innerHTML = '0'
    }
    allStudents.map((item, index) => {
        let i = index
        let sn = i
        firstname = item.firstName
        lastname = item.lastName
        email = item.email
        Password = item.passWord
        formerEmail = item.formerEmail
        data += `<tr>
                    <td style='text-align:center;'>${sn+1}</td>
                    <td>${firstname}</td>
                    <td>${lastname}</td>
                    <td>${email}</td>
                    <td>${Password}</td>
                    <td><button onclick='edit(${i})' class="edit">Edit</button></td>
                    <td><button onclick='deleted(${i})' class="delete">Delete</button></td>
                </tr>`
        body.innerHTML = data
    })
    for (let i =0; i<allStudents.length; i++) {
    }
}

const deleted = (i)=>{
    let index = i
    if (allStudents.length > 0) {
        for(let k = 0; k< localStorage.length; k++) {
            if(localStorage.key(k) !== 'active') {
                let bob = localStorage.getItem(localStorage.key(k))
                let parsebob = JSON.parse(bob)
                if(typeof parsebob === 'object' && parsebob.email === allStudents[i].email) {
                    localStorage.removeItem(localStorage.key(k))
                }
            }
        }
        allStudents.splice(index, 1)
        display()
    }
    else {
        body.innerHTML = ''
        total.innerHTML = '0'
    }
}
const edit = (i)=>{
    info.innerHTML+= `<button class='save' onclick="save(${i})">Save</button>`
    editLayer.style.visibility = 'visible'
    first2.value = allStudents[i].firstName
    second2.value = allStudents[i].lastName
    third2.value = allStudents[i].email
    fourth2.value = allStudents[i].passWord
}
const save = (i)=>{
    if (allStudents.length > 0) {
        for(let k = 0; k< localStorage.length; k++) {
            if(localStorage.key(k) !== 'active') {
                let bob = localStorage.getItem(localStorage.key(k))
                let parsebob = JSON.parse(bob)
                if(typeof parsebob === 'object' && parsebob.email === allStudents[i].email) {
                    let obj = {}
                    obj.formerEmail = allStudents[i].email
                    let prevEmail = obj.formerEmail
                    let key = localStorage.key(k)
                    obj.firstName = first2.value
                    obj.lastName = second2.value
                    obj.email = third2.value
                    obj.passWord = fourth2.value
                    localStorage.setItem(localStorage.key(k), JSON.stringify(obj))
                    changeActive(prevEmail, key)
                }
            }
        }
    }
    allStudents[i].firstName = first2.value
    allStudents[i].lastName = second2.value
    allStudents[i].email = third2.value
    allStudents[i].passWord = fourth2.value
    document.querySelector('.save').remove()
    display()
    editLayer.style.visibility ='hidden'
}
const changeActive = (prevEmail, key)=>{
    if(localStorage.active) {
        const active = JSON.parse(localStorage.getItem('active'))
        if(active.email === prevEmail) {
            const changed = JSON.parse(localStorage.getItem(key))
            active.firstName = changed.firstName
            active.lastName = changed.lastName
            active.email = changed.email
            active.passWord = changed.passWord
            localStorage.setItem('active', JSON.stringify(active))
        }
    }
}