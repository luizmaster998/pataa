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

getElem(".senha").addEventListener("blur", function() {
    if(!regexSenha.test(this.value)) {
        getElem(".alert-senha").style.display = "block";
        return;
    };
    getElem(".alert-senha").style.display = "none";
});

let regexConfSenha = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/;

getElem(".confsenha-form").addEventListener("blur", function() {
    if(!regexSenha.test(this.value)) {
        getElem(".alert-confsenha").style.display = "block";
        return;
    };
    getElem(".alert-confsenha").style.display = "none";
});




getElem(".senha",".confsenha-form").addEventListener("blur", function(){
if(".senha"==".confsenha-form"){


        getElem(".alert-confsenha").style.display = "block";
        return;
    };
    getElem(".alert-confsenha").style.display = "none";
});








let regexSobrenome = /^[a-z -']+$/

getElem(".sobrenome-form").addEventListener("blur",function(){
    if(!regexSobrenome.test(this.value)){
        getElem(".alert-sobrenome").style.display = "block";
        return;

    };
    getElem(".alert-sobrenome").style.display = "none";
});





let regexNome = /^[a-z -']+$/

getElem(".nome-form").addEventListener("blur",function(){
    if(!regexNome.test(this.value)){
        getElem(".alert-nome").style.display = "block";
        return;

    };
    getElem(".alert-nome").style.display = "none";
});


let regexEmail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;

getElem(".email-form").addEventListener("blur",function(){
    if(!regexEmail.test(this.value)){
        getElem(".alert-email").style.display ="block";
        return
    };
    getElem(".alert-email").style.display = "none";
});








function validarSenha(){
    senha = document.getElementsByName('senha').value;
    senha2 = document.getElementsByName('senha2').value;
 
    if(senha!=senha2) {
        getElem(".alert-confsenha").style.display = "block";
        return;
    }
    getElem(".alert-confsenha").style.display = "none";
}

