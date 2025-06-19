# 👕 Classificador de Roupas 
# 🔍 Detector de objetos

Este projeto é uma aplicação web interativa que permite:

- 👗 **Classificar roupas** a partir de imagens (camisa, calça, casaco, vestido)  
- 🔍 **Detectar objetos** em imagens utilizando o modelo pré-treinado **COCO-SSD**

Tudo isso diretamente no navegador, sem necessidade de backend ou instalação de bibliotecas.

---

## 🚀 Funcionalidades

| Módulo           | Descrição |
|------------------|----------|
| 👕 **Classificador** | Utiliza modelo treinado no [Teachable Machine](https://teachablemachine.withgoogle.com/) para identificar o tipo de roupa enviado pelo usuário |
| 🖼 **Detector**      | Usa o modelo [COCO-SSD](https://github.com/tensorflow/tfjs-models/tree/master/coco-ssd) do TensorFlow.js para detectar e rotular objetos em uma imagem |

---

## 🧠 Modelo de Classificação

O modelo foi treinado com imagens reais de roupas e exportado para web usando a Teachable Machine.

Ele é composto por:

- `model.json` – estrutura do modelo
- `metadata.json` – metadados e nomes das classes
- `weights.bin` – pesos da rede neural

---

## 🛠 Tecnologias Utilizadas

- HTML5 + CSS3 + JavaScript (vanilla)
- [TensorFlow.js](https://www.tensorflow.org/js)
- [Teachable Machine](https://teachablemachine.withgoogle.com/)
- [COCO-SSD](https://github.com/tensorflow/tfjs-models/tree/master/coco-ssd)

---

## 📁 Estrutura do Projeto

```
classificador-roupas/
│
├── index.html               # Página principal com navegação entre os módulos
├── style.css                # Estilo visual responsivo e moderno
├── script.js                # Lógica principal da aplicação
│
├── my_model/                # Modelo treinado com Teachable Machine
│   ├── model.json
│   ├── metadata.json
│   └── weights.bin
```

---

## ▶️ Como Executar Localmente

⚠️ Por se tratar de uma aplicação que carrega arquivos via JavaScript, **é obrigatório usar um servidor local** (como o Live Server).

### ✅ Requisitos

- Navegador moderno (Chrome, Brave, Firefox...)
- [VS Code](https://code.visualstudio.com/)
- Extensão [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)

### 📦 Passo a Passo

1. Clone este repositório:
   ```bash
   git clone https://github.com/MatheusBarbedo/classificador-e-detector-web.git
   ```
2. Abra o projeto no VS Code  
3. Instale a extensão **Live Server**  
4. Clique em **"Go Live"** no canto inferior direito  
5. O navegador abrirá em `http://127.0.0.1:5500` e você poderá utilizar as funcionalidades

---

## ❌ Evite abrir com duplo clique

A aplicação **não funcionará corretamente** se você abrir o `index.html` direto com duplo clique, pois os navegadores bloqueiam o carregamento de arquivos locais (`file://`).

> Use sempre um servidor local (Live Server, http-server, etc).

---

## 📄 Licença

Este projeto é open-source e livre para fins educacionais e experimentais.
