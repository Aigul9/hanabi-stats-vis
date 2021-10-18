"use strict";

import { DB_PATH, DB_USER, DB_PASSWORD } from "./constants.js";

// const neo4j = require("neo4j-driver");

// const driver = neo4j.driver(DB_PATH, neo4j.auth.basic(DB_USER, DB_PASSWORD));
// const session = driver.session()

var viz;
const empty = "Field is empty.",
  limit = "Incorrect number.",
  exist = "Incorrect query.";

function showError(text) {
  console.log("error");
  document.getElementById("message").innerHTML = text;
  document.getElementById("message").classList.remove("not-visible");
  document.getElementById("message").classList.add("visible");
}

function disable(item) {
  item.disabled = true;
  item.value = "";
}

function enable(item) {
  item.disabled = false;
}

function verify() {
  const radioPlayer = document.getElementById("radioPlayer");
  const radioRecords = document.getElementById("radioRecords");
  // const radioFull = document.getElementById("radioFull");
  const textPlayer = document.getElementById("textPlayer").value;
  const textRecords = document.getElementById("textRecords").value;

  // if (
  //   (textPlayer === null || textPlayer === "") &&
  //   (textRecords === null || textRecords === "") &&
  //   radioFull.checked
  // ) {
  //   const cypher = "MATCH (n)-[r:REL]->(m) RETURN * ";
  //   document.getElementById("message").classList.add("not-visible");
  //   return cypher;
  // } else
  if (radioRecords.checked && textRecords !== null && textRecords !== "") {
    if (isInt(+textRecords)) {
      const cypher = `MATCH (n)-[r:REL]->(m) RETURN * LIMIT ${textRecords}`;
      document.getElementById("message").classList.add("not-visible");
      return cypher;
    } else {
      showError(limit);
      return false;
    }
  } else if (radioPlayer.checked && textPlayer !== null && textPlayer !== "") {
    const cypher = `MATCH (p {name: '${textPlayer}'})-[r]-(t) RETURN p, r, t`;
    document.getElementById("message").classList.add("not-visible");
    return cypher;
  } else {
    showError(empty);
    return false;
  }
}

function isInt(num) {
  if (Number.isInteger(num) && num > 0 && num <= 1000) {
    return true;
  } else return false;
}

function draw() {
  var res = verify();
  if (!res) {
    return;
  }
  var config = {
    container_id: "viz",
    server_url: DB_PATH,
    encrypted: "ENCRYPTION_ON",
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
    console.log("try");
    viz = new NeoVis.default(config);
    console.log(viz);
    viz.render();
    const details = document.querySelector("details");
    details.open = false;
  } catch (e) {
    console.log(e);
    showError(exist);
  }
}

function handleChange() {
  const radioPlayer = document.getElementById("radioPlayer");
  const radioRecords = document.getElementById("radioRecords");
  // const radioFull = document.getElementById("radioFull");
  var textPlayer = document.getElementById("textPlayer");
  var textRecords = document.getElementById("textRecords");

  if (radioPlayer.checked) {
    disable(textRecords);
    enable(textPlayer);
  } else if (radioRecords.checked) {
    disable(textPlayer);
    enable(textRecords);
  }
  // else if (radioFull.checked) {
  //   disable(textPlayer);
  //   disable(textRecords);
  // }
}

window.onload = function () {
  document
    .getElementById("radioPlayer")
    .addEventListener("change", handleChange);
  document
    .getElementById("radioRecords")
    .addEventListener("change", handleChange);
  // document.getElementById("radioFull").addEventListener("change", handleChange);

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
