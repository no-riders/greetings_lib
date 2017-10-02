(function(global, $) {

    var Greetr = function(firstname, lastname, language) {
        return new Greetr.init(firstname, lastname, language); //use f() constructor to
        //generate obj, so user dont have to use 'new' each time to generate obj        
    };

    var supportedLangs = ['en', 'ua'];

    var greetings = {
        en: 'Hello',
        ua: 'Привіт'
    };

    var formalGreetings = {
        en: 'Greetings',
        ua: 'Вітаємо'
    };

    var logMessages = {
        en: 'Logged in',
        ua: 'Вхід здійснено'
    };

    Greetr.prototype = {
        fullname: function() {
            return this.firstName + ' ' + this.lastName;
        },

        validate: function() { //check if lang is in supportedLangs
            if (supportedLangs.indexOf(this.language) === -1) {
                throw 'Language not supported';
            }
        },

        greeting: function() {
            return greetings[this.language] + ' ' + this.firstName + '!';
        },

        formalGreeting: function() {
            return formalGreetings[this.language] + ', ' + this.fullname();
        },

        greet: function(formal) {
            var msg;
            //if undefined or null it'll be coerced to 'false'
            if (formal) {
                msg = this.formalGreeting();
            } else {
                msg = this.greeting();
            }
            if (console) {
                console.log(msg);
            }
            //'this' refers to the calling object at execution time
            //makes the method chainable;
            return this;
        },

        log: function() {
            if (console) {
                console.log(logMessages[this.language] + ': ' + this.fullname());
            }
            return this;
        },

        setLang: function(lang) {
            this.language = lang; //update my obj and set new lang
            this.validate();
            return this;
        },

        HTMLGreeting: function(selector, formal) {
            if (!$) {
                throw 'jQuery not loaded';
            }

            if (!selector) {
                throw 'Missing jQuery selector';
            }

            var msg;
            if (formal) {
                msg = this.formalGreeting();
            } else {
                msg = this.greeting();
            }

            $(selector).html(msg);
            return this;
        }

    };

    Greetr.init = function(firstname, lastname, language) {
        this.firstName = firstname || '';
        this.lastName = lastname || '';
        this.language = language || 'en';
    };

    Greetr.init.prototype = Greetr.prototype; //to shorten name

    global.Greetr = global.G$ = Greetr; //to shorten Greetr() to G$()


}(window, jQuery));


/*

1) G$ points to Greetr f()
2) Greetr() returns new Greetr.init
3) Greetr.init builds an object, setss values
4) Greetr.prototype makes sure that all objects created from Greetr.init get 
access to methods

*/