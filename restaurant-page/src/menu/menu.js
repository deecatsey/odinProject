import { desserts } from "./desserts";
import { mains } from "./mains";
import { starters } from "./starters";

const menuPage = () => {
  const addMenuItem = (item) => {
    const itemElement = document.createElement("div");
    const nameEl = document.createElement("div");
    const priceEl = document.createElement("div");

    itemElement.classList.add("menu-item");
    nameEl.classList.add("menu-item-name");
    priceEl.classList.add("menu-item-price");

    const { name, price } = item;
    nameEl.textContent = name;
    priceEl.textContent = price;

    [nameEl, priceEl].forEach((el) => itemElement.appendChild(el));

    return itemElement;
  };

  const addMenuCategory = (foodCategory) => {
    const { category, items } = foodCategory;

    const categoryElement = document.createElement("div");
    categoryElement.id = category;
    categoryElement.classList.add("menu-category");

    const categoryHeader = document.createElement("h4");
    categoryHeader.classList.add("menu-category-header");
    categoryHeader.textContent = category;
    categoryElement.appendChild(categoryHeader);

    items.map((item) => {
      const menuItem = addMenuItem(item);
      categoryElement.appendChild(menuItem);
    });

    return categoryElement;
  };

  const addMenu = () => {
    const menuElement = document.createElement("div");
    menuElement.id = "menu-items";
    [starters, mains, desserts].forEach((foodCategory) => {
      const categoryElement = addMenuCategory(foodCategory);
      menuElement.appendChild(categoryElement);
    });
    return menuElement;
  };

  const addPageHeader = () => {
    const header = document.createElement("h2");
    header.textContent = "A la Carte";
    return header;
  };

  const addPageContent = () => {
    const content = document.createElement("div");

    const header = addPageHeader();
    const menu = addMenu();

    content.appendChild(header);
    content.appendChild(menu);

    return content;
  };

  const addToPage = (parentEl) => {
    const pageContent = addPageContent();
    parentEl.appendChild(pageContent);
  };

  return { addToPage };
};

export { menuPage };
