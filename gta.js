// Get some document things
var carSaleTimer = "";

//
// Some globals that the clockTick function can reference (to know what to do)
// 

// Let's use classes to be a little fancy
class gtaTimer
{
    // timerLength   = the maximum number of seconds before the timer expires
    constructor(timerName, timerLength, timerState = false)
    {
        this.timerName = timerName;
        this.timerTarget = 0;
        this.timerLength = timerLength;
        this.timerPausedTime;
    }

    tick(sse)
    {
        // Calculate new remaining tiem
        var remainingSecs = this.remaining();
        if (remainingSecs == 0)
        {
            console.log("Reached end of timer, pausing..");
            this.pause();
        }
        document.title=gtaTimer.secondsToTimeValue(remainingSecs);
    }

    start()
    {
        // Set the timer to active state
        this.timerState = true;

        // get the starting time (SSE)
        this.timerTarget = (gtaTimer.sSE() + this.timerLength);
        
    }
    reset()
    {
        // get a new Date() and add the timerLength to it
        this.timerTarget = (gtaTimer.sSE() + this.timerLength);
    }

    pause()
    {   
        // Get the pause button of this timer so we can alter the text
        var pause_button = document.getElementById(this.timerName + "PauseButton");
        // Timer is running, pause it. 
        if (this.timerState)
        {
            this.timerState = false;
            this.timerPausedValue = this.remaining();
            pause_button.value = "resume";
        }
        else // Timer is paused, resume it.
        {
            // Set new target
            this.timerTarget = (gtaTimer.sSE() + this.timerPausedValue);
            this.timerState = true;
            pause_button.value = "pause";
        }
    }

    remaining()
    {
        return (this.timerTarget - gtaTimer.sSE());
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

    // Return the number of seconds (not ms) from epoch
    static sSE()
    {
        return Math.floor(new Date() / 1000);
    }
}


// Purely testing 
function basic_tests()
{
    var p = new gtaTimer("carSale",0,2880);
    console.log("Value of the classed gta timer: " + p.timerLength);
    p.tick();
    p.timerState = true;
    p.tick();
    
    console.log("Time remaining: " + p.remaining());
    console.log("200 seconds = " + gtaTimer.secondsToTimeValue(200));
    
    var carSaleActive = false;
    var carSaleSeconds = 0;
}

var gtaTimers = [];

// 2 The main clock. Starts on page ready
function clockInit()
{   
    // Collect the timers somehow (from a file?) and add them to the gtaTimers array
    // For now, hardcode

    gtaTimers.push(new gtaTimer("carSale",2880));
    gtaTimers.push(new gtaTimer("session",6));

    // Start the clocks a tickin'!
    setInterval(clockTick,1000);
}

// 3 The ticking of the clock (things that run every second)
function clockTick()
{
    // Check the individual timers
    for(i = 0;i<gtaTimers.length;i++)
    {
        if (gtaTimers[i].timerState)
        {
            // Set the timer string
            gtaTimers[i].tick(gtaTimer.sSE());
            carSaleTimer.innerHTML = gtaTimer.secondsToTimeValue(gtaTimers[i].remaining());
        }
    }
}

// This function handles HTML button actions.
// Returns null if index not found
function timer_api(timerName,action)
{
    var index;
    // Find the index
    for (i = 0;i<gtaTimers.length;i++)
    {
        if (gtaTimers[i].timerName == timerName)
        {
            if(action == 'start')
            {
                gtaTimers[i].start();
                return;
            }
            else if(action == 'pause')
            {
                gtaTimers[i].pause();
                return;
            }
            else if(action == 'reset')
            {
                gtaTimers[i].reset();
                return;
            }
            else
            {
                console.log("Unknown action")
            }
        }
    }
    console.log("No timer with that name");
    return null;    
}

// 1 When the page is ready, hit GO!
document.addEventListener("DOMContentLoaded", function(){
    // Handler when the DOM is fully loaded
    carSaleTimer = document.getElementById("carSaleTimer");
    clockInit()
  });