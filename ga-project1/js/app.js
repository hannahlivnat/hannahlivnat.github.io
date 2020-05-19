$(() => {
    // ===================================================================================
    // Load Vocabulary and Definitions from Local Storage
    // ===================================================================================
    // if (localStorage.getItem('flashcardArr') === null) {
    //     //no flashcards saved yet, do nothing
    //     return;
    // } else {
    //     //get flashcardArr and parse back into array with nested objects
    //     const flashcards = JSON.parse(localStorage.getItem('flashcardArr'));
    //     console.log(flashcards);

    //     //use a loop to go through array and create a flashcard from each nested object

    // }




    // ===================================================================================
    // Event Listener to Hide and Display Practice List
    // ===================================================================================

    $("#display-ul").on("click", (event) => {
        const $listDiv = $(".list-container");
        if ($listDiv.css('display') == 'none') {
            $listDiv.css('display', 'flex');
        } else {
            $listDiv.css('display', 'none');
        }
    });

    // ===================================================================================
    // Event Listener to Hide and Display Practice List
    // ===================================================================================

    $("#toggle-instructions-button").on("click", () => {
        $(".about").css("display", "flex");
        $(".main").css("visibility", "hidden");
        $('footer').css("visibility", 'hidden');
    });

    $("#close").on("click", () => {
        $(".about").css("display", "none");
        $(".main").css("visibility", "visible");

    });

    // ===================================================================================
    // Create Carousel Effect in FlashCard Section
    // Only one flash card displays at a time. When user clicks prev or next button, first
    // check that there is more than one card. If only one card present, do nothing.
    // if multiple cards present, display next card.
    // ===================================================================================
    let currentFlashcardIndex = 0;

    $(".flashcard-button").on("click", (event) => {
        if ($(".flashcards").children().length === 0) {
            return;
        } else {
            $(".flashcards")
                .children()
                .eq(currentFlashcardIndex)
                .css("display", "none");
            if (currentFlashcardIndex < $(".flashcards").children().length - 1) {
                currentFlashcardIndex++;
            } else {
                currentFlashcardIndex = 0;
            }
            $(".flashcards")
                .children()
                .eq(currentFlashcardIndex)
                .css("display", "flex");
        }
    });

    // =======================================
    // Event Listener on hitting return in input Section
    // Begins API request on Enter
    // =======================================

    $('input[type="text"]').on("keyup", (event) => {
        if (event.keyCode === 13) {
            //prevent default refresh
            event.preventDefault();

            //remove previous definition
            $(".dictionary-entrance").html(" ");

            //word that user searced for in input
            let wordSearched = $(event.target).val();
            $(event.target).val(" ");

            // =======================================
            // API Request Made to Merriam Webster API
            // Filter Should Return - word searched for
            // Pull data for - word searched for, definition,
            // =======================================

            $.ajax({
                    url: `https://dictionaryapi.com/api/v3/references/collegiate/json/${wordSearched}?key=fa575937-7cb3-4693-97d6-5e6e4a352192`,
                    type: "GET",
                    data: {
                        $limit: 1,
                    },
                })
                .then((dictionary) => {
                    wordObject = dictionary[0];

                    // =====================================================
                    // Return Data. Declare Variables
                    // to store data and created elements
                    // append created elements to div - '.dictionary-entrance'
                    // ======================================================

                    let searchedWord = wordObject.hwi.hw
                        .split("*")
                        .join("")
                        .toUpperCase();
                    const definitions = wordObject.shortdef;
                    const wordType = wordObject.fl;

                    // create elements for dom
                    const $wordSection = $("<div>").addClass("wordHolder");
                    const $word = $("<h3>")
                        .text(searchedWord)
                        .addClass('vocab')
                        .attr("id", "vocabularyWord");
                    const $addButton = $("<button>")
                        .text("Add to List")
                        .attr("class", "addButton");
                    const $wordType = $("<p>").text(wordType)
                        .attr("class", "wordType");
                    const $defdiv = $("<div>")
                        .attr("id", "definitions")
                        .attr('class', 'definitions');

                    //append elements
                    $(".dictionary-entrance").append($wordSection, $wordType, $defdiv);
                    $wordSection.append($word, $addButton);

                    //loop through definition array to create paragraph and append each definition
                    for (definition of definitions) {
                        const $p = $("<p>").text(definition).attr("class", "definition");
                        $defdiv.append($p);
                    }

                    // ========================================================
                    // Event Listener on word paragraph -
                    // On click, word text used to create li in '.practice-list.'
                    // and word and sibling definition used to create flashcard
                    // =========================================================

                    $(".addButton").on("click", (event) => {
                        //create new empty flashcard
                        const $flashcarddiv = $("<div>").addClass("flashcard");
                        $(".flashcards").append($flashcarddiv);

                        //select vocabulary word and definition
                        const word = $(event.target).prev().text();
                        const $definitions = $(event.target).parent().next().next();
                        console.log($definitions);


                        //create li item and icon for practice list 
                        const $practiceListDiv = $('<div>').addClass('list-div');
                        const $p = $("<p>").text(word);
                        const $x = $('<img>')
                            .attr('src', 'https://img.icons8.com/cotton/35/000000/delete-sign--v2.png')
                            .attr('class', 'delete-button');
                        $(".list-container").append($practiceListDiv);
                        $practiceListDiv.append($x, $p)

                        //create h2 and div for flashcard
                        const $h2 = $("<h2>").text(word)
                            .attr('id', word);
                        const $div = $definitions
                            .clone()
                            .attr('class', 'definitiondiv')
                            .attr('id', 'definitiondiv')
                            .hide();
                        $($flashcarddiv).append($h2, $div);

                        //make flashcard and practice list visible
                        $('.flashcard-section').css('visibility', 'visible');
                        $('.practice-list').css('visibility', 'visible');

                        //Delete word from practice list if x button clicked
                        $('.delete-button').on('click', (event) => {
                            //remove from list
                            $(event.currentTarget).parent().remove();
                            const wordToDelete = $(event.currentTarget).next().text();
                            console.log(wordToDelete);

                        });

                        // =============================
                        // Store flashcard in local storage
                        // =============================
                        let flashcardArr;
                        //When word and def values are created, enter them in as new object
                        if (localStorage.getItem('flashcardArr') === null) {
                            //create flashcardArr to hold flashcard value and definition
                            flashcardArr = [];
                        } else {
                            //get flashcardArr and parse back into array with nested objects
                            flashcardArr = JSON.parse(localStorage.getItem('flashcardArr'));
                        }

                        //push object holding latest vocab word and definition into flashcardArr
                        flashcardArr.push({
                            'vocabularyWord': word,
                            'definition': $definitions
                        });
                        localStorage.setItem('flashcardArr', JSON.stringify(flashcardArr));

                        // =============================
                        // Event Listener on FlashCard
                        // Toggle Between Word and Def.
                        // =============================

                        $(".flashcard").on("click", (event) => {
                            event.stopImmediatePropagation(); //https://www.sitepoint.com/event-bubbling-javascript/
                            const $flashcard = $(event.currentTarget);
                            console.log($flashcard);
                            console.log($flashcard.children().eq(0));
                            const $word = $flashcard.children().eq(0);
                            const $def = $flashcard.children().eq(1);
                            $word.toggle();
                            $def.toggle();

                            // =============================
                            // Event Listener on Delete Icon
                            // Delete Word off Practice List
                            // =============================
                        });
                    }); //End of 'addbutton' event listener
                }) //end of .then

                .catch((err) => {
                    console.log(err);
                    const $h2 = $("<h2>").text(
                        "Sorry, we don't know this word. Please try again."
                    );
                    $h2.addClass("errorH2");
                    $(".dictionary-entrance").append($h2);
                }); //end of .catch
        } //end of return if statement
    }); //Event Listener for Input Ends
}); //BEYOND THE WALL


//==================================================
//Resources
//==================================================

// local storage - https://medium.com/better-programming/how-to-use-local-storage-with-javascript-9598834c8b72