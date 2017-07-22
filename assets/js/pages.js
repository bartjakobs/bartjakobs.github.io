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
			if(link.href.indexOf(host) != -1 && !link.classList.contains('nolink')){
				link.addEventListener('click', Page.linkClicked.bind(link.href));
			}
		}
	}

	Page.linkClicked = function(ev){
		var href = this
		ev.preventDefault();
		history.pushState({}, "", href);
		ajax.get(href, Page.loadContents);
		return false;
	};


	Page.loadContents = function(contents){
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
		Page._doEvent('load');
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
})();

var ajax={get:function(c,d){return ajax._request(c,"GET",d)},_request:function(c,d,a,e){var b=new XMLHttpRequest;b.onreadystatechange=function(){4==b.readyState&&("function"==typeof a&&a(b.responseText),"function"==typeof a.done&&a.done(b.responseText))};["progress","error","abort"].forEach(function(c){"function"==typeof a[c]&&b.addEventListener(c,a[c],!1)});if("headers"in a)for(var f in a.headers)b.setRequestHeader(f,a.headers[f]);"undefined"!==typeof a.data&&(e=a.data);b.open(d,c,!0);b.setRequestHeader("Content-type",
"application/x-www-form-urlencoded");b.send("undefined"!==typeof e?e:null)}};
