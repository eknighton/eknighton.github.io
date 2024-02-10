document.getElementById( "myForm" ).addEventListener( "submit", function ( event ) {
    	event.preventDefault();
    	JavaScript:check();
  	}
);

function check() {

	var search = document.getElementById("guess").value;
	console.log(search);
	makeSearch(search);
	document.getElementById("guess").value = "";
}