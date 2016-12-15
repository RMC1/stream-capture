var youtubeLink;
var vidID;

var video = document.getElementById('video');
var source = document.createElement('source');

// get youtube link from user
function getUserLink() {
    var x;
    x = document.getElementById("form1");
    youtubeLink = x.elements["userInput"].value;
    
    var mp4url = "http://www.youtubeinmp4.com/redirect.php?video=";
    var mp4urlHD = "&hd=1";
    var isYoutube = youtubeLink && youtubeLink.match(/(?:youtu|youtube)(?:\.com|\.be)\/([\w\W]+)/i);

   // if valid youtube link. finalize id as string
   if (isYoutube) {
       var id = isYoutube[1].match(/watch\?v=|[\w\W]+/gi);
       id = (id.length > 1) ? id.splice(1) : id;
       id = id.toString();
       vidID = id;
    }

    // Set video source as valid youtube link, load video, and append 
    source.setAttribute('src', mp4url+vidID+mp4urlHD);
    video.appendChild(source);
    video.load();
    
}




var videoId = 'video';
var scaleFactor = 0.25;
var snapshots = [];

// save original canvas
function capture(video, scaleFactor) {
	if(scaleFactor == null){
		scaleFactor = 1;
	}
	var w = video.videoWidth * scaleFactor;
	var h = video.videoHeight * scaleFactor;
    
    
	var canvas = document.createElement('canvas');
		canvas.width  = w;
	    canvas.height = h;
	var ctx = canvas.getContext('2d');
		ctx.drawImage(video, 0, 0, w, h);

    canvas.id = 'canvas';
    
    return canvas;
} 


// Save bigger second canvas image
function scaleCapture(video) {

    var canvas2 = document.createElement('canvas');

    canvas2.width  = video.videoWidth;
    canvas2.height = video.videoHeight;
    
    var scaleW = canvas2.width;
    var scaleH = canvas2.height;
    
	var ctx2 = canvas2.getContext('2d');
		ctx2.drawImage(video, 0, 0, scaleW, scaleH);
    canvas2.id = 'canvas2';
        
    return canvas2;

}

// remove modal image
function dismiss() {
    $('#light').css('display','none');
    $('#fade').css('display','none');
    $('#canvas2').remove();
}


// append screenshot to document and display in a list
function shoot() {
	var video  = document.getElementById(videoId);
	var output = document.getElementById('output');
	var canvas = capture(video, scaleFactor);

    var scaleCanvas = scaleCapture(video);
    
    snapshots.unshift(canvas);
	output.innerHTML = '';
	for(var i=0; i<4; i++){
        
        output.appendChild(snapshots[i]);
    
        // on canvas click. display bigger canvas2
        $('#canvas').on('click', function() {
            $('#canvas2').addClass('.white_content');
            light.appendChild(scaleCanvas);
            $('#light').css('display','block');
            $('#fade').css('display','block');
        });
	}     
}

