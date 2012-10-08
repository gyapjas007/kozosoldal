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

function ChangeColor()
{
	$("#main").css("position", "absolute");
	$("#main").css("width", 900);
	$("#main").css("height", 500);
	$(".view-listazas-esohoz").each(ChangeDiv)
	$("#block-system-main").append("<div id='displayTitle'></div>");	
	$("#main").mousewheel(function(event, delta){
	onScrolled(event, delta);
	});
         $(".view-display-id-page").css("-moz-transform-style","preserve-3d");
 $(".view-display-id-page").css("perspective","500px");
        
};

function onScrolled(event, delta)
{
scrollPos+= delta;

 var len=rainDrops.length;

 $(".attachment").css("-moz-transform","translateZ(90px)");
 $(".view-display-id-page > .view-content").css("-moz-transform","translateZ(40px)");
$(".view-display-id-page > .view-content").css("-moz-transform","scaleZ(2)");
$(".views-row").css("-moz-transition","all 800ms ease 0s");
$("div.views-row").each(function(index)
{
/*for(var i=0; i<len; i++) {
var elem = rainDrops[i];
    if(elem[0]==$(this).attr("id"))
    {
W = elem[2];
H =elem[3];
$(this).css("width",W*((100+scrollPos)/100));
$(this).css("height",H*((100+scrollPos)/100));
$(this).css("left",elem[4]*((100+scrollPos)/100)+centerX);
$(this).css("top",elem[5]*((100+scrollPos)/100)+centerY); 

    }
}*/
});
}

var centerX = 400;
var centerY = 400;

function ChangeDiv()
{
		$("div.views-row").each(function(index){
		
		id =$(this).attr('id');
		if(id.length>0)
		{
		return false;
		}
			divider = 1;
			
			if($(this).parent().parent().parent().hasClass("attachment"))
			{
			divider = 2;
			}
			
			var topPos = Math.floor((Math.random()*200)+100);
		var leftPos = Math.floor((Math.random()*900)+1);
		/* var myheight = Math.floor((Math.random()*120)+50)/divider;
		var myW = rainDropW/divider;
		*/
		var myheight = 100/divider;
		var myW = rainDropW/divider;
		
			 $(this).css("position", "absolute");
			 pos = index*20;
			 $(this).css("left",leftPos );
			 $(this).css("top",topPos );
			 $(this).css("width",myW);
			 $(this).css("height",myheight );
			 $(this).css("background-color","#487B9A");
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
			 $(this).mouseover(Rotate);
			 $(this).click({top:topPos,left:(leftPos+6), height:myheight},ShowmyDiv);
										 })
	
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

$("#displayTitle").animate({width:'100px'},500,"linear", function() {
  var len=rainDrops.length;

for(var i=0; i<len; i++) {
var elem = rainDrops[i];
    if(elem[0]==me.id)
    {
    $("#displayTitle").html(elem[1]);
    $("#displayTitle").css("transform","rotate(30deg)");
    }
}
}
  );



}

})(jQuery, Drupal, this, this.document);