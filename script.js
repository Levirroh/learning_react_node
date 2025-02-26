var area = document.getElementById("area");

function entrar(){
    var nome = prompt("Digite o seu nome");
    if (nome === '' || nome === null){
        area.innerHTML = "Clique no botão para acessar";
        alert("Oops, algo deu errado!");
    } else{
        area.innerHTML = "Bem vindo " + nome;
    }
}