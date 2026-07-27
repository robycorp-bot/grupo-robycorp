# usuario.senior

Landing page institucional da **usuario.senior**, criada para apresentar serviços de tecnologia, tráfego pago, marketing digital e consultoria. O projeto é uma aplicação React leve, totalmente front-end e preparada para hospedagem estática, incluindo GitHub Pages.

## O que o site apresenta

- Posicionamento e proposta de valor da empresa.
- Serviços de Tecnologia & Web, Tráfego Pago e Consultoria Digital.
- Espaço institucional para visão, missão, valores e propósito.
- Apresentação do S.E.O. e espaço para o futuro link da trajetória pessoal.
- Chamada para orçamento pelo WhatsApp Business.
- Botão de Instagram preparado para receber a URL oficial.
- Layout responsivo, com menu mobile, animações de entrada e botão flutuante de WhatsApp.

## Tecnologias

- [React](https://react.dev/) para construção da interface.
- [Vite](https://vite.dev/) para desenvolvimento e geração do build de produção.
- CSS puro para design responsivo, efeitos e animações. Não há bibliotecas visuais pesadas.

## Estrutura do projeto

```text
usuario-senior/
├── src/
│   ├── assets/
│   │   └── images/             # Imagens oficiais utilizadas no site
│   │       ├── bannerYoutubeOficial.png
│   │       ├── celularOficial.png
│   │       ├── logoOficial.png
│   │       └── mascoteOficial.png
│   ├── main.jsx                # Estrutura, textos, links e comportamento React
│   └── styles.css              # Design, layout responsivo e animações
├── index.html                  # Documento HTML base e metadados para buscadores
├── package.json                # Dependências e comandos do projeto
├── package-lock.json           # Versões exatas das dependências instaladas
├── .gitignore                  # Arquivos e pastas que não devem ir ao Git
└── dist/                       # Site estático gerado para publicação (ignorado pelo Git)
```

## Como executar localmente

### 1. Instalar as dependências

```powershell
npm.cmd install
```

> No PowerShell deste ambiente, utilize `npm.cmd` em vez de `npm`, pois a execução de scripts do PowerShell está desabilitada.

### 2. Iniciar o servidor de desenvolvimento

```powershell
npm.cmd run dev
```

Abra o endereço informado no terminal, geralmente `http://localhost:5173/`.

Não utilize a extensão Live Server para desenvolver este projeto. Ela serve o `index.html` puro, enquanto o React precisa que o Vite processe os módulos e dependências.

### 3. Gerar a versão de produção

```powershell
npm.cmd run build
```

O resultado será criado em `dist/`. Esta é a versão otimizada para hospedar.

### 4. Visualizar o build de produção

```powershell
npm.cmd run preview
```

## Personalizações frequentes

### WhatsApp

O telefone está centralizado no início de `src/main.jsx`:

```js
const phone = '5517997725254'
```

O valor deve ser mantido no formato internacional, sem `+`, espaços ou pontuação. Ele alimenta todos os botões de WhatsApp e o link de orçamento.

### Instagram e história do S.E.O.

Os dois links estão temporariamente como `#` em `src/main.jsx`. Substitua pelo endereço definitivo quando estiver disponível:

- `Conheça minha história`: link para o futuro site sobre a trajetória do S.E.O.
- `Instagram`: link para o perfil oficial da empresa.

### Textos institucionais

Todos os textos de página estão em `src/main.jsx`. Procure pelas seções:

- `O que fazemos`
- `Nossas frentes`
- `Nossa essência`
- `Por que estamos aqui?`
- `Prazer, eu sou o S.E.O.`

### Imagens

As imagens ficam em `src/assets/images/` e são importadas no começo de `src/main.jsx`. Para trocar uma imagem, substitua o arquivo ou atualize o respectivo `import`.

## Animações e experiência mobile

As animações de revelação usam `IntersectionObserver`, uma API nativa do navegador, e não adicionam dependências ao projeto. O menu adapta-se a telas menores, os blocos reorganizam-se em coluna e os CTAs mantêm áreas de toque confortáveis no celular.

## Publicação no GitHub Pages

O projeto é estático e pode ser publicado no GitHub Pages após executar o build. A abordagem mais segura é configurar uma GitHub Action para executar `npm ci` e `npm run build`, publicando o conteúdo de `dist/` automaticamente.

`node_modules/` e `dist/` são ignorados no Git porque podem ser reconstruídos. Já `package.json` e `package-lock.json` devem ser versionados.

## Comandos disponíveis

| Comando | Finalidade |
| --- | --- |
| `npm.cmd install` | Baixa as dependências do projeto. |
| `npm.cmd run dev` | Inicia o ambiente de desenvolvimento. |
| `npm.cmd run build` | Gera arquivos estáticos otimizados em `dist/`. |
| `npm.cmd run preview` | Serve localmente o conteúdo gerado em `dist/`. |
