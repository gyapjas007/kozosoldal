// JavaScript Document

var doc = $(document);
var prefix = "";

var rainDrops = [];
var colors=[];

var layerCount = 3;
var rainDropW = 6;

var intervalList=[];

var showDivDisabled=false;

doc.ready(function()
	{
	BrowserDetect.init();
	var k =BrowserDetect.browser;
	if(k=="Chrome")
		prefix = "-webkit-";
	if(k=="Firefox")
		prefix = "-moz-";
		
	var div = $("#main");
	$("#main").css(prefix + "perspective","200px");	
	$("body").mousemove(function(e){
		/*$("#main").show('slow',function(){
		$("#main").css(prefix + "perspective-origin",e.pageX+"px "+e.pageY+"px");
		});*/
		
	})
	
	if(div==null)
	{
		alert("Main div is null!" +b);
		return;
	}
    div.css("position", "absolute");
	div.css("left","100px");
	div.css("width","900px");
	div.css("height","500px");
	div.css("background-color","#ffdddd");
	div.css(prefix + "perspective","200px");
	
	div.html("");
	
	CreateLayers(layerCount);	
	
	//div.append("<div id='displayTitle'></div>");	
	div.mousewheel(function(event, delta){
	onScrolled(event, delta);
	});
	
});

function CreateLayers(p_count)
{
	colors.push("blue");
	colors.push("violet");
	colors.push("brown");
	
	for(i=0;i<p_count;i++)
	{
		var containerName = "layerDiv_"+i;
		$("#main").append("<div id='"+containerName+"'></div>");
			
		//$("#"+containerName).css(prefix + "perspective","200px");
		
		var Z_3d = 5+i*(-200);
		var ZZ=Z_3d+"px";
			
		$("#"+containerName).css(prefix + "transform","translateZ("+ZZ+")");
		$("#"+containerName).css("border","3px dashed "+colors[i]);
		$("#"+containerName).css("position","absolute");
		$("#"+containerName).width($("#"+containerName).parent().width());
		$("#"+containerName).height($("#"+containerName).parent().height());				
		
		for(j=0;j<10;j++)
		{
			var id = containerName+"_"+j;
			
			$("#"+containerName).append("<div id=draggableStack_"+id+" class="+containerName+"></div>");
			$("#draggableStack_"+id).append("<div id="+id+"></div>");
			$("#draggableStack_"+id).append("<div id=displayTitle"+id+"></div>")
			//$("#draggableStack_"+id).draggable();
		}
		
			$("."+containerName).each(ChangeDiv);
			
		for(j=0;j<10;j++)
		{
			var id = containerName+"_"+j;
			$("#draggableStack_"+id).draggable({
			start: function(){
				showDivDisabled=true;
				},
			stop: function(){
				setTimeout(function(){
					showDivDisabled=false;
					},20);
				}	
			});
			
		}	
		
	}	
} 

function ChangeDiv()
{				
		var myclass = $(this).attr('class');
		
		var layerNoStr = myclass.substr(myclass.length-1,1);
		var layerNo = parseInt(layerNoStr);
		
		var	divider = 1;//layerNo;

		var topPos = Math.floor((Math.random()*350));
		var leftPos = Math.floor((Math.random()*700)+1);
		
		var myheight = 100/divider;
		var myW = rainDropW/divider;
		
			 $(this).css("position", "absolute");
			
			 $(this).css("width",myW);
			 $(this).css("height",myheight );
			 
			 $(this).animate({left:leftPos+"px", top:topPos+"px"},1000,"linear");
			
			 var cssValue = "translateY("+leftPos+"px) translateX("+topPos+"px)";
			 
			 //$(this).css("background-color","#487B9A");
			 $(this).css("background-color",colors[layerNo]);
			 
			 var myText =[];
			 //$(this).attr('id','raindrop'+index)
			 myText.push($(this).attr('id'));
			 myText.push($(this).html());
			 myText.push(myW);
			 myText.push(myheight);
			 myText.push(leftPos);
			 myText.push(topPos);
			 rainDrops.push(myText);

			 
			 //$(this).mouseover(Rotate);
			 $(this).click({top:topPos,left:(leftPos+6), height:myheight, 
			 	parentClass:myclass, id:$(this).children(":first").attr("id")},ShowmyDiv);	 
				
	
};

function ShowmyDiv(event)
{
if(showDivDisabled)
	return;
	
var me = event.target;

var myDiv = $("#displayTitle"+event.data.id);

if(myDiv.width()==100)
{
	myDiv.animate({width:'0'},500,"linear");
	myDiv.html("");
}
else
{
myDiv.css("position", "absolute");
//myDiv.css("top", event.data.top);
//myDiv.css("left", event.data.left);
myDiv.css("top", 0);
myDiv.css("left", rainDropW);
myDiv.css("height", event.data.height);
myDiv.css("width", 2);
myDiv.css("background-color","#2B3A3F");
myDiv.css("color","white");
myDiv.text("");

/* transform = $(event.data.sender).css(prefix + "transform");
arr = matrix2Array(transform);	
$(this).css(prefix + "transform","translate3d("+arr[12]+"px,"+arr[13]+"px,"+arr[14]+"px)"); */

myDiv.animate({width:'100px'},500,"linear", function() {
  var len=rainDrops.length;

//myDiv.html("<a href=''>event.data.id</a>");

for(var i=0; i<len; i++) {
var elem = rainDrops[i];
    if(elem[0]==me.id)
    {
    myDiv.html(elem[0]);
    // $("#displayTitle").css(prefix + "transform","rotate(30deg)");
    }
}
}
  );
 }


}

function onScrolled(event, delta)
{
var scrollPos = delta;

for(i=0;i<layerCount;i++)
	{
		var containerName = "layerDiv_"+i;
		
		AnimateTranslateZ(containerName, 10*delta,100);					
	}
	
}
	
	function matrix2Array(matrix)
	{
	var subst =matrix.substr(8,matrix.length-8); 
	var substArray = subst.split(', ');
	return substArray;
	}
	
function AnimateTranslateZ(p_id, p_zDiff, p_duration)
{
	var f_interval = p_duration/p_zDiff;	
	ModifyZ(p_id, f_interval,p_zDiff);
}

function ModifyZ(myId, myInterval,dZ)
{
	var f_transform =$("#"+myId).css(prefix + "transform");
	var f_transformArr = matrix2Array(f_transform);
		
	var f_transZ = 0;
	if(f_transformArr.length==16)
		f_transZ = parseInt(f_transformArr[14]);
				
	f_transZ+=dZ;
	
	f_transZ = f_transZ>100?-500:f_transZ;
	f_transZ = f_transZ<-500?100:f_transZ;		
	
	$("#"+containerName).css(prefix + "transform","translateZ("+f_transZ+"px)");
}


