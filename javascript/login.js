function getElem(elem) {
    return document.querySelector(elem);
}

let regexCPF = /^[0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2}$/;
getElem(".cpf-form").addEventListener("blur", function() {

    //jeito 1
    if(!regexCPF.test(this.value)) {
        getElem(".alert-cpf").style.display = "block";
        return;
    };
    getElem(".alert-cpf").style.display = "none";
});



let regexSenha = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/;

getElem(".senha-form").addEventListener("blur", function() {
    if(!regexSenha.test(this.value)) {
        getElem(".alert-Senha").style.display = "block";
        return;
    };
    getElem(".alert-Senha").style.display = "none";
});
