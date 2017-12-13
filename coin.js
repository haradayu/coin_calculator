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

function main()
{
  let parameter_dict = get_url_vars();
  if ("formula" in parameter_dict)
  {
    let formula_string = decodeURI(parameter_dict["formula"]);
    let textarea = document.getElementById('formula');
    textarea.value = formula_string;  
    let answer = eval(formula_string);

  }


}

main();