


var balleballe = function(){
  alertify.message($("#charnameinput").val());
  $.post( "/api/characters/", { name: $("#charnameinput").val() })
    .done(function(data) {
      console.log(data);
      alertify.success( data.message );
    })
    .fail(function(data) {
      alertify.error( data.responseText );
    })
    .always(function() {
      alertify.message( "finished" );
    });
}
