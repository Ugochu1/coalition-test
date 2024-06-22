import styles from "./bloodPressureChart.module.css";
import { Chart } from "chart.js/auto";

import arrowDown from "../../../assets/ArrowDown.svg";
import arrowUp from "../../../assets/ArrowUp.svg";
import expandMore from "../../../assets/expandMore.svg";

export const trendIcon = {
  "Lower than Average": arrowDown,
  "Higher than Average": arrowUp,
};

function updateChart(diagnosisHistory) {
  const chartContainer = document.querySelector(`#${styles.mainChart}`);

  const ctx = document.createElement("canvas");
  ctx.setAttribute("aria-label", "Diagnosis chart");

  const chartBox = document.createElement("div");
  chartBox.setAttribute("id", styles.chart);
  chartBox.append(ctx);

  chartContainer.append(chartBox);

  function getDiagnosis(type) {
    // type would be either systolic or diastolic
    return diagnosisHistory.map((diagnosis) => {
      const { month, year, blood_pressure } = diagnosis;
      return {
        x: `${month.substring(0, 3)}, ${year}`,
        y: blood_pressure[type].value,
      };
    });
  }

  new Chart(ctx, {
    type: "line",
    data: {
      datasets: [
        {
          data: getDiagnosis("systolic"),
          tension: 0.3,
          backgroundColor: "#E66FD2",
          borderColor: "#E66FD2",
        },
        {
          data: getDiagnosis("diastolic"),
          tension: 0.3,
          backgroundColor: "#8C6FE6",
          borderColor: "#8C6FE6",
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      elements: {
        point: {
          radius: 6,
          hoverRadius: 7,
          borderColor: "#FFFFF",
          borderWidth: 2,
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
        },
      },
    },
  });
}

export function bloodPressureChart(diagnosisHistory) {
  const latestRecord = diagnosisHistory[diagnosisHistory.length - 1];

  const systolicLevel = latestRecord.blood_pressure.systolic.levels;
  const diastolicLevel = latestRecord.blood_pressure.diastolic.levels;

  const parent = document.createElement("div");
  parent.setAttribute("id", styles.parent);

  parent.innerHTML = `
    <div id=${styles.mainChart}>
      <div id=${styles.mainChartHeader}>
        <div class="inner-card-title-18pt">Blood Pressure</div>
        <button  class="body-regular-14" 
              style="display: flex; align-items: center; gap: 14px;"
              aria-expanded="false"
        >
          Last 6 months <img src=${expandMore} class="icon" aria-hidden="true" />
        </button>
      </div>
    </div>
    <div id=${styles.latestReadings}>
      <div class=${styles.bloodPressureReading}>
        <div class=${styles.header}>
          <span style="background: #E66FD2;"></span> Systolic
        </div>
        <div class=${styles.value}>${latestRecord.blood_pressure.systolic.value}</div>
        <div class="body-regular-14 ${styles.levels}">
          <img 
            src=${trendIcon[systolicLevel]} 
            class="trend-icon" 
            aria-hidden="true" 
          /> ${systolicLevel}
        </div>
      </div>
      <div id=${styles.seperator}></div>
      <div class=${styles.bloodPressureReading}>
        <div class=${styles.header}>
          <span style="background: #8C6FE6"></span> Diastolic
        </div>
        <div class=${styles.value}>${latestRecord.blood_pressure.diastolic.value}</div>
        <div class="body-regular-14 ${styles.levels}">
          <img 
            src=${trendIcon[diastolicLevel]}
            class="trend-icon"
            aria-hidden="true"
          /> ${diastolicLevel}
        </div>
      </div>
    </div>
  `;

  const observer = new MutationObserver(() => {
    const chartContainer = parent.querySelector(`#${styles.mainChart}`);
    if (chartContainer) {
      updateChart(diagnosisHistory);
      observer.disconnect();
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });

  return parent.outerHTML;
}
