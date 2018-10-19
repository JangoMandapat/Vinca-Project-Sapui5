/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

		(c) Copyright 2009-2016 SAP SE. All rights reserved
	
 */
sap.ui.define(["jquery.sap.global","./library","sap/rules/ui/DecisionTableCell","sap/rules/ui/RuleBase","sap/rules/ui/BindingSpy","sap/rules/ui/Utils","sap/ui/table/Table","sap/ui/table/Column","sap/m/Toolbar","sap/m/Popover","sap/ui/unified/Menu","sap/m/Dialog","sap/m/Button","sap/m/ToolbarSpacer","sap/m/Text","sap/m/Input","sap/m/ObjectIdentifier","sap/m/Link","sap/m/Label","sap/m/BusyIndicator","sap/m/DisplayListItem","sap/ui/unified/MenuItem","sap/m/FlexBox","sap/m/MessageStrip"],function(q,l,E,R,B,U,T,C,a,P,M,D,b,c,d,I,O,L,e,f,g,h,F,j){"use strict";var o=R.extend("sap.rules.ui.DecisionTable",{metadata:{properties:{enableSettings:{type:"boolean",group:"Misc",defaultValue:true},hitPolicies:{type:"sap.rules.ui.RuleHitPolicy[]",defaultValue:[sap.rules.ui.RuleHitPolicy.FirstMatch,sap.rules.ui.RuleHitPolicy.AllMatch]}},aggregations:{"_toolbar":{type:"sap.m.Toolbar",multiple:false,singularName:"_toolbar"},"_table":{type:"sap.ui.core.Control",multiple:false,singularName:"_table"},"_errorsText":{type:"sap.m.MessageStrip",multiple:false,singularName:"_errorsText"}}},_addErrorLabel:function(){var i=new j({showCloseButton:true,showIcon:true,type:sap.ui.core.MessageType.Error,visible:false}).addStyleClass("sapUiTinyMargin");this.setAggregation("_errorsText",i,true);},init:function(){this.resetContent=true;this.ruleShpion=new B({});this._internalModel=this._initInternalModel();this.setModel(this._internalModel,"dtModel");this.oBundle=sap.ui.getCore().getLibraryResourceBundle("sap.rules.ui.i18n");this._addToolBar();this._addTable();this._addErrorLabel();this.setBusyIndicatorDelay(0);},setEditable:function(v){this.setProperty("editable",v,true);this._internalModel.setProperty("/editable",v);if(v===true){this.validate();}else{this._clearErrorMessages();}return this;},setExpressionLanguage:function(v){this.setAssociation("expressionLanguage",v,true);var t=this.getAggregation("_table");if(t){var i=t.getBinding("columns");if(i){i.refresh();}}return this;},setEnableSettings:function(v){this.setProperty("enableSettings",v,true);this._internalModel.setProperty("/enableSettings",v);return this;},setHitPolicies:function(v){this.setProperty("hitPolicies",v,true);this._internalModel.setProperty("/hitPolicies",v);return this;},_initInternalModel:function(){var i={};i.editable=this.getEditable();i.newTable=true;i.hitPolicies=this.getHitPolicies();i.enableSettings=this.getEnableSettings();i.isAtLeastOneRowSelected=false;i.validationStatus={};var k=new sap.ui.model.json.JSONModel();k.setData(i);return k;},setBindingContextPath:function(v){this.setProperty("bindingContextPath",v);this.resetContent=true;return this;},setModelName:function(v){this.setProperty("modelName",v);this.resetContent=true;return this;},_openTableSettings:function(){var i=this._createDialog();i.open();this._unbindColumns();},_createDialog:function(){var i=new sap.rules.ui.DecisionTableSettings({expressionLanguage:this.getExpressionLanguage(),hitPolicies:"{dtModel>/hitPolicies}",newDecisionTable:this._internalModel.getProperty("/newTable")});var m=this._getModel();i.setModel(m);i.setModel(this._internalModel,"dtModel");var k=this.getBindingContext();i.setBindingContext(k);var n=new D({contentWidth:"90%",title:this.oBundle.getText("tableSettings")});n.addContent(i);n.attachBeforeClose(function(){var N=this._internalModel.getProperty("/newTable");if(N){var t=this.getAggregation("_table");t.setNoData(null);this._internalModel.setProperty("/newTable",false);this._setTableRows();}this.validate();this._bindColumns();n.destroy();},this);var p=new b({text:this.oBundle.getText("applyChangesBtn")}).setTooltip(this.oBundle.getText("applyChangesBtn"));p.attachPress(function(){n.close();},this);n.addButton(p);return n;},_getBindModelName:function(){var p="";var m=this.getModelName();if(m){p=m+">";}return p;},_getModel:function(){var m=this.getModelName();if(m){return this.getModel(m);}return this.getModel();},columnFactory:function(i,k){var m=new C(i,{width:"11rem",multiLabels:[this._createColIfThenHeader(k),this._createColDescriptionHeader(k)],template:this._createCell(k)});m.isConditionOrFirstResultColumn=!this.firstResultColumnBound;var r=this._getBindModelName();this.firstResultColumnBound=k.getProperty(r+"Type")===sap.rules.ui.DecisionTableColumn.Result;return m;},_createColDescriptionHeader:function(i){var r=this._getBindModelName(),k=i.getProperty(r+"Type"),m=i.getProperty(r+"Id"),n=i.getProperty(r+"RuleId");var p=k===sap.rules.ui.DecisionTableColumn.Condition?r+"/DecisionTableColumnConditions(RuleId=\'"+n+"\',Id="+m+")":r+"/DecisionTableColumnResults(RuleId=\'"+n+"\',Id="+m+")";var s=document.getElementsByClassName("sapUiSizeCozy").length>0?3:1;return new d({text:{parts:[{path:r+"Type"},{path:p}],formatter:function(t,u){if(!u){return"";}else if(t===sap.rules.ui.DecisionTableColumn.Condition){return u&&(u.Expression+" "+u.FixedOperator||u.Description);}else if(t===sap.rules.ui.DecisionTableColumn.Result){return u.DataObjectAttributeName;}return"";}},maxLines:s}).addStyleClass("sapRULDecisionTableColumnHeaderLabel");},_createColIfThenHeader:function(i){var r=this._getBindModelName();var k=i.getProperty(r+"Id");var m=this.oBundle;return new e({text:{parts:[{path:r+"Type"},{path:r+"Id"}],formatter:function(t,n){if(n===1){return m.getText("conditionIfColumn");}else if(t===sap.rules.ui.DecisionTableColumn.Result&&this.getParent().isConditionOrFirstResultColumn){return m.getText("resultThenColumn");}else{return"";}}},design:"Bold",required:k===1});},_createCell:function(i){var k=i.getProperty("Id");var m=i.getProperty("Type");return new E({editable:"{dtModel>/editable}",expressionLanguage:this.getExpressionLanguage()}).data({colId:k,bindModelName:this._getBindModelName(),colType:m,table:this.getAggregation("_table")});},_updateTableCell:function(i,r,k,m){var p="null";if(r){var n=r.getModel().getProperty(r.sPath+"/Cells");var s=i.data("colId");var t=r.getProperty("Id");var u=r.getProperty("RuleId");var v='';var w=n[s-1];var x=i.data("bindModelName");p=x+"/"+w+"/Content";switch(i.data("colType")){case"CONDITION":v="/DecisionTableColumnConditions(RuleId='"+u+"',Id="+s+")";i.setHeaderValuePath(v+'/Expression');i.setFixedOperatorPath(v+'/FixedOperator');break;case"RESULT":v="/DecisionTableColumnResults(RuleId='"+u+"',Id="+s+")";i.setTypePath(v+'/BusinessDataType');break;default:break;}i.setValueStateTextPath("dtModel>/validationStatus/"+"RowId="+t+",ColId="+s);}i.setValuePath(p);},_bindColumns:function(){var t=this.getAggregation("_table");var i=this._getBindModelName()+"DecisionTable/DecisionTableColumns";t.bindColumns({path:i,parameters:{expand:"Condition,Result"},factory:this.columnFactory.bind(this)});},_unbindColumns:function(){var t=this.getAggregation("_table");t.unbindColumns();},_bindRows:function(){var t=this.getAggregation("_table");var i=this._getBindModelName()+"DecisionTable/DecisionTableRows";t.bindRows({path:i,parameters:{expand:"Cells"}});},_unbindRows:function(){var t=this.getAggregation("_table");t.unbindRows();},_decideSettingsEnablement:function(i,k){return i&&k;},_decideDeleteRowEnablement:function(n,i){return n===false&&i;},_decideAddRowEnablement:function(n){return!n;},_addToolBar:function(){var t=new a({design:"Transparent",enabled:"{dtModel>/editable}"});var s=new b({text:"",press:this._openTableSettings.bind(this),enabled:{parts:[{path:"dtModel>/enableSettings"},{path:"dtModel>/editable"}],formatter:this._decideSettingsEnablement}});s.setIcon("sap-icon://action-settings");var i=new L({text:this.oBundle.getText("delete"),press:[this._deleteRowWorkaround,this],enabled:{parts:[{path:"dtModel>/newTable"},{path:"dtModel>/isAtLeastOneRowSelected"}],formatter:this._decideDeleteRowEnablement}}).setTooltip(this.oBundle.getText("delete"));var A=new b({text:"",enabled:{parts:[{path:"dtModel>/newTable"}],formatter:this._decideAddRowEnablement},press:function(m){this.oMenu=new M({items:this._getMenuItems()});var n=sap.ui.core.Popup.Dock;this.oMenu.open("keyup",A,n.CenterTop,n.CenterBottom,A);}.bind(this)});A.setIcon("sap-icon://add");var k=new O({title:this.oBundle.getText("decisionTable"),text:""});t.addContent(new c({width:"1em"}));t.addContent(k);t.addContent(new c({}));t.addContent(i);t._delete=i;t.addContent(new c({width:"1em"}));t.addContent(A);t.addContent(new c({width:"1em"}));t.addContent(s);t.addContent(new c({width:"1em"}));this.setAggregation("_toolbar",t,true);},_addNewRowWorkaround:function(s,i){this._beforeSaveWorkaround();this._addNewRow(s,i);this._saveWorkAround({success:this._reloadDataWorkAround.bind(this),error:this._reloadDataWorkAround.bind(this)});},_addNewRow:function(s,k){var m=this.oMenu;if(m){m.close();}var n=this._getModel();if(!n){return;}var t=this.getAggregation("_table");var p=this.getBindingContext();var r=p.getProperty("Id");var u={RuleId:r};if(k){u.Id=1;}else if(s||s===0){u.Id=s+2;}n.createEntry("/DecisionTableRows",{properties:u});var v=n.getProperty("DecisionTable/DecisionTableColumns",p);for(var i=0;i<v.length;i++){var w=n.getProperty("/"+v[i]).Id;var x={RuleId:r,RowId:u.Id,ColId:w,Content:""};n.createEntry("/DecisionTableRowCells",{properties:x});}t.setSelectedIndex(-1);},_deleteRowWorkaround:function(){var m=this._getModel();this._beforeSaveWorkaround();if(m.hasPendingChanges()){this._saveWorkAround({success:function(){this._deleteRow();this._reloadDataWorkAround();}.bind(this),error:this._reloadDataWorkAround.bind(this)});}else{this._deleteRow();this._reloadDataWorkAround();}},_deleteRow:function(){var m=this._getModel();if(!m){return;}var t=this.getAggregation("_table");var s=[];if(t){s=t.getSelectedIndices();}if(s.length===0){return;}var k=this.getBindingContext();var r=m.getProperty("DecisionTable/DecisionTableRows",k);var n=s.length;for(var i=0;i<n;i++){var p=r[s[i]];m.remove("/"+p);}t.setSelectedIndex(-1);},_setTableRows:function(){var m=this._getModel();var i=this.getBindingContext();var r=m.getProperty("DecisionTable/DecisionTableRows",i);var t=this.getAggregation("_table");if(this._internalModel.getProperty("/newTable")){t.setVisibleRowCount(3);}else if(!r||!r.length){t.setVisibleRowCount(1);}else{t.setVisibleRowCount(r.length);}},_getMenuItems:function(){var t=this.getAggregation("_table");var s=[];if(t){s=t.getSelectedIndices();}var m=[new h({text:this.oBundle.getText("insertFirst"),enabled:true,select:this._addNewRowWorkaround.bind(this,s[0],true)}),new h({text:this.oBundle.getText("insertAfter"),enabled:s.length===1?true:false,select:this._addNewRowWorkaround.bind(this,s[0],false)})];return m;},_rowSelectionChange:function(){var t=this.getAggregation("_table");var s=[];if(t){s=t.getSelectedIndices();}if(s.length>0){this._internalModel.setProperty("/isAtLeastOneRowSelected",true);}else{this._internalModel.setProperty("/isAtLeastOneRowSelected",false);}},_getBlankContent:function(){var i=new e({text:this.oBundle.getText("start")});var s=new d();s.setText("\u00a0");var k=new L({enabled:{parts:[{path:"dtModel>/enableSettings"},{path:"dtModel>/editable"}],formatter:this._decideSettingsEnablement},text:" "+this.oBundle.getText("settings"),press:[this._openTableSettings,this]}).addStyleClass("sapRULDecisionTableLink");var m=new F({justifyContent:"Center",items:[i,s,k]}).addStyleClass("sapUiMediumMargin");return m;},_decideSelectionMode:function(i){return i?sap.ui.table.SelectionMode.MultiToggle:sap.ui.table.SelectionMode.None;},_addTable:function(){var t=new T({visibleRowCount:10,visibleRowCountMode:sap.ui.table.VisibleRowCountMode.Fixed,selectionMode:{parts:[{path:"dtModel>/editable"}],formatter:this._decideSelectionMode},rowSelectionChange:function(){this.oParent._rowSelectionChange();},enableColumnReordering:false});t._updateTableCell=this._updateTableCell;t.setBusyIndicatorDelay(0);this.setAggregation("_table",t,true);},_setBindingContext:function(){this.setBusy(true);var i=new f().addStyleClass("sapUiMediumMargin");var t=this.getAggregation("_table");t.setNoData(i);var k=this.getBindingContextPath();var m=this._getModel();if(!k||!m){return;}var n=new sap.ui.model.Context(m,k);this.setBindingContext(n);this._readRuleData();},_readRuleData:function(){var m=this._getModel();var i=this.getBindingContext();var r=i.getPath();this._unbindColumns();this._unbindRows();m.read(r,{urlParameters:{"$expand":"DecisionTable/DecisionTableColumns/Condition,"+"DecisionTable/DecisionTableColumns/Result,"+"DecisionTable/DecisionTableRows/Cells"},success:function(){this._onRuleContextChangedDataReceived();}.bind(this)});},_onRuleContextChangedDataReceived:function(){var t=this.getAggregation("_table");var m=this._getModel();var i=this.getBindingContext();var k=m.getProperty("DecisionTable/DecisionTableColumns",i);if(!k||!k.length){this._internalModel.setProperty("/newTable",true);var n=this._getBlankContent();t.setNoData(n);}else{this._internalModel.setProperty("/newTable",false);if(this.getEditable()){this.validate();}t.setNoData(null);}this._setTableRows();this._bindColumns();this._bindRows();this.setBusy(false);},_buildMessagesStructure:function(v,k){var m;var n;var p;var r;var s={};if(!v.details){return s;}for(var w=0;w<v.details.length;w++){m=v.details[w];if(!m.messages){continue;}for(var i=0;i<m.messages.length;i++){p=m.messages[i].description;n=m.messages[i].additionalInfo;if(n.type==="ruleResult"){k.push(p);}else if(n.type==="column"){r="errorInColumnHeader";s[r]=true;}else if(n.type==="cell"){r="RowId="+n.rowId+",ColId="+n.colId;s[r]=p;}}}return s;},_concatinateHeaderErrors:function(k){var m="";for(var i=0;i<k.length;i++){m+="\n"+k[i];}return m;},_concatinateColumnsHeaderErrors:function(i){var k="";for(var m in i){if(i.hasOwnProperty(m)){if(i[m].header){k+="In Col: "+m+" - "+i[m].header+"\n";}}}return k;},_displayHeaderErrorMessages:function(i,k){var t=this.getAggregation("_errorsText");this.oBundle=sap.ui.getCore().getLibraryResourceBundle("sap.rules.ui.i18n");var m=this._concatinateHeaderErrors(i);t.setText(this.oBundle.getText("errorInTableHeader")+m);t.setVisible(true);},_clearErrorMessages:function(){var t=this.getAggregation("_errorsText");t.setText("");t.setVisible(false);this._internalModel.setProperty("/validationStatus",{},null,true);},_displayErrorMessages:function(i,k){this._displayHeaderErrorMessages(i,k);},_validateRule:function(r){var v={};var i=sap.ui.getCore().byId(this.getExpressionLanguage());if(i&&r){v=i.validateRule(r);}return v;},_getRule:function(){var i=this.getBindingContextPath();var m=this._getModel();var r=U.getDTRuleData(m,i);return r;},_makeSureUpdateTableCellWillbeCalled:function(){var t=this.getAggregation("_table");t.getBinding("rows").refresh();},validate:function(){var r=this._getRule();var v=this._validateRule(r);this._clearErrorMessages();if(v.output&&v.output.status==="Error"){var i=[];var k=this._buildMessagesStructure(v,i);this._displayErrorMessages(i,k);this._internalModel.setProperty("/validationStatus",k,null,true);}},onBeforeRendering:function(){if(this.resetContent){this._clearErrorMessages();this._setBindingContext();this.resetContent=false;}},exit:function(){var m=this.oMenu;if(m){m.destroy();}this.ruleShpion.destroy();}});sap.rules.ui.DecisionTable.prototype._saveWorkAround=function(p){var m=this._getModel();m.submitChanges(p);};sap.rules.ui.DecisionTable.prototype._beforeSaveWorkaround=function(){var m=this._getModel();m.setRefreshAfterChange(false);this.setBusy(true);};sap.rules.ui.DecisionTable.prototype._afterSaveWorkaround=function(){var m=this._getModel();m.setRefreshAfterChange(true);this.setBusy(false);};sap.rules.ui.DecisionTable.prototype._reloadDataWorkAround=function(){var m=this._getModel();var i=this.getBindingContext();var r=i.getPath();m.read(r,{urlParameters:{"$expand":"DecisionTable/DecisionTableColumns/Condition,"+"DecisionTable/DecisionTableColumns/Result,"+"DecisionTable/DecisionTableRows/Cells"},success:function(){this.validate();this._afterSaveWorkaround();this._setTableRows();}.bind(this),error:function(){this._afterSaveWorkaround();}.bind(this)});};return o;},true);