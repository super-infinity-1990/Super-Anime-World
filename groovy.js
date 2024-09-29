// <![CDATA[
var border=100; // how wide is each border in pixels
var effects=3; // how many of the effect are on the page
var speed=10; // how fast is the animation (lower is faster)
var colours=new Array("#9cf", "#c9f", "#fc9", "#f9c", "#cf9", "#9fc", "#6ff", "#f6f", "#ff6");
// above line lists colours for the groovy effect (the list can be as long or short as you like)

/****************************
*1970s Groovy WebPage Effect*
*(c)2008-13 mf2fm web-design*
*  http://www.mf2fm.com/rv  *
* DON'T EDIT BELOW THIS BOX *
****************************/

function addLoadEvent(funky) {
  var oldonload=window.onload;
  if (typeof(oldonload)!='function') window.onload=funky;
  else window.onload=function() {
    if (oldonload) oldonload();
    funky();
  }
}

addLoadEvent(yowzah);

var swide, shigh, boddie;
var h=new Array();
var v=new Array();
var op=1/(effects+1);
function yowzah() { if (document.getElementById) {
  var i, d, s;
  boddie=document.createElement("div");
  s=boddie.style;
  s.position="fixed";
  s.backgroundColor="transparent";
  s.top="0px";
  s.left="0px";
  s.width="100%";
  s.zIndex="-1";
  set_width();
  i=document.body.style.backgroundColor;
  if (document.body.parentNode) {
    if (i) document.body.parentNode.style.backgroundColor=i;
    document.body.style.backgroundColor="transparent";
  }
  document.body.insertBefore(boddie, document.body.firstChild);
  for (i=0; i<effects*10; i+=10) {
    d=document.createElement("div");
    s=d.style;
    s.left="0px";
	s.width="100%";
    h[i]=Math.floor(Math.random()*(shigh-border)/3);
    h[i+1]=shigh-Math.floor(Math.random()*(shigh-border)/3);
    h[i+2]=(Math.random()<0.5?1:-1)*scat(0);
    h[i+3]=(Math.random()<0.5?1:-1)*scat(h[i+2]);
    s.position="absolute";
    s.top=h[i]+"px";
    s.height=(h[i+1]-h[1])+"px";
    s.borderStyle="solid";
    s.borderWidth=border+"px 0px";
    jazzy(s, 'borderTopColor');
	jazzy(s, 'borderBottomColor');
    jazzy(s, 'backgroundColor');
    s.opacity=op;
    if (navigator.appName=="Microsoft Internet Explorer") s.filter="alpha(opacity="+(100*op)+")";
    h[i+5]=s;
    boddie.appendChild(d);
  }
  for (i=0; i<effects*10; i+=10) {
    d=document.createElement("div");
    s=d.style;
	s.top="0px";
    s.height="100%";
    v[i]=Math.floor(Math.random()*(swide-border)/3);
    v[i+1]=swide-Math.floor(Math.random()*(swide-border)/3);
    v[i+2]=(Math.random()<0.5?1:-1)*scat(0);
    v[i+3]=(Math.random()<0.5?1:-1)*scat(v[i+2]);
    s.position="absolute";
    s.left=v[i]+"px";
    s.width=(v[i+1]-v[i])+"px";
    s.borderStyle="solid";
    s.borderWidth="0px "+border+"px";
    jazzy(s, 'borderLeftColor');
    jazzy(s, 'borderRightColor');
    jazzy(s, 'backgroundColor');
    if (navigator.appName=="Microsoft Internet Explorer") s.filter="alpha(opacity="+(100*op)+")";
    else s.opacity=op;
    v[i+5]=s;
    boddie.appendChild(d);
  }
  setInterval('groovy()', speed);
}}

var old_jazz=false;
function jazz() {
	var new_jazz;
	do { new_jazz=colours[Math.floor(Math.random()*colours.length)]; }
	while ( new_jazz==old_jazz );
	old_jazz=new_jazz;
	return (new_jazz);
}

function jazzy(hip, jive) {
	var new_jive;
	do { new_jive=colours[Math.floor(Math.random()*colours.length)]; }
	while (new_jive==hip[jive]);
	hip[jive]=new_jive;
}

function scat(no) {
	var yes;
	no=Math.abs(no);
	do { yes=2+Math.floor(Math.random()*3); }
	while ( no==yes );
	return (yes);
}

function groovy() {
  var i;
  for (i=0; i<effects*10; i+=10) {
	h[i]+=h[i+2];
	h[i+1]+=h[i+3];
	if (h[i+1]-h[i]<5) {
	  h[i+4]=h[i+2]; 
	  h[i+2]=h[i+3];
	  h[i+3]=h[i+4];
	  jazzy(h[i+5], 'backgroundColor');
	}
    if (h[i]<-border) {
		if (h[i+2]<0 && Math.random()<1/border) {
			h[i+2]=scat(h[i+3]);
			jazzy(h[i+5], 'borderTopColor');
		}
	}
	if (h[i+1]>shigh) {
		if (h[i+3]>0 && Math.random()<1/border) {
			h[i+3]=-scat(h[i+2]);
			jazzy(h[i+5], 'borderBottomColor');
		}
	}
	h[i+5].top=h[i]+"px";
    h[i+5].height=(h[i+1]-h[i])+"px";

	v[i]+=v[i+2];
	v[i+1]+=v[i+3];
	if (v[i+1]-v[i]<5) {
	  v[i+4]=v[i+2];
	  v[i+2]=v[i+3];
	  v[i+3]=v[i+4];
	  jazzy(v[i+5], 'backgroundColor');
	}
	if (v[i]<-border) {
		if (v[i+2]<0 && Math.random()<1/border) {
			v[i+2]=scat(v[i+3]);
			jazzy(v[i+5], 'borderLeftColor');
		}
	}
	if (v[i+1]>swide) {
		if (v[i+3]>0 && Math.random()<1/border) {
			v[i+3]=-scat(v[i+2]);
			jazzy(v[i+5], 'borderRightColor');
		}
	}
	v[i+5].left=v[i]+"px";
    v[i+5].width=(v[i+1]-v[i])+"px";
  }
}

window.onresize=set_width;
function set_width() {
  var sw_min=999999;
  var sh_min=999999;
  if (document.documentElement && document.documentElement.clientWidth) {
    if (document.documentElement.clientWidth>0) sw_min=document.documentElement.clientWidth;
    if (document.documentElement.clientHeight>0) sh_min=document.documentElement.clientHeight;
  }
  if (typeof(self.innerWidth)!="undefined" && self.innerWidth) {
    if (self.innerWidth>0 && self.innerWidth<sw_min) sw_min=self.innerWidth;
    if (self.innerHeight>0 && self.innerHeight<sh_min) sh_min=self.innerHeight;
  }
  if (document.body.clientWidth) {
    if (document.body.clientWidth>0 && document.body.clientWidth<sw_min) sw_min=document.body.clientWidth;
    if (document.body.clientHeight>0 && document.body.clientHeight<sh_min) sh_min=document.body.clientHeight;
  }
  if (sw_min==999999 || sh_min==999999) {
    sw_min=800;
    sh_min=600;
  }
  swide=sw_min;
  shigh=sh_min;
  boddie.style.height=shigh+"px";
} 
// ]]>