"use strict";

import { DB_PATH, DB_USER, DB_PASSWORD } from "./constants.js";

var viz;
const limit = "Incorrect number.",
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

function getInputs() {
  const inputs = document.querySelectorAll("input[type='checkbox']");
  return [...inputs].map((input) => input.checked);
}

function isChecked() {
  return getInputs().includes(true);
}

function isLimitSelected() {
  const textRecords = document.getElementById("textRecords").value;
  return textRecords !== null && textRecords !== "";
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

  // where clause
  const textWeight = document.getElementById("textWeight").value;
  var where_q = "";
  if (textWeight !== "") {
    inputs.every((input, index) => {
      if (input) {
        where_q = `toInteger(${inputs_rel[index].slice(
          5,
          6
        )}.weight) >= ${+textWeight}`;
        return false;
      } else return true;
    });
  }

  // return clause
  inputs.forEach((input, index) => {
    if (input) return_q += `${inputs_rel[index].slice(5, 6)}, `;
  });
  return_q = return_q.slice(0, -2);

  if (isLimitSelected()) {
    const textRecords = document.getElementById("textRecords").value;
    const textList = document.getElementById("textList").value;
    var list = textList.split(", ");

    if (list.length > 0 && list[0] !== "") {
      const limitPerPlayer = Math.ceil(textRecords / list.length);
      // limit clause
      const limit_q = `LIMIT ${limitPerPlayer} UNION ALL `;

      if (textWeight !== "") where_q = `and ${where_q} `;
      list = list.map(
        (player) =>
          `${match_q} WHERE p.name = '${player}' ${where_q}${return_q} ${limit_q}`
      );

      query = list.join("").slice(0, -11);
    } else {
      if (textWeight !== "") where_q = `where ${where_q} `;
      query = `${match_q} ${where_q}${return_q} LIMIT ${textRecords}`;
    }
  }

  notVisible(document.getElementById("message"));
  console.log(query);
  return query;
}

function isInt(num) {
  return Number.isInteger(num) && num > 0;
}

function draw() {
  var query = createQuery();
  var config = {
    container_id: "viz",
    server_url: DB_PATH,
    encrypted: "ENCRYPTION_ON",
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

function onClick(e) {
  e.preventDefault();

  const isLimit = isLimitSelected(),
    isTypeChecked = isChecked(),
    textRecords = document.getElementById("textRecords").value,
    textWeight = document.getElementById("textWeight").value;

  if (
    (isLimit && (!isInt(+textRecords) || +textRecords > 1000)) ||
    (!isInt(+textWeight) && textWeight !== "")
  ) {
    showError(limit);
  } else if (!isLimit) {
    document.getElementById("textRecords").value = 500;
    draw();
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

document.querySelector(".trigger").addEventListener("click", onClick);

const input = document.querySelectorAll("input");

input.forEach((field) => field.addEventListener("keypress", onEnter));
