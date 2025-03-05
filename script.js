// FIND

// let listagem = [5, 3, "Jose", 2, "Matheus"];

// let busca = listagem.find(() => {
//     if (item === "Jose"){
//         return console.log("ITEM ENCONTRADO COM SUCESSO")
//     }
// })

// console.log(busca);



// filter

let palavras = ["Matheus", "Ana", "Jose", "Ricardo Silva", "Sujeito programador"];



let resultado = palavras.filter((item) => {
    return item.length >= 4;
})

console.log(resultado);