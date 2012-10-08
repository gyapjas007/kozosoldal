/**
 * @file
 * A JavaScript file for the theme.
 *
 * In order for this JavaScript to be loaded on pages, see the instructions in
 * the README.txt next to this file.
 */

// JavaScript should be made compatible with libraries other than jQuery by
// wrapping it with an "anonymous closure". See:
// - http://drupal.org/node/1446420
// - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth

(function ($, Drupal, window, document, undefined) {

$(document).ready(ChangeColor);

var rainDrops = [];
var rainDropW = 6;

var SHAKE_ANGLE_MAX = 5;
var SHAKE_ANGLE_STEP = 1;
var SHAKE_IN_MS = 30;


var LAYER_COUNT = 2;
var scrollPos =0;

var cssPrefix = "";

function ChangeColor()
{
BrowserDetect.init();
var k =BrowserDetect.browser;
if(k=="Chrome")
prefix = "-webkit-";
if(k=="Firefox")
prefix = "-moz-";

	$("#main").css("position", "absolute");
	$("#main").css("width", 900);
	$("#main").css("height", 500);
	
	$("#block-system-main >.content > .view-display-id-page").css(prefix+"perspective","100px");
	$(".view-listazas-esohoz").each(ChangeDiv)
	
	$("#block-system-main").append("<div id='displayTitle'></div>");	
        /* $("#block-system-main").append("<div id='atlatszo'></div>");
        $("#atlatszo").css({width:"600px",
        height:"800px",
    position:"absolute"}); */
    
    $("#block-system-main").append("<div id='coord'></div>");
        $("#coord").css({width:"100px",
        height:"20px",
        top:"300px",
        left:"50px",
    	position:"absolute"});
    
	$("#main").mousewheel(function(event, delta){
	onScrolled(event, delta);	
	});
        
// $("#block-system-main >.content > .view-display-id-page").css(prefix+"perspective","100px");
   var offsetx=$("#main").offset().left;
   var offsety=$("#main").offset().top;
/*  
//$("#atlatszo").mousemove(function(event) {
$("#main").mousemove(function(event) {
    var mousex = 100-parseInt(((event.pageX-offsetx)/900)*100);
    var mousey = 100-parseInt(((event.pageY-offsety)/500)*100);
    
    event.preventDefault();
    posText = (event.pageX-offsetx)+"px "+(event.pageY-offsety)+"px";
    $("#coord").html(posText);
    
$(".view-id-listazas_esohoz > .view-content").animate({
    "-moz-perspective-origin":mousex+"% "+mousey+"%"
}, 400);

	poDiv = $("#block-system-main >.content > .view-display-id-page");
//    	poDiv.css(prefix+"perspective-origin",mousex+"%"+" "+mousey*2+"%");
	poDiv.css(prefix+"perspective-origin",posText);
	$("#block-system-main >.content > .view-display-id-page").css(prefix+"perspective","100px");


});*/

}

function onScrolled(event, delta)
{
scrollPos+= delta;

 var len=rainDrops.length;
 
 var layerDivs =[];
 layerDivs.push(".attachment-after");
 layerDivs.push(".view-display-id-page > .view-content");
 
 for(divNo in layerDivs)
 {
  divId = layerDivs[divNo];
  
  transform = $(divId).css(prefix + "transform");
  if(transform == "none")
  {
  	alert("Empty transform array");
  }
  
  arr = matrix2Array(transform);				   

	matrixZ = parseInt(arr[14]);

	if(matrixZ>50)
 	   matrixZ -=600;
	if(delta>0){
		matrixZ+=7;
		op = parseFloat($(divId).css("opacity"));
		op = op+0.03;
 	        $(divId).css("opacity",op);
	}else
	    {
		matrixZ-=7;
	        $(divId).css("opacity",$(divId).css("opacity")-0.03);
	    }
	poz1=arr[13];
	poz2=arr[12];
	$(divId).css(prefix + "transform","translate3d("+poz1+"px,"+poz2+"px,"+matrixZ+"px)");
	
	if(matrixZ>100)
		$(divId).css("background-color","#ffdddd");
 }

/* 
$("div.views-row").each(function(index)
{
for(var i=0; i<len; i++) {
var elem = rainDrops[i];
    if(elem[0]==$(this).attr("id"))
    {
W = elem[2];
H =elem[3];
/*$(this).css("width",W*((100+scrollPos)/100));
$(this).css("height",H*((100+scrollPos)/100));
$(this).css("left",elem[4]*((100+scrollPos)/100)+centerX);
$(this).css("top",elem[5]*((100+scrollPos)/100)+centerY); 
//alert(this.elem[3]);
transform = $(this).css(prefix + "transform");

arr = matrix2Array(transform);				   

matrixZ = parseInt(arr[14]);

if(matrixZ>50)
    matrixZ -=600;
if(delta>0){
	matrixZ+=7;
	op = parseFloat($(this).css("opacity"));
	op = op+0.03;
        $(this).css("opacity",op);
}else
    {
	matrixZ-=7;
        $(this).css("opacity",$(this).css("opacity")-0.03);
    }
poz1=elem[4]+400;
poz2=elem[5]+400;
$(this).css(prefix + "transform","translate3d("+poz1+"px,"+poz2+"px,"+matrixZ+"px)");
if(matrixZ>100)
$(this).css("background-color","red");

    }
}
});
*/
}

var centerX = 400;
var centerY = 400;

function matrix2Array(matrix)
{
	subst =matrix.substr(8,matrix.length-8); 
	substArray = subst.split(', ');
	return substArray;
	}

function ChangeDiv()
{
		$("div.views-row").each(function(index){
		
		id =$(this).attr('id');
		if(id.length>0)
		{
		return false;
		}


			ZZ="5px";
			color = "#487B9A";
			if($(this).parent().parent().parent().hasClass("attachment"))
			{

color = "yellow"
	ZZ="-200px";
			}
			
			var topPos = Math.floor((Math.random()*200)+100);
		var leftPos = Math.floor((Math.random()*700)+1);		
		var myheight = 100;
		var myW = rainDropW;
		
		//ZZ="0px";
			 $(this).css("position", "absolute");
			 pos = index*20;
			  $(this).css("left",leftPos );
			  $(this).css("top",topPos );
			 $(this).css("width",myW);
			 $(this).css("height",myheight );
			 myheightBefore = myheight;
			// $(this).css(prefix +"transform","translate3d("+leftPos+"px,"+topPos+"px,"+ZZ+")");
			 
//			 $(this).css(prefix + "transform","translateX("+leftPos+"px");			 
			 $(this).css("background-color",color);
			 var myText =[];
			 $(this).attr('id','raindrop'+index)
			 myText.push($(this).attr('id'));
			 myText.push($(this).html());
			 myText.push(myW);
			 myText.push(myheight);
			 myText.push(leftPos-centerX);
			 myText.push(topPos-centerY);
			 rainDrops.push(myText);
			 $(this).text("");
			 //$(this).mouseover(Rotate);
			 $(this).click({top:topPos,left:(leftPos+6), height:myheight},ShowmyDiv);
										 })
$(".attachment-after").css(prefix +"transform","translate3d(0px,0px,-100px)");
$(".view-display-id-page > .view-content").css(prefix +"transform","translate3d(0px,0px,5px)");
};

function Rotate()
{
var shakeAngle = SHAKE_ANGLE_MAX;
sign=1;

while(shakeAngle>=0)
	{

	$(this).animate({rotate: sign*shakeAngle},SHAKE_IN_MS);

	if(shakeAngle==0)
	{shakeAngle=-1;}
	else
	{
		shakeAngle = shakeAngle-SHAKE_ANGLE_STEP;
		if(shakeAngle<0)
		{
		shakeAngle=0;
		}
		sign*=-1;
	}

	}

}

function ShowmyDiv(event)
{
me = event.target;
$("#displayTitle").css("position", "absolute");
$("#displayTitle").css("top", event.data.top);
$("#displayTitle").css("left", event.data.left);
$("#displayTitle").css("height", event.data.height);
$("#displayTitle").css("width", 2);
$("#displayTitle").css("background-color","#2B3A3F");
$("#displayTitle").css("color","white");
$("#displayTitle").text("");

/* transform = $(event.data.sender).css(prefix + "transform");
arr = matrix2Array(transform);	
$(this).css(prefix + "transform","translate3d("+arr[12]+"px,"+arr[13]+"px,"+arr[14]+"px)"); */

$("#displayTitle").animate({width:'100px'},500,"linear", function() {
  var len=rainDrops.length;

for(var i=0; i<len; i++) {
var elem = rainDrops[i];
    if(elem[0]==me.id)
    {
    $("#displayTitle").html(elem[1]);
    // $("#displayTitle").css(prefix + "transform","rotate(30deg)");
    }
}
}
  );



}

})(jQuery, Drupal, this, this.document);