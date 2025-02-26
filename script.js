var area = document.getElementById("area");

function entrar(){
    var nome = prompt("Digite o seu nome");
    if (nome === '' || nome === null){
        area.innerHTML = "Clique no botão para acessar";
        alert("Oops, algo deu errado!");
    } else{
        area.innerHTML = "Bem vindo " + nome + "    ";

        let botaoSair = document.createElement("button");
        botaoSair.innerText = "Sair da conta";
        botaoSair.onclick = sair;

        area.appendChild(botaoSair);

    }
}

function sair(){
    alert("Até mais!");
    area.innerHTML = "Você saiu";
}