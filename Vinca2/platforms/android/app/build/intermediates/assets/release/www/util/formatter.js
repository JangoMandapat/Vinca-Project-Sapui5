sap.ui.define([], function() {
    "use strict";
    return {

    	CheckCurrencyValue: function(sData) {
    		
		if (sData) {
			
			var oNumberFormat = sap.ui.core.format.NumberFormat
					.getFloatInstance({
						groupingEnabled : true,
						groupingSeparator : ".",
						decimalSeparator : ","
					});
			var oValue = oNumberFormat.format(sData);
			return oValue;
		} else {
			
			return sData;
		}
	},
		
		

        CheckCurrencyValue1: function(oData) {
            if (oData) {
                if (oData.includes(".")) {
                    var oValue = oData.replace(/\,/g, '.');
                    return oValue;
                } else {
                    var oValue = oData;
                    return oValue;
                }

            }
        },
    }
});