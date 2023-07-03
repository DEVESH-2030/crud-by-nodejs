
// function for add user 
$('#add_user').submit(function(event){
    alert("User created successfully....")
})

// function for update user
$('#update_user').submit(function(event){
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {}
    
    $.map(unindexed_array, function(n, i){
        data [n['name']] = n['value']
    })

    var request = {
        "url" :    `http://localhost:5000/api/users/${data.id}`,
        "method" : 'PUT',
        "data"   : data
    }

    $.ajax(request).done(function(response){
        alert("User updated successfully.");
    })
})

// function for delete user
if (window.location.pathname == '/'){
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function(){
        var id = $(this).attr("data-id")

        var request = {
            "url" : `http://localhost:5000/api/users/${id}`,
            "method" : 'DELETE'
        }

        if (confirm("Do you really want to delete this record?")){
            $.ajax(request).done(function(){
                alert("User deleted successfully.");
                location.reload();
            })
        }
    })
}