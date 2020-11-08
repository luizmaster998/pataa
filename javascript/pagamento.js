function getElement(element){
    return document.querySelector(element);
}

let rdbPagCartao = getElement("#rdbPagCartao");
let rdbPagBoleto = getElement("#rdbPagBoleto");
let cbbMesValidade = getElement("#cbbMesValidade");
let cbbAnoValidade = getElement("#cbbAnoValidade");
let txtNumCartao = getElement("#txtNumCartao");
let cbbQtdParcela = getElement("#cbbQtdParcela");
let txtNumCPF = getElement("#txtNumCPF");
let txtNomeTitularCartao = getElement("#txtNomeTitularCartao");
let txtNomeCVVCartao = getElement("#txtNomeCVVCartao");

populaMes();
populaAno();


function desabilitaCartaoCredito(status){

    cbbMesValidade.disabled = status;
    cbbAnoValidade.disabled = status;
    txtNumCartao.disabled = status;
    cbbQtdParcela.disabled = status;
    txtNumCPF.disabled = status;
    txtNomeTitularCartao.disabled = status;
    txtNomeCVVCartao.disabled = status;
}

function setObrigatorio(status){
    txtNumCartao.required = status;
    txtNumCPF.required = status;
    txtNomeTitularCartao.required = status;
    txtNomeCVVCartao.required = status;
}

function limpaCamposCartao(){
    cbbMesValidade.selectedIndex = 0;
    cbbAnoValidade.selectedIndex = 0;
    txtNumCartao.value = "";
    cbbQtdParcela.selectedIndex = 0;
    txtNumCPF.value = "";
    txtNomeTitularCartao.value = "";
    txtNomeCVVCartao.value = "";
}


function populaMes(){

    let zeroEsquerda;

    for(let i=1; i<=12;i++){

        if(i<10){
            zeroEsquerda = "0";
        }
        else{
            zeroEsquerda="";
        }
        cbbMesValidade.innerHTML += `<option value="${i}">${zeroEsquerda}${i}</option>`;
    }
}


function populaAno(){

    let anoAtual = new Date().getFullYear();

    for(let i=0; i<=10; i++){
        cbbAnoValidade.innerHTML += `<option value=${i}>${anoAtual+i}</option>`;
    }
}

rdbPagCartao.addEventListener("click", function(){
    desabilitaCartaoCredito(false);
    setObrigatorio(true);
});

rdbPagBoleto.addEventListener("click", function(){
    desabilitaCartaoCredito(true);
    limpaCamposCartao();
    setObrigatorio(false);
});