const use = ({ preventDefault = true, upperCase = true, styles = {} }) => {
  const newDiv = document.createElement('div');
  newDiv.setAttribute('id', 'pressed');
  newDiv.setAttribute('style', 'position: fixed; bottom: 0; left: 0; margin: 10px; padding: 10px; border-radius: 10px; font-family: monospace;');

  Object.assign(newDiv.style, styles);

  document.body.addEventListener("keydown", event => {
    console.log(event)

    const modifierKeys = [
      { key: 'ctrlKey', label: 'Control' },
      { key: 'altKey', label: 'Alt' },
      { key: 'shiftKey', label: 'Shift' },
      { key: 'metaKey', label: 'Meta' },
    ];

    const modifiersPressed = modifierKeys.filter(modifier => event[`${modifier.key}`]);

    if (event.key) {
      const keys = modifiersPressed.length && modifiersPressed.map(modifier => modifier.label).join(' + ');
      const message = keys ? modifiersPressed.length > 1 ? keys.split(' + ').includes(event.key) ? keys : `${keys} + ${event.key}` : event.key !== keys ? `${keys} + ${event.key}` : event.key : event.key;
      preventDefault && event.preventDefault();
      newDiv.textContent = upperCase ? message.toUpperCase() : message
      clearText()
    }
  })

  document.body.appendChild(newDiv);

  let timeoutId;

  const clearText = () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      newDiv.textContent = '';
    }, 3000);
  }
}

export default use;
