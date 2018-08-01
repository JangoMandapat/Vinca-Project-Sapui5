sap.ui.define([
	"sap/ui/core/mvc/Controller"
	
], function(Controller) {
	"use strict";

	return Controller.extend("Vinca.controller.Home", {
		
		getRouter: function() {
			return this.getOwnerComponent().getRouter();
		},


		fnNavigateToChart : function(){
			this.getRouter().navTo("chartview");
		},

		fnNavigateToMaster : function(){
			this.getRouter().navTo("masterdata");
		}
	});
});