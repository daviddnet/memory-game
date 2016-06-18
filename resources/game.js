"use strict";

var MemoryGame = function () {
    var _gameStarted = false;    
    var _timer = null;
    var _timerValue = 0;
    var _flags = [];

    var init = function () {
        $("#actionButton").on("click", function() {
            console.log("hi");
            if (_gameStarted) {
                stop(true);
            } else {
                start();
            }            
        });

        $(".card").on("click", function() {
            if (!_gameStarted) {
                start();
            }   

            var cardId =  parseInt($(this).attr('id').replace('card',''));
            var flag = _flags[cardId];

            $(this).removeClass();
            $(this).addClass("card");
            $(this).addClass("flag-" + flag);         
        });
    };

    var getDefaultFlags = function() {
        return [
            "ar", "bo", "br", "cl","co","cr","ec","ht","jm","mx","pa","pe","py","us","uy","ve"
        ]
    };

    var setFlags = function(params) {
        var random = function() { return (Math.round(Math.random()) - 0.5); }
        var flags1 = getDefaultFlags().sort(random);
        var flags2 = getDefaultFlags().sort(random);
        _flags = flags1.concat(flags2);

        console.log(_flags);
    };

    var tickTimer = function() {
        // tick
        var min = Math.floor(_timerValue / 60);
        var sec = _timerValue % 60;
        var output = min + ':' + (sec < 10 ? '0' : '') + sec;

        $("#gameTimer").val(output);
        _timerValue++;
    };

    var start = function() {
        _gameStarted = true;
        _timer = setInterval(tickTimer, 1000);
    
        // get flags in a random order
        setFlags();

        $("#actionButton")
            .html("Stop")
            .removeClass("btn-success")
            .addClass("btn-primary");
    };

    var stop = function(clearTimer) {
        _gameStarted = false;
        clearInterval(_timer);

        if (clearTimer){
            _timerValue = 0;
            $("#gameTimer").val("");
        }

        $(".card").removeClass().addClass("card hidden-card");

        $("#actionButton")
            .html("Start")
            .removeClass("btn-primary")
            .addClass("btn-success");

        //test Audio
        document.getElementById("golAudio").play();
    };  

    return {
        init: init    
    };
} ();