sap.ui.define([
	'jquery.sap.global',
	'sap/m/MessageToast',
	'sap/ui/core/Fragment',
	"sap/ui/core/mvc/Controller",
	"sap/viz/ui5/controls/VizFrame",
	"sap/viz/ui5/data/FlattenedDataset",
	"sap/viz/ui5/data/DimensionDefinition",
	"sap/viz/ui5/data/MeasureDefinition",
	"sap/viz/ui5/controls/common/feeds/FeedItem",
	"sap/ui/model/json/JSONModel"

], function(jQuery, MessageToast, Fragment, Controller, VizFrame, FlattenedDataset, DimensionDefinition, MeasureDefinition, FeedItem, JSONModel) {
	"use strict";

	return Controller.extend("Vinca.controller.ChartView", {

			/*onInit: function(){

			var oHtml;
			var that = this;
			var oView = this.getView();
			var VincaTestDataModel = new JSONModel();
			var data = {
				"rs0":[{"YEAR":2017,"MONTH":"Jan","VALUE":339},{"YEAR":2017,"MONTH":"Feb","VALUE":100},{"YEAR":2017,"MONTH":"Mar","VALUE":200},{"YEAR":2017,"MONTH":"Apr","VALUE":300},{"YEAR":2017,"MONTH":"May","VALUE":0},{"YEAR":2017,"MONTH":"Jun","VALUE":0},{"YEAR":2017,"MONTH":"Jul","VALUE":0},{"YEAR":2017,"MONTH":"Aug","VALUE":0},{"YEAR":2017,"MONTH":"Sept","VALUE":0},{"YEAR":2017,"MONTH":"Oct","VALUE":0},{"YEAR":2017,"MONTH":"Nov","VALUE":0},{"YEAR":2017,"MONTH":"Dec","VALUE":0}]
			};
			VincaTestDataModel.setData(data);
			oView.setModel(VincaTestDataModel, "VincaTestDataModel"); 
			$.ajax({
                        url: "https://pipemonplus-q.open-grid-europe.com/oge/apps/vinca/GetData/VincaTestMonth.xsjs",
                        type: "GET",
                         contentType: "application/json; charset=utf-8",
                        async: false,
                       // username: "J64058", // Most SAP web services require credentials
     					//password: "Hope=123",
                        success: function(data, textStatus, XMLHttpRequest) {
                            console.log(XMLHttpRequest);
  							VincaTestData.setData(data);
                            oView.setModel(VincaTestDataModel, "VincaTestDataModel"); 
                            oView.createContent("VincaTestDataModel");                  

                        },
                        error: function(XMLHttpRequest, textStatus, errorThrown) {
                            MessageToast.show("Error : " + textStatus);
                            console.log(XMLHttpRequest);
                            console.log(errorThrown);
                            //                             that.fnDisplayAjaxMessage(XMLHttpRequest); 
                           
                        },
                        timeout: 12000 //timeout to 12sec
                    });

			$.ajax({
     				url: WEBSERVICE_URL,
     				type: "POST", //This is what you should chage
     				dataType: "application/json; charset=utf-8",
     				username: "admin", // Most SAP web services require credentials
     				password: "admin",
     				processData: false,
     				contentType: "application/json",
     				success: function () {
         				alert("success");
    				 },
     		error: function (xhr, ajaxOptions, thrownError) { //Add these parameters to display the required response
         			alert(xhr.status);
         			alert(xhr.responseText);
     			},
 });
			var oVizFrame = this.getView().byId("idcolumn");

			var oDataset = new sap.viz.ui5.data.FlattenedDataset({

				dimensions : [{
					name : 'Month',
					value : "{MONTH}"}],

				measures : [{
					name : 'Value',
					value : "{VALUE}"}],

				data :{
					path :"/rs0"
				   }
				 });
				
		   oVizFrame.setDataset(oDataset);
		   oVizFrame.setModel(VincaTestDataModel);
		   oVizFrame.setVizType('column'); //Type of the viz frame
		   // set Viz Properties

		  oVizFrame.setVizProperties({
                plotArea: {
                    dataLabel: {
                        formatString:CustomerFormat.FIORI_LABEL_SHORTFORMAT_2,

                        visible: true
                    }
                },
                valueAxis: {

                    title: {
                        visible: false
                    }
                },
                categoryAxis: {
                    title: {
                        visible: false
                    }
                },
                title: {
                    visible: false,
                    text: 'Year'
                }
            });

		var  feedValueAxis = new sap.viz.ui5.controls.common.feeds.FeedItem({
		   		'uid' : "valueAxis",
		   		'type' : "Measure",
		   		'values' : ["Value"]
		   	}),

	         feedCategoryAxis = new sap.viz.ui5.controls.common.feeds.FeedItem({
		   		'uid' : "categoryAxis",
		   		'type' : "Dimension",
		   		'values' : ["Month"]
		   	});

	     oVizFrame.addFeed(feedValueAxis);
	     oVizFrame.addFeed(feedCategoryAxis);

		},*/


		onAfterRendering: function() {
			var oSplitCont= this.getSplitContObj(),
				ref = oSplitCont.getDomRef() && oSplitCont.getDomRef().parentNode;
			// set all parent elements to 100% height, this should be done by app developer, but just in case
			if (ref && !ref._sapui5_heightFixed) {
				ref._sapui5_heightFixed = true;
				while (ref && ref !== document.documentElement) {
					var $ref = jQuery(ref);
					if ($ref.attr("data-sap-ui-root-content")) { // Shell as parent does this already
						break;
					}
					if (!ref.style.height) {
						ref.style.height = "100%";
					}
					ref = ref.parentNode;
				}
			}
		},
 
		onPressNavToDetail : function(oEvent) {
			this.getSplitContObj().to(this.createId("detailDetail"));
		},
 
		onPressDetailBack : function() {
			this.getSplitContObj().backDetail();
		},
 
		onPressMasterBack : function() {
			this.getSplitContObj().backMaster();
		},
 
		onPressGoToMaster : function() {
			this.getSplitContObj().toMaster(this.createId("master2"));
		},
 
		onListItemPress : function(oEvent) {
			var sToPageId = oEvent.getParameter("listItem").getCustomData()[0].getValue();
 
			this.getSplitContObj().toDetail(this.createId(sToPageId));
		},
 
		onPressModeBtn : function(oEvent) {
			var sSplitAppMode = oEvent.getSource().getSelectedButton().getCustomData()[0].getValue();
 
			this.getSplitContObj().setMode(sSplitAppMode);
			MessageToast.show("Split Container mode is changed to: " + sSplitAppMode, {duration: 5000});
		},
 
		getSplitContObj : function() {
			var result = this.byId("SplitContDemo");
			if (!result) {
				jQuery.sap.log.error("SplitApp object can't be found");
			}
			return result;
		}



 
	});
	
});