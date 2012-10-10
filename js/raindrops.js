// JavaScript Document

doc = $(document);
var rainDrops = [];
var prefix = "";

doc.ready(function()
	{
	BrowserDetect.init();
	var k =BrowserDetect.browser;
	if(k=="Chrome")
		prefix = "-webkit-";
	if(k=="Firefox")
		prefix = "-moz-";
		
	div = $("#main");
	
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
	
	CreateLayers(3);	
	
	div.append("<div id='displayTitle'></div>");	
	div.mousewheel(function(event, delta){
	onScrolled(event, delta);
	});
	
	
				   });

function CreateLayers(p_count)
{
	
	for(i=0;i<p_count;i++)
	{
		containerName = "layerDiv_"+i;
		$("#main").append("<div id='"+containerName+"'></div>");
			
		$("#"+containerName).css(prefix + "perspective","200px");	
		for(j=0;j<10;j++)
		{
			id = containerName+"_"+j;
			$("#"+containerName).append("<div class='"+containerName+"' id='"+id+"'></div>");
		}
		
			$("."+containerName).each(ChangeDiv);
	}
	
}

function ChangeDiv()
{
	
		rainDropW = 6;
		
		myclass = $(this).attr('class');
		
		var layerNoStr = myclass.substr(myclass.length-1,1);
		layerNo = parseInt(layerNoStr);
		
			divider = 1;//layerNo;

			var Z_3d = 5+layerNo*-100;
			ZZ=Z_3d;
		
			
			var topPos = Math.floor((Math.random()*350));
		var leftPos = Math.floor((Math.random()*700)+1);
		
		var myheight = 100/divider;
		var myW = rainDropW/divider;
		
			 $(this).css("position", "absolute");
			 //pos = index*20;
			 
			 // $(this).css("left",leftPos );
			 // $(this).css("top",topPos );
			 $(this).css("width",myW);
			 $(this).css("height",myheight );
			 
			 //$(this).animate({left:leftPos+"px", top:topPos+"px"},1000,"linear");
			
			 //$(this).css( prefix+"transform","translate3d("+leftPos+"px,"+topPos+"px,"+ZZ+"px)");
			 //cssProperty = prefix+"transform";
			 cssValue = "translateY("+leftPos+"px) translateX("+topPos+"px)";// translateZ("+ZZ+"px)";
			 //$(this).animate({transform:cssValue},1000, "linear");

			 
//			 
//			 transition.set({
//  property: 'transform',
//  duration: '1000ms'
//});	 			
//			 transform.translate({
//    x: leftPos,
//    y: topPos
//});
			 
			 //transform = $(this).css(prefix + "transform");
//  			if(transform == "none")
//  			{
//  				alert("Empty transform array");
//  			}
// 		 
//  			arr = matrix2Array(transform);
			 
//			 $(this).css("-moz-transform","translate3d("+leftPos+"px,"+topPos+"px,"+ZZ+")");
//			 $(this).css("-moz-transform","translateX("+leftPos+"px");			 
			 $(this).css("background-color","#487B9A");
			 var myText =[];
			 //$(this).attr('id','raindrop'+index)
			 myText.push($(this).attr('id'));
			 myText.push($(this).html());
			 myText.push(myW);
			 myText.push(myheight);
			 myText.push(leftPos);
			 myText.push(topPos);
			 rainDrops.push(myText);
			 $(this).text("");
			 
			 			 //var elem = $(this).context;
//			 
//			 transition = new Transition(elem);
//			 transform = new Transform(elem);
			 
			 //$("'#"+$(this).attr('id')+"'").setTransition({
																											
			 $(this).setTransition({
  	property: 'transform',
  	'timing-function': 'ease-in',
 	 duration: '2s'
	}).translate({
		x:(leftPos/parseInt($(this).width()))*100,
		y:(topPos/parseInt($(this).height()))*100
	});
			 
			 //$(this).mouseover(Rotate);
			 //$(this).click({top:topPos,left:(leftPos+6), height:myheight},ShowmyDiv);
				//						 })
	
};

function onScrolled(event, delta)
{
scrollPos = delta;

for(i=0;i<2;i++)
	{
		containerName = "layerDiv_"+i;
		
			
		$("."+containerName).each(function(delta)
										   {
											   transform = $(this).css(prefix + "transform");
											   if(transform == "none")
  {
  	alert("Empty transform array");
  }
											   arr = matrix2Array(transform);
											   
											   newX = (delta/parseInt($(this).css('width')))*100;
											   
											  $(this).setTransition({
  	property: 'transform',
  	'timing-function': 'ease-in',
 	 duration: '2s'
	}).translate({
		x:newX,
		y:(delta/parseInt($(this).css('height')))*100
	}); 
}
);
}
}

	

 //var len=rainDrops.length;
// 
// var layerDivs =[];
// layerDivs.push(".attachment-after");
// layerDivs.push(".view-display-id-page > .view-content");
// 
// for(divNo in layerDivs)
// {
//  divId = layerDivs[divNo];
//  
//  transform = $(divId).css(prefix + "transform");
//  if(transform == "none")
//  {
//  	alert("Empty transform array");
//  }
//  
//  arr = matrix2Array(transform);				   
//
//	matrixZ = parseInt(arr[14]);
//
//	if(matrixZ>50)
// 	   matrixZ -=600;
//	if(delta>0){
//		matrixZ+=7;
//		op = parseFloat($(divId).css("opacity"));
//		op = op+0.03;
// 	        $(divId).css("opacity",op);
//	}else
//	    {
//		matrixZ-=7;
//	        $(divId).css("opacity",$(divId).css("opacity")-0.03);
//	    }
//	poz1=arr[13];
//	poz2=arr[12];
//	$(divId).css(prefix + "transform","translate3d("+poz1+"px,"+poz2+"px,"+matrixZ+"px)");
//	
//	if(matrixZ>100)
//		$(divId).css("background-color","#ffdddd");
// }
	
	function matrix2Array(matrix)
	{
	subst =matrix.substr(8,matrix.length-8); 
	substArray = subst.split(', ');
	return substArray;
	}