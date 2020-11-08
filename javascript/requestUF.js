function getElement(element){
    return document.querySelector(element);
}

let cbbUF = getElement("#cbbUF");
requestUF(7,3,3);


function requestUF(segundosTimeout, incrementoTempoResposta, tentativasRequest){
    
    cbbUF.disabled = true;

    const msgTimeOut = "ERRO JSON UF: O sistema demorou muito para retornar os dados.\n\nPor favor, tente novamente mais tarde.";
    const strLinkRequest = `https://servicodados.ibge.gov.br/api/v1/localidades/estados`;

    axios({
        method: "get",
        url: strLinkRequest,
        timeout: 1000*segundosTimeout
    })
    .then(function(resposta){

        let qtdUFs = resposta.data.length;

        //Cria e popula Array getSiglaUF com as UF's
        let getSiglaUF = [];

        for(let i=0;i<qtdUFs;i++){
            getSiglaUF.push(resposta.data[i].sigla);
        }
        
        //Ordena array populado anteriormente em ordem alfabetica
        getSiglaUF = getSiglaUF.sort();

        //Adiciona itens do array de UF's na cbbUF
        for(let i=0;i<qtdUFs;i++){
            cbbUF.innerHTML += `<option value=${getSiglaUF[i]}>${getSiglaUF[i]}</option>`
        }
        
        console.log(resposta.data);
        cbbUF.disabled = false;
    })
    .catch(function(erro){

        console.error(erro);

        //Caso tenha dado timeout
        if(erro.toString().includes("timeout of")){

			if(tentativasRequest>1){
				console.log(`Request na tentativa`);
				requestUF(strLinkRequest, (segundosTimeout+(incrementoTempoResposta*1)), (tentativasRequest-1));
			}else{
				alert(msgTimeOut);
            	return;
			}      
        }
    });
}