(function(){"use strict";var I=72,a=56,b=40,c=60,d=48,C=27,f=8,g=8,h=8,L=8,l=8,O="ovpLinkList",P="pictureCarousel",m="ovpCardHeader";var D={onBeforeRendering:function(e){this.itemOnBeforeRendering(e);}};var o={onAfterRendering:function(e){this.itemOnAfterRendering(e);}};sap.ui.controller("sap.ovp.cards.linklist.LinkList",{onInit:function(){this._bInitialLoad=true;},onBeforeRendering:function(e){var i=this.getCardPropertiesModel();if(i.getProperty("/listFlavor")==="standard"&&!i.getProperty("/staticContent")){var j=this.byId("ovpCLI");if(j){j.addEventDelegate(D,this);}}},onAfterRendering:function(e){var i=this.getCardPropertiesModel();var r=i.getProperty("/cardLayout/rowSpan");var j=i.getProperty("/cardLayout/colSpan");switch(i.getProperty("/listFlavor")){case"standard":if(i.getProperty("/staticContent")){if(j&&r){this._itemOnEventBuildStandard(i,j,r,true);}else{this._aLinkListIds=[O];this._setListColumnWidthInStandardCard(1);}}break;case"carousel":if(i.getProperty("/staticContent")){if(r){this._setListHeightInCarouselCard(r);}this._setCarouselImageProperties();}else{var k=this.byId(P);k.addEventDelegate(o,this);}break;case"grid":jQuery.sap.log.info("FYI: currently nothing special to handle here");break;}},itemOnBeforeRendering:function(e){var i=this.getCardPropertiesModel();switch(i.getProperty("/listFlavor")){case"standard":var r=i.getProperty("/cardLayout/rowSpan");var k=i.getProperty("/cardLayout/colSpan");var n=this.byId(O);var p=n.getItems();for(var j=0;j<p.length;j++){p[j].removeEventDelegate(D);}if(this._bInitialLoad){this._itemOnEventBuildStandard(i,k,r,true);}else{this._itemOnEventBuildStandard(i,k,r,false);}break;case"carousel":jQuery.sap.log.info("FYI: currently nothing special to handle here");break;case"grid":jQuery.sap.log.info("FYI: currently nothing special to handle here");break;}},itemOnAfterRendering:function(E){var i=this.getCardPropertiesModel();var r=i.getProperty("/cardLayout/rowSpan");var j=i.getProperty("/cardLayout/colSpan");switch(i.getProperty("/listFlavor")){case"standard":try{var k=this.byId(O);var n=k.getItems(this._aLinkListIds[this._aLinkListIds.length-1]);n[n.length-1].removeEventDelegate(o);}catch(e){jQuery.sap.log.info("FYI: Unable to remove the delagted event at the last item of the last list");}if(r){this._setListHeightInStandardCard(r);}if(j){this._setListColumnWidthInStandardCard(j);}else{this._setListColumnWidthInStandardCard(1);}break;case"carousel":try{var p=this.byId(P);p.removeEventDelegate(o);}catch(e){jQuery.sap.log.info("FYI: Unable to remove the delagted event on the carousel");}if(r){this._setListHeightInCarouselCard(r);}this._setCarouselImageProperties();break;case"grid":jQuery.sap.log.info("FYI: currently nothing special to handle here");break;}},_itemOnEventBuildStandard:function(k,n,r,p){var q;var s=this.byId(O);if(p&&this._oListRest===undefined){this._oListRest=new sap.m.List(this.getView().getId()+"--RestOfData",{});}this._aLinkListIds=[O];this._iAvailableItems=s.getItems().length;var t=k.getProperty("/cardLayout/items");if(t!==undefined){this._iNoOfItemsPerColumn=t;q=t;this._iVisibleColums=1;}else{var u=I;try{u=this._getLinkListItemHeight();}catch(e){jQuery.sap.log.info("Error: "+e);}var v=this._getListHeightInStandardCard(r);this._iNoOfItemsPerColumn=Math.floor(v/u);var N=Math.ceil(this._iAvailableItems/this._iNoOfItemsPerColumn);this._iVisibleColums=Math.min(N,n);q=this._iVisibleColums*this._iNoOfItemsPerColumn;}if(q>this._iAvailableItems){q=this._iAvailableItems;}else{for(var i=q;i<this._iAvailableItems;i++){this._oListRest.addItem(s.getItems()[q]);}}if(this._iVisibleColums>1){var w=this.byId("ovpListRow");var x=this._iNoOfItemsPerColumn;var y=0;for(var j=this._iNoOfItemsPerColumn;j<q;j++){if(x>=this._iNoOfItemsPerColumn){x=0;y++;var z=O+y;var A=new sap.m.List(this.getView().getId()+"--"+z,{showSeparators:s.getProperty("showSeparators")});this._aLinkListIds.push(z);if(s.hasStyleClass("_iNoOfItemsPerColumnPaddingCozy")){A.addStyleClass("sapOvpLinkListStandardPaddingCozy");}else{A.addStyleClass("sapOvpLinkListStandardPaddingCompact");}w.addItem(A);}A.addItem(s.getItems()[this._iNoOfItemsPerColumn]);x++;}var B=A.getItems();B[B.length-1].addEventDelegate(o,this);}else{if(p){this.itemOnAfterRendering(null);}else{var E=s.getItems();E[E.length-1].addEventDelegate(o,this);}}},resizeCard:function(n){var e=this.getCardPropertiesModel();e.setProperty("/cardLayout/rowSpan",n.rowSpan);e.setProperty("/cardLayout/colSpan",n.colSpan);switch(e.getProperty("/listFlavor")){case"standard":this._resizeStandard(n,e);break;case"carousel":this._resizeCarousel(n);break;case"grid":this._resizeGrid(n);break;}},_resizeStandard:function(n,p){var q=this.byId(this._aLinkListIds[0]);for(var i=1;i<this._aLinkListIds.length;i++){var r=this.byId(this._aLinkListIds[i]);var s=r.getItems().length;for(var j=0;j<s;j++){q.addItem(r.getItems()[0]);}r.destroy();}var R=this._oListRest.getItems().length;try{for(var k=0;k<R;k++){q.addItem(this._oListRest.getItems()[0]);}}catch(e){jQuery.sap.log.info("Error: "+e);}var B=q.getBindingInfo("items");var t=this._getLinkListItemHeight();var N=this._getListHeightInStandardCard(n.rowSpan);var u=Math.floor(N/t)*n.colSpan;this._bInitialLoad=false;if(B){if(u>this._iAvailableItems&&B.length<=this._iAvailableItems){B.length=u;q.bindItems(B);}else{this._itemOnEventBuildStandard(p,n.colSpan,n.rowSpan,false);}}else{this._itemOnEventBuildStandard(p,n.colSpan,n.rowSpan,false);}},_resizeCarousel:function(n){var e=this.byId(P);e.next();e.previous();this._setListHeightInCarouselCard(n.rowSpan);this._setCarouselImageProperties();},_resizeGrid:function(n){var G=this.getView().byId("ovpLinkListGrid");var s=parseInt(this.getView().byId("idColSpan").getValue(),10);var N=n.colSpan;if(n.colSpan>5){N=5;}this.getView().byId("idColSpan").setValue(N);if(N!==s){var S="sapOvpCardLinkListGridColSpan"+s;G.removeStyleClass(S);var e="sapOvpCardLinkListGridColSpan"+N;G.addStyleClass(e);}var j=n.rowSpan*n.colSpan*2;var B=G.getBindingInfo("items");var k=G.getItems();if(j>k.length){B.length=j;G.bindItems(B);}else if(j<k.length){var r=k.length-j;var p=k.length-1;for(var i=0;i<r;i++){var q=p-i;G.removeItem(q);}}},_setListHeightInCarouselCard:function(r){var i=0;if(r){var H=0;var e=this.byId(m);if(e){H=e.$().height();}var j=this.getCardPropertiesModel();var R=j.getProperty("/cardLayout/iRowHeigthPx");i=(r*R)-(H+C+f);var k=this.byId(P);k.$().height(i);}},_setCarouselImageProperties:function(){var e=this.getCardPropertiesModel();var r=e.getProperty("/cardLayout/rowSpan");var i=e.getProperty("/cardLayout/colSpan");if(r&&i){var j=this.byId(P),k=this.byId(m),n=null,p=null,s,q;if(j.getPages().length===1&&k){p=sap.ui.getCore().byId(j.getActivePage());if(p&&p.getItems()[p.getItems().length-1]instanceof sap.m.Image){n=p.getItems()[p.getItems().length-1];if(p.getItems().length===1){s=j.$().height();}else{s=j.$().height()-p.getItems()[0].$().outerHeight();}if(s){s=s+"px";n.setHeight(s);}q=k.$().outerWidth();if(q){q=q+"px";n.setWidth(q);}n.setMode(sap.m.ImageMode.Background);n.setBackgroundPosition("center center");}}}},_setListHeightInStandardCard:function(r){var n=0;var e;var j;for(var i=0;i<this._aLinkListIds.length;i++){e=this.byId(this._aLinkListIds[i]);n=this._getListHeightInStandardCard(r);j=e.$().parent();j.height(n);}},_getListHeightInStandardCard:function(r){var i=0;var e=this.getCardPropertiesModel();if(r){var H=0;var j=this.byId(m);if(j){H=j.$().height();}var R=e.getProperty("/cardLayout/iRowHeigthPx");i=(r*R)-(g+H+L+h+l);}return i;},_setListColumnWidthInStandardCard:function(i){var e;var k;var s="100%";if(this._aLinkListIds.length>1){for(var j=0;j<this._aLinkListIds.length;j++){e=this.byId(this._aLinkListIds[j]);k=e.$().parent();s=(100/i)+"%";k.width(s);}}else{e=this.byId(this._aLinkListIds[0]);if(e){k=e.$().parent();k.width(s);}}},_getLinkListItemHeight:function(s){var i=(s)?s:O;var k=this.getCardPropertiesModel(),n=this.byId(i),p=I,q="",t=false,S=false,N=1,r=k.getProperty("/densityStyle"),T=0,u=0;var v=n.getItems();for(var j=0;j<v.length;j++){try{var w=v[j].getAggregation("content")[0].getAggregation("items")[0].getAggregation("items")[0].getAggregation("items")[0].getProperty("src");if(w.length>0){if(w.toLowerCase().indexOf("icon")>0){q="icon";}else{q="image";}T=1;break;}}catch(e){jQuery.sap.log.info("Item:"+j+" doesn´t contain a image");}}if(q.length>0){N=2;}else{try{var x=n.getItems()[0].getAggregation("content")[0].getAggregation("items")[T].getAggregation("items")[0].getProperty("text");t=x.length>0;u=1;}catch(e){jQuery.sap.log.info("Item doesn´t contain a title");}try{var y=n.getItems()[0].getAggregation("content")[0].getAggregation("items")[T].getAggregation("items")[u].getProperty("text");S=y.length>0;}catch(e){jQuery.sap.log.info("Item doesn´t contain a subTitle");}if(t===true&&S===true){N=2;}}if(r==="cozy"){p=I;if(N===1){p=q!=="image"?b:a;}}else{p=c;if(N===1){p=d;}}return p;},onLinkListItemPressLocalData:function(e){var t=e.getSource().data("targetUri");var i=e.getSource().data("openInNewWindow");var B=this.getView().getModel("ovpCardProperties").getProperty("/baseUrl");t=this.buildUrl(B,t);if(i==="true"){window.open(t);}else{window.location.href=t;}},onLinkListActionPressLocalData:function(e){var A=e.getSource().data("dataAction");this.getView().getModel().callFunction(A,{method:"POST",urlParameters:{FunctionImport:A},success:(this.onFuImpSuccess.bind(this)),error:(this.onFuImpFailed.bind(this))});},onFuImpSuccess:function(e){sap.m.MessageToast.show(sap.ui.getCore().getLibraryResourceBundle("sap.ovp").getText("Toast_Action_Success"),{duration:3000});},onFuImpFailed:function(r){sap.m.MessageToast.show(sap.ui.getCore().getLibraryResourceBundle("sap.ovp").getText("Toast_Action_Error"),{duration:3000});},onLinkListItemPress:function(e){var n=this.getEntityNavigationEntries(e.getSource().getBindingContext(),this.getCardPropertiesModel().getProperty("/annotationPath"));this.doNavigation(e.getSource().getBindingContext(),n[0]);},onLinkPopover:function(e){var p;switch(this.getCardPropertiesModel().getProperty("/listFlavor")){case"grid":p=e.getSource().getParent().getParent().getParent().getParent().getParent().getAggregation("items")[1].getAggregation("items")[1];break;case"standard":p=this.getView().byId("ovpListRow").getParent().getAggregation("items")[2];if(!p){p=this.getView().byId("ovpListRow").getParent().getAggregation("items")[1];}break;case"carousel":if(e.getParameter("id").indexOf("link")>0){p=e.getSource().getParent().getParent().getParent().getParent().getAggregation("items")[1];}else{p=e.getSource().getParent().getParent().getParent().getAggregation("items")[1];}break;}p.bindElement(e.getSource().getBindingContext().getPath());p.openBy(e.getSource());},onLinkNavigationSingleTarget:function(e){var n=this.getEntityNavigationEntries(e.getSource().getBindingContext(),"com.sap.vocabularies.UI.v1.Identification");this.doNavigation(e.getSource().getBindingContext(),n[0]);},onLinkNavigation:function(e){if(sap.ushell.Container.getService("CrossApplicationNavigation")){var B=e.getSource().getBindingContext();if(B.getProperty("SemanticObject")){var n={target:{semanticObject:B.getProperty("SemanticObject"),action:B.getProperty("SemanticAction")}};sap.ushell.Container.getService("CrossApplicationNavigation").toExternal(n);}}},buildUrl:function(B,M){if(M.startsWith(B)||M.indexOf("://")>0){return M;}else if(M.startsWith("/")){return B+M;}else{return B+"/"+M;}},onLinkListActionPress:function(e){var A=e.getSource().data("dataAction");this.getView().getModel().callFunction(A,{method:"POST",urlParameters:{FunctionImport:A},success:(this.onFuImpSuccess.bind(this)),error:(this.onFuImpFailed.bind(this))});},onLinkListSemanticObjectPressLocalData:function(e){var r=parseInt(e.getSource().data("contentRowIndex"),10);this._oStaticContent=this.getCardPropertiesModel().getProperty("/staticContent");if(this._oStaticContent[r].semanticObject&&this._oStaticContent[r].action){var n={target:{semanticObject:this._oStaticContent[r].semanticObject,action:this._oStaticContent[r].action},params:this._oStaticContent[r].params};sap.ushell.Container.getService("CrossApplicationNavigation").toExternal(n);}else{sap.m.MessageToast.show(sap.ui.getCore().getLibraryResourceBundle("sap.ovp").getText("Toast_Action_Error"),{duration:3000});}}});})();
