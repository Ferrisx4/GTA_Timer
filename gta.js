// Get some document things
var carSaleTimer = "";

// Some globals that the clockTick function can reference (to know what to do)
var carSaleActive = false;
var carSaleSeconds = 0;

// The main clock. Starts on page ready
function clockInit()
{    
    setInterval(clockTick,1000);
}

// The ticking of the clock (things that run every second)
function clockTick()
{
    // Check the individual timers
    if (carSaleActive)
    {
        carSaleSeconds += 1;
    }
    
    // Set the timer strings
    carSaleTimer.innerHTML = secondsToTimeValue(carSaleSeconds);
}

// Start the car sale timer
function carSaleStart()
{
    console.log("Initiating Car Sales timer");
    carSaleActive = true;
}

// Reset the car sale timer
function carSaleReset()
{
    console.log("Resetting Car Sales timer");
    carSaleSeconds = 0;
}

// Makes a nice time value (mm:ss) out of seconds
function secondsToTimeValue(seconds)
{
    var minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;

    if(minutes < 10){minutes = "0"+minutes;}
    if(seconds < 10){seconds = "0"+seconds;}

    return minutes + ":" + seconds;
}

// When the page is ready, hit GO!
document.addEventListener("DOMContentLoaded", function(){
    // Handler when the DOM is fully loaded
    carSaleTimer = document.getElementById("carSaleTimer");
    clockInit()
  });