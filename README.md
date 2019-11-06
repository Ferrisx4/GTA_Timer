# GTA Timer

## Description
This little bit of HTML and JS makes a few different timers available for players of Rockstar Games' _GTA Online_. Certain time-based events occur periodically and these can be configured here. 

## Inner workings
Currently, the timers are pre-configured but perhaps in the future they can be customizable.

Cookies are used to store the timer data in case the browser window closes. 

The Javascript timer function is used only to regularly check against a clock difference, not to count the time by itself. 