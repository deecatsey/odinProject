import "./styles.css";
import { menuPage } from "./menu/menu";
import { aboutPage } from "./about/about";

const initPage = () => {
  const contentEl = document.getElementById("content");

  document.addEventListener("DOMContentLoaded", () => {
    menuPage().addToPage(contentEl);
  });

  const pageLookup = {
    home: menuPage,
    menu: menuPage,
    about: aboutPage,
  };

  const loadPage = (e) => {
    const {
      target: { id },
    } = e;

    contentEl.querySelectorAll("*").forEach((n) => n.remove());
    pageLookup[id]().addToPage(contentEl);
  };

  const navBtns = [...document.getElementsByClassName("nav-btn")];
  navBtns.forEach((btn) => {
    btn.addEventListener("click", loadPage);
  });
};

initPage();
