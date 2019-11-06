// Get some document things
var carSaleTimer = "";

//
// Some globals that the clockTick function can reference (to know what to do)
// 

// Let's use classes to be a little fancy
class gtaTimer
{
    // timerValue = the starting value of the timer. Usually 0 (timers count up)
    // timerMax   = the maximum number of seconds before the timer expires
    constructor(timerName, timerValue, timerMax, timerState = false)
    {
        this.timerName = timerName;
        this.timerValue = timerValue;
        this.timerMax = timerMax;

        const timerValueOrig = this.timerValue;
    }

    tick()
    {
        if (this.timerState)
        {
            this.timerValue += 1;
        }
    }

    reset()
    {
        this.timerValue = timerValueOrig;
    }

    pause()
    {
        this.timerState = false;
    }

    remaining()
    {
        return this.timerMax - this.timerValue;
    }

    // Makes a nice time value (mm:ss) out of seconds
    static secondsToTimeValue(seconds)
    {
        var minutes = Math.floor(seconds / 60);
        seconds = seconds % 60;

        if(minutes < 10){minutes = "0"+minutes;}
        if(seconds < 10){seconds = "0"+seconds;}

        return minutes + ":" + seconds;
    }
}

var p = new gtaTimer("carSale",0,2880);
console.log("Value of the classed gta timer: " + p.timerMax);
p.tick();
p.timerState = true;
p.tick();

console.log("Time remaining: " + p.remaining());
console.log("200 seconds = " + gtaTimer.secondsToTimeValue(200));

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
    carSaleTimer.innerHTML = gtaTimer.secondsToTimeValue(carSaleSeconds);
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



// When the page is ready, hit GO!
document.addEventListener("DOMContentLoaded", function(){
    // Handler when the DOM is fully loaded
    carSaleTimer = document.getElementById("carSaleTimer");
    clockInit()
  });