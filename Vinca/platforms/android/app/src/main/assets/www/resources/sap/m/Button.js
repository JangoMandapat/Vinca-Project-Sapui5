/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./library','sap/ui/core/Control','sap/ui/core/EnabledPropagator','sap/ui/core/IconPool'],function(q,l,C,E,I){"use strict";var B=C.extend("sap.m.Button",{metadata:{library:"sap.m",properties:{text:{type:"string",group:"Misc",defaultValue:null},type:{type:"sap.m.ButtonType",group:"Appearance",defaultValue:sap.m.ButtonType.Default},width:{type:"sap.ui.core.CSSSize",group:"Misc",defaultValue:null},enabled:{type:"boolean",group:"Behavior",defaultValue:true},icon:{type:"sap.ui.core.URI",group:"Appearance",defaultValue:null},iconFirst:{type:"boolean",group:"Appearance",defaultValue:true},activeIcon:{type:"sap.ui.core.URI",group:"Misc",defaultValue:null},iconDensityAware:{type:"boolean",group:"Misc",defaultValue:true},textDirection:{type:"sap.ui.core.TextDirection",group:"Appearance",defaultValue:sap.ui.core.TextDirection.Inherit}},associations:{ariaDescribedBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaDescribedBy"},ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{tap:{deprecated:true},press:{}}}});E.call(B.prototype);B.prototype.exit=function(){if(this._image){this._image.destroy();}if(this._iconBtn){this._iconBtn.destroy();}};B.prototype.onBeforeRendering=function(){this._bRenderActive=this._bActive;};B.prototype.onAfterRendering=function(){if(this._bRenderActive){this._activeButton();this._bRenderActive=this._bActive;}};B.prototype.ontouchstart=function(e){e.setMarked();if(this._bRenderActive){delete this._bRenderActive;}if(e.targetTouches.length===1){this._activeButton();}};B.prototype.ontouchend=function(e){this._inactiveButton();if(this._bRenderActive){delete this._bRenderActive;if(e.originalEvent&&e.originalEvent.type in{mouseup:1,touchend:1}){this.ontap(e);}}};B.prototype.ontouchcancel=function(){this._inactiveButton();};B.prototype.ontap=function(e){e.setMarked();if(this.getEnabled()&&this.getVisible()){if(e.originalEvent&&e.originalEvent.type==="touchend"){this.focus();}this.fireTap({});this.firePress({});}};B.prototype.onkeydown=function(e){if(e.which===q.sap.KeyCodes.SPACE||e.which===q.sap.KeyCodes.ENTER){e.setMarked();this._activeButton();}};B.prototype.onkeyup=function(e){if(e.which===q.sap.KeyCodes.SPACE||e.which===q.sap.KeyCodes.ENTER){e.setMarked();this._inactiveButton();this.firePress({});}};B.prototype.onfocusout=function(){this._inactiveButton();};B.prototype._activeButton=function(){if(!this._isUnstyled()){this.$("inner").addClass("sapMBtnActive");}this._bActive=this.getEnabled();if(this._bActive){if(this.getIcon()&&this.getActiveIcon()&&this._image){this._image.setSrc(this.getActiveIcon());}}};B.prototype._inactiveButton=function(){if(!this._isUnstyled()){this.$("inner").removeClass("sapMBtnActive");}this._bActive=false;if(this.getEnabled()){if(this.getIcon()&&this.getActiveIcon()&&this._image){this._image.setSrc(this.getIcon());}}};B.prototype._isHoverable=function(){return this.getEnabled()&&sap.ui.Device.system.desktop;};B.prototype._getImage=function(i,s,a,b){if(this._image&&(this._image.getSrc()!==s)){this._image.destroy();this._image=undefined;}var o=this._image;var c=this.getIconFirst();if(!!o){o.setSrc(s);if(o instanceof sap.m.Image){o.setActiveSrc(a);o.setDensityAware(b);}}else{o=I.createControlByURI({id:i,src:s,activeSrc:a,densityAware:b,useIconTooltip:false},sap.m.Image).addStyleClass("sapMBtnCustomIcon").setParent(this,null,true);}o.addStyleClass("sapMBtnIcon");o.toggleStyleClass("sapMBtnIconLeft",c);o.toggleStyleClass("sapMBtnIconRight",!c);this._image=o;return this._image;};B.prototype._getInternalIconBtn=function(i,s){var o=this._iconBtn;if(o){o.setSrc(s);}else{o=I.createControlByURI({id:i,src:s,useIconTooltip:false},sap.m.Image).setParent(this,null,true);}o.addStyleClass("sapMBtnIcon");o.addStyleClass("sapMBtnIconLeft");this._iconBtn=o;return this._iconBtn;};B.prototype._isUnstyled=function(){var u=false;if(this.getType()===sap.m.ButtonType.Unstyled){u=true;}return u;};B.prototype.setText=function(t){var v=this.getText();if(t===null||t===undefined){t="";}if(v!==t){var d=this.getDomRef("content");var s=!!d;this.setProperty("text",t,s);if(s){t=this.getText();d.innerHTML=q.sap.encodeHTML(t);this.$("inner").toggleClass("sapMBtnText",!!t);}}return this;};B.prototype.setIcon=function(i){var v=this.getIcon()||"";i=i||"";if(v!==i){var s=!!v&&!!i&&I.isIconURI(i)===I.isIconURI(v);this.setProperty("icon",i,s);if(s&&this._image){this._image.setSrc(i);}}return this;};B.prototype.getPopupAnchorDomRef=function(){return this.getDomRef("inner");};B.prototype._getText=function(){return this.getText();};B.prototype.setType=function(t){this.setProperty("type",t);var T="";var r;switch(t){case sap.m.ButtonType.Accept:if(!sap.m.Button._oStaticAcceptText){r=sap.ui.getCore().getLibraryResourceBundle("sap.m");T=r.getText("BUTTON_ARIA_TYPE_ACCEPT");sap.m.Button._oStaticAcceptText=new sap.ui.core.InvisibleText({text:T});sap.m.Button._oStaticAcceptText.toStatic();}break;case sap.m.ButtonType.Reject:if(!sap.m.Button._oStaticRejectText){r=sap.ui.getCore().getLibraryResourceBundle("sap.m");T=r.getText("BUTTON_ARIA_TYPE_REJECT");sap.m.Button._oStaticRejectText=new sap.ui.core.InvisibleText({text:T});sap.m.Button._oStaticRejectText.toStatic();}break;case sap.m.ButtonType.Emphasized:if(!sap.m.Button._oStaticEmphasizedText){r=sap.ui.getCore().getLibraryResourceBundle("sap.m");T=r.getText("BUTTON_ARIA_TYPE_EMPHASIZED");sap.m.Button._oStaticEmphasizedText=new sap.ui.core.InvisibleText({text:T});sap.m.Button._oStaticEmphasizedText.toStatic();}break;default:break;}return this;};B.prototype.getAccessibilityInfo=function(){var d=this.getText()||this.getTooltip_AsString();if(!d&&this.getIcon()){var i=sap.ui.core.IconPool.getIconInfo(this.getIcon());if(i){d=i.text||i.name;}}return{role:"button",type:sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("ACC_CTR_TYPE_BUTTON"),description:d,focusable:this.getEnabled(),enabled:this.getEnabled()};};return B;},true);
