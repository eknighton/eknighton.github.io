/*
    The first file to run, variables and functions defined here can be accessed in all other files. 
*/


/*
    This section initializes variables. Variables that should be usable in all files should be defined here.
*/

//Creates a const variable for each mode's HTML display.
    const startScreen = document.getElementById('startScreen');
    const levelSelect = document.getElementById('levelSelect');
    const levelStart = document.getElementById('levelStart');
    const level = document.getElementById('level');
    const levelOver = document.getElementById('levelOver');

//Input Recorders - Set exclusively by input, these are defined here so they can be accessed by all files.
  let touchStartX = 0;
  let touchStartY = 0;
  let mouseStartX = 0;
  let mouseStartY = 0;

  let touchCurrentX = 0;
  let touchCurrentY = 0;
  let mouseCurrentX = 0;
  let mouseCurrentY = 0;

  let mouseDown = false;

//Input Parameters - Called exclusively by input, these are given default values here, but can be altered ddurring runtime by any other file. 
    let rightSwipe = console.log("RightSwipe");
    let leftSwipe = console.log("LeftSwipe"); 
    let downSwipe = console.log("DownSwipe");
    let upSwipe = console.log("UpSwipe");

//Set critical variables 
    let pageMode = 'startScreen';
    let levelId = 'select';


/*
    This section performs necessary operations, like loading data.
*/

//Loads player stats from browser's local storage.
    const storedUserDataJSON = localStorage.getItem('userData');
    let userData = JSON.parse(storedUserDataJSON);
    //Use this code to set user data, based on a user data obj localStorage.setItem('userData', JSON.stringify(userData));  

//Initializes any Null fields in userData.
    const defaultUserData = {score: 0, gigachad: 99};
    if (userData == null) {
        userData = defaultUserData
         console.log("userData was Null. Was set to values of defaultUserData.");
    } else {
        for (index in defaultUserData){
            if (userData[index] == null) {
                userData[index] == defaultUserData[index];
                console.log("userData item " + index + " was Null. Set to it's default value:  " + userData.index);
            }
        }
    }

//Shows Start Screen. Hides the other displays.

    startScreen.style.display = 'none';
    level.style.display = 'block';
    levelOver.style.display ='none';
    levelSelect.style.display = 'none'; // This will read none in final version.

//See STARTSCREEN.JS for what runs next.


