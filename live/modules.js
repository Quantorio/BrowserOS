(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {
	var modules={
		help:(function(){var help={};var a=function(e){return (e.hasOwnProperty("__help__")?e["__help__"]:(help.hasOwnProperty(e)?help[e]:""));}})(),
		modules:(function(){return Object.keys(modules);})
	}
	var require=function(e){
		if(typeof e!=="string")throw TypeError(`The "id" argument must be of type string. Received an instance of ${(typeof e)[0].toUpperCase()+(typeof e).slice(1)}`);
		var a=modules[e]
		if(a===undefined)throw new Error(`Cannot find module '${e}'`);
		return a();
	}
	require.add=(a,e)=>{
		if(!modules[a])modules[a]=e;
	}
	require.add("ini",(function(){const{hasOwnProperty:hasOwnProperty}=Object.prototype,eol="undefined"!=typeof process&&"win32"===process.platform?"\r\n":"\n",encode=(e,t)=>{const o=[];let s="";"string"==typeof t?t={section:t,whitespace:!1}:(t=t||Object.create(null)).whitespace=!0===t.whitespace;const n=t.whitespace?" = ":"=";for(const t of Object.keys(e)){const c=e[t];if(c&&Array.isArray(c))for(const e of c)s+=safe(t+"[]")+n+safe(e)+eol;else c&&"object"==typeof c?o.push(t):s+=safe(t)+n+safe(c)+eol}t.section&&s.length&&(s="["+safe(t.section)+"]"+eol+s);for(const n of o){const o=dotSplit(n).join("\\."),c=(t.section?t.section+".":"")+o,{whitespace:r}=t,i=encode(e[n],{section:c,whitespace:r});s.length&&i.length&&(s+=eol),s+=i}return s},dotSplit=e=>e.replace(/\1/g,"LITERAL\\1LITERAL").replace(/\\\./g,"").split(/\./).map((e=>e.replace(/\1/g,"\\.").replace(/\2LITERAL\\1LITERAL\2/g,""))),decode=e=>{const t=Object.create(null);let o=t,s=null;const n=/^\[([^\]]*)\]$|^([^=]+)(=(.*))?$/i,c=e.split(/[\r\n]+/g);for(const e of c){if(!e||e.match(/^\s*[;#]/))continue;const c=e.match(n);if(!c)continue;if(void 0!==c[1]){if(s=unsafe(c[1]),"__proto__"===s){o=Object.create(null);continue}o=t[s]=t[s]||Object.create(null);continue}const r=unsafe(c[2]),i=r.length>2&&"[]"===r.slice(-2),a=i?r.slice(0,-2):r;if("__proto__"===a)continue;const l=!c[3]||unsafe(c[4]),f="true"===l||"false"===l||"null"===l?JSON.parse(l):l;i&&(hasOwnProperty.call(o,a)?Array.isArray(o[a])||(o[a]=[o[a]]):o[a]=[]),Array.isArray(o[a])?o[a].push(f):o[a]=f}const r=[];for(const e of Object.keys(t)){if(!hasOwnProperty.call(t,e)||"object"!=typeof t[e]||Array.isArray(t[e]))continue;const s=dotSplit(e);o=t;const n=s.pop(),c=n.replace(/\\\./g,".");for(const e of s)"__proto__"!==e&&(hasOwnProperty.call(o,e)&&"object"==typeof o[e]||(o[e]=Object.create(null)),o=o[e]);o===t&&c===n||(o[c]=t[e],r.push(e))}for(const e of r)delete t[e];return t},isQuoted=e=>e.startsWith('"')&&e.endsWith('"')||e.startsWith("'")&&e.endsWith("'"),safe=e=>"string"!=typeof e||e.match(/[=\r\n]/)||e.match(/^\[/)||e.length>1&&isQuoted(e)||e!==e.trim()?JSON.stringify(e):e.split(";").join("\\;").split("#").join("\\#"),unsafe=(e,t)=>{if(e=(e||"").trim(),!isQuoted(e)){let t=!1,o="";for(let s=0,n=e.length;s<n;s++){const n=e.charAt(s);if(t)-1!=="\\;#".indexOf(n)?o+=n:o+="\\"+n,t=!1;else{if(-1!==";#".indexOf(n))break;"\\"===n?t=!0:o+=n}}return t&&(o+="\\"),o.trim()}"'"===e.charAt(0)&&(e=e.slice(1,-1));try{e=JSON.parse(e)}catch(e){}return e};return{parse:decode,decode:decode,stringify:encode,encode:encode,safe:safe,unsafe:unsafe}}));
	require.add("resources",(function(){return {imgURL:function(img){return "resources/"+img;}};}));
	require.add("constants",function(){return{CHAR_UPPERCASE_A:65,CHAR_LOWERCASE_A:97,CHAR_UPPERCASE_Z:90,CHAR_LOWERCASE_Z:122,CHAR_UPPERCASE_C:67,CHAR_LOWERCASE_B:98,CHAR_LOWERCASE_E:101,CHAR_LOWERCASE_N:110,CHAR_DOT:46,CHAR_FORWARD_SLASH:47,CHAR_BACKWARD_SLASH:92,CHAR_VERTICAL_LINE:124,CHAR_COLON:58,CHAR_QUESTION_MARK:63,CHAR_UNDERSCORE:95,CHAR_LINE_FEED:10,CHAR_CARRIAGE_RETURN:13,CHAR_TAB:9,CHAR_FORM_FEED:12,CHAR_EXCLAMATION_MARK:33,CHAR_HASH:35,CHAR_SPACE:32,CHAR_NO_BREAK_SPACE:160,CHAR_ZERO_WIDTH_NOBREAK_SPACE:65279,CHAR_LEFT_SQUARE_BRACKET:91,CHAR_RIGHT_SQUARE_BRACKET:93,CHAR_LEFT_ANGLE_BRACKET:60,CHAR_RIGHT_ANGLE_BRACKET:62,CHAR_LEFT_CURLY_BRACKET:123,CHAR_RIGHT_CURLY_BRACKET:125,CHAR_HYPHEN_MINUS:45,CHAR_PLUS:43,CHAR_DOUBLE_QUOTE:34,CHAR_SINGLE_QUOTE:39,CHAR_PERCENT:37,CHAR_SEMICOLON:59,CHAR_CIRCUMFLEX_ACCENT:94,CHAR_GRAVE_ACCENT:96,CHAR_AT:64,CHAR_AMPERSAND:38,CHAR_EQUAL:61,CHAR_0:48,CHAR_9:57,EOL:'\n'}});
	require.add("validators",(function(){class ERR_INVALID_ARG_TYPE extends TypeError{constructor(name,actual){super(`The "${ name }" argument must be one of type string or an instance `+`of URL. Received type ${ typeof actual } ${ actual }`);this.code='ERR_INVALID_ARG_TYPE'}toString(){return `${this.name } [${this.code }]: ${this.message }`}}function validateString(value,name){if(typeof value!=='string'){throw new ERR_INVALID_ARG_TYPE(name,'string',value)}}function validateNumber(value,name){if(typeof value!=='number'){throw new ERR_INVALID_ARG_TYPE(name,'number',value)}}function validateBoolean(value,name){if(typeof value!=='boolean'){throw new ERR_INVALID_ARG_TYPE(name,'boolean',value)}};return {ERR_INVALID_ARG_TYPE,validateBoolean,validateNumber,validateString}}));
	require.add("rpath",(function(){var StringPrototypeLastIndexOf=(a,e)=>a.lastIndexOf(e);const{CHAR_UPPERCASE_A:CHAR_UPPERCASE_A,CHAR_LOWERCASE_A:CHAR_LOWERCASE_A,CHAR_UPPERCASE_Z:CHAR_UPPERCASE_Z,CHAR_LOWERCASE_Z:CHAR_LOWERCASE_Z,CHAR_DOT:CHAR_DOT,CHAR_FORWARD_SLASH:CHAR_FORWARD_SLASH,CHAR_BACKWARD_SLASH:CHAR_BACKWARD_SLASH,CHAR_COLON:CHAR_COLON,CHAR_QUESTION_MARK:CHAR_QUESTION_MARK}=require("constants"),{validateString:validateString}=require("validators");let StringPrototypeCharCodeAt=(t,r)=>t.charCodeAt(r),StringPrototypeSlice=(t,...r)=>t.slice(...r),FunctionPrototypeBind=(t,...r)=>t.bind(...r);function isWindowsDeviceRoot(t){return t>=CHAR_UPPERCASE_A&&t<=CHAR_UPPERCASE_Z||t>=CHAR_LOWERCASE_A&&t<=CHAR_LOWERCASE_Z}const win32={resolve(...t){let r="",e="",o=!1;for(let i=t.length-1;i>=-1;i--){let n;if(i>=0){if(n=t[i],validateString(n,"path"),0===n.length)continue}else 0===r.length?n=process.cwd():(void 0===(n=process.env[`=${r}`]||process.cwd())||StringPrototypeToLowerCase(StringPrototypeSlice(n,0,2))!==StringPrototypeToLowerCase(r)&&StringPrototypeCharCodeAt(n,2)===CHAR_BACKWARD_SLASH)&&(n=`${r}/`);const a=n.length;let S=0,C="",A=!1;const g=StringPrototypeCharCodeAt(n,0);if(1===a)isPathSeparator(g)&&(S=1,A=!0);else if(isPathSeparator(g))if(A=!0,isPathSeparator(StringPrototypeCharCodeAt(n,1))){let t=2,r=t;for(;t<a&&!isPathSeparator(StringPrototypeCharCodeAt(n,t));)t++;if(t<a&&t!==r){const e=StringPrototypeSlice(n,r,t);for(r=t;t<a&&isPathSeparator(StringPrototypeCharCodeAt(n,t));)t++;if(t<a&&t!==r){for(r=t;t<a&&!isPathSeparator(StringPrototypeCharCodeAt(n,t));)t++;t!==a&&t===r||(C=`//${e}/${StringPrototypeSlice(n,r,t)}`,S=t)}}}else S=1;else isWindowsDeviceRoot(g)&&StringPrototypeCharCodeAt(n,1)===CHAR_COLON&&(C=StringPrototypeSlice(n,0,2),S=2,a>2&&isPathSeparator(StringPrototypeCharCodeAt(n,2))&&(A=!0,S=3));if(C.length>0)if(r.length>0){if(StringPrototypeToLowerCase(C)!==StringPrototypeToLowerCase(r))continue}else r=C;if(o){if(r.length>0)break}else if(e=`${StringPrototypeSlice(n,S)}/${e}`,o=A,A&&r.length>0)break}return e=normalizeString(e,!o,"/",isPathSeparator),o?`${r}/${e}`:`${r}${e}`||"."},normalize(t){validateString(t,"path");const r=t.length;if(0===r)return".";let e,o=0,i=!1;const n=StringPrototypeCharCodeAt(t,0);if(1===r)return isPosixPathSeparator(n)?"/":t;if(isPathSeparator(n))if(i=!0,isPathSeparator(StringPrototypeCharCodeAt(t,1))){let i=2,n=i;for(;i<r&&!isPathSeparator(StringPrototypeCharCodeAt(t,i));)i++;if(i<r&&i!==n){const a=StringPrototypeSlice(t,n,i);for(n=i;i<r&&isPathSeparator(StringPrototypeCharCodeAt(t,i));)i++;if(i<r&&i!==n){for(n=i;i<r&&!isPathSeparator(StringPrototypeCharCodeAt(t,i));)i++;if(i===r)return`//${a}/${StringPrototypeSlice(t,n)}/`;i!==n&&(e=`//${a}/${StringPrototypeSlice(t,n,i)}`,o=i)}}}else o=1;else isWindowsDeviceRoot(n)&&StringPrototypeCharCodeAt(t,1)===CHAR_COLON&&(e=StringPrototypeSlice(t,0,2),o=2,r>2&&isPathSeparator(StringPrototypeCharCodeAt(t,2))&&(i=!0,o=3));let a=o<r?normalizeString(StringPrototypeSlice(t,o),!i,"/",isPathSeparator):"";return 0!==a.length||i||(a="."),a.length>0&&isPathSeparator(StringPrototypeCharCodeAt(t,r-1))&&(a+="/"),void 0===e?i?`/${a}`:a:i?`${e}/${a}`:`${e}${a}`},isAbsolute(t){validateString(t,"path");const r=t.length;if(0===r)return!1;const e=StringPrototypeCharCodeAt(t,0);return isPathSeparator(e)||r>2&&isWindowsDeviceRoot(e)&&StringPrototypeCharCodeAt(t,1)===CHAR_COLON&&isPathSeparator(StringPrototypeCharCodeAt(t,2))},join(...t){if(0===t.length)return".";let r,e;for(let o=0;o<t.length;++o){const i=t[o];validateString(i,"path"),i.length>0&&(void 0===r?r=e=i:r+=`/${i}`)}if(void 0===r)return".";let o=!0,i=0;if(isPathSeparator(StringPrototypeCharCodeAt(e,0))){++i;const t=e.length;t>1&&isPathSeparator(StringPrototypeCharCodeAt(e,1))&&(++i,t>2&&(isPathSeparator(StringPrototypeCharCodeAt(e,2))?++i:o=!1))}if(o){for(;i<r.length&&isPathSeparator(StringPrototypeCharCodeAt(r,i));)i++;i>=2&&(r=`/${StringPrototypeSlice(r,i)}`)}return win32.normalize(r)},relative(t,r){if(validateString(t,"from"),validateString(r,"to"),t===r)return"";const e=win32.resolve(t),o=win32.resolve(r);if(e===o)return"";if((t=StringPrototypeToLowerCase(e))===(r=StringPrototypeToLowerCase(o)))return"";let i=0;for(;i<t.length&&StringPrototypeCharCodeAt(t,i)===CHAR_BACKWARD_SLASH;)i++;let n=t.length;for(;n-1>i&&StringPrototypeCharCodeAt(t,n-1)===CHAR_BACKWARD_SLASH;)n--;const a=n-i;let S=0;for(;S<r.length&&StringPrototypeCharCodeAt(r,S)===CHAR_BACKWARD_SLASH;)S++;let C=r.length;for(;C-1>S&&StringPrototypeCharCodeAt(r,C-1)===CHAR_BACKWARD_SLASH;)C--;const A=C-S,g=a<A?a:A;let h=-1,l=0;for(;l<g;l++){const e=StringPrototypeCharCodeAt(t,i+l);if(e!==StringPrototypeCharCodeAt(r,S+l))break;e===CHAR_BACKWARD_SLASH&&(h=l)}if(l!==g){if(-1===h)return o}else{if(A>g){if(StringPrototypeCharCodeAt(r,S+l)===CHAR_BACKWARD_SLASH)return StringPrototypeSlice(o,S+l+1);if(2===l)return StringPrototypeSlice(o,S+l)}a>g&&(StringPrototypeCharCodeAt(t,i+l)===CHAR_BACKWARD_SLASH?h=l:2===l&&(h=3)),-1===h&&(h=0)}let p="";for(l=i+h+1;l<=n;++l)l!==n&&StringPrototypeCharCodeAt(t,l)!==CHAR_BACKWARD_SLASH||(p+=0===p.length?"..":"/..");return S+=h,p.length>0?`${p}${StringPrototypeSlice(o,S,C)}`:(StringPrototypeCharCodeAt(o,S)===CHAR_BACKWARD_SLASH&&++S,StringPrototypeSlice(o,S,C))},toNamespacedPath(t){if("string"!=typeof t||0===t.length)return t;const r=win32.resolve(t);if(r.length<=2)return t;if(StringPrototypeCharCodeAt(r,0)===CHAR_BACKWARD_SLASH){if(StringPrototypeCharCodeAt(r,1)===CHAR_BACKWARD_SLASH){const t=StringPrototypeCharCodeAt(r,2);if(t!==CHAR_QUESTION_MARK&&t!==CHAR_DOT)return`//?/UNC/${StringPrototypeSlice(r,2)}`}}else if(isWindowsDeviceRoot(StringPrototypeCharCodeAt(r,0))&&StringPrototypeCharCodeAt(r,1)===CHAR_COLON&&StringPrototypeCharCodeAt(r,2)===CHAR_BACKWARD_SLASH)return`//?/${r}`;return t},dirname(t){validateString(t,"path");const r=t.length;if(0===r)return".";let e=-1,o=0;const i=StringPrototypeCharCodeAt(t,0);if(1===r)return isPathSeparator(i)?t:".";if(isPathSeparator(i)){if(e=o=1,isPathSeparator(StringPrototypeCharCodeAt(t,1))){let i=2,n=i;for(;i<r&&!isPathSeparator(StringPrototypeCharCodeAt(t,i));)i++;if(i<r&&i!==n){for(n=i;i<r&&isPathSeparator(StringPrototypeCharCodeAt(t,i));)i++;if(i<r&&i!==n){for(n=i;i<r&&!isPathSeparator(StringPrototypeCharCodeAt(t,i));)i++;if(i===r)return t;i!==n&&(e=o=i+1)}}}}else isWindowsDeviceRoot(i)&&StringPrototypeCharCodeAt(t,1)===CHAR_COLON&&(o=e=r>2&&isPathSeparator(StringPrototypeCharCodeAt(t,2))?3:2);let n=-1,a=!0;for(let e=r-1;e>=o;--e)if(isPathSeparator(StringPrototypeCharCodeAt(t,e))){if(!a){n=e;break}}else a=!1;if(-1===n){if(-1===e)return".";n=e}return StringPrototypeSlice(t,0,n)},basename(t,r){void 0!==r&&validateString(r,"ext"),validateString(t,"path");let e=0,o=-1,i=!0;if(t.length>=2&&isWindowsDeviceRoot(StringPrototypeCharCodeAt(t,0))&&StringPrototypeCharCodeAt(t,1)===CHAR_COLON&&(e=2),void 0!==r&&r.length>0&&r.length<=t.length){if(r===t)return"";let n=r.length-1,a=-1;for(let S=t.length-1;S>=e;--S){const C=StringPrototypeCharCodeAt(t,S);if(isPathSeparator(C)){if(!i){e=S+1;break}}else-1===a&&(i=!1,a=S+1),n>=0&&(C===StringPrototypeCharCodeAt(r,n)?-1==--n&&(o=S):(n=-1,o=a))}return e===o?o=a:-1===o&&(o=t.length),StringPrototypeSlice(t,e,o)}for(let r=t.length-1;r>=e;--r)if(isPathSeparator(StringPrototypeCharCodeAt(t,r))){if(!i){e=r+1;break}}else-1===o&&(i=!1,o=r+1);return-1===o?"":StringPrototypeSlice(t,e,o)},extname(t){validateString(t,"path");let r=0,e=-1,o=0,i=-1,n=!0,a=0;t.length>=2&&StringPrototypeCharCodeAt(t,1)===CHAR_COLON&&isWindowsDeviceRoot(StringPrototypeCharCodeAt(t,0))&&(r=o=2);for(let S=t.length-1;S>=r;--S){const r=StringPrototypeCharCodeAt(t,S);if(isPathSeparator(r)){if(!n){o=S+1;break}}else-1===i&&(n=!1,i=S+1),r===CHAR_DOT?-1===e?e=S:1!==a&&(a=1):-1!==e&&(a=-1)}return-1===e||-1===i||0===a||1===a&&e===i-1&&e===o+1?"":StringPrototypeSlice(t,e,i)},format:FunctionPrototypeBind(_format,null,"/"),parse(t){validateString(t,"path");const r={root:"",dir:"",base:"",ext:"",name:""};if(0===t.length)return r;const e=t.length;let o=0,i=StringPrototypeCharCodeAt(t,0);if(1===e)return isPathSeparator(i)?(r.root=r.dir=t,r):(r.base=r.name=t,r);if(isPathSeparator(i)){if(o=1,isPathSeparator(StringPrototypeCharCodeAt(t,1))){let r=2,i=r;for(;r<e&&!isPathSeparator(t.charCodeAt(r));)r++;if(r<e&&r!==i){for(i=r;r<e&&isPathSeparator(t.charCodeAt(r));)r++;if(r<e&&r!==i){for(i=r;r<e&&!isPathSeparator(t.charCodeAt(r));)r++;r===e?o=r:r!==i&&(o=r+1)}}}}else if(isWindowsDeviceRoot(i)&&t.charCodeAt(1)===CHAR_COLON){if(e<=2)return r.root=r.dir=t,r;if(o=2,isPathSeparator(t.charCodeAt(2))){if(3===e)return r.root=r.dir=t,r;o=3}}o>0&&(r.root=t.slice(0,o));let n=-1,a=o,S=-1,C=!0,A=t.length-1,g=0;for(;A>=o;--A)if(isPathSeparator(i=t.charCodeAt(A))){if(!C){a=A+1;break}}else-1===S&&(C=!1,S=A+1),i===CHAR_DOT?-1===n?n=A:1!==g&&(g=1):-1!==n&&(g=-1);return-1!==S&&(-1===n||0===g||1===g&&n===S-1&&n===a+1?r.base=r.name=t.slice(a,S):(r.name=t.slice(a,n),r.base=t.slice(a,S),r.ext=t.slice(n,S))),r.dir=a>0&&a!==o?t.slice(0,a-1):r.root,r},sep:"/",delimiter:";",win32:null,posix:null};function isPathSeparator(t){return t===CHAR_FORWARD_SLASH||t===CHAR_BACKWARD_SLASH}function _format(t,r){validateObject(r,"pathObject");const e=r.dir||r.root,o=r.base||`${r.name||""}${r.ext||""}`;return e?e===r.root?`${e}${o}`:`${e}${t}${o}`:o}function normalizeString(t,r,e,o){let i="",n=0,a=-1,S=0,C=0;for(let A=0;A<=t.length;++A){if(A<t.length)C=t.charCodeAt(A);else{if(o(C))break;C=CHAR_FORWARD_SLASH}if(o(C)){if(a===A-1||1===S);else if(2===S){if(i.length<2||2!==n||i.charCodeAt(i.length-1)!==CHAR_DOT||i.charCodeAt(i.length-2)!==CHAR_DOT){if(i.length>2){const t=i.lastIndexOf(e);-1===t?(i="",n=0):n=(i=i.slice(0,t)).length-1-i.lastIndexOf(e),a=A,S=0;continue}if(0!==i.length){i="",n=0,a=A,S=0;continue}}r&&(i+=i.length>0?`${e}..`:"..",n=2)}else i.length>0?i+=`${e}${t.slice(a+1,A)}`:i=t.slice(a+1,A),n=A-a-1;a=A,S=0}else C===CHAR_DOT&&-1!==S?++S:S=-1}return i};return win32;}));
	require.add("utils",(function(){var a={}; a.pz=_=>(_>9?_:"0"+_); a.rc=function(c){for(var a="",b=0;b<c;)a+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(Math.floor(62*Math.random())),b+=1;return a}; return ()=>a;})());
	window.require=require;
}));