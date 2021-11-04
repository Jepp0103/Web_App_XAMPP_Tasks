/* eslint-disable no-undef */
/**
 * DOM management (menus, dropdown menus, content pages)
 * 
 * @author  Arturo Mora-Rioja
 * @version 1.0 July 2020
 * @version 1.1.0 August 2021 Bug fix: submenus are now correctly repositioned when changing the viewport size
 *                            Style improvements
 */
"use strict";
$(document).ready(function() {

    // Subject content expands or collapses when its header is clicked on
    $("article > header").on("click", function() {
        const articleContent = $(this).siblings(":eq(0)");
        if (!articleContent.is(":visible")) {
            $("article.subject > main").slideUp();  // Subject info is hidden for all subjects
            articleContent.slideDown();             // Subject info for the present subject is shown
        } else {
            articleContent.slideUp();               // Subject info for the present subject is hidden
        }
    });

    repositionMenus();

    // Display of secondary menus
    $("a#aAP").on("mouseenter", function() {   
        repositionMenus();
        $("#APMenu").slideDown("fast");
    }).on("mouseleave", function() {
        $("#APMenu").hide();
    });
    $("a#aPBA").on("mouseenter", function() {   
        repositionMenus();
        $("div#PBAMenu").slideDown("fast");
    }).on("mouseleave", function() {
        $("div#PBAMenu").hide();
    });
    $("div.dropDownMenu").on("mouseenter", function() {
        $(this).show();
    }).on("mouseleave", function() {
        $(this).hide();
    });
});

/**
 * It repositions the submenus relative to their parent menu options
 */
 function repositionMenus() {
    const breakPointMobile = 510;
    const aAP = $("a#aAP");
    const aPBA = $("a#aPBA");
    
    // In mobile view, submenus are centred and occupy 100% of the viewport
    if ($(window).width() < breakPointMobile) {
        $("div#APMenu")
            .css({
                "top": "0",
                "left": "0",
                "width": "100%"
            });        
        $("div#PBAMenu")
            .css({
                "top": "0",
                "left": "0",
                "width": "100%"
            });
    // In desktop view, submenus hang from their parent menu option            
    } else {
        $("div#APMenu")
            .css({
                "top": aAP.offset().top + aAP.height(),
                "left": aAP.offset().left - 10,
                "width": aAP.outerWidth()
            });        
        $("div#PBAMenu")
            .css({
                "top": aPBA.offset().top + aPBA.height(),
                "left": aPBA.offset().left - 10,
                "width": aPBA.outerWidth()
            });
    }
}