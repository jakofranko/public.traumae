(function() {
    var el              = document.getElementById("translator"),
        eng_to_tra      = document.createElement("div"),
        eng_input       = document.createElement("textarea"),
        tra_output      = document.createElement("div"),
        tra_to_eng      = document.createElement("div"),
        tra_input       = document.createElement("textarea"),
        eng_output      = document.createElement("div"),
        letters_input   = document.createElement("textarea");
        tra_letters     = document.createElement("div");

    // Attributes
    eng_to_tra.id = "eng_to_tra";
    eng_input.id = "eng_input";
    tra_output.id = "tra_output";
    tra_to_eng.id = "tra_to_eng";
    tra_input.id = "tra_input";
    eng_output.id = "eng_output";
    letters_input.id = "letters_input";
    tra_letters.id = "tra_letters";

    // Listeners
    eng_input.addEventListener('change', englishToTraumae);
    tra_input.addEventListener('change', traumaeToEnglish);
    letters_input.addEventListener('change', letters);

    // Assemble
    eng_to_tra.appendChild(eng_input);
    eng_to_tra.appendChild(tra_output);
    tra_to_eng.appendChild(tra_input);
    tra_to_eng.appendChild(eng_output);
    el.appendChild(eng_to_tra);
    el.appendChild(tra_letters);
    el.appendChild(tra_to_eng);

    // Handlers
    function englishToTraumae(e) {
        console.log(e);
    }

    function traumaeToEnglish(e) {
        console.log(e);
    }

    function letters(e) {
        console.log(e);
    }

})();