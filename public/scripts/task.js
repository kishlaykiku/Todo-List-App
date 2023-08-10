// ---------------------------------- Task section ----------------------------------

// To check which category is active
function checkActive() {

    // Store the ID of the selected category
    let classID = $('.categories-panel div input[type="radio"]:checked').attr('id');

    // If any div in the task-panel has class name resembling with the classID, then enter
    if($('.task-panel').children('div').hasClass(`${classID}`)) {

        // First remove the hide class from all the div's in the task-panel
        $('.task-panel').children('div').addClass('hide');
        // Now remove the hide class from the div that has class name resembling with the classID
        $(`.task-panel div.${classID}`).removeClass('hide');
    }
}

// To add new Task section when a new category is added
function addTaskCategory() {

    // Get the length of the number of task sections in task-panel
    let categoryNumber = $('.task-panel').children('div').length;
    // Get the length of the number of categories in categories-panel
    let categoryCount = $('.categories-panel').children('div').length;
    // Get the name of the last category in categories-panel
    let categoryTitle = $('.categories-panel div:last input[type=radio]').attr('id');

    // Create a new Task section with corresponding category title
    let newTaskCategory = 
        `<div class='category-${categoryNumber+1} ${categoryTitle}'>` + 
        '<h1>Kiklu</h1>' +
        '</div>';
    
    // Append the new task section if category at kost 3 (Limit of 4 task sections)
    if(categoryNumber < 4) {
        $('.task-panel').append(newTaskCategory);
    }

    // Get the length of the number of task sections in task-panel
    categoryNumber = $('.task-panel div').length;
    // If number of categories is not euqal to number of task sections, remove the extra added task section
    if(categoryNumber != categoryCount) {
        $(`.task-panel div.category-${categoryNumber}`).remove();
    }

    // Check which category is active
    checkActive();
}

// First function call to check which category is active
checkActive();

// ---------------------------------- Task section end ----------------------------------