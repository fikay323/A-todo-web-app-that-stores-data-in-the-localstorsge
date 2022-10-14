let student
let allStudents =[]
if(localStorage.length>1) { 
    for(let i = 0; i< localStorage.length; i++) {
        let bob = localStorage.getItem(localStorage.key(i))
        let parsebob = JSON.parse(bob)
        if(typeof parsebob === 'object') {
            allStudents[i] = parsebob
        }
    }
    let filtered = allStudents.filter((el)=>{
        return el !== null
    })
    allStudents = filtered
}
let inp = document.getElementById('password')
let eye = document.querySelector('.fa-solid')
const change = ()=>{
    if(inp.type == 'password') {
        inp.type = 'text'
        eye.classList.remove('fa-eye-slash')
        eye.classList.add('fa-eye')
    }
    else {
        inp.type = 'password'
        eye.classList.add('fa-eye-slash')
        eye.classList.remove('fa-eye')
    }
}
const cont = document.querySelector('.cont')
const btn = document.querySelector('.btn2')
const wrong = document.querySelector('.wrong')
const signIn = ()=>{
    allStudents.map(item => {
        const emal = item.email
        const pass = item.passWord
        if(email.disabled === false) {
            let isFound = false
            if(emal === email.value) {
                cont.style.display = 'flex'
                setTimeout(()=>{
                    cont.style.height = '40px'
                    cont.style.overFlow = 'visible'
                    email.disabled = true
                    btn.name
                },50)
                isFound = true
            }
            isFound ? '' : alert('Email not found, pls try again or create an account')
        }
        else if(email.disabled === true) {
            let found = false
            if (pass === password.value) {
                localStorage.setItem('active', JSON.stringify(item))
                window.location.href = 'dashboard.html'
                found = true
            }
            found ? '' : wrong.style.display = 'block'
        }
    })
}