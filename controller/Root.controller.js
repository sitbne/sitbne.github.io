sap.ui.define([
    "com/katan/controller/Base.controller",
], function(BaseController) {
    "use strict";
    return BaseController.extend("com.katan.controller.Root", {
        onInit:function(){
        },
        onInitCertificateChartData:function(oEvent){
            var chartControl = oEvent.getSource();
            
            var boundData = this._getValue(chartControl);

            var oBundle = this.getResourceBundle();

            var chartData = {
                labels: [oBundle.getText("certificationPointsScored"), oBundle.getText("certificationPointsMissed")],
                datasets:[
                    {
                        data:[boundData["Score"], boundData["MaxScore"] - boundData["Score"]],
                        backgroundColor: ["#427cac", "#b4cbe2"]
                    }
                ]
            }

            // Set the chart data
            chartControl.setData(chartData);
        },
        onPressCertificationLabel:function(oEvent) {
            // Pops up the URL from the model for the certificate
            var boundData = this._getValue(oEvent.getSource());
            sap.m.URLHelper.redirect(boundData["CertificationURL"], true);
        },
        _getValue:function(iControl) {
            // Reads the model data from the bound to the control
            var bindingContext = iControl.getBindingContext();
            var boundData = bindingContext.getModel().getProperty(bindingContext.getPath());            
            return boundData;
        }

    });

});