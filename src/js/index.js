const cepInput = document.getElementById('cep')
const botao = document.getElementById('botao')
const retornoDiv = document.getElementById('retorno')
botao.addEventListener('click', () => {
    buscarDadosCep(cepInput.value)
})

async function buscarDadosCep(cep){
    const url = `https://viacep.com.br/ws/${cep}/json/`
    const resposta = await fetch(url)
    const retorno = await resposta.json()
    console.log(retorno)
    retornoDiv.innerHTML += `
    <p>CEP: ${retorno.cep}</p>
    <p>Logradouro: ${retorno.logradouro}</p>
    <p>Bairro: ${retorno.bairro}</p>
    <p>Cidade: ${retorno.localidade}</p>
    <p>Bairro: ${retorno.uf}</p>
    `
}
