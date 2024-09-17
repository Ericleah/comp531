
'use strict';

var createApp = function(canvas) { 
	var c = canvas.getContext("2d");

	// Create the ground
	var floor = canvas.height/2;
	var grad = c.createLinearGradient(0,floor,0,canvas.height);
	grad.addColorStop(0, "green");
	grad.addColorStop(1, "black");
	c.fillStyle=grad;
	c.fillRect(0, floor, canvas.width, canvas.height);

	// common size for windows
	var windowSpacing = 2, floorSpacing = 3;
	var windowHeight = 5, windowWidth = 3;

	// colors of buildings
	var blgColors = [ 'red', 'blue', 'gray', 'orange'];
    // Create a sun
    var sun = {
        x: 0,
        y: 50,
        radius: 20,
        moveSpeed: 1
    };

    var drawSun = function() {
        c.fillStyle = "yellow";
        c.beginPath();
        c.arc(sun.x, sun.y, sun.radius, 0, Math.PI * 2, true);
        c.closePath();
        c.fill();

        // Move the sun across the sky
        sun.x += sun.moveSpeed;
        if (sun.x - sun.radius > canvas.width) {
            sun.x = -sun.radius; // Reset to the left side when it goes off screen
        }
    };

	// Build a building and store it in the buildings array
    var build = function() { 
        var x0 = Math.random() * canvas.width;
        var blgWidth = (windowWidth + windowSpacing) * Math.floor(Math.random() * 10);
        var blgHeight = Math.random() * canvas.height / 2;
        var color = blgColors[Math.floor(Math.random() * blgColors.length)];

        // Calculate the number of floors and columns of windows
        const dy = floorSpacing + windowHeight;
        const dx = windowSpacing + windowWidth;
        const floors = Math.floor(blgHeight / dy);
        const cols = Math.floor(blgWidth / dx) - 1;

        // Generate random light states for each window (true for on, false for off)
        var lightStates = [];
        for (let floor = 0; floor < floors; floor++) {
            let row = [];
            for (let col = 0; col < cols; col++) {
                row.push(Math.random() > 0.5);  // Randomly set each window to be lit or not
            }
            lightStates.push(row);
        }

        // Store building details in the buildings array, including light states
        buildings.push({
            x0: x0,
            width: blgWidth,
            height: blgHeight,
            color: color,
            lightStates: lightStates,
            floors: floors,
            cols: cols
        });
    };

    // Draw the buildings from the stored array
    var drawBuildings = function() {
        buildings.forEach(bld => {
            c.fillStyle = bld.color;
            c.fillRect(bld.x0, floor - bld.height, bld.width, bld.height);

            const dy = floorSpacing + windowHeight;
            const dx = windowSpacing + windowWidth;

            // Draw windows with stored light states
            for (let floor = 0; floor < bld.floors; floor++) {
                for (let col = 0; col < bld.cols; col++) {
                    c.fillStyle = bld.lightStates[floor][col] ? "yellow" : "black";  // Use stored light state
                    c.fillRect(bld.x0 + windowSpacing + col * dx, floor - bld.height + (floor + 1) * dy - windowHeight, windowWidth, windowHeight);
                }
            }
        });
    };

    var redraw = function() {
        // Clear the canvas
        c.clearRect(sun.x - sun.radius, 0, canvas.width, canvas.height);
        
        // Draw the sun
        drawSun();

        // Redraw the ground
        c.fillStyle = grad;
        c.fillRect(0, floor, canvas.width, canvas.height);

    };

    var animate = function() {
        redraw();
        requestAnimationFrame(animate);
    };


	return {
		build: build,
        animate:animate
	}
};



window.onload = function() {
	var app = createApp(document.querySelector("canvas"));
	document.getElementById("build").onclick = app.build;
    app.animate();
};


