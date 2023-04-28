    
//RNG util
    function generateUniqueRandomNumbers(count, min, max) {
      if (max - min + 1 < count) {
        throw new Error('Range is too small for the specified number of unique random numbers');
      }

      const numbers = new Set();

      while (numbers.size < count) {
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        numbers.add(randomNumber);
      }

      return Array.from(numbers);
    }