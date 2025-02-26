function Pedir(){
    let escolha = prompt("Digite um valor");
    switch (Number(escolha)){
        case 1:  
            alert("Estamos enviando um suco até você!");
            break;
        case 2:  
            alert("Estamos enviando uma água até você!");
            break;
        case 3:  
            alert("Estamos enviando um sorvete até você!");
            break;
        case 4:  
            alert("O garçom te atenderá!");
            break;
        default: 
            alert("Opção inválida!");
            break;
    }
}