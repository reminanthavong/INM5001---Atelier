async function chercherListeSemaine(){
    return  await fetch('https://testcalendrier.herokuapp.com/api/v1/semaines');
}

const {semaines}=await chercherListeSemaine();
console.log(semaines);
const selectListeSemaines=document.getElementById("listeSemaines");
const listeSemainesbis= semaines.map((semaine, index) => {
    `<option value="${index}">${semaine}</option>`
})
selectListeSemaines.innerHTML = listeSemainesbis;
console.log(listeSemainesbis)