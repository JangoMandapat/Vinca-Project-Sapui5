sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel"
	
], function(Controller,
	MessageToast, JSONModel) {
	"use strict";

	return Controller.extend("Vinca.controller.Login", {
		
		onInit:function(){
			
		},

		getRouter: function() {
			return this.getOwnerComponent().getRouter();
		},

		fnNavigateToHome : function(vincaid){
			this.getRouter().navTo("home",{vincaid:vincaid});
		},


		/*handleMenuItemPress: function(oEvent) {
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
		},*/

		Onpress1 : function (channel, event, oData) {
			//insert username in login page
				
				// var oUser = this.getView().getModel().getProperty("/username");
				// var oPassword = this.getView().getModel().getProperty("/password");

				var oView = this.getView();
				var that = this;
				var sClass = "el";
				var sUserName = this.getView().byId("userID").getValue();
				var sUserPass = this.getView().byId("userPassword").getValue();
				var oHtml;
				var VincaLogin = new JSONModel();
				var sHost = "https://pipemonplus-q.open-grid-europe.com/oge/apps/vinca/GetData/";
				var lUrl = "VincaLogin.xsjs?id=" + sUserName +"&pass=" + sUserPass + "&class=" + sClass;

				oView.setModel(VincaLogin, "VincaLogin"); 
			$.ajax({
                        url: sHost+lUrl,
                        type: "GET",
                        async: false,
                        success: function(data, textStatus, XMLHttpRequest) {
                            console.log(XMLHttpRequest);
  							VincaLogin.setData(data);
  							
                            oView.setModel(VincaLogin, "VincaLogin"); 
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
		
			var iStatus = this.getView().getModel("VincaLogin").getProperty("/rs0/0/STATUS");
			var sMessage = this.getView().getModel("VincaLogin").getProperty("/rs0/0/MSG");
			var VincaId =  this.getView().getModel("VincaLogin").getProperty("/rs0/0/VINCA_ID");
			if (iStatus === 1){
					
				//this.getRouter().navTo("App");
            //	MessageToast.show("user name and password correct");
            	this.fnNavigateToHome(VincaId);

        	}
        	
          
          else {
          MessageToast.show(sMessage);
          }
				
          
		}

				
	});
});