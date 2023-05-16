(function(){
    console.log('reading js');

    $(document).ready(function(){
        const puzzleContainer = $("#puzzleContainer");

        const rows = 4;
        const columns = 4;
        let pieces = "";
        let place = 1;
        let pieceOrder = 0;
        for (let i=0; i<rows; i++)
        {
            for (let j=0; j<columns; j++)
            {
                pieces+= `<div class='piece'><img src='images/tana${place}.jpg' width=100 data-order=${pieceOrder}></div>`;
                place++;
                pieceOrder++;
            }
        }
        // console.log(pieces);
        puzzleContainer.html(pieces);
        $("#btnStart").click(function(){
            console.log("button clicked")
            let pieces = $("#puzzleContainer div");
            pieces.each(function(){
                const leftPosition = Math.floor(Math.random()*290)+25 + "px";
                const topPosition = Math.floor(Math.random()*290)+25 + "px";
                $(this).addClass("draggablePiece").css({
                    position: "absolute", 
                    left: leftPosition,
                    top: topPosition
                })
                $("pieceContainer").append($(this));
            });
            let emptyString = "";
            let spaceOrder = 0;
            for (let i=0; i<rows; i++)
            {
                for (let j=0; j<columns; j++)
                {
                    emptyString+= `<div class='piece droppableSpace' data-order=${spaceOrder}></div>`;
                    spaceOrder++;
                }
            }
            // console.log(emptyString);
            puzzleContainer.append(emptyString);
            $(this).hide();
            const btnReset = $("#btnReset")
            btnReset.show();
            $("#btnComplete").show();
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
                    const draggableElement = ui.draggable;
                    const droppedOn = $(this);
                    droppedOn.addClass("piecePresent");
                    $(draggableElement).addClass("droppedPiece").css({
                        top:0,
                        left: 0,
                        position: "relative"
                    }).appendTo(droppedOn);
                }
            });
            $("#btnComplete").click(function(){
                $("#completedPuzzle").show().addClass("animate__backInDown");
            })
            $("#btnReset").click(function(){
                window.location.reload();
            });
        }
    })
})();
