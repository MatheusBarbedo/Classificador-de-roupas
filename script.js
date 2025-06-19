let model, maxPredictions, cocoModel;
let imageElement = null;
let lastImage = null;
const canvas = document.getElementById("canvas");
const ctx = canvas?.getContext("2d");
const output = document.getElementById("output");

const MODEL_URL = "./my_model/";
let classificadorCarregado = false;
let detectorCarregado = false;

function showSection(id) {
  document.querySelectorAll('.page-section').forEach(sec => sec.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');

  if (id === "classificador" && !classificadorCarregado) {
    carregarClassificador();
  }
  if (id === "detector" && !detectorCarregado) {
    carregarDetector();
  }
}

async function carregarClassificador() {
  document.getElementById("status-classificador").classList.remove("hidden");
  document.querySelector("#classificador .content-wrapper").classList.add("hidden");

  const modelURL = MODEL_URL + "model.json";
  const metadataURL = MODEL_URL + "metadata.json";
  model = await tmImage.load(modelURL, metadataURL);
  maxPredictions = model.getTotalClasses();

  const labelContainer = document.getElementById("label-container");
  labelContainer.innerHTML = "";
  for (let i = 0; i < maxPredictions; i++) {
    labelContainer.appendChild(document.createElement("div"));
  }

  classificadorCarregado = true;
  document.getElementById("status-classificador").classList.add("hidden");
  document.querySelector("#classificador .content-wrapper").classList.remove("hidden");
}

async function carregarDetector() {
  document.getElementById("status-detector").classList.remove("hidden");
  document.querySelector("#detector .content-wrapper").classList.add("hidden");

  cocoModel = await cocoSsd.load();
  detectorCarregado = true;

  document.getElementById("status-detector").classList.add("hidden");
  document.querySelector("#detector .content-wrapper").classList.remove("hidden");
}

function handleImageUpload(event) {
  const reader = new FileReader();
  reader.onload = function () {
    imageElement = new Image();
    imageElement.src = reader.result;
    imageElement.onload = () => {
      document.getElementById("preview").src = reader.result;
    };
  };
  reader.readAsDataURL(event.target.files[0]);
}

async function classificar() {
  if (!imageElement || !model) return;
  const prediction = await model.predict(imageElement);
  prediction.sort((a, b) => b.probability - a.probability);
  const container = document.getElementById("label-container");
  container.innerHTML = "";
  prediction.forEach(pred => {
    const text = `${pred.className}: ${(pred.probability * 100).toFixed(2)}%`;
    const div = document.createElement("div");
    div.textContent = text;
    container.appendChild(div);
  });
}

function handleCOCOUpload(event) {
  const file = event.target.files[0];
  if (!file || !cocoModel) return;

  const img = new Image();
  const imageURL = window.URL.createObjectURL(file);
  img.src = imageURL;

  img.onload = () => {
    lastImage = img;
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);
    output.textContent = "";
  };
}

function classificarCOCO() {
  if (lastImage && cocoModel) {
    cocoModel.detect(lastImage).then(predictions => {
      drawDetections(predictions, lastImage);
    });
  }
}

function drawDetections(predictions, img) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0);
  predictions.forEach(pred => {
    const [x, y, width, height] = pred.bbox;
    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, width, height);
    ctx.fillStyle = "red";
    ctx.font = "14px Arial";
    ctx.fillText(`${pred.class} (${(pred.score * 100).toFixed(1)}%)`, x, y > 10 ? y - 5 : y + 15);
  });
  output.textContent = JSON.stringify(predictions, null, 2);
}

function downloadCanvas() {
  const link = document.createElement("a");
  link.download = "detecao-coco-ssd.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}