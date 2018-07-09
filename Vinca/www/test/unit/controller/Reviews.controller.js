/*global QUnit,sinon*/

sap.ui.define([
	"sap/suite/ui/commons/demo/tutorial/controller/Reviews.controller",
	"sap/ui/thirdparty/sinon",
	"sap/ui/thirdparty/sinon-qunit"
], function(ReviewsController) {
	"use strict";

	QUnit.module("Reviews Controller - onHorizontalSwitchChange event handler", {
		beforeEach: function() {
			this.getParameter = function() {
				return true;
			};
			this.oEventMock = {
				getParameter: this.getParameter
			};
			this.oController = new ReviewsController();
		},
		afterEach: function() {
			this.oController.destroy();
		}
	});

	QUnit.test("Property changed according to switch state in timeline control - horizontal", function(assert) {
		var oTimeLineMock = {
			setAxisOrientation: setAxisOrientation
		};
		this.oController.oTimeline = oTimeLineMock;
		this.oController.onHorizontalSwitchChange(this.oEventMock);
		function setAxisOrientation(value) {
			assert.equal(value, "Horizontal", "Property 'AxisOrientation' correctly set");
		}
	});

	QUnit.test("Property changed according to switch state in timeline control - vertical", function(assert) {
		var oTimeLineMock = {
			setAxisOrientation: setAxisOrientation
		};
		this.oController.oTimeline = oTimeLineMock;
		this.oEventMock.getParameter = function () {
			return false;
		};
		this.oController.onHorizontalSwitchChange(this.oEventMock);
		function setAxisOrientation(value) {
			assert.equal(value, "Vertical", "Property 'AxisOrientation' correctly set");
		}
	});

	QUnit.module("Reviews Controller - formatDateTime formatter", {
		beforeEach: function() {
			this.oController = new ReviewsController();
		},
		afterEach: function() {
			this.oController.destroy();
		}
	});

	QUnit.test("", function(assert) {
		var sResult = this.oController.formatDateTime("2016-03-04");
		assert.equal(sResult, "Mar 4, 2016", "Date transformed to local format");
	});
});
