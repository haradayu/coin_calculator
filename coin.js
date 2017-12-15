
function get_url_vars(){
  let vars = new Object, params;
  let temp_params = window.location.search.substring(1).split('&');
  for(var i = 0; i <temp_params.length; i++) {
    params = temp_params[i].split('=');
    vars[params[0]] = params[1];
  }
  return vars;
}

function openURL() { 
  let textarea = document.getElementById('formula');
  let formula_string = textarea.value;
  let self_url = location.href;
  self_url = self_url.replace(/\?.*$/,"");
  const base_url = self_url + "?formula=";
  formula_string = escape(formula_string);
  let url = base_url + formula_string;
  location.href = url; 
}


function get_json(url){
  let return_data;
  $.ajax({
    url: url,
    type: "get",
    async: false,
  }).done(function (data, textStatus, jqXHR) {
    return_data = data;
  }).fail(function (jqXHR, textStatus, errorThrown) {
    console.log(errorThrown); // => Error Message
  });
  return return_data;
}

function main(){
  let parameter_dict = get_url_vars();
  if ("formula" in parameter_dict)
  {
    let formula_string = decodeURI(parameter_dict["formula"]);
    let textarea = document.getElementById('formula');
    textarea.value = formula_string;
    $.when(
        get_json("https://poloniex.com/public?command=returnTicker"),
        get_json("https://public.bitbank.cc/mona_btc/ticker"),
        get_json("https://public.bitbank.cc/btc_jpy/ticker")
    )
    .done(function(poloniex, mona_btc, btc_jpy) {
      console.log($.parseJSON(mona_btc));
      mona_btc = $.parseJSON(mona_btc)["data"];
      btc_jpy = $.parseJSON(btc_jpy)["data"];
      let btc_per_fiat = btc_jpy["last"] - 0;
      for(key in poloniex){
        if(/BTC_/.test(key)){
          let altcoin = key.replace("BTC_",""),
              regexp = new RegExp(altcoin,"gi");
          if (regexp.test(formula_string)){
            formula_string = formula_string.replace(regexp,"*" + (poloniex[key]["last"] * btc_per_fiat));
          }         
        }
      }
      if (/mona/ig.test(formula_string)){
        formula_string = formula_string.replace(/mona/ig,"*" + (mona_btc["last"] * btc_per_fiat));
      }
      if (/btc/ig.test(formula_string)){
        formula_string = formula_string.replace(/btc/ig,"*" + (btc_per_fiat));
      }               
      let answer = eval(formula_string);
      console.log(answer);
      console.log($('#answer')[0].value = Math.round(answer));
    })
    .fail(function(xhr, textStatus, errorThrown) {
        alert("時価の取得に失敗しました。");
    });

  }


}

main();