//Proble: NO user interaction causes no change to application
//Solution  when user interacts cause change to application
var color = $('.selected').css("background-color");
var $canvas = $('canvas');
var context = $canvas[0].getContext("2d");
var lastEvent;
var mousedown = false;

//when clicking on the
$('.controls').on("click", "li",function(){
    //Deselect sibling element
  $(this).siblings().removeClass("selected");
  //Select clicked element
  $(this).addClass("selected");

  //cache current color
  color = $(this).css("background-color");

});

//When New Color is click
$("#revealColorSelect").click(function(){
  //show color select or hide the color select
  changeColor();
  $("#colorSelect").toggle();
  $("html, body").animate({ scrollTop: $(document).height()-$(window).height()},1000);
});


function changeColor(){
    var r = $('#red').val();
    var g = $('#green').val();
    var b = $('#blue').val();
    //update the new color span
    $("#newColor").css("background-color", "rgb("+ r +","+ g +","+ b + ")");
}

//When color sliders change
$("input[type=range]").change(changeColor);

//When Add color is pressed
$('#addNewColor').click(function(){
      //Append the color to the controls ul
      var $newColor = $("<li></li>");
      $newColor.css("background-color", $("#newColor").css("background-color"));
       $(".controls ul").append($newColor);
       //Select the new color
       $newColor.click();
 });

//On mouse events draw on the canvas
$canvas.mousedown(function(e){
  mousedown =true;
  lastEvent = e;
}).mousemove(function(e){
 //Draw lines
     if(mousedown){
       context.beginPath();
       context.moveTo(lastEvent.offsetX,lastEvent.offsetY);
       context.lineTo(e.offsetX,e.offsetY);
       context.strokeStyle = color;
       context.stroke();
       lastEvent = e;
     }
}).mouseup(function(){
    mousedown = false;
}).mouseleave(function(){
  $canvas.mouseup();
});
