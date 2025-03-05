// // MAP = percorrer todo um array

// let lista = ["MATHEUS", "JOSE", "MARIA"];

// lista.map((item, index) => {
//     console.log(`PASSANDO: item ${item} e index ${index}`)
// });


// reduce = busca reduzir um array

let numeros = [5, 3, 2, 5];

let total = numeros.reduce((acumulador, numero, indice, original) => {
    console.log(`PASSANDO: acumulador ${acumulador}, numero ${numero}, indice ${indice} e original ${original}`)

    return acumulador += numero;

})



console.log("TOTAL DO REDUCE: "+ total)