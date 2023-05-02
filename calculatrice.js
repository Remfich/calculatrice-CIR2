class Calculatrice {

  constructor() {
    this.lastResult = null;
    this.historique = [];
    this.input = document.getElementById("input");
    this.result = document.getElementById("result");
    this.nextEval = false;
 }

  calculer() {
    let c = document.getElementById("output").value;
    let d = eval(c);
    document.getElementById("output").value = d;
    document.getElementById("output2").value = c+" = "+d;
    this.historique.unshift(c);
    this.nextEval = true;
  }
  
  afficher(val) {
    document.getElementById("output").value += val;
    this.nextEval = false;
  }
  
  effacer() {
    document.getElementById("output").value = "";
    this.nextEval = false;
  }

  retourArriere() {
    if(this.nextEval==true){
          document.getElementById("output").value = this.historique[0];
          this.nextEval = false;
    }else{
      document.getElementById("output").value = document.getElementById("output").value.slice(0,-1);
      this.nextEval = false;
      }
  }
}

resultat() {
  if (this.input.value === "") {
    this.result.value = "no calcul"; // Afficher "no calcul" si l'entrée est vide
    return;
  }
  const expression = this.input.value;
  axios
    .post('http://localhost:3000/annonces', { expression })
    .then(response => {
      const result = response.data.result;
      this.lastResult = result;
      this.actions.push("=");
      this.results.push(result);
      this.result.value = expression + " = " + result; // Afficher le calcul et le résultat dans "result"
      this.input.value = "";
    })
    .catch(error => {
      console.error(error);
    });
}

undo() {
  if (this.actions.length > 0) {
    const lastAction = this.actions.pop();

    if (lastAction === "=") { // Récupérer le dernier résultat
      axios
        .delete('http://localhost:3000/annonces/last')
        .then(response => {
          const lastResult = response.data.result;
          if (this.actions.length === 0) { // Si la liste des actions est vide, afficher le dernier résultat
            this.result.value = lastResult;
          } else { // Sinon, reconstruire le calcul en utilisant la liste des actions
            let currentInput = "";
            for (let i = this.actions.length - 1; i >= 0; i--) {
              if (this.actions[i] === "=") {
                break;
              }
              currentInput = this.actions[i] + currentInput;
            }
            this.result.value = ""; // Effacer le résultat affiché
            this.input.value = currentInput; // Afficher le calcul reconstruit
            this.lastResult = null;
          }
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      this.input.value = this.input.value.slice(0, -1);
    }
  }
}


const baseCalculator = new BaseCalculator();

// Pour que ça marche aussi avec les touches du clavier :
document.addEventListener("keydown", event => {
const key = event.key;
if (/[0-9+\-*/().]/.test(key)) {
  event.preventDefault();
  baseCalculator.calcul(key);
} else if (key === "Enter") {
  event.preventDefault();
  baseCalculator.resultat();
} else if (key === "Backspace") {
  event.preventDefault();
  baseCalculator.undo();
}
});

let calc = new Calculatrice();