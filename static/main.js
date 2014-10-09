function getEventTarget(e){
//Return target DOM node on which the event is triggered.
if(!e)var e=window.event;return (e.target&&e.target.nodeType==3)?e.target.parentNode:(e.target)?e.target:e.srcElement;
}

function supportCanvas(){
//Return true if HTML5 canvas are supported.
var elem=document.createElement('canvas');
return !!(elem.getContext&&elem.getContext('2d'));
}

function sortbydata(e){
//Sort table by pages or countries.
var p=getEventTarget(e);
while(!p.className)p=p.parentNode;
var list=[]
for(var i=1,nds=p.getElementsByTagName('DIV'),n=nds.length;i<n;i++){
	if(nds[i].parentNode!=p)continue;
	list.push([nds[i].getElementsByTagName('DIV')[0].innerHTML,nds[i]])
}
list.sort(function(a,b){return (a[0] < b[0]) ? -1 : 1})
for(var i=0,n=list.length;i<n;i++)p.appendChild(list[i][1]);
}

function sortbyviews(e){
//Sort table by views.
var p=getEventTarget(e);
while(!p.className)p=p.parentNode;
var list=[]
for(var i=1,nds=p.getElementsByTagName('DIV'),n=nds.length;i<n;i++){
	if(nds[i].parentNode!=p)continue;
	list.push([nds[i].getElementsByTagName('DIV')[2].innerHTML.replace(/[^0-9]/,''),nds[i]])
}
list.sort(function(a,b){return b[0]-a[0]})
for(var i=0,n=list.length;i<n;i++)p.appendChild(list[i][1]);
}

function showmore(e){
//Show all data from the table.
var p=getEventTarget(e);
while(!p.id)p=p.parentNode;
var tab=p.previousSibling;
while(tab.nodeType!=1||!tab.className)tab=tab.previousSibling;
tab.className+=' more';
p.parentNode.removeChild(p);
}

function drawgraph(){
//Draw page views graph.
var canv=document.getElementById('pagegraph');
if(!supportCanvas()||Object.keys(graphdata).length==0){canv.style.display='none';return;}
var x = canv.width;
var y = canv.height;
var ctx=canv.getContext('2d');
ctx.beginPath();
var xmax=0
var ymax=0
for(var k in graphdata){
	xmax++;
	ymax=Math.max(graphdata[k],ymax)
}
var div=10;
while(div*100<ymax)div=div*10;
ymax=Math.round(ymax/div*1.1)*div
var yd=y/ymax
var xd=x/(xmax-1)
//draw background
ctx.moveTo(0,y);
var i=0;
for(var k in graphdata){
	ctx.lineTo(Math.round(i*xd),y-Math.round(graphdata[k]*yd));
	i++
}
ctx.lineTo(x,y)
ctx.closePath();
ctx.fillStyle = '#ebebeb';
ctx.fill();
//draw background line and numbers
ctx.beginPath();
ctx.moveTo(0,Math.round(y/2)+0.5);
ctx.lineTo(x,Math.round(y/2)+0.5);
ctx.strokeStyle="#c2c2c2";
ctx.lineWidth=1;
ctx.stroke();
ctx.fillStyle="#818181";
ctx.font="12px Arial";
ctx.fillText(formatNumber(Math.round(ymax/2)),1,Math.round(y/2)+12);
ctx.fillText(formatNumber(ymax),1,12);
//draw graph line
ctx.beginPath();
ctx.moveTo(0,y);
var i=0;
for(var k in graphdata){
	ctx.lineTo(Math.round(i*xd),y-Math.round(graphdata[k]*yd));
	i++
}
ctx.strokeStyle="#818181";
ctx.lineWidth=2;
ctx.stroke();
//draw points
var i=0;
for(var k in graphdata){
	var xc=Math.round(i*xd);
	var yc=y-Math.round(graphdata[k]*yd);
	ctx.beginPath();
	ctx.arc(xc,yc,4,0,2*Math.PI);
	ctx.fillStyle = '#818181';
	ctx.fill();
	i++
}
}

function formatNumber(n){
//Format number in readable format.
var n=n.toFixed(0).toString();
var r=/(\d+)(\d{3})/;
while(r.test(n))n=n.replace(r,'$1'+','+'$2');
return n;
}
