Script.js


// $(document).ready(function(){
//   $("#btn_hide").click(function(){
   
//     $("#second").toggle(2000, function()
// {
//     console.log("Toggle done or finished");
// }
// );
//   });
// });


// $(document).ready(function(){
//   $("#fadding_effect").click(function(){
   
//    // $("#third").fadeOut();
//     $("#third").fadeTo("slow",0.5);
//   });
// });


// $(document).ready(function(){
//   $("#Box").click(function(){
   
//    // $("#third").fadeOut();
//     $(".box").animate({

//         width : "+=200px",
//         height : "200px",
//         fontSize : "20px"
//     },"slow")
//   });
// });

$("body").keydown(function(event){
  if(event.which == 65)
  {
      $("#second").hide(2000,function(){console.log("Task Completed ")});

  }

   if(event.which == 68)
  {
      $("#second").show(2000,function(){console.log("Task Completed ")});

  }
   
console.log(event.which);
});