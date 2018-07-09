/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5)

(c) Copyright 2009-2016 SAP SE. All rights reserved
 */
sap.ui.define(['sap/ui/rta/command/FlexCommand',"sap/ui/fl/changeHandler/UnstashControl"],function(F,U){"use strict";var a=F.extend("sap.ui.rta.command.Unstash",{metadata:{library:"sap.ui.rta",properties:{changeType:{type:"string",defaultValue:"unstashControl"},parentAggregationName:{type:"string",defaultValue:""},index:{type:"integer",defaultValue:0}},associations:{},events:{}}});a.prototype.init=function(){this.setChangeHandler(U);};a.prototype._getForwardFlexChange=function(e){return this._getFlexChange();};a.prototype._getBackwardFlexChange=function(e){return this._getFlexChange();};a.prototype._undoWithElement=function(e){e=sap.ui.getCore().byId(e.getId());this.setElement(e);e.setStashed(true);e.setVisible(false);};a.prototype._getFlexChange=function(f){var c=this._completeChangeContent({content:{parentAggregationName:this.getParentAggregationName(),index:this.getIndex()},changeType:this.getChangeType(),selectorElement:this.getElement()});return{change:c,selectorElement:this.getElement()};};a.prototype.serialize=function(){return{changeType:this.getChangeType(),selector:{id:this._getElement().getId()},content:{parentAggregationName:this.getParentAggregationName(),index:this.getIndex()}};};return a;},true);
