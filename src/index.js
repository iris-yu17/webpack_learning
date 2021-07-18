// 在這邊import css 但webpack讀不懂
import "./index.css"

const btn = document.querySelector("#btn")
const num = document.querySelector("#num")

const addNumber = () => {
    let a = parseInt(num.innerText)
    a++
    num.innerHTML = a

}

btn.addEventListener("click", addNumber)