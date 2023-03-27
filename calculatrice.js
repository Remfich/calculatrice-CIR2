class Calculatrice {

  constructor() {
    this.historique = [];
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
let calc = new Calculatrice();