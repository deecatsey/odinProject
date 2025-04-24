const homePage = () => {
  const addPageHeader = () => {
    const header = document.createElement("h2");
    header.textContent = "Home";
    return header;
  };

  const addPageContent = () => {
    const content = document.createElement("div");

    const header = addPageHeader();
    content.appendChild(header);

    return content;
  };

  const addToPage = (parentEl) => {
    const pageContent = addPageContent();
    parentEl.appendChild(pageContent);
  };

  return { addToPage };
};

export { homePage };
