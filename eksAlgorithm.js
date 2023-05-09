/*

	When you run this file, it outputs to the console an optimization iteration. 

*/

var order = [1,2,3,4,5,6];
var bestOrder = [1,2,3,4,5,6];
var bestScore = evaluate(bestOrder);

for (var i = 0; i < order.length-1; i++) { // Iterates through all index locations 

	for (var n = i; n < order.length; n++) { // Iterates through all currently unset items
		moveItem(order, n, i);
		let newScore = evaluate(order);
			console.log("New Order: " + order);
			console.log("New Score: " + newScore);
			console.log("Best Score: " + bestScore);
			
		if (evaluate(order) > bestScore){
			bestOrder = order.slice();
			bestScore = newScore;
		}
			console.log("New Best Order: " + bestOrder);
	}
}

//UTIL... moveItem
	function moveItem(arr, fromIndex, toIndex) {
	  // Remove the item from the original position
	  const item = arr.splice(fromIndex, 1)[0];
	  // Insert the item at the new position
	  arr.splice(toIndex, 0, item);
	}
//Evaluate function 
	function evaluate(arr){
		let temp  = 1;
		for (var i = 0; i < arr.length; i++) {
			temp = temp - arr[i]*i;
		}
		return temp;
	}