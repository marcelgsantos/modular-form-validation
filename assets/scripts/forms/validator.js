// Define form validation object below its namespace
App.Forms.Validator = (function(){

	// Define the container, constraints list and evaluation table variables
	var container, constraints, evaluationList, errorList, errorMessage;

	// Constructor function
	function Validator(container) {
		this.container = container;
		this.constraints = {
			"not_blank": this._notBlank,
			"min_length": this._minLength,
			"max_length": this._maxLength,
			"length": this._fullLength,
			"email": this._email,
		};
		this.errorMessage = {
			"not_blank": "Field #1 should not be blank.",
			"min_length": "Field #1 should at least #2 characters.",
			"max_length": "Field #1 should at maximum #2 characters.",
			"length": "Field #1 should have betweeen #2 and #3 characters.",
			"email": "Field #1 should have a valid email.",
		};
		this.evaluationList = [];
		this.errorList = [];
	}

	// Assign the prototype object to the 'fn' property
	Validator.fn = Validator.prototype;

	// Validate form method
	Validator.fn.validate = function() {

		// Define evaluation and flag variables
		var evaluation, flag = true;

		// Clean th error list
		this.errorList = [];

		// Iterate over the evaluation list
		for (var i = 0; i < this.evaluationList.length; i++) {

			// Get field name, rule and arguments
			fieldName = this.evaluationList[i].fieldName;
			constraintRule = this.evaluationList[i].constraintRule;
			constraintArgs = this.evaluationList[i].constraintArgs;

			// Perform the evaluation
			evaluation = this.constraints[constraintRule].apply(this, constraintArgs);

			// Check if evaluation fails and push the error message to the error list
			if (evaluation === false) {
				flag = false;
				this.errorList.push(this._getErrorMessage(fieldName, constraintRule, constraintArgs));
			}
		}

		// Clean the evaluation list
		this.evaluationList = [];

		return flag;
	};

	// Get list of error messages
	Validator.fn.getErrorMessage = function() {
		return this.errorList;
	};

	// Get error message based in field name, rule and constraint arguments
	Validator.fn._getErrorMessage = function(fieldName, constraintRule, constraintArgs) {

		// Get the message associated with rule
		var message = this.errorMessage[constraintRule];
		message = message.replace("#1", fieldName);

		// Iterate over arguments and replace them in the message (skip first argument - field value)
		for (var i = 0; i < constraintArgs.length; i++)  {
			message = message.replace("#" + (i+1), constraintArgs[i]);
		}

		return message;
	};

	// Assign constraints to the field method
	Validator.fn.setConstraint = function(fieldId, constraints, fieldName) {

		// Check if the given field exists or throws an error otherwise
		var field = this.container.find("#" + fieldId);
		if (!field.length) {
			throw new Error("Element not found in form.");
		}

		// Get the field value
		var fieldValue = field.val();

		// Bind the constraints to the field value
		this._bindConstraints(fieldName, fieldValue, constraints);
	};

	// Bind constraints method
	Validator.fn._bindConstraints = function(fieldName, fieldValue, constraints) {

		// Check if the constraints list is an array
		if (!$.isArray(constraints)) {
			throw new Error("The 'constraints' argument should be an array.");
		}

		// Keep the context to be used inside jQuery.each
		var that = this;

		// Iterate over the constraints
		$.each(constraints, function(item, constraint){

			// Check if the constraint has arguments
			var separator = constraint.indexOf("[");
			var existsArgs = (separator > 0);

			// Get the constraint rule and arguments separately
			var constraintArgsText, constraintArgs = [];
			var constraintRule = existsArgs ? constraint.substring(0, separator) : constraint;

			if (existsArgs) {
				constraintArgsText = constraint.substring(separator);
				constraintArgsText = constraintArgsText.replace(/[\[\]']+/g,'');
				constraintArgs = constraintArgsText.split(",");
			}

			// Add field value in array of constraints
			constraintArgs.unshift(fieldValue);

			// Add evaluation rules in the evaluation table to be validate later
			that.evaluationList.push({
				"fieldName": fieldName,
				"constraintRule": constraintRule,
				"constraintArgs": constraintArgs
			});
		});
	};

	// Not blank validation method
	Validator.fn._notBlank = function(field) {
		return !!$.trim(field);
	};

	// Minimum length validation method
	Validator.fn._minLength = function(field, min) {
		return field.length >= min;
	};

	// Maximum length validation method
	Validator.fn._maxLength = function(field, max) {
		return field.length <= max;
	};

	// Minimum and maximum length validation method
	Validator.fn._fullLength = function(field, min, max) {
		return this._minLength(field, min) && this._maxLength(field, max);
	};

	// Email regular expression validation method
	Validator.fn._email = function(field) {
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(field);
	};

	// Expose constructor function to be assigned in global scope below its namespace
	return Validator;
})();