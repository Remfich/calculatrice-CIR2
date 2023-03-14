function calculer() 
{ 
    let c = document.getElementById("output").value 
    let d = eval(c) 
    document.getElementById("output").value = d 
} 
//fonction qui affiche la valeur
function afficher(val) 
{ 
    document.getElementById("output").value+=val 
} 
//fonction qui efface l'écran 
function effacer() 
{ 
    document.getElementById("output").value = "" 
}