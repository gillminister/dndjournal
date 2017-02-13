
$(document).ready(function() {
    $('select').material_select();
});


var ajax_newCharacter = function(){
  alertify.message($("#charnameinput").val());
  $.post( "/api/characters/", {
    campaign: $("#new_character_form").find("input[name='campaign']").find(":selected").val(),
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
