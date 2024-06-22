import styles from "./labInfo.module.css";

import downloadIcon from "../../../assets/downloadIcon.svg";

export function labInfo(labResults) {
  const parent = document.createElement("div");
  parent.setAttribute("id", styles.parent);
  parent.setAttribute("class", "regular-border-radius");

  parent.innerHTML = `
    <div class="card-title-24pt" style="font-weight: 700;">Lab Results</div>
    <div id=${styles.resultsDisplay}>
      ${labResults.map((result) => {
        return `
          <div class=${styles.resultRow}>
            <div>${result}</div>
            <button>
              <img src=${downloadIcon} aria-label="download ${result}" />
            </button>
          </div>
        `
      }).join("\n")}
    </div>
  `

  return parent.outerHTML;
}