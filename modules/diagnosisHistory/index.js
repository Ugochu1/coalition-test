import { diagnosisCard } from "./diagnosisCard";
import styles from "./diagnosisHistory.module.css";

// import icons
import respiratoryRate from "../../assets/respiratory rate.svg";
import temperature from "../../assets/temperature.svg";
import heartRate from "../../assets/HeartBPM.svg";
import { bloodPressureChart } from "./bloodPressureChart";

export function diagnosisHistory(diagnosisHistory) {
  const parent = document.createElement("div");
  parent.setAttribute("id", styles.parent);
  parent.setAttribute("class", "regular-border-radius");

  parent.innerHTML = `
    <div style="font-weight: 700;" class="card-title-24pt card-header">Diagnosis History</div>
    <div id=${styles.reportContainer}>
      <div id=${styles.chartContainer}>
        ${bloodPressureChart(diagnosisHistory.slice(0, 6).reverse())}
      </div>
      <div id=${styles.measurements}>
        ${diagnosisCard({
          name: "Respiratory Rate",
          value: `${diagnosisHistory[0].respiratory_rate.value} bpm`,
          levels: diagnosisHistory[0].respiratory_rate.levels,
          image: respiratoryRate,
          alt: "Respiratory Rate",
          style: "background: #E0F3FA",
        })}
        ${diagnosisCard({
          name: "Temperature",
          value: `${diagnosisHistory[0].temperature.value}&deg;F`,
          levels: diagnosisHistory[0].temperature.levels,
          image: temperature,
          alt: "Temperature",
          style: "background: #FFE6E9",
        })}
        ${diagnosisCard({
          name: "Heart Rate",
          value: `${diagnosisHistory[0].heart_rate.value} bpm`,
          levels: diagnosisHistory[0].heart_rate.levels,
          image: heartRate,
          alt: "Heart Rate",
          style: "background: #FFE6F1",
        })}
      </div>
    </div>
  `;
  return parent.outerHTML;
}
