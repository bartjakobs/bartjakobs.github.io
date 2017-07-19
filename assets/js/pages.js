(function () {
	var Page = {};
	var cache = {};

	Page.init = function(){
		if(window.location.hash == "" && window.location.href.substr(-1) == '/'){
			document.getElementsByClassName('main')[0].classList.add('animate');
		}
		var links = document.getElementsByTagName('a');
		Page._setLinks(links);
		Konami(function(){
			document.body.classList.add('secret')
		});
	};

	Page._setLinks = function(elements){
		var host = window.location.host;
		for (var i = 0; i < elements.length; i++) {
			var link = elements[i]
			if(link.href.indexOf(host) != -1){
				link.addEventListener('click', Page.linkClicked.bind(link.href));
			}
		}
	}

	Page.linkClicked = function(ev){
		var href = this
		ev.preventDefault();
		history.pushState({}, "", href);
		yolo.get(href, Page.loadContents);
		return false;
	};


	Page.loadContents = function(contents){
		Page._doEvent('load');
		var page = window.location.href;
		page = page.substr(page.lastIndexOf('/') + 1);
		if(page.trim() == '' || page == 'index.html'){
			document.getElementsByClassName('page')[0].classList.remove('active');
			document.title = 'Portfolio - Bart Jakobs'
			setTimeout(function(){
				document.getElementsByClassName('page')[0].classList.add('hidden');
			},500);
		}else{
			if(typeof contents == 'undefined'){
				if(typeof cache[page] != 'undefined'){
					contents = cache[page].contents;
					document.title = cache[page].title;
				}else{
					window.location.reload(); // Plan B.
				}
			}else{
				title = contents.substr(contents.indexOf('<title>') + "<title>".length);
				title = title.substr(0,title.indexOf('</title>'));
				contents = contents.substr(contents.indexOf('<article'));
				contents = contents.substr(contents.indexOf('>')+1);
				contents = contents.substr(0,contents.indexOf('</article>'));
			}
			document.getElementsByClassName('page')[0].classList.remove('hidden');
			setTimeout(function(){
				document.getElementsByClassName('page')[0].classList.add('active');
			}, 10)
			document.getElementsByClassName('page')[0].innerHTML = contents;
			var links = document.getElementsByClassName('page')[0].getElementsByTagName('a');
			Page._setLinks(links);
			document.title = title;
			cache[page] = {title: title, contents: contents};
			loadSliders();
		}
	}

	 Page.onPopState = function(ev){
		ev.preventDefault();
		Page.loadContents();
		return false;
	}
	Page.events = [];
	Page.addEventListener = function(ev,cb){
		Page.events.push({type: ev, cb: cb});
	}
	Page._doEvent = function(ev){
		Page.events.forEach(function(event){
			if(event.type == ev){
				event.cb();
			}
		})
	}
	window.addEventListener('load', Page.init);
	window.onpopstate = Page.onPopState;
	window.Page = Page;
})()

var yolo = {};

/**
 * Perform an AJAX GET request and call back
 * @param  {String}   url      the url to request
 * @param  {Function} callback method to call when the response is received.
 * @return {void}
 */
yolo.get = function(url, options){
	return yolo.ajax(url, 'GET', options);
};
/**
 * Perform an AJAX request
 * @param  {String} url     url to request
 * @param  {String} method  (uppercase) HTTP method
 * @param  {Object} options Object containing progress, error and abort listeners. Also headers, in options.headers.
 * @param  {Object} data    Data (FormData or String), when POSTing
 */
yolo.ajax = function(url, method, options, data){
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			if(typeof(options) == 'function'){
				options(xhr.responseText);
				// console.groupCollapsed("result for "+method+" "+url);
				// console.log(data);
				// console.log(xhr.responseText);
				// console.groupEnd();
			}
			if(typeof(options['done']) == 'function'){
				options['done'](xhr.responseText);
			}
		}
	};
	// set all listeners
	['progress', 'error', 'abort'].forEach(function(ev){
		if(typeof(options[ev]) == 'function')
			xhr.addEventListener(ev, options[ev], false);
	});
	//sending headers
	if('headers' in options){
		for (var key in options.headers){
			xhr.setRequestHeader(key, options.headers[key]);
		};
	}
	if(typeof options.data !== 'undefined')
		data = options.data;
	xhr.open(method, url, true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	xhr.send((typeof data !== 'undefined')?data:null);
};
