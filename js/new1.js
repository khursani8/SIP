module.exports = {
	runPsScript: function(response,filename) {	
const spawnSync = require('child_process').spawnSync;
var sleep = spawnSync('sleep', [1.5]);	
		child = spawnSync("powershell.exe",[filename]);
		// response.writeHead(200);
		var output = "";
		child.stdout.on("data",function(data){
			// response.write(data, "binary",function() {
				
			// });
			console.log('writing....');
			output += data.toString();
		});
		child.stderr.on("data",function(data){
			// response.write(data, "binary",function(data) {
			// });
			console.log("Powershell Errors: " + data);
		});
		child.on("exit",function(){
			console.log("Powershell Script finished");
			console.log(output);
			response.send(output);		
			response.end();
		});
		child.stdin.end();
		
	}
}