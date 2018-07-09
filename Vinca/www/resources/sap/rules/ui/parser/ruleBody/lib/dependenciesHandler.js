jQuery.sap.declare("sap.rules.ui.parser.ruleBody.lib.dependenciesHandler");
function DependeciesHandler(){this.depMap={};}
DependeciesHandler.prototype=(function(){return{getDependencies:function(){return this.depMap;},addDependencies:function(d){var k=null;for(k in d){if(d.hasOwnProperty(k)){if(!this.depMap.hasOwnProperty(k)){this.depMap[k]=d[k];}}}}};}());
