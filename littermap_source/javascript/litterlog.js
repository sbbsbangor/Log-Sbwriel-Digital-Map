// LitterLog mapping code library.
// Programmed by Andrew Thomas June to August 2014.
// Copyright 2014 Snowdonia Society, SBBSBangor and Andrew Thomas.
// Based on previous code by Andrew Thomas (rights reserved).
// See accompanying license information.
// For use with Processing.js (see html file).
// For more details visit: https://github.com/sbbsbangor

// TODO: More functionality and filtering, and CSS table layouts.

var map;
var markers=[];
var mapcen=new google.maps.LatLng(0,0);
var mw=100;
var mh=10;
var minimumZoom=0;
var maximumZoom=100;
var startZoom=5;
var csvfile="litterlog.csv"; // Default, can be changed in html file
var language=0; // 0=Welsh 1=English
var WELSH=0;
var ENGLISH=1;
var litternums=new Array(12);
var etitle="Litter Log";
var wtitle="Log sbwriel";
var filter=0;
var ltypes=[];
var wltypes=new Array(12);
    wltypes[0]="Potel blastig ddiod ysgafn";
    wltypes[1]="Potel wydr ddiod ysgafn";
    wltypes[2]="Can diod ysgafn";
    wltypes[3]="Potel blastig ddiod alcoholig";
    wltypes[4]="Potel wydr ddiod alcoholig";
    wltypes[5]="Can ddiod alcoholig";
    wltypes[6]="Eitem bwyd cyflym";
    wltypes[7]="Baw ci";
    wltypes[8]="Bag baw ci";
    wltypes[9]="Eitem ysmygu";
    wltypes[10]="Ffrwythau";
    wltypes[11]="Arall";
var eltypes=new Array(12);
    eltypes[0]="Plastic bottle soft";
    eltypes[1]="Glass bottle soft";
    eltypes[2]="Drinks can soft";
    eltypes[3]="Plastic bottle alcohol";
    eltypes[4]="Glass bottle alcohol";
    eltypes[5]="Drinks can alcohol";
    eltypes[6]="Fast food item";
    eltypes[7]="Dog poo";
    eltypes[8]="Dog poo bag";
    eltypes[9]="Smoking item";
    eltypes[10]="Fruit";
    eltypes[11]="Other";

function finishmap()
{
  updateinfowindows();
  centermarkers();
  settitle();
  setverticallittertable();
  sethorizontallittertable();
  setlitterfilter();
  setlanguageicon();
}

function togglelanguage()
{
  if(language==0)
  {
    language=1;
    ltypes=eltypes;
  }
  else
  {
    language=0;
    ltypes=wltypes;
  }
  closeinfowindows();
  updateinfowindows();
  setverticallittertable();
  sethorizontallittertable();
  setlitterfilter();
  settitle();
  setlanguageicon();
}

function filterdropped()
{
  var cd=document.getElementById("ldd");
  filter=cd.selectedIndex;
  if(filter==0) showalllitter();
  else litterfilter(filter-1);
}

function setlitterfilter()
{
  var txt;
  txt='<select id="ldd" onChange="filterdropped();">';
  txt+="<option value=0"
  if(filter==0) txt+=" selected";
  if(language==0) txt+=">Pob sbwriel</option>";
  else txt+=">All litter</option>";
  for(var c=0;c<ltypes.length;c++)
  {
    txt+='<option value="'+(c+1)+'"';
    if((c+1)==filter) txt+=' selected';
    txt+='>'+ltypes[c]+'</option>';
  }
  txt+='</select>';
  var ht=document.getElementById("litter-filter");
  if(ht!=null) ht.innerHTML=txt;
}

function setlanguageicon()
{
  var txt="<img src=\"";
  if(language==0) txt+="./images/saesneg.jpg";
  else txt+="./images/cymraeg.jpg";
  txt+="\" onClick=\"togglelanguage();\" />";
  var ht=document.getElementById("litter-language");
  if(ht!=null) ht.innerHTML=txt;
}

function setzooms(sz,minz,maxz)
{
  minimumZoom=minz;
  maximumZoom=maxz;
  map.setZoom(sz);
}

function mapcenter(mylat,mylong)
{
  mapcen=new google.maps.LatLng(mylat,mylong);
  map.setCenter(mapcen);
}

function centermarkers()
{
  var maxlat,minlat,maxlong,minlong;
  minlat=markers[0].position.lat();
  maxlat=markers[0].position.lat();
  minlong=markers[0].position.lng();
  maxlong=markers[0].position.lng();
  for(var c=1;c<markers.length;c++)
  {
    if(markers[c].position.lat()<minlat) minlat=markers[c].position.lat();
    if(markers[c].position.lat()>maxlat) maxlat=markers[c].position.lat();
    if(markers[c].position.lng()<minlong) minlong=markers[c].position.lng();
    if(markers[c].position.lng()>maxlong) maxlong=markers[c].position.lng();
  }
  mapcenter((maxlat+minlat)/2,(maxlong+minlong)/2);
}

function mapsize(w,h)
{
  mw=w;
  mh=h;
  mapresize();
}

function addLitterMarker(mylat,mylong,littertype)
{
  var location=new google.maps.LatLng(mylat,mylong);
  var mymkr=new google.maps.MarkerImage("./markers/m"+littertype+".png",null,null,null,new google.maps.Size(25,25));
  var marker=new google.maps.Marker({
    position: location,
    icon: mymkr,
    ltype: littertype,
    map: map});
  google.maps.event.addListener(marker,'click',function(){
      closeinfowindows();
      marker.info.open(map,marker);
      });
  var minfo=ltypes[marker.ltype];
  marker.info=new google.maps.InfoWindow({content: minfo});
  markers.push(marker);
  litternums[littertype]++;
}

function updateinfowindows()
{
  for(c=0;c<markers.length;c++)
  {
    var minfo=ltypes[markers[c].ltype];
    markers[c].info.content=minfo;
  }
}

function showalllitter()
{
  closeinfowindows();
  for(var c=0;c<markers.length;c++) markers[c].setMap(map);
}

function litterfilter(littertype)
{
  closeinfowindows();
  for(var c=0;c<markers.length;c++)
  {
    if(markers[c].ltype==littertype) markers[c].setMap(map);
    else markers[c].setMap(null);
  }
}

function settitle()
{
  var txt;
  txt="<h2 style=\"text-align:center;font-weight:bold;\">";
  if(language==0) txt+=wtitle;
  else txt+=etitle;
  txt+=" ("+csvfile+")";
  txt+="</h2>";
  var ht=document.getElementById("litter-title");
  if(ht!=null) ht.innerHTML=txt;
}

function cleartitle()
{
  var ht=document.getElementById("litter-title");
  if(ht!=null) ht.innerHTML="";
}

function setverticallittertable()
{
  var tot=0;
  if(language==0)
    var txt="<table border=\"0\" cellpadding=\"5\"><tr><td style=\"font-weight:bold;\">Categori sbwriel</tf><td style=\"text-align:center;font-weight:bold;\">Rhif</td></tr>";
  else
    var txt="<table border=\"0\" cellpadding=\"5\"><tr><td style=\"font-weight:bold;\">Litter category</tf><td style=\"text-align:center;font-weight:bold;\">Number</td></tr>";
  for(var c=0;c<12;c++)
    txt+="<tr><td style=\"font-weight:normal;\">"+ltypes[c]+"</td><td style=\"text-align:center;font-weight:normal;\">"+litternums[c]+"</td></tr>";
  for(var c=0;c<12;c++) tot+=litternums[c];
  if(language==0)
    txt+="<tr><td style=\"text-align:right;font-weight:bold;\">Cyfanswm</td><td style=\"text-align:center;font-weight:bold;\">"+tot+"</td></tr>";
  else
    txt+="<tr><td style=\"text-align:right;font-weight:bold;\">Total</td><td style=\"text-align:center;font-weight:bold;\">"+tot+"</td></tr>";
  txt+="</table>";
  var ht=document.getElementById("litter-table-vertical");
  if(ht!=null) ht.innerHTML=txt;
}

function sethorizontallittertable()
{
  var tot=0;
  var txt="<table border=\"0\" cellpadding=\"5\"><tr>";
  if(language==0)
  {
    txt+="<td style=\"font-weight:bold;\">Categori sbwriel</tf><td style=\"text-align:center;font-weight:bold;\">Rhif</td>";
    txt+="<td style=\"font-weight:bold;\">Categori sbwriel</tf><td style=\"text-align:center;font-weight:bold;\">Rhif</td>";
    txt+="<td style=\"font-weight:bold;\">Categori sbwriel</tf><td style=\"text-align:center;font-weight:bold;\">Rhif</td>";
  }
  else
  {
    txt+="<td style=\"font-weight:bold;\">Litter category</tf><td style=\"text-align:center;font-weight:bold;\">Number</td>";
    txt+="<td style=\"font-weight:bold;\">Litter category</tf><td style=\"text-align:center;font-weight:bold;\">Number</td>";
    txt+="<td style=\"font-weight:bold;\">Litter category</tf><td style=\"text-align:center;font-weight:bold;\">Number</td>";
  }
  txt+="</tr>";
  for(var c=0;c<4;c++)
  {
    txt+="<tr>";
    txt+="<td style=\"font-weight:normal;\">"+ltypes[c]+"</td><td style=\"text-align:center;font-weight:normal;\">"+litternums[c]+"</td>";
    txt+="<td style=\"font-weight:normal;\">"+ltypes[c+4]+"</td><td style=\"text-align:center;font-weight:normal;\">"+litternums[c+4]+"</td>";
    txt+="<td style=\"font-weight:normal;\">"+ltypes[c+8]+"</td><td style=\"text-align:center;font-weight:normal;\">"+litternums[c+8]+"</td>";
    txt+="</tr>";
  }
  for(var c=0;c<12;c++) tot+=litternums[c];
  if(language==0)
    txt+="<tr><td colspan=\"4\"></td><td style=\"text-align:right;font-weight:bold;\">Cyfanswm</td><td style=\"text-align:center;font-weight:bold;\">"+tot+"</td></tr>";
  else
    txt+="<tr><td colspan=\"4\"></td><td style=\"text-align:right;font-weight:bold;\">Total</td><td style=\"text-align:center;font-weight:bold;\">"+tot+"</td></tr>";
  txt+="</table>";
  var ht=document.getElementById("litter-table-horizontal");
  if(ht!=null) ht.innerHTML=txt;
}

function clearlittertable()
{
  ht=document.getElementById("litter-table-vertical");
  if(ht!=null) ht.innerHTML="";
}

function closeinfowindows()
{
  for(var i=0;i<markers.length;i++) if(markers[i].info!=null) markers[i].info.close();
}

function clearmarkers()
{
  markers=null;
  for(var c=0;c<12;c++) litternums[c]=0;
}

function setlanguage(lang)
{
  language=lang;
  if(lang==0) ltypes=wltypes;
  else ltypes=eltypes;
}

function initialize()
{
  var mapOptions=
  {
    zoom: startZoom,
    minZoom: minimumZoom,
    maxZoom: maximumZoom,
    center: mapcen,
    mapTypeId: google.maps.MapTypeId.SATELLITE
  };
  map=new google.maps.Map(document.getElementById('map-canvas'),mapOptions);
  google.maps.event.addListener(map,'zoom_changed',function()
  {
    if(map.getZoom()<minimumZoom) map.setZoom(minimumZoom);
    if(map.getZoom()>maximumZoom) map.setZoom(maximumZoom);
  });
  if(language==0) ltypes=wltypes;
  else ltypes=eltypes;
  for(var c=0;c<12;c++) litternums[c]=0;
}

function mapresize()
{
  con=document.getElementById("map-canvas");
  con.style.height=mh+"px";
  con.style.width=mw+"px";
  google.maps.event.trigger(map,"resize");
}

window.onresize=function(event)
{
  mapresize();
}

function theorientationchanged()
{
  mapresize();
}

google.maps.event.addDomListener(window,'load',initialize);
window.addEventListener('orientationchange',theorientationchanged);
