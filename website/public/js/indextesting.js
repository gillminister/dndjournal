


var balleballe = function(){
  alertify.message($("#charnameinput").val());
  $.post( "/api/characters/", {
    name: $("#new_character_form").find("input[name='name']").val(),
    class: $("#new_character_form").find("input[name='class']").val(),
    race: $("#new_character_form").find("input[name='race']").val()
  })
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
