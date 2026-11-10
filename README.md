# Família Bolsonaro: guia informativo

Site estático (HTML + CSS, sem build) com um resumo factual sobre os principais membros da família Bolsonaro e a situação de cada um. Conteúdo atualizado em 10 de novembro de 2026, com fontes listadas na própria página.

## Estrutura

```
index.html   página única
style.css    estilos
```

## Rodar localmente

Abra o `index.html` no navegador, ou rode `npx serve .` na pasta.

## Publicar no GitHub

```bash
cd site-familia-bolsonaro
git init
git add .
git commit -m "Primeira versão do site"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/site-familia-bolsonaro.git
git push -u origin main
```

(Crie antes o repositório vazio em github.com/new.)

## Publicar na Vercel

1. Em vercel.com, clique em **Add New → Project** e importe o repositório.
2. Em **Framework Preset**, deixe **Other**. Não precisa de build command nem de output directory.
3. Clique em **Deploy**.

A cada `git push` na branch `main`, a Vercel publica a nova versão automaticamente.

## Manter atualizado

As informações mudam rápido (processos, mandatos, prisões). Revise o texto e as fontes de tempos em tempos e atualize a data no topo da página.
