"use strict";

import { DB_PATH, DB_USER, DB_PASSWORD } from "./constants.js";

var viz;
const empty = "Field is empty.",
  limit = "Incorrect number.",
  exist = "Incorrect query.",
  checkbox = "Select at least one option.";

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
}

function enable(item) {
  item.disabled = false;
}

function getInputs() {
  const inputs = document.querySelectorAll("input[type='checkbox']");
  return [...inputs].map((input) => input.checked);
}

function isChecked() {
  return getInputs().includes(true);
}

function isPlayerSelected() {
  const radioPlayer = document.getElementById("radioPlayer"),
    textPlayer = document.getElementById("textPlayer").value;
  return radioPlayer.checked && textPlayer !== null && textPlayer !== "";
}

function isLimitSelected() {
  const radioRecords = document.getElementById("radioRecords"),
    textRecords = document.getElementById("textRecords").value;
  return radioRecords.checked && textRecords !== null && textRecords !== "";
}

function createQuery() {
  const inputs = getInputs();
  const inputs_rel = {
    0: "(p)-[r:REL]-(t), ",
    1: "(p)-[e:EASY]-(t), ",
    2: "(p)-[h:HARD]-(t), ",
  };

  var match_q = "MATCH ",
    return_q = "RETURN p, t, ",
    query = "";

  // match clause
  inputs.forEach((input, index) => {
    if (input) match_q += inputs_rel[index];
  });
  match_q = match_q.slice(0, -2);

  // return clause
  inputs.forEach((input, index) => {
    if (input) return_q += `${inputs_rel[index].slice(5, 6)}, `;
  });
  return_q = return_q.slice(0, -2);

  if (isPlayerSelected()) {
    const textPlayer = document.getElementById("textPlayer").value;
    // where clause
    query = `${match_q} WHERE p.name = '${textPlayer}' ${return_q}`;
  } else if (isLimitSelected()) {
    const textRecords = document.getElementById("textRecords").value;
    const textList = document.getElementById("textList").value;
    var list = textList.split(", ");
    query = `${match_q} ${return_q} LIMIT ${textRecords}`;

    if (list.length > 0 && list[0] !== "") {
      const limitPerPlayer = Math.ceil(textRecords / list.length);
      // limit clause
      const limit_q = `LIMIT ${limitPerPlayer} UNION ALL `;

      list = list.map(
        (player) =>
          `${match_q} WHERE p.name = '${player}' ${return_q} ${limit_q}`
      );

      query = list.join("").slice(0, -11);
    }
  }

  notVisible(document.getElementById("message"));
  console.log(query);
  return query;
}

function isInt(num) {
  return Number.isInteger(num) && num > 0 && num <= 1000;
}

function draw() {
  var query = createQuery();
  var config = {
    container_id: "viz",
    server_url: DB_PATH,
    // encrypted: "ENCRYPTION_ON",
    server_user: DB_USER,
    server_password: DB_PASSWORD,
    labels: {
      Player: {
        caption: "name",
        size: "pagerank",
        community: "community",
        title_properties: ["name", "pagerank", "community"],
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
    initial_cypher: query,
  };

  try {
    viz = new NeoVis.default(config);
    viz.render();
  } catch (e) {
    console.log("Exception: ", e);
    showError(exist);
    return;
  }

  const details = document.querySelector("details");
  details.open = false;
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

  const isPlayer = isPlayerSelected(),
    isLimit = isLimitSelected(),
    isTypeChecked = isChecked(),
    textRecords = document.getElementById("textRecords").value;

  if (!isPlayer && !isLimit) {
    showError(empty);
  } else if (isLimit && !isInt(+textRecords)) {
    showError(limit);
  } else if (!isTypeChecked) {
    showError(checkbox);
  } else {
    draw();
  }
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

// var details = document.querySelector("details");

// details.addEventListener("toggle", function afterToggle() {
//   if (details.open) {
//     notVisible(document.getElementById("error"));
//   }
// });
