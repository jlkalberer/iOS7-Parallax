$(function() {
	var container = $(".parallax");
	var panel = $(".parallax .panel");//.hide();
	var width = panel.width(),
		maxX = width - container.width(),
		height = panel.height(),
		x = 0,
		y = 0,
		dist = 100,
		top = parseInt(panel.css("top")),
		left = parseInt(panel.css("left"));
	gyro.frequency = 50;
	
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
		xDelta = xDelta * Math.PI / 180;
		yDelta = yDelta * Math.PI / 180;
		
		var xpos = -Math.sin(xDelta) * dist,
			ypos = -Math.sin(yDelta) * dist;
		/*container.css({ 
			"background-position-x" : xpos,
			"background-position-y" : -y - yDelta * dist
		});*/
		
		//panel.css("transform","translateZ(-100px) translateX(" + xpos + "px) translateY(" + -Math.sin(yDelta) * dist + "px)");// rotateX("+(-yDelta)+"deg) rotateY("+(-xDelta)+"deg)");
		panel.css("transform","translate3d("+ xpos + "px," + ypos + "px, 100px)");

    });
});