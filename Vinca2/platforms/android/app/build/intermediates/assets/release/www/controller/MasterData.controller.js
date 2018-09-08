sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast"
	
], function(Controller, JSONModel, MessageToast) {
	"use strict";

	return Controller.extend("Vinca.controller.MasterData", {
		
		onInit:function(){
		 this.getRouter().attachRouteMatched(this.onRouteMatched, this);
		},

		onRouteMatched : function (oEvent) {
			this._passedvariable = oEvent.getParameter('arguments');
			this.fnGetUser();
		},

		getRouter: function() {
			return this.getOwnerComponent().getRouter();

		},

		fnNavigateToChart : function(){
			this.getRouter().navTo("chartview",{vincaid:this._passedvariable.vincaid});
		},

		fnNavigateToMaster : function(){
			this.getRouter().navTo("masterdata",{vincaid:this._passedvariable.vincaid});
		},

		fnNavigateToCharttwo : function(){
			this.getRouter().navTo("chartviewtwo",{vincaid:this._passedvariable.vincaid});
		},

		fnNavigateToChartthree : function(){
			this.getRouter().navTo("chartviewthree",{vincaid:this._passedvariable.vincaid});
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

		fnGetUser : function(){
			var oHtml;
			var that = this;
			var oView = this.getView();
			var VincaUserModel = new JSONModel();
			var sHost = "https://pipemonplus-q.open-grid-europe.com/oge/apps/vinca/GetData/";
			var id = this._passedvariable.vincaid;
			var aUrl = "GetUser.xsjs?id=" + id;
			

			oView.setModel(VincaUserModel, "VincaUserModel"); 
			$.ajax({
                        url: sHost+aUrl,
                        type: "GET",
                        async: false,
                        success: function(data, textStatus, XMLHttpRequest) {
                            console.log(XMLHttpRequest);
  							VincaUserModel.setData(data);

                            oView.setModel(VincaUserModel, "VincaUserModel"); 
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

		OnHandleSwitchTab : function(oEvent){
		var that = this;
		var oSource;
		var Sclass;

					if (oEvent === undefined)
					{
						oSource = that.getView().byId("sgtbtn");
					}
					else 
					{
			    		oSource = oEvent.getSource();
					}
				var label1 = that.getView().byId("label1");
				var label2 = that.getView().byId("label2");
				var label3 = that.getView().byId("label3");


		 	    switch (oSource.getSelectedKey()) 
		 	    {
		  			case "elec":
		  				
		  				  label2.setText("Kosten pro kWh in Cent:")
		  				  //that.OnSave(Sclass);
		  			break;
		  			case "gas":
		  			 	  Sclass = "gas";
		  			 	  label2.setText("Kosten pro kWh in Cent:")
		  			 	 // that.OnSave(Sclass);
		  			break;
		  			case "water":
		  			      Sclass = "water";
		  			      label2.setText("Kosten pro l in Cent:")
		  			      //that.OnSave(Sclass);
		  			break;
		 		 }

		},

		OnSave : function (Sclass) {
			//insert username in login page
				
				// var oUser = this.getView().getModel().getProperty("/username");
				// var oPassword = this.getView().getModel().getProperty("/password");
				
				
				var sclass;
				var oView = this.getView();
				var that = this;
				var id = this._passedvariable.vincaid;
				var selection = that.getView().byId("sgtbtn");
				switch (selection.getSelectedKey())
				{
					case "elec":
						  sclass = "el";
					break;
					case "gas":
						  sclass = "gas";
					break;
					case "water":
						  sclass = "water";
					break;

				}
				var reduction = parseFloat(this.getView().byId("Stromabschlag").getValue());
				var cost = parseFloat(this.getView().byId("Stromkosten").getValue());
				var fee = parseFloat(this.getView().byId("Grundgebuhren").getValue());
				var oHtml;
				var VincaMasterData = new JSONModel();
				var sHost = "https://pipemonplus-q.open-grid-europe.com/oge/apps/vinca/GetData/";
				var lUrl = "VincaMasterData.xsjs?id=" + id +"&reduction=" + reduction + "&cost=" + cost + "&fee=" + fee + "&class=" + sclass;

				oView.setModel(VincaMasterData, "VincaMasterData"); 
			$.ajax({
                        url: sHost+lUrl,
                        type: "GET",
                        async: false,
                        success: function(data, textStatus, XMLHttpRequest) {
                            console.log(XMLHttpRequest);
  							VincaMasterData.setData(data);
  							
                            oView.setModel(VincaMasterData, "VincaMasterData"); 
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
		
			//var iStatus = this.getView().getModel("VincaMasterData").getProperty("/rs0/0/STATUS");
			var sMessage = this.getView().getModel("VincaMasterData").getProperty("/rs0/0/MSG");
			//if (iStatus === 1){
					
				//this.getRouter().navTo("App");
            //	MessageToast.show("user name and password correct");
            //	this.fnNavigateToHome();

        	//}
        	
          
         // else {
          MessageToast.show(sMessage);
         // }
				
          
		}
	});
});