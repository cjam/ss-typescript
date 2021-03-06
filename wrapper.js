// Typescript (JS) wrapper for SocketStream 0.3

var tsapi = require('typescript.api');

// Build a javascript error from the TS Diagnostics object returned by the TS compiler
function makeTSError (units) {
	var errors = "";
    for(var n in units) {
        for(var m in units[n].diagnostics) {
			// just combine all of the errors and throw them at the end.
            errors += "\n"+ units[n].diagnostics[m].toString();
        }
    }
	return new Error(errors);	
}

function handleError(message, error, callback){
	console.log(String.prototype.hasOwnProperty('red') && message.red || message);
	callback("Error compiling to JavaScript: " + error.stack);
	throw new Error(error);
}

function handleWarning(message){
	console.log(String.prototype.hasOwnProperty('yellow') && message.yellow || message);
}

exports.init = function(root, config) {

  return {

    name: 'Typescript',

    extensions: ['ts'],

    assetType: 'js',

    contentType: 'text/javascript; charset=utf-8',

    compile: function(path, options, cb) {
		// resolve the current typescript file
		tsapi.resolve([path],function(resolved){
			if(!tsapi.check(resolved)){
				handleError("Typescript Resolution Error in: "+path, makeTSError(resolved), cb);
			}else{
				// compile the current typescript file
				tsapi.compile(resolved, function(compiled){
					if(!tsapi.check(compiled)){
						console.log("compile error");
						handleError("Typescript Compilation Error in: "+path, makeTSError(compiled), cb);
					}else{
						var compiledUnit = null;
						
						// Need to loop through all of the compiled units and find the content of the script
						// we're actually compiling ( will compile all references, dependencies, etc)
						for(var i=0; i< compiled.length; ++i){
							var unit = compiled[i];
							if(unit && unit.script && unit.script.name && unit.script.name == path){
								compiledUnit = unit;
								break;
							}
						}
						
						// if there is no content, then issue a warning and return a blank string
						if(compiledUnit && compiledUnit.content){
							cb(compiledUnit.content);
						}else{
							handleWarning("Compiled content is empty for '"+path+"'");
							cb("");
						}
					}				
				});			
			}		
		});     		
    }
  };
};