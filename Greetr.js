(function(global, $) {
    // 'new' an object
    var Greetr = function(firstname, lastname, language) {

        //use f() constructor to
        //generate obj, so user dont have to use 'new' each time to generate obj
        return new Greetr.init(firstname, lastname, language);  
    };

    // these vars hidden within IIFE and arnt directly accessible
    var supportedLangs = ['en', 'ua'];

    // informal greetings
    var greetings = {
        en: 'Hello',
        ua: 'Привіт'
    };

    // formal greetings
    var formalGreetings = {
        en: 'Greetings',
        ua: 'Вітаємо'
    };

    // logger message
    var logMessages = {
        en: 'Logged in',
        ua: 'Вхід здійснено'
    };

    // prototype holds methods (to save memory space, instead of doing so inside Greetr)
    Greetr.prototype = {

        // 'this' refers to calling object at execution time
        fullname: function() {
            return this.firstName + ' ' + this.lastName;
        },

        validate: function() { 
        // check if lang is in supportedLangs
            if (supportedLangs.indexOf(this.language) === -1) {
                throw 'Language not supported';
            }
        },

        // retrieve message from Obj by reffering to props using [] syntax
        greeting: function() {
            return greetings[this.language] + ' ' + this.firstName + '!';
        },

        formalGreeting: function() {
            return formalGreetings[this.language] + ', ' + this.fullname();
        },

        greet: function(formal) {
            var msg;
            // if undefined or null it'll be coerced to 'false'
            if (formal) {
                msg = this.formalGreeting();
            } else {
                msg = this.greeting();
            }
            if (console) {
                console.log(msg);
            }
            // 'this' refers to the calling object at execution time
            // makes the method chainable;
            return this;
        },

        log: function() {
            if (console) {
                console.log(logMessages[this.language] + ': ' + this.fullname());
            }
            // make chainable
            return this;
        },

        setLang: function(lang) {

            //update my obj and set new lang
            this.language = lang;
            // validate
            this.validate();
            // make chainable
            return this;
        },

        HTMLGreeting: function(selector, formal) {
            if (!$) {
                throw 'jQuery not loaded';
            }

            if (!selector) {
                throw 'Missing jQuery selector';
            }

            // determine the message
            var msg;
            if (formal) {
                msg = this.formalGreeting();
            } else {
                msg = this.greeting();
            }

            // insert message in the chosen place in DOM
            $(selector).html(msg);
            // make chainable
            return this;
        }

    };

    // the actual Obj is created here, letting us to create 'new' Obj without callin 'new'
    Greetr.init = function(firstname, lastname, language) {
        this.firstName = firstname || '';
        this.lastName = lastname || '';
        this.language = language || 'en';

        this.validate();
    };

    // borrowed from jQuery so we don't have to use 'new'
    Greetr.init.prototype = Greetr.prototype;
    //to shorten Greetr() to G$()
    global.Greetr = global.G$ = Greetr; 


}(window, jQuery));


/*

1) G$ points to Greetr f()
2) Greetr() returns new Greetr.init
3) Greetr.init builds an object, setss values
4) Greetr.prototype makes sure that all objects created from Greetr.init get 
access to methods

*/