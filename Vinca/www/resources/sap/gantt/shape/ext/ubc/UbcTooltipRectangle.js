/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

		(c) Copyright 2009-2015 SAP SE. All rights reserved
	
 */
sap.ui.define(["sap/gantt/misc/Utility","sap/gantt/misc/Format","sap/gantt/shape/Rectangle"],function(U,F,R){"use strict";var a=R.extend("sap.gantt.shape.ext.ubc.UbcTooltipRectangle",{});a.prototype.init=function(){this._oRb=sap.ui.getCore().getLibraryResourceBundle("sap.gantt");};a.prototype.getEnableSelection=function(d,r){if(this.mShapeConfig.hasShapeProperty("enableSelection")){return this._configFirst("enableSelection",d);}return false;};a.prototype.getX=function(d,r){if(this.mShapeConfig.hasShapeProperty("x")){return this._configFirst("x",d);}var A=this.mChartInstance.getAxisTime();var x=A.timeToView(F.abapTimestampToDate(d.start_date)).toFixed(1);if(!jQuery.isNumeric(x)){x=this.axisTime.timeToView(0).toFixed(1);}return x;};a.prototype.getY=function(d,r){if(this.mShapeConfig.hasShapeProperty("y")){return this._configFirst("y",d);}return r.y;};a.prototype.getWidth=function(d,r){if(this.mShapeConfig.hasShapeProperty("width")){return this._configFirst("width",d);}var w,s,e;var A=this.mChartInstance.getAxisTime();s=A.timeToView(F.abapTimestampToDate(d.start_date)).toFixed(1);e=A.timeToView(F.abapTimestampToDate(d.end_date)).toFixed(1);if(!jQuery.isNumeric(s)){s=this.axisTime.timeToView(0).toFixed(1);}if(!jQuery.isNumeric(e)){e=this.axisTime.timeToView(0).toFixed(1);}w=(e-s>0)?(e-s):(s-e);if((w===0)||!jQuery.isNumeric(w)){w=1;}return w;};a.prototype.getHeight=function(d,r){if(this.mShapeConfig.hasShapeProperty("height")){return this._configFirst("height",d);}return r.rowHeight-1;};a.prototype.getStrokeOpacity=function(d,r){if(this.mShapeConfig.hasShapeProperty("strokeOpacity")){return this._configFirst("strokeOpacity",d);}return 0;};a.prototype.getFillOpacity=function(d,r){if(this.mShapeConfig.hasShapeProperty("fillOpacity")){return this._configFirst("fillOpacity",d);}return 0;};a.prototype.getTitle=function(d,r){if(this.mShapeConfig.hasShapeProperty("title")){return this._configFirst("title",d);}var b=this._oRb.getText("TLTP_CAPACITY",[d.supply,d.demand]);if(d.demand>d.supply){b+=this._oRb.getText("TLTP_OVER_CAPACITY",[d.demand-d.supply]);}return b;};return a;},true);
