# RexxGames

Hub dos meus jogos, hospedado como site estático (GitHub Pages).

## Como adicionar um jogo novo

1. Duplique a pasta `jogos/exemplo` e renomeie (ex: `jogos/meu-jogo`).
2. Coloque o jogo dentro (o `index.html` daquela pasta é a porta de entrada).
3. Abra `js/app.js` e adicione um item no array `GAMES`, copiando o formato dos outros:

```js
{
  id: 'meu-jogo',
  title: 'Meu Jogo',
  genre: 'ação',        // aparece como tag e também vira filtro
  accent: 'var(--teal)', // cor do cartucho: var(--red), var(--purple), var(--teal), var(--amber), ou um hex novo
  desc: 'Descrição curta, uma frase.',
  path: 'jogos/meu-jogo/index.html'
}
```

Não precisa mexer no HTML — o grid é gerado automaticamente a partir desse array.

## Banner / vitrine

Também em `js/app.js`, no objeto `BANNER` no topo: troque `image`, `link` e `label`.
Imagem ideal: ~1200x300px.

## Cores disponíveis

Definidas em `css/style.css` no `:root`: `--red`, `--purple`, `--teal`, `--amber`, `--gold`.
Pode usar uma dessas ou passar um hex direto no campo `accent`.
