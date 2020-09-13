// service response is passed as callback function's argument
function countrySelector(response) {
  // this references the select element to which callback function is attached
  response.forEach(element => this.addOption(element['name'], element['numericCode']));
}
