$(() => {
  // ===================================================================================
  // Event Listener to Hide and Display Practice List
  // ===================================================================================

  $("#display-ul").on("click", (event) => {
    const $listDiv = $(".list-container");
    $listDiv.toggle();
  });

  // ===================================================================================
  // Create Carousel Effect in FlashCard Section
  // Only one flash card displays at a time. When user clicks prev or next button, first
  // check that there is more than one card. If only one card present, do nothing.
  // if multiple cards present, display next card.
  // ===================================================================================
  let currentFlashcardIndex = 0;

  $(".flashcard-button").on("click", (event) => {
    if ($(".flashcard").length === 0) {
        return;
    } else {
        $(".flashcards").children().eq(currentFlashcardIndex).css('display', 'none');
        if (currentFlashcardIndex < $(".flashcard").length) {
            currentFlashcardIndex ++
        } else {
            currentFlashcardIndex = 0;
        }
        $(".flashcards").children().eq(currentFlashcardIndex).css('display', 'flex');
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
      // verbal illustration
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
          console.log(dictionary[0]);

          // =====================================================
          // Return Data. Declare Variables
          // to store data and created elements
          // append created elements to div - '.dictionary-entrance'
          // ======================================================

          let searchedWord = wordObject.hwi.hw.replace("*", "").toUpperCase();
          console.log(searchedWord);
          const definitions = wordObject.shortdef;
          console.log(definitions);
          // const example = wordObject.def[0].sseq[0][0][1].dt[0][1];
          // console.log(example);

          // create elements for dom
          const $h2 = $("<h2>").text(searchedWord).attr("id", "vocabularyWord");
          const $defdiv = $("<div>").attr("id", "definitions");

          $(".dictionary-entrance").append($h2, $defdiv);

          //loop through definition array to create paragraph for each definition
          for (definition of definitions) {
            const $p = $("<p>").text(definition).attr("class", "definition");

            $defdiv.append($p);
          }

          // ========================================================
          // Event Listener on word paragraph -
          // On click, word text used to create li in '.practice-list.'
          // and word and sibling definition used to create flashcard
          // =========================================================

          $("#vocabularyWord").on("click", (event) => {
            const $flashcarddiv = $("<div>").addClass("flashcard");
            $(".flashcards").append($flashcarddiv);
            const word = $(event.target).text();
            const $definitions = $(event.target).next();
            const $li = $("<li>").text(word);
            $(".practice-list ul").append($li);
            const $h2 = $("<h2>").text(word);
            const $div = $definitions.clone().hide();
            $($flashcarddiv).append($h2, $div);

            // =============================
            // Event Listener on FlashCard
            // Toggle Between Word and Def.
            // =============================

            $(".flashcard").on("click", (event) => {
              const $def = $(event.currentTarget).children().eq(1);
              const $word = $(event.currentTarget).children().eq(0);
              $word.toggle();
              $def.toggle();
            });
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }); //Event Listener for Input Ends
}); //BEYOND THE WALL
