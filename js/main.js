function createDomElement(name, value) {
  let element = document.createElement(name);
  element.setAttribute('value', value.id);
  element.textContent = value.currencyName + '(' + value.id + ')';
  return element;
}

function populateCurrency() {
  let populateForCurrency = document.querySelector('#CURR_FR');
  let populateToCurrency = document.querySelector('#CURR_TO');
  let url = 'https://free.currencyconverterapi.com/api/v5/currencies';

  fetch(url).then((response)=>{
    return response.json();
  }).then((data)=>{
    let option_to, option_for;
    for (const [key, value] of Object.entries(data.results).sort()) {
        option_for = createDomElement('option', value);
        option_to = createDomElement('option', value);
        populateForCurrency.appendChild(option_for);
        populateToCurrency.appendChild(option_to);
    }
  })
}


populateCurrency();


let convert = document.querySelector('#convert');

convert.addEventListener('click', (e)=>{
  e.preventDefault();
  let amount = document.querySelector('#amount').value;
  let fromCurrency = document.querySelector('#CURR_FR').value;
  let toCurrency = document.querySelector('#CURR_TO').value;
  let displayValue = document.querySelector('#CURR_VAL');
  let query = `${fromCurrency}_${toCurrency}`;
  let url = `https://free.currencyconverterapi.com/api/v5/convert?q=${query}`;
  fetch(url).then((response)=>{
    displayValue.placeholder = 'Converting...';
    return response.json();
  }).then((data)=>{
    console.log(data.results[query].val);
    let total = Math.round((amount * data.results[query].val) * 1000) / 1000;
    displayValue.placeholder = total;
  }).catch((err)=>{
    alert(`Sorry we encontered an error`);
  });
})