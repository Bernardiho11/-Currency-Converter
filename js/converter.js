function currencyConverter(amount, fromCurrency, toCurrency) {
  fromCurrency = encodeURIComponent(fromCurrency);
  toCurrency = encodeURIComponent(toCurrency);
  let query = fromCurrency + '_' + toCurrency;
  let request = new XMLHttpRequest(); 
  let url = 'https://free.currencyconverterapi.com/api/v5/convert?q=' + query;

  request.onreadystatechange = function (){
    if (request.readyState === 4 && request.status === 200) {
      var CURR_VAL = document.querySelector('#CURR_VAL');
      CURR_VAL.value = request.response.results[query].val;
    }
  };
  request.open('GET', url, true);
  request.responseType = 'json';
  request.send();

}

currencyConverter(10, 'USD', 'ANG');