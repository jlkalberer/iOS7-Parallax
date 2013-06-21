$(function() {
	var container = $(".parallax");
	var panel = $(".parallax .panel");
	var width = 1024,
		maxX = width - container.width(),
		height = 1200,
		x = width / 4,
		y = height / 4,
		dist = 75,
		top = parseInt(panel.css("top")),
		left = parseInt(panel.css("left"));
	gyro.frequency = 25;
	
	gyro.startTracking(function(o) {
        // o.x, o.y, o.z for accelerometer
        // o.alpha, o.beta, o.gamma for gyro
		
		var xDelta, yDelta;
		switch (window.orientation) {
			case 0:
				xDelta = o.gamma;
				yDelta = o.beta;
				break;
			case 180:
				xDelta = o.gamma * -1;
				yDelta = o.beta * -1;
				break;
			case 90:
				xDelta = o.beta;
				yDelta = o.gamma * -1;
				break;
			case -90:
				xDelta = o.beta * -1;
				yDelta = o.gamma;
				break;
			default:
				xDelta = o.gamma;
				yDelta = o.beta;
				break;
		}
		$("#x").html(xDelta);
		$("#y").html(yDelta);
		$("#z").html(o.alpha);
		
		xDelta = xDelta * Math.PI / 180;
		yDelta = yDelta * Math.PI / 180;
		
		if (yDelta > 87) { return; }
		
		var xpos = Math.max(-x - xDelta * dist, -maxX);
		container.css({ 
			"background-position-x" : xpos,
			"background-position-y" : -y - yDelta * dist
		});
		panel.css({
			"background-position-x" : xpos - top,
			"background-position-y" : -y - yDelta * dist - top
		});
    });
});