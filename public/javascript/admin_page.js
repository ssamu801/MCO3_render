$(document).ready(function() {
    var max_fields      = 10; //maximum input boxes allowed
    var wrapper   		= $(".input_fields_wrap"); //Fields wrapper
    var add_button      = $(".add_field_button"); //Add button ID
    
    var x = 1; //initlal text box count
    $(add_button).click(function(e){ //on add input button click
    e.preventDefault();
        if(x < max_fields){ //max input box allowed
            x++; //text box increment
            $(wrapper).append('<div class="add-input"><input class="add-field" type="text" type="text" name="courses[]" placeholder="Courses" required><div class="input-group-append"><button class="remove_field" type="button">Remove</button></div></div>'); //add input box
        }
    });
    
    $(wrapper).on("click",".remove_field", function(e){ //user click on remove text
        e.preventDefault(); $(this).parent('div').parent('div').remove(); x--;
        })
    });

 $(document).ready(function() {
    var max_fields      = 10; //maximum input boxes allowed
    var wrapper   		= $(".input-fields-wrap"); //Fields wrapper
    var add_button      = $(".add-field-button"); //Add button ID
    
    var x = 1; //initlal text box count
    $(add_button).click(function(e){ //on add input button click
    e.preventDefault();
        if(x < max_fields){ //max input box allowed
            x++; //text box increment
            $(wrapper).append('<div class="add_input"><input class="add_field" type="text" name="courses_name[]" placeholder="Courses Name" required><div class="input_group_append"><button class="remove-field" type="button">Remove</button></div></div>'); //add input box
        }
    });
    
    $(wrapper).on("click",".remove-field", function(e){ //user click on remove text
        e.preventDefault(); $(this).parent('div').parent('div').remove(); x--;
        })
    });   

var department = $("[name=department] option").detach()
$("[name=college]").change(function() {
  var val = $(this).val()
  $("[name=department] option").detach()
  department.filter("." + val).clone().appendTo("[name=department]")
}).change()

let popup = document.getElementById("review-form-popup");

