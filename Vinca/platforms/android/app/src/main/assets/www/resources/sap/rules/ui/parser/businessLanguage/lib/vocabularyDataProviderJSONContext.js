jQuery.sap.declare("sap.rules.ui.parser.resources.vocabulary.lib.vocabularyDataProviderJSONContext");jQuery.sap.require("sap.rules.ui.parser.resources.vocabulary.lib.vocabularyDataProviderBaseContext");jQuery.sap.require("sap.rules.ui.parser.resources.vocabulary.lib.JSONLoader");sap.rules.ui.parser.resources.vocabulary.lib.vocabularyDataProviderJSONContext=sap.rules.ui.parser.resources.vocabulary.lib.vocabularyDataProviderJSONContext||{};sap.rules.ui.parser.resources.vocabulary.lib.vocabularyDataProviderJSONContext.lib=(function(){var v=sap.rules.ui.parser.resources.vocabulary.lib.vocabularyDataProviderBaseContext.lib;var j=sap.rules.ui.parser.resources.vocabulary.lib.JSONLoader.lib;var a=new j.JSONLoaderLib();function b(r,c){this.jsonResourceContent=r;this.resourceID={"name":c,"package":"","suffix":null};}b.prototype=new v.vocaDataProviderBaseContextLib();b.prototype.constructor=b;b.prototype.loadAll=function(c){a.loadAll(c,this.jsonResourceContent,false,null,this.resourceID,null,false);};b.prototype.getHRFSchema=function(){return"";};b.prototype.getDefinedTemplates=function(){return[];};b.prototype.readValueListValues=function(){return;};b.prototype.loadAllVocabularies=function(c){if(!c.allVocabularies){c.allVocabularies={};}this.loadAll(c);};b.prototype.loadAllObjects=function(c){if(!c.allObjects){c.allObjects=[];}this.loadAll(c);};b.prototype.getDynamicRuleTemplateAttributes=function(){return;};b.prototype.loadAllActions=function(c){if(!c.allActions){c.allActions=[];}this.loadAll(c);};b.prototype.loadAllAliases=function(c){if(!c.allAliases){c.allAliases=[];}this.loadAll(c);};b.prototype.loadAllValueLists=function(c){if(!c.allValueLists){c.allValueLists=[];}a.loadAll(c,this.jsonResourceContent,this.isPrivate,this.connection,this.resourceID,null,true);};b.prototype.loadAllTerms=function(c){if(!c.allTerms){c.allTerms=[];}this.loadAll(c);};b.prototype.loadAllTermModifiers=function(c){if(!c.allTermsModifiers){c.allTermsModifiers=[];}a.loadAll(c,this.jsonResourceContent,this.isPrivate,this.connection,this.resourceID,null,true);};b.prototype.loadAllOutputs=function(c){if(!c.allOutputs){c.allOutputs=[];}this.loadAll(c);};b.prototype.loadAllActionsStaticParams=function(c){if(!c.allActionsStaticParams){c.allActionsStaticParams=[];}a.loadAll(c,this.jsonResourceContent,this.isPrivate,this.connection,this.resourceID,null,true);};b.prototype.loadAllActionsRequiredParams=function(c){if(!c.allActionsRequiredParams){c.allActionsRequiredParams=[];}this.loadAll(c);};b.prototype.loadAllOutputsRequiredParams=function(c){if(!c.allOutputsRequiredParams){c.allOutputsRequiredParams=[];}this.loadAll(c);};b.prototype.loadAllOutputsStaticParams=function(c){if(!c.allOutputsStaticParams){c.allOutputsStaticParams=[];}this.loadAll(c);};b.prototype.loadAllAssocAttr=function(c){if(!c.allAssocAttr){c.allAssocAttr=[];}this.loadAll(c);};b.prototype.loadAllAssociations=function(c){if(!c.allAssoc){c.allAssoc=[];}this.loadAll(c);};b.prototype.loadAllAttributes=function(c){if(!c.allAttr){c.allAttr=[];}this.loadAll(c);};b.prototype.loadAllAdvancedFunctions=function(c){if(!c.allAdvancedFunctions){c.allAdvancedFunctions=[];}this.loadAll(c);};b.prototype.getTransientVocabulary=function(){return null;};return{vocaDataProviderJSONContextLib:b};}());
