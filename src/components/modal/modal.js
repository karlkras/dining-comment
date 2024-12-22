import sheet from './modal.css' with { type: 'css' };

// noinspection JSUnusedGlobalSymbols
class Modal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.adoptedStyleSheets = [sheet];
    this.isOpen = false;

    const template =
      document.createElement(
        "template"
      );
    template.innerHTML = `
      <div id="backdrop"></div>
      <div id="modal">
        <header>
          <h3 class="header-title">Confirm This!</h3>
          <div id="header-close">&#x274C;</div>
        </header>
        <section id="main">
          <slot></slot>
        </section>
        <section id="actions">
          <button id="cancel-button">Cancel</button>
          <button id="confirm-button">Okay</button>
        </section>
      </div>
    `;
    this.shadowRoot.appendChild(
      template.content.cloneNode(true)
    );

    const confirmButton = this.shadowRoot.querySelector("#confirm-button");

    const cancelGroup = [this.shadowRoot.querySelector("#cancel-button"),
      this.shadowRoot.querySelector('#backdrop'),
      this.shadowRoot.querySelector('#header-close')
    ];

    cancelGroup.forEach((item) => {
      item.addEventListener("click", this._cancel.bind(this));
    })

    confirmButton.addEventListener("click", this._confirm.bind(this));

  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.isOpen = this.hasAttribute('opened');
  }

  connectedCallback() {
    this.shadowRoot.querySelector(".header-title").innerHTML =
      this.getAttribute("title") ?? "Who knows?";

    if(this.getAttribute("type") && this.getAttribute("type") === "form") {
      this.shadowRoot.querySelector("#actions").style.display = "none";
    }

    if(this.getAttribute("type") && this.getAttribute("type") === "okay-only") {
      this.shadowRoot.querySelector("#header-close").style.display = "none";
      this.shadowRoot.querySelector("#cancel-button").style.display = "none";
    }
  }

  open() {
    this.setAttribute('opened', '');
    this.isOpen = true;
  }

  hide() {
    if (this.isOpen) {
      this.removeAttribute("opened");
      this.isOpen = false;
    }
  }

  removeType() {
    this.removeAttribute("type");
  }

  setOkayOnlyMode() {
    this.shadowRoot.querySelector("#header-close").style.display = "none";
    this.shadowRoot.querySelector("#cancel-button").style.display = "none";
  }

  setFormMode() {
    this.shadowRoot.querySelector("#actions").hidden = true;
    this.shadowRoot.querySelector("#header-close").style.display = "block";
  }

  setConfirmMode() {
    this.shadowRoot.querySelector("#header-close").style.display = "block";
    this.shadowRoot.querySelector("#cancel-button").style.display = "block";
    this.shadowRoot.querySelector("#actions").hidden = false;
  }

  _cancel() {
    this.hide();
    this.dispatchEvent(new Event('cancel'));
  }

  _confirm() {
    this.hide();
    this.dispatchEvent(new Event('confirm'));
  }
}

customElements.define('uc-modal', Modal);