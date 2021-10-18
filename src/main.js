"use strict";

require("dotenv").config();

var viz;

function verify() {
  const textPlayer = document.getElementById("textPlayer").value;
  const textRecords = document.getElementById("textRecords").value;
  console.log(textPlayer, textRecords);
  if (
    (textPlayer === null || textPlayer === "") &&
    (textRecords === null || textRecords === "")
  ) {
    console.log("both fields are empty");
    return false;
  } else return true;
}

function draw() {
  console.log("draw");
  if (!verify()) {
    return;
  }
  var config = {
    container_id: "viz",
    server_url: process.env.PATH,
    server_user: process.env.USER,
    server_password: process.env.PASSWORD,
    labels: {
      Player: {
        caption: "name",
      },
    },
    relationships: {
      REL: {
        thickness: "weight",
        caption: "weight",
      },
    },
    initial_cypher: "MATCH (n)-[r:REL]->(m) RETURN * LIMIT 25",
  };

  viz = new NeoVis.default(config);
  viz.render();
}

function handleChange() {
  const radioPlayer = document.getElementById("radioPlayer");
  const radioRecords = document.getElementById("radioRecords");
  const radioFull = document.getElementById("radioFull");
  var textPlayer = document.getElementById("textPlayer");
  var textRecords = document.getElementById("textRecords");

  if (radioPlayer.checked) {
    textPlayer.disabled = false;
    textRecords.disabled = true;
    textRecords.value = "";
  } else if (radioRecords.checked) {
    textRecords.disabled = false;
    textPlayer.disabled = true;
    textPlayer.value = "";
  } else if (radioFull.checked) {
    textPlayer.disabled = true;
    textRecords.disabled = true;
    textPlayer.value = "";
    textRecords.value = "";
  }
}

window.onload = function () {
  document
    .getElementById("radioPlayer")
    .addEventListener("change", handleChange);
  document
    .getElementById("radioRecords")
    .addEventListener("change", handleChange);
  document.getElementById("radioFull").addEventListener("change", handleChange);
  const button = document.querySelector(".trigger");
  button.onclick = function (e) {
    e.preventDefault();
    draw();
  };
};
