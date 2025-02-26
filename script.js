function Horario(){

    // document.write("As horas são:", date.getHours());
    // document.write("<br>Os minutos são:", date.getMinutes());
    // document.write("<br>Os milisegundos são:", date.getMilliseconds());
    // document.write("<br>A data completa é:", date);


    // randomDate = new Date("March 10, 2018");

    // document.write("<br>Uma data aleatória é:", randomDate);
    // document.write("<br>Os milisegundos dessa data são:", Date.parse(randomDate));


    // document.write("<br>O dia dessa data é:", randomDate.getDate());
    // document.write("<br>O mês dessa data é:", randomDate.getMonth()+1); // começa a contar o mes do 0
    // document.write("<br>O mês dessa data é:", randomDate.getDay()); // Pega o dia da semana
    // document.write("<br>O mês dessa data é:", randomDate.getFullYear()); // Pega o ano inteiro
    

    // document.write("<br><br><br><br>Esta data fica: "+ randomDate.getDate()+"/"+(randomDate.getMonth()+1)+"/"+randomDate.getFullYear()); 


    date = new Date();

    data = document.getElementById('data');

    data.innerHTML = "Hoje é: "+date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()+" às: "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()+":"+date.getMilliseconds();

    
}