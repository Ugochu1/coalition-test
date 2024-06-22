import styles from "./diagnosticList.module.css";

export function diagnosticList(diagnostic_list) {
  const parent = document.createElement("div");
  parent.setAttribute("id", styles.parent);
  parent.setAttribute("class", "regular-border-radius");

  parent.innerHTML = `
    <div  style="font-weight: 700;" 
          class="card-header card-title-24pt"
    >
      Diagnostic List
    </div>
    <div 
      id=${styles.table} 
      role="table"
    >
      <div 
        class="body-emphasized-14pt" 
        id=${styles.tableHeader}
        role="row"
      >
        <div role="columnheader">Problem/Diagnosis</div>
        <div role="columnheader">Description</div>
        <div role="columnheader">Status</div>
      </div>
      <div id=${styles.tableBody} role="rowgroup">
        ${diagnostic_list.map((diagnosis) => {
          const { name, description, status } = diagnosis;
          return `
            <div 
              class="${styles.tableRow} body-regular-14"
              role="row"
            >
              <div 
                role="cell" 
                aria-label="Problem/Diagnosis" 
                data-name="Problem/Diagnosis"
              >
                ${name}
              </div>
              <div 
                role="cell" 
                aria-label="Description" 
                data-name="Description"
              >
                ${description}
              </div>
              <div 
                role="cell" 
                aria-label="Status" 
                data-name="Status"
              >
                ${status}
              </div>
            </div>
          `
        }).join("\n")}
      </div>
    </div>
  `;

  return parent.outerHTML;
}
