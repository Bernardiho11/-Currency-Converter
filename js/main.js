document.addEventListener("DOMContentLoaded", () => {
  
  function createDomElement(name) {
    let element = document.createElement(name);
    return element;
  }

  function populateCurrency() {
    let populateForCurrency = document.querySelector('#CURR_FR');
    let populateToCurrency = document.querySelector('#CURR_TO');
    let currencies = new XMLHttpRequest();
    let url = 'https://free.currencyconverterapi.com/api/v5/currencies';
    currencies.onreadystatechange = () => {
      if (currencies.readyState === 4 && currencies.status === 200) {
        const retrivedCurencies = currencies.response.results;
        let option = createDomElement('option');
        console.log(option);
        for (const [key, value] of Object.entries(retrivedCurencies)) {
            console.log(value['id']);
            option.setAttribute('value', value['id']);
            populateForCurrency.appendChild(option);
        }
          console.log(retrivedCurencies);
      }
    };

    currencies.open('GET', url, true);
    currencies.responseType = 'json';
    currencies.send();
  }


  populateCurrency();

});