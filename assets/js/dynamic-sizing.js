//Matches every .game-title and .summary__description on the page to the size of #main-summary-title
function applyDynamicSizing() {
    var mainTitle = document.getElementById("main-summary-title");

    //Page has no main title to measure against, nothing to do:
    if (!mainTitle) {
        return;
    }

    //Get main-summary-title size:
    var title_width = (mainTitle.offsetWidth + 'px');
    var headerFontSize = window.getComputedStyle(mainTitle).fontSize;

    var summaryTitles = document.getElementsByClassName('game-title');
    var summaryDescriptions = document.getElementsByClassName('summary__description');

    for (var i = 0; i < summaryTitles.length; i++) {
        summaryTitles[i].style.fontSize = headerFontSize;
    }

    //Make summary descriptions max-width of main-summary-title:
    for (var i = 0; i < summaryDescriptions.length; i++) {
        summaryDescriptions[i].style.maxWidth = title_width;
    }
}

//Run once on load as well as on resize, so the first paint matches every later one:
window.addEventListener('DOMContentLoaded', applyDynamicSizing);
window.addEventListener('resize', applyDynamicSizing, true);
