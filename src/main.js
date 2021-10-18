"use strict";

import { DB_PATH, DB_USER, DB_PASSWORD } from "./constants.js";

var viz;
const empty = "Field is empty.",
  limit = "Incorrect number.",
  exist = "Incorrect query.";

function visible(item) {
  item.classList.remove("not-visible");
  item.classList.add("visible");
}

function notVisible(item) {
  item.classList.add("not-visible");
}

function showError(text) {
  document.getElementById("message").innerHTML = text;
  visible(document.getElementById("message"));
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
  const textPlayer = document.getElementById("textPlayer").value;
  const textRecords = document.getElementById("textRecords").value;
  const textList = document.getElementById("textList").value;

  if (radioRecords.checked && textRecords !== null && textRecords !== "") {
    if (isInt(+textRecords)) {
      var cypher_add = "";
      var list = textList.split(",");

      if (list.length > 0 && list[0] !== "") {
        list = "'" + list.join("','") + "'";
        cypher_add = `WHERE n.name in [${list}] `;
      }

      const cypher = `MATCH (n)-[r:REL]->(m) ${cypher_add}RETURN * LIMIT ${textRecords}`;

      console.log(cypher);

      notVisible(document.getElementById("message"));

      return cypher;
    } else {
      showError(limit);
      return false;
    }
  } else if (radioPlayer.checked && textPlayer !== null && textPlayer !== "") {
    const cypher = `MATCH (p {name: '${textPlayer}'})-[r]-(t) RETURN p, r, t`;
    notVisible(document.getElementById("message"));
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
    viz = new NeoVis.default(config);
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
  var textPlayer = document.getElementById("textPlayer");
  var textRecords = document.getElementById("textRecords");

  if (radioPlayer.checked) {
    disable(textRecords);
    enable(textPlayer);
  } else if (radioRecords.checked) {
    disable(textPlayer);
    enable(textRecords);
  }
}

window.onload = function () {
  document
    .getElementById("radioPlayer")
    .addEventListener("change", handleChange);
  document
    .getElementById("radioRecords")
    .addEventListener("change", handleChange);

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
