
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
                touchCurrentX = e.touches[0].clientX;
                touchCurrentY = e.touches[0].clientY;
            }
            document.addEventListener('touchmove', handleTouchMove, false);

            function handleTouchStart(e) {
                e.preventDefault();
                touchStartX = e.touches[0].clientX;
                touchStartY = e.touches[0].clientY;
            }
            document.addEventListener('touchstart', handleTouchStart, false);

            function handleTouchEnd(e) {
                e.preventDefault();
                //Need to call a function here
                touchUp();
                console.log(touchCurrentX);
                touchStartX = 0;
                touchStartY = 0;
                touchCurrentX = 0;
                touchCurrentY = 0;
            }
            document.addEventListener('touchend', handleTouchEnd, false);

//Establlishes mouse input triggers.
            function handleMouseMove(e) {
                e.preventDefault();
                mouseCurrentX = e.clientX;
                mouseCurrentY = e.clientY;
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








