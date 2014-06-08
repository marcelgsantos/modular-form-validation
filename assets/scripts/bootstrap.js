// Define the application namespaces
var App = {};
App.Forms = {};
App.Validator = {};

// Perform the application initialization
$(function(){

    // Create the authentication form object and initialize it
    var subscriptionAuthentication = new App.Forms.SubscriptionAuthentication($(".subscription-form"));
    subscriptionAuthentication.init();
});
