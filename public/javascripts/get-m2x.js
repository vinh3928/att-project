
var Orbit = function () {
};

Orbit.prototype.get = function (path, cb, errorCb) { 
  var request = new XMLHttpRequest();
  request.open("GET", path);
  request.setRequestHeader("X-M2X-KEY", "ef4642f74095db38bb8e4fe0598cbd07");
  request.send();
  request.addEventListener("load", cb.bind(request));
  request.addEventListener("error", errorCb);
};

Orbit.prototype.getter = function (path, cb, errorCb) { 
  var request = new XMLHttpRequest();
  request.open("GET", path);
  request.send();
  request.addEventListener("load", cb.bind(request));
  request.addEventListener("error", errorCb);
};

Orbit.prototype.post = function (path, data, cb, errorCb) { 
  var request = new XMLHttpRequest();
  request.open("POST", path);
  request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  request.send(JSON.stringify(data));
  request.addEventListener("load", cb.bind(request));
  request.addEventListener("error", errorCb);
};

var orbit = new Orbit();

orbit.get("http://api-m2x.att.com/v2/devices/4690ce92affcda9190579d380675dc6d/streams/light", function () { 
  var data = JSON.parse(this.response);
  console.log(data.value);
  if (data.value < 0.1) {
    console.log("in loop");
    orbit.getter("http://10.0.1.11:8080/v1/init_session", function() {
      var session = JSON.parse(this.response).SessionID
      orbit.getter("http://10.0.1.11:8080//v1/add_device_to_session?SessionID=" + session + "&DeviceID=21307889105072", function () {
        orbit.getter("http://10.0.1.11:8080/v1/play_hub_media?SessionID=" + session + "&PersistentID=5378998082269213634", function () {
        });
      });
    });
  }
  else if (data.value < 0.2) {
    console.log("in loop");
    orbit.getter("http://10.0.1.11:8080/v1/init_session", function() {
      var session = JSON.parse(this.response).SessionID
      orbit.getter("http://10.0.1.11:8080//v1/add_device_to_session?SessionID=" + session + "&DeviceID=21307889105072", function () {
        orbit.getter("http://10.0.1.11:8080/v1/play_hub_media?SessionID=" + session + "&PersistentID=5378998082269213631", function () {
        });
      });
    });
  }
  else {
    console.log("in loop");
    orbit.getter("http://10.0.1.11:8080/v1/init_session", function() {
      var session = JSON.parse(this.response).SessionID
      orbit.getter("http://10.0.1.11:8080//v1/add_device_to_session?SessionID=" + session + "&DeviceID=21307889105072", function () {
        orbit.getter("http://10.0.1.11:8080/v1/play_hub_media?SessionID=" + session + "&PersistentID=5378998082269213635", function () {
        });
      });
    });
  }


});

