;(function(global, $) {

   //G$ will point to this Greetr function
   // 'new' an object
   var Greetr = function(firstName, lastName, language){
      // Greetr function returns a new Greetr.init
      return new Greetr.init(firstName, lastName, language);
   };

   // Hidden within the scope of IFFE and never directly accessible
   var supportedLangs = ['en', 'es', 'fr'];

   //informal greetins
   var greetings = {
      en: 'Hello',
      es: 'Hola',
      fr: 'Salut'
   };

   //formal greetins
   var formalGreetings = {
      en: 'Greetings',
      es: 'Saludos',
      fr: 'Bonjour'
   };

   //logger messages
   var logMessages = {
      en: 'Logged in',
      es: 'Inicio sesion',
      fr: 'Connexion'
   };

   // all the methods that can be accessed
   //prototype holds methods (to save memory space)
   Greetr.prototype = {
      // 'this' refers to the calling object at execution time
      fullName: function() {
         return this.firstName + ' ' + this.lastName;
      },
      validate: function() {
         // check that is a valid language
         // references the externally inaccessible 'supportedLangs' within the closure
         if(supportedLangs.indexOf(this.language) === -1) {
            throw 'Invalid language';
         }
      },
      // retrieve messages from object by referring to properties using [] syntax
      greeting: function() {
         return greetings[this.language] + ' ' + this.firstName + '!';
      },
      formalGreeting: function() {
         return formalGreetings[this.language] + ', ' + this.fullName();
      },
      // chainable methods return their own containing object
      greet: function(formal) {
         var msg;

         //if undefined or null it will be coerced to 'false'
         if(formal) {
            msg = this.formalGreeting();
         } else {
            msg = this.greeting();
         }

         if(console) {
            console.log(msg);
         }

         // 'this' refers to the calling object at execution time
         // makes the method chainable
         return this;
      },
      log: function() {
         if(console) {
            console.log(logMessages[this.language] + ': ' + this.fullName());
         }

         //makes the method chainable
         return this;
      },
      setLang: function(lang) {
         // set the language
         this.language = lang;

         // validate
         this.validate();

         // make chainable
         return this;
      },
      HTMLGreeting: function(selector, formal) {
         if(!$) {
            throw "jQuery not loaded";
         }

         if(!selector) {
            throw 'Missing jQuery Selector';
         }

         // determine the message
         var msg;
         if(formal) {
            msg = this.formalGreeting();
         } else {
            msg = this.greeting();
         }

         // inject the message in the chosen place in the DOM
         $(selector).html(msg);

         // make chainable
         return this;
      }
   };

   // constructor function that builds an object and gives it three properties
   //builds the object and sets the values
   // the actual object is created here, allowing us to 'new' an object without calling 'new'
   Greetr.init = function(firstName, lastName, language) {
      var self = this;

      //sets its value if passed in, otherwise, sets defaults.
      self.firstName = firstName || '';
      self.lastName = lastName || '';
      self.language = language || 'en';

      self.validate();
   };

   // prototype makes sure that all those objects created from there has access to all the methods on the prototype property
   // trick borrowed from jQuery so we don't have to use the 'new' keyword
   Greetr.init.prototype = Greetr.prototype;

   // attach our Greetr to the global object, and provide a shorthand '$G' for easy typing.
   global.Greetr = global.G$ = Greetr;

}(window, jQuery)); //creates a safe execution context
