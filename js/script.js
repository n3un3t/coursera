$(function () { //$ in jQuery bedeutet document.addEventListener('DOMContentLoaded',..)
    // bedeutet docuemnt.querySelector('#navbarToggler')
    $('.navbar-toggler').blur(function (event) {
        var screenWidth = window.innerWidth;
        if (screenWidth < 768) {
            $('#navbarContent').collapse('hide');
        }
    });

});

(function (global) {

    var dach = {};

    var homeHTML = 'snippets/main-snippet.html';
    //var allCategoriesUrl = 'https://davids-restaurant.herokuapp.com/categories.json';
    var allCategories = 'json/categories.json'
    var categoriesTitle = 'snippets/menu-snippet.html';
    var category = 'snippets/menu-categories-snippet.html';
    //var singleCategoryURL = 'https://davids-restaurant.herokuapp.com/menu_items.json?category=';
    var allSingleCategories = 'json/categories/';
    var singleCategory = 'snippets/single-category-snippet.html';
    var singleCategoryTitle = 'snippets/single-snippet.html';


    //innerHTML for selected Object (selector)
    var insertHtml = function (selector, html) {
        var targetEl = document.querySelector(selector);
        targetEl.innerHTML = html;
    };

    var showLoading = function (selector) {
        var html = "<div class='text-center'>";
        html += "<img src='images/ajax-loader.gif'></div>";
        insertHtml(selector, html);
    };

    //Substitute the placeholders
    var insertProperty = function (string, propName, propValue) {
        var propToReplace = '{{' + propName + '}}';
        string = string.replace(new RegExp(propToReplace, 'g'), propValue);
        return string;
    };

    var switchNavButtonToActive = function (buttonOff, buttonOn) {
        buttonOff = "#" + buttonOff;
        buttonOn = "#" + buttonOn;
        var classe = document.querySelector(buttonOff).className;
        classe = classe.replace(new RegExp('active', 'g'), '');
        document.querySelector(buttonOff).className = classe;

        classe = document.querySelector(buttonOn).className;
        if (classe.indexOf('active') == -1) {
            classe += ' active'
            document.querySelector(buttonOn).className = classe;
        };
    };

    var insertName = function (html, propName, propTryName) {

        if (!propTryName) {
            return html = insertProperty(html, propName, '');
        };

        propTryName = '(' + propTryName + ')';
        html = insertProperty(html, propName, propTryName);

        return html;
    };

    var insertPrice = function (html, propName, propValue) {

        if (!propValue) {
            return insertProperty(html, propName, '');
        };
        propValue = '$' + propValue.toFixed(2);
        html = insertProperty(html, propName, propValue);

        return html;
    };

    document.addEventListener('DOMContentLoaded', function (event) {

        showLoading('#main');
        $ajaxUtils.sendGetRequest(homeHTML, function (responseText) {
            document.querySelector('#main').innerHTML = responseText
        }, false);
    });

    dach.loadHome = function () {
        switchNavButtonToActive('menuButton', 'homeButton');
        showLoading('#main');
        $ajaxUtils.sendGetRequest(homeHTML, function (responseText) {
            document.querySelector('#main').innerHTML = responseText
        }, false);
    }

    //Load Menus Categories
    dach.loadMenuCategories = function () {
        showLoading('#main');
        $ajaxUtils.sendGetRequest(allCategories, buildAndShowCategoriesHTML); //JSON
    };

    function buildAndShowCategoriesHTML(categories) {
        $ajaxUtils.sendGetRequest(categoriesTitle, function (categoriesTitleHtml) {
            $ajaxUtils.sendGetRequest(category, function (categoryHtml) {
                switchNavButtonToActive('homeButton', 'menuButton');
                var categoriesViewHtml = buildCategoriesViewHtml(categories, categoriesTitleHtml, categoryHtml);
                insertHtml('#main', categoriesViewHtml);
            }, false);
        }, false);
    };

    function buildCategoriesViewHtml(categories, categoriesTitleHtml, categoryHtml) {
        var finalHtml = categoriesTitleHtml;
        finalHtml += "<section class ='row'>";

        for (var i = 0; i < categories.length; i++) {
            var html = categoryHtml;
            var name = categories[i].name;
            var short_name = categories[i].short_name;

            html = insertProperty(html, 'name', name);
            html = insertProperty(html, 'short_name', short_name);

            finalHtml += html;
        };

        finalHtml += '</section>';
        return finalHtml;
    };

    dach.loadMenuItems = function (categoryShort) {
        showLoading('#main');
        $ajaxUtils.sendGetRequest(allSingleCategories + categoryShort + '.Json', buildAndShowSingleHtml);
    };

    function buildAndShowSingleHtml(single) {
        $ajaxUtils.sendGetRequest(singleCategoryTitle, function (singleCategoryTitleHtml) {
            $ajaxUtils.sendGetRequest(singleCategory, function (singleCategoryHtml) {
                switchNavButtonToActive('homeButton', 'menuButton');
                var singleViewHtml = buildSingleViewHtml(single, singleCategoryTitleHtml, singleCategoryHtml);
                insertHtml('#main', singleViewHtml);
            }, false);
        }, false);
    };

    function buildSingleViewHtml(single, singleCategoryTitleHtml, singleCategoryHtml) {
        singleCategoryTitleHtml = insertProperty(singleCategoryTitleHtml, 'name', single.category.name)

        singleCategoryTitleHtml = insertProperty(singleCategoryTitleHtml, 'special_instructions', single.category.special_instructions)

        var finalHtml = singleCategoryTitleHtml;

        finalHtml += "<section class ='row'>";

        for (var i = 0; i < single.menu_items.length; i++) {
            var html = singleCategoryHtml

            html = insertProperty(html, 'short_name', single.menu_items[i].short_name);
            html = insertProperty(html, 'catShortName', single.category.short_name)


            html = insertPrice(html, 'price_small', single.menu_items[i].price_small);
            html = insertName(html, 'size_small', single.menu_items[i].small_portion_name);



            html = insertPrice(html, 'price_large', single.menu_items[i].price_large);
            html = insertName(html, 'size_large', single.menu_items[i].large_portion_name);


            html = insertProperty(html, 'name', single.menu_items[i].name);
            html = insertProperty(html, 'description', single.menu_items[i].description);

            finalHtml += html;
        };

        finalHtml += '</section>';
        return finalHtml;
    };



    global.$dach = dach;

})(window);
