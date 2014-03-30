// Define authentication subscription form object below its namespace
App.Forms.SubscriptionAuthentication = (function(){

	// Define container and validator objects
	var container, validator;

	// Constructor function
	function SubscriptionAuthentication(container) {
		this.container = container;
		this.validator = new App.Forms.Validator(this.container); // Instantiate validator object (Should I inject it?)
	}

	// Assign the prototype object to the 'fn' property
	SubscriptionAuthentication.fn = SubscriptionAuthentication.prototype;

	// Initialization method
	SubscriptionAuthentication.fn.init = function() {

		// Listen the form submit event
		this.container.on("submit", $.proxy(this, "_submitForm"));
	};

	// Validation method
	SubscriptionAuthentication.fn._validate = function() {
		this.validator.setConstraint("name", ["not_blank", "length[5,60]"], "Name");
		this.validator.setConstraint("email", ["not_blank", "email"], "Email");
		return this.validator.validate();
	};

	// Submit event listener method
	SubscriptionAuthentication.fn._submitForm = function(event) {
		if (!this._validate()) {
			this._showValidationMessage();
			event.preventDefault();
		}
	};

	// Submit event listener method
	SubscriptionAuthentication.fn._showValidationMessage = function() {
		var errorMessage = this.validator.getErrorMessage();
		var errorMessageText = "<ul>";

		for (var i = 0; i < errorMessage.length; i++) {
			errorMessageText += "<li>" + errorMessage[i] + "</li>";
		};

		errorMessageText += "</ul>";

		$(".error-message")
			.removeClass("hide")
			.addClass("show")
			.html(errorMessageText);
	};

	// Expose constructor function to be assigned in global scope below its namespace
	return SubscriptionAuthentication;
})();