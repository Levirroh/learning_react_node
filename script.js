// FIND

let listagem = [5, 3, "Jose", 2, "Matheus", "Jose"];

let busca = listagem.find((item) => {
    return item === "Jose"
})

console.log(busca);



// filter

let palavras = ["Matheus", "Ana", "Jose", "Ricardo Silva", "Sujeito programador", "Jose"];



let resultado = palavras.filter((item) => {
    return item === "Jose";
})

console.log(resultado);