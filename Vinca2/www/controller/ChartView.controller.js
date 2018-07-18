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

		onInit: function(){
			this.getView().byId("idDatePicker").setValue(moment().format("DD.MM.YYYY"));
			this.fnLoadDefaultValue();

		
		},

		fnLoadDefaultValue: function(){
			var oHtml;
			var that = this;
			var oView = this.getView();
			var VincaTestDataModel = new JSONModel();		
			var oDatePicker = that.getView().byId("idDatePicker");
			var id = 1;
			var sClass= "el";
			var date = oDatePicker.getValue();
            var year = date.split(".")[2];
            var month = date.split(".")[1];
            var day = date.split(".")[0];

			var sHost = "https://pipemonplus-q.open-grid-europe.com/oge/apps/vinca/GetData/";
			var sUrl = "VincaTestYear.xsjs?id=" + id +  "&year=" + year + "&class=" + sClass;
			/*var data = {
				"rs0":[{"YEAR":2017,"MONTH":"Jan","VALUE":339},{"YEAR":2017,"MONTH":"Feb","VALUE":100},{"YEAR":2017,"MONTH":"Mar","VALUE":200},{"YEAR":2017,"MONTH":"Apr","VALUE":300},{"YEAR":2017,"MONTH":"May","VALUE":0},{"YEAR":2017,"MONTH":"Jun","VALUE":0},{"YEAR":2017,"MONTH":"Jul","VALUE":0},{"YEAR":2017,"MONTH":"Aug","VALUE":0},{"YEAR":2017,"MONTH":"Sept","VALUE":0},{"YEAR":2017,"MONTH":"Oct","VALUE":0},{"YEAR":2017,"MONTH":"Nov","VALUE":0},{"YEAR":2017,"MONTH":"Dec","VALUE":0}]
			};
			VincaTestDataModel.setData(data);*/
			oView.setModel(VincaTestDataModel, "VincaTestDataModel"); 
			$.ajax({
                        url: sHost+sUrl,
                        type: "GET",
                        async: false,
                        success: function(data, textStatus, XMLHttpRequest) {
                            console.log(XMLHttpRequest);
  							VincaTestDataModel.setData(data);
                            oView.setModel(VincaTestDataModel, "VincaTestDataModel"); 
                            /*oView.createContent("VincaTestDataModel");*/                  

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
                       /* formatString:CustomerFormat.FIORI_LABEL_SHORTFORMAT_2,*/

                        visible: false
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

		OnLoadYear: function(sUrl){
			var oHtml;
			var that = this;
			var oView = this.getView();
			var VincaTestDataModel = new JSONModel();
			var sHost = "https://pipemonplus-q.open-grid-europe.com/oge/apps/vinca/GetData/";

			oView.setModel(VincaTestDataModel, "VincaTestDataModel"); 
			$.ajax({
                        url: sHost+sUrl,
                        type: "GET",
                        async: false,
                        success: function(data, textStatus, XMLHttpRequest) {
                            console.log(XMLHttpRequest);
  							VincaTestDataModel.setData(data);
                            oView.setModel(VincaTestDataModel, "VincaTestDataModel"); 
                            /*oView.createContent("VincaTestDataModel");*/                  

                        },
                        error: function(XMLHttpRequest, textStatus, errorThrown) {
                            MessageToast.show("Error : " + textStatus);
                            console.log(XMLHttpRequest);
                            console.log(errorThrown);
                            //                             that.fnDisplayAjaxMessage(XMLHttpRequest); 
                           
                        },
                        timeout: 12000 //timeout to 12sec
                    });

			var oVizFrame = this.getView().byId("idcolumn");
			oVizFrame.removeAllFeeds();
			oVizFrame.destroyDataset();
			var oDataset = new sap.viz.ui5.data.FlattenedDataset({

				dimensions : [{
					name : 'Monat',
					value : "{MONTH}"}],

				measures : [{
					name : 'Wert',
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
                       /* formatString:CustomerFormat.FIORI_LABEL_SHORTFORMAT_2,*/

                        visible: false
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
		   		'values' : ["Wert"]
		   	}),

	         feedCategoryAxis = new sap.viz.ui5.controls.common.feeds.FeedItem({
		   		'uid' : "categoryAxis",
		   		'type' : "Dimension",
		   		'values' : ["Monat"]
		   	});

	     oVizFrame.addFeed(feedValueAxis);
	     oVizFrame.addFeed(feedCategoryAxis);
		
		},

		OnLoadMonth: function(sUrl){
			var oHtml;
			var that = this;
			var oView = this.getView();
			var VincaTestDataModel = new JSONModel();
			//var oModel = this.getView().getModel("VincaTestDataModel");
			
			var sHost = "https://pipemonplus-q.open-grid-europe.com/oge/apps/vinca/GetData/";
		
			oView.setModel(VincaTestDataModel, "VincaTestDataModel"); 
			$.ajax({
                        url: sHost+sUrl,
                        type: "GET",
                        async: false,
                        success: function(data, textStatus, XMLHttpRequest) {
                            console.log(XMLHttpRequest);
  							VincaTestDataModel.setData(data);
                            oView.setModel(VincaTestDataModel, "VincaTestDataModel"); 
                            /*oView.createContent("VincaTestDataModel");*/                  

                        },
                        error: function(XMLHttpRequest, textStatus, errorThrown) {
                            MessageToast.show("Error : " + textStatus);
                            console.log(XMLHttpRequest);
                            console.log(errorThrown);
                            //                             that.fnDisplayAjaxMessage(XMLHttpRequest); 
                           
                        },
                        timeout: 12000 //timeout to 12sec
                    });

			var oVizFrame = this.getView().byId("idcolumn");
			oVizFrame.removeAllFeeds();
			oVizFrame.destroyDataset();
			var oDataset = new sap.viz.ui5.data.FlattenedDataset({

				dimensions : [{
					name : 'Tag',
					value : "{DAY}"}],

				measures : [{
					name : 'Wert',
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
                       /* formatString:CustomerFormat.FIORI_LABEL_SHORTFORMAT_2,*/

                        visible: false
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
                    },
                },
                title: {
                    visible: false,
                    text: 'Year'
                }
            });

		var  feedValueAxis = new sap.viz.ui5.controls.common.feeds.FeedItem({
		   		'uid' : "valueAxis",
		   		'type' : "Measure",
		   		'values' : ["Wert"]
		   	}),

	         feedCategoryAxis = new sap.viz.ui5.controls.common.feeds.FeedItem({
		   		'uid' : "categoryAxis",
		   		'type' : "Dimension",
		   		'values' : ["Tag"]
		   	});

	     oVizFrame.addFeed(feedValueAxis);
	     oVizFrame.addFeed(feedCategoryAxis);
		},

		OnLoadDay: function(sUrl){
			var oHtml;
			var that = this;
			var oView = this.getView();
			/*var oModel = this.getView().getModel("VincaTestDataModel");
			oModel.refresh();*/
			var VincaTestDataModel = new JSONModel();			
			var sHost = "https://pipemonplus-q.open-grid-europe.com/oge/apps/vinca/GetData/";

			oView.setModel(VincaTestDataModel, "VincaTestDataModel"); 
			$.ajax({
                        url: sHost+sUrl,
                        type: "GET",
                        async: false,
                        success: function(data, textStatus, XMLHttpRequest) {
                            console.log(XMLHttpRequest);
  							VincaTestDataModel.setData(data);
                            oView.setModel(VincaTestDataModel, "VincaTestDataModel"); 
                            /*oView.createContent("VincaTestDataModel");*/                  

                        },
                        error: function(XMLHttpRequest, textStatus, errorThrown) {
                            MessageToast.show("Error : " + textStatus);
                            console.log(XMLHttpRequest);
                            console.log(errorThrown);
                            //                             that.fnDisplayAjaxMessage(XMLHttpRequest); 
                           
                        },
                        timeout: 12000 //timeout to 12sec
                    });


			var oVizFrame = this.getView().byId("idcolumn");
			oVizFrame.removeAllFeeds();
			oVizFrame.destroyDataset();
			var oDataset = new sap.viz.ui5.data.FlattenedDataset({

				dimensions : [{
					name : 'Stunde',
					value : "{HOUR}"}],

				measures : [{
					name : 'Wert',
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
                       /* formatString:CustomerFormat.FIORI_LABEL_SHORTFORMAT_2,*/

                        visible: false
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
		   		'values' : ["Wert"]
		   	}),

	         feedCategoryAxis = new sap.viz.ui5.controls.common.feeds.FeedItem({
		   		'uid' : "categoryAxis",
		   		'type' : "Dimension",
		   		'values' : ["Stunde"]
		   	});

	     oVizFrame.addFeed(feedValueAxis);
	     oVizFrame.addFeed(feedCategoryAxis);

		},

		OnHandleSwitchTab : function(oEvent){
			var that = this;
			var oSource;
			if (oEvent === undefined)
			{
				oSource = that.getView().byId("sgtbtn");
			}
			else {
			    oSource = oEvent.getSource();
			}
            
            var oChartContainer = that.getView().byId("chartContainer");
            var oDatePicker = that.getView().byId("idDatePicker");
            var oModel = this.getView().getModel("VincaTestDataModel");
            var sUrl;
            var id = 1;
            var sClass = "el";
            //var year = 2017;
           // var month = 1;
            var date = oDatePicker.getValue();
            var year = date.split(".")[2];
            var month = date.split(".")[1];
            var day = date.split(".")[0];

            // change container title and call different xsjs 
            switch (oSource.getSelectedKey()) {
                case "month":
                        // VincaTestMonth
                        //set correct url
                        sUrl = "VincaTestMonth.xsjs?id=" + id +  "&year=" + year + "&month=" + month + "&class=" + sClass;
                        //set chart container title to corresponding selection
                        oChartContainer.setTitle(month+"."+year);
                        //call xsjs 
                        
						oModel.refresh();
                        that.OnLoadMonth(sUrl);
                    break;
                case "year":

                        //this.OnLoadYear();
                        //set correct url
                        sUrl = "VincaTestYear.xsjs?id=" + id +"&year=" + year + "&class=" + sClass;

                        //set chart container title to corresponding selection
                        oChartContainer.setTitle(year);
                        //call xsjs 
                        oModel.refresh();
                        that.OnLoadYear(sUrl);
                    break;

                case "day":
                        // VincaTestDay
                        //set correct url
                        sUrl = "VincaTestDay.xsjs?id=" + id + "&year=" + year + "&month=" + month +  "&day=" + day + "&class=" + sClass;

                        //set chart container title to corresponding selection
                        oChartContainer.setTitle(day+"."+month+"."+year);
                        //call xsjs 
                       // oModel.refresh();
                        that.OnLoadDay(sUrl);
                    break;
            }
		},

		/*onAfterRendering: function() {
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
		},*/

		onChangeDate : function(){
			this.OnHandleSwitchTab();

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