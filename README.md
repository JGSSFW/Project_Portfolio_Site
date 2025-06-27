# **Portfólio de Desenvolvedor \- Jean Schram**

Bem-vindo ao repositório do meu portfólio pessoal\! Este é um site de página única (SPA \- Single Page Application) criado para apresentar as minhas habilidades, projetos e informações de contato de uma forma moderna, interativa e totalmente responsiva.

[**Acesse a versão ao vivo aqui\!**](https://jgssfw.github.io/Project_Portfolio_Site/)

## **✨ Funcionalidades Principais**

Este portfólio foi construído com várias funcionalidades dinâmicas para criar uma experiência de utilizador única:

* **Tema Dark/Light:** Um botão de alternância permite que o visitante escolha entre um tema claro ou escuro, e a sua preferência é guardada no navegador.  
* **Integração com a API do GitHub:** A secção de "Projetos Recentes" e a secção de "Habilidades" são preenchidas dinamicamente a partir dos meus repositórios públicos, garantindo que o portfólio esteja sempre atualizado.  
* **Carrossel de Projetos:** Navegue por todos os meus projetos de forma fluida com um carrossel responsivo.  
* **Internacionalização (i18n):** O conteúdo do site pode ser alternado entre Português (PT-BR) e Inglês (EN-US) com um único clique.  
* **Animações Modernas:**  
  * **Tela de Abertura:** Uma animação de introdução com efeito de "vidro" e saudações em vários idiomas.  
  * **Título Animado:** O título principal da página alterna entre diferentes saudações.  
  * **Efeitos de Hover:** Vários elementos, como a foto de perfil e os botões, têm transições suaves e interativas.  
  * **Barra de Rolagem Personalizada:** Uma barra de rolagem fina e animada que mostra o progresso da leitura da página.  
* **Design Totalmente Responsivo:** O layout adapta-se perfeitamente a qualquer dispositivo, desde telemóveis a desktops.

## **🚀 Tecnologias Utilizadas**

Este projeto foi construído do zero, focando em performance e nas tecnologias web fundamentais, sem o uso de frameworks JavaScript complexos.

* **HTML5:** Estrutura semântica do conteúdo.  
* **CSS3:** Estilização e animações.  
  * **Tailwind CSS:** Framework utilitário para agilizar o desenvolvimento do layout e do design responsivo.  
  * **CSS Personalizado:** Para detalhes finos como a paleta de cores, a barra de rolagem e animações `@keyframes`.  
* **JavaScript (Vanilla JS):** Utilizado para toda a interatividade e lógica do lado do cliente, incluindo:  
  * Manipulação do DOM.  
  * Consumo da API do GitHub (`fetch`).  
  * Gestão de eventos (cliques, hover, scroll).  
  * Gestão de estado para os temas e idiomas (`localStorage`).

## **📁 Estrutura do Projeto**

O projeto está organizado na seguinte estrutura de pastas para uma fácil manutenção:

seu-portfolio/  
├── 📄 index.html  
├── 📁 css/  
│   └── 📄 style.css  
├── 📁 js/  
│   └── 📄 main.js  
└── 📁 assets/  
    └── 📁 images/  
        ├── 🖼️ foto-perfil-1.jpeg  
        └── 🖼️ foto-perfil-2.jpeg

## **🛠️ Como Utilizar**

Se você quiser usar este projeto como um modelo para o seu próprio portfólio, siga estes passos:

1. **Faça um Fork do Repositório:** Clique no botão "Fork" no canto superior direito desta página para criar uma cópia no seu próprio GitHub.  
2. **Altere as Informações:**  
   * **No `index.html`:**  
     * Altere os links para o seu **GitHub**, **LinkedIn**, **WhatsApp** e **e-mail**.  
     * Substitua os links das suas fotos de perfil na secção "Sobre Mim".  
   * **No `js/main.js`:**  
     * Na função `fetchGitHubProjects`, mude a variável `username` para o seu nome de utilizador do GitHub.  
     * Atualize o objeto `manualDemoLinks` com os links das demos dos seus próprios projetos.  
3. **Publique com o GitHub Pages:**  
   * Vá a `Settings > Pages` no seu repositório.  
   * Selecione o ramo `main` (ou `master`) como fonte e clique em "Save".  
   * O seu novo portfólio estará online em poucos minutos\!

