// Main page behaviour (moved out of inline handlers in index.html).

// Dark mode: the button flips it for this visit, the checkbox remembers it as the default.
// With no saved choice the page follows the device's light/dark setting.
function prefersDark() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function isDarkMode() {
    var body = document.body;
    return body.classList.contains('dark-mode') ||
        (prefersDark() && !body.classList.contains('light-mode'));
}

function setDarkMode(on) {
    document.body.classList.toggle('dark-mode', on);
    document.body.classList.toggle('light-mode', !on);
}

function toggle(darkmode) {
    setDarkMode(darkmode === 'true' || darkmode === true);
    window.localStorage.setItem('toggle', darkmode);
}

function myFunction() {
    setDarkMode(!isDarkMode());
}

function initDarkMode() {
    var saved = window.localStorage.getItem('toggle');
    if (saved === 'true' || saved === 'false') {
        setDarkMode(saved === 'true');
    }
    document.getElementById('darkModeIndicator').checked = saved === 'true';
}

// Events calendar "Details" / "Hide" buttons.
function toggleDetails(button) {
    $(button).parents('.codebox').find('.content').toggle('slow');
    button.value = button.value == 'Hide' ? 'Details' : 'Hide';
    return false;
}

function emailCurrentPage() {
    var subject = "Eagle Sundance";
    var body = "Boozhoo! Greetings! Follow this link to our Eagle Sundance page: https://mke-joe.github.io/Directions-to-Eagle-Sundance. Please contact me with any questions! Miigwech. Thank you.";
    window.location.href = "mailto:?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
}

// "Text This Page": iPhones/iPads/Macs want sms:&body=, everything else sms:?body=.
function setupTextLink(id) {
    var link = document.getElementById(id);
    var body = decodeURIComponent(link.getAttribute('href').split('body=')[1]);
    var apple = /iPhone|iPad|iPod|Macintosh/.test(navigator.userAgent);
    link.href = 'sms:' + (apple ? '&' : '?') + 'body=' + encodeURIComponent(body);
}

// Countdown to Camp Day.
function startCountdown(target, elementId) {
    var countDownDate = new Date(target).getTime();
    var el = document.getElementById(elementId);

    var x = setInterval(function () {
        var distance = countDownDate - new Date().getTime();

        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        el.innerHTML = "Countdown to Camp Day" + "<br>" + days + "d " + hours +
            "h " + minutes + "m " + seconds + "s ";

        if (distance < 0) {
            clearInterval(x);
            el.innerHTML = "Camp Day is here!";
        }
    }, 1000);
}
