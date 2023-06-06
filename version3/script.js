(function() {
    console.log('reading js');
    
    // window.alert("User Test:\n 1. Read the instructions. \n 2. Click start.\n 3. Complete the puzzle.");

    $(document).ready(function() {

        $("#bgnPuzzle").click(function() {
            $("#container").show();
            $("#start").hide();
            $("#incorrect").hide();
            $("#correct").hide();
        })

        let rows = 5;
        let columns = 5;
        let pieces = "";
        let place = 1;

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                pieces += "<div class='piece'><img src='images/seal" + place + ".jpg' width=100></div>";
                place++;
            }
        }

        $("#puzzleContainer").html(pieces);
        $("#btnStart").click(function() {
            let pieces = $("#puzzleContainer div");
            let counter = 0;
            pieces.each(function() {
                let leftPosition = Math.floor(Math.random() * 290) + 25 + "px";
                let topPosition = Math.floor(Math.random() * 290) + 25 + "px";
                $(this).attr('data-order', counter);

                $(this).addClass("draggablePiece").css({
                    position: "absolute",
                    left: leftPosition,
                    top: topPosition
                })
                counter++;
                $("pieceContainer").append($(this));
            });
            let emptyString = "";
            let spaceOrder = 0;
            for (let i = 0; i < rows; i++) {
                for (let j = 0; j < columns; j++) {
                    emptyString += `<div class='piece droppableSpace' data-location='${spaceOrder}'></div>`;
                    spaceOrder++;
                }
            }

            $("#puzzleContainer").append(emptyString);
            $(this).hide();
            $("#btnReset").show();
            $("#btnComplete").show();
            implementLogic();
        });
        function stars(){
            const defaults = {
                spread: 360,
                ticks: 50,
                gravity: 0,
                decay: 0.94,
                startVelocity: 30,
                shapes: ["star"],
                colors: ["FFE400", "FFBD00", "E89400", "FFCA6C", "FDFFB8"],
            };
            function shoot() {
                confetti({
                    ...defaults,
                    particleCount: 40,
                    scalar: 1.2,
                    shapes: ["star"],
                });
                confetti({
                    ...defaults,
                    particleCount: 10,
                    scalar: 0.75,
                    shapes: ["circle"],
                });
            }
            setTimeout(shoot, 0);
            setTimeout(shoot, 100);
            setTimeout(shoot, 200);
        }

        function removeAnimation(){
            $("#incorrect").removeClass("animate__shakeX");
        };

        function implementLogic() {
            $(".draggablePiece").draggable({
                revert: "invalid",
                start: function() {
                    if ($(this).hasClass("droppedPiece")) {
                        $(this).removeClass("droppedPiece")
                        $(this).parent().removeClass("piecePresent");
                    }
                    removeAnimation();
                }
            });
            $(".droppableSpace").droppable({
                hoverClass: "ui-state-highlight",
                accept: function() {
                    return !$(this).hasClass("piecePresent")
                },
                drop: function(event, ui) {
                    let draggableElement = ui.draggable;
                    let droppedOn = $(this);
                    let squareNumber = $(this).attr("data-location");
                    let pieceNumber = $(draggableElement).attr('data-order');
                    droppedOn.addClass("piecePresent");
                    $(draggableElement).addClass("droppedPiece").css({
                        top: 0,
                        left: 0,
                        position: "relative",
                    }).appendTo(droppedOn);
                    function checkCorrectness(){
                        if (squareNumber == pieceNumber) {
                            $("#incorrect").hide();
                            $("#correct").show();
                            stars();
                        } else {
                            $("#incorrect").show().addClass("animate__shakeX");
                            $("#correct").hide();
                        };
                        
                    }
                    checkCorrectness();
                }
            });
            $("#btnReset").click(function() {
                window.location.reload();
            });
        }
    })
})();
