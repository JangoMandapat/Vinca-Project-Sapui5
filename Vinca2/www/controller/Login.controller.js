sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast"
	
], function(Controller,
	MessageToast) {
	"use strict";

	return Controller.extend("Vinca.controller.Login", {
		
		getRouter: function() {
			return this.getOwnerComponent().getRouter();
		},

		fnNavigateToHome : function(){
			this.getRouter().navTo("home");
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

		Onpress1 : function () {
			//insert username in login page
				debugger;
				// var oUser = this.getView().getModel().getProperty("/username");
				// var oPassword = this.getView().getModel().getProperty("/password");

				var sUserName = this.getView().byId("userID").getValue();
				var sUserPass = this.getView().byId("userPassword").getValue();
				
				if (sUserName === "user" && sUserPass === "1234"){
					
				//this.getRouter().navTo("App");
            //	MessageToast.show("user name and password correct");
            	this.fnNavigateToHome();

        	}
        	
          
          else {
          MessageToast.show("Please enter correct username or password");
          }
				
			
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
		}
	});
});