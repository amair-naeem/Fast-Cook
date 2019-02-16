//get the cookie
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}



$(document).ready(function() {
    $("#test123").click(function(event){
    	event.preventDefault()
    	var csrftoken = getCookie('csrftoken');
        $.ajax({
	                type: "POST",
	                url: "/create/", 
	                headers:{
	                        "X-CSRFToken": csrftoken
	                        },
	                data: {
	                		'graphTitle22': $("#graphTitle").val()
	                },
	                success: function(data){
	                		console.log(data["overwrite"])
                            //var parseData = JSON.parse(data)
                            //console.log(parseData["overwrite"])
                            if(data["overwrite"])
                            {
                                alert($("#graphTitle").val() + " already exists")
                            }

                            else{
	                            window.top.location = "/home/";

                            }


                        }

                })
    }); 
});