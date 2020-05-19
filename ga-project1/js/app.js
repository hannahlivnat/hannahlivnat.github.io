$(() => {
    // ===================================================================================
    // ------------------------------- Functions ----------------------------------------
    // ===================================================================================

    //================================================
    // Function to Toggle Flashcard/Practice Visibility
    //================================================

    const hideOrShowFlashAndPractice = (visibleOrHidden) => {
        $('.flashcard-section').css('visibility', visibleOrHidden);
        $('.practice-list').css('visibility', visibleOrHidden);
    }

    //================================================
    // Function to Add Event Listener on FlashCard
    // Toggle Between Word and Def.
    //================================================
    const flashcardEventListener = (className) => {
        $(className).on("click", (event) => {
            event.stopImmediatePropagation(); //https://www.sitepoint.com/event-bubbling-javascript/
            const $flashcard = $(event.currentTarget);
            const $word = $flashcard.children().eq(0);
            const $def = $flashcard.children().eq(1);
            $word.toggle();
            $def.toggle();
        });
    }

    //================================================
    // Function to Create Practice Item 
    //================================================

    const createPracticeItem = (word) => {
        const $practiceListDiv = $('<div>').addClass('list-div');
        const $x = $('<img>')
            .attr('src', 'https://img.icons8.com/cotton/35/000000/delete-sign--v2.png')
            .attr('class', 'delete-button');
        const $p = $("<p>").text(word);

        $(".list-container").append($practiceListDiv);
        $practiceListDiv.append($x, $p);
    }

    //================================================
    // Function to Add Event Lister to Delete Button
    // When clicked, will remove: 
    // flashcard, list div, and local storage slot
    //================================================

    const createDeleteEventListener = (className) => {
        $(className).on('click', (event) => {
            //remove from practice list
            $(event.currentTarget).parent().remove();
            //remove matching flashcard
            const wordToDelete = $(event.currentTarget).next().text();
            $(`#${wordToDelete}`).parent().remove();

            //If no flashcards left, hide flashcards and list
            if ($('.flashcard').length === 0) {
                hideOrShowFlashAndPractice('hidden');
            }

            //remove word and def from local storage
            deleteFromStorage(wordToDelete);
        });
    }

    //================================================
    // Create Local Storage Array if Not Existing On Load 
    // If Exists, Grab Stored Items
    //================================================

    let flashcardArr;
    const data = localStorage.getItem(`flashcardArr`)

    if (data === null) {
        flashcardArr = [];
        console.log('flashcardArr created');
        localStorage.setItem('flashcardArr', JSON.stringify(flashcardArr));
    } else if (data.length === 0) {
        console.log('flashcardArr has no cards');
    } else {
        const flashcards = JSON.parse(data);
        for (flashcard in flashcards) {
            //get word out of local storage
            const word = flashcards[flashcard].vocabularyWord;
            //get definitions out of their array and into paragraphs within defdiv
            const $defdiv = $('<div>').attr('class', 'definitiondiv')
            const definitions = flashcards[flashcard].definition.toString();
            definitions.replace("[", "");
            definitions.replace("]", "");
            console.log(definitions);

            //Call Functions --- 
            createPracticeItem(word);
            // createPracticeItemAndFlashCard(word, definitions);
            hideOrShowFlashAndPractice('visible');
            createDeleteEventListener('.delete-button');
            flashcardEventListener('.flashcard');
        }
    }

    // ===================================================================================
    // Save Objects to Local Storage
    // ===================================================================================
    const putInStorage = (wordValue, definitionValue) => {
        //get array out of storage
        flashcardArr = JSON.parse(localStorage.getItem('flashcardArr'));

        //push object holding latest vocab word and definition into flashcardArr
        flashcardArr.push({
            'vocabularyWord': `${wordValue}`,
            'definition': JSON.stringify(definitionValue)
        });

        //put array back in storage
        localStorage.setItem('flashcardArr', JSON.stringify(flashcardArr));
    }

    // ===================================================================================
    // Function to Delete Objects from Local Storage
    // ===================================================================================

    const deleteFromStorage = (wordToDelete) => {
        //turn json string into array
        const flashcards = JSON.parse(localStorage.getItem('flashcardArr'));
        //loop through each object in array
        for (flashcard in flashcards) {
            //store each object value in an array and loop to see if any of the values match wordToDelete
            const objectValues = Object.entries(flashcards[flashcard]);
            for (value in objectValues) {
                const array = objectValues[value];
                for (i = 0; i < array.length; i++) {
                    if (array[i] === wordToDelete) {
                        //if a value matches word to delete, delete the whole object
                        const index = flashcards.indexOf(flashcards[flashcard]);
                        flashcards.splice(index, 1);
                    }
                }
            }
        }
        localStorage.setItem('flashcardArr', JSON.stringify(flashcards));

    }

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
                    const $addButton = $("<button>")
                        .text("Add to List")
                        .attr("class", "addButton");
                    const $wordType = $("<p>").text(wordType)
                        .attr("class", "wordType");
                    const $defdiv = $("<div>")
                        .attr('class', 'definitions');

                    //append elements
                    $(".dictionary-entrance").append($wordSection, $wordType, $defdiv);
                    $wordSection.append($word, $addButton);

                    //loop through definition array to create paragraph and append each definition
                    const definitionsArray = [];
                    for (definition of definitions) {
                        definitionsArray.push(definition);
                        const $p = $("<p>").text(definition).attr("class", "definition");
                        $defdiv.append($p);
                    }
                    console.log(definitionsArray);


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

                        //create li item and icon for practice list 
                        createPracticeItem(word);

                        //create h2 and div for flashcard
                        const $h2 = $("<h2>").text(word)
                            .attr('id', word);
                        const $div = $definitions
                            .clone()
                            .attr('class', 'definitiondiv')
                            .hide();
                        $($flashcarddiv).append($h2, $div);

                        // Function Calls ---------------------------------------
                        //make flashcard and practice list visible
                        hideOrShowFlashAndPractice('visible');
                        //Store Flashcard in local storage
                        putInStorage(word, definitionsArray);
                        //create event listener for the delete button
                        createDeleteEventListener('.delete-button');
                        //toggle between word and def on click
                        flashcardEventListener('.flashcard');

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

//https://medium.com/better-programming/how-to-use-local-storage-with-javascript-9598834c8b72
//https://www.taniarascia.com/how-to-use-local-storage-with-javascript/