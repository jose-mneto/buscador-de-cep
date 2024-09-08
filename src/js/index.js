const cepInput = document.getElementById('cep')
const botao = document.getElementById('botao')
const retornoDiv = document.getElementById('retorno')

botao.addEventListener('click', () => {
    const cep = cepInput.value.trim()

    if (!validarCEP(cep)) {
        exibirErro('CEP inválido. Por favor, digite um CEP com 8 dígitos.')
        return
    }

    buscarDadosCep(cep)
        .then(() => {
            cepInput.value = ''
        })
        .catch(error => {
            exibirErro('Erro ao buscar CEP: ' + error.message)
        })
})

async function buscarDadosCep(cep) {
    try {
        const url = `https://viacep.com.br/ws/${cep}/json/`
        const resposta = await fetch(url)
        const retorno = await resposta.json()

        if (retorno.erro) {
            throw new Error('CEP não encontrado')
        }

        retornoDiv.innerHTML = `
            <p>CEP: ${retorno.cep}</p>
            <p>Logradouro: ${retorno.logradouro}</p>
            <p>Bairro: ${retorno.bairro}</p>
            <p>Cidade: ${retorno.localidade}</p>
            <p>Estado: ${retorno.uf}</p>
        `
    } catch (error) {
        throw error
    }
}

function validarCEP(cep) {
    const regex = /^\d{8}$/
    return regex.test(cep)
}

function exibirErro(mensagem) {
    retornoDiv.innerHTML = `<p class="erro">${mensagem}</p>`
}