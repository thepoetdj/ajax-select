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

    // find keys to read values from response objects
    let textField = 'text';    // default option text field's key
    let valueField = 'value';  // default option value field's key
    if(this.ajaxFields) {
      let fields = this.ajaxFields.split(this.ajaxDelimiter || ',');  // expect comma as default keys delimiter
      textField = fields[0];
      valueField = fields[1];
    }

    response.forEach(element => this.addOption(element[textField], element[valueField]));
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

  get ajaxFields() {
    return this.getAttribute('ajax-fields');
  }

  get ajaxDelimiter() {
    return this.getAttribute('ajax-delimiter');
  }
}

customElements.define(ajaxSelectTagName, AJAXSelect, {extends: 'select'});
