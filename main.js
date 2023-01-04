// =========================================================================
// === Verification of data inputs =========================================
// =========================================================================
// #region

// Pop-up messages with required format ====================================
// =========================================================================

function showFormatMessage(arr, hoverFnOn, hoverFnOut) {
    for (let i = 0; i < arr.length; i++) {
        arr[i].hover(() => hoverFnOn(arr[i]), hoverFnOut);
    };
};

const cssObjectForFormatMessage = {
    "position": "absolute",
    "top": "-2.5rem",
    "left": "-7rem",
    "background-color": "hsl(0, 0%, 0%)",
    "width": "fit-content",
    "padding": "0.5rem",
    "color": "hsl(25, 100%, 81%)",
    "font-size": "0.75rem",
    "white-space": "nowrap",
    "border": "1px solid hsl(65, 100%, 75%)",
    "border-radius": "0.5rem",
    "z-index": "999"
};

// Time inputs Pop-up message =============================================

const arrayOfTimeHoursInputsInitialDataSection = [$(".time-1h"), $(".time-2h"), $(".time-3h")];

function addTimeHourFormatMessage(element) {
    if ($(".grid").find(".time-hour-message").length == 0) {
        element.append("<span class='time-hour-message'>Format: dd; Range: 00 - 23<span>");
    }
    $(".time-hour-message").css(cssObjectForFormatMessage);
};

function removeTimeHourFormatMessage() {
    $(".time-hour-message").remove();
};

showFormatMessage(arrayOfTimeHoursInputsInitialDataSection, addTimeHourFormatMessage, removeTimeHourFormatMessage);

// ========================================================================

const arrayOfTimeMinutesInputsInitialDataSection = [$(".time-1m"), $(".time-2m"), $(".time-3m")];

function addTimeMinutesFormatMessage(element) {
    if ($(".grid").find(".time-minutes-message").length == 0) {
        element.append("<span class='time-minutes-message'>Format: dd; Range: 00 - 59<span>");
    }
    cssObjectForFormatMessage.left = "-8rem";
    $(".time-minutes-message").css(cssObjectForFormatMessage);
};

function removeTimeMinutesFormatMessage() {
    cssObjectForFormatMessage.left = "-7rem";
    $(".time-minutes-message").remove();
};

showFormatMessage(arrayOfTimeMinutesInputsInitialDataSection, addTimeMinutesFormatMessage, removeTimeMinutesFormatMessage);

// ========================================================================

const arrayOfTimeSecondsInputsInitialDataSection = [$(".time-1s"), $(".time-2s"), $(".time-3s")];

function addTimeSecondsFormatMessage(element) {
    if ($(".grid").find(".time-seconds-message").length == 0) {
        element.append("<span class='time-seconds-message'>Format: dd; Range: 00 - 59</span>");
    };
    cssObjectForFormatMessage.top = "-3.1rem";
    $(".time-seconds-message").css(cssObjectForFormatMessage);
};

function removeTimeSecondsFormatMessage() {
    cssObjectForFormatMessage.top = "-2.5rem";
    $(".time-seconds-message").remove();
};

showFormatMessage(arrayOfTimeSecondsInputsInitialDataSection, addTimeSecondsFormatMessage, removeTimeSecondsFormatMessage);

// Hight of eye input Pop-up message =====================================

const arrayOfHoeInputsInitialDataSection = [$(".hoe-1"), $(".hoe-2"), $(".hoe-3")];

function addHoeFormatMessage(element) {
    if ($(".grid").find(".hoe-message").length == 0) {
        element.append("<span class='hoe-message'>Format: d.d or dd.d</span>");
    };
    cssObjectForFormatMessage.top = "-3.1rem";
    cssObjectForFormatMessage.left = "-5rem";
    $(".hoe-message").css(cssObjectForFormatMessage);
};

function removeHoeFormatMessage() {
    cssObjectForFormatMessage.top = "-2.5rem";
    cssObjectForFormatMessage.left = "-7rem";
    $(".hoe-message").remove();
};

showFormatMessage(arrayOfHoeInputsInitialDataSection, addHoeFormatMessage, removeHoeFormatMessage);

//Degrees inputs Pop-up message ============================================

const arrayOfDegrees90Inputs = [$(".lat-1d"), $(".lat-2d"), $(".lat-3d"), $(".alt-1d"), $(".alt-2d"), $(".alt-3d"), $(".inc-1d"), $(".inc-2d"), $(".inc-3d"), $(".dec-1d"), $(".dec-2d"), $(".dec-3d")];

function addDegrees90FormatMessage(element) {
    if ($(".grid").find(".degree-message").length == 0) {
        element.append("<span class='degree-message'>Format: dd; Range: 00 - 89<span>");
    };
    $(".degree-message").css(cssObjectForFormatMessage);
};

function removeDegrees90FormatMessage() {
    $(".degree-message").remove();
};

showFormatMessage(arrayOfDegrees90Inputs, addDegrees90FormatMessage, removeDegrees90FormatMessage);

// =========================================================================

const arrayOfDegrees360Inputs = [$(".long-1d"), $(".long-2d"), $(".long-3d"), $(".gha-1d"), $(".gha-2d"), $(".gha-3d"), $(".sha-1d"), $(".sha-2d"), $(".sha-3d")];

function addDegrees360FormatMessage(element) {
    if ($(".grid").find(".degree-message").length == 0) {
        element.append("<span class='degree-message'>Format: ddd; Range: 000 - 359<span>");
    }
    $(".degree-message").css(cssObjectForFormatMessage);
};

function removeDegrees360FormatMessage() {
    $(".degree-message").remove();
};

showFormatMessage(arrayOfDegrees360Inputs, addDegrees360FormatMessage, removeDegrees360FormatMessage);

// Minutes inputs Pop-up message ==========================================

const arrayOfMinutesInputs = [$(".lat-1m"), $(".lat-2m"), $(".lat-3m"), $(".long-1m"), $(".long-2m"), $(".long-3m"), $(".alt-1m"), $(".alt-2m"), $(".alt-3m"), $(".gha-1m"), $(".gha-2m"), $(".gha-3m"), $(".sha-1m"), $(".sha-2m"), $(".sha-3m"), $(".cv-1"), $(".cv-2"), $(".cv-3"), $(".inc-1m"), $(".inc-2m"), $(".inc-3m"), $(".dec-1m"), $(".dec-2m"), $(".dec-3m"), $(".cd-1"), $(".cd-2"), $(".cd-3"), $(".index-1"), $(".index-2"), $(".index-3"), $(".dip-1"), $(".dip-2"), $(".dip-3"), $(".tc-1"), $(".tc-2"), $(".tc-3"), $(".ac-1"), $(".ac-2"), $(".ac-3"), $(".ulc-1"), $(".ulc-2"), $(".ulc-3"), $(".arc-1"), $(".arc-2"), $(".arc-3")];

function addMinutesFormatMessage(element) {
    if ($(".grid").find(".minute-message").length == 0) {
        element.append("<span class='minute-message'>Format: dd.d; Range: 00.0 - 59.9<span>");
    };
    cssObjectForFormatMessage.left = "-8.5rem";
    $(".minute-message").css(cssObjectForFormatMessage);
};

function removeMinutesFormatMessage() {
    cssObjectForFormatMessage.left = "-7rem";
    $(".minute-message").remove();
};

showFormatMessage(arrayOfMinutesInputs, addMinutesFormatMessage, removeMinutesFormatMessage);

// Validation of input data ================================================
// =========================================================================

// General usage functions =================================================

function changeFromCommaToDot(value) {
    let arrayFromString = value.split("");
    for (let item of arrayFromString) {
        if (item === ",") {arrayFromString[arrayFromString.indexOf(item)] = "."};
    };
    value = arrayFromString.join("");
    return value;
};

function testWithRegExp(regExp, elem, arr) {
    if (regExp.test(elem.val()) === false) {
        arr.push(false);
        elem.css({"color": "var(--color-accent-200)", "font-weight": "bold"});
    } else if (parseInt(elem.val()) > 359) {
        arr.push(false);
        elem.css({"color": "var(--color-accent-200)", "font-weight": "bold"});
    } else {
        elem.css({"color": "var(--color-neutral-100)", "font-weight": "400"});
        arr.push(true);
    };
};

// ========================================================================

function checkDegrees90FormatOfInputs(arrToCheck, arrOfResults) {
    const regExpForDegrees90 = /^[0-8][0-9]$/;
    let arrayWithInnerResults = [];
    for (let element of arrToCheck) {
        if (element.val() === "") {element.val("00")};
        if (element.val() === "00") {element.val("00")};
        if (element.val().length === 1 && element.val() % 1 === 0) {element.val("0" + element.val())};
        testWithRegExp(regExpForDegrees90, element, arrayWithInnerResults);
    };
    let degrees360Validation = arrayWithInnerResults.every(bool => bool);
    return arrOfResults[0] = degrees360Validation;
};

function checkDegrees360FormatOfInputs(arrToCheck, arrOfResults) {
    const regExpForDegrees360 = /^[0-3][0-9][0-9]$/;
    let arrayWithInnerResults = [];
    for (let element of arrToCheck) {
        if (element.val() === "") {element.val("000")};
        if (element.val() === "0") {element.val("000")};
        if (element.val() === "00") {element.val("000")};
        if (element.val() === "000") {element.val("000")};
        if (element.val().length === 1 && element.val() % 1 === 0) {element.val("00" + element.val())};
        if (element.val().length === 2 && element.val() % 1 === 0) {element.val("0" + element.val())};
        testWithRegExp(regExpForDegrees360, element, arrayWithInnerResults);
    };
    let degrees90Validation = arrayWithInnerResults.every(bool => bool);
    return arrOfResults[1] = degrees90Validation;
};

// ========================================================================

function checkMinutesFormatOfInputs(arrToCheck, arrOfResults) {
    const regExpForMinutes = /^[0-5][0-9]\.[0-9]$/;
    let arrayWithInnerResults = [];
    for (let element of arrToCheck) {
        if (element.val() === "") {element.val("00.0")};
        if (element.val() === "000") {element.val("00.0")};
        if (element.val().length === 1 && element.val() % 1 === 0) {element.val("0" + element.val() + ".0")};
        if (element.val().length === 2 && element.val() % 1 === 0) {element.val(element.val() + ".0")};
        if (element.val().length === 3 && element.val() % 1 === 0) {element.val("0" + element.val())};
        if (element.val().length === 3 && element.val() % 1 !== 0) {element.val("0" + element.val())};
        element.val(changeFromCommaToDot(element.val()));
        testWithRegExp(regExpForMinutes, element, arrayWithInnerResults);
    };
    let minutesValidation = arrayWithInnerResults.every(bool => bool);
    return arrOfResults[2] = minutesValidation;
};

// ========================================================================

function checkTimeHoursFormatOfInputs(arrToCheck, arrOfResults) {
    const regExpForTimeHours = /^[0-2][0-3]$/;
    let arrayWithInnerResults = [];
    for (let element of arrToCheck) {
        if (element.val() === "") {element.val("00")};
        if (element.val() === "00") {element.val("00")};
        if (element.val().length === 1 && element.val() % 1 === 0) {element.val("0" + element.val())};
        testWithRegExp(regExpForTimeHours, element, arrayWithInnerResults);
    }
    let timeHoursValidation = arrayWithInnerResults.every(bool => bool);
    return arrOfResults[3] = timeHoursValidation;
};

function checkTimeMinutesAndSecondsFormatOfInputs(arrToCheck, arrOfResults) {
    const regExpForTimeMinutesAndSeconds = /^[0-5][0-9]$/;
    let arrayWithInnerResults = [];
    for (let element of arrToCheck) {
        if (element.val() === "") {element.val("00")};
        if (element.val() === "00") {element.val("00")};
        if (element.val().length === 1 && element.val() % 1 === 0) {element.val("0" + element.val())};
        testWithRegExp(regExpForTimeMinutesAndSeconds, element, arrayWithInnerResults);
    }
    let timeMinutesAndSecondsValidation = arrayWithInnerResults.every(bool => bool);
    return arrOfResults[4] = timeMinutesAndSecondsValidation;
};

function checkHoeFormatOfInputs(arrToCheck, arrOfResults) {
    const regExpForHoe = /^[0-9][0-9]\.[0-9]$/;
    let arrayWithInnerResults = [];
    for (let element of arrToCheck) {
        if (element.val() === "") {element.val("00.0")};
        if (element.val() === "0") {element.val("00.0")};
        if (element.val() === "00") {element.val("00.0")};
        if (element.val() === "000") {element.val("00.0")};
        if (element.val().length === 1 && element.val() % 1 === 0) {element.val("0" + element.val() + ".0")};
        if (element.val().length === 2 && element.val() % 1 === 0) {element.val(element.val() + ".0")};
        if (element.val().length === 3 && element.val() % 1 === 0) {element.val("0" + element.val())};
        if (element.val().length === 3 && element.val() % 1 !== 0) {element.val("0" + element.val())};
        element.val(changeFromCommaToDot(element.val()));
        testWithRegExp(regExpForHoe, element, arrayWithInnerResults);
    };
    let HoeValidation = arrayWithInnerResults.every(bool => bool);
    return arrOfResults[5] = HoeValidation;
};

// Initial Data Section Verification =======================================

const arrayOfTimeMinutesAndSecondsInputsInitialDataSection = [$(".time-1m"), $(".time-2m"), $(".time-3m"), $(".time-1s"), $(".time-2s"), $(".time-3s")];
const arrayOfDegrees90InputsInitialDataSection = [$(".lat-1d"), $(".lat-2d"), $(".lat-3d"), $(".alt-1d"), $(".alt-2d"), $(".alt-3d")];
const arrayOfDegrees360InputsInitialDataSection =[$(".long-1d"), $(".long-2d"), $(".long-3d")];
const arrayOfMinutesInputsInitialDataSection = [$(".lat-1m"), $(".lat-2m"), $(".lat-3m"), $(".long-1m"), $(".long-2m"), $(".long-3m"), $(".alt-1m"), $(".alt-2m"), $(".alt-3m")];

let resultArrayForInitialData = [];
let accessResultForInitialData = true;

$(".initial-data, .initial-data input").on("mouseover", () => {
    checkDegrees90FormatOfInputs(arrayOfDegrees90InputsInitialDataSection, resultArrayForInitialData);
    checkDegrees360FormatOfInputs(arrayOfDegrees360InputsInitialDataSection, resultArrayForInitialData);
    checkMinutesFormatOfInputs(arrayOfMinutesInputsInitialDataSection, resultArrayForInitialData);
    checkTimeHoursFormatOfInputs(arrayOfTimeHoursInputsInitialDataSection, resultArrayForInitialData);
    checkTimeMinutesAndSecondsFormatOfInputs(arrayOfTimeMinutesAndSecondsInputsInitialDataSection, resultArrayForInitialData);
    checkHoeFormatOfInputs(arrayOfHoeInputsInitialDataSection, resultArrayForInitialData);

    accessResultForInitialData = resultArrayForInitialData.every(bool => bool);

    if (accessResultForInitialData === false) {
        $(".initial-data__update-info-btn").text("Incorrect data");
        $(".initial-data__update-info-btn").css({
            "font-weight": "bold",
            "color": "var(--color-accent-200)",
            "border": "6px solid var(--color-accent-200)",
            "cursor": "default",
        });
    };
    if (accessResultForInitialData === true) {
        $(".initial-data__update-info-btn").text("Press this button to proceed!");
        $(".initial-data__update-info-btn").css({
            "flex-basis": "30%",
            "height": "11rem",
            "font-family": "inherit",
            "font-weight": "400",
            "font-size": "1.5rem",
            "color": "var(--color-accent-100)",
            "background-color": "transparent",
            "border": "4px solid var(--color-accent-100)",
            "border-radius": "1.5rem",
            "cursor": "pointer",
            "transition": "all .5s"
        });
    };
});

// LHA and DEC Data Section Verification ==================================

const arrayOfDegrees90InputsLhaAndDecSection = [$(".inc-1d"), $(".inc-2d"), $(".inc-3d"), $(".dec-1d"), $(".dec-2d"), $(".dec-3d")];
const arrayOfDegrees360InputsLhaAndDecSection = [$(".gha-1d"), $(".gha-2d"), $(".gha-3d"), $(".sha-1d"), $(".sha-2d"), $(".sha-3d")];
const arrayOfMinutesInputsLhaAndDecSection = [$(".gha-1m"), $(".gha-2m"), $(".gha-3m"), $(".sha-1m"), $(".sha-2m"), $(".sha-3m"), $(".cv.cv-1"), $(".cv.cv-2"), $(".cv.cv-3"), $(".inc-1m"), $(".inc-2m"), $(".inc-3m"), $(".dec-1m"), $(".dec-2m"), $(".dec-3m"), $(".cd.cd-1"), $(".cd.cd-2"), $(".cd.cd-3")];

let resultArrayForLhaAndDecData = [];
let accessResultForLhaAndDecData = true;

$(".lha-calculation, .dec-calculation, .lha-calculation input, .dec-calculation input").on("mouseover", () => {
    checkDegrees90FormatOfInputs(arrayOfDegrees90InputsLhaAndDecSection, resultArrayForLhaAndDecData);
    checkDegrees360FormatOfInputs(arrayOfDegrees360InputsLhaAndDecSection, resultArrayForLhaAndDecData);
    checkMinutesFormatOfInputs(arrayOfMinutesInputsLhaAndDecSection, resultArrayForLhaAndDecData);

    accessResultForLhaAndDecData = resultArrayForLhaAndDecData.every(bool => bool);

    if (accessResultForLhaAndDecData === false) {
        $(".lha-dec__update-info-btn").text("Incorrect data");
        $(".lha-dec__update-info-btn").css({
            "font-weight": "bold",
            "color": "var(--color-accent-200)",
            "border": "6px solid var(--color-accent-200)",
            "cursor": "default",
        });
    };
    if (accessResultForLhaAndDecData === true) {
        $(".lha-dec__update-info-btn").html("This is your<br> second button<br> to press!");
        $(".lha-dec__update-info-btn").css({
            "flex-basis": "30%",
            "height": "18rem",
            "font-family": "inherit",
            "font-weight": "400",
            "font-size": "1.5rem",
            "color": "var(--color-accent-100)",
            "background-color": "transparent",
            "border": "4px solid var(--color-accent-100)",
            "border-radius": "2rem",
            "cursor": "pointer",
            "transition": "all .5s"
        });
    };
});

// Intercept Data Section Verification =====================================

const arrayOfMinutesInputsInterceptSection = [$(".index.index-1"), $(".index.index-2"), $(".index.index-3"), $(".dip.dip-1"), $(".dip.dip-2"), $(".dip.dip-3"), $(".tc.tc-1"), $(".tc.tc-2"), $(".tc.tc-3"), $(".ac.ac-1"), $(".ac.ac-2"), $(".ac.ac-3"), $(".ulc.ulc-1"), $(".ulc.ulc-2"), $(".ulc.ulc-3"), $(".arc.arc-1"), $(".arc.arc-2"), $(".arc.arc-3")];

let resultArrayForInterceptData = [];
let accessResultForInterceptData = true;

$(".intercept-calculation, .intercept-calculation input").on("mouseover", () => {
    checkMinutesFormatOfInputs(arrayOfMinutesInputsInterceptSection, resultArrayForInterceptData);

    accessResultForInterceptData = resultArrayForInterceptData.every(bool => bool);

    if (accessResultForInterceptData === false) {
        $(".intercept-calculation__button").text("Incorrect data");
        $(".intercept-calculation__button").css({
            "font-weight": "bold",
            "color": "var(--color-accent-200)",
            "border": "6px solid var(--color-accent-200)",
            "cursor": "default"
        });
    };
    if (accessResultForInterceptData === true) {
        $(".intercept-calculation__button").html("Click the last button and get your<br> so desired intercept values!");
        $(".intercept-calculation__button").css({
            "font-weight": "400",
            "width": "62.5rem",
            "height": "6rem",
            "margin": "1rem auto",
            "display": "flex",
            "align-items": "center",
            "justify-content": "center",
            "background": "transparent",
            "color": "var(--color-accent-100)",
            "font-family": "inherit",
            "font-size": "1.75rem",
            "padding": "1rem",
            "border": "4px solid var(--color-accent-100)",
            "border-radius": "1.5rem",
            "cursor": "pointer",
            "transition": "all 0.3s linear"
        });
    };
});

// #endregion

// =========================================================================
// === Events and animations ===============================================
// =========================================================================
// #region

// === Buttons =============================================================

const arrOfLatButtons = document.querySelectorAll("#btn-lat-1, #btn-lat-2, #btn-lat-3");
const arrOfLongButtons = document.querySelectorAll("#btn-long-1, #btn-long-2, #btn-long-3");
const arrOfDecButtons = document.querySelectorAll("#btn-dec-1, #btn-dec-2, #btn-dec-3");
const arrOfPlusMinusButtons = document.querySelectorAll("#cv-btn1, #cv-btn2, #cv-btn3, #index-btn1, #index-btn2, #index-btn3, #tc-btn1, #tc-btn2, #tc-btn3, #arc-btn1, #arc-btn2, #arc-btn3, #cd-btn1, #cd-btn2, #cd-btn3");

const changeValueButton = (arr, value1, value2) => {
    arr.forEach(btn => {
        btn.onclick = () => (btn.value === value1) ? btn.value = value2 : (btn.value === value2) ? btn.value = value1 : btn.value = value1;
    });
};

changeValueButton(arrOfLatButtons, "N", "S");
changeValueButton(arrOfLongButtons, "E", "W");
changeValueButton(arrOfDecButtons, "N", "S");
changeValueButton(arrOfPlusMinusButtons, "+", "-");

// === Highlighting the heading during data input ==========================

$("document").ready(function() {

    const highlightHeading = (heading) => {
        heading.css({
            "background-color": "hsl(65, 100%, 75%)",
            "color": "hsl(0, 0%, 0%)",
            "width": "fit-content",
            "padding": "0.2rem 0.5rem",
            "border-radius": "4px",
            "display": "flex",
            "align-items": "center"
        });
        heading.children("img").css("display", "none");
    };

    const headingToDefault = (heading) => {
        heading.css({
            "background-color": "hsl(0, 0%, 0%)",
            "color": "hsl(65, 100%, 75%)",
            "width": "fit-content",
            "padding": "0",
            "border-radius": "4px",
            "display": "block"
        });
        heading.children("img").css("display", "inline-block");
    };

    const highlightHeadingWithRow = (rowArray, headingArray) => {
        for (let i = 0; i < rowArray.length; i++) {
            rowArray[i].hover(() => highlightHeading(headingArray[i]), () => headingToDefault(headingArray[i]));
        };
    };

    const arrayOfRows = [$(".row1"), $(".row2"), $(".row3"), $(".row4"), $(".row5"), $(".row6"), $(".row7"), $(".row8"), $(".row9"), $(".row10"), $(".row11"), $(".row12"), $(".row13"), $(".row14"), $(".row15"), $(".row16"), $(".row17"), $(".row18"), $(".row19"), $(".row20"), $(".row21"), $(".row22"), $(".row23"), $(".row24"), $(".row25"), $(".row26"), $(".row27"), $(".row28"), $(".row29"), $(".row30"), $(".row31")];

    const arrayOfHeadings = [$(".heading-1"), $(".heading-2"), $(".heading-3"), $(".heading-4"), $(".heading-5"), $(".heading-6"), $(".heading-7"), $(".heading-8"), $(".heading-9"), $(".heading-10"), $(".heading-11"), $(".heading-12"), $(".heading-13"), $(".heading-14"), $(".heading-15"), $(".heading-16"), $(".heading-17"), $(".heading-18"), $(".heading-19"), $(".heading-20"), $(".heading-21"), $(".heading-22"), $(".heading-23"), $(".heading-24"), $(".heading-25"), $(".heading-26"), $(".heading-27"), $(".heading-28"), $(".heading-29"), $(".heading-30"), $(".heading-31")];

    highlightHeadingWithRow(arrayOfRows, arrayOfHeadings);

});

// === Expanding of Additional Information =================================

const viewInfoHeadingList = document.querySelectorAll(".view-info-heading");
const closingButtonToAdd = "<button id='view-info-btn'><img src='icons/close-icon.svg' alt=''></button>";
const body = document.querySelector("body");

viewInfoHeadingList.forEach((heading) => {
    heading.addEventListener("click", () => {
        heading.nextElementSibling.style.display = "flex";
        heading.nextElementSibling.classList.add("slide-in-right-view-info");
        heading.nextElementSibling.insertAdjacentHTML("afterbegin", closingButtonToAdd);
        body.style.pointerEvents = "none";
        const closingButton = document.getElementById("view-info-btn");
        closingButton.style.pointerEvents = "auto";
        closingButton.onclick = () => {
            heading.nextElementSibling.style.display = "none";
            closingButton.remove();
            body.style.pointerEvents = "auto";
        };
    });
});

// Header Section ==========================================================
// =========================================================================

$(document).ready(function(){ 
    $("body").css("overflow", "hidden");
    $(".lha-calculation").addClass("hidden-but-in-flow");
    $(".dec-calculation").addClass("hidden-but-in-flow");
    $(".lha-dec__update-info-section").addClass("hidden-but-in-flow");
    $(".azimuth-calculation").addClass("hidden-but-in-flow");
    $(".intercept-calculation").addClass("hidden-but-in-flow");
    $(".intercept-calculation__button").hide();
});

// Autofill of data inputs Button ==========================================

$(document).ready(function(){ 
    $(".header__autofill span").on("click", () => {
        
        $("header button").css({
            "border-color": "var(--color-primary-100)",
            "color": "var(--color-accent-200)"
        })

        $("#date").val("2016-10-18");
        $("#speed").val("10.0");
        $("#course").val("230");
        $("#pressure").val("1024");
        $("#temperature").val("24");
        $(".name-1").val("Venus");
        $(".name-2").val("Nunki");
        $(".name-3").val("Alkaid");
        $(".time-1h").val("20");
        $(".time-1m").val("45");
        $(".time-1s").val("00");
        $(".time-2h").val("20");
        $(".time-2m").val("48");
        $(".time-2s").val("00");
        $(".time-3h").val("20");
        $(".time-3m").val("50");
        $(".time-3s").val("30");
        $(".lat-1d").val("34");
        $(".lat-1m").val("00.0");
        $(".lat-1s").val("N");
        $(".lat-2d").val("33");
        $(".lat-2m").val("59.7");
        $(".lat-2s").val("N");
        $(".lat-3d").val("33");
        $(".lat-3m").val("59.4");
        $(".lat-3s").val("N");
        $(".long-1d").val("045");
        $(".long-1m").val("00.0");
        $(".long-1s").val("W");
        $(".long-2d").val("045");
        $(".long-2m").val("00.5");
        $(".long-2s").val("W");
        $(".long-3d").val("045");
        $(".long-3m").val("00.8");
        $(".long-3s").val("W");
        $(".alt-1d").val("13");
        $(".alt-1m").val("32.2");
        $(".alt-2d").val("29");
        $(".alt-2m").val("01.7");
        $(".alt-3d").val("26");
        $(".alt-3m").val("14.1");
        $(".hoe-1").val("20.0");
        $(".hoe-2").val("20.0");
        $(".hoe-3").val("20.0");
        $(".gha-1d").val("089");
        $(".gha-1m").val("28.9");
        $(".gha-2d").val("327");
        $(".gha-2m").val("44.0");
        $(".gha-3d").val("327");
        $(".gha-3m").val("44.0");
        $(".sha-2d").val("075");
        $(".sha-2m").val("55.7");
        $(".sha-3d").val("152");
        $(".sha-3m").val("57.7");
        $(".cv-sign.cv-1").val("-");
        $(".cv.cv-1").val("00.5");
        $(".inc-1d").val("11");
        $(".inc-1m").val("15.0");
        $(".inc-2d").val("12");
        $(".inc-2m").val("02.0");
        $(".inc-3d").val("12");
        $(".inc-3m").val("39.6");
        $(".dec-1d").val("21");
        $(".dec-1m").val("22.8");
        $(".dec-1s").val("S");
        $(".dec-2d").val("26");
        $(".dec-2m").val("16.4");
        $(".dec-2s").val("S");
        $(".dec-3d").val("49");
        $(".dec-3m").val("14.0");
        $(".dec-3s").val("N");
        $(".cd-sign.cd-1").val("+");
        $(".cd.cd-1").val("00.5");
        $(".dip-1").val("07.9");
        $(".dip-2").val("07.9");
        $(".dip-3").val("07.9");
        $(".tc-sign.tc-1").val("-");
        $(".tc.tc-1").val("04.0");
        $(".tc-sign.tc-2").val("-");
        $(".tc.tc-2").val("01.8");
        $(".tc-sign.tc-3").val("-");
        $(".tc.tc-3").val("02.0");
        $(".ac-1").val("00.1");
    });
});

// Reset of data inputs Button ============================================

$(document).ready(function(){ 
    $(".header__reset span").on("click", () => {
        $("input").val("");
        $(".lat-1s, .lat-2s, .lat-3s").val("N");
        $(".long-1s, .long-2s, .long-3s").val("E");
        $(".dec-1s, .dec-2s, .dec-3s").val("N");
        $(".plus-minus-btn").val("+");
        sessionStorage.removeItem("goToFormAnimation");
        sessionStorage.removeItem("goToLhaSectionAnimation");
        sessionStorage.removeItem("goToInterceptSectionAnimation");
        sessionStorage.removeItem("getInterceptAnimation");
        setTimeout(() => document.location.reload(), 600);
        $('html,body').animate({scrollTop: document.body.scrollTop}, 500);
    });
});

// Go To Calculation Form Button ===========================================

$("header button").on("click", () => {

    if (!sessionStorage.goToFormAnimation) {

        $("body").css("overflow", "auto");

        $('html,body').animate({scrollTop: document.body.scrollHeight}, 1500);
        $(".initial-data").css("display", "grid");
        $(".data-container, .initial-data__update-info-section").css("display", "flex");
        $(".data-container, .initial-data, .initial-data__update-info-section").wrapAll("<div class='initial-data-container'>");
        $(".initial-data-container").css({
            "height": "100vh",
            "display": "grid",
            "place-content": "center"
        });
        $(".initial-data-container > *").css("margin", "0.5rem");
        sessionStorage.goToFormAnimation = "true";
    };

    if (sessionStorage.goToFormAnimation === "true") {
        $('html, body').animate({scrollTop: $(".data-container").offset().top}, 1500);
    }

});

$(document).ready(function(){ 

    if (sessionStorage.goToFormAnimation === "true" && sessionStorage.goToLhaSectionAnimation === undefined) {

        $("body").css("overflow", "auto");

        $('html,body').animate({scrollTop: document.body.scrollHeight}, 1000);
        $(".initial-data").css("display", "grid");
        $(".data-container, .initial-data__update-info-section").css("display", "flex");
        $(".data-container, .initial-data, .initial-data__update-info-section").wrapAll("<div class='initial-data-container'>");
        $(".initial-data-container").css({
            "height": "100vh",
            "display": "grid",
            "place-content": "center"
        });
        $(".initial-data-container > *").css("margin", "0.5rem");
    };

    if (sessionStorage.goToFormAnimation === "true" && sessionStorage.goToLhaSectionAnimation === "true") {
        $("body").css("overflow", "auto");

        $(".initial-data").css("display", "grid");
        $(".data-container, .initial-data__update-info-section").css("display", "flex");
    };

});

// Data calculation Sections ==============================================
// ========================================================================

// Go to LHA Section Animation ============================================

$(".initial-data__update-info-btn").on("click", () => {
    
    if (!sessionStorage.goToLhaSectionAnimation && accessResultForInitialData === true) {
        
        $('html,body').animate({scrollTop: document.body.scrollHeight}, 1000);

        $(".lha-calculation").css("animation", "opacity 1s ease-in 0.5s backwards, scale 1s ease 0.5s backwards");
        $(".dec-calculation").css("animation", "opacity 1s ease-in 0.5s backwards, scale 1s ease 0.5s backwards");
        $(".lha-dec__update-info-message").css("animation", "opacity 1s ease 0.5s backwards, scale 1s ease 0.5s backwards");
        $(".lha-dec__update-info-middle").css("animation", "opacity 1s ease 0.5s backwards, scale 1s ease 0.5s backwards");
        $(".lha-dec__update-info-btn").css("animation", "opacity 1s ease 0.5s backwards, scale 1s ease 0.5s backwards");

        $(".lha-calculation").removeClass("hidden-but-in-flow");
        $(".dec-calculation").removeClass("hidden-but-in-flow");
        $(".lha-dec__update-info-section").removeClass("hidden-but-in-flow");

        $(".data-container, .initial-data, .initial-data__update-info-section").unwrap();
        $(".data-container, .initial-data, .initial-data__update-info-section").css("margin", "1rem auto");

        sessionStorage.goToLhaSectionAnimation = "true";
    };

    if (sessionStorage.goToLhaSectionAnimation === "true" && accessResultForInitialData === true) {
        $(".lha-calculation").removeClass("hidden-but-in-flow");
        $(".dec-calculation").removeClass("hidden-but-in-flow");
        $(".lha-dec__update-info-section").removeClass("hidden-but-in-flow");
    };

});

$(document).ready(function(){
    if (sessionStorage.goToLhaSectionAnimation === "true") {
        $(".lha-calculation").removeClass("hidden-but-in-flow");
        $(".dec-calculation").removeClass("hidden-but-in-flow");
        $(".lha-dec__update-info-section").removeClass("hidden-but-in-flow");
        $('html, body').animate({scrollTop: $(".data-container").offset().top}, 1000);
    };
});

// Go to Intercept Section Animation ====================================

$(".lha-dec__update-info-btn").on("click", () => {

    if (!sessionStorage.goToInterceptSectionAnimation && accessResultForLhaAndDecData === true) {

        $('html,body').animate({scrollTop: document.body.scrollHeight}, 1000);

        $(".lha-calculation").css("grid-template-rows", "repeat(7, 2.5rem)");
        $(".dec-calculation").css("grid-template-rows", "repeat(3, 2.5rem)");
        $(".lha-calculation").children().filter("input.hidden, h3.hidden, span.hidden").css("display", "block");
        $(".dec-calculation").children().filter("input.hidden, h3.hidden, span.hidden").css("display", "block");

        $(".azimuth-calculation").css({
            "animation": "slide-in-left-azimuth 0.5s ease-out 0.8s backwards",
            "transition": "all 0.5s"
        });
        $(".intercept-calculation").css({
            "grid-template-rows": "2.5rem 2.5rem 0rem 2.5rem 0rem repeat(4, 2.5rem) ", 
            "animation": "slide-in-right-intercept 0.5s ease-out 0.8s backwards",
            "transition": "all 0.5s"
        });
        $(".intercept-calculation__button").css({
            "display": "flex", 
            "animation": "slide-in-bottom-intercept-btn 0.5s linear 0.8s backwards",
            "transition": "all 0.5s"
        });

        $(".azimuth-calculation").removeClass("hidden-but-in-flow");
        $(".intercept-calculation").removeClass("hidden-but-in-flow");
        $(".intercept-calculation__button").show();

        sessionStorage.goToInterceptSectionAnimation = "true";
    };

});

$(document).ready(function(){

    if (sessionStorage.goToInterceptSectionAnimation === "true") {
        $(".lha-calculation").css("grid-template-rows", "repeat(7, 2.5rem)");
        $(".dec-calculation").css("grid-template-rows", "repeat(3, 2.5rem)");
        $(".lha-calculation").children().filter("input.hidden, h3.hidden, span.hidden").css("display", "block");
        $(".dec-calculation").children().filter("input.hidden, h3.hidden, span.hidden").css("display", "block");
        $(".intercept-calculation").css("grid-template-rows", "2.5rem 2.5rem 0rem 2.5rem 0rem repeat(4, 2.5rem)");
        $(".azimuth-calculation").removeClass("hidden-but-in-flow");
        $(".intercept-calculation").removeClass("hidden-but-in-flow");
        $(".intercept-calculation__button").show();
        $('html, body').animate({scrollTop: $(".data-container").offset().top}, 1000);
    };

});

// Get the Intercept Section Animation ====================================

$(".intercept-calculation__button").on("click", () => {
    
    if (!sessionStorage.getInterceptAnimation && accessResultForInterceptData === true) {
        $(".intercept-calculation").children().filter("input.hidden, h3.hidden, span.hidden").css("display", "block");
        $(".intercept-calculation").css("grid-template-rows", "repeat(12, 2.5rem)");
        $('html,body').animate({scrollTop: document.body.scrollHeight}, 2000);
        sessionStorage.getInterceptAnimation = "true";
    };
    
});
    
$(document).ready(function(){ 
    
    if (sessionStorage.getInterceptAnimation === "true") {
        $(".intercept-calculation").children().filter("input.hidden, h3.hidden, span.hidden").css("display", "block");
        $(".intercept-calculation").css("grid-template-rows", "repeat(12, 2.5rem)");
        $('html, body').animate({scrollTop: $(".data-container").offset().top}, 1000);
    }

});

// #endregion

// =========================================================================
// Calculation of data =====================================================
// =========================================================================
// #region

// Functions for general usage ============================================

const formatDegreesAndMinutes = (degrees, minutes, totalValue) => {
    for (let i = 0; i < 3; i++ ) {
        if (totalValue[i] < 0) {
            degrees[i].value = "-" + Math.floor(Math.abs(totalValue[i]));
            minutes[i].value = (Math.abs(totalValue[i]) - Math.floor(Math.abs(totalValue[i]))) * 60;
            minutes[i].value = Math.round(+minutes[i].value * 10) / 10;
        } else {
            degrees[i].value = Math.floor(totalValue[i]);
            minutes[i].value = (totalValue[i] - Math.floor(totalValue[i])) * 60;
            minutes[i].value = Math.round(+minutes[i].value * 10) / 10;
        };
    };
};

const formatValue90DegDOM = (Degrees, Minutes) => {
    for (let i = 0; i < 3; i++) {
        if (Degrees[i].value.length < 2) {Degrees[i].value = "0" + Degrees[i].value}
        else {Degrees[i].value};
        if (+Minutes[i].value % 1 === 0 && +Minutes[i].value > 0) {Minutes[i].value = +Minutes[i].value + ".0"}
        else if (+Minutes[i].value === 0) {Minutes[i].value = "00.0"}
        else if (Minutes[i].value.length < 4) {Minutes[i].value = "0" + Minutes[i].value}
        else {Minutes[i].value};
    };
};

const formatValue360DegDOM = (Degrees, Minutes) => {
    for (let i = 0; i < 3; i++) {
        if (Degrees[i].value.length < 2) {Degrees[i].value = "00" + Degrees[i].value}
        else if (Degrees[i].value.length < 3) {Degrees[i].value = "0" + Degrees[i].value}
        else {Degrees[i].value};
        if (+Minutes[i].value % 1 === 0 && +Minutes[i].value > 0) {Minutes[i].value = +Minutes[i].value + ".0"}
        else if (+Minutes[i].value === 0) {Minutes[i].value = "00.0"}
        else if (Minutes[i].value.length < 4) {Minutes[i].value = "0" + Minutes[i].value}
        else {Minutes[i].value};
    };
};

// LHA Calculation Section ==================================================
// ==========================================================================

$(".initial-data__update-info-btn, .lha-dec__update-info-btn, .intercept-calculation__button").on("click", () => {

    const longitudeDegrees = document.getElementsByClassName("long-deg");
    const longitudeMinutes = document.getElementsByClassName("long-min");
    const longitudeSign = document.getElementsByClassName("long-sign");
    const longitudeDegreesLhaSection = document.getElementsByClassName("longC-deg");
    const longitudeMinutesLhaSection = document.getElementsByClassName("longC-min");
    const longitudeSignLhaSection = document.getElementsByClassName("longC-sign");

    const autoFillLongitude = (longD, longM, longSign) => {
        for (let i = 0; i < 3; i++) {
            longitudeDegreesLhaSection[i].value = longD[i].value;
            longitudeMinutesLhaSection[i].value = longM[i].value;
            longitudeSignLhaSection[i].innerHTML = longSign[i].value;
        };
    };

    autoFillLongitude(longitudeDegrees, longitudeMinutes, longitudeSign);

    sessionStorage.setItem("longSign1", longitudeSign[0].value);
    sessionStorage.setItem("longSign2", longitudeSign[1].value);
    sessionStorage.setItem("longSign3", longitudeSign[2].value);

    const ghaDegrees = document.getElementsByClassName("gha-deg");
    const ghaMinutes = document.getElementsByClassName("gha-min")
    const shaDegrees = document.getElementsByClassName("sha-deg");
    const shaMinutes = document.getElementsByClassName("sha-min");
    const cvCorrection = document.getElementsByClassName("cv");
    const cvCorrectionSign = document.getElementsByClassName("cv-sign");
    const incrementDegrees = document.getElementsByClassName("inc-deg");
    const incrementMinutes = document.getElementsByClassName("inc-min");
    const ghaCalcDegrees = document.getElementsByClassName("ghaC-deg");
    const ghaCalcMinutes = document.getElementsByClassName("ghaC-min");
    const lhaDegrees = document.getElementsByClassName("lha-deg");
    const lhaMinutes = document.getElementsByClassName("lha-min");

    let ghaCalculatedList = [];

    const calculateGHA = (ghaD, ghaM, shaD, shaM, cvVal, cvSign, incD, incM) => {
        for (let i = 0; i < 3; i++) {
            let ghaBody = +ghaD[i].value + (+ghaM[i].value / 60);
            let sha = +shaD[i].value + (+shaM[i].value / 60);
            let cv = +cvVal[i].value / 60;
            (cvSign[i].value === "+") ? cv : cv = -1 * cv;
            let inc = +incD[i].value + (incM[i].value / 60);
            ghaCalculatedList.push(ghaBody + sha + cv + inc);
        };
    };

    calculateGHA(ghaDegrees, ghaMinutes, shaDegrees, shaMinutes, cvCorrection, cvCorrectionSign, incrementDegrees, incrementMinutes);
    formatDegreesAndMinutes(ghaCalcDegrees, ghaCalcMinutes, ghaCalculatedList); 
    formatValue360DegDOM(ghaCalcDegrees, ghaCalcMinutes);

    let lhaCalculatedList = [];

    const calculateLHA = (longD, longM, longSign, ghaDC, ghaMC) => {
        for (let i = 0; i < 3; i++) {
            let lha;
            (longSign[i].value === "E") ? lha = (+ghaDC[i].value + (+ghaMC[i].value / 60)) + (+longD[i].value + (+longM[i].value / 60))
            : lha = (+ghaDC[i].value + (+ghaMC[i].value / 60)) - (+longD[i].value + (+longM[i].value / 60));
            if (lha > 359) {lha -= 360};
            if (lha < 0) {lha += 360};
            lhaCalculatedList.push(lha);
        };
    };

    calculateLHA(longitudeDegrees, longitudeMinutes, longitudeSign, ghaCalcDegrees, ghaCalcMinutes);
    formatDegreesAndMinutes(lhaDegrees, lhaMinutes, lhaCalculatedList);
    formatValue360DegDOM(lhaDegrees, lhaMinutes);

});

$(document).ready(function() {
    const longitudeSignLhaSection = document.getElementsByClassName("longC-sign");
    longitudeSignLhaSection[0].innerHTML = sessionStorage.getItem("longSign1");
    longitudeSignLhaSection[1].innerHTML = sessionStorage.getItem("longSign2");
    longitudeSignLhaSection[2].innerHTML = sessionStorage.getItem("longSign3");
});

// Declination Calculation Section ============================================
// ============================================================================

$(".initial-data__update-info-btn, .lha-dec__update-info-btn, .intercept-calculation__button").on("click", () => {

    const declinationDegrees = document.getElementsByClassName("dec-deg");
    const declinationMinutes = document.getElementsByClassName("dec-min");
    const declinationSign = document.getElementsByClassName("dec-sign");
    const cdCorrection = document.getElementsByClassName("cd");
    const cdCorrectionSign = document.getElementsByClassName("cd-sign");
    const declinationCalcDegrees = document.getElementsByClassName("decC-deg");
    const declinationCalcMinutes = document.getElementsByClassName("decC-min");
    const declinationCalcSign = document.getElementsByClassName("decC-sign");

    let decCalculatedList = [];

    const calculateDEC = (decD, decM, decSign, cd, cdSign) => {
        for (let i = 0; i < 3; i++) {
            let dec = +decD[i].value + (+decM[i].value / 60);
            let decCorrected;
            (cdSign[i].value === "+") ? decCorrected = dec + (+cd[i].value / 60) 
            : decCorrected = dec - (+cd[i].value / 60);
            declinationCalcSign[i].innerHTML = decSign[i].value;
            decCalculatedList.push(decCorrected);
        };
    };

    calculateDEC(declinationDegrees, declinationMinutes, declinationSign, cdCorrection, cdCorrectionSign);
    formatDegreesAndMinutes(declinationCalcDegrees, declinationCalcMinutes, decCalculatedList);
    formatValue90DegDOM(declinationCalcDegrees, declinationCalcMinutes);

    sessionStorage.setItem("decSign1", declinationSign[0].value);
    sessionStorage.setItem("decSign2", declinationSign[1].value);
    sessionStorage.setItem("decSign3", declinationSign[2].value);

});

$(document).ready(function() {
    const declinationCalcSign = document.getElementsByClassName("decC-sign");
    declinationCalcSign[0].innerHTML = sessionStorage.getItem("decSign1");
    declinationCalcSign[1].innerHTML = sessionStorage.getItem("decSign2");
    declinationCalcSign[2].innerHTML = sessionStorage.getItem("decSign3");
})

// Azimuth Calculation Section ================================================
// ============================================================================

$(".initial-data__update-info-btn, .lha-dec__update-info-btn, .intercept-calculation__button").on("click", () => {

    const latitudeDegrees = document.getElementsByClassName("lat-deg");
    const latitudeMinutes = document.getElementsByClassName("lat-min");
    const latitudeSign = document.getElementsByClassName("lat-sign");
    const altitudeDegreesCalc = document.getElementsByClassName("altC-deg");
    const altitudeMinutesCalc = document.getElementsByClassName("altC-min");
    const lhaDegrees = document.getElementsByClassName("lha-deg");
    const lhaMinutes = document.getElementsByClassName("lha-min");
    const declinationCalcDegrees = document.getElementsByClassName("decC-deg");
    const declinationCalcMinutes = document.getElementsByClassName("decC-min");
    const declinationSign = document.getElementsByClassName("dec-sign");

    const radiansCoefficient = Math.PI / 180;
    const degreesCoefficient = 180 / Math.PI;

    let altCalculatedList = [];

    const calculateAltitude = (lhaD, lhaM, decD, decM, decSign, latD, latM, latSign) => {
        for (let i = 0; i < 3; i++) {
            let lha = (+lhaD[i].value + (+lhaM[i].value / 60)) * radiansCoefficient;
            let dec = (+decD[i].value + (+decM[i].value / 60)) * radiansCoefficient;
            let lat = (+latD[i].value + (+latM[i].value / 60)) * radiansCoefficient;
            let cosOfLHA = Math.cos(lha);
            let cosOfDEC = Math.cos(dec);
            let cosOfLAT = Math.cos(lat);
            let sinOfDEC = Math.sin(dec);
            let sinOfLAT = Math.sin(lat);
            let altitude;
            (latSign[i].value === decSign[i].value) ? altitude = degreesCoefficient * Math.asin((cosOfLHA * cosOfLAT * cosOfDEC) + (sinOfLAT * sinOfDEC))
            : altitude = degreesCoefficient * Math.asin((cosOfLHA * cosOfLAT * cosOfDEC) - (sinOfLAT * sinOfDEC));
            if (altitude < 0) {altitudeDegreesCalc[i].classList.add("width-100")}
            altCalculatedList.push(altitude);
        };
    };

    calculateAltitude(lhaDegrees, lhaMinutes, declinationCalcDegrees, declinationCalcMinutes, declinationSign, latitudeDegrees, latitudeMinutes, latitudeSign);
    formatDegreesAndMinutes(altitudeDegreesCalc, altitudeMinutesCalc, altCalculatedList);
    formatValue90DegDOM(altitudeDegreesCalc, altitudeMinutesCalc);

    const quadrantAzimuth = document.getElementsByClassName("azimQ");
    const quadrantAzimuthSign1 = document.getElementsByClassName("azimQ-sign-1");
    const quadrantAzimuthSign2 = document.getElementsByClassName("azimQ-sign-2");
    const trueAzimuth = document.getElementsByClassName("azimT");

    const calculateQuadrantAzimuth = (lhaD, lhaM, decD, decM, decSign, latD, latM, latSign) => {
        for (let i = 0; i < 3; i++) {
            let lha = (+lhaD[i].value + (+lhaM[i].value / 60)) * radiansCoefficient;
            let dec = (+decD[i].value + (+decM[i].value / 60)) * radiansCoefficient;
            let lat = (+latD[i].value + (+latM[i].value / 60)) * radiansCoefficient;
            let sinOfNegativeLHA = Math.sin(-1 * lha);
            let cosOfNegativeLHA = Math.cos(-1 * lha);
            let tanOfDEC;
            let sinOfLAT;
            let cosOfLAT;
            (decSign[i].value === "N") ? tanOfDEC = Math.tan(dec) : tanOfDEC = Math.tan(-1 * dec);
            (latSign[i].value === "N") ? sinOfLAT = Math.sin(lat) : sinOfLAT = Math.sin(-1 * lat);
            (latSign[i].value === "N") ? cosOfLAT = Math.cos(lat) : cosOfLAT = Math.cos(-1 * lat);
            let qAzimuth = degreesCoefficient * Math.atan(sinOfNegativeLHA / ((cosOfLAT * tanOfDEC) - (sinOfLAT * cosOfNegativeLHA)));
            let qAzimuthFormatted = qAzimuth.toFixed(1);

            if (Math.abs(qAzimuthFormatted.length) < 4) {qAzimuthFormatted = "0" + qAzimuthFormatted};

            if ((lha * degreesCoefficient) > 0 && (lha * degreesCoefficient) < 180) {
                if (qAzimuthFormatted > 0) {
                    quadrantAzimuthSign1[i].innerHTML = "S";
                    quadrantAzimuth[i].value = qAzimuthFormatted;
                    quadrantAzimuthSign2[i].innerHTML = "W";
                };
                if (qAzimuthFormatted < 0) {
                    quadrantAzimuthSign1[i].innerHTML = "N";
                    quadrantAzimuth[i].value = Math.abs(qAzimuthFormatted);
                    quadrantAzimuthSign2[i].innerHTML = "W";
                };
            };
            if ((lha * degreesCoefficient) > 180 && (lha * degreesCoefficient) < 360) {
                if (qAzimuthFormatted > 0) {
                    quadrantAzimuthSign1[i].innerHTML = "N";
                    quadrantAzimuth[i].value = qAzimuthFormatted;
                    quadrantAzimuthSign2[i].innerHTML = "E";
                };
                if (qAzimuthFormatted < 0) {
                    quadrantAzimuthSign1[i].innerHTML = "S";
                    quadrantAzimuth[i].value = Math.abs(qAzimuthFormatted);
                    quadrantAzimuthSign2[i].innerHTML = "E";
                };
            };
            if (quadrantAzimuth[i].value.length < 4) {quadrantAzimuth[i].value = "0" + quadrantAzimuth[i].value};
        };
    };

    calculateQuadrantAzimuth(lhaDegrees, lhaMinutes, declinationCalcDegrees, declinationCalcMinutes, declinationSign, latitudeDegrees, latitudeMinutes, latitudeSign);

    const calculateAzimuth = () => {
        for(let i = 0; i < 3; i++) {
            if (quadrantAzimuthSign1[i].innerHTML === "N" && quadrantAzimuthSign2[i].innerHTML === "E") {trueAzimuth[i].value = 0 + +quadrantAzimuth[i].value};
            if (quadrantAzimuthSign1[i].innerHTML === "S" && quadrantAzimuthSign2[i].innerHTML === "E") {trueAzimuth[i].value = 180 - +quadrantAzimuth[i].value};
            if (quadrantAzimuthSign1[i].innerHTML === "S" && quadrantAzimuthSign2[i].innerHTML === "W") {trueAzimuth[i].value = 180 + +quadrantAzimuth[i].value};
            if (quadrantAzimuthSign1[i].innerHTML === "N" && quadrantAzimuthSign2[i].innerHTML === "W") {trueAzimuth[i].value = 360 - +quadrantAzimuth[i].value};
            if (+trueAzimuth[i].value % 1 === 0) {trueAzimuth[i].value += ".0"};
            if (trueAzimuth[i].value.length < 4) {trueAzimuth[i].value = "00" + trueAzimuth[i].value};
            if (trueAzimuth[i].value.length < 5) {trueAzimuth[i].value = "0" + trueAzimuth[i].value};
        };
    };

    calculateAzimuth();

    const sextantAltitudeDegrees = document.getElementsByClassName("altD");
    const sextantAltitudeMinutes = document.getElementsByClassName("altM");
    const sextantAltitudeDegreesCopy = document.getElementsByClassName("altCopyD");
    const sextantAltitudeMinutesCopy = document.getElementsByClassName("altCopyM");

    const autofillSextantAltitude = (altD, altM, altDCopyDestination, altMCopyDestination) => {
        for(let i = 0; i < 3; i++) {
            altDCopyDestination[i].value = altD[i].value;
            altMCopyDestination[i].value = altM[i].value;
        };
    };

    autofillSextantAltitude(sextantAltitudeDegrees, sextantAltitudeMinutes, sextantAltitudeDegreesCopy, sextantAltitudeMinutesCopy);

    sessionStorage.setItem("quadrantAzimuthSign11", quadrantAzimuthSign1[0].innerHTML);
    sessionStorage.setItem("quadrantAzimuthSign22", quadrantAzimuthSign1[1].innerHTML);
    sessionStorage.setItem("quadrantAzimuthSign33", quadrantAzimuthSign1[2].innerHTML);
    sessionStorage.setItem("quadrantAzimuthSign111", quadrantAzimuthSign2[0].innerHTML);
    sessionStorage.setItem("quadrantAzimuthSign222", quadrantAzimuthSign2[1].innerHTML);
    sessionStorage.setItem("quadrantAzimuthSign333", quadrantAzimuthSign2[2].innerHTML);
});

$(document).ready(function() {
    const quadrantAzimuthSign1 = document.getElementsByClassName("azimQ-sign-1");
    const quadrantAzimuthSign2 = document.getElementsByClassName("azimQ-sign-2");
    quadrantAzimuthSign1[0].innerHTML = sessionStorage.getItem("quadrantAzimuthSign11");
    quadrantAzimuthSign1[1].innerHTML = sessionStorage.getItem("quadrantAzimuthSign22");
    quadrantAzimuthSign1[2].innerHTML = sessionStorage.getItem("quadrantAzimuthSign33");
    quadrantAzimuthSign2[0].innerHTML = sessionStorage.getItem("quadrantAzimuthSign111");
    quadrantAzimuthSign2[1].innerHTML = sessionStorage.getItem("quadrantAzimuthSign222");
    quadrantAzimuthSign2[2].innerHTML = sessionStorage.getItem("quadrantAzimuthSign333");
});

// Increment Calculation Section ===========================================
// =========================================================================

$(".initial-data__update-info-btn, .lha-dec__update-info-btn, .intercept-calculation__button").on("click", () => {

    const altitudeDegreesCalc = document.getElementsByClassName("altC-deg");
    const altitudeMinutesCalc = document.getElementsByClassName("altC-min");
    const sextantAltitudeDegrees = document.getElementsByClassName("altD");
    const sextantAltitudeMinutes = document.getElementsByClassName("altM");
    const index = document.getElementsByClassName("index");
    const indexSign = document.getElementsByClassName("index-sign");
    const altitudeObservedDegrees = document.getElementsByClassName("altObsD");
    const altitudeObservedMinutes = document.getElementsByClassName("altObsM");
    const dip = document.getElementsByClassName("dip");
    const altitudeAppearantDegrees = document.getElementsByClassName("altAprD");
    const altitudeAppearantMinutes = document.getElementsByClassName("altAprM");
    const tc = document.getElementsByClassName("tc");
    const tcSign = document.getElementsByClassName("tc-sign");
    const ac = document.getElementsByClassName("ac");
    const ulc = document.getElementsByClassName("ulc");
    const arc = document.getElementsByClassName("arc");
    const arcSign = document.getElementsByClassName("arc-sign");
    const altitudeTrueDegrees = document.getElementsByClassName("altTrueD");
    const altitudeTrueMinutes = document.getElementsByClassName("altTrueM");
    const altitudeCalculatedCopyDegrees = document.getElementsByClassName("altCCopyD");
    const altitudeCalculatedCopyMinutes = document.getElementsByClassName("altCCopyM");
    const intercept = document.getElementsByClassName("int");

    const autofillSextantAltitude = (altD, altM, altDCopyDestination, altMCopyDestination) => {
        for(let i = 0; i < 3; i++) {
            altDCopyDestination[i].value = altD[i].value;
            altMCopyDestination[i].value = altM[i].value;
        };
    };

    let observedAltitudeList = [];

    const calculateObservedAltitude = () => {
        for (let i = 0; i < 3; i++) {
            let sextantAltitude = +sextantAltitudeDegrees[i].value + (+sextantAltitudeMinutes[i].value / 60);
            let ind = +index[i].value / 60;
            (indexSign[i].value === "+") ? ind : ind = -1 * ind;
            let observedAltitude = sextantAltitude + ind;
            observedAltitudeList.push(observedAltitude);
        };
    };

    calculateObservedAltitude();
    formatDegreesAndMinutes(altitudeObservedDegrees, altitudeObservedMinutes, observedAltitudeList);
    formatValue90DegDOM(altitudeObservedDegrees, altitudeObservedMinutes);

    let appearantAltitudeList = [];

    const calculateAppearantAltitude = () => {
        for (let i = 0; i < 3; i++) {
            let observedAltitude = +altitudeObservedDegrees[i].value + (+altitudeObservedMinutes[i].value / 60);
            let dipCorrection = +dip[i].value / 60;
            let appearantAltitude = observedAltitude - dipCorrection;
            appearantAltitudeList.push(appearantAltitude);
        };
    };

    calculateAppearantAltitude();
    formatDegreesAndMinutes(altitudeAppearantDegrees, altitudeAppearantMinutes, appearantAltitudeList);
    formatValue90DegDOM(altitudeAppearantDegrees, altitudeAppearantMinutes);

    let trueAltitudeList = [];

    const calculateTrueAltitude = () => {
        for (let i = 0; i < 3; i++) {
            let appearantAltitude = +altitudeAppearantDegrees[i].value + (+altitudeAppearantMinutes[i].value / 60);
            let tcCorrection = +tc[i].value / 60;
            (tcSign[i].value === "+") ? tcCorrection : tcCorrection = -1 * tcCorrection;
            let acCorrection = +ac[i].value / 60;
            let ulcCorrection = +ulc[i].value / 60;
            let arcCorrection = +arc[i].value / 60;
            (arcSign[i].value === "+") ? arcCorrection : arcCorrection = -1 * arcCorrection;
            let trueAltitude = appearantAltitude + tcCorrection + acCorrection - ulcCorrection + arcCorrection;
            trueAltitudeList.push(trueAltitude);
        };
    };

    calculateTrueAltitude();
    formatDegreesAndMinutes(altitudeTrueDegrees, altitudeTrueMinutes, trueAltitudeList);
    formatValue90DegDOM(altitudeTrueDegrees, altitudeTrueMinutes);

    autofillSextantAltitude(altitudeDegreesCalc, altitudeMinutesCalc, altitudeCalculatedCopyDegrees, altitudeCalculatedCopyMinutes);

    const calculateIntercept = () => {
        for (let i = 0; i < 3; i++) {
            let trueAltitude = +altitudeTrueDegrees[i].value + (+altitudeTrueMinutes[i].value / 60);
            let calculatedAltitude = +altitudeDegreesCalc[i].value + (+altitudeMinutesCalc[i].value / 60);
            let calculatedIntercept = Math.round(((trueAltitude - calculatedAltitude) * 60) * 10) / 10;
            intercept[i].value = calculatedIntercept;
        };
    };

    calculateIntercept();

});

// #endregion 
