const ajaxSelectTagName = 'ajax-select';

class AJAXSelect extends HTMLSelectElement {
  constructor() {
    super();
  }

  connectedCallback() {
    let xhr = new XMLHttpRequest();
    xhr.onload = () => {
      if(xhr.status >= 200 && xhr.status < 300) {
        let response = JSON.parse(xhr.response);
        for(let x in response) {
          let optionElem = document.createElement('option');
          optionElem.text = response[x];
          this.add(optionElem);
        }
      }
    };
    xhr.open('GET', this.ajaxUrl);
    xhr.send();
  }

  get ajaxUrl() {
    return this.getAttribute('ajax-url');
  }
}

customElements.define(ajaxSelectTagName, AJAXSelect, {extends: 'select'});
