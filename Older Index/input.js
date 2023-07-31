
/*
  The last file to load, this creates the input listeners.
*/

//Establish keyboard input triggers.

            function handleKeyDown(e) {
              if (e.key === 'ArrowRight') {
                rightSwipe(); //accept
              } else if (e.key === 'ArrowLeft') {
                leftSwipe(); //reject
              } else if (e.key === 'ArrowUp') {
                upSwipe(); //skip
              } else if (e.key === 'ArrowDown') {
                downSwipe();
                //slider.style.display = 'block';
              }
            }
            document.addEventListener('keydown', handleKeyDown, false);

//Establish touchscreen input triggers.

            function handleTouchMove(e) {
                e.preventDefault();
                mouseCurrentX = e.touches[0].clientX;
                mouseCurrentY = e.touches[0].clientY;
                updateCanvas();
            }
            document.addEventListener('touchmove', handleTouchMove, false);

            function handleTouchStart(e) {
                e.preventDefault();
                mouseDown = true;
                mouseStartX = e.touches[0].clientX;
                mouseStartY = e.touches[0].clientY;
            }
            document.addEventListener('touchstart', handleTouchStart, false);

            function handleTouchEnd(e) {
                e.preventDefault();
                //Need to call a function here
                touchUp();
                console.log(touchCurrentX);
                mouseDown = false;
                mouseStartX = 0;
                mouseStartY = 0;
                mouseCurrentX = 0;
                mouseCurrentY = 0;
            }
            document.addEventListener('touchend', handleTouchEnd, false);

//Establlishes mouse input triggers.
            function handleMouseMove(e) {
                e.preventDefault();
                mouseCurrentX = e.clientX;
                mouseCurrentY = e.clientY;
                updateCanvas();
            }
            document.addEventListener('mousemove', handleMouseMove, false);

            function handleMouseDown(e) {
                e.preventDefault();
                mouseDown = true;
                mouseStartX = e.clientX;
                mouseStartY = e.clientY;
            }
            document.addEventListener('mousedown', handleMouseDown, false);

            function handleMouseUp(e) {
                e.preventDefault();
                // Call a function here if needed
                mouseUp();
                console.log(mouseCurrentX);
                mouseDown = false;
                mouseStartX = 0;
                mouseStartY = 0;
                mouseCurrentX = 0;
                mouseCurrentY = 0;
            }
            document.addEventListener('mouseup', handleMouseUp, false);








