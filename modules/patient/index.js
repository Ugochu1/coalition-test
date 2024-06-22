import styles from "./patient.module.css";
import { diagnosisHistory } from "../diagnosisHistory";

// import icons
import SearchIcon from "../../assets/search.svg";
import loader from "../loader";
import more from "../../assets/more_responsive.svg";
import { diagnosticList } from "../diagnosticList";
import { personalInfo } from "./personalInfo";
import { labInfo } from "./labInfo";

// define our variables
const patientViewHTML = document.createElement("div");
patientViewHTML.setAttribute("id", styles.patientsView);

const fetchPatientsData = async () => {
  const { VITE_USERNAME, VITE_PASSWORD } = import.meta.env;
  let auth = btoa(`${VITE_USERNAME}:${VITE_PASSWORD}`);
  console.log(auth);

  return await fetch(
    "https://fedskillstest.coalitiontechnologies.workers.dev",
    {
      headers: {
        Authorization: `Basic ${auth}`,
      },
    }
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

function displayFullView(profile) {
  console.log(profile);
  const displayView = document.querySelector(`#${styles.detailDisplay}`);
  displayView.innerHTML = `
    <div id=${styles.firstCompartment}>
      ${diagnosisHistory(profile.diagnosis_history)}
      ${diagnosticList(profile.diagnostic_list)}
    </div>
    <div id=${styles.secondCompartment}>
      ${personalInfo({
        profileImage: profile.profile_picture,
        name: profile.name,
        dateOfBirth: profile.date_of_birth,
        gender: profile.gender,
        contactInfo: profile.phone_number,
        emergencyContacts: profile.emergency_contact,
        insuranceProvider: profile.insurance_type,
      })}
      ${labInfo(profile.lab_results)}
    </div>
  `;
}

async function updatePatientsList() {
  const patientsListLoading = loader();
  const listView = document.querySelector(`#${styles.patientsListContainer}`);
  const patientListHTML = document.createElement("ul");
  patientListHTML.setAttribute("aria-label", "Patients list");

  let jessicaProfile;

  // add a loader till fetch is done;
  listView.append(patientsListLoading);

  const patientsArray = await fetchPatientsData();

  patientsArray.forEach((patient) => {
    const { name, gender, age, profile_picture } = patient;
    const li = document.createElement("li");
    if (name === "Jessica Taylor") {
      li.classList.add(styles.active);
      jessicaProfile = patient;
    }
    li.innerHTML = `
      <a href="#" class=${styles.patientItem}>
        <div id=${styles.details}>
          <img src="${profile_picture}" alt="${name} profile pic" aria-hidden="true" />
          <div id=${styles.userSpecifics}>
            <div class="body-emphasized-14pt" style="margin-bottom: 1px;">${name}</div>
            <div class="body-secondary-info-14pt">${gender}, ${age}</div>
          </div>
        </div>
        <button style="height: max-content; align-self: center" id=${styles.more}>
          <img src=${more} class="icon" aria-label="options" />
        </button>
      </a>
    `;
    patientListHTML.append(li);
  });

  listView.replaceChild(patientListHTML, patientsListLoading);
  displayFullView(jessicaProfile);
}

document.addEventListener("DOMContentLoaded", () => {
  updatePatientsList();
});

export function patientView() {
  patientViewHTML.innerHTML = `
    <div id=${styles.patientsColumn} class="regular-border-radius">
      <div id=${styles.patientsHeader}>
        <div class="card-title-24pt" style="font-weight: 700;">Patients</div>
        <button aria-label="Search">
          <img src=${SearchIcon} class="icon" aria-hidden="true" />
        </button>
      </div>
      <div id=${styles.patientsListContainer}></div>
    </div>
    <div id=${styles.detailDisplay}></div>
  `;

  return patientViewHTML.outerHTML;
}
