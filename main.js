//Set critical variables 
    let pageMode = 'startScreen';
    let levelId = 'select';

//Creates a variable for each mode element.
    const startScreen = document.getElementById('startScreen');
    const levelSelect = document.getElementById('levelSelect');
    const levelStart = document.getElementById('levelStart');
    const level = document.getElementById('level');
    const levelOver = document.getElementById('levelOver');

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


