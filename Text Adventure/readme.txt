WELCOME

This is a flexible engine for visual novel webgames. It is built around 'Panels' which can be dynamically rewritten during runtime. Each panel calls 

PANELS

Panels are our "scenes". Panels are defined by writing a constructor- a function that makes an instance of them. This instance can be dynamically modified. Remember that in javascript, objects are always passed by reference- if you pass a panel as a parameter, you are passing a reference to it. This makes instances easy to modify, but hard to properly copy. 

Generally, you'll want to add the panel's constructor to the panelMakes dict, under an entry with its id, so it can be easily found by that name. Otherwise, you won't be able to load the panel by ID unless there is already an instance in the panels dict under its ID.

The panels dict stores panel instances under names. Some processes will initialize a panel and add an instance to panels under a name matching its default ID.

Panels have:
.mediaData, an img, gif, or video
-
.text, a string (HTML can be included) for display in the "story" element
-
.onLoad, a function variable called at the end of "displayPanel" and which receives a reference to the panel instance when called, 
-
.actions, a list used to create buttons, determine what happens when they are clicked

ACTIONS

Most panels have Actions, objects that used to generate the buttons displayed on that panel. Actions can by dynamically added, removed, and/or altered. Beware of mistaking a pointer to an action for a copy of it. 

Actions have:
.text, a string (HTML can be included) for display on the button's element
-
.action, an function variable, which is called when the button is clicked. It receives a pointer to it's parent panel as a paremeter. When calling a .action directly, you can pass a reference to any panel instance as a parameter.

PLAYER

Right now, the player is an object instance. Eventually there will be player constructors. Currently, function writeHUD() is coded in terms of the global player object instance, and updates the rightHUD's innerHTML.

TODO
1. Figure out how to do/support audio
2. Create player constructor system
3. Expand player HUD
4. Improve support for non-panel displays (ex.canvas)


INCOMPLETE FEATURES
1. Video as media is untested. Be sure to verify, debug.
2. Panel objs may need edits to support certain item concepts.

Sounds

GIFS
1. Gif / video support would be sweet!

TIMER
1. May not always correct initial number.

SCOPE
1. Panels in the panel array can access themselves by ID, and several other extraneously added methods- these should be removed.
2. Onloads & Actions in dynamic panels not the array can access their panel, but other items in the panel cannot (However, on load can make it accessible by setting me to it) 

Features
1. Each button can execute custom code on click
2. Each panel automatically saves, and can be dynamically edited, reset.


Item Support
1. No good system for mining data about what an action does?
2. Potentially limited support for renaming content