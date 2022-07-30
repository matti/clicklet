(async () => {
  const style = document.createElement('style');
  style.innerHTML = `
  #__clickletConsole, .__clickletHighlight, .__clickletPixel {
    border: none;
  }
  .__clickletHighlight, .__clickletPixel {
    z-index: 2147483646;
    position: absolute;
  }

  #__clickletConsole {
    position: fixed;
    margin: 0;
    top: 0px;
    right: 0px;
    background: rgba(100, 100, 100, 0.5);
    z-index: 2147483647;
  }

  .__clickletHighlight {
    border: 1px dashed red;
  }
  .__clickletPixel {
    border: none;
    position: absolute;
    background: red;
    width: 3px;
    height: 3px;
  }
  `
  document.getElementsByTagName('head')[0].appendChild(style);

  const __clickletConsole = document.createElement("__clickletConsole")
  __clickletConsole.id = "__clickletConsole"
  __clickletConsole.innerText = "__clickletConsole"
  document.body.appendChild(__clickletConsole)

  __clickletConsole.onclick = (e) => {
    const els = document.querySelectorAll(".__clickletHighlight, .__clickletPixel")
    if (!els) {
      return
    }

    els.forEach((el) => {
      console.log(el)
      el.classList.remove("__clickletHighlight")
      el.classList.remove("__clickletPixel")
    })
  }

  document.addEventListener("click", (e) => {
    e.preventDefault()
    console.log("target", e.target)
    if (e.target.id == "__clickletConsole") return

    const obj = {
      pageX: e.pageX,
      pageY: e.pageY,
      clientX: e.clientX,
      clientY: e.clientY,
    }
    __clickletConsole.innerText = JSON.stringify(obj, undefined, 2)

    const el = document.elementFromPoint(
      e.clientX,
      e.clientY
    )

    __clickletConsole.innerText += "\n"
    __clickletConsole.innerText += el.tagName;
    __clickletConsole.innerText += "\n"
    __clickletConsole.innerText += el.innerText;


    const bodyRect = document.body.getBoundingClientRect();


    var rect = el.getBoundingClientRect()
    console.log("rect", rect)

    const __clickletHighlight = document.createElement("div");
    __clickletHighlight.classList.add("__clickletHighlight")
    __clickletHighlight.style.left = window.scrollX + rect.left + "px";
    __clickletHighlight.style.top = window.scrollY + rect.top + "px";
    __clickletHighlight.style.width = rect.right - rect.left - 2 + "px";
    __clickletHighlight.style.height = rect.bottom - rect.top - 2 + "px";
    __clickletHighlight.style.pointerEvents = "none";
    document.body.appendChild(__clickletHighlight);

    const page__clickletPixel = document.createElement("div");
    page__clickletPixel.classList.add("__clickletPixel")
    page__clickletPixel.style.left = e.pageX - 1 + "px";
    page__clickletPixel.style.top = e.pageY - 1 + "px";
    document.body.appendChild(page__clickletPixel)
  })
})();