class StartBtn extends HTMLElement {
  static get observedAttributes() {
    return ["status", "listen"];
  }

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    var eventtyp = eventType();

    this.status = "reset";
    var wrapper = document.createElement("div");
    wrapper.setAttribute("class", "startbtnwrapper");
    var style = document.createElement("STYLE");
    style.textContent = `
    // #buttons {
    //     display: flex;
    //     grid-row: 3;
    //     flex-direction: column;
    //     flex-wrap: nowrap;
    //   }
      button {
        padding: 0.5rem 2rem;
        width: 4rem;
        color: white;
        font-size: 1.2rem;
        border-radius: 8px;
        height: 1.3rem;
        box-sizing: content-box;
        outline: none;
        border: none;
        margin-bottom: 10px;
        transition: background-color 300ms ease;
      }
      
      .start {
        background-color: rgb(9, 174, 89);
      }
      
      .resetAnimation {
        padding: 0;
        color: white;
        font-size: 1.3rem;
        border-radius: 8px;
        height: 2.3rem;
        box-sizing: content-box;
        outline: none;
        border: none;
        margin-bottom: 10px;
        background-color: rgb(102, 102, 249);
        animation-name: reset;
        animation-duration: 1000ms;
      
        /* animation-delay: ; */
      }
      .resetAnimation::after {
        display: block;
        border-radius: 8px;
        box-sizing: content-box;
        border: none;
        /* margin-bottom: 10px; */
        position: relative;
        content: "";
        height: 2.3rem;
        /* transition: width 800ms; */
        width: 0%;
        box-shadow: 3px 0px 10px rgba(255, 255, 255, 66%);
        background-color: rgba(174, 9, 9, 0.8);
        animation-name: resetProgressBarAnim;
        animation-duration: 1000ms;
      }
      @keyframes resetProgressBarAnim {
        to {
          width: 100%;
        }
      }
      
      @keyframes reset {
        0% {
          background-color: rgb(102, 102, 249);
          box-shadow: 0px 0px 0px white;
        }
        50% {
          box-shadow: 0px 0px 22px white;
        }
        100% {
          box-shadow: 0px 0px 0px white;
        }
      }
      
      .start::after {
        content: "Go!";
      }
      
      .stop {
        background-color: rgb(174, 9, 9);
      }
      .stop::after {
        content: "Stop";
      }
      
      .pause {
        background-color: rgb(102, 102, 249);
        box-shadow: 0px 0px 9px white;
      }
      .pause::after {
        content: "Pause";
      }
    `;
    var btn = document.createElement("BUTTON");
    btn.className = "start";
    btn.setAttribute("type", "button");
    shadow.appendChild(style);
    shadow.appendChild(wrapper);
    wrapper.appendChild(btn);

    this.addEventListener(eventtyp.click, () => {
      switch (this.status) {
        case "reset":
          this.setAttribute("status", "active");
          this.status = "active";
          btn.className = "pause";
          break;
        case "active":
          this.setAttribute("status", "reset");
          btn.className = "start";
          this.status = "reset";

          break;
      }
    });
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (this.listen == "true") {
      const attrEv = new CustomEvent("start-btn", {
        detail: {
          name: name,
          oldVal: oldValue,
          newVal: newValue,
        },
      });
    }
  }
}

function eventType() {
  this.isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

  var click = this.isMobile ? "touchstart" : "click";
  var down = this.isMobile ? "touchstart" : "mousedown";
  var up = this.isMobile ? "touchend" : "mouseup";
  var move = this.isMobile ? "touchmove" : "mousemove";

  return {
    click: click,
    down: down,
    up: up,
    move: move,
    positionX: (ev) => {
      return this.isMobile ? ev.touches[0].pageX : ev.pageX;
    },
    positionY: (ev) => {
      return this.isMobile ? ev.touches[0].pageY : ev.pageY;
    },
  };
}

customElements.define("start-btn", StartBtn);
