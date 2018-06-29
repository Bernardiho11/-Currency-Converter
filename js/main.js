document.addEventListener("DOMContentLoaded", () => {
  
  function showCurrencyList(currencyList) {
    if(currencyList.style.display = 'none'){
      currencyList.style.display = 'block';
    }else {
      currencyList.style.display = 'none';
    }
  }

  function createDomElement(name, value) {
    let element = document.createElement(name);
    element.setAttribute('value', value.id);
    element.textContent = value.currencyName + '(' + value.id + ')';
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
        let li_to, li_for;
        for (const [key, value] of Object.entries(retrivedCurencies)) {
            li_for = createDomElement('li', value);
            li_to = createDomElement('li', value);
            console.log(li_for);
            populateForCurrency.appendChild(li_for);
            populateToCurrency.appendChild(li_to);
        }
          console.log(retrivedCurencies);
      }
    };

    currencies.open('GET', url, true);
    currencies.responseType = 'json';
    currencies.send();
  }


  populateCurrency();



  // const from = document.getElementById('from');
  // const to = document.getElementById('to');
  const fromCurrency = document.getElementById('from-currency');    
  const toCurrency = document.getElementById('to-currency');

  //showCurrencyList(from, fromCurrency);
  //showCurrencyList(to, toCurrency);  
        

});