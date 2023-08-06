const use = ({ preventDefault = true, upperCase = true, styles = {} }) => {
  const newDiv = document.createElement("div");
  newDiv.setAttribute("id", "pressed");
  newDiv.setAttribute(
    "style",
    "position: fixed; bottom: 0; left: 0; margin: 10px; padding: 10px; border-radius: 10px; font-family: monospace; visibility: hidden"
  );

  Object.assign(newDiv.style, styles);

  document.body.addEventListener("keydown", (event) => {

    const modifierKeys = [
      { key: "ctrlKey", label: "Control" },
      { key: "altKey", label: "Alt" },
      { key: "shiftKey", label: "Shift" },
      { key: "metaKey", label: "Meta" },
    ];

    const modifiersPressed = modifierKeys.filter(
      (modifier) => event[`${modifier.key}`]
    );

    if (event.key) {
      preventDefault && event.preventDefault();
      let message = [];
      const keys =
        modifiersPressed.length &&
        modifiersPressed.map((modifier) => modifier.label);
      keys.length
        ? keys.includes(event.key)
          ? insert(message, { keys })
          : insert(message, { keys, evntKey: event.key })
        : insert(message, { keys: '', evntKey: event.key })
      let msgString = message.filter(msg => msg !== undefined).join(" + ");
      newDiv.style.visibility = "visible";
      newDiv.textContent = upperCase ? msgString.toUpperCase() : msgString;
      clearText();
    }
  });

  document.body.appendChild(newDiv);

  let timeoutId;

  const clearText = () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      newDiv.style.visibility = "hidden";
      newDiv.textContent = "";
    }, 3000);
  };
};

const insert = (msg, { keys, evntKey }) => {
  console.log('msg', { keys, evntKey })
  evntKey === ' ' ? evntKey = 'Space' : ''
  return msg.push(...keys, evntKey)
}

// const modify = (keysToModify) => {
//   return evntKey
// }

export default {
  use,
  // modify
};
