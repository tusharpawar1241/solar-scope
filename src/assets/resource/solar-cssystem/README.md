# Solar CSSystem

A Pen created on CodePen.

Original URL: [https://codepen.io/robdimarzo/pen/LMOLer](https://codepen.io/robdimarzo/pen/LMOLer).

An educational demo that visualizes each planet's rotational period and orbital tilt. I tried to make the planets as photorealistic as possible with CSS only - no JavaScript or additional libraries were used. I used a single sass mixin that interpolates css custom variables of each planet.

I wrote a blog post that dissects the CSS responsible for styling the planets: https://codepen.io/robdimarzo/post/rebuilding-the-solar-system-with-css

Attribution (added 9/19/2019): Originally inspired by this video by Dr. James O'Donoghue: https://www.youtube.com/watch?v=MS8KA7Mayho


###Dev takeaways
- Animating a background-position by 200% will allow it to loop infinitely and seamlessly
- Before using CSS custom variables for the planet attributes, I attempted to use SCSS variables - however, I ran into some major roadblocks while interpolating them into the "planetization" mixin. Interpolation was not an issue with CSS custom variables.
- The atmospheric visual effects are a combination of inset and regular box-shadows that provide the dark-side shadow, day-side illumination, and slight atmospheric corona. 


###Fun planet info
- Wow Jupiter spins ridiculously fast considering how large it is.
- Venus spins very slowly AND in the opposite direction. Seriously, it barely moves in this demo.
- A day on Mercury is 2/3 of a year on Mercury

###Math stuff
The planet rotations in this demo are all moving at 36,000x their normal speed. The rotation speed takes 10% of each planet's day length and measures that value in seconds instead of hours. 

In the SCSS mixin, this happens as:    
animation: planetRotate calc(var(--#{$planet}-day)*.1s) linear infinite; 

The formula is:   
**planetDayLengthHours** x **.1** = **planetRotationSpeed**(seconds)

For example:     
Earth: 23.9 x .1 = **2.39 seconds**    
Jupiter: 9.9 x .1 = **.99 seconds**   
Venus: 5832.5 x .1 = **583.25 seconds**


To get 36,000, I calculate the amount of seconds in a planet's day and divide it by the rotation speed above:     
**(secPerMin x minPerHour x planetDayLengthHours) /  planetRotationSpeed = 36,000**    

Earth: (60 x 60 x 23.9) = 86,040 / 2.39 = 36,000    
Jupiter: (60 x 60 x 9.9) = 35,640 / .99 = 36,000    
Venus: (60 x 60 x 5832.5) = 20,997,00 / 583.25 = 36,000    


###Astronomical notes
- The day and year values in this demo are measured in Earth hours and Earth days
- All examples take place during each planet's winter solstice
- The Sun is spins at different speeds from its equator to its poles, so this depiction is approximate. 
- Pluto's image has some issues, but I wanted to include it because <3 Pluto.
- Reference: https://nssdc.gsfc.nasa.gov/planetary/factsheet/