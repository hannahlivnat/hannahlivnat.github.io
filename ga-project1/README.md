
BEGINNING OF PROJECT PLAN

API USED - MERRIAM WEBSTER COLLEGIATE DICTIONARY API
    Data Features: Definitions, Synonym and Usage paragraphs, possibly illustrations once past mvp. 

    Key Value Pairs: 
        "id" : word searched for
        "def" : definition
        "examples" : example use cases of the word


USER STORY - 
The user is someone who wants to look up words and customize their 
own word practice lists without going through the effort of making their
own flash cards through a site such as Quizlet. 

HOW SHOULD PEOPLE BE ABLE TO USE YOUR WEBSITE -
When they get to the site, they should be able to look up a word and see the definition of that word as well as examples for the word. They can then interact with the word by adding it to their word list, which will make the word appear as a flash card at the bottom of the screen. There can be up to 10 flash cards at a time. 

WIREFRAMES - Included in planning folder

MVP TECH REQUIREMENTS- 

1) Use AJAX to make a request to external data source and insert data
retrieved into DOM

    Using Merriam Webster API and displaying id, def, examples on site

2) Implement Responsive Design (fully functional on desktop, tablet, mobile)

    wireframes planned out for mobile and desktop

3) Have on or more complex user interface modules built from scratch using jQuery. 

    For MVP, I'll be making the flash card section of the page a 
    carousel. Initially, the user will be able to click on the word
    they searched in order to trigger the creation of the flash card. 
    I will insert a limit that they can only create five flash cards 
    at a time. 

4) Page is responsive. 

    I'll be using mobile first design practices and use media queries to adjust
    page for desktop viewing by day 2 / 3. 

PAST-MVP PLANS

-   Add a drag and drop feature - the user can drag the word over to the 'word
    list' section in order to trigger flash card creation. Limit 
    will be increased to ten flash cards. 
-   Add pulling of illustrations to the site from API
-   Try to add local storage for word list and flash cards so that 
    user can keep their previous cards on the site and load 5-10 
    new ones each day. 
-   super bonus that probably won't happen: user can input their email and 
    have a flash card email sent to them using the words that they added
    to their list.
-   Another super bonus : add additional api that pulls in a word of the day and 
    display that as the default before a user searches for a word. add functionality
    to let user add the word of the day to their practice list

SCHEDULE

    Project is Due - Tuesday Evening. 
    Project Time Period - 5 Days

    Daily Project Plan: 
    Already Completed: 
        x Pre-Project Wireframe, user stories, etc. 
        x API selected, have key
        x presentation approved
        x key/value pairs to use selected
    Day 1: 
        Morning (before 1 pm):
            x Finish reading API documentation
            x Create schedule for day 1-5
            x HTML - complete all divs, sections, etc.
            x pseudo code out js file for mvp elements needed. 
        Afternoon: (Before 6 pm)
            x Log data and key/value pairs to make sure API works
            CSS - position elements on page for mobile site (no other styling today)
            x JS - Be able to collect id, def, and examples and display it on the page.
              x - When new word is search for, old values will be replaced with new word's values
    Day 2: 
        x Flash card functionality complete
           x -add event listener to word. When word is clicked on, the word will be appended under the word list section and the word and definition will be appended to a newly created flashcard.
           x -add event listener to flash card. When clicked, flash card will hide word and show definition. 
            x-If there is more than one flash card, display in row for now
        x Carousel Feature : 
           x - Hide all flash cards but one in the flash card section. 
           x - When next button is clicked on flash card sections, event listener checks if there is more than one flash card. If only one flashcard, nothing happens. If multiple flashcards, next card will be displayed using carousel. 
    Day 3: 
        CSS - add positioning for responsive desktop site using media queries
        CSS - style carousel section for mobile and desktop. Finish making layout responsive for desktop.
        Add drag and drop feature :
            - when user clicks on word, they are able to drag word and drop it into word list. 
            When word is dropped into word list, a flash card is made for that word. 
    Day 4: 
        Local Storage functionality added
            - when user adds word to word list, it will save to local storage
            - previously created flash cards will load automatically for viewer upon opening page.
        Add illustrations to api pull and display on page
        Get started on more in-depth styling
            - Develop color scheme and font
            - find icons for buttons on carousel
            - get nit picky with margins/padding/position
    Day 5: 
        Finish Styling Page
        Add flipping feature to flash card 
            - instead of hiding and showing on same page,
            make flipping animation using key frames then show definition. 
        Read Over and Edit Final Code: 
            - Make code more DRY 
            - Make repeated font-sizes, colors, etc. into variables in sass
            - Test functionality of each feature
        Practice Presentation : 
            - 5 minute presentations planned and practiced
            - create bullet point outline to present -- features, tech details, challenges, future improvements. 




FINAL PROJECT README

EXPLANATION OF TECHNOLOGY USED


DESCRIPTION OF APPROACH TO PROJECT


LINK TO LIVE SITE  : hannahlivnat.github.io/ga-project1

INSTALLATION INSTRUCTIONS


UNSOLVED PROBLEMS