let flag = false;

jQuery(function($) {
    'use strict';

    /*-----------------------
        preloader
        -----------------------*/
    $(window).on("ready", function() {
        $('.preloader').fadeOut();
    });
    // end of preloader

    /*----------------------------
      sidebar dropdown
      ----------------------------*/
    $(".sidebar-dropdown > a").on("click", function() {
        $(".sidebar-submenu").slideUp(200);
        if (
            $(this)
            .parent()
            .hasClass("active")
        ) {
            $(".sidebar-dropdown").removeClass("active");
            $(this)
                .parent()
                .removeClass("active");
        } else {
            $(".sidebar-dropdown").removeClass("active");
            $(this)
                .next(".sidebar-submenu")
                .slideDown(200);
            $(this)
                .parent()
                .addClass("active");
        }
    });

    /*----------------------------
      sidebar close and show
      ----------------------------*/
    $("#close-sidebar").on("click", function() {
        $(".page-wrapper").toggleClass("toggled");
    });
    $("#show-sidebar").on("click", function() {
        $(".page-wrapper").toggleClass("toggled");
    });

    // navbar 
    window.slide = new SlideNav({
        changeHash: true
    });


    /*----------------------------
      chat box
      ----------------------------*/
    $(function() {
        var INDEX = 0;
        $("#chat-submit").on("click", function(e) {
            e.preventDefault();
            var msg = $("#chat-input").val();
            if (msg.trim() == '') {
                return false;
            }
            generate_message(msg, 'self');
            var buttons = [{
                    name: 'Existing User',
                    value: 'existing'
                },
                {
                    name: 'New User',
                    value: 'new'
                }
            ];
            setTimeout(function() {
                generate_message(msg, 'user');
            }, 1000)

        })

        function generate_message(msg, type) {
            INDEX++;
            var str = "";
            str += "<div id='cm-msg-" + INDEX + "' class=\"chat-msg " + type + "\">";
            str += "          <span class=\"msg-avatar\">";
            str += "            <img src=\"assets\/images\/chat-avatar.png\">";
            str += "          <\/span>";
            str += "          <div class=\"cm-msg-text\">";
            str += msg;
            str += "          <\/div>";
            str += "        <\/div>";
            $(".chat-logs").append(str);
            $("#cm-msg-" + INDEX).hide().fadeIn(300);
            if (type == 'self') {
                $("#chat-input").val('');
            }
            $(".chat-logs").stop().animate({
                scrollTop: $(".chat-logs")[0].scrollHeight
            }, 1000);
        }

        $("#chat-circle").on("click", function() {
            $("#chat-circle").toggle('scale');
            $(".chat-box").toggle('scale');
        })

        $(".chat-box-toggle").on("click", function() {
            $("#chat-circle").toggle('scale');
            $(".chat-box").toggle('scale');
        })

    })

    /*----------------------------
      palette
      ----------------------------*/
    $("#color-bar").on("click", function() {
        $(".color-palette").toggleClass('open-plt');
    });
    // end of palet

    /*color selection*/
    $('.color-palette li').on("click", function(e) {
        e.preventDefault();
        var stylesheet = 'color_0' + (jQuery(this).index() + 1) + '.css';
        jQuery('link#theme').attr('href', 'assets/css/' + stylesheet);
        jQuery('link#theme').on("load", function() {
            jQuery('link#main').attr('href', 'assets/css/' + stylesheet);
        });
    });
    // end of color selection
});
var given_data = 'http://localhost:3000/data'

fetch('http://localhost:3000/data')
    .then(response => response.json())
    .then(data => {
        getIntro()
        // console.log('Given data bellow : ' + JSON.stringify(data))
        document.getElementById('namespace').innerHTML = data.Namespace;
        document.getElementById('function').innerHTML = data.function;
        document.getElementById('function_params').innerHTML = data.FunctionParams;
        document.getElementById('description').innerHTML = data.Description;
        document.getElementById('params').innerHTML = data.Params;
        document.getElementById('returns').innerHTML = data.Returns;
        document.getElementById('method').innerHTML = data.RESTMethod;
        document.getElementById('res').innerHTML = data.RESTURL;

    })
    .catch(error => {
        console.error('Error:', error);
    });


let groupedFunctions = {};
fetch('http://localhost:3000/data')
    .then(response => response.json())
    .then(datagiv => {
        datagiv.forEach(function(item) {
            if (!groupedFunctions[item.Namespace]) {
                groupedFunctions[item.Namespace] = [];
            }
            groupedFunctions[item.Namespace].push(item);
        });

        // Create sidebar container
        let sidebar = document.querySelector(".sidebar-menu");

        // Create main UL element
        let mainUl = document.createElement("ul");

        // Iterate through the grouped functions
        for (let namespace in groupedFunctions) {
            let li = document.createElement("li");
            if (groupedFunctions[namespace].length > 1) {
                li.classList.add("sidebar-dropdown");
                let a = document.createElement("a");
                let span = document.createElement("span");
                span.textContent = namespace;
                a.appendChild(span);
                li.appendChild(a);
                let subDiv = document.createElement("div");
                subDiv.classList.add("sidebar-submenu");
                // subDiv.style.cssText = "display:none;"
                a.addEventListener('click', function(event) {
                    getDatathis()
                });
                let subUl = document.createElement("ul");
                groupedFunctions[namespace].forEach(function(item) {
                    let subLi = document.createElement("li");
                    let subA = document.createElement("a");
                    subLi.style.cssText = "font-size:13px"
                    // subA.href = "#";
                    subA.textContent = item.Function.replace(item.Namespace,'').slice(1);
                    subA.setAttribute("data-namespace", item.Namespace);
                    subA.setAttribute("data-function", item.Function);
                    subA.setAttribute("data-function_params", item.FunctionParams);
                    subA.setAttribute("data-description", item.Description);
                    subA.setAttribute("data-params", item.Params);
                    subA.setAttribute("data-returns", item.Returns);
                    subA.setAttribute("data-method", item.RESTMethod);
                    subA.setAttribute("data-rest", item.RESTURL);
                    subA.addEventListener('click', function(event) {
                        getData(event)
                        getHiglight(event)
                    });
                    subLi.appendChild(subA);
                    subUl.appendChild(subLi);
                });
                subDiv.appendChild(subUl);
                li.appendChild(subDiv);
            } else {
                li.classList.add("side-list");
                let a = document.createElement("a");
                a.href = "#";
                a.textContent = groupedFunctions[namespace][0].Function;
                li.appendChild(a);
            }
            mainUl.appendChild(li);
        }
        sidebar.appendChild(mainUl);
    });




document.getElementById("getData").addEventListener("click", getData);

function getData(event) {
    var namespace = event.target.getAttribute("data-namespace");
    var functiongiven = event.target.getAttribute("data-function");
    var params = event.target.getAttribute("data-function_params");
    var description = event.target.getAttribute("data-description");
    var params = event.target.getAttribute("data-params");
    var returns = event.target.getAttribute("data-returns");
    var method = event.target.getAttribute("data-method");
    var rest = event.target.getAttribute("data-rest");


    // Get the content element
    const content = document.getElementById("fetch-content");
    // Fetch the external HTML file
    fetch("details.html")
        .then(response => response.text())
        .then(data => {
            // Update the innerHTML of the content element
            content.innerHTML = data;
            const h4 = document.getElementById("details-name");
            const functiond = document.getElementById("details-function");
            const returned = document.getElementById("details-returns");
            const methodd = document.getElementById("details-method");
            const restd = document.getElementById("details-rest");
            const descriptiond = document.getElementById("details-description");

            // Update the innerHTML of the h3 element
            h4.innerHTML = namespace;
            functiond.innerHTML = functiongiven;
            returned.innerHTML = returns;
            methodd.innerHTML = method;
            restd.innerHTML = rest;
            descriptiond.innerHTML = description;

        });
}

function getHiglight(event) {
    var namespace = event.target.getAttribute("data-namespace");
    var functiongiven = event.target.getAttribute("data-function");
    var params = event.target.getAttribute("data-function_params");
    var description = event.target.getAttribute("data-description");
    // var params = event.target.getAttribute("data-params");
    var returns = event.target.getAttribute("data-returns");
    var method = event.target.getAttribute("data-method");
    var rest = event.target.getAttribute("data-rest");


    // const highlights = document.getElementById('highlight-returns')
    // const highlight_param= document.getElementById("highlight-param");
    const highlight_name = document.getElementById("highlight-name");
    const highlight_return = document.getElementById("highlight-returns");
    const highlight_method = document.getElementById("highlight-method");
    const highlight_rest = document.getElementById("highlight-rest");
    const highlight_description = document.getElementById("highlight-description");
    const highlight_function = document.getElementById("highlight-function");


    highlight_name.innerHTML='- '+namespace
    // highlight_param.innerHTML=params
    highlight_return.innerHTML='- '+returns
    highlight_method.innerHTML='- '+method
    highlight_rest.innerHTML='- '+rest
    highlight_description.innerHTML='- '+description
    highlight_function.innerHTML='- '+functiongiven
}






function getIntro() {

    // Get the content element
    const content = document.getElementById("fetch-content");
    // Fetch the external HTML file
    fetch("introduction.html")
        .then(response => response.text())
        .then(data => {
            // Update the innerHTML of the content element
            content.innerHTML = data;


        });
}


function getDatathis() {
    // Get all the dropdown elements
    let dropdowns = document.querySelectorAll(".sidebar-dropdown");

    // Iterate through the dropdown elements and add a click event listener
    dropdowns.forEach(function(dropdown) {

        dropdown.addEventListener("click", function() {

            let submenu = dropdown.querySelector(".sidebar-submenu");
            if (String(submenu.style.cssText) === "display: none;") {
                submenu.style.cssText = "display:block";
            } else {
                submenu.style.cssText = "display:none;";
            }
    
        });
        let links = dropdown.querySelectorAll("a");
        links.forEach(function(link) {
            link.addEventListener("click", function(event) {
                // event.stopPropagation();
                // if (flag) {
                //     flag = false;
                //     let submenu = dropdown.querySelector(".sidebar-submenu");
                //     submenu.style.cssText = "display:none;";
                // }
            });
        });
    });

}


