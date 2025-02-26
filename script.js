var lista = ["Matheus", "Lucas", "José", 150];

console.log(lista[1], lista[3]);

console.log(lista.indexOf("Lucas"));

console.log(lista.indexOf("Este não existe na array")); // retorna -1, já que nao existe;

lista[1] = "Tartaruga";

console.log(lista);


lista[3] = 500;

console.log(lista);

lista.push("Coelhos");

console.log(lista);

lista.shift(); // retira o primeiro item da array;

console.log(lista);

lista.pop();

console.log(lista);

console.log(lista.join(".;.")); 

