import styles from "./personalInfo.module.css";

// import icons
import dateOfBirthIcon from "../../../assets/BirthIcon.svg";
import genderIcon from "../../../assets/FemaleIcon.svg";
import contactInfoIcon from "../../../assets/PhoneIcon.svg";
import insuranceInfoIcon from "../../../assets/InsuranceIcon.svg";

export function personalInfo(props) {
  const {
    profileImage,
    name,
    dateOfBirth,
    gender,
    contactInfo,
    emergencyContacts,
    insuranceProvider,
  } = props;

  const infoList = [
    {
      label: "Date Of Birth",
      value: dateOfBirth,
      icon: dateOfBirthIcon,
    },
    {
      label: "Gender",
      value: gender,
      icon: genderIcon,
    },
    {
      label: "Contact Info.",
      value: contactInfo,
      icon: contactInfoIcon,
    },
    {
      label: "Emergency Contacts",
      value: emergencyContacts,
      icon: contactInfoIcon,
    },
    {
      label: "Insurance Provider",
      value: insuranceProvider,
      icon: insuranceInfoIcon,
    },
  ];

  const parent = document.createElement("div");
  parent.setAttribute("id", styles.parent);
  parent.setAttribute("class", "regular-border-radius");

  parent.innerHTML = `
    <div id=${styles.infoContainer}>
      <div id=${styles.nameInfo}>
        <img src=${profileImage} alt=${name} aria-hidden="true" />
        <div class="card-title-24pt" style="font-weight: 700;">${name}</div>
      </div>
      <div id=${styles.moreInfo}>
        ${infoList
          .map((data) => {
            const { label, value, icon } = data;
            return `
            <div class=${styles.infoRow}>
              <img src=${icon} class=${styles.icon} alt=${label} aria-hidden="true" />
              <div>
                <div class="body-regular-14">${label}</div>
                <div class="body-emphasized-14pt">${value}</div>
              </div>
            </div>
          `;
          })
          .join("\n")}
      </div>
    </div>
    <div id=${styles.buttonContainer}>
      <button class="body-emphasized-14pt" tabindex="0">Show All Information</button>
    </div>
  `;

  return parent.outerHTML;
}
