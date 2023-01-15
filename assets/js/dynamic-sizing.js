window.addEventListener('resize', function(event) {
    //On resize, get main-summary-title size:
    title_width = (document.getElementById("main-summary-title").offsetWidth + 'px');

    //Make summary descriptions max-width of main-summary-title:
    var summaryTitles = document.getElementsByClassName('game-title');
    var summaryDescriptions = document.getElementsByClassName('summary__description');
    var headerFontSize = window.getComputedStyle(document.getElementById("main-summary-title")).fontSize;

    for (var i = 0; i < summaryTitles.length; i++) {
        summaryTitles[i].style.fontSize = headerFontSize;
    }

    for (var i = 0; i < summaryDescriptions.length; i++) {
        summaryDescriptions[i].style.maxWidth = title_width;
    }
}, true);