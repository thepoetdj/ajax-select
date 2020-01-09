const ajaxSelectTagName = 'ajax-select';

class AJAXSelect extends HTMLSelectElement {
  constructor() {
    super();

    this._xhr = new XMLHttpRequest();
    this._xhr.onload = () => {
      if(this.isSuccess(this._xhr.status)) {
        this.fetchElements();
      }
    };
  }

  connectedCallback() {
    this._xhr.open('GET', this.ajaxUrl);
    this._xhr.send();
  }

  isSuccess(status) {
    return status >= 200 && status < 300;
  }

  fetchElements() {
    let response = JSON.parse(this._xhr.response);
    for(let x in response) {
      this.addOption(response[x].text, response[x].value);
    }
  }

  addOption(text, value) {
    let option = document.createElement('option');
    option.text = text;
    if(value) {
      option.value = value;
    }
    this.add(option);
  }

  get ajaxUrl() {
    return this.getAttribute('ajax-url');
  }
}

customElements.define(ajaxSelectTagName, AJAXSelect, {extends: 'select'});
