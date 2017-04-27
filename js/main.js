/*global $*/
$("document").ready(function(){
    
    var musicGenre ;
    var bandName;
    
    
    //This function return a random option iside the music genre.
    function randomOption(data){
        var genreOptions = data[musicGenre];
        var randomNum = Math.ceil(Math.random() * 100);
        var index;
        
        // % chances on every option
        if(randomNum < 3) {
           index = 0;
        } else if (randomNum < 98){
           index = 1;
        } else {
           index = 2;
        }
        
        var randomKey = Object.keys(genreOptions)[index];
        return randomKey;
    }
    
    
    // Using the option generated by the previuos function, get the random names
    function randomName(data){
        var option = randomOption(data);
        var obj = data[musicGenre][option];
    
        if(option === "optionA" || option === "optionB") {
            var random1st = Math.floor(Math.random() * obj.firstWord.length);
            var random2nd = Math.floor(Math.random() * obj.secondWord.length);
            bandName = obj.firstWord[random1st] + " " + obj.secondWord[random2nd]
            $("#band-name").html(bandName);
            console.log(bandName);
        } else if( option === "optionC") {
            var randomC= Math.floor(Math.random() * obj.length);
            bandName = obj[randomC]
            $("#band-name").html(bandName);
        }
        //transition fade in
        $("#band-name").fadeOut(10);
        $("#band-name").fadeIn(1000);
    }
    
    //Request data from json file
   function getName(){
       $.getJSON("js/options.json", randomName); 
   }
      
    //Metal btn click function  
      function chooseMetal(){
          if(musicGenre !== "metal"){
            musicGenre = "metal";
            getName();
          }
      }
      
    //Stoner btn click function  
      function chooseStoner(){
          if(musicGenre !== "stoner"){
            musicGenre = "stoner";
            getName(); 
          }
      }
      
    //styles changer  
      function metalBtnStyle(){
          document.documentElement.style.setProperty("--background", "#FF7E70");
          document.documentElement.style.setProperty("--primary", "#FFD700");
          document.documentElement.style.setProperty("--secondary", "#292b2c");
          document.getElementById("band-name").style.setProperty("font-family", "var(--metalFont1)");
          $("#stoner").removeClass("active");
          $("#metal").addClass("active");
      }
      
      function stonerBtnStyle(){
          document.documentElement.style.setProperty("--background", "#51BA78");
          document.documentElement.style.setProperty("--primary", "#663399");
          document.documentElement.style.setProperty("--secondary", "#E88958");
          document.getElementById("band-name").style.setProperty("font-family", "var(--stonerFont)");
          $("#metal").removeClass("active");
          $("#stoner").addClass("active");
      }
      
    
    //share functionality
    
    function share(){
        if(musicGenre) {
            var toUri = "https://twitter.com/intent/tweet?text=" + "My " + musicGenre + " random band name is " + '"' + bandName + '"' + " Done using https://jorgeural.github.io/Random-Band-Name/";
            var uri = encodeURI(toUri);
            
            console.log(bandName);
            window.open(uri, "_blank");
        } else {
            console.log("false");
        }
    }
      
    //Events  
      $("#metal").on("click", chooseMetal);
      $("#metal").on("click", metalBtnStyle);
      $("#stoner").on("click", chooseStoner);
      $("#stoner").on("click", stonerBtnStyle);
      $("#random").on("click", getName);
      $("#twitter").on("click", share);
      
})


  