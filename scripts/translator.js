let dict_request = new XMLHttpRequest();
dict_request.onreadystatechange = init;
dict_request.open('POST', '/dict.load');
dict_request.send();

function init() {
    switch(dict_request.readyState) {
        case 0:
            console.log("Waiting to initialize request...");
            break;
        case 1:
            console.log("Established connection to the server...");
            break;
        case 2:
            console.log("Server has recieved request...");
            break;
        case 3:
            console.log("The dictionary is being prepared...");
        case 4:
            console.log("Dictionary recieved. Initializing translator");
            if(dict_request.status === 200) {
                // Only init once, so remove handler after success
                dict_request.onreadystatechange = null;

                const dict = JSON.parse(dict_request.responseText);
                const tra_dict = {};
                let el              = document.getElementById("translator"),
                    eng_to_tra      = document.createElement("div"),
                    eng_input       = document.createElement("textarea"),
                    tra_output      = document.createElement("div"),
                    tra_to_eng      = document.createElement("div"),
                    tra_input       = document.createElement("textarea"),
                    eng_output      = document.createElement("div"),
                    letters_input   = document.createElement("textarea"),
                    tra_letters     = document.createElement("div"),
                    words, traumae, english;

                // create the traume dict
                for(const english in dict) {
                    if(!tra_dict[dict[english].traumae]) tra_dict[dict[english].traumae] = [];
                    if(dict[english].traumae) tra_dict[dict[english].traumae].push(english);
                }

                console.log(dict);
                console.log(tra_dict);

                // Attributes
                eng_to_tra.id = "eng_to_tra";
                eng_input.id = "eng_input";
                eng_input.placeholder = "English..."
                tra_output.id = "tra_output";
                tra_to_eng.id = "tra_to_eng";
                tra_input.id = "tra_input";
                tra_input.placeholder = "Traumae..."
                eng_output.id = "eng_output";
                letters_input.id = "letters_input";
                tra_letters.id = "tra_letters";

                // Listeners
                eng_input.addEventListener('keyup', englishToTraumae);
                tra_input.addEventListener('keyup', traumaeToEnglish);
                letters_input.addEventListener('keyup', letters);

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
                    words = e.target.value.split(" ");
                    traumae = [];
                    words.forEach(english => {
                        if(dict[english] && dict[english].traumae)
                            traumae.push(dict[english].traumae)
                        else
                            traumae.push("<missing>");
                    });
                    tra_output.textContent = traumae.join(" ");
                }

                function traumaeToEnglish(e) {
                    english = [];
                    words = e.target.value.split(" ");
                    words.forEach(traumae => {
                        if(tra_dict[traumae])
                            english.push(`<span title="${tra_dict[traumae].join(", ")}">${tra_dict[traumae][0]}</span>`);
                        else
                            english.push("<missing>");
                    });
                    eng_output.innerHTML = english.join(" ");
                }

                function letters(e) {
                    console.log(e);
                }
            } else {
                console.error(dict_request);
            }
        default:
            break;
    }
}