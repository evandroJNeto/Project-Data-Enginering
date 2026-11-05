// ==========================================
// 1. BASE DE DADOS DOS ALUNOS E JOGOS (FRONTEND LOCAL)
// ==========================================
// Todos os dados e inscrições rodam 100% no navegador (Client-side / LocalStorage).

const BANCO_ALUNOS = [
  {
    id: "alu-1",
    matricula: "202310452",
    nome: "Lucas Silva Prado",
    email: "lucas.prado@universidade.edu.br",
    cpf: "123.456.789-00",
    curso: "Ciência da Computação",
    semestre: 6,
    status: "regular", // regular | trancado
    atestadoValido: true
  },
  {
    id: "alu-2",
    matricula: "202220188",
    nome: "Beatriz Albuquerque Lima",
    email: "beatriz.lima@universidade.edu.br",
    cpf: "234.567.890-11",
    curso: "Medicina",
    semestre: 8,
    status: "regular",
    atestadoValido: true
  },
  {
    id: "alu-3",
    matricula: "202410012",
    nome: "Gabriel Mendes Castro",
    email: "gabriel.castro@universidade.edu.br",
    cpf: "345.678.901-22",
    curso: "Educação Física",
    semestre: 4,
    status: "regular",
    atestadoValido: true
  },
  {
    id: "alu-4",
    matricula: "202110994",
    nome: "Mariana Duarte Souza",
    email: "mariana.souza@universidade.edu.br",
    cpf: "456.789.012-33",
    curso: "Engenharia Civil",
    semestre: 10,
    status: "regular",
    atestadoValido: false
  },
  {
    id: "alu-5",
    matricula: "202320771",
    nome: "Rodrigo Fontes Nogueira",
    email: "rodrigo.nogueira@universidade.edu.br",
    cpf: "567.890.123-44",
    curso: "Direito",
    semestre: 5,
    status: "trancado",
    atestadoValido: true
  },
  {
    id: "alu-6",
    matricula: "202420340",
    nome: "Camila Fernandes Ribeiro",
    email: "camila.ribeiro@universidade.edu.br",
    cpf: "678.901.234-55",
    curso: "Administração",
    semestre: 3,
    status: "regular",
    atestadoValido: true
  }
];

const JOGOS_UNIVERSITARIOS = [
  {
    id: "jog-1",
    nome: "JUBs 2026 - Fase Estadual",
    sigla: "JUBs-Estadual",
    periodo: "20/11 a 28/11/2026",
    local: "Complexo Esportivo Universitário (CEU)",
    status: "aberto",
    modalidades: [
      { id: "mod-1", nome: "Futsal Masculino", vagasTotais: 14, vagasOcupadas: 11 },
      { id: "mod-2", nome: "Voleibol Misto", vagasTotais: 12, vagasOcupadas: 9 },
      { id: "mod-3", nome: "Basquete 3x3", vagasTotais: 5, vagasOcupadas: 5 }, // esgotado
      { id: "mod-4", nome: "Natação 50m Livre", vagasTotais: 20, vagasOcupadas: 14 },
      { id: "mod-5", nome: "Xadrez Rápido", vagasTotais: 30, vagasOcupadas: 12 }
    ]
  },
  {
    id: "jog-2",
    nome: "InterBixos 2026",
    sigla: "INTERBIXOS",
    periodo: "05/12 a 08/12/2026",
    local: "Ginásio Poliesportivo Central",
    status: "aberto",
    modalidades: [
      { id: "mod-6", nome: "Queimada (Dodgeball)", vagasTotais: 20, vagasOcupadas: 8 },
      { id: "mod-7", nome: "Tênis de Mesa", vagasTotais: 16, vagasOcupadas: 5 },
      { id: "mod-8", nome: "Futebol Society", vagasTotais: 15, vagasOcupadas: 12 }
    ]
  },
  {
    id: "jog-3",
    nome: "Copa Atléticas Integradas",
    sigla: "CAI",
    periodo: "Encerrado em Outubro/2026",
    local: "Arena Municipal",
    status: "encerrado",
    modalidades: [
      { id: "mod-9", nome: "Handebol", vagasTotais: 14, vagasOcupadas: 14 }
    ]
  }
];

// Estado local de inscrições (com persistência em LocalStorage)
let inscricoes = JSON.parse(localStorage.getItem("unigames_inscricoes")) || [
  {
    id: "ins-1",
    data: "2026-11-01",
    alunoId: "alu-1",
    alunoNome: "Lucas Silva Prado",
    alunoMatricula: "202310452",
    alunoCurso: "Ciência da Computação",
    jogoId: "jog-1",
    jogoNome: "JUBs 2026 - Fase Estadual",
    modalidadeId: "mod-1",
    modalidadeNome: "Futsal Masculino",
    status: "Confirmada",
    obs: "Camisa 10"
  },
  {
    id: "ins-2",
    data: "2026-11-02",
    alunoId: "alu-2",
    alunoNome: "Beatriz Albuquerque Lima",
    alunoMatricula: "202220188",
    alunoCurso: "Medicina",
    jogoId: "jog-1",
    jogoNome: "JUBs 2026 - Fase Estadual",
    modalidadeId: "mod-2",
    modalidadeNome: "Voleibol Misto",
    status: "Confirmada",
    obs: "Capitã"
  }
];

function salvarLocalStorage() {
  localStorage.setItem("unigames_inscricoes", JSON.stringify(inscricoes));
  atualizarContadorInscricoes();
}//Local storage - tirar depois de implementar o SGBD

function atualizarContadorInscricoes() {
  const el = document.getElementById("count-inscricoes");
  if (el) el.textContent = inscricoes.length;
}

// ==========================================
// 2. NAVEGAÇÃO DE ABAS
// ==========================================
function trocarAba(abaId) {
  document.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("active"));
  document.querySelectorAll(".tab-content").forEach(content => content.classList.remove("active"));

  const targetTab = document.getElementById(`aba-${abaId}`);
  if (targetTab) targetTab.classList.add("active");

  
  const indexMap = { alunos: 0, jogos: 1, inscricoes: 2 };
  const buttons = document.querySelectorAll(".tab-btn");
  if (buttons[indexMap[abaId]]) {
    buttons[indexMap[abaId]].classList.add("active");
  }
}

// ==========================================
// 3. RENDERIZAÇÃO: CONSULTA DE ALUNOS
// ==========================================
function renderAlunos(lista = BANCO_ALUNOS) {
  const grid = document.getElementById("grid-alunos");
  grid.innerHTML = "";

  if (lista.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 2rem; color: #64748b; background: #fff; border-radius: 8px;">
        Nenhum aluno encontrado com os filtros selecionados.
      </div>
    `;
    return;
  }

  lista.forEach(aluno => {
    const isRegular = aluno.status === "regular";
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <div>
        <div class="card-header">
          <div>
            <div class="card-title">${aluno.nome}</div>
            <div class="card-subtitle">Matrícula: ${aluno.matricula}</div>
          </div>
          <span class="badge ${isRegular ? 'badge-success' : 'badge-danger'}">
            ${aluno.status}
          </span>
        </div>
        <div class="card-body">
          <p><strong>Curso:</strong> ${aluno.curso} (${aluno.semestre}º Semestre)</p>
          <p><strong>E-mail:</strong> ${aluno.email}</p>
          <p><strong>Atestado Médico:</strong> ${aluno.atestadoValido ? '✅ Válido' : '⚠️ Pendente/Vencido'}</p>
        </div>
      </div>
      <div>
        <button 
          class="btn btn-primary" 
          style="width: 100%;"
          onclick="abrirTelaInscricao('${aluno.id}')"
          ${!isRegular ? 'disabled title="Alunos com matrícula trancada não podem ser inscritos"' : ''}
        >
           Inscrever em Jogos
        </button>
      </div>
    `;
    grid.appendChild(card);
  });
}

function filtrarAlunos() {
  const termo = document.getElementById("busca-aluno").value.toLowerCase().trim();
  const curso = document.getElementById("filtro-curso").value;
  const status = document.getElementById("filtro-status").value;

  const filtrados = BANCO_ALUNOS.filter(aluno => {
    const matchTermo = !termo || 
      aluno.nome.toLowerCase().includes(termo) ||
      aluno.matricula.includes(termo) ||
      aluno.cpf.includes(termo);

    const matchCurso = !curso || aluno.curso === curso;
    const matchStatus = !status || aluno.status === status;

    return matchTermo && matchCurso && matchStatus;
  });

  renderAlunos(filtrados);
}

// ==========================================
// 4. RENDERIZAÇÃO: JOGOS & MODALIDADES
// ==========================================
function renderJogos() {
  const grid = document.getElementById("grid-jogos");
  grid.innerHTML = "";

  JOGOS_UNIVERSITARIOS.forEach(jogo => {
    const isAberto = jogo.status === "aberto";
    const card = document.createElement("div");
    card.className = "card";

    let modalidadesHtml = jogo.modalidades.map(m => {
      const lotado = m.vagasOcupadas >= m.vagasTotais;
      return `
        <div class="modalidade-tag">
          <span>${m.nome}</span>
          <span style="font-weight: 600; color: ${lotado ? '#ef4444' : '#10b981'};">
            ${m.vagasOcupadas}/${m.vagasTotais} vagas ${lotado ? '(Lotado)' : ''}
          </span>
        </div>
      `;
    }).join("");

    card.innerHTML = `
      <div>
        <div class="card-header">
          <div>
            <div class="card-title">${jogo.nome}</div>
            <div class="card-subtitle">${jogo.sigla} • ${jogo.periodo}</div>
          </div>
          <span class="badge ${isAberto ? 'badge-success' : 'badge-warning'}">
            ${isAberto ? 'Inscrições Abertas' : 'Encerrado'}
          </span>
        </div>
        <div class="card-body">
          <p><strong>Local:</strong> ${jogo.local}</p>
          <p style="margin-top: 0.6rem; font-weight: 600;">Modalidades e Vagas:</p>
          ${modalidadesHtml}
        </div>
      </div>
      <div>
        <button 
          class="btn btn-primary" 
          style="width: 100%; margin-top: 0.5rem;"
          onclick="abrirTelaInscricao(null, '${jogo.id}')"
          ${!isAberto ? 'disabled' : ''}
        >
          Inscrever Aluno Neste Torneio
        </button>
      </div>
    `;
    grid.appendChild(card);
  });
}

// ==========================================
// 5. RENDERIZAÇÃO: TABELA DE INSCRIÇÕES
// ==========================================
function renderInscricoes() {
  const tbody = document.getElementById("tabela-inscricoes");
  tbody.innerHTML = "";

  if (inscricoes.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="8" style="text-align: center; color: #64748b; padding: 2rem;">
          Nenhuma inscrição realizada até o momento.
        </td>
      </tr>
    `;
    atualizarContadorInscricoes();
    return;
  }

  inscricoes.forEach(ins => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${ins.data}</td>
      <td><strong>${ins.alunoNome}</strong></td>
      <td style="font-family: monospace;">${ins.alunoMatricula}</td>
      <td>${ins.alunoCurso}</td>
      <td>${ins.jogoNome}</td>
      <td><strong>${ins.modalidadeNome}</strong> ${ins.obs ? `<br><small style="color:#64748b;">(${ins.obs})</small>` : ''}</td>
      <td><span class="badge badge-success">${ins.status}</span></td>
      <td>
        <button class="btn btn-danger-sm" onclick="cancelarInscricao('${ins.id}')">
          Cancelar
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  atualizarContadorInscricoes();
}

function cancelarInscricao(id) {
  const item = inscricoes.find(i => i.id === id);
  if (!item) return;

  if (confirm(`Deseja realmente cancelar a inscrição de ${item.alunoNome} em ${item.modalidadeNome}?`)) {
    // Devolve vaga
    const jogo = JOGOS_UNIVERSITARIOS.find(j => j.id === item.jogoId);
    if (jogo) {
      const mod = jogo.modalidades.find(m => m.id === item.modalidadeId);
      if (mod && mod.vagasOcupadas > 0) mod.vagasOcupadas--;
    }

    inscricoes = inscricoes.filter(i => i.id !== id);
    salvarLocalStorage();
    renderInscricoes();
    renderJogos();
    
  }
}

// ==========================================
// 6. MODAL & FLUXO DE INSCRIÇÃO
// ==========================================
function abrirTelaInscricao(alunoIdPreSelecionado = null, jogoIdPreSelecionado = null) {
  const modal = document.getElementById("modal-inscricao");
  const alerta = document.getElementById("modal-alerta");
  alerta.className = "alert hidden";
  alerta.textContent = "";

  // 1. Preencher Select de Alunos
  const selectAluno = document.getElementById("select-aluno");
  selectAluno.innerHTML = `<option value="">-- Escolha um estudante --</option>`;
  BANCO_ALUNOS.forEach(a => {
    const opt = document.createElement("option");
    opt.value = a.id;
    opt.textContent = `${a.nome} (${a.matricula}) - ${a.curso} [${a.status}]`;
    selectAluno.appendChild(opt);
  });

  // 2. Preencher Select de Jogos
  const selectJogo = document.getElementById("select-jogo");
  selectJogo.innerHTML = `<option value="">-- Escolha a competição --</option>`;
  JOGOS_UNIVERSITARIOS.filter(j => j.status === "aberto").forEach(j => {
    const opt = document.createElement("option");
    opt.value = j.id;
    opt.textContent = `${j.nome} (${j.sigla})`;
    selectJogo.appendChild(opt);
  });

  // Seleções prévias caso venha de um botão direto
  if (alunoIdPreSelecionado) {
    selectAluno.value = alunoIdPreSelecionado;
  }
  if (jogoIdPreSelecionado) {
    selectJogo.value = jogoIdPreSelecionado;
  }

  aoMudarAlunoSelecionado();
  aoMudarJogo();

  modal.classList.remove("hidden");
}

function fecharModalInscricao() {
  document.getElementById("modal-inscricao").classList.add("hidden");
  document.getElementById("form-inscricao").reset();
}

function aoMudarAlunoSelecionado() {
  const alunoId = document.getElementById("select-aluno").value;
  const hint = document.getElementById("info-aluno-status");
  const aluno = BANCO_ALUNOS.find(a => a.id === alunoId);

  if (!aluno) {
    hint.textContent = "";
    return;
  }

  if (aluno.status !== "regular") {
    hint.innerHTML = `<span style="color: #ef4444;">⚠️ Aluno com matrícula trancada! Não apto para competir.</span>`;
  } else if (!aluno.atestadoValido) {
    hint.innerHTML = `<span style="color: #f59e0b;">⚠️ Atenção: Atestado médico ausente/vencido. Apresentar até a data do jogo.</span>`;
  } else {
    hint.innerHTML = `<span style="color: #10b981;">✅ Aluno regular com atestado válido.</span>`;
  }
}

function aoMudarJogo() {
  const jogoId = document.getElementById("select-jogo").value;
  const selectMod = document.getElementById("select-modalidade");
  selectMod.innerHTML = `<option value="">-- Selecione uma modalidade --</option>`;

  const jogo = JOGOS_UNIVERSITARIOS.find(j => j.id === jogoId);
  if (!jogo) return;

  jogo.modalidades.forEach(m => {
    const lotado = m.vagasOcupadas >= m.vagasTotais;
    const opt = document.createElement("option");
    opt.value = m.id;
    opt.textContent = `${m.nome} (${m.vagasOcupadas}/${m.vagasTotais} vagas) ${lotado ? '[LOTADO]' : ''}`;
    if (lotado) opt.disabled = true;
    selectMod.appendChild(opt);
  });
}

function salvarInscricao(event) {
  event.preventDefault();

  const alunoId = document.getElementById("select-aluno").value;
  const jogoId = document.getElementById("select-jogo").value;
  const modalidadeId = document.getElementById("select-modalidade").value;
  const obs = document.getElementById("input-obs").value;

  const alerta = document.getElementById("modal-alerta");

  // Validação 1: Seleções obrigatórias
  if (!alunoId || !jogoId || !modalidadeId) {
    mostrarErroModal("Preencha todos os campos obrigatórios.");
    return;
  }

  const aluno = BANCO_ALUNOS.find(a => a.id === alunoId);
  const jogo = JOGOS_UNIVERSITARIOS.find(j => j.id === jogoId);
  const modalidade = jogo ? jogo.modalidades.find(m => m.id === modalidadeId) : null;

  // Validação 2: Status do aluno
  if (aluno.status !== "regular") {
    mostrarErroModal(`O aluno ${aluno.nome} está com matrícula TRANCADA e não pode ser inscrito.`);
    return;
  }

  // Validação 3: Duplicação de inscrição
  const jaInscrito = inscricoes.some(
    i => i.alunoId === aluno.id && i.modalidadeId === modalidade.id
  );
  if (jaInscrito) {
    mostrarErroModal(`O aluno ${aluno.nome} já está inscrito em ${modalidade.nome} deste torneio!`);
    return;
  }

  // Validação 4: Vagas
  if (modalidade.vagasOcupadas >= modalidade.vagasTotais) {
    mostrarErroModal(`Vagas esgotadas para ${modalidade.nome}.`);
    return;
  }

  // Realiza a inscrição
  modalidade.vagasOcupadas++;

  const novaInscricao = {
    id: `ins-${Date.now()}`,
    data: new Date().toISOString().split("T")[0],
    alunoId: aluno.id,
    alunoNome: aluno.nome,
    alunoMatricula: aluno.matricula,
    alunoCurso: aluno.curso,
    jogoId: jogo.id,
    jogoNome: jogo.nome,
    modalidadeId: modalidade.id,
    modalidadeNome: modalidade.nome,
    status: "Confirmada",
    obs: obs.trim()
  };

  inscricoes.unshift(novaInscricao);
  salvarLocalStorage();

  renderJogos();
  renderInscricoes();
  fecharModalInscricao();

  trocarAba("inscricoes");
}

function mostrarErroModal(msg) {
  const alerta = document.getElementById("modal-alerta");
  alerta.className = "alert alert-danger";
  alerta.textContent = msg;
}

// ==========================================
// 7. INICIALIZAÇÃO DA APLICAÇÃO
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  renderAlunos();
  renderJogos();
  renderInscricoes();
});
