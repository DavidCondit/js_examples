(function() {

function EventTarget() {
};

EventTarget.prototype = {
	
	constructor : EventTarget,
	
	addListener : function (type, listener) {
		
		// create an array if it doesn't exist
		if (!this.hasOwnProperty('_listeners')) {
			this._listeners = [];
		}
		
		// create an array for type, as a key : value within the _listeners array, if it doesn't exist
		if (typeof this._listeners[type] == 'undefined') {
			this._listeners[type] = [];
		}
		
		this._listeners[type].push(listener);
	}, 
	
	fire : function (event) {
		if (!event.target) {
			event.target = this;
		}
		
		if (!event.type) { // falsey
			throw new Error("Event object missing 'type' property.");
		}
		
		if (this._listeners && this._listeners[event.type] instanceof Array) {
			var listeners = this._listeners[event.type];
			for (var i = 0, len = listeners.length; i < len; i++) {
				listeners[i].call(this, event);
			}
		}
	},
	
	removeListener : function (type, listener) {
		if (this._listeners && this._listeners[type] instanceof Array) {
			var listeners = this._listeners[type];
			for (var i = 0, len = listeners.length; i < len; i++) {
				if (listeners[i] === listener) {
					listeners.splice(i, 1);
					break;
				}
			}
		}
	}
};

function mixin(receiver, supplier) {
	for (var property in supplier) {
		if (supplier.hasOwnProperty(property)) {
			receiver[property] = supplier[property];
		}
	}
	return receiver;
};

function Person (name) {
	this.name = name;
};

mixin(Person.prototype, EventTarget.prototype);
mixin(Person.prototype, {
	constructor : Person,
	sayName : function () {
		console.log(this.name);
		this.fire( {type : 'namesaid', name: this.name} );
	}
});

var person = new Person('Nicholas');
console.log(person instanceof Person); // true
console.log(person instanceof EventTarget); // false

})();