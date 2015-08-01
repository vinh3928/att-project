var morning = document.getElementById('morning');
var noon = document.getElementById('noon');
var night = document.getElementById('night');
var morningImg = document.getElementById("morning-img")
var noonImg = document.getElementById("noon-img")
var nightImg = document.getElementById("night-img")
var play = document.getElementById("play");
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

play.addEventListener("click", function(e) {
  orbit.get("http://api-m2x.att.com/v2/devices/4690ce92affcda9190579d380675dc6d/streams/light", function () {
    var data = JSON.parse(this.response);
    console.log(data.value);
    if (data.value < 0.1) {
      console.log("nightime");
      orbit.getter("http://10.0.1.11:8080/v1/init_session", function() {
        var session = JSON.parse(this.response).SessionID
        orbit.getter("http://10.0.1.11:8080//v1/add_device_to_session?SessionID=" + session + "&DeviceID=21307889105072", function () {
          orbit.getter("http://10.0.1.11:8080/v1/play_hub_media?SessionID=" + session + "&PersistentID=5378998082269213631", function () {
          });
        });
      });
      morningImg.setAttribute("src", "/images/Morning.png")
      morning.style.opacity = "0.5"
      noonImg.setAttribute("src", "/images/Midday.png")
      noon.style.opacity = "0.5"
      nightImg.setAttribute("src", "/images/NightGlow.png")
      night.style.opacity = "1"
    }
    else if (data.value < 0.3) {
      console.log("morning");
      orbit.getter("http://10.0.1.11:8080/v1/init_session", function() {
        var session = JSON.parse(this.response).SessionID
        orbit.getter("http://10.0.1.11:8080//v1/add_device_to_session?SessionID=" + session + "&DeviceID=21307889105072", function () {
          orbit.getter("http://10.0.1.11:8080/v1/play_hub_media?SessionID=" + session + "&PersistentID=5378998082269213634", function () {
          });
        });
      });
      morningImg.setAttribute("src", "/images/Morningglow.png")
      morning.style.opacity = "1"
      noonImg.setAttribute("src", "/images/Midday.png")
      noon.style.opacity = "0.5"
      nightImg.setAttribute("src", "/images/Night.png")
      night.style.opacity = "0.5"
    }
    else {
      console.log("midday");
      orbit.getter("http://10.0.1.11:8080/v1/init_session", function() {
        var session = JSON.parse(this.response).SessionID
        orbit.getter("http://10.0.1.11:8080//v1/add_device_to_session?SessionID=" + session + "&DeviceID=21307889105072", function () {
          orbit.getter("http://10.0.1.11:8080/v1/play_hub_media?SessionID=" + session + "&PersistentID=5378998082269213632", function () {
          });
        });
      });
      morningImg.setAttribute("src", "/images/Morning.png")
      morning.style.opacity = "0.5"
      noonImg.setAttribute("src", "/images/MiddayGlow.png")
      noon.style.opacity = "1"
      nightImg.setAttribute("src", "/images/Night.png")
      night.style.opacity = "0.5"
    }
  });
})
