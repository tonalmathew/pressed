const use = ({ preventDefault = true, upperCase = true, styles = {} }) => {
  const newDiv = document.createElement("div");
  newDiv.setAttribute("id", "pressed");
  newDiv.setAttribute(
    "style",
    "position: fixed; bottom: 0; left: 0; margin: 10px; padding: 10px; border-radius: 10px; font-family: monospace; visibility: hidden"
  );

  Object.assign(newDiv.style, styles);

  document.body.addEventListener("keydown", (event) => {
    // console.log(event)

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
          ? message.push(...keys)
          : message.push(...keys, event.key === " " ? "Space" : event.key)
        : event.key === " "
        ? message.push("Space")
        : message.push(event.key);
      let msgString = message.join(" + ");
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

// export default use;

const pressed = {
  use,
};

export default pressed;
