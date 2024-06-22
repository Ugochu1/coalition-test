import { navbar } from "./modules/nav";
import { patientView } from "./modules/patient";
import "./style.css";

document.querySelector("#app").innerHTML = `
  <div>
    ${navbar()}
    ${patientView()}
  </div>
`;
