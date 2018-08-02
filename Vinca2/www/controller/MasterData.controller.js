sap.ui.define([
	"sap/ui/core/mvc/Controller"
	
], function(Controller) {
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
		}
	});
});