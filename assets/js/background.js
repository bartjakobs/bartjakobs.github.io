/**
 * fun effect. I don't use it anymore
 */
window.addEventListener('load', function(){
	var COLOR = "#1c4de8";
	var canvas = document.getElementById('background');
	var ctx = canvas.getContext('2d');
	function resize(){
		var rect = canvas.getBoundingClientRect();
		canvas.width = rect.width * window.devicePixelRatio;
		canvas.height = rect.height * window.devicePixelRatio;
	}
	var tr =  1;
	function draw(){
		var n = 15;
		ctx.clear();
		ctx.fillStyle = COLOR;
		for(var cx = x - 200; cx < x + 200; cx++){
			for(var cy = y - 200; cy < y + 200; cy++){
				if(cy % n == 0){
					if(cx % (2*n) == cy % (2*n)){
						var r = 15-Math.sqrt(Math.pow(cx-x, 2) + Math.pow(cy-y,2))/10;
						r*=easeOutQuad(tr);
						if(r<0) continue;
						ctx.beginPath();
						ctx.arc(cx, cy, r, 0, Math.PI * 2, true);
						ctx.fill();
					}
				}
			}
		}
	}
	function fadeOut(){
		tr -= 0.02;
		if(tr <0.01){
			tr = 0;
			clearInterval(interval);
		}
		draw();
	}

	var interval = 0;
	resize();
	var x, y;
	canvas.addEventListener('mousemove', function mouseover(e){
		x = e.layerX * window.devicePixelRatio;
		y = e.layerY * window.devicePixelRatio;
		tr=1;
		draw();
		clearInterval(interval);
		interval = setInterval(fadeOut, 50);
	})

});
function easeOutQuad (t){ return 1-(--t)*t*t*t }
CanvasRenderingContext2D.prototype.clear = function clear() {
	this.clearRect(0, 0, this.canvas.width, this.canvas.height);
};
