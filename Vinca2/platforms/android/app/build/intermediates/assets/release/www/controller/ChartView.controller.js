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
	"sap/ui/model/json/JSONModel",
	"sap/viz/ui5/format/ChartFormatter",
	"Vinca/util/formatter"

], function(jQuery, MessageToast, Fragment, Controller, VizFrame, FlattenedDataset, DimensionDefinition, MeasureDefinition, FeedItem, JSONModel, ChartFormatter, formatter) {
	"use strict";
	//edits
	return Controller.extend("Vinca.controller.ChartView", {
		formatter: formatter,

		onInit: function(){

			this.getView().byId("idDatePicker").setValue(moment().format("DD.MM.YYYY"));
			
			this.getRouter().attachRouteMatched(this.onRouteMatched, this);
			
		},

		getRouter: function() {
			return this.getOwnerComponent().getRouter();
		},

		onRouteMatched : function (oEvent) {
			this._passedvariable = oEvent.getParameter('arguments');
			this.fnLoadDefaultValue();
			this.fnLoadDefaultValue2();
			this.fnGetDefaultAbschlagYear();
		},

		fnNavigateToChart : function(){
			this.getRouter().navTo("chartview",{vincaid:this._passedvariable.vincaid});
		},

		fnNavigateToCharttwo : function(){
			this.getRouter().navTo("chartviewtwo",{vincaid:this._passedvariable.vincaid});
		},

		fnNavigateToChartthree : function(){
			this.getRouter().navTo("chartviewthree",{vincaid:this._passedvariable.vincaid});
		},


		fnNavigateToMaster : function(){
			this.getRouter().navTo("masterdata",{vincaid:this._passedvariable.vincaid});
		},

		fnNavigateToHome : function(){
			this.getRouter().navTo("home",{vincaid:this._passedvariable.vincaid});
		},

		handleMenuItemPress: function(oEvent) {
			if (oEvent.getParameter("item").getSubmenu()) {
				return;
			}

			var msg = "";
			if (oEvent.getParameter("item").getMetadata().getName() == "sap.ui.unified.MenuTextFieldItem") {
				msg =  oEvent.getParameter("item").getValue();
			} else {
				msg = oEvent.getParameter("item").getText();
				if(msg==="Dein Stromverbrauch"){
					this.fnNavigateToChart();
				}else if(msg==="Dein Gasverbrauch"){
					this.fnNavigateToCharttwo();
				}else if(msg==="Dein Wasserverbrauch"){
					this.fnNavigateToChartthree();
				}else if (msg==="Stammdaten"){
					this.fnNavigateToMaster();
				}else if (msg==="Home"){
					this.fnNavigateToHome();
				}
			}

			//MessageToast.show(msg);
		},



		handlePressOpenMenu: function(oEvent) {
			var oButton = oEvent.getSource();

			// create menu only once
			if (!this._menu) {
				this._menu = sap.ui.xmlfragment(
					"Vinca.view.fragment.menu",
					this
				);
				this.getView().addDependent(this._menu);
			}

			var eDock = sap.ui.core.Popup.Dock;
			this._menu.open(this._bKeyboard, oButton, eDock.BeginTop, eDock.BeginBottom, oButton);
		},



		fnGetDefaultAbschlagYear : function(){
			var oHtml;
			var that = this;
			var oView = this.getView();
			var VincaElecAbschlagDataModel = new JSONModel();
			var sHost = "https://pipemonplus-q.open-grid-europe.com/oge/apps/vinca/GetData/";
			var id = this._passedvariable.vincaid;
			var aUrl = "GetElecAbschlagDay.xsjs?id=" + id;
			

			oView.setModel(VincaElecAbschlagDataModel, "VincaElecAbschlagDataModel"); 
			$.ajax({
                        url: sHost+aUrl,
                        type: "GET",
                        async: false,
                        success: function(data, textStatus, XMLHttpRequest) {
                            console.log(XMLHttpRequest);
  							VincaElecAbschlagDataModel.setData(data);

                            oView.setModel(VincaElecAbschlagDataModel, "VincaElecAbschlagDataModel"); 
                            //oView.byId("Stromkosten").setModel(VincaCostDataModel);
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
					var nData = oView.getModel("VincaCostDataModel").getProperty("/rs0/0/DIFFERENCE");
                            this.CheckValue(nData);
		},

		// for Abschlag
		fnGetAbschlagYearCost : function(aUrl){
			var oHtml;
			var that = this;
			var oView = this.getView();
			var VincaElecAbschlagDataModel = new JSONModel();
			var sHost = "https://pipemonplus-q.open-grid-europe.com/oge/apps/vinca/GetData/";

			oView.setModel(VincaElecAbschlagDataModel, "VincaElecAbschlagDataModel"); 
			$.ajax({
                        url: sHost+aUrl,
                        type: "GET",
                        async: false,
                        success: function(data, textStatus, XMLHttpRequest) {
                            console.log(XMLHttpRequest);
  							VincaElecAbschlagDataModel.setData(data);

                            oView.setModel(VincaElecAbschlagDataModel, "VincaElecAbschlagDataModel"); 
                           

                        },
                        error: function(XMLHttpRequest, textStatus, errorThrown) {
                            MessageToast.show("Error : " + textStatus);
                            console.log(XMLHttpRequest);
                            console.log(errorThrown);
                            //                             that.fnDisplayAjaxMessage(XMLHttpRequest); 
                           
                        },
                        timeout: 12000 //timeout to 12sec
                    });
		},

		fnGetAbschlagDayCost : function(aUrl){
			var oHtml;
			var that = this;
			var oView = this.getView();
			var VincaElecAbschlagDataModel = new JSONModel();
			var sHost = "https://pipemonplus-q.open-grid-europe.com/oge/apps/vinca/GetData/";

			oView.setModel(VincaElecAbschlagDataModel, "VincaElecAbschlagDataModel"); 
			$.ajax({
                        url: sHost+aUrl,
                        type: "GET",
                        async: false,
                        success: function(data, textStatus, XMLHttpRequest) {
                            console.log(XMLHttpRequest);
  							VincaElecAbschlagDataModel.setData(data);

                            oView.setModel(VincaElecAbschlagDataModel, "VincaElecAbschlagDataModel"); 
                            //oView.byId("Stromkosten").setModel(VincaCostDataModel);
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
		},

		fnGetAbschlagMonthCost : function(aUrl){
			var oHtml;
			var that = this;
			var oView = this.getView();
			var VincaElecAbschlagDataModel = new JSONModel();
			var sHost = "https://pipemonplus-q.open-grid-europe.com/oge/apps/vinca/GetData/";

			oView.setModel(VincaElecAbschlagDataModel, "VincaElecAbschlagDataModel"); 
			$.ajax({
                        url: sHost+aUrl,
                        type: "GET",
                        async: false,
                        success: function(data, textStatus, XMLHttpRequest) {
                            console.log(XMLHttpRequest);
  							VincaElecAbschlagDataModel.setData(data);

                            oView.setModel(VincaElecAbschlagDataModel, "VincaElecAbschlagDataModel"); 
                            //oView.byId("Stromkosten").setModel(VincaCostDataModel);
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
		},

		// end of for Abschlag data call


		//Month cost
		fnGetTotalMonthCost : function(cUrl){
			var oHtml;
			var that = this;
			var oView = this.getView();
			var VincaCostDataModel = new JSONModel();
			var sHost = "https://pipemonplus-q.open-grid-europe.com/oge/apps/vinca/GetData/";

			oView.setModel(VincaCostDataModel, "VincaCostDataModel"); 
			$.ajax({
                        url: sHost+cUrl,
                        type: "GET",
                        async: false,
                        success: function(data, textStatus, XMLHttpRequest) {
                            console.log(XMLHttpRequest);
  							VincaCostDataModel.setData(data);

                            oView.setModel(VincaCostDataModel, "VincaCostDataModel"); 
                            //oView.byId("Stromkosten").setModel(VincaCostDataModel);
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
			
							var nData = oView.getModel("VincaCostDataModel").getProperty("/rs0/0/DIFFERENCE");
                            var nData2 = oView.getModel("VincaCostDataModel").getProperty("/rs0/0/TOTAL")
                            this.CheckValue(nData,nData2);
		},

		fnGetTotalYearCost : function(cUrl){
			var oHtml;
			var that = this;
			var oView = this.getView();
			var VincaCostDataModel = new JSONModel();
			var sHost = "https://pipemonplus-q.open-grid-europe.com/oge/apps/vinca/GetData/";

			oView.setModel(VincaCostDataModel, "VincaCostDataModel"); 
			$.ajax({
                        url: sHost+cUrl,
                        type: "GET",
                        async: false,
                        success: function(data, textStatus, XMLHttpRequest) {
                            console.log(XMLHttpRequest);
  							VincaCostDataModel.setData(data);

                            oView.setModel(VincaCostDataModel, "VincaCostDataModel"); 
                            //oView.byId("Stromkosten").setModel(VincaCostDataModel);
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
							var nData = oView.getModel("VincaCostDataModel").getProperty("/rs0/0/DIFFERENCE");
                            var nData2 = oView.getModel("VincaCostDataModel").getProperty("/rs0/0/TOTAL")
                            this.CheckValue(nData,nData2);
		
		},

		fnGetTotalDayCost : function(cUrl){
			var oHtml;
			var that = this;
			var oView = this.getView();
			var VincaCostDataModel = new JSONModel();
			var sHost = "https://pipemonplus-q.open-grid-europe.com/oge/apps/vinca/GetData/";

			oView.setModel(VincaCostDataModel, "VincaCostDataModel"); 
			$.ajax({
                        url: sHost+cUrl,
                        type: "GET",
                        async: false,
                        success: function(data, textStatus, XMLHttpRequest) {
                            console.log(XMLHttpRequest);
  							VincaCostDataModel.setData(data);

                            oView.setModel(VincaCostDataModel, "VincaCostDataModel"); 
                            //oView.byId("Stromkosten").setModel(VincaCostDataModel);
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
							var nData = oView.getModel("VincaCostDataModel").getProperty("/rs0/0/DIFFERENCE");
                            var nData2 = oView.getModel("VincaCostDataModel").getProperty("/rs0/0/TOTAL")
                            this.CheckValue(nData,nData2);
		},

		fnLoadDefaultValue: function(){
			var oHtml;
			var that = this;
			var oView = this.getView();
			var VincaTestDataModel = new JSONModel();	
			var oChartContainer = that.getView().byId("chartContainer");	
			var oDatePicker = that.getView().byId("idDatePicker");
			var id = this._passedvariable.vincaid;;
			var sClass= "el";
			var date = oDatePicker.getValue();
            var year = date.split(".")[2];
            var month = date.split(".")[1];
            var day = date.split(".")[0];
            that.getView().byId("sgtbtn").setSelectedKey("day");
            oChartContainer.setTitle(day+"."+month+"."+year);
			var sHost = "https://pipemonplus-q.open-grid-europe.com/oge/apps/vinca/GetData/";
			var  sUrl = "VincaTestDay.xsjs?id=" + id + "&year=" + year + "&month=" + month +  "&day=" + day + "&class=" + sClass;
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
 			var FIORI_NUMBER_GER = "__UI5__PercentageMaxFraction2";
          	var chartFormatter = ChartFormatter.getInstance();
	        chartFormatter.registerCustomFormatter(FIORI_NUMBER_GER, function(value) {
            	var percentage = sap.ui.core.format.NumberFormat
					.getFloatInstance({
						groupingEnabled : true,
						groupingSeparator : ".",
						decimalSeparator : ","
					});
             	return percentage.format(value);
          	});
   			// Apply custom formatter for ChartFormatter
			sap.viz.api.env.Format.numericFormatter(chartFormatter);

			
			var oVizFrame = this.getView().byId("idcolumn");
			oVizFrame.removeAllFeeds();
			oVizFrame.destroyDataset();
			var oDataset = new sap.viz.ui5.data.FlattenedDataset({

				dimensions : [{
					name : 'Stunde',
					value : "{HOUR}"}],

				measures : [{
					name : 'kWh',
					value : "{VALUE}"}],

				data :{
					path :"/rs0"
				   }
				 });
				
		   oVizFrame.setDataset(oDataset);
		   oVizFrame.setModel(VincaTestDataModel);
		   oVizFrame.setVizType('column'); //Type of the viz frame
		   // set Viz Properties
		   var abschlagline = oView.getModel("VincaTestDataModel").getData().rs0[0].ABSCHLAG;
		   var array =  oView.getModel("VincaTestDataModel").getData();
		   var aDatacopy = JSON.parse(JSON.stringify(array));
		   var sorted = aDatacopy.rs0.sort(function(a,b) {return a.VALUE - b.VALUE});
		   var sortedValue = aDatacopy.rs0[aDatacopy.rs0.length-1].VALUE;
		   var sortedAbschlag = aDatacopy.rs0[aDatacopy.rs0.length-1].ABSCHLAG;
		   var abschlag;

		   if (sortedValue>sortedAbschlag)
		   {
		   	   abschlag = parseInt(sortedValue * 1.15);
		   }
		   else 
		   {
		   	   abschlag = parseInt(sortedAbschlag * 1.15);
		   }
		   oVizFrame.setVizProperties({
				plotArea: {
					dataLabel: { /* formatString:CustomerFormat.FIORI_LABEL_SHORTFORMAT_2,*/
						visible: false
						
					},

				referenceLine: {
                    	line: 
                    	  {
                    	  	 valueAxis:[
										{
											value: abschlagline, 
											visible: true, 
											size: 2, 
											type: "line", 
											label:{
												text: "Abschlag", 
												visible: true
												 }
										}
								]
							}
						}
           
                },
				/*yAxis:{ 
               		 scale:{ 
                    	fixedRange:true, 
                    	minValue:0, 
                    	maxValue:1
                    }
                },*/
				valueAxis: {
					label: {
						formatString: FIORI_NUMBER_GER
					},
					title: {
						visible: true,
						text: "kWh"
					}
				},
				categoryAxis: {
					title: {
						visible: true,
						text:"Zeitraum"
					}
				},

				title: {
					visible: false,
					text: 'Year'
				},
				tooltip : {
                	formatString : FIORI_NUMBER_GER
                },
                yAxis : {
                	scale: {
                              fixedRange : true,
                              minValue : "0",
                              maxValue : abschlag
                    }
                }
			});

		   	var scales = [{
     		'feed': 'color',
     		'palette': ['#ffc133']
      		}];

      		

			var  feedValueAxis = new sap.viz.ui5.controls.common.feeds.FeedItem({
		   		'uid' : "valueAxis",
		   		'type' : "Measure",
		   		'values' : ["kWh"]
		   	}),

	         feedCategoryAxis = new sap.viz.ui5.controls.common.feeds.FeedItem({
		   		'uid' : "categoryAxis",
		   		'type' : "Dimension",
		   		'values' : ["Stunde"]
		   	});

	     var vizScalesOption = {replace: true};
 		 oVizFrame.setVizScales(scales, vizScalesOption);
	     oVizFrame.addFeed(feedValueAxis);
	     oVizFrame.addFeed(feedCategoryAxis);

		},

		fnLoadDefaultValue2: function(){
			var oHtml;
			var that = this;
			var oView = this.getView();
			var VincaCostDataModel = new JSONModel();		
			var oDatePicker = that.getView().byId("idDatePicker");
			var id = this._passedvariable.vincaid;;
			var cid = this._passedvariable.vincaid;;
			var sClass= "el";
			var date = oDatePicker.getValue();
            var year = date.split(".")[2];
            var month = date.split(".")[1];
            var day = date.split(".")[0];	
		

			var sHost = "https://pipemonplus-q.open-grid-europe.com/oge/apps/vinca/GetData/";
			var cUrl = "GetDayCost.xsjs?id=" + id + "&cid=" + cid + "&year=" + year + "&month=" + month +  "&day=" + day + "&class=" + sClass;
			/*var data = {
				"rs0":[{"YEAR":2017,"MONTH":"Jan","VALUE":339},{"YEAR":2017,"MONTH":"Feb","VALUE":100},{"YEAR":2017,"MONTH":"Mar","VALUE":200},{"YEAR":2017,"MONTH":"Apr","VALUE":300},{"YEAR":2017,"MONTH":"May","VALUE":0},{"YEAR":2017,"MONTH":"Jun","VALUE":0},{"YEAR":2017,"MONTH":"Jul","VALUE":0},{"YEAR":2017,"MONTH":"Aug","VALUE":0},{"YEAR":2017,"MONTH":"Sept","VALUE":0},{"YEAR":2017,"MONTH":"Oct","VALUE":0},{"YEAR":2017,"MONTH":"Nov","VALUE":0},{"YEAR":2017,"MONTH":"Dec","VALUE":0}]
			};
			VincaTestDataModel.setData(data);*/
			oView.setModel(VincaCostDataModel, "VincaCostDataModel"); 
			$.ajax({
                        url: sHost+cUrl,
                        type: "GET",
                        async: false,
                        success: function(data, textStatus, XMLHttpRequest) {
                            console.log(XMLHttpRequest);
  							VincaCostDataModel.setData(data);

                            oView.setModel(VincaCostDataModel, "VincaCostDataModel"); 
                            //oView.byId("Stromkosten").setModel(VincaCostDataModel);
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
							var nData = oView.getModel("VincaCostDataModel").getProperty("/rs0/0/DIFFERENCE");
							var nData2 = oView.getModel("VincaCostDataModel").getProperty("/rs0/0/TOTAL")
                            this.CheckValue(nData,nData2);
		},

		CheckValue: function(sData,tData){

                            if (0 <= sData ){
                            	
                            	this.getView().byId("Differenz").removeStyleClass("colorChangeValueNegative");
                            	this.getView().byId("Differenz").addStyleClass("colorChangeValuePositive");
                            } else {
                            	
                            	this.getView().byId("Differenz").removeStyleClass("colorChangeValuePositive");
                            	this.getView().byId("Differenz").addStyleClass("colorChangeValueNegative");

                            }


                            if (tData>=10000){
                            	this.getView().byId("Stromverbrauch").addStyleClass("total");
                            } else {
                            	this.getView().byId("Stromverbrauch").removeStyleClass("total");
                            }
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
	               // that.fnLoadYear(VincaTestDataModel);            

	            },
	            error: function(XMLHttpRequest, textStatus, errorThrown) {
	                MessageToast.show("Error : " + textStatus);
	                console.log(XMLHttpRequest);
	                console.log(errorThrown);
	                //                             that.fnDisplayAjaxMessage(XMLHttpRequest); 
	               
	            },
	            timeout: 12000 //timeout to 12sec
            });

			var FIORI_NUMBER_GER = "__UI5__PercentageMaxFraction2";
          	var chartFormatter = ChartFormatter.getInstance();
	        chartFormatter.registerCustomFormatter(FIORI_NUMBER_GER, function(value) {
            	var percentage = sap.ui.core.format.NumberFormat
					.getFloatInstance({
						groupingEnabled : true,
						groupingSeparator : ".",
						decimalSeparator : ","
					});
             	return percentage.format(value);
          	});
   			// Apply custom formatter for ChartFormatter
			sap.viz.api.env.Format.numericFormatter(chartFormatter);

			var oVizFrame = this.getView().byId("idcolumn");
			oVizFrame.removeAllFeeds();
			oVizFrame.destroyDataset();
					
			var oDataset = new sap.viz.ui5.data.FlattenedDataset({
				dimensions : [{
					name : 'Monat',
					value : "{MONTH}"
				}],
				measures : [{
					name : 'kWh',
					value : {
						path : 'VALUE'
					}
				}],
				data : {
					path :"/rs0"
				}
		 	});
   						
			oVizFrame.setDataset(oDataset);
		   	oVizFrame.setModel(VincaTestDataModel);
		   	oVizFrame.setVizType('column'); //Type of the viz frame
					   
		   	// Set Viz Properties
		   var abschlagline = oView.getModel("VincaTestDataModel").getData().rs0[0].ABSCHLAG;
		   var array =  oView.getModel("VincaTestDataModel").getData();
		   var aDatacopy = JSON.parse(JSON.stringify(array));
		   var sorted = aDatacopy.rs0.sort(function(a,b) {return a.VALUE - b.VALUE});
		   var sortedValue = aDatacopy.rs0[aDatacopy.rs0.length-1].VALUE;
		   var sortedAbschlag = aDatacopy.rs0[aDatacopy.rs0.length-1].ABSCHLAG;
		   var abschlag;

		   if (sortedValue>sortedAbschlag)
		   {
		   	   abschlag = parseInt(sortedValue * 1.15);
		   }
		   else 
		   {
		   	   abschlag = parseInt(sortedAbschlag * 1.15);
		   }
		   //sorted = list.rs0.sort(function(a,b) {return a.MONTH - b.MONTH});
		  	oVizFrame.setVizProperties({
                plotArea: {
                    dataLabel: {
                        visible: false
                    },
                referenceLine: {
                    	line: 
                    	  {
                    	  	 valueAxis:[
										{
											value: abschlagline, 
											visible: true, 
											size: 2, 
											type: "line", 
											label:{
												text: "Abschlag", 
												visible: true
												 }
										}
								]
							}
						}
           
                },

                valueAxis: {
					label: {
						formatString: FIORI_NUMBER_GER
					},
					title: {
						visible: true,
						text: "kWh"
					}
				},
                categoryAxis: {
                    title: {
                        visible: true,
                        text: "Monat"
                    }
                },
                title: {
                    visible: false,
                    text: 'Year'
                },
                tooltip : {
                	formatString : FIORI_NUMBER_GER
                },
                yAxis : {
                	scale: {
                              fixedRange : true,
                              minValue : "0",
                              maxValue : abschlag
                    }
                }
            });
		    var scales = [{
	     		'feed': 'color',
	     		'palette': ['#ffc133']
      		}];

			var  feedValueAxis = new sap.viz.ui5.controls.common.feeds.FeedItem({
		   		'uid' : "valueAxis",
		   		'type' : "Measure",
		   		'values' : ["kWh"]
		   	}),

	        feedCategoryAxis = new sap.viz.ui5.controls.common.feeds.FeedItem({
		   		'uid' : "categoryAxis",
		   		'type' : "Dimension",
		   		'values' : ["Monat"]
		   	});

		    var vizScalesOption = {replace: true};
	 		oVizFrame.setVizScales(scales, vizScalesOption);
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

			var FIORI_NUMBER_GER = "__UI5__PercentageMaxFraction2";
          	var chartFormatter = ChartFormatter.getInstance();
	        chartFormatter.registerCustomFormatter(FIORI_NUMBER_GER, function(value) {
            	var percentage = sap.ui.core.format.NumberFormat
					.getFloatInstance({
						groupingEnabled : true,
						groupingSeparator : ".",
						decimalSeparator : ","
					});
             	return percentage.format(value);
          	});
   			// Apply custom formatter for ChartFormatter
			sap.viz.api.env.Format.numericFormatter(chartFormatter);

			var oVizFrame = this.getView().byId("idcolumn");
			oVizFrame.removeAllFeeds();
			oVizFrame.destroyDataset();
			var oDataset = new sap.viz.ui5.data.FlattenedDataset({

				dimensions : [{
					name : 'Tag',
					value : "{DAY}"}],

			/*	measures : [{
					name : 'kWh',
					value : "{VALUE}"},{
					name : 'Budget',
					value : 100}],*/

					measures : [{
					name : 'kWh',
					value : "{VALUE}"}],

				data :{
					path :"/rs0"
				   }
				 });
				
		   oVizFrame.setDataset(oDataset);
		   oVizFrame.setModel(VincaTestDataModel);
		   oVizFrame.setVizType('column'); //Type of the viz frame
		   // set Viz Properties
		   var abschlagline = oView.getModel("VincaTestDataModel").getData().rs0[0].ABSCHLAG;
		   var array =  oView.getModel("VincaTestDataModel").getData();
		   var aDatacopy = JSON.parse(JSON.stringify(array));
		   var sorted = aDatacopy.rs0.sort(function(a,b) {return a.VALUE - b.VALUE});
		   var sortedValue = aDatacopy.rs0[aDatacopy.rs0.length-1].VALUE;
		   var sortedAbschlag = aDatacopy.rs0[aDatacopy.rs0.length-1].ABSCHLAG;
		   var abschlag;

		   if (sortedValue>sortedAbschlag)
		   {
		   	   abschlag = parseInt(sortedValue * 1.15);
		   }
		   else 
		   {
		   	   abschlag = parseInt(sortedAbschlag * 1.15);
		   }
		  oVizFrame.setVizProperties({
                plotArea: {
                    dataLabel: {
                       /* formatString:CustomerFormat.FIORI_LABEL_SHORTFORMAT_2,*/

                        visible: false
                    },

                    referenceLine: {
                    	line: 
                    	  {
                    	  	 valueAxis:[
										{
											value: abschlagline, 
											visible: true, 
											size: 2, 
											type: "line", 
											label:{
												text: "Abschlag", 
												visible: true
												 }
										}
								]
							}
						}
           
                },
                valueAxis: {
					label: {
						formatString: FIORI_NUMBER_GER
					},
					title: {
						visible: true,
						text: "kWh"
					}
				},
                categoryAxis: {
                    title: {
                        visible: true,
                        text: "Tag"
                    },
                    scale: {
                              fixedRange : false,
                              minValue : "0",
                              maxValue : abschlag
                    },
                },
                title: {
                    visible: false,
                    text: 'Year'
                },
                tooltip : {
                	formatString : FIORI_NUMBER_GER
                },
                yAxis : {
                	scale: {
                              fixedRange : true,
                              minValue : "0",
                              maxValue : abschlag
                    }
                }
              
            });

		 
		  var nData = oView.getModel("VincaTestDataModel").getProperty("/rs0/0/VALUE");
                            this.checkGraph(nData);
		var scales = [{
     		'feed': 'color',
     		'palette': ['#ffc133']
      		}];

  

		var  feedValueAxis = new sap.viz.ui5.controls.common.feeds.FeedItem({
		   		'uid' : "valueAxis",
		   		'type' : "Measure",
		   		
		   		'values' : ["kWh"]
		   	}),

		

	         feedCategoryAxis = new sap.viz.ui5.controls.common.feeds.FeedItem({
		   		'uid' : "categoryAxis",
		   		'type' : "Dimension",
		   		'values' : ["Tag"]
		   	});
	     var vizScalesOption = {replace: true};
 		 oVizFrame.setVizScales(scales, vizScalesOption);
	     oVizFrame.addFeed(feedValueAxis);
	     /*oVizFrame.addFeed(feedValueAxis1);*/
	     oVizFrame.addFeed(feedCategoryAxis);
		},

		checkGraph: function(sData){
			
			if (sData > 40 ){
                            	var scales = [{
     							'feed': 'color',
     							'palette': ['#ffc133']
      							}];
      							return sData;
                            } else{
                            	var scales = [{
     							'feed': 'color',
     							'palette': ['#d11020']
      							}];
      							return sData;
                            }
		
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

			var FIORI_NUMBER_GER = "__UI5__PercentageMaxFraction2";
          	var chartFormatter = ChartFormatter.getInstance();
	        chartFormatter.registerCustomFormatter(FIORI_NUMBER_GER, function(value) {
            	var percentage = sap.ui.core.format.NumberFormat
					.getFloatInstance({
						groupingEnabled : true,
						groupingSeparator : ".",
						decimalSeparator : ","
					});
             	return percentage.format(value);
          	});
   			// Apply custom formatter for ChartFormatter
			sap.viz.api.env.Format.numericFormatter(chartFormatter);


			var oVizFrame = this.getView().byId("idcolumn");
			oVizFrame.removeAllFeeds();
			oVizFrame.destroyDataset();
			var oDataset = new sap.viz.ui5.data.FlattenedDataset({

				dimensions : [{
					name : 'Stunde',
					value : "{HOUR}"}],

				measures : [{
					name : 'kWh',
					value : "{VALUE}"}],

				data :{
					path :"/rs0"
				   }
				 });
				
		   oVizFrame.setDataset(oDataset);
		   oVizFrame.setModel(VincaTestDataModel);
		   oVizFrame.setVizType('column'); //Type of the viz frame
		   // set Viz Properties
		   var abschlagline = oView.getModel("VincaTestDataModel").getData().rs0[0].ABSCHLAG;
		   var array =  oView.getModel("VincaTestDataModel").getData();
		   var aDatacopy = JSON.parse(JSON.stringify(array));
		   var sorted = aDatacopy.rs0.sort(function(a,b) {return a.VALUE - b.VALUE});
		   var sortedValue = aDatacopy.rs0[aDatacopy.rs0.length-1].VALUE;
		   var sortedAbschlag = aDatacopy.rs0[aDatacopy.rs0.length-1].ABSCHLAG;
		   var abschlag;

		   if (sortedValue>sortedAbschlag)
		   {
		   	   abschlag = parseInt(sortedValue * 1.15);
		   }
		   else 
		   {
		   	   abschlag = parseInt(sortedAbschlag * 1.15);
		   }

		   oVizFrame.setVizProperties({
				plotArea: {
					dataLabel: { 
						visible: false
					},
				referenceLine: {
                    	line: 
                    	  {
                    	  	 valueAxis:[
										{
											value: abschlagline, 
											visible: true, 
											size: 2, 
											type: "line", 
											label:{
												text: "Abschlag", 
												visible: true
												 }
										}
								]
							}
						}
           
                },
				valueAxis: {
					label: {
						formatString: null
					},
					title: {
						visible: true,
						text: "kWh"
					}
				},
				categoryAxis: {
					title: {
						visible: true,
						text: "Zeitraum"
					},
					scale: {
                              fixedRange : false,
                              minValue : "0",
                              maxValue : abschlag
                    }
				},
				title: {
					visible: false,
					text: 'Year'
				},
				tooltip : {
                	formatString : FIORI_NUMBER_GER
                },
                yAxis : {
                	scale: {
                              fixedRange : true,
                              minValue : "0",
                              maxValue : abschlag 
                    }
                }
			});
		var scales = [{
     		'feed': 'color',
     		'palette': ['#ffc133']
      		}];
		var  feedValueAxis = new sap.viz.ui5.controls.common.feeds.FeedItem({
		   		'uid' : "valueAxis",
		   		'type' : "Measure",
		   		'values' : ["kWh"]
		   	}),

	         feedCategoryAxis = new sap.viz.ui5.controls.common.feeds.FeedItem({
		   		'uid' : "categoryAxis",
		   		'type' : "Dimension",
		   		'values' : ["Stunde"]
		   	});
	     var vizScalesOption = {replace: true};
 		 oVizFrame.setVizScales(scales, vizScalesOption);
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
            var oModel = that.getView().getModel("VincaTestDataModel");
            var sUrl;
            var cUrl;
            var aUrl;
            var id = this._passedvariable.vincaid;;
            var cid = this._passedvariable.vincaid;
            var sClass = "el";
           
            var date = oDatePicker.getValue();
            var year = date.split(".")[2];
            var month = date.split(".")[1];
            var day = date.split(".")[0];

            // change container title and call different xsjs 
            switch (oSource.getSelectedKey()) {
                   case "month":
                        // VincaTestMonth
                        //set correct url
                        aUrl = "GetElecAbschlagMonth.xsjs?id=" + id;
                        sUrl = "VincaTestMonth.xsjs?id=" + id +  "&year=" + year + "&month=" + month + "&class=" + sClass;
                        cUrl = "GetMonthCost.xsjs?id=" + id +"&cid=" + cid + "&year=" + year + "&month=" + month +"&class=" + sClass
                        //set chart container title to corresponding selection
                        
                      	var sdate = moment(month, "MM").format('MMM')

                        oChartContainer.setTitle(sdate+" "+year);
                        //call xsjs 

                        that.fnGetTotalMonthCost(cUrl);
                        that.OnLoadMonth(sUrl);
                        that.fnGetAbschlagMonthCost(aUrl);
                    break;
                case "year":

                        //this.OnLoadYear();
                        //set correct url
                        aUrl = "GetElecAbschlagYear.xsjs?id=" + id;
                        sUrl = "VincaTestYear.xsjs?id=" + id +"&year=" + year + "&class=" + sClass;
                        cUrl = "GetYearCost.xsjs?id=" + id +"&cid=" + cid + "&year=" + year +"&class=" + sClass
                        //set chart container title to corresponding selection
                        oChartContainer.setTitle(year);
                        //call xsjs 
 						that.fnGetTotalYearCost(cUrl);
                        that.OnLoadYear(sUrl);
                        that.fnGetAbschlagYearCost(aUrl);
                    break;

                case "day":
                        // VincaTestDay
                        //set correct url
                        aUrl = "GetElecAbschlagDay.xsjs?id=" + id;
                        sUrl = "VincaTestDay.xsjs?id=" + id + "&year=" + year + "&month=" + month +  "&day=" + day + "&class=" + sClass;
                        cUrl = "GetDayCost.xsjs?id=" + id + "&cid=" + cid + "&year=" + year + "&month=" + month +  "&day=" + day + "&class=" + sClass;

                        //set chart container title to corresponding selection
                        oChartContainer.setTitle(day+"."+month+"."+year);
                        //call xsjs 
                       // oModel.refresh();
                       	that.fnGetTotalDayCost(cUrl);
                        that.OnLoadDay(sUrl);
                        that.fnGetAbschlagDayCost(aUrl);
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