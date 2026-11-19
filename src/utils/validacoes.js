export function textoValido(valor, max){
    return typeof valor === 'string' 
    && valor.trim().length > 0
    && valor.trim().length <= max;
}

export function inteiroPositivo(valor){
    return Number.isInteger(valor) && valor > 0;
}

export function inteiroNaoNegativo(valor){
    return Number.isInteger(valor) && valor >= 0;
}

export function precoValido(valor){
    return typeof valor === "number"
    && Number.isFinite(valor)
    && valor >= 0
    && valor <= 99999999.99
    && Math.abs(valor * 100 - Math.round(valor * 100)) < 1e-8;
}