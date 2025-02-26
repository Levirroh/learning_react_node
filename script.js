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


function mediaAluno (nota1, nota2){ // usar o próprio inspecionar informando a mediaAluno(notas)
    var media = (nota1 + nota2) / 2;
    if (media >= 7 ){
       console.log("Sua média foi "+ media + " você passou!");
    } else {
        console.log("Sua média foi "+ media + " você não passou...");
    }
}

function aluno (nome, curso){
    var mensagem = "Seja bem vindo "+ nome + ", ao curso de " + curso;
    console.log(mensagem);
}