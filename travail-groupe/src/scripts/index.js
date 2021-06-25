//import axios from "axios";

//https://www.odwb.be/explore/dataset/code-postaux-belge/api/?q=${entree}
//import("https://cdnjs.cloudflare.com/ajax/libs/axios/0.21.1/axios.min.js")

//init
const form = document.querySelector(".form")
const historique = document.querySelector(".historique")
const input = document.querySelector(".input")
const supprimer = document.querySelector(".delete")
let listeHistorique = []
let villes = []
let count = true
//check local storage si vrai, transfère local storage dans objet JS
if(localStorage.input) {
count = false
listeHistorique = JSON.parse(localStorage.input)
console.log(listeHistorique)
listeHistorique.forEach(e => {
  fetch(`https://www.odwb.be/api/records/1.0/search/?dataset=code-postaux-belge&q=${e.cp}`)
  .then(response => response.json())
  .then(response =>     
  historique.innerHTML += `<li class="list-item">${response.records[0].fields.column_1} - ${response.records[0].fields.column_2}</li>`
  )
});
}
supprimer.addEventListener("click", (e) => {
  e.preventDefault()
  listeHistorique = []
  localStorage.input= ""
  historique.innerHTML = ""
})
form.addEventListener("submit", (e) => {
  e.preventDefault()

  fetch(`https://www.odwb.be/api/records/1.0/search/?dataset=code-postaux-belge&q=${input.value}`)
  .then(response => response.json())
  .then(response => {
    console.log(response)
    if(response.nhits >= 1){
    let cp = response.records[0].fields.column_1
    let ville = response.records[0].fields.column_2
    listeHistorique[listeHistorique.length] = {cp, ville}
    localStorage.input = JSON.stringify(listeHistorique) 
    historique.innerHTML += `<li class="list-item">${cp} - ${ville}</li>`
  }
  })
})