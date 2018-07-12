sap.ui.define([
	"jquery.sap.global",
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/viz/ui5/controls/VizFrame",
	"sap/viz/ui5/data/FlattenedDataset",
	"sap/viz/ui5/data/DimensionDefinition",
	"sap/viz/ui5/data/MeasureDefinition",
	"sap/viz/ui5/controls/common/feeds/FeedItem",
	"sap/ui/model/json/JSONModel"
], function(jQuery,Controller, MessageToast, VizFrame, FlattenedDataset, DimensionDefinition, MeasureDefinition, FeedItem, JSONModel) {
	"use strict";

	return Controller.extend("sap.suite.ui.commons.demo.tutorial.controller.ChartContainer", {

		onInit: function(){

			var oHtml;
			var that = this;
			var oView = this.getView();
			var VincaTestDataModel = new JSONModel();
			/*var data = {
				"rs0":[{"YEAR":2017,"MONTH":"Jan","VALUE":339},{"YEAR":2017,"MONTH":"Feb","VALUE":100},{"YEAR":2017,"MONTH":"Mar","VALUE":200},{"YEAR":2017,"MONTH":"Apr","VALUE":300},{"YEAR":2017,"MONTH":"May","VALUE":0},{"YEAR":2017,"MONTH":"Jun","VALUE":0},{"YEAR":2017,"MONTH":"Jul","VALUE":0},{"YEAR":2017,"MONTH":"Aug","VALUE":0},{"YEAR":2017,"MONTH":"Sept","VALUE":0},{"YEAR":2017,"MONTH":"Oct","VALUE":0},{"YEAR":2017,"MONTH":"Nov","VALUE":0},{"YEAR":2017,"MONTH":"Dec","VALUE":0}]
			};*/
			//VincaTestDataModel.setData(data);
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

			/*$.ajax({
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
 });*/
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
                      /*  formatString:CustomerFormat.FIORI_LABEL_SHORTFORMAT_2,*/

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

		},

		onNavButtonPressed: function() {
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("home");

			
		},

		/*onLoad: function(){
			 var oHtml;
			 var oPanel = that.getView().byId("chart");
			 var that = this;
			
		
		}*/

		
	});
});
