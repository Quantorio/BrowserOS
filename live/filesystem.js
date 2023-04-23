(function(){
BrowserFS.install(window);

let listing = {
	"README.md": null
}
var a=e=>{
BrowserFS.FileSystem.XmlHttpRequest.Create({
	index: e||listing,
	baseUrl: "https://raw.githubusercontent.com/Quantorio/BrowserOS/NEWBRANCH/live/filesystem/"
}, function(e, lsfs) {
BrowserFS.FileSystem.LocalStorage.Create({}, function(e, idbfs) {
	  BrowserFS.FileSystem.MountableFileSystem.Create({
		'/home': idbfs,
		'/mnt/esp': lsfs
	  }, function(e, mfs) {
		BrowserFS.initialize(mfs);
		// BFS is now ready to use!
		window.fsready=true;
		window.dispatchEvent(new Event("FSReady"));
	  });
	});
});
};
fetch("listing.json").then(e=>e.json()).then(e=>a(e));

})();
