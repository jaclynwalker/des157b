(function(){
    console.log('reading js');

    $(document).ready(function(){
        var rows = 4;
        var columns = 4;
        var pieces = "";
        var place = 1;
        order = 0;
        for (var i=0; i<rows; i++)
        {
            for (var j=0; j<columns; j++)
            {
                pieces+= `<div class='piece'><img src='images/gradient${place}.jpg' width=100 data-order=${order}></div>`;
                place++;
                order++;
            }
        }
        // console.log(pieces);
        $("#puzzleContainer").html(pieces);
        $("#btnStart").click(function(){
            console.log("button clicked")
            var pieces = $("#puzzleContainer div");
            pieces.each(function(){
                var leftPosition = Math.floor(Math.random()*290)+25 + "px";
                var topPosition = Math.floor(Math.random()*290)+25 + "px";
                $(this).addClass("draggablePiece").css({
                    position: "absolute", 
                    left: leftPosition,
                    top: topPosition
                })
                $("pieceContainer").append($(this));
            });
            var emptyString = "";
            for (var i=0; i<rows; i++)
            {
                for (var j=0; j<columns; j++)
                {
                    emptyString+= `<div class='piece droppableSpace'></div>`;
                }
            }
            $("#puzzleContainer").append(emptyString);
            $(this).hide();
            $("#btnReset").show();
            implementLogic();
        });
        function implementLogic(){
            $(".draggablePiece").draggable({
                revert:"invalid",
                start:function(){
                    if($(this).hasClass("droppedPiece")){
                        $(this).removeClass("droppedPiece")
                        $(this).parent().removeClass("piecePresent");
                    } 
                }
            });
            $(".droppableSpace").droppable({
                hoverClass:"ui-state-highlight", //change theme in link to change color
                accept:function(){
                    return!$(this).hasClass("piecePresent")
                },
                drop:function(event,ui){
                    var draggableElement = ui.draggable;
                    var droppedOn = $(this);
                    droppedOn.addClass("piecePresent");
                    $(draggableElement).addClass("droppedPiece").css({
                        top:0,
                        left: 0,
                        position: "relative"
                    }).appendTo(droppedOn);
                }
            });
            $("#btnReset").click(function(){
                window.location.reload();
            })
        }
    })
})();