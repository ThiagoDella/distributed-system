var serialport = require('serialport');
var SerialPort = serialport;
var args = process.argv;


// Listing ports
if(args.indexOf('-l') !== -1){
  serialport.list(function (err, ports) {
    if(ports.length > 0){
      console.log("\n\n ==================== PORTS CONNECTED ==================== ");
      ports.forEach(function(port) {
        console.log("   "+ port.comName);
        console.log("   "+ port.pnpId);
        console.log("   "+ port.manufacturer);
      });
      console.log(" ========================================================= \n");
    }else{
      console.log("There is no device connected to a serial port");
    }
  });
}


if(args.indexOf('-open') !== -1){
  var argPort = args[args.indexOf('-open') + 1];

  var sp = new serialport(argPort, {
    baudrate: 9600,
    parser: serialport.parsers.readline("\n")
  });

  sp.on("open", function () {
    console.log('\n # # # Port ' + argPort + " has been opened # # # \n");
    var action;

    function dataChanged(flag, opt){
      if(flag){

        if(opt === "1"){
          sp.write("1", function(err){
            if(err) console.log(err);
          });
        }else if(opt === "1 R"){
          sp.write("11", function(err){
            if(err) console.log(err);
          });
        }else if(opt === "2"){
          sp.write("2", function(err){
            if(err) console.log(err);
          });
        }else if(opt === "2 R"){
          sp.write("22", function(err){
            if(err) console.log(err);
          });
        }
      }
    }

    sp.on('data', function(data) {
      data = data.trim();
      console.log(data);

      if(data === "sensor 1"){
        dataChanged(true, "1");
      }else if(data === "sensor 1 reset"){
        dataChanged(true, "1 R");
      }else if (data === "sensor 2") {
        dataChanged(true, "2");
      }else if (data === "sensor 2 reset") {
        dataChanged(true, "2 R");
      }


    });
  });
  // sp.close();
}
