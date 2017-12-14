function ajax(url) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, true); // true:非同期、false:同期
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

function get_url_vars()
{
  let vars = new Object, params;
  let temp_params = window.location.search.substring(1).split('&');
  for(var i = 0; i <temp_params.length; i++) {
    params = temp_params[i].split('=');
    vars[params[0]] = params[1];
  }
  return vars;
}


function openURL() 
{ 
  let textarea = document.getElementById('formula');
  let formula_string = textarea.value;
  const base_url = "http://localhost:11411/index.html?formula=";
  formula_string = escape(formula_string);
  const url = base_url + formula_string;
  location.href = url; 
}

function get_json(url){
  $.ajax({
    url: url,
    type: "get",
  }).done(function (data, textStatus, jqXHR) {
    console.log(data); // => "OK"
  }).fail(function (jqXHR, textStatus, errorThrown) {
    console.log(errorThrown); // => Error Message
  });
}

function main()
{
  let parameter_dict = get_url_vars();
  if ("formula" in parameter_dict)
  {
    btc_per_altcoin_pair ={'eth': 'eth_btc','xrp': 'xrp_btc','bch': 'bch_btc','ltc': 'ltc_btc','dash': 'dash_btc',
                            'xem': 'xem_btc','xmr': 'xmr_btc','etc': 'etc_btc','lsk': 'lsk_btc','zec': 'zec_btc',
                            'rep': 'rep_btc','fct': 'fct_btc'};
    fiat_per_btc_dict = {"jpy":1879733.99}
    let formula_string = decodeURI(parameter_dict["formula"]);
    let textarea = document.getElementById('formula');
    textarea.value = formula_string;
    for(key in btc_per_altcoin_pair){
      let regexp = new RegExp(key,"gi");
      if (regexp.test(formula_string)){

        console.log(btc_per_altcoin_pair[key]);
      }
    }  
    ajax("http://bittrex.com/api/v1.1/public/getticker?market=BTC-LTC");
    // getURL("https://bittrex.com/api/v1.1/public/getticker?market=BTC-LTC",function(c,t){alert(c)});
    // get_json("https://bittrex.com/api/v1.1/public/getticker?market=BTC-LTC");
    formula_string = formula_string.replace(/btc/ig,"*"+fiat_per_btc_dict["jpy"]);
    let answer = eval(formula_string);
    console.log(answer);

  }


}

main();