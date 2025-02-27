// cálculo de IMC.


function calcular(event){  // normalmente o event faz um refresh na pagina
    event.preventDefault();
    let peso = document.getElementById("peso").value;
    let altura = document.getElementById("altura").value;
    let resultado = document.getElementById('resultado');
    let imc = peso / (altura*altura);
 
    
    if (imc < 17){
        resultado.innerHTML = "<br>Seu resultado foi: "+imc.toFixed(2)+"<br> Cuidado, você está muito abaixo do peso.";
    } else if (imc >= 17 && imc <= 18.49){
        resultado.innerHTML = "<br>Seu resultado foi: "+imc.toFixed(2)+"<br>Você está abaixo do peso.";
    } else if (imc >= 18.5 && imc <= 24.99){
        resultado.innerHTML = "<br>Seu resultado foi: "+imc.toFixed(2)+"<br>Você está dentro do peso esperado.";
    }else if (imc >= 25 && imc <= 29.99){
        resultado.innerHTML = "<br>Seu resultado foi: "+imc.toFixed(2)+"<br>Você está acima do peso esperado.";
    }else {
        resultado.innerHTML = "<br>Seu resultado foi: "+imc.toFixed(2)+"<br>Cuidado, você está na zona de obesidade.";
    }

    document.getElementById('peso').value = '';
    document.getElementById('altura').value = '';

}