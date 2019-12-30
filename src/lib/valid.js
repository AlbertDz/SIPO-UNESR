const valid = {};

valid.validName = valor => {
    if (/^([a-z,A-Z])*$/.test(valor) && valor.length <= 50) return true; else return false;
};

valid.validPre = valor => {
    if (/^([a-z,A-Z, ,¿,?])*$/.test(valor) && valor.length <= 50) return true; else return false; 
};

valid.validRes = valor => {
    if (/^([a-z,A-Z, ,0-9])*$/.test(valor) && valor.length <= 250) return true; else return false;
};

valid.validCed = valor => {
    if (/^([0-9])*$/.test(valor) && valor.length === 8) return true; else return false;
};

valid.validTel = valor => {
    if (/^([0-9])*$/.test(valor) && valor.length >= 10 && valor.length <= 11) return true; else return false;
};

valid.validCar = valor => {
    if (/^([a-z,A-Z, ,.])*$/.test(valor) && valor.length <= 50) return true; else return false;
};

valid.validPass = valor => {
    if (valor.length >= 8 && valor.length <= 25) return true; else return false;
};

module.exports = valid;