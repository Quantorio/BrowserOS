window.Container.init=function(){
	let init=false, dummy=()=>{throw new Error("Containers not initialized")},checkPerm=dummy,createWindow=dummy, xmlRequest,
		notAllowedKeysToAccess=["permissions","name","icon","pos","start","stop"];
	const Container=function(ProgramIndex){
		var a=open("");
		a.close();
		Container.confPerm(a,ProgramIndex);
		return a;
	};
	
	Container.confPerm(window, ProgramIndex){
		const t=window,
			i=ProgramIndex,
			p=window.programs[i];
		t.icon=p.icon||"";
		t.pos=p.pos||"";
		t.createWindow=()=>{if(a===undefined)a=createWindow(p,p["name"],"",null,null,p['icon']||undefined);};
		t.require=(function(){var list=["fs"];var o=window.require;return function(){if(list.indexOf(arguments[0])>-1){if(checkPerm(i,arguments[0]))return o(arguments[0]);throw Error("Not Allowed");}return o(arguments[0]);}})();
		t.$={...$};
		t.$.ajax=(function(){var o=window.$.ajax;return function(...m){console.log(m);if(!checkPerm(i,"Local Network")||m===[])return ajaxdefault;return o(...m)}})();
		t.fetch=(function(){var o=window.fetch;return function(...m){if(!checkPerm(i,"Local Network")||m===[])return new Promise(_=>_);return o(...m)}})();
		t.alert=(function(){var o=window.alert;return function(m){if(!checkPerm(i,"notify")||!m)return;o(m)}})();
		t.XMLHttpRequest=(function(){var o=window.XMLHttpRequest;return function(){if(!checkPerm(i,"Local Network"))return xmlRequest;return new o;}})();
		t.Notification=(function(){var o=window.Notification;return (message)=>{if(!checkPerm(i, "notify"))return;var t=document.getElementsByTagName("link");var img="";for(var i=0;t.length;i++){if(t[i].rel.toLowerCase()==="shortcut icon")img=t[i].href}var text = message;var notification = new o(`${document.title} - ${programs[i].name}`, { body: text, icon: img });return {close:_=>notification.close(),on:(e,a,o)=>notification.addEventListener(e,a,o),}}})();
		t.programs=("Apps" in p.permissions && p.permissions["Apps"])?window.programs:[];
		t.console=window.console;
		t.window=t;
		for(var ii of Object.keys(p))if(notAllowedKeysToAccess.indexOf(ii)==-1)t[ii]=p[ii];
	}
	
	Container.parseCSS=function(rules, className) {
	  var classLen = className.length,
	    char, nextChar, isAt, isIn;
	
	  // makes sure the className will not concatenate the selector
	  className += ' ';
	
	  // removes comments
	  rules = rules.replace( /\/\*(?:(?!\*\/)[\s\S])*\*\/|[\r\n\t]+/g, '' );
	
	  // makes sure nextChar will not target a space
	  rules = rules.replace( /}(\s*)@/g, '}@' );
	  rules = rules.replace( /}(\s*)}/g, '}}' );
	
	  for (var i = 0; i < rules.length-2; i++) {
	    char = rules[i];
	    nextChar = rules[i+1];
	
	    if (char === '@' && nextChar !== 'f') isAt = true;
	    if (!isAt && char === '{') isIn = true;
	    if (isIn && char === '}') isIn = false;
	
	    if (
	      !isIn &&
	      nextChar !== '@' &&
	      nextChar !== '}' &&
	      (
	        char === '}' ||
	        char === ',' ||
	        ((char === '{' || char === ';') && isAt)
	      )
	    ) {
	      rules = rules.slice(0, i+1) + className + rules.slice(i+1);
	      i += classLen;
	      isAt = false;
	    }
	  };
	
	  // prefix the first select if it is not `@media` and if it is not yet prefixed
	  if (rules.indexOf(className) !== 0 && rules.indexOf('@') !== 0) rules = className+rules;
	
	  return rules;
	};
	
	//V2
	
	/*const Container=function container() {
		var o = (function (location, navigator) {
			const window = {
					location: location,
					navigator: navigator
				},
				self = window,
				top = window,
				parent = window,
				frames = window;
			window.window = window;
			window.frames = frames;
			window.self = self;
			window.top = top;
			window.parent = parent;
			window.start = (async _ => {
				console.log(window.o)
			});
			return window
		}).apply({}, [(() => {
			var a = {};
			for (const i of ["href", "port", "protocol", "hash", "host", "hostname", "origin", "pathname"]) {
				a[i] = window.location[i] + "";
			}
			return a;
		})(), (() => {
			var a = {};
			for (const i of ["appCodeName", "appName", "appVersion", "language", "vendorSub", "vendor", "languages", "onLine", "pdfViewerEnabled", "platform", "product", "productSub", "userAgent", "userAgentData"]) {
				a[i] = navigator[i]
			}
			return a;
		})()]);
		return o
	}*/
	
	// V1
	
	/*
	class Container{
		#container
		constructor(id){
			const s=this
			s.#container=open("/");
			s.#container=s.#container.window
			const c=s.#container;
			s.#container.close();
			s.exec = function exec(code)
			{
				var f=new c.Function(code)
				return f()
			}
			s.addToContainer=(e={})=>{if(e.constructor.prototype.isPrototypeOf(Array) || !e.constructor.prototype.isPrototypeOf(Object))return;for(const i in e){s.#container[i]=e[i]}}
		}
	}
	
	class ProgramContainer{
		constructor(id,w){
			const self=this;
			var j = new OSRef(id);
			var container = new Container(id);
			Object.freeze(j)
			container.addToContainer({os:j})
			//self.__
			for(const i in w.programs[id]){
				if (typeof w.programs[id][i] === "function") {
					const f=w.programs[id][i].toString();
					self[i]=(...args)=>{container.exec(`window.${i}=${f}`)}
				}
			}
			container.addToContainer({console:console});
			self.addToContainer=container.addToContainer;
		}
	}
	
	class OSRef{
		#id
		constructor(id){
			const self=this
			self.#id=id
		}
	}
	export {ProgramContainer}
	*/
	return function(checkPermFn,createWindowFn,xmlRequestObj){
		if(init)return;
		checkPerm=checkPermFn;
		createWindow=createWindowFn;
		xmlRequest=xmlRequestObj
		init=true;
	}
}()
