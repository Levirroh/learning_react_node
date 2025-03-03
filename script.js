// // REST OPERATOR

// function convidados(...nome){
//     console.log("SEJAM BEM VINDOS")
//     console.log(nome)
// }

// convidados("Matheus", "Maria", "Lucas")




function sorteador(...numeros){
    console.log(numeros)

    const numeroAleatorio = Math.floor(Math.random() * numeros.length);
    console.log(numeros[numeroAleatorio])
}

sorteador(1, 2, 3, 4, 5, 6)