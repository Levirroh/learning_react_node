// // SPREAD OPERATOR

// let primeiros = [1, 2, 3];

// let numeros = [...primeiros, 4, 5, 10]; // adiciona a array primeiros dentro da array numeros sem ser uma array dentro de uma array;
// // sendo 1, 2, 3, 4, 5, 10


// console.log(numeros);



let pessoa ={
    nome: "Matheus",
    idade: 45,
    cargo: "RH"
};

let novaPessoa = {
    ...pessoa,
    status: "ATIVO",
    cidade: "Campo Grande / MS",
    telefone: "123123123"
};

console.log(novaPessoa);