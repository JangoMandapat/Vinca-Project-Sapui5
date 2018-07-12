/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5)

(c) Copyright 2009-2016 SAP SE. All rights reserved
 */
sap.ui.define(['jquery.sap.global','sap/ui/rta/command/Move','sap/ui/rta/controlAnalyzer/ControlAnalyzerFactory'],function(q,M,C){"use strict";var S=M.extend("sap.ui.rta.command.SimpleFormMove",{metadata:{library:"sap.ui.rta",properties:{movedElements:{type:"array"},target:{type:"object"},source:{type:"object"},changeType:{type:"string",defaultValue:"moveElements"}},associations:{},events:{}}});S.prototype.prepareChange=function(f){f=f===undefined?true:f;var p=this.getPreparedChange(f);if(!p){var s=this._getSpecificChangeInfo(f);var c=this._completeChangeContent(s.data);p={change:c,selectorElement:s.sourceParent};this.setPreparedChange(p,f);}return p;};return S;},true);
