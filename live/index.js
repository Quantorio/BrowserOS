(function(){
if(location.protocol!=="https:")location.protocol="https:";

//(async function(){return await import(location.pathname+"container.js");})().then(e=>{const {ProgramContainer}=e;Container=ProgramContainer})

const utils=require("utils");

var shutdown=(function(){

var intervals=[];
var timeouts=[];

function removeItemOnce(arr, value) {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}
setInterval=(function(){var o=setInterval;return function(...a){a=o.apply(null,a);intervals.push(a);return a;}})();
setTimeout=(function(){var o=setTimeout;return function(...a){a=o.apply(null,a);timeouts.push(a);return a;}})();
clearInterval=(function(){var o=clearInterval;return function(a){removeItemOnce(intervals,a);a=o(a);return a;}})();
clearTimeout=(function(){var o=clearTimeout;return function(a){removeItemOnce(timeouts,a);a=o(a);return a;}})();
function shutdown(){
	for(var i in containers){delete containers[i];console.log(`cleared Container ${i}`);}
	for(var i of intervals){clearInterval(i);console.log(`cleared Interval ${i}`);}
	for(var i of timeouts){clearTimeout(i);console.log(`cleared Timeout ${i}`);}
	window.document.body.innerHTML="<h1 style='mix-blend-mode: difference;color: white;'>Powered Off</h1>";
	window.document.head.innerHTML="";
}
return shutdown;
})();

window.shutdown=()=>shutdown();

window.allPerm=["notify","Local Network","fs","Apps"]
containers=Array(window.programs.length);
  var ev1=detectMob()?'touchstart':'mousedown',
      ev2=detectMob()?'touchmove':'mousemove',
      ev3=detectMob()?'touchend':'mouseup'
    var sheet = (function() {var style = document.createElement("style");style.appendChild(document.createTextNode(""));document.head.appendChild(style);return style.sheet;})();
    function detectMob() {
    return ( ( window.innerWidth <= 600 ) && ( window.innerHeight <= 800 ) );
  }
  var dt=document.querySelector('.desktop');
  var tb=document.querySelector('.taskbar');
  
    if(detectMob()){dt.className='desktop-m';tb.className='taskbar-m'}else{
		var tl=dt.appendChild(document.createElement('table'))
		fetch("dt.json").then(e=>e.json()).then(json=>{for(var i=0;i<10;i++){var tr=tl.appendChild(document.createElement('tr'));for(var o=0;o<10;o++){var td=tr.appendChild(document.createElement('td'));td.id=i*10+o;td.className='dt-icon';$(td).append($(`<div style="display: block;margin-left: auto;margin-right: auto;width:16px;height:16px;background-image:${json[i+o*10].img};background-position:${json[i+o*10].pos};"></div><h5 style="color:wheat;">${json[i+o*10].name}</h5>`));const app=json[i+o*10].app;$(td).on("dblclick",_=>{if(!containers.hasOwnProperty(app))return alert("SystemError: Not initialized");containers[app].w.eval("window.start()");})}}})
    }
    window.createWindow=(me,name,content,w,h,icon)=>{
	  icon=icon||["url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=);",""];content=content||"";
	  var elem=new WinBox({
		  title:name,
		  html:content,
		  width:w,
		  height:h,
		  class:"modern"
	  });
	  if($(".taskbar").html().indexOf(`<div type="button" class="ui-button" title="${name}">`)===-1){
		  $(".taskbar").append(`<div type="button" class="ui-button" title="${name}"><div class="ui-icon-home ui-icon" style="background-image:${icon[0].replaceAll("\"","'")};background-position:${icon[1]}"></div></div>`)
		  $(".taskbar").children().last().on("click",_=>(me.start||new Function())())
		  if(me.shattr){
			  for(var i of me.shattr){
				  $(".taskbar").children().last().append(`<attr data-value="${i}"></attr>`)
			  }			  
		  }
	  }
	  window.x=elem
	  elem.onclose=(e)=>{((me.stop||function a(){}).call(this));}
	  return [$(elem.body),elem];
    }

window.startmenu = (e) => {
    $(document.body).append(`<div class="startmenu"></div>`);
    var elem = $(".startmenu");
    var g = (e) => {
		var o = document.querySelector(".startmenu").children;
		if(e.target.hasAttribute("shutdown") || e.target.parentElement.hasAttribute("shutdown"))return fetch("/shutdown",{headers:{'Authorization':prompt("Password?")}});
		for (var i = 0; i < o.length; i++) {
			if (e.target.isSameNode(o[i]) || e.target.parentElement.isSameNode(o[i])){if(!containers.hasOwnProperty(i))return alert("SystemError: Not initialized");containers[i].w.eval("window.start()");}
		}
		window.o=e.target;
        if (e.target.className !== "startmenu") elem.remove(), $(document.body).off("mousedown", g);
    };
    $(document.body).on("mousedown", g);
    elem.on("mouseover", () => {});
    programs.forEach((e) => {
        var temp = $("<div></div>").css("background-image", e.icon).css("background-position", e.pos).css({
            width: "16px",
            height: "16px",
            float: "right"
        });
        elem.append($(`<div style="height: 20px;"><span style="float:left;">${e.name}</span></div>`).last().append(temp));
    });
	elem.append("<br>");
	elem.append(`<div style="height: 20px;" shutdown><span style="float:left;">Shutdown</span></div>`);
}
window.prop = (e) => {
    $(document.body).append(`<div class="property"></div>`);
    var elem = $(".property");
	for(var i=0;i<programs.length;i++){if(programs[i].name===$(e.target).parent().attr("title")||programs[i].name===$(e.target).attr("title"))elem.data("id",i);}
    var g = (e) => {
		var o = document.querySelector(".property").children;
		for (var i = 0; i < o.length; i++) {
			if (e.target.isSameNode(o[i]) || e.target.parentElement.isSameNode(o[i])){if(!containers.hasOwnProperty(i))return alert("SystemError: Not initialized");containers[i].w.eval(`window.start("${$(e.target).text()||$(e.target).parent().text()}")`);}
		}
		window.o=e.target;
        if (e.target.className !== "property") elem.remove(), $(document.body).off("mousedown", g);
    };
    $(document.body).on("mousedown", g);
    elem.on("mouseover", () => {});
	attr=""
	if($(e.target).children("attr").length)attr=$(e.target).children("attr")
	if($(e.target).parent().children("attr").length)attr=$(e.target).parent().children("attr")
    if(attr!="")attr.each(function(e){
        var temp = $("<div></div>").css("background-image", e.icon).css("background-position", e.pos).css({
            width: "16px",
            height: "16px",
            float: "right"
        });
        elem.append($(`<div style="height: 20px;"><span style="float:left;">${$(this).data("value")}</span></div>`).last().append(temp));
    });
}

if(typeof($)==="function")$(".taskbar").on("contextmenu",e=>(e.preventDefault(),prop(e)));

(function(){
	var win;
var [l_x,l_y,down]=[0,0,null];
document.addEventListener("mousemove",(e)=>{
	e.preventDefault();
	var [x,y]=[e.clientX,e.clientY];
	if(down){
		if(x<l_x && down[1].indexOf("w")>-1)$(down[0]).offset({left:x}),$(down[0]).width(l_w+(l_x-x));
		if(y<l_y && down[1].indexOf("n")>-1)$(down[0]).offset({top:y}),$(down[0]).height(l_h+(l_y-y));
		if(x>l_x && down[1].indexOf("w")>-1)$(down[0]).offset({left:Math.min(x,l_x+l_w-200)}),$(down[0]).width(Math.max(l_w+(l_x-x),200));
		if(y>l_y && down[1].indexOf("n")>-1)$(down[0]).offset({top:Math.min(y,l_y+l_h-200)}),$(down[0]).height(Math.max(l_h+(l_y-y),200));
		
		if(x<l_x && down[1].indexOf("e")>-1)$(down[0]).width(Math.max(200,(x-$(down).offset().left)));
		if(y<l_y && down[1].indexOf("s")>-1)$(down[0]).height(Math.max(200,(y-$(down).offset().top)));
		if(x>l_x && down[1].indexOf("e")>-1)$(down[0]).width(x-$(down).offset().left);
		if(y>l_y && down[1].indexOf("s")>-1)$(down[0]).height(y-$(down).offset().top);
		return;
	}
	win=null;
	for (var i = 0; i < reg.length; i++) {
		if(reg[i].parentElement!==null){
		el = reg[i];
		t = $(el).offset();
		var r="";
		if (x >= t.left-5 && x <= t.left + $(el).width()+15 && y + 5 >= t.top && y + 5 <= t.top + 5) r += "n";
		if (x <= t.left + $(el).width()+15 && x >= t.left-5 && y>=t.top+$(el).height()+5 && y <=t.top+$(el).height()+15) r+="s"
		if (x + 5 >= t.left && x + 5 <= t.left + 5 && y >= t.top-5 && y-15 <= t.top + $(el).height()) r += "w";
		if (x <= t.left + $(el).width()+15 && x >= t.left+$(el).width()+5 && y >= t.top-5 && y-15 <= t.top + $(el).height()) r+="e"
		if(r!=="")win=el;
		document.body.style.cursor = r===""?"":r+"-resize";}
	}
})
document.addEventListener("mousedown",(e)=>{
	e.preventDefault();
	if(win)down=[win,document.body.style.cursor.split("-")[0]],[l_x,l_y,l_w,l_h]=[e.clientX,e.clientY,$(win).width(),$(win).height()];
})
document.addEventListener("mouseup",(e)=>{
	e.preventDefault();
	down=null;
})
var reg= new Array();
Element.prototype.resizeable=function(){return reg.push(this);}
Element.prototype.unresizeable=function(){return reg.forEach(e=>e=(e===this)?null:e);}
})();

function formatted_date(e)
{
   var result="";
   var d = new Date(e);
   result += d.getFullYear()+"/"+utils.pz(d.getMonth()+1)+"/"+utils.pz(d.getDate()) + 
             " "+ utils.pz(d.getHours())+":"+utils.pz(d.getMinutes())+":"+
             utils.pz(d.getSeconds());
   return result;
}

const checkPerm=(function(){
	var noMoreAsking={};
	function checkPerm(i,p){
		if(window.allPerm.indexOf(p)===-1)return;
		if(typeof i==="object")i=programs.indexOf(i);
		if(!!noMoreAsking[i]&&noMoreAsking[i][p])return;
		if(!programs[i].permissions[p]){
			var a=confirm("Permission Request",`Do you want to give "${programs[i].name}" the permission ${p}?`,{additional:"Not ask again"});
			programs[i].permissions[p]=a===1?true:false;
			if(!a && !confirm("Ask again?"))noMoreAsking[i][p]=true;
		}
		return programs[i].permissions[p]
	}
	return checkPerm;
})();

var clock="";
var cInt=setInterval(_=>{clock+=1000;if(isNaN(clock))clock=Date.now();$(".clock").html(formatted_date(clock));$.ajax({"url":"/up"}).success(_).error(_=>{})},1000)
$.ajax({url:"/clock"}).success(e=>$(".clock").html(formatted_date(clock=parseInt(e)))).error(_=>{clock=Date.now();})

for(var i=0;i<programs.length;i++){
	for(const b in programs[i].permissions){
		programs[i].permissions[b]=false;
	}
}

window.FileExplorer=function(e="/"){
	if (!window.fsready) return;
	const debug=false;
	const [a,hwindow]=createWindow(0,"FileExplorer");
	const r=require("resources");
	const fs=require("fs");
	const path=require("rpath");
	function rdir(e="/"){
		var content=[];
		for(const i of fs.readdirSync(e)){
			try{
				fs.readdirSync(path.join(e,i))
			}
			catch(_){
				if(debug)console.log("file",i);
				content.push([1,i]);
				continue;
			}
			if(debug)console.log("dir",i);
			content.push([0,i]);
		}
		return content;
	}
	var content=rdir(e);
	a.parent().append(`<style>
.FEleft {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
}
.FEleft div {
  display: flex;
  align-items: center;
}
.FESelected {
	background-color: rgba(2, 2, 255, 0.13);
	color: white;
	border: #00f3 solid 0.1pt;
}
.FESelected>img {
	opacity:0.75;
}
</style>`);
	function bg(content){
		a.html("");
		var c="<div><img src=\"./resources/folder-up-32x32.png\"><label>..</label></div>";
		for(var i=0;i<content.length;i++){
			c+=`<div><img src="${"./resources/"+["folder-32x32.png","notepad-file-32x32.png"][content[i][0]]}"><label>${content[i][1]}</label></div>`;
		}
		c="<div class='FEleft'>"+c+"</div>";
		a.append(c);
		a.children().last().children().each(function(){
			const d=this;
			$(this).on("click",function(evt){if(evt.shiftKey)$(this).toggleClass("FESelected");})
			$(this).on("click",function(evt){if(!evt.shiftKey)[$(".FESelected").each(function(){$(this).removeClass("FESelected")}),$(this).toggleClass("FESelected")];})
			$(this).on("dblclick",function(evt){if(["folder-32x32.png","folder-up-32x32.png","notepad-file-32x32.png"].indexOf($(d.firstChild).attr("src").replace("./resources/",""))<=1){e=path.join(e,this.innerText);if(debug)console.log(e);bg(rdir(e));}})
			$(this).on("dblclick",function(evt){if(["folder-32x32.png","notepad-file-32x32.png"].indexOf($(d.firstChild).attr("src").replace("./resources/",""))===1){openFile(path.join(e,this.innerText));}})
		});
	}
	bg(content);
}

openFile=function(e){
	var ext=e.split(".").at(-1);
	if(window.config.openwith[ext]){containers[window.config.openwith[ext]].w.shargs=e;containers[window.config.openwith[ext]].w.start();delete containers[window.config.openwith[ext]].w.shargs;return;}
	//Program Chooser
}

window.addEventListener("FSReady",function(){
	var config=(async function(){
	var ini=require("ini");
	var fs=require("fs");
	var config=fs.readFileSync("/mnt/esp/config.ini","utf-8");
	fs.writeFileSync("/home/config.ini",config);
	config=ini.parse(config);
	for(const i in programs){
		try{for(const o of config.permissions[i].split(",")){
			if(allPerm.indexOf(o)===-1)continue;
			programs[i].permissions[o]=true;
		}}catch(_){}
	}
	window.config=config;
})();
});

(function(){
	var startContainers=function(){
		var [hwnd,hwindow]=createWindow({start:function(){startContainers();}},"Start Containers");
		hwnd.append(`<p>Start all Containers you need.<br>A program cannot be used until the container is initialized.</p>`);
		ajaxdefault={"readyState":0,"statusText":"Not Allowed","status":0}
		for(var i of ["getResponseHeader","getAllResponseHeaders","setRequestHeader","overrideMimeType","statusCode","abort","state","always","then","promise","pipe","done","fail","progress","complete","success","error"]){
			ajaxdefault[i]=()=>{};
		}
		Object.freeze(ajaxdefault);
		var xmlRequest={"readyState":0,"statusText":"Not Allowed","status":0,"withCredentials":false};
		for(var i of ["UNSENT","OPENED","HEADERS_RECEIVED","LOADING","DONE","timeout","upload",,"response","responseText","responseXML","responseURL","responseType","onreadystatechange"]){xmlRequest[i]=null;}
		for(var i of ["open","setRequestHeader","send","abort","getResponseHeader","getAllResponseHeaders","overrideMimeType","mozAnon","mozSystem"]){
			xmlRequest[i]=()=>{};
		}
		Object.freeze(xmlRequest);
		activatedBUtton=(hwnd,i,p,containers,after)=>{
			const button=$("<button>");
			button.html(`Deinitialize "${p.name}"`);
			button.attr("disabled",true);
			button.on("click",()=>{
				//if(containers[i].hwnd!==undefined)
			})
			if(after!==0)return after.after(button);
			hwnd.append(button)
		}
		for(const i in window.programs){
			hwnd.append("<br>");
			const p=window.programs[i];
			if(window.containers[i]!==undefined){
				activatedBUtton(hwnd,i,p,containers,0);
				continue;
			};
			const button=$("<button>");
			var a;
			button.html(`Initialize "${p.name}"`);
			button.on("click",()=>{
				var t=Container();
				if(t===null)return;
				t.eval(`window.start=${_.toSrc((p.start||new Function()))}`)
				if(_.toSrc((p.start||new Function())).indexOf("window")>-1)throw new Error("window keyword currently not allowed due security risk");
				if(_.toSrc((p.start||new Function())).indexOf("parent")>-1)throw new Error("parent keyword currently not allowed due security risk");
				t.eval(`window.stop=${_.toSrc((p.stop||new Function()))}`)
				if(_.toSrc((p.stop||new Function())).indexOf("window")>-1)throw new Error("window keyword currently not allowed due security risk");
				if(_.toSrc((p.stop||new Function())).indexOf("parent")>-1)throw new Error("parent keyword currently not allowed due security risk");
				/*t.start=(p.start||new Function()).bind(t);
				t.stop=(p.stop||new Function()).bind(t);*/
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
				for(var ii of Object.keys(p)){if(ii!=="permissions")t[ii]=p[ii]}
				
				const obs=new MutationObserver(()=>containerToWindow());
				obs.observe(t.document,{ attributes: true, childList: true, subtree: true });
				
				window.containers[i]={w:t,icon:p.icon,pos:p.pos,name:p.name,permissions:p.permissions,hwnd:a, observer:obs};
				activatedBUtton(hwnd,i,p,containers,button);
				button.remove();
			});
			hwnd.append(button)
		}
	}
	startContainers();
})();

async function containerToWindow(){
	for(var i in window.containers){
		if(!window.containers[i]["hwnd"])continue;
		var a=window.containers[i];
		var hwnd=a.hwnd;
		var c=a.w;
		var h=utils.rc(16);
		var rs=[];
		for(var o of document.querySelectorAll("link[rel=stylesheet]"))
			rs.push(Contaner.parseCss((await fetch(o.href)).text(),` .${h}`));
		for(var o of c.document.querySelectorAll("style"))
			rs.push(Contaner.parseCss(a.innerText,` .${h}`));
		var d=document.createElement("div");
		d.classList=[h];
		d.setAttribute("data-role","html");
		d.appendChild(document.createElement("div"));
		d.firstChild.setAttribute("data-role","body");
		d.firstChild.appendChild(c.document.body.cloneNode(true));
		var d=c.document.body
	}
}

window.requestAnimationFrame
window.addEventListener("DOMContentLoaded",()=>{Notification.requestPermission().then(function(result) {console.log(result);});})
})();
