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
                const letter_types = ['ehrivevnv', 'alt', 'july', 'neau', 'lith', 'fune']
                let el              = document.getElementById("translator"),
                    eng_to_tra      = document.createElement("div"),
                    eng_input       = document.createElement("textarea"),
                    tra_output      = document.createElement("div"),
                    tra_to_eng      = document.createElement("div"),
                    tra_input       = document.createElement("textarea"),
                    eng_output      = document.createElement("div"),
                    letters_input   = document.createElement("textarea"),
                    letter_type     = document.createElement("select"),
                    words, traumae, english;

                // create the traume dict
                for(const english in dict) {
                    if(!tra_dict[dict[english].traumae]) tra_dict[dict[english].traumae] = [];
                    if(dict[english].traumae) tra_dict[dict[english].traumae].push(english);
                }

                // Attributes
                eng_to_tra.id = "eng_to_tra";
                eng_input.id = "eng_input";
                eng_input.placeholder = "English..."
                tra_output.id = "tra_output";
                tra_to_eng.id = "tra_to_eng";
                tra_input.id = "tra_input";
                tra_input.placeholder = "Traumae..."
                eng_output.id = "eng_output";
                letters_input.placeholder = "Letters..."
                letters_input.id = "letters_input";
                letter_types.forEach(type => {
                    let option = document.createElement('option');
                    option.textContent = type;
                    letter_type.appendChild(option);
                });

                // Listeners
                eng_input.addEventListener('keyup', englishToTraumae);
                tra_input.addEventListener('keyup', traumaeToEnglish);
                letters_input.addEventListener('keyup', letters);
                letter_type.addEventListener('change', typeChange);

                // Assemble
                eng_to_tra.appendChild(eng_input);
                eng_to_tra.appendChild(tra_output);
                tra_to_eng.appendChild(tra_input);
                tra_to_eng.appendChild(eng_output);
                el.appendChild(eng_to_tra);
                el.appendChild(tra_to_eng);
                el.appendChild(letter_type);
                el.appendChild(document.createElement('br'));
                el.appendChild(letters_input);

                // Handlers
                function englishToTraumae(e) {
                    words = e.target.value.split(" ");
                    traumae = [];
                    words.forEach(english => {
                        if(dict[english] && dict[english].traumae)
                            traumae.push(dict[english].traumae);
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

                const letters_dict = {"letter":{"q":{"traumae":"KI","english":"State"},"-q":{"traumae":"KIN","english":"Location"},"+q":{"traumae":"KIM","english":"Time"},"w":{"traumae":"XI","english":"Psychological"},"-w":{"traumae":"XIN","english":"Physiologic"},"+w":{"traumae":"XIM","english":"Physical"},"e":{"traumae":"SI","english":"Organic"},"-e":{"traumae":"SIN","english":"Mechanical"},"+e":{"traumae":"SIM","english":"Spiritual"},"a":{"traumae":"KA","english":"Intrusive"},"-a":{"traumae":"KAN","english":"Stable"},"+a":{"traumae":"KAM","english":"Extrusive"},"s":{"traumae":"XA","english":"LOOP"},"-s":{"traumae":"XAN","english":"LOOP"},"+s":{"traumae":"XAM","english":"LOOP"},"d":{"traumae":"SA","english":"Multiple"},"-d":{"traumae":"SAN","english":"Unique"},"+d":{"traumae":"SAM","english":"Void"},"z":{"traumae":"KE","english":"Temper"},"-z":{"traumae":"KEN","english":"Colour"},"+z":{"traumae":"KEM","english":"Weight"},"x":{"traumae":"XE","english":"Bright"},"-x":{"traumae":"XEN","english":"Neutral"},"+x":{"traumae":"XEM","english":"Dark"},"c":{"traumae":"SE","english":"To Modify"},"-c":{"traumae":"SEN","english":"To Observe"},"+c":{"traumae":"SEM","english":"To Exist"}},"alt":{"3":{"traumae":"KI","english":"State"},"-3":{"traumae":"KIN","english":"Location"},"+3":{"traumae":"KIM","english":"Time"},"2":{"traumae":"XI","english":"Psychological"},"-2":{"traumae":"XIN","english":"Physiologic"},"+2":{"traumae":"XIM","english":"Physical"},"1":{"traumae":"SI","english":"Organic"},"-1":{"traumae":"SIN","english":"Mechanical"},"+1":{"traumae":"SIM","english":"Spiritual"},"6":{"traumae":"KA","english":"Intrusive"},"-6":{"traumae":"KAN","english":"Stable"},"+6":{"traumae":"KAM","english":"Extrusive"},"5":{"traumae":"XA","english":"LOOP"},"-5":{"traumae":"XAN","english":"LOOP"},"+5":{"traumae":"XAM","english":"LOOP"},"4":{"traumae":"SA","english":"Multiple"},"-4":{"traumae":"SAN","english":"Unique"},"+4":{"traumae":"SAM","english":"Void"},"9":{"traumae":"KE","english":"Temper"},"-9":{"traumae":"KEN","english":"Colour"},"+9":{"traumae":"KEM","english":"Weight"},"8":{"traumae":"XE","english":"Bright"},"-8":{"traumae":"XEN","english":"Neutral"},"+8":{"traumae":"XEM","english":"Dark"},"7":{"traumae":"SE","english":"To Modify"},"-7":{"traumae":"SEN","english":"To Observe"},"+7":{"traumae":"SEM","english":"To Exist"}},"septambres":{"r":{"traumae":"KI","english":"State"},"q":{"traumae":"KIN","english":"Location"},"Q":{"traumae":"KIM","english":"Time"},"t":{"traumae":"XI","english":"Psychological"},"w":{"traumae":"XIN","english":"Physiologic"},"W":{"traumae":"XIM","english":"Physical"},"y":{"traumae":"SI","english":"Organic"},"e":{"traumae":"SIN","english":"Mechanical"},"E":{"traumae":"SIM","english":"Spiritual"},"f":{"traumae":"KA","english":"Intrusive"},"a":{"traumae":"KAN","english":"Stable"},"A":{"traumae":"KAM","english":"Extrusive"},"g":{"traumae":"XA","english":"LOOP"},"s":{"traumae":"XAN","english":"LOOP"},"S":{"traumae":"XAM","english":"LOOP"},"h":{"traumae":"SA","english":"Multiple"},"d":{"traumae":"SAN","english":"Unique"},"D":{"traumae":"SAM","english":"Void"},"v":{"traumae":"KE","english":"Temper"},"z":{"traumae":"KEN","english":"Colour"},"Z":{"traumae":"KEM","english":"Weight"},"b":{"traumae":"XE","english":"Bright"},"x":{"traumae":"XEN","english":"Neutral"},"X":{"traumae":"XEM","english":"Dark"},"n":{"traumae":"SE","english":"To Modify"},"c":{"traumae":"SEN","english":"To Observe"},"C":{"traumae":"SEM","english":"To Exist"}}};
                function letters(e) {
                    // Loops are spaces or question marks
                    let type = letter_type.value;
                    let sentence = e.target.value;
                    let traumae = [];
                    let english = [];
                    let alt;
                    switch(type) {
                        case "ehrivevnv":
                            alt = "letter";
                            break;
                        case "alt":
                            alt = "alt";
                            break;
                        case "july":
                        case "neau":
                        case "lith":
                        case "fune":
                            alt = "septambres";
                            break;
                        default:
                            break;
                    }
                    // Loop through each letter
                    let curr_string = "";
                    for(let c of sentence) {
                        curr_string += c;
                        if(c == "+" || c == "-") continue;
                        if(letters_dict[alt][curr_string]) {
                           english.push(letters_dict[alt][curr_string].english);
                           traumae.push(letters_dict[alt][curr_string].traumae);
                        } else {
                           english.push("<missing>");
                           traumae.push("<missing>");
                        }
                        curr_string = "";
                    }

                    tra_output.innerText = traumae.join(" ");
                    eng_output.innerText = english.join(" ")
                }

                function typeChange(e) {
                    let type = e.target.value;
                    letters_input.classList = `ehriv_aeth ${type}`;
                }
            } else {
                console.error(dict_request);
            }
        default:
            break;
    }
}