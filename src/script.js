(function() {
  const toggleElement = document.getElementById('toggle-stylesheet');

  const stylesArray = [
    'Leaven',
    'Default',
  ];
  const stylesheets = [];

  let currentStylesIndex = 0;

  function setStylesheet(active) {
    return (stylesheetElement, index) => {
      if (active === 'Leaven') {
        stylesheetElement.href = stylesheets[index];
      }
      else {
        stylesheets[index] = stylesheetElement.href;
        stylesheetElement.href = '';
      }
    };
  }

  function setButtonText(active) {
    toggleElement.textContent = active;
  }

  function handleClick() {
    currentStylesIndex = (currentStylesIndex + 1) % stylesArray.length;

    const active = stylesArray[currentStylesIndex];
    const stylesheetElements = document.querySelectorAll('link[rel="stylesheet"]');

    stylesheetElements.forEach(setStylesheet(active));
    setButtonText(active);
  }

  if (toggleElement) {
    toggleElement.addEventListener('click', handleClick);
  }
})();
