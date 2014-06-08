// Define authentication subscription form object below its namespace
App.Forms.SubscriptionAuthentication = (function(){

    // Define container, validator and constraints
    var container, validator, constraints;

    // Constructor
    function SubscriptionAuthentication(container) {
        this.container = container;
        this.validator = new App.Forms.Validator();
        this.constraints = {
            'name': { name: "Name", rules: ["not_blank", "length[5,60]"] },
            'email': { name: "Email", rules: ["not_blank", "email"] },
            'site': { name: "Site", rules: ["url"] },
        };
    }

    // Assign the prototype object to the 'fn' property
    SubscriptionAuthentication.fn = SubscriptionAuthentication.prototype;

    // Initialization
    SubscriptionAuthentication.fn.init = function() {

        // Listen the form submit event
        this.container.on("submit", $.proxy(this, "_submitForm"));
    };

    // Binding constraints
    SubscriptionAuthentication.fn._bindingConstraints = function(event) {

        // Keep the context to be used inside jQuery.each
        var that = this;

        // Iterate over the constraints
        $.each(that.constraints, function(item, constraint){

            // Get data to set individual constraint
            fieldId = item;
            fieldValue = that.container.find('#' + fieldId).val();
            constraints = constraint.rules;
            fieldName = constraint.name;

            // Set individual constraint
            that.validator.setConstraint(fieldId, fieldValue, constraints, fieldName);
        });

    };

    // Submit event listener
    SubscriptionAuthentication.fn._submitForm = function(event) {

        // Binding constraints
        this._bindingConstraints();

        // Perform validation and render the error messages
        if (! this.validator.validate()) {

            this._renderErrors($("#error-container"));
            event.preventDefault();
        }
        else {
            alert('Form submitted...');
            return false;
        }
    };

    // Render errors in container
    SubscriptionAuthentication.fn._renderErrors = function(containerErrors) {

        // Get validation errors
        var errors = this.validator.getErrors();
        var errorList = $('<ul>');
        var listItem;

        // Clean container
        containerErrors.empty();

        // Keep the context to be used inside jQuery.each
        var that = this;

        // Iterate over each item to get it errors
        $.each(errors, function(item, messages){

            // Iterate over the errors
            for (var i = 0; i < messages.length; i++) {
                listItem = $('<li>').text(messages[i]);
               errorList.append(listItem);
           }
       });

        // Show errors in container
        containerErrors.removeClass("hide").addClass("show");
        containerErrors.append(errorList);
    };

    // Render errors inline
    SubscriptionAuthentication.fn._renderErrorsInline = function() {

        // Get validation errors
        var errors = this.validator.getErrors();
        var errorSpan;

        // Keep the context to be used inside jQuery.each
        var that = this;

        $('.error-field').remove();

        // Iterate over each item to get it errors
        $.each(errors, function(item, messages) {

            errorSpan = $('<span>', {class: 'error-field'}).text(messages[0]);
            $('#' + item).empty().after(errorSpan);
        });
    };

    // Expose constructor function to be assigned in global scope below its namespace
    return SubscriptionAuthentication;
})();
