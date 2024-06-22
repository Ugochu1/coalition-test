import styles from "./loader.module.css";

export default function loader() {
  const loader = document.createElement("div");
  loader.setAttribute("id", styles.loader);

  loader.innerHTML = `
    <span id=${styles.span}></span>
  `

  return loader;
}