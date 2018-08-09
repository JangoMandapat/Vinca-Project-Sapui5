sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast"
	
], function(Controller, JSONModel, MessageToast) {
	"use strict";

	return Controller.extend("Vinca.controller.MasterData", {
		
		getRouter: function() {
			return this.getOwnerComponent().getRouter();
		},

		fnNavigateToChart : function(){
			this.getRouter().navTo("chartview");
		},

		fnNavigateToMaster : function(){
			this.getRouter().navTo("masterdata");
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
				if(msg===">Dein Stromverbrauch"){
					this.fnNavigateToChart();
				}else if (msg===">Stammdaten"){
					this.fnNavigateToMaster();
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

		OnSave : function () {
			//insert username in login page
				
				// var oUser = this.getView().getModel().getProperty("/username");
				// var oPassword = this.getView().getModel().getProperty("/password");
				var oView = this.getView();
				var that = this;
				var id = 1;
				var reduction = this.getView().byId("Stromabschlag").getValue();
				var cost = this.getView().byId("Stromkosten").getValue();
				var fee = this.getView().byId("Grundgebuhren").getValue();
				var oHtml;
				var VincaMasterData = new JSONModel();
				var sHost = "https://pipemonplus-q.open-grid-europe.com/oge/apps/vinca/GetData/";
				var lUrl = "VincaMasterData.xsjs?id=" + id +"&reduction=" + reduction + "&cost=" + cost + "&fee=" + fee;

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