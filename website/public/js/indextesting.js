
$(document).ready(function() {
    $('select').material_select();
});


var balleballe = function(){
  alertify.message($("#charnameinput").val());
  $.post( "/api/characters/", {
    name: $("#new_character_form").find("input[name='name']").val(),
    class: $("#new_character_form").find("select[name='class']").find(":selected").val(),
    race: $("#new_character_form").find("select[name='race']").find(":selected").val()
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
