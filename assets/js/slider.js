(function(w){
	var bigSlider = false;
	function loadSliders() {
		sliders = document.getElementsByClassName('slider');
		for(var i = 0; i < sliders.length; i++){
			var slider = sliders[i];
			loadSlider(slider);
		}
		Page.addEventListener('load', hide);
	}

	function loadSlider(elem, isBig){
		var slider = {elem: elem};
		var images = elem.getElementsByTagName('li');
		images[0].classList.add('active');
		slider.images = images;
		slider.length = images.length;
		slider.current = 0;
		var btnLeft = elem.getElementsByClassName('prev');
		if(btnLeft.length != 0){
			btnLeft = btnLeft[0];
			btnLeft.addEventListener('click', prevSlide.bind(slider));
		}
		var btnRight = elem.getElementsByClassName('next');
		if(btnRight.length != 0){
			btnRight = btnRight[0];
			btnRight.addEventListener('click', nextSlide.bind(slider)) //// nextSlide.bind
		}
		if(!isBig){
			var btnBig = elem.getElementsByClassName('big')[0];
			btnBig.addEventListener('click', big.bind(slider));
		}else{
			var btnBig = elem.getElementsByClassName('big')[0];
			btnBig.addEventListener('click', close.bind(slider));
			document.getElementsByClassName('bigslider')[0].addEventListener('click', (function(e){if(e.target == document.getElementsByClassName('bigslider')[0]) close.apply(this)}).bind(slider));
		}
		images[0].classList.add('active');

	}
	function clearSlide(){
		for (var i = 0; i < this.images.length; i++) {
			var element = this.images[i];
			element.classList.remove('leaving');
			element.classList.remove('active');
			element.classList.remove('arriving');
			element.classList.remove('previous');
			element.classList.add('hidden');
		}
	}
	function nextSlide(){
		clearSlide.apply(this);
		void this.images[this.current].offsetWidth;
		this.images[this.current].classList.add('leaving');
		this.images[this.current].classList.remove('hidden');
		this.current++;
		if(this.current >= this.length){
			this.current = 0;
		}
		this.images[this.current].classList.remove('hidden');
		this.images[this.current].classList.add('arriving');
	}
	function prevSlide(){
		clearSlide.apply(this);
		void this.images[this.current].offsetWidth;
		this.images[this.current].classList.add('arriving');
		this.images[this.current].classList.add('previous');
		this.images[this.current].classList.remove('hidden');
		this.current--;
		if(this.current < 0){
			this.current = this.length - 1;
		}
		this.images[this.current].classList.remove('hidden');
		this.images[this.current].classList.add('previous');
		this.images[this.current].classList.add('leaving');
	}
	function big(){
		var rect = this.elem.getBoundingClientRect();
		document.getElementsByClassName('bigslider')[0].innerHTML = this.elem.outerHTML;

		var newElem = document.getElementsByClassName('bigslider')[0].children[0];
		newElem.style.width = rect.width + "px";
		newElem.style.height = rect.height + "px";
		newElem.style.top = rect.top + "px";
		newElem.style.left = rect.left + "px";
		newElem.classList.add('big');
		var endWidth = window.innerWidth;
		if(endWidth > 900) endWidth = 900;
		var endHeight = endWidth / 16 * 9;
		var endLeft = window.innerWidth/2 - endWidth / 2;
		var endTop = window.innerHeight/2 - endHeight / 2;

		document.getElementsByClassName('bigslider')[0].classList.add('arriving');
		newElem.animate([
			{left: rect.left + "px",
  	        top : rect.top + "px",
  		    width: rect.width + "px",
  		    height: rect.height + "px"},
		  { left: rect.left + "px",
	        top : rect.top + "px",
		    width: rect.width + "px",
		    height: rect.height + "px"
		  },
		  { left: endLeft + "px",
	        top : endTop + "px",
		    width: endWidth + "px",
		    height: endHeight + "px"
		  }
		], {
		  // timing options
		  duration: 500,
		  easing: 'ease-in-out',
		  iterations: 1,
		});
		setTimeout(function(){
			newElem.style.left = endLeft + 'px';
			newElem.style.width = endWidth + 'px';
			newElem.style.height = endHeight + 'px';
			newElem.style.top = endTop + 'px';
		}, 500)
		loadSlider(newElem, true);
		bigSlider = newElem;
	}
	function hide(){
		if(bigSlider !== true){
			bigSlider.innerHTML = '';
			document.getElementsByClassName('bigslider')[0].classList.remove('arriving');

		}
	}
	function resize(){
		console.log("resize");
		if(bigSlider !== false){
			console.log(bigSlider)
			bigSlider.classList.remove('arriving');
			var endWidth = window.innerWidth;
			if(endWidth > 900) endWidth = 900;
			var endHeight = endWidth / 16 * 9;
			var endLeft = window.innerWidth/2 - endWidth / 2;
			var endTop = window.innerHeight/2 - endHeight / 2;
			bigSlider.style.left = endLeft + 'px';
			bigSlider.style.width = endWidth + 'px';
			bigSlider.style.height = endHeight + 'px';
			bigSlider.style.top = endTop + 'px';
		}
	}


	function close(){
		window.location.reload();
	}
	window.addEventListener('resize', resize, true)

	w.loadSliders = loadSliders;
})(window);
window.addEventListener('load', loadSliders);
