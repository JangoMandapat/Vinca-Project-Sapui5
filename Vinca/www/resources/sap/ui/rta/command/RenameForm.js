/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5)

(c) Copyright 2009-2016 SAP SE. All rights reserved
 */
sap.ui.define(['jquery.sap.global','sap/ui/rta/command/Rename','sap/ui/rta/controlAnalyzer/ControlAnalyzerFactory',"sap/ui/fl/Change"],function(q,R,C,a){"use strict";var b=R.extend("sap.ui.rta.command.RenameForm",{metadata:{library:"sap.ui.rta",properties:{originalElement:{type:"object"}},associations:{},events:{}}});b.prototype._getSpecificChangeInfo=function(f){var e=this.getElement();var s={};s.selector={};s.selector.id=e.getId();s.value=f?this.getNewValue():this.getOldValue();s.changeType=this.getChangeType();s.sRenameId=this.getOriginalElement().getId();return s;};b.prototype._rememberOldValue=function(){var t=this.getOriginalElement().getText();if(t!==null){this.setOldValue(t);}};b.prototype._undoWithElement=function(e){R.prototype._undoWithElement.apply(this,arguments);var c=C.getControlAnalyzerFor(e);var B="";if(c){var o=this.getOriginalElement();var d=c.getLabelBinding(o);if(d){B=d.binding.getValue();if(B===this.getOldValue()){c.resumeLabelBinding(o);}}}};return b;},true);
