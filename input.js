//Declare variables that levels use to set functions.
	let rightSwipe = acceptAnswer;
	let leftSwipe = rejectAnswer;
	let downSwipe = null;
	let upSwipe = skipAnswer;
	let sliderReleased = null;

//Establish input triggers.
		document.addEventListener('touchmove', function (e) {
            e.preventDefault();
        }, { passive: false });

        function handleTouchStart(e) {
              this.startX = e.touches[0].clientX;
              this.startY = e.touches[0].clientY;
            }

            function handleTouchEnd(e) {
              const endX = e.changedTouches[0].clientX;
              const endY = e.changedTouches[0].clientY;
              const threshold = 50; // Minimum distance for swipe recognition

              if (this.startX - endX > threshold) {
                // Swipe left, reject
                leftSwipe();
              } else if (endX - this.startX > threshold) {
                // Swipe right, accept
                rightSwipe();
              } else if (this.startY - endY > threshold) {
              	//Skip
                upSwipe();
              }
            }

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
        document.addEventListener('touchstart', handleTouchStart, false);
        document.addEventListener('touchend', handleTouchEnd, false);
        document.addEventListener('keydown', handleKeyDown, false);