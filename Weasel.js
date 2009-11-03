/**
 * @class Weasel
 * JavaScript implementation of Richard Dawkins' Weasel Program
 * (http://en.wikipedia.org/wiki/Weasel_program)
 */
Weasel = function(config) {
  var config   = config || {},
      defaults = {
        target     : "METHINKS IT IS A WEASEL",
        mutateRate : 0.9,
        numChildren: 5
      };
  
  for (key in defaults) {
    config[key] = config[key] || defaults[key];
  }
  
  for (key in config) {
    this[key] = config[key];
  }
};

Weasel.prototype = {
  /**
   * Starts the search towards the target. Returns an array of all generated ancester strings
   * @param {String} seed The seed string (defaults to a random string)
   * @return {Array} The array of ancestors
   */
  find: function(seed) {
    var seed    = seed || this.generateSeed(this.target.length),
        species = [seed],
        current = seed;
    
    while (this.score(current) < current.length) {
      var parent   = species[species.length - 1],
          children = this.breedChildren(parent),
          current  = this.select(children);
          
      species.push(current);
    }
    
    return species;
  },
  
  /**
   * Breeds the desired number of children by mutating a parent string
   * @param {String} parent The parent string
   * @param {Number} num The number of children to beed (defaults to this.numChildren)
   * @return {Array} Array of mutant children
   */
  breedChildren: function(parent, num) {
    var children = [];
    
    for (var i = this.numChildren; i >= 1; i--){
      var a = this.mutate(parent);
      children.push(a);
    }
    
    return children;
  },
  
  /**
   * Function description
   * @param {String} parent The string that will be mutated
   * @return {String} The mutated version of the 
   */
  mutate: function(parent) {
    var newStr = "",
        length = parent.length;
    
    for (var i=0; i < length; i++) {
      var character = parent[i],
          incorrect = parent[i] != this.target[i],
          mutates   = Math.random() < this.mutateRate;
          
      newStr += incorrect && mutates
              ? this.characters[Math.floor(Math.random() * this.characters.length)]
              : character;
    };
    
    return newStr;
  },
  
  /**
   * Selects the fittest string from an array
   * @param {Array} children The children to score
   * @return {String} The winning string
   */
  select: function(children) {
    var bestScore = 0,
        bestChild = children[0];
    
    for (var i = children.length - 1; i >= 0; i--){
      var score = this.score(children[i]);
      
      if (Math.max(bestScore, score) > bestScore) {
        bestChild = children[i];
        bestScore = score;
      }
    };
    
    return bestChild;
  },
  
  /**
   * Assesses a string using a selection function, returning the string's 'score'
   * @param {String} str The string to apply the selection function
   * @return {String} The value of the string
   */
  score: function(str) {
    var score = 0;
    
    for (var i=0; i < str.length; i++) {
      if (str[i] == this.target[i]) score += 1;
    }
    
    return score;
  },
  
  /**
   * Returns a random string of the length given
   * @param {Number} length The desired seed string length
   * @return {String} The seed string
   */
  generateSeed: function(length) {
    var str = "";
    
    for (var i=0; i < length; i++) {
      str += this.characters[Math.floor(Math.random() * this.characters.length)];
    };
    
    return str;
  },
  
  /**
   * @property characters
   * @type String
   * A string which contains all the characters the Weasel will mutate to
   */
  characters: " ABCDEFGHIJKLMNOPQRSTUVWXYZ"
};
