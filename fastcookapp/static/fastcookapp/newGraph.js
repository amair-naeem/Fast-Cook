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

                        var csrftoken = getCookie('csrftoken');


/*$( document ).ready(function() {

    /*$("#formNewGraph").submit(function (evt) {
        evt.preventDefault();
        window.history.back();
        
    });
    header('Location: http://www.example.com/form.php');


});*/



function doFunction(id,tr){

    if(confirm("Are you sure you want to delete?"))
    {

        csrftoken = getCookie('csrftoken');
        event.preventDefault();
        /*var id = $(this).attr('id');
        var tr = $(this).closest('tr');*/
        $.ajax({
            type: "DELETE",
            url: id, 
            headers:{
                    "X-CSRFToken": csrftoken
                    },
            success: //$($(this)).closest("tr").remove() 
            //console.log(tr)

            function(){
                var row = tr.parentNode.parentNode;
                row.parentNode.removeChild(row);
            }

        })

    }

    else
    {
        return false;
    }
    
}

$("#test123").on('click', function(event){

	event.preventDefault();


	$.ajax({
                    
	            type: "POST",
	            url: "/profile/",
	            dataType: 'text',
	            headers:{
	                "X-CSRFToken": csrftoken
	            },
	            data:{
	            	'graphTitle22' : $("#graphTitle22").val()
	            },
	            success: function(data){
	                var json = JSON.parse(data)
	                var title = $("#graphTitle22").val();
	                if(json['overwrite'])
	                {
	                	$("#errorModal").empty()
	                	$("#errorModal").append(title + " already exists, please use another title");
	                	$('#createNewGraph').modal('show');

	                }

	                else
	                {
	                	var id = json['id']
	                	window.location.href = "/openGraphFromProfile/"+id
	                }
	            }
        });


});