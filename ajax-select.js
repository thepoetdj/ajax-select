const ajaxSelectTagName = 'ajax-select';

class AJAXSelect extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `
      <select>
        <option></option>
      </select>
    `;
  }

  connectedCallback() {
    const selectElem = this.shadowRoot.querySelector('select');
    selectElem.setAttribute('name', this.name);
  }

  get name() {
    return this.getAttribute('name');
  }

  set name(value) {
    this.setAttribute('name', value);
  }
}

customElements.define(ajaxSelectTagName, AJAXSelect);
