/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global'],function(q){"use strict";var H={};H.applyChange=function(c,C,m,v){var o=c.getDefinition();var h=o.content.sHideId;var a=m.byId(h,v);var b=m.getAggregation(C,"content");var s=-1;if(o.changeType==="hideSimpleFormField"){b.some(function(f,i){if(f===a){s=i;m.setVisible(f,false);}if(s>=0&&i>s){if((m.getControlType(f)==="sap.m.Label")||(m.getControlType(f)==="sap.ui.core.Title")||(m.getControlType(f)==="sap.m.Title")||(m.getControlType(f)==="sap.m.Toolbar")){return true;}else{m.setVisible(f,false);}}});}else if(o.changeType==="removeSimpleFormGroup"){b.some(function(f,i){if(f===a){s=i;}if(s>=0&&i>s){if((m.getControlType(f)==="sap.ui.core.Title")||(m.getControlType(f)==="sap.m.Title")||(m.getControlType(f)==="sap.m.Toolbar")){if(s===0){m.removeAggregation(C,"content",f,v);m.insertAggregation(C,"content",f,0,v);}return true;}else{m.setVisible(f,false);}}});m.removeAggregation(C,"content",a,v);}return true;};H.completeChangeContent=function(c,s){var C=c.getDefinition();if(s.sHideId){C.content.sHideId=s.sHideId;}else{throw new Error("oSpecificChangeInfo.sHideId attribute required");}};return H;},true);