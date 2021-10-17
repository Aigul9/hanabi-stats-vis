"use strict";

require("dotenv").config();

var viz;

function draw() {
  var config = {
    container_id: "viz",
    server_url: `bolt://localhost:${process.env.PORT}`,
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

window.onload = function () {
  draw();
};
