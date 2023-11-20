import { omk } from "./omk.js";
import { params } from "./authParams.js";

let user = new omk(params);

user.getUser((u) => console.log(u));

function addData(e, d) {
  let data = {};
  d["o:resource_template_property"].forEach((p) => {
    let prop = user.getPropTerm(p["o:property"]["o:id"]);
    data[prop] = "new item";
  });
  user.createRessource(data);
}

function loadRT() {
  const divSelector = d3
    .select(".list_RT")
    .append("h4")
    .text("Resource templates : ");
  user.getRT((res) => {
    let tableRT = divSelector.append("table");
    let rowRT = tableRT.selectAll("tr").data(res).enter().append("tr");
    rowRT
      .append("a")
      .attr("href", (d) => d["@id"])
      .attr("target", "_blanck")
      .text((d) => d["o:label"]);
    rowRT
      .append("td")
      .append("button")
      .attr("type", "button")
      .attr("class", "btn btn-success mx-5")
      .html('<i class="bi bi-plus-square-dotted" style="color:orange"></i>')
      .on("click", addData);
  });
}

loadRT();
