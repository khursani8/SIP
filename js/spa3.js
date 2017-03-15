module.exports = {
	runPsScript: function(response,filename) {		
		var spawn = require("child_process").spawn,child;
		child = spawn("powershell.exe",[filename]);
		// response.writeHead(200);
		var output = "";
		child.stdout.on("data",function(data){
			// response.write(data, "binary",function() {
				
			// });
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