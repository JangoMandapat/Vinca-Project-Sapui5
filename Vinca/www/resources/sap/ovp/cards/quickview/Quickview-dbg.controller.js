(function () {
    "use strict";
    /*global sap, jQuery */

    jQuery.sap.require( "sap.ovp.cards.AnnotationHelper" );
    sap.ui.controller( "sap.ovp.cards.quickview.Quickview" , {
        onInit: function () {
        },
        onAfterRendering: function(){
            jQuery( ".sapMQuickViewPage" ).attr( 'tabindex','0' );
            // set first footer button to invisible due to redundancy (first button navigation is the same as header navigation)
            // for now this code is a soft commit so we do not execute this
            var bEnabled = false;
            if ( bEnabled ) {
                var oFooter = this.byId("ovpActionFooter");
                if (oFooter) {
                    var aFooterBtns = oFooter.getContent();
                    if (aFooterBtns && aFooterBtns.length) {
                        for (var i = 0; i < aFooterBtns.length; i++) {
                            if (aFooterBtns[i] instanceof sap.m.Button) {
                                aFooterBtns[i].setVisible(false);
                                break;
                            }
                        }
                    }
                }
            }
        }

    });
})();
