/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5)

(c) Copyright 2009-2016 SAP SE. All rights reserved
 */
sap.ui.define(['jquery.sap.global','sap/ui/rta/command/FlexCommand','sap/ui/rta/controlAnalyzer/ControlAnalyzerFactory'],function(q,F,C){"use strict";var A=F.extend("sap.ui.rta.command.AddSmart",{metadata:{library:"sap.ui.rta",properties:{source:{type:"object"},index:{type:"number"},newControlId:{type:"string"},labels:{type:"array"},jsTypes:{type:"array"},fieldValues:{type:"array"},valuePropertys:{type:"array"}},associations:{},events:{}}});A.prototype._getSpecificChangeInfo=function(){var s={changeType:this.getChangeType(),selector:{id:this._getElement().getId()},index:this.getIndex(),newControlId:this.getNewControlId(),labels:this.getLabels()};if(this.getJsTypes()){s.jsTypes=this.getJsTypes();}if(this.getFieldValues()){s.fieldValues=this.getFieldValues();}if(this.getValuePropertys()){s.valueProperty=this.getValuePropertys();}var c=C.getControlAnalyzerFor(this._getElement());if(c){s=c.mapSpecificChangeData("Add",s);}return s;};A.prototype._getFlexChange=function(){var s=this._getSpecificChangeInfo();var c=this._completeChangeContent(s);return{change:c,selectorElement:this._getElement()};};A.prototype._getForwardFlexChange=function(e){return this._getFlexChange();};A.prototype.undo=function(){var a=this.getNewControlId();var o=sap.ui.getCore().byId(a);if(o){o.destroy();}};A.prototype.serialize=function(){return this._getSpecificChangeInfo();};return A;},true);
