/* ===================================================================
   REXX GAMES — configuração do site
   Pra adicionar um jogo novo: copie um objeto do array GAMES abaixo,
   troque os campos e pronto. Não precisa mexer no HTML.
   =================================================================== */

const BANNER = {
  image: 'assets/banner-placeholder.png', // troque pela imagem real (ideal: 1200x300px)
  link: 'https://example.com',
  label: 'vitrine'
};

const GAMES = [
  {
    id: 'rampage',
    title: 'Rampage',
    genre: 'ação',
    accent: 'var(--red)',
    desc: 'Vire um monstro gigante e destrua a cidade inteira. Ação pura, sem freio.',
    path: 'jogos/rampage/index.html'
  },
  {
    id: 'forbidden-duel',
    title: 'Forbidden Duel',
    genre: 'cartas',
    accent: 'var(--steel)',
    desc: 'Duelo de cartas estilo Yu-Gi-Oh, com fusões e mais de 60 cartas pra montar seu deck.',
    path: 'jogos/forbidden-duel/index.html'
  },
  {
    id: 'dragon-wings',
    title: 'Dragon Wings',
    genre: 'shooter',
    accent: 'var(--fire)',
    desc: 'Shmup bullet-heaven: desvie de padrões de tiro, suba de nível e enfrente chefes.',
    path: 'jogos/dragon-wings/index.html'
  },
  {
    id: 'navinha-arcade',
    title: 'Navinha Arcade',
    genre: 'shooter',
    accent: 'var(--fire)',
    desc: 'Shmup de 10 fases: resgate aliados, colete upgrades e enfrente um chefe por fase.',
    path: 'jogos/navinha-arcade/index.html'
  },
  {
    id: 'exemplo',
    title: 'Jogo Exemplo',
    genre: 'template',
    accent: 'var(--steel-dim)',
    desc: 'Modelo em branco pra você copiar quando for montar um jogo novo.',
    path: 'jogos/exemplo/index.html'
  }
];

// ---------------------------------------------------------------------

function renderBanner(){
  const link = document.getElementById('merchLink');
  const img = document.getElementById('merchImg');
  const tag = document.getElementById('bannerTag');
  link.href = BANNER.link;
  img.src = BANNER.image;
  tag.textContent = BANNER.label;
}

function cardHTML(game){
  return `
    <a class="card" href="${game.path}" style="--accent:${game.accent}" data-genre="${game.genre}" data-title="${game.title.toLowerCase()}">
      <span class="tag">${game.genre}</span>
      <h2>${game.title}</h2>
      <p>${game.desc}</p>
      <span class="play">▶ jogar</span>
    </a>
  `;
}

function ghostCardHTML(){
  return `
    <div class="card ghost">
      <span class="plus">+</span>
      <small>novo jogo?<br>edite o array GAMES<br>em js/app.js</small>
    </div>
  `;
}

function renderGames(list){
  const grid = document.getElementById('games');
  const empty = document.getElementById('emptyState');
  if(list.length === 0){
    grid.innerHTML = '';
    empty.style.display = 'block';
    return;
  }
  empty.style.display = 'none';
  grid.innerHTML = list.map(cardHTML).join('') + ghostCardHTML();
}

function renderFilters(){
  const genres = ['todos', ...new Set(GAMES.map(g => g.genre))];
  const wrap = document.getElementById('filters');
  wrap.innerHTML = genres.map((g,i) =>
    `<button class="filter-btn${i===0?' active':''}" data-genre="${g}">${g}</button>`
  ).join('');
}

function applyFilters(){
  const term = document.getElementById('search').value.trim().toLowerCase();
  const activeBtn = document.querySelector('.filter-btn.active');
  const genre = activeBtn ? activeBtn.dataset.genre : 'todos';

  const filtered = GAMES.filter(g => {
    const matchesGenre = genre === 'todos' || g.genre === genre;
    const matchesTerm = g.title.toLowerCase().includes(term);
    return matchesGenre && matchesTerm;
  });

  renderGames(filtered);
}

document.addEventListener('DOMContentLoaded', () => {
  renderBanner();
  renderFilters();
  renderGames(GAMES);

  document.getElementById('search').addEventListener('input', applyFilters);

  document.getElementById('filters').addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if(!btn) return;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    applyFilters();
  });
});
