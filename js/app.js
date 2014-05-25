/**
* Reference: http://24ways.org/2013/animating-vectors-with-svg/
*/


var current_frame, total_frames, path, length, handle, myobj;

function loadSvg() {
  var element = document.getElementById("draw");
  var obj = document.createElement("object");
  obj.type = "image/svg+xml";
  obj.data = "image/drawing.svg";
  element.appendChild(obj);
}

function requestSvg() {
  var request = new XMLHttpRequest();
//   request.open("GET", "/image/drawing.svg");
  request.open("GET", "http://cdn.shopify.com/s/files/1/0269/1435/files/svgstudio-freesample.svg");
  request.onload = function() {
    if(request.status >= 200 && request.status <= 400){
      var svg = request.responseText;
      var div = document.getElementById("draw");
      div.innerHTML = svg;

      init();
      draw();

    }
  }

  request.send();
}

function getElement() {
  var svg = document.getElementsByTagName("svg")[0];
//   var path = svg.getElementById("i0");
  var path = svg.getElementsByTagName("path")[2];
  return path;
}

var init = function() {
  current_frame = 0;
  total_frames = 60;
  length = new Array();

  path = getElement();
  length = path.getTotalLength();

  path.style.strokeDasharray = length + ' ' + length;

  console.log(path.style.strokeDasharray);

  path.style.strokeDashoffset = length;
  handle = 0;
}

var draw = function() {
  var progress = current_frame/total_frames;
  if (progress > 1) {
    window.cancelAnimationFrame(handle);
  } else {
    current_frame++;
    var value =  Math.floor(length * (1 - progress));
    path.style.strokeDashoffset = value;
    handle = window.requestAnimationFrame(draw);
  }
};

requestSvg();
