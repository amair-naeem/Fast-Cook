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


function doFunction(id,tr){
    csrftoken = getCookie('csrftoken');
    event.preventDefault();
    /*var id = $(this).attr('id');
    var tr = $(this).closest('tr');*/
    console.log(id)
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