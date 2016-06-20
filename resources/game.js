"use strict";

var MemoryGame = function () {
    var _gameStarted = false;    
    var _timer = null;
    var _timerValue = 0;
    var _flags = [];
    var _selectedCardId = null;    
    var _matchesCounter = 0;

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
            
            checkCard(this);            
        });
    };

    var getDefaultFlags = function() {
        return [
            "ar", "bo", "br", "cl","co","cr","ec","ht","jm","mx","pa","pe","py","us","uy","ve"
        ]
    };

    var setFlags = function() {
        var random = function() { return (Math.round(Math.random()) - 0.5); }
        var flags1 = getDefaultFlags().sort(random);
        var flags2 = getDefaultFlags().sort(random);
        _flags = flags1.concat(flags2);
    };

    var checkCard = function(currentCard) {
        var currentCardId =  parseInt($(currentCard).attr('id').replace('card',''));            
        var currentFlag = _flags[currentCardId];        

        // show currentFlag
        $(currentCard)
            .removeClass()
            .addClass("card")
            .addClass("flag-" + currentFlag);

        // check if match
        if (_selectedCardId == null) {
            _selectedCardId = currentCardId;
        }
        else {
            var lastFlag = _flags[_selectedCardId];
            if (lastFlag != currentFlag) {  

                var cardId1 = _selectedCardId
                var cardId2 = currentCardId;
                _selectedCardId = null;          

                setTimeout(function() {
                    $("#card"+ cardId1)
                        .removeClass()
                        .addClass("card hidden-card");

                    $("#card"+ cardId2)
                        .removeClass()
                        .addClass("card hidden-card");
                }, 800);
            } else {
                _selectedCardId = null;      
                _matchesCounter++;

                if (_matchesCounter == 16) {
                    $(".memory-game h3.congrats").removeClass("hide");
                    stop(false);

                    // plays audio   
                    document.getElementById("golAudio").play();
                }
            }
        }                
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
        _selectedCardId = null;
        _matchesCounter = 0;
        _gameStarted = true;
        _timerValue = 0;
        _timer = setInterval(tickTimer, 1000);
    
        // get flags in a random order
        setFlags();

        $("#actionButton")
            .html("Stop")
            .removeClass("btn-success")
            .addClass("btn-primary");

        $(".memory-game h3.congrats").addClass("hide");
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
    };  

    return {
        init: init    
    };
} ();