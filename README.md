# ♻️ descartAR

Aplicativo educacional que utiliza **Realidade Aumentada** para auxiliar no aprendizado sobre o descarte correto de resíduos.

O projeto foi desenvolvido no contexto da **UPX 8** com foco em sustentabilidade, educação ambiental e uso de tecnologia interativa para melhorar a compreensão sobre a separação correta do lixo.

---

## 🌱 Sobre o projeto

O **descartAR** é uma aplicação mobile desenvolvida para tornar o processo de aprendizagem sobre descarte de resíduos mais visual, interativo e prático.

Por meio da câmera do celular e de elementos 3D em Realidade Aumentada, o usuário recebe diferentes resíduos e deve escolher a lixeira correta para realizar o descarte.

A proposta é transformar um conteúdo normalmente apresentado de forma teórica em uma experiência interativa.

---

## 🎯 Objetivo

O principal objetivo do projeto é:

> Utilizar Realidade Aumentada como ferramenta de apoio à educação ambiental, auxiliando usuários a identificar corretamente a categoria de descarte de diferentes tipos de resíduos.

Além disso, o projeto busca:

- incentivar práticas sustentáveis;
- melhorar a compreensão sobre coleta seletiva;
- identificar categorias que geram maior confusão;
- registrar dados das sessões realizadas;
- permitir análise dos resultados obtidos.

---

## ❗ Problema

Mesmo em ambientes educacionais, ainda existem dificuldades relacionadas à separação correta dos resíduos.

Alguns materiais podem gerar dúvidas entre categorias como:

- plástico;
- papel;
- vidro;
- metal;
- orgânico;
- rejeito.

O descarte incorreto pode contaminar materiais recicláveis e dificultar processos de coleta seletiva e reciclagem.

O **descartAR** busca trabalhar esse problema através de uma experiência educacional interativa.

---

## 📱 Como funciona

O fluxo principal da aplicação é:

1. O participante informa seu identificador.
2. Seleciona um banco de questões.
3. Recebe instruções antes de iniciar.
4. A câmera é aberta em modo de Realidade Aumentada.
5. As lixeiras são exibidas em 3D.
6. Um resíduo é apresentado ao participante.
7. O usuário toca na lixeira que considera correta.
8. O aplicativo informa se a resposta está correta ou incorreta.
9. A sessão continua até todos os resíduos serem apresentados.
10. Ao final, o aplicativo gera um resumo da sessão.

---

## 🗑️ Categorias de descarte

O aplicativo trabalha com seis categorias:

| Categoria | Cor |
|---|---|
| Papel | 🔵 Azul |
| Plástico | 🔴 Vermelho |
| Vidro | 🟢 Verde |
| Metal | 🟡 Amarelo |
| Orgânico | 🟤 Marrom |
| Rejeito | ⚪ Cinza |

As cores das lixeiras são mantidas separadas da identidade visual da interface para evitar que outros elementos da tela influenciem a resposta do participante.

---

## ✨ Principais funcionalidades

- câmera em Realidade Aumentada;
- renderização de lixeiras 3D;
- interação por toque;
- quiz de descarte de resíduos;
- banco de questões;
- feedback de resposta correta ou incorreta;
- justificativa após resposta;
- opção de pular item;
- contador de progresso;
- saída segura da sessão;
- tela de resultado;
- registro de erros e acertos;
- matriz de confusão entre categorias;
- registro de duração da sessão;
- exportação dos dados em JSON.

---

## 🥽 Realidade Aumentada

A experiência de AR é construída utilizando **ViroReact**.

As lixeiras são renderizadas como elementos 3D sobre a imagem real da câmera do celular.

Atualmente, os objetos acompanham a orientação da câmera, permitindo que o participante continue visualizando as lixeiras enquanto movimenta o aparelho.

Também está prevista a utilização de uma **âncora visual por QR Code** para iniciar a experiência em Realidade Aumentada.

---

## 🧠 Interação

Durante os testes de desenvolvimento, a interação diretamente sobre os objetos 3D apresentou baixa precisão em alguns dispositivos.

Para melhorar a experiência do usuário, a aplicação utiliza:

- **ViroReact** para renderização dos objetos 3D;
- **React Native Pressable** para capturar os toques do participante.

Dessa forma, a experiência permanece em Realidade Aumentada, mas a interação se torna mais estável e confortável.

---

## 🛠️ Tecnologias utilizadas

### Aplicação

- React Native
- TypeScript
- TSX

### Realidade Aumentada

- ViroReact
- ARCore

### Android

- Kotlin
- Gradle
- Android SDK

### Design

- Figma

### Análise de dados

- JSON
- Power BI

### Versionamento

- Git
- GitHub

---

## 📚 Principais bibliotecas

```txt
react-native
@reactvision/react-viro
react
