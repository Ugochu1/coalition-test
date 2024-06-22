import styles from "./nav.module.css";
import logo from "../../assets/TechCareLogo.svg";
import seniorWoman from "../../assets/senior_woman.png";

// import the navigation icons
import Overview from "../../assets/home.svg";
import Patients from "../../assets/group.svg";
import Schedule from "../../assets/calendar_today.svg";
import Message from "../../assets/chat_bubble.svg";
import Transactions from "../../assets/credit_card.svg";

// more icons
import settings from "../../assets/settings.svg";
import more from "../../assets/more.svg";
import moreResponsive from "../../assets/more_responsive.svg";

const navigationLinks = [
  {
    text: "Overview",
    icon: Overview,
  },
  {
    text: "Patients",
    icon: Patients,
  },
  {
    text: "Schedule",
    icon: Schedule,
  },
  {
    text: "Message",
    icon: Message,
  },
  {
    text: "Transactions",
    icon: Transactions,
  },
];

document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.querySelector(".toggleButton");
  const navigationLinksParent = document.querySelector(
    `.${styles.navLinksParent}`
  );
  const profileParent = document.querySelector(`.${styles.profile_parent}`);

  toggleButton.addEventListener("click", () => {
    const isOpened = toggleButton.getAttribute("aria-expanded");

    if (isOpened === "true") {
      toggleButton.setAttribute("aria-expanded", "false");
      navigationLinksParent.setAttribute("data-state", "closing");
      profileParent.setAttribute("data-state", "closing");

      [navigationLinksParent, profileParent].forEach((element) => {
        element.addEventListener(
          "animationend",
          () => {
            element.setAttribute("data-state", "closed");
          },
          {
            once: true,
          }
        );
      });
    } else {
      toggleButton.setAttribute("aria-expanded", "true");
      navigationLinksParent.setAttribute("data-state", "opened");
      profileParent.setAttribute("data-state", "opened");
    }
  });
});

export function navbar() {
  const nav = document.createElement("nav");
  nav.innerHTML = `
    <div id=${styles.logoContainer}>
      <a href="#" aria-label="Go to Home">
        <img 
          id=${styles.logo} 
          src=${logo} 
          alt="Tech care logo" 
          aria-hidden="true" 
        />
      </a>
      <button class="toggleButton" style="padding: 5px 2px;" 
              aria-controls="drop-down"
              aria-label="Navigation Menu"
              aria-expanded="false"
      >
        <img 
          id=${styles.more} 
          src=${moreResponsive} 
          alt="more icon" 
          aria-hidden="true" 
        />
      </button>
    </div>
    <div  class="${styles.navLinksParent}" 
          id="drop-down" 
          data-state="closed"
    >
      <div class=${styles.navLinksContainer}>
        ${navigationLinks
          .map(({ text, icon }) => {
            return `
            <a href="#">
              <div class="${styles.navigationItem} body-emphasized-14pt ${
              text === "Patients" ? styles.active : ""
            }">
                <img 
                  src=${icon} 
                  class="icon" 
                  alt="${text} icon" 
                  aria-hidden="true" 
                />
                <div>${text}</div>
              </div>
            </a>
          `;
          })
          .join("\n")}
      </div>
    </div>
    <div class=${styles.profile_parent} data-state="closed">
      <div id=${styles.profile_controls}>
        <div id=${styles.user_data}>
          <img 
            src=${seniorWoman} 
            id=${styles.avatar} 
            alt="Simmons Picture" 
            aria-hidden="true"
          />
          <div>
            <div class="body-emphasized-14pt">Dr. Jose Simmons</div>
            <div class="body-secondary-info-14pt">General Practitioner</div>
          </div>
        </div>
        <div class=${styles.vertical_line}></div>
        <div id=${styles.extra_options}>
          <button aria-label="Settings" aria-expanded="false">
            <img 
              src=${settings} 
              class="icon" 
              style="cursor: pointer;" 
              aria-hidden="true" 
            />
          </button>
          <button aria-label="User Profile" aria-expanded="false">
            <img 
              src=${more} 
              class="icon" 
              style="cursor: pointer;"
              aria-hidden="true" 
            />
          </button>
        </div>
      </div>
    </div>
  `;

  return nav.outerHTML;
}
