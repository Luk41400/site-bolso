# 🏛️ Família Bolsonaro: Guia Informativo & Dossiê 2026

Um portal web moderno, interativo e factual com o raio-x completo dos principais membros da família Bolsonaro: mandatos, eleições de 2026, processos judiciais no STF e fontes jornalísticas auditadas.

🔗 **Deploy automático:** Vercel e GitHub Pages.

---

## ✨ Recursos & Funcionalidades

- **Design Premium & Responsivo:** Interface construída com tipografia de impacto (*Plus Jakarta Sans* e *Inter*), microinterações fluidas e suporte nativo a dispositivos móveis e desktops.
- **Dark Mode & Light Mode:** Alternância dinâmica de tema com persistência automática no `localStorage`.
- **Fotos Oficiais em Alta Definição:** Imagens otimizadas para carregamento instantâneo de cada um dos 6 membros.
- **Barra de Busca em Tempo Real:** Pesquisa rápida com atalho de teclado `/` que filtra os perfis e os dados instantaneamente.
- **Métricas & Contadores Animados:** Painel de indicadores com contagem interativa de cargos, mandatos e decisões judiciais.
- **Filtros por Categoria:** Navegue facilmente entre "Todos", "Eleitos & Senadores", "Processos Judiciais" e "Executivo".
- **Dossiê com Detalhes Expansíveis:** Cartões detalhados com histórico, tags institucionais e botão rápido para copiar resumos.
- **Linha do Tempo Recente (2025–2026):** Cronologia visual com animação ativada pelo scroll da página (*IntersectionObserver*).
- **Versões em Disputa:** Comparativo neutro e balanceado entre os argumentos da acusação/STF e da defesa/aliados.
- **Checagem de Fontes:** Acesso direto às matérias e decisões judiciais catalogadas.

---

## 📁 Estrutura de Arquivos

```text
├── assets/
│   └── images/          # Retratos oficiais otimizados para web
├── favicon.svg          # Ícone vetorial da aplicação
├── index.html           # Estrutura semântica da aplicação
├── script.js            # Lógica interativa, busca, tema e animações
├── style.css            # Design System, variáveis CSS, temas e animações
└── README.md            # Documentação do projeto
```

---

## 🚀 Como Executar Localmente

Como o projeto é desenvolvido em HTML5, CSS3 e JavaScript puro, não é necessário instalar dependências ou executar builds:

1. Clone o repositório:
   ```bash
   git clone https://github.com/Luk41400/site-bolso.git
   cd site-bolso
   ```
2. Abra o arquivo `index.html` em qualquer navegador moderno, ou utilize um servidor local:
   ```bash
   # Com Node.js / npx:
   npx serve .

   # Com Python:
   python -m http.server 3000
   ```

---

## 🌐 Publicação & Deploy

- **Vercel:** Conectado diretamente à branch `main`. Cada novo `git push` dispara o deploy contínuo automaticamente.
- **GitHub Pages:** Pode ser ativado nas configurações do repositório (*Settings → Pages → Branch: main / root*).

---

## ⚖️ Nota de Neutralidade

Este projeto possui finalidade estritamente documental, educativa e jornalística, sem qualquer afiliação partidária ou governamental. Todas as informações são embasadas em processos públicos e reportagens com fontes citadas.
