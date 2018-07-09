/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

		(c) Copyright 2009-2015 SAP SE. All rights reserved
	
 */
sap.ui.define([],function(){"use strict";var F=function(){throw new Error();};F.abapTimestampToDate=function(t){if(typeof t==="string"){var d=new Date(t.substr(0,4),parseInt(t.substr(4,2),0)-1,t.substr(6,2),t.substr(8,2),t.substr(10,2),t.substr(12,2));if(!jQuery.isNumeric(d.getTime())){d=new Date(t);}return d;}else if(jQuery.type(t)==="date"){return t;}return null;};F.dateToAbapTimestamp=function(d){return""+d.getFullYear()+(d.getMonth()<9?"0":"")+(d.getMonth()+1)+(d.getDate()<10?"0":"")+d.getDate()+(d.getHours()<10?"0":"")+d.getHours()+(d.getMinutes()<10?"0":"")+d.getMinutes()+(d.getSeconds()<10?"0":"")+d.getSeconds();};F.abapTimestampToTimeLabel=function(t,l){var a=sap.gantt.misc.Format._convertUTCToLocalTime(t,l);var f=sap.ui.core.format.DateFormat.getDateTimeInstance();var L=f.format(a);return L;};F._convertUTCToLocalTime=function(t,l){var a=0;if(l&&l.getUtcdiff()){var f=d3.time.format("%Y%m%d%H%M%S");a=Math.round((f.parse("20000101"+l.getUtcdiff()).getTime()-f.parse("20000101000000").getTime())/1000);if(l.getUtcsign()==="-"){a=-a;}}var u=sap.gantt.misc.Format.abapTimestampToDate(t);var b=d3.time.second.offset(u,a);var d=l.getDstHorizons();if(d.length>0){for(var i=0;i<d.length;i++){var s=sap.gantt.misc.Format.abapTimestampToDate(d[i].getStartTime());var e=sap.gantt.misc.Format.abapTimestampToDate(d[i].getEndTime());if(b>=s&&b<=e){b=d3.time.second.offset(b,60*60);}}}return b;};return F;},true);
