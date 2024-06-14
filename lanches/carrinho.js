let carrinho = [];
let total = 0;

function adicionarAoCarrinho(nome, preco) {
    // Verifica se o item já está no carrinho
    let item = carrinho.find(item => item.nome === nome);
    if (item) {
        item.quantidade += 1;
    } else {
        carrinho.push({ nome, preco, quantidade: 1 });
    }
    atualizarCarrinho();
}
function adicionarTaxaEntrega(nome, preco){
    let item = carrinho.find(item => item.nome === nome);
    if(item){
        item.quantidade = 1;
    } else{
        carrinho.push({ nome, preco, quantidade: 1 });
    }
    atualizarCarrinho()

}

function removerDoCarrinho(nome) {
    carrinho = carrinho.filter(item => item.nome !== nome);
    atualizarCarrinho();
}

function atualizarQuantidade(nome, quantidade) {
    let item = carrinho.find(item => item.nome === nome);
    if (item) {
        item.quantidade = quantidade;
    }
    atualizarCarrinho();
}

function atualizarCarrinho() {
    const itensCarrinho = document.getElementById('itensCarrinho');
    itensCarrinho.innerHTML = '';
    total = 0;

    carrinho.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.nome} - $${item.preco} x ${item.quantidade}`;
        itensCarrinho.appendChild(li);

        const botaoRemover = document.createElement('button');
        botaoRemover.textContent = 'Remover';
        botaoRemover.onclick = () => removerDoCarrinho(item.nome);
        li.appendChild(botaoRemover);

        const inputQuantidade = document.createElement('input');
        inputQuantidade.type = 'number';
        inputQuantidade.value = item.quantidade;
        inputQuantidade.min = 1;
        inputQuantidade.onchange = (e) => atualizarQuantidade(item.nome, parseInt(e.target.value));
        li.appendChild(inputQuantidade);

        total += item.preco * item.quantidade;
    });

    document.getElementById('total').textContent = total.toFixed(2);
}

function limparCarrinho() {
    carrinho = [];
    atualizarCarrinho();
}

