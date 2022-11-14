$(document).ready(function(){
    // Send update request
    $(':checkbox' ).click(function(){
        $.post('example/update',
        {
          id: $(this).val(),
          value: $(this).is(':checked')
        },
        function(){  
            displayResultMessage('Updated successfully');
        });
    });

    // Send delete request
    $('.delete_button' ).click(function(){
        taskId = $(this).val();
        $.post('example/delete',
        {
          id: taskId
        },
        function(){
            rowId = 'row-' + taskId;
            document.getElementById(rowId).remove();
            displayResultMessage('Deleted successfully');
        });
    }); 

    // Send insert request
    $('.add_button' ).click(function(){
        var textField = $('.task_field');
        var taskDescription = textField.val();
        textField.val("");
        if(taskDescription == "") { return; }
        $.post('example/create',
        {
          description: taskDescription
        },
        function(taskId){
            // How do you even reuse pug templates from javascript? CAN you even?
            var newRow = 
            `<tr id="row-tasks/${taskId}">
                <td>${taskDescription}</td>
                <td class="center_cell">
                    <input class="check" type="checkbox" value="${taskId}">
                </td>
                <td class="center_cell">
                    <button class="button delete_button" value="${taskId}">Delete</button>
                </td>
            </tr>`;
            $('#task_table tr:last').after(newRow);
            displayResultMessage("Created succesfully");
        });
    }); 
});



function displayResultMessage(message) {
    var alert = $('.alert');
    alert.css('opacity', '1');
    $('.res_message').text(message);
}