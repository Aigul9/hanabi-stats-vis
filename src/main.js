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
  // item.value = "";
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
      var list = textList.split(", ");
      var cypher = `MATCH (p)-[r]-(t) RETURN * LIMIT ${textRecords}`;

      if (list.length > 0 && list[0] !== "") {
        const limitPerPlayer = Math.ceil(textRecords / list.length);
        const match_q = "MATCH (p)-[r]-(t)",
          return_q = `RETURN p, r, t LIMIT ${limitPerPlayer} UNION ALL `;

        list = list.map(
          (player) => `${match_q} WHERE p.name = '${player}' ${return_q}`
        );

        cypher = list.join("").slice(0, -11);
      }

      notVisible(document.getElementById("message"));
      console.log(cypher);
      return cypher;
    } else {
      showError(limit);
      return false;
    }
  } else if (radioPlayer.checked && textPlayer !== null && textPlayer !== "") {
    const cypher = `MATCH (p {name: '${textPlayer}'})-[r]-(t) RETURN p, r, t`;
    notVisible(document.getElementById("message"));
    console.log(cypher);
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
    // encrypted: "ENCRYPTION_ON",
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
      EASY: {
        thickness: "weight",
        caption: "weight",
      },
      HARD: {
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

    if (viz._database === undefined) {
      visible(document.getElementById("error"));
    }
  } catch (e) {
    console.log(e);
    visible(document.getElementById("error"));
  }
}

function handleChange() {
  const radioPlayer = document.getElementById("radioPlayer");
  const radioRecords = document.getElementById("radioRecords");
  var textPlayer = document.getElementById("textPlayer");
  var textRecords = document.getElementById("textRecords");
  var textList = document.getElementById("textList");

  if (radioPlayer.checked) {
    disable(textRecords);
    disable(textList);
    enable(textPlayer);
  } else if (radioRecords.checked) {
    disable(textPlayer);
    enable(textRecords);
    enable(textList);
  }
}

function onClick(e) {
  e.preventDefault();
  draw();
}

function onEnter(e) {
  if (e.key === "Enter") {
    onClick(e);
  }
}

document.getElementById("radioPlayer").addEventListener("change", handleChange);
document
  .getElementById("radioRecords")
  .addEventListener("change", handleChange);

document.querySelector(".trigger").addEventListener("click", onClick);

const input = document.querySelectorAll("input");

input.forEach((field) => field.addEventListener("keypress", onEnter));

var details = document.querySelector("details");

details.addEventListener("toggle", function afterToggle(e) {
  if (details.open) {
    notVisible(document.getElementById("error"));
  }
});
