sap.ui.define([
	"sap/ui/core/mvc/Controller"
	
], function(Controller) {
	"use strict";

	return Controller.extend("Vinca.controller.Home", {

		onInit:function(){
			 this.getRouter().attachRouteMatched(this.onRouteMatched, this);
		},
		
		onRouteMatched : function (oEvent) {
			this._passedvariable = oEvent.getParameter('arguments');
		},


		getRouter: function() {
			return this.getOwnerComponent().getRouter();
		},


		fnNavigateToChart : function(){
			this.getRouter().navTo("chartview",{vincaid:this._passedvariable.vincaid});
		},

		fnNavigateToMaster : function(){
			this.getRouter().navTo("masterdata",{vincaid:this._passedvariable.vincaid});
		}
	});
});