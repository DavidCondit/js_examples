(function Test() 
{

	function Vehicle (make, model) {
		this.make = make;
		this.model = model;
	}
	
	Vehicle.prototype.turnOn = function() {
		return 'Vroom!';
	}
	Vehicle.prototype.toString = function()
	{
		return 'vehicle'
	}

	function Car (make, model) {
		Vehicle.call(this, make, model); 
		this.category = 'car';
	}

	Car.prototype = Object.create(Vehicle.prototype);
	Car.prototype.constructor = Car;
	Car.prototype.toString = function() {
		return 'car';
	}

	var car = new Car('Ford','Mustang');

	console.log('car is instanceof Car: ', car instanceof Car);

	console.log('car is instanceof Vehicle: ', car instanceof Vehicle);

	console.log('car constructor is Vehicle: ', car.constructor === Vehicle);	
	console.log('car constructor is Car: ', car.constructor === Car);
	
	console.log('car is turned on: ', car.turnOn());

	// Returns a tuple [0,0]. 
	// 		First item is the object owning the Property. 
	//		Second item is the integer for how many levels up it had to travel to find the hasOwnProperty object.
	var findPropertyOwner = function(obj, prop) {
		
		var i = 0;
		do {
			if (obj.hasOwnProperty(prop)) {
			  return [obj, i];
			}
		} while (i++, obj = Object.getPrototypeOf(obj));
	}

	var turnOnPropOwner = findPropertyOwner(car, 'turnOn')[0,0].toString();
	console.log('the turnOn property is owned by: ', turnOnPropOwner);
	
	
})();

/* function Motorcyle (make, model) {
	Vehicle.call(this, make, model);
	this.category = 'motorcycle';
} */

