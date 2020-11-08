//Função para encurtar código para pegar elementos HTML
function getElement(element){
    return document.querySelector(element);
}

var qtdRequisicaoCalculaPrazo = 0;


window.onload = (event) => {


    /* Formulário 4 */
    let lblTipoEntrega = getElement("#lblTipoEntrega");
    let lblFreteGratis = getElement("#lblFreteGratis");
    

    /* Campos Formulário CORREIOS - Frete*/
    qtdRequisicaoCalculaPrazo = 0;
    let lblDiasUteisPAC = getElement("#lblDiasUteisPAC");
    let lblDataPrazoPAC = getElement("#lblDataPrazoPAC");
    let lblDiasUteisSedex = getElement("#lblDiasUteisSedex");
    let lblDataPrazoSedex = getElement("#lblDataPrazoSedex");
    let rdbSedex = getElement("#rdbSedex");
    let rdbPAC = getElement("#rdbPAC");
    let lblStatusRequisicao = getElement("#lblStatusRequisicao");
    let lblErroCEP = getElement("#lblErroCEP");


    /* Campos Formulário CEP*/
    let txtCEP = getElement("#txtCEP");
    let txtRua = getElement("#txtRua");
    let txtBairro = getElement("#txtBairro");
    let txtCidade = getElement("#txtCidade");
    let txtNumRua = getElement("#txtNumRua");
    let msgErro = getElement("#msgErro");
    let txtComplemento = getElement("#txtComplemento");
    let txtNomeDest = getElement("#txtNomeDest");
    //let cbbUF = getElement("#cbbUF");

    //setDisabledStatusInputs(true);
};


function resetElementsCorreios(){

    rdbPAC.disabled = true;
    rdbSedex.disabled = true;
    rdbPAC.checked = false;
    rdbSedex.checked = false;
    lblDiasUteisPAC.style.display = "none";
    lblDataPrazoPAC.style.display = "none";
    lblDiasUteisSedex.style.display = "none";
    lblDataPrazoSedex.style.display = "none";
}


rdbPAC.addEventListener("click", function(){
    lblTipoEntrega.textContent = "PAC:";
    lblFreteGratis.textContent = "Frete grátis";
});

rdbSedex.addEventListener("click", function(){
    lblTipoEntrega.textContent = "SEDEX:";
    lblFreteGratis.textContent = "Frete grátis";
});


/* ============================================================================================= */
/* =============================== REQUEST CEP JSON VIA ACESSO ================================= */
/* ============================================================================================= */




//Chama funcão após perder o Foco
txtCEP.addEventListener("blur", function(){
    validaCep(7,3,3);
});


function formataCEP(cep){

    if(cep.includes("-")){
        cep = cep.replace("-","");
    }
    
    console.log(cep);
    return cep;
}


function limpaCampos(){
    txtRua.value = "";
    txtBairro.value = "";
    txtCidade.value = "";
    cbbUF.options[0].selected = 'selected'
    txtNumRua.value = "";
    txtComplemento.value = "";
}


function requestCEP(segundosTimeout, incrementoTempoResposta, tentativasRequest){


    resetElementsCorreios();

    const msgTimeOut = "O sistema demorou muito para retornar os dados.\n\nPor favor, tente novamente mais tarde ou preencha os dados manualmente.";

    const msgCEPfalso = "O CEP informado não existe";

    lblErroCEP.style.display = "none";

    //Limpa os valores dos campos de endereço
    //setDisabledStatusInputs(false);
    limpaCampos();

    //Verifica se CEP digitado contem traço e retorna um CEP SEM traços
    let cep = formataCEP(txtCEP.value);

    //Define String de Requisição
    const strLinkRequest = `https://viacep.com.br/ws/${cep}/json/`;


    //Realiza Requisição
    axios({
        method: "get", /* Define o método de Requisição */
        url: strLinkRequest, /* Define a URL de Request */
        timeout: 1000* segundosTimeout /* DEFINE TEMPO LIMITE DE ESPERA DO RETORNO DA REQUISIÇÃO*/
    })

    /*Sucesso Requisição SEM ARROW FUNCTION*/
    .then(function(resposta){


        //Caso o usuário tenha digitado um CPF inexistente
        if(resposta.data.erro == true){
            //Caso CEP Inexistente na base de dados
            msgErro.textContent = msgCEPfalso;
            msgErro.style.display = "block";
            //setDisabledStatusInputs(true);
            setErrorLayout(txtCEP);
    
            return;
        }

        //SUCESSO - Popula Campos com retorno do JSON
        msgErro.style.display = "none";
        txtRua.value = resposta.data.logradouro;
        txtBairro.value = resposta.data.bairro;
        txtCidade.value = resposta.data.localidade;
        cbbUF.value = resposta.data.uf;

        setPassLayout(txtCEP);
        //setDisabledStatusInputs(true);

        calculaPrazoEntrega(40010,7,3,3);
    })

    /* Falha na Requisição COM ARROW FUNCTION*/
    .catch(erro => {
        console.error(erro);

        //Caso tenha dado timeout
        if(erro.toString().includes("timeout of")){

			if(tentativasRequest>1){
				console.log(`Request na tentativa`);
				requestCEP(strLinkRequest, (segundosTimeout+(incrementoTempoResposta*1)), (tentativasRequest-1));
			}else{
                /* alert(msgTimeOut); */
                lblErroCEP.textContent = msgTimeOut;
                lblErroCEP.style.display = "block";
                //setDisabledStatusInputs(false);

                rdbPAC.disabled = false;
                rdbSedex.disabled = false;

            	return;
			}      
        }
        else{
            //Caso a API esteja com algum erro
            //alert("Desculpe, mas ocorreu um erro interno na API.\nPor favor, tente novamente mais tarde");

            lblErroCEP.textContent = `Desculpe, mas ocorreu um erro interno na API.
            \nPor favor, tente novamente mais tarde ou preencha os campos manualmente.`
            lblErroCEP.style.display = "block";

            rdbPAC.disabled = false;
            rdbSedex.disabled = false;
        }
    });
}


function setDisabledStatusInputs(status){
    txtRua.disabled = status;
    txtBairro.disabled = status;
    txtCidade.disabled = status;
    cbbUF.disabled = status;
}


/* ============================================================================================= */
/* ===================================== REGEX CEP ============================================= */
/* ============================================================================================== */

function validaRegex(regexString, elemento){
    return regexString.test(elemento.value);
}


function setPassLayout(elemento){
    elemento.style.borderColor = "#cdd3db";
}


function setErrorLayout(elemento){
    elemento.style.borderColor = "red"
}


function validaCep(){

    //REGEX CEP COM OU SEM TRACO
    let resultadoRegex = validaRegex(/^[0-9]{5}?\-?[0-9]{3}$/, txtCEP);

    if(resultadoRegex==true){
        console.log(`STAUTS CEP = REGEX ${resultadoRegex}`);
        msgErro.style.display = "none";
        requestCEP(7,3,3);
    }
    else{
        setErrorLayout(txtCEP);
        limpaCampos();
        msgErro.textContent = "Entrada de caracteres inválida"
        msgErro.style.display = "block";
        console.log(`STAUTS CEP = REGEX ${resultadoRegex}`);


        rdbPAC.disabled = true;
        rdbSedex.disabled = true;
        lblDiasUteisPAC.style.display = "none";
        lblDataPrazoPAC.style.display = "none";
        lblDiasUteisSedex.style.display = "none";
        lblDataPrazoSedex.style.display = "none";
    }

    return resultadoRegex;
}



/* ============================================================================================= */
/* =============================== REQUEST FRETE JSON CORREIOS ================================= */
/* ============================================================================================= */





function convertStringToXML(text){
    let parserToXML = new DOMParser();
    let respostaConvertida = parserToXML.parseFromString(text,"text/xml");

    console.log(respostaConvertida);

    return respostaConvertida;
}


function getValueXML(xml, tagName){

    return xml.getElementsByTagName(tagName)[0].childNodes[0].nodeValue;
}


function calculaPrazoEntrega(codigo_servico, tempoRespostaInicial, incrementoTempoResposta, tentativasRequest){

    lblStatusRequisicao.style.display = "none";
    lblStatusRequisicao.style.color = "#351912";
    lblDiasUteisPAC.style.display = "none";
    lblDataPrazoPAC.style.display = "none";
    lblDiasUteisSedex.style.display = "none";
    lblDataPrazoSedex.style.display = "none";


    lblStatusRequisicao.style.display = "block";
    lblStatusRequisicao.textContent = "Calculando prazo de entrega..."

    rdbPAC.disabled = true;
    rdbSedex.disabled = true;

    const msgTimeOut = "O sistema demorou muito para retornar os dados.\nPor favor, tente novamente mais tarde.";

    let cep_origem = "01001000";         /* cep de origem apenas numeros */
    let cep_destino = txtCEP.value;      /* cep de destino apenas numeros */

    const strCalculaPrazo = `http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx/CalcPrazo?&nCdServico=${codigo_servico}&sCepOrigem=${cep_origem}&sCepDestino=${cep_destino}`
    console.log(strCalculaPrazo);
    
    axios({
        method: "get",
        url: `https://cors-anywhere.herokuapp.com/${strCalculaPrazo}`,
        timeout: 1000 * tempoRespostaInicial
    })
    //Caso Sucesso da requisição
    .then(function(resposta){
        console.log(resposta.data);
        
        //Converte resposta dada em String para XML 
        let respostaConvertida = convertStringToXML(resposta.data);

        let dias;
        let dataLimite

        try{
            //Caso API tenha retornado algum erro de pesquisa
            let msgErro = getValueXML(respostaConvertida,"MsgErro");
            //alert(msgErro);

            /* RETORNA MSG DE ERRO AO USUARIO */
            lblStatusRequisicao.style.display = "block";
            lblStatusRequisicao.style.color = "red";
            lblStatusRequisicao.textContent = msgErro;


            rdbPAC.disabled = false;
            rdbSedex.disabled = false;
            
        }catch(e){
            
            //Caso API tenha feito a requisição com sucesso


            dias = getValueXML(respostaConvertida,"PrazoEntrega");
            dataLimite = getValueXML(respostaConvertida,"DataMaxEntrega");


            if(qtdRequisicaoCalculaPrazo==0){

                /* PREENCHE DADOS RECUPERADOS REFERENTES AO SEDEX */
                lblDiasUteisSedex.textContent = `${dias} Dias úteis`;
                lblDataPrazoSedex.textContent = `Data prevista: ${dataLimite}`;
                qtdRequisicaoCalculaPrazo++;
                calculaPrazoEntrega(41106,7,3,3);
            }
            else{

                /* PREENCHE DADOS RECUPERADOS REFERENTES AO PAC */
                lblDiasUteisPAC.textContent = `${dias} Dias úteis`;
                lblDataPrazoPAC.textContent = `Data prevista: ${dataLimite}`;
                qtdRequisicaoCalculaPrazo = 0;


                /* HABILITA RADIO BUTTONS APOS FIM DE SOLICITAÇÃO */
                rdbSedex.disabled = false;
                rdbPAC.disabled = false;

                /* EXIBE LABELS COM RETORNO DA API E OCULTA MSG DE ESPERA */
                lblDataPrazoPAC.style.display = "inline";
                lblDiasUteisPAC.style.display = "inline";
                lblDiasUteisSedex.style.display = "inline";
                lblDataPrazoSedex.style.display = "inline";
                lblStatusRequisicao.style.display = "none";
            }
            
            /* alert("FIM REQUISICAO") */
        }

        console.log(dias,dataLimite);
		
    })
    //Caso de erro
    .catch(function(erro){
        console.error(erro);

		//Caso dê timeout
        if(erro.toString().includes("timeout of")){

			if(tentativasRequest>1){
				console.log(`Request na tentativa`);
				calculaPrazoEntrega(codigo_servico, ((tempoRespostaInicial+incrementoTempoResposta)*1), incrementoTempoResposta, (tentativasRequest-1))
			}else{
                /* alert(msgTimeOut); */
                lblStatusRequisicao.style.color = "red";
                lblStatusRequisicao.textContent = msgTimeOut;
                lblStatusRequisicao.style.display = "block";

                rdbPAC.disabled = false;
                rdbSedex.disabled = false;
            	return;
			}      
        }
        else{
            /* PRINTA ERRO RETORNADO */
            lblStatusRequisicao.style.color = "red";
            lblStatusRequisicao.textContent = erro.toString();
            lblStatusRequisicao.style.display = "block";

            rdbPAC.disabled = false;
            rdbSedex.disabled = false;
        }
    });
}


/*  

###########################################
# Código dos Principais Serviços dos Correios
# 41106 PAC sem contrato
# 40010 SEDEX sem contrato
# 40045 SEDEX a Cobrar, sem contrato
# 40215 SEDEX 10, sem contrato
# ###########################################

*/



/* ============================================================================================= */
/* =============================== REGEX CAMPO DESTINATARIO ==================================== */
/* ============================================================================================= */


/* VALIDA NOME SEM NUMEROS */
function validaNome(){

    let resultadoRegex = validaRegex(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/, this);
    console.log(`RESULTADO REGEX NOME = ${resultadoRegex}`);


    if(resultadoRegex){
        if(this.value.length >= 10){
            setPassLayout(this);
            return true;
        }
    }

    setErrorLayout(this);
    return false;
}


txtNomeDest.addEventListener("blur", validaNome);




/* ============================================================================================= */
/* =============================== REGEX CAMPO NUMERO DEST ===================================== */
/* ============================================================================================= */


function validaNumeroDestinatario(){

    let resultadoRegex = validaRegex(/^[\d]+$/, this);

    if(resultadoRegex){
        console.log(`RESULTADO REGEX ENDERECO = ${resultadoRegex}`);
        setPassLayout(this);
        return true;
    }

    setErrorLayout(this);
    console.log(`RESULTADO REGEX ENDERECO = ${resultadoRegex}`);
    return resultadoRegex;
}


txtNumRua.addEventListener("blur", validaNumeroDestinatario);



/* ============================================================================================= */
/* =============================== REGEX CAMPO ENDERECO DEST =================================== */
/* ============================================================================================= */


/* VALIDA NOME COM NUMEROS */
function validaNomeRua(){

    let resultadoRegex = validaRegex(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ 0-9]+$/, this);
    console.log(`RESULTADO REGEX NOME = ${resultadoRegex}`);


    if(resultadoRegex){
        if(this.value.length >= 10){
            setPassLayout(this);
            return true;
        }
    }

    setErrorLayout(this);
    return false;
}

txtRua.addEventListener("blur", validaNomeRua);



/* ============================================================================================= */
/* =============================== REGEX CAMPO COMPLEMENTO DEST ================================ */
/* ============================================================================================= */


txtComplemento.addEventListener("blur", validaNomeRua);



/* ============================================================================================= */
/* =============================== REGEX CAMPO BAIRRO DEST ===================================== */
/* ============================================================================================= */

txtBairro.addEventListener("blur", validaNomeRua);



/* ============================================================================================= */
/* =============================== REGEX CAMPO CIDADE DEST ===================================== */
/* ============================================================================================= */

txtCidade.addEventListener("blur", validaNome);
