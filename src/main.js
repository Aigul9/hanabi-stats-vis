"use strict";

import { DB_PATH, DB_USER, DB_PASSWORD } from "./constants.js";

var viz;
const empty = "Field is empty.",
  limit = "Limit must be a number.",
  exist = "Incorrect query.";

function verify() {
  const radioPlayer = document.getElementById("radioPlayer");
  const radioRecords = document.getElementById("radioRecords");
  const radioFull = document.getElementById("radioFull");
  const textPlayer = document.getElementById("textPlayer").value;
  const textRecords = document.getElementById("textRecords").value;

  if (
    (textPlayer === null || textPlayer === "") &&
    (textRecords === null || textRecords === "") &&
    radioFull.checked
  ) {
    const cypher = "MATCH (n)-[r:REL]->(m) RETURN * ";
    document.getElementById("message").classList.add("not-visible");
    return cypher;
  } else if (
    radioRecords.checked &&
    textRecords !== null &&
    textRecords !== ""
  ) {
    if (isInt(+textRecords)) {
      const cypher = `MATCH (n)-[r:REL]->(m) RETURN * LIMIT ${textRecords}`;
      document.getElementById("message").classList.add("not-visible");
      return cypher;
    } else {
      document.getElementById("message").innerHTML = limit;
      document.getElementById("message").classList.remove("not-visible");
      document.getElementById("message").classList.add("visible");
      return false;
    }
  } else if (radioPlayer.checked && textPlayer !== null && textPlayer !== "") {
    const cypher = `MATCH (p {name: '${textPlayer}'})-[r]-(t) RETURN p, r, t`;
    document.getElementById("message").classList.add("not-visible");
    return cypher;
  } else {
    document.getElementById("message").innerHTML = empty;
    document.getElementById("message").classList.remove("not-visible");
    document.getElementById("message").classList.add("visible");
    return false;
  }
}

function isInt(num) {
  return Number.isInteger(num);
}

function draw() {
  console.log("draw");
  var res = verify();
  if (!res) {
    return;
  }
  var config = {
    container_id: "viz",
    server_url: DB_PATH,
    server_user: DB_USER,
    server_password: DB_PASSWORD,
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
    initial_cypher: res,
  };

  try {
    console.log(res);
    viz = new NeoVis.default(config);
    viz.render();
    const details = document.querySelector("details");
    details.open = false;
  } catch (e) {
    console.log(e);
    document.getElementById("message").innerHTML = exist;
    document.getElementById("message").classList.remove("not-visible");
    document.getElementById("message").classList.add("visible");
  }
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

  button.keyup = function (e) {
    if (et.keyCode === 13) {
      e.preventDefault();
      draw();
    }
  };
};
