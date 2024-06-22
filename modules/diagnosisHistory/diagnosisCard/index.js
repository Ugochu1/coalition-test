import { trendIcon } from "../bloodPressureChart";
import styles from "./diagnosisCard.module.css";

export function diagnosisCard(props) {
  const { name, value, levels, image, alt, style } = props;

  const card = document.createElement("div");
  card.setAttribute("id", styles.cardBody);
  card.setAttribute("style", style);

  card.innerHTML = `
    <img src=${image} alt=${alt} aria-hidden="true" />
    <div>
      <div class="card-name-16pt">${name}</div>
      <div class="card-value-30pt">${value}</div>
    </div>
    <div 
        class="body-regular-14" 
        style=" display: flex;
                align-items: center;
                gap: 7px;"
        aria-label="${name} level"
    >${
      levels in trendIcon
        ? `<img
              src=${trendIcon[levels]}
              alt=${levels} class="trend-icon"
              aria-hidden="true"
          />`
        : ""
    } ${levels}</div>
  `;

  return card.outerHTML;
}
