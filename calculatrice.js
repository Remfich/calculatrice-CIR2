class Calculatrice {
    calculer() {
      let c = document.getElementById("output").value;
      let d = eval(c);
      document.getElementById("output").value = d;
      document.getElementById("output2").value = c+" = "+d;
    }
    
    afficher(val) {
      document.getElementById("output").value += val;
    }
    
    effacer() {
      document.getElementById("output").value = "";
    }

    retourArriere() {
        let output = document.getElementById("output");
        output.value = output.value.slice(0, -1); // supprime le dernier caractÃ¨re de la valeur de sortie
    }

  }
  let calc = new Calculatrice();