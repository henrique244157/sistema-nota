// Carrega dados salvos no localStorage
document.addEventListener("DOMContentLoaded", carregarAlunos);

document.getElementById("formAluno").addEventListener("submit", function(e) {
    e.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const nota1 = parseFloat(document.getElementById("nota1").value);
    const nota2 = parseFloat(document.getElementById("nota2").value);

    // Validação
    if (nome === "" || isNaN(nota1) || isNaN(nota2)) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    const media = ((nota1 + nota2) / 2).toFixed(2);
    const situacao = media >= 6 ? "Aprovado" : "Reprovado";

    adicionarAlunoNaTabela(nome, nota1, nota2, media, situacao);
    salvarAluno(nome, nota1, nota2, media, situacao);

    // Limpar campos
    document.getElementById("formAluno").reset();
});

function adicionarAlunoNaTabela(nome, nota1, nota2, media, situacao) {
    const tbody = document.getElementById("tabelaAlunos");

    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td>${nome}</td>
        <td>${nota1}</td>
        <td>${nota2}</td>
        <td>${media}</td>
        <td class="${situacao === 'Aprovado' ? 'aprovado' : 'reprovado'}">
            ${situacao}
        </td>
    `;

    tbody.appendChild(tr);
}

// Salvar no localStorage
function salvarAluno(nome, nota1, nota2, media, situacao) {
    let alunos = JSON.parse(localStorage.getItem("alunos")) || [];

    alunos.push({ nome, nota1, nota2, media, situacao });

    localStorage.setItem("alunos", JSON.stringify(alunos));
}

// Carregar ao iniciar
function carregarAlunos() {
    const alunos = JSON.parse(localStorage.getItem("alunos")) || [];

    alunos.forEach(a => {
        adicionarAlunoNaTabela(a.nome, a.nota1, a.nota2, a.media, a.situacao);
    });
}
