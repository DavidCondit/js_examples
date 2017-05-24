
(function(){
/**
* Adds supplier's "own" properties to receiver.
* Since js objects are passed by reference, the receiver object and all references to it are updated.
* @param {object} receiver
* @param {object} supplier
* @return {object} receiver
*/
function mixin(receiver, supplier) {
	for (var property in supplier) {
		if (supplier.hasOwnProperty(property)) {
			receiver[property] = supplier[property];
		}
	}
	return receiver;
}

function logOwnProperties(obj) {
	for (var property in obj)
	{
		console.log('Propery: ', property.toString());
	}
}

var obj1 = {
	name : 'Object 1',
	count : '99',
	doSomething : function() {
		console.log('Yalp!');
	}
};

var obj2 = {};

console.log('obj2 properties before mixin call:');
logOwnProperties(obj2);

mixin(obj2, obj1);

console.log('obj2 properties after mixin call:');
logOwnProperties(obj2);

})();