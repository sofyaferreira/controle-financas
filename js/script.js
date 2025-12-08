exibir_financas();
exibir_resumo();

document.getElementById("formsalario").addEventListener("submit", function(event){

    event.preventDefault();

    var salario = document.getElementById("salario").value;
    localStorage.setItem("salario", salario);

    exibir_financas();
    exibir_resumo();

    document.getElementById("salario").value = "";
}
)

document.getElementById("formfinanceiro").addEventListener("submit",
function(event){

    event.preventDefault();

    var data = document.getElementById("data").value;
    var nome = document.getElementById("nome").value;
    var valor = document.getElementById("valor").value;

    var financas = {data:data, nome:nome, valor:valor};

    var lista_financas = JSON.parse(localStorage.getItem('listagem')) || [];
    lista_financas.push(financas);
    localStorage.setItem('listagem', JSON.stringify(lista_financas));

    exibir_financas();
    exibir_resumo();
    
    document.getElementById("data").value = "";
    document.getElementById("nome").value = "";
    document.getElementById("valor").value = "";
    
});
 
function exibir_financas(){
    var lista_financas = JSON.parse(localStorage.getItem('listagem')) || [];
    var output = document.getElementById('output');
    output.innerHTML = '';

    for(let i = 0; i < lista_financas.length; i++){
        let li = document.createElement('li');
        li.innerHTML = '<strong>DATA:</strong> ' + lista_financas[i].data + '; <strong>NOME:</strong> ' + lista_financas[i].nome + '; <strong>VALOR:</strong> R$' + lista_financas[i].valor;
        output.appendChild(li);
    }
}

function total_despesas(){
    var lista_financas = JSON.parse(localStorage.getItem('listagem')) || [];
    var total = 0;

    for(let i = 0; i < lista_financas.length; i++){
        total += Number(lista_financas[i].valor);
    }

    return total;
}


function exibir_resumo(){
    var salario = Number(localStorage.getItem("salario")) || 0;
    var total = total_despesas();
    var restante = salario - total;

    var output2 = document.getElementById('output2');
    output2.innerHTML = '';

    let li = document.createElement('li');
    li.innerHTML = '<strong>SALÁRIO:</strong> R$' + salario +'; <strong>TOTAL DE DESPESAS:</strong> R$' + total + '; <strong>SALDO FINAL:</strong> R$' + restante;

    output2.appendChild(li);
}


function limparTudo(){

    document.getElementById("output").innerHTML = '';
    document.getElementById("output2").innerHTML = '';

    localStorage.clear();
}
