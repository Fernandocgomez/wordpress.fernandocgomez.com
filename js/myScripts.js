document.addEventListener("DOMContentLoaded", function(event) { 
    console.log("my custom script")
    $("body").click(function() {
        console.log("jquery works")
    })
});