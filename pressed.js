const use = ({ preventDefault = true, upperCase = true, styles = {} }) => {
  const newDiv = document.createElement("div");
  newDiv.setAttribute("id", "pressed");
  Object.assign(newDiv.style, {
    position: "fixed",
    bottom: "0",
    left: "0",
    margin: "10px",
    padding: "10px",
    borderRadius: "10px",
    fontFamily: "monospace",
    visibility: "hidden",
    ...styles,
  })

  document.body.appendChild(newDiv);

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
  const extractedKeys = Object.keys(itemsToModify[0])
  const newKey = []
  keys && keys.map((key) => (extractedKeys.includes(key) ? newKey.push(itemsToModify[0][key]) : newKey.push(key)));
  extractedKeys.includes(evntKey) ? evntKey = itemsToModify[0][evntKey] : ''
  return msg.push(...newKey, evntKey)
}

var itemsToModify = []

const modify = (keysToModify) => {
  itemsToModify.push(keysToModify)
}

export default {
  use,
  modify
};
