/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./library','sap/ui/core/Control','sap/ui/core/IconPool'],function(q,l,C,I){"use strict";var P=C.extend("sap.m.Panel",{metadata:{library:"sap.m",properties:{headerText:{type:"string",group:"Data",defaultValue:""},width:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:"100%"},height:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:"auto"},expandable:{type:"boolean",group:"Appearance",defaultValue:false},expanded:{type:"boolean",group:"Appearance",defaultValue:false},expandAnimation:{type:"boolean",group:"Behavior",defaultValue:true},backgroundDesign:{type:"sap.m.BackgroundDesign",group:"Appearance",defaultValue:sap.m.BackgroundDesign.Translucent}},defaultAggregation:"content",aggregations:{content:{type:"sap.ui.core.Control",multiple:true,singularName:"content"},headerToolbar:{type:"sap.m.Toolbar",multiple:false},infoToolbar:{type:"sap.m.Toolbar",multiple:false}},events:{expand:{parameters:{expand:{type:"boolean"}}}},designTime:true}});P.prototype.init=function(){this.data("sap-ui-fastnavgroup","true",true);};P.prototype.setWidth=function(w){this.setProperty("width",w,true);var d=this.getDomRef();if(d){d.style.width=w;}return this;};P.prototype.setHeight=function(h){this.setProperty("height",h,true);var d=this.getDomRef();if(d){d.style.height=h;d.querySelector(".sapMPanelContent").style.height=h;this._setContentHeight();}return this;};P.prototype.onThemeChanged=function(){this._setContentHeight();};P.prototype.setExpandable=function(e){this.setProperty("expandable",e,false);if(e&&!this.oIconCollapsed){this.oIconCollapsed=this._createIcon();}return this;};P.prototype.setExpanded=function(e){if(e===this.getExpanded()){return this;}this.setProperty("expanded",e,true);if(!this.getExpandable()){return this;}this._getIcon().$().attr("aria-expanded",this.getExpanded());this._toggleExpandCollapse();this._toggleCssClasses();this.fireExpand({expand:e});return this;};P.prototype.onBeforeRendering=function(){this._updateIconAriaLabelledBy();};P.prototype.onAfterRendering=function(){var $=this.$(),a;this._setContentHeight();if(this.getExpandable()){a=this.oIconCollapsed.$();if(this.getExpanded()){a.attr("aria-expanded","true");}else{$.children(".sapMPanelExpandablePart").hide();a.attr("aria-expanded","false");}}};P.prototype.exit=function(){if(this.oIconCollapsed){this.oIconCollapsed.destroy();this.oIconCollapsed=null;}};P.prototype._createIcon=function(){var t=this,c=I.getIconURI("navigation-right-arrow");return I.createControlByURI({id:t.getId()+"-CollapsedImg",src:c,decorative:false,useIconTooltip:false,press:function(){t.setExpanded(!t.getExpanded());}}).addStyleClass("sapMPanelExpandableIcon");};P.prototype._getIcon=function(){return this.oIconCollapsed;};P.prototype._setContentHeight=function(){if(this.getHeight()==="auto"){return;}var t=this.getDomRef();var o=t.querySelector(".sapMPanelContent").offsetTop;var a=t.clientHeight-o;t.querySelector(".sapMPanelContent").style.height=a+'px';};P.prototype._toggleExpandCollapse=function(){var o={};if(!this.getExpandAnimation()){o.duration=0;}this.$().children(".sapMPanelExpandablePart").slideToggle(o);};P.prototype._toggleCssClasses=function(){var $=this.$();$.children(".sapMPanelWrappingDiv").toggleClass("sapMPanelWrappingDivExpanded");$.children(".sapMPanelWrappingDivTb").toggleClass("sapMPanelWrappingDivTbExpanded");$.find(".sapMPanelExpandableIcon").first().toggleClass("sapMPanelExpandableIconExpanded");};P.prototype._updateIconAriaLabelledBy=function(){var L,a;if(!this.oIconCollapsed){return;}L=this._getLabellingElementId();a=this.oIconCollapsed.getAriaLabelledBy();if(a.indexOf(L)===-1){this.oIconCollapsed.removeAllAssociation("ariaLabelledBy");this.oIconCollapsed.addAriaLabelledBy(L);}};P.prototype._getLabellingElementId=function(){var h=this.getHeaderToolbar(),i;if(h){i=h.getTitleId();}else{i=this.getId()+"-header";}return i;};return P;},true);
