$(document).ready(function() {
    $('select').material_select();
    populateMyCharacters();
});


var populateMyCharacters = function() {
    var myCharsDiv = $("#my_characters");

    $.get("/api/user/characters/jorn91@gmail.com", function() {
            alert("success");
        })
        .done(function(data) {
            alert("second success");
            console.log(data);
        })
        .fail(function() {
            alert("error");
        })
        .always(function() {
            alert("finished");
        });
};


var ajax_newCharacter = function() {

    var postData = {};
    var characterClassCreated = false; // boolean to check whether character_class entity is ready.

    $("select, input").each((index, inputElement) => {

        // Check input type
        if ($(inputElement).hasClass("select-dropdown"))
            // dropdown select input
            if ($(inputElement).find(":selected").val())
                if (inputElement.name == "character_class")
                    // input is character class. This should not be a part of the character ajax.
                    // Should create new character_class in DB -> BEFORE character entity is created: Set characterClassCreated to true on succes
                    void(0); // do nothing for now; still testing.
                else
                    postData[inputElement.name] = $(inputElement).find(":selected").val();
        else
            // regular input
            postData[inputElement.name] = $(inputElement).val();
    })

    console.log(postData);


    $.post("/api/characters/", {
            campaign: $("#new_character_form").find("select[name='campaign']").find(":selected").val(),
            name: $("#new_character_form").find("input[name='name']").val(),
            // class: $("#new_character_form").find("select[name='class']").find(":selected").val(),
            race: $("#new_character_form").find("select[name='race']").find(":selected").val(),
            owner: $("#new_character_form").find("#character_owner").val()
        })
        .done(function(data) {
            console.log(data);
            alertify.success(data.message);
        })
        .fail(function(data) {
            alertify.error(data.responseText);
        })
        .always(function() {
            alertify.message("finished");
        });
}
