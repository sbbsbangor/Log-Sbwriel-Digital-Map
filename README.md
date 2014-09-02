#Log Sbwriel digital map visualisation example

##Introduction

Log Sbwriel (Welsh for Litter Log) was created to help empower Welsh Citizen Scientists to undertake surveys and share data on litter types and locations wherever they feel it important to do so, but particularly in the beautiful Snowdonia National Park area of North Wales. It was therefore developed as a collaboration between the Snowdonia Society (http://www.snowdonia-society.org.uk) and SBBS Bangor (www.sbbs.org.uk).

This repository contains files that allow simple and quick visualisation of Log Sbwriel litter survey data, although it could be adapted to use litter data in another format if that’s what you need. The visualisation is map based, using the Google Maps API, custom litter-type icons, some Processing.js code and a simple Javascript library to accompany it. Log Sbwriel survey data can therefore be displayed in a web page as icons on a map and as a table of type/value combinations, with a drop down list to filter the litter types displayed on the map.

Being based on ProcessingJS (www.processingjs.org) the Log Sbwriel visualisation should be fairly easy for beginner-programmers to explore, as well as simple to adapt for more complex visualisation needs. Also, the code is written to provide bilingual (Welsh and English) web page visualisation elements, as SBBS Bangor are located in North Wales. If you live outside of Wales then it should be straightforward for you to edit the text descriptions in our Javascript file to your own language.

For full details of the Log Sbwriel app please look at this page on our GitHub repository: https://github.com/sbbsbangor/androidlitterlogger. And to get the Log Sbwriel Android app code and files please visit this page: https://github.com/sbbsbangor/Log-Sbwriel-Android-App.

To read more information about the Snowdonia Society’s Snowdon Tidy initiative please visit this page: http://www.snowdonia-society.org.uk/news.php?n_id=443.

##Setting up your litter web pages

If you’re new to this and want a quick start, simply copy all of the files in the source code folder to a folder on your website and replace the ‘litterlog.csv’ file with your own Log Sbwriel file (renaming it to ‘litterlog.csv’ of course). Then the web page should find your survey when you open it in a browser. If you’re more advanced, or want to make multiple pages for multiple surveys, you can then read the information below.

If you open our example web page (littertest.html) with a HTML or plain-text editor you’ll see some computer code about halfway down. To set the page to display your own litter log you need to edit some lines. The ones you might need to know about, and what to do with them, are listed below.

**csvfile=“litterlog.csv”;** Just change the CSV file name to whatever your litter logging file is named, keeping the .csv bit on the end. Your file needs to be on your website with the web page.

**setlanguage(WELSH);** By default the web page uses Welsh, but you can change WELSH to ENGLISH if you prefer.

**size(1,1);** This is the size of the processing.js canvas, but should be left like this unless you know processing.js and need a HTML5 canvas to program some extra visualisation on.

**mapsize(700,500);** This sets the size of the map in pixels. You can change it so the map looks good in your webpage.

**addlitter();** Keep this line as is, as it calls the function that adds your log to the map. Without it you’ll just have a map, with no litter icons.

**setzooms(17,15,21);** This line sets the zoom levels for the map. The first number is the starting zoom level of the map, the other two are the minimum and maximum zoom levels that the map can be adjusted to using its controls. You may want to play with these to suit the size of your survey, although for most smaller areas these should work OK.

**finishmap();** Keep this line as is, as it finishes everything off to display your litter logging map properly.

If you’re a more advanced javascript/processing user, or after some practice, it isn’t too difficult to adapt the web page and code to dynamically change between different survey log files (e.g. with links or a drop down list). In fact, the code has been written to make it easy to change the way things work to what you’d like to do.

##Elements you can include in your web pages

As well as the map and Processing.js canvasses that you’ll see in the sample web page we’ve provided here (littertest.html) there are a few elements we’ve created in there that are specific to litter log visualising. They are a text title including your CSV file name, an image button to change between Welsh (default) and English, a drop down list to refine the litter types shown on the map, and two different table layouts to show your litter survey results (a horizontal and vertical layout).

All you need do in order to lay out your web page is put the lines below where you want them in your web page code using a HTML editor. If you’re new to this we suggest you use our example web page as a guide. Of course, you can also place the map and processing.js canvasses where you want them positioned too, although the processing.js one won’t show anything unless you decide to edit the code to use it to add to the visualisation. All of the HTML code to add the javascript files and canvasses can be found in our example web page.

```html
<div id="litter-title"></div>
<div id="litter-language"></div>
<div id="litter-filter"></div>
<div id="litter-table-horizontal""></div>
<div id="litter-table-vertical”></div>
```

##Credits

The Log Sbwriel litter map was created as a collaboration between the Snowdonia Society and SBBS Bangor. Development, programming and graphics by Dr Andrew Thomas. Copyright 2014 Snowdonia Society, SBBSBangor and Andrew Thomas.

