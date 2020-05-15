
$(() => {

    // =======================================
    // Event Listener in input Section
    // Begins API request on Enter
    // =======================================
    
    $('input[type="text"]').on('keyUp', event => {
        event.preventDefault();

        // =======================================
        // Declare Variables 
        // =======================================

        //word that user searced for in input
        let wordSearched = $(event.target).val();

        // =======================================
        // API Request Made to Merriam Webster API
        // Filter Should Return - word searched for
        // Pull data for - word searched for, definition, 
        // verbal illustration
        // =======================================

        $.ajax ({

            url: // `https://www.dictionaryapi.com/api/v3/references/collegiate/json/voluminous?key=fa575937-7cb3-4693-97d6-5e6e4a352192&id=${wordSearched}`,
            type: 'GET',
            data {
                "$limit": 1
            }
        })
            .then((dictionary => {
            // =====================================================
            // For of Loop Returns Data. Declare Variables
            // to store data and created elements
            // append created elements to div - '.dictionary-entrance'
            // ======================================================
            
            //for (word of dictionary) {
            // log(word)
            // save data to variables
            // const searchedWord = word.id
            // const definition = word.shortdef
            // const example = find where verbal illustration is by logging word
            // create elements for dom
            // const $h2 = $('<h2>').text(searchedWord).attr('id', 'vocabularyWord');
            // const $p = $('<p>').text(definition).attr('id', 'definition');
            // const $p2 = $p.clone().text(example).attr('id', 'vocabularyExample');
            // append created elements to div '.dictionary-entrance'
            // $('.dictionary-entrance').append($h2, $p, $p2);
            //}

            // ========================================================
            // Event Listener on word paragraph - 
            // On click, word text used to create li in '.practice-list.'
            // and word and sibling definition used to create flashcard
            // =========================================================
            
            //on('click', (event) => {
            //  const word =  $(event.currentTarget).text();
            //  const definition = $(event.currentTarget).next().text();
            //  const $li = $('<li>').text(word);
            //  $('.practice-list ul').append(li);
            //  const $h2 = $('<h2>').text(word);
            //  const $p = $('<p>').text(definition).hide()
            //  $('.flashcard').append($h2, $p);

                // =============================
                //Event Listener on FlashCard
                // =============================
                //$('.flashcard).on('click', event => {
                //  const $def = $(event.currentTarget).children().eq(1);
                //  const $word = $(event.currentTarget).children().eq(0)
                //  $word.toggle();
                //  $def.toggle();
                //});

            //})
            
            })
            .catch(err => {
                console.log(err);
                
        }) //AJAX Request Ends

        // ===================================================================================
        // Create Carousel Effect in FlashCard Section
        // Only one flash card displays at a time. When user clicks prev or next button, first
        // check that there is more than one card. If only one card present, do nothing. 
        // if multiple cards present, display next card.
        // ===================================================================================
        
        //$('.flashcard-button).on('click', (event) => {
        // if statement - are there one or multiple flash cards? 
        //  if one - do nothing
        //  if multiple: 
        //      if($(event.currentTarget).attr('id') === 'prev')
        //          Are there flashcards to the right to display? 
        //          move flashcards to the right to display prev flashcard
        //      if($even.currentTarget.attr('id') ==='next') 
        //          Are there flashcards to the left to display? 
        //          move flashcards to the left to display next flashcard
        //})

    }) //Event Listener for Input Ends
}); //BEYOND THE WALL