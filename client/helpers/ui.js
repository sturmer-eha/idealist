UI.registerHelper('s', function(input, format){
  switch(typeof input){
    case "number":
      if (input*input == 1) return '';
    break;

    case "object":
      if (input.length == 1) return '';
  }

  return 's';
});
