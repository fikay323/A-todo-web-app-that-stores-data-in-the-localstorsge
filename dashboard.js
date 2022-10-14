let unParsedUser = localStorage.getItem('active')
let user = JSON.parse(unParsedUser)
console.log(user);
let nameDiv = document.querySelector('.name')
nameDiv.innerText += ` ${user.firstName} ${user.lastName}!`
const logOut = ()=> {
    window.location.href = './login.html'
    localStorage.removeItem('active')
}