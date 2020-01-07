const ajaxSelectTagName = 'ajax-select';
const template = document.createElement('template');
template.innerHTML = `
  <select>
    <option></option>
  </select>
`;

class AJAXSelect extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    const selectElem = this.shadowRoot.querySelector('select');
    selectElem.setAttribute('name', this.name);

    let xhr = new XMLHttpRequest();
    xhr.onload = () => {
      if(xhr.status >= 200 && xhr.status < 300) {
        let response = JSON.parse(xhr.response);
        for(let x in response) {
          let optionElem = document.createElement('option');
          optionElem.text = response[x];
          selectElem.add(optionElem);
        }
      }
    };
    xhr.open('GET', this.url);
    xhr.send();
  }

  get name() {
    return this.getAttribute('name');
  }

  set name(value) {
    this.setAttribute('name', value);
  }

  get url() {
    return this.getAttribute('url');
  }
}

customElements.define(ajaxSelectTagName, AJAXSelect);
