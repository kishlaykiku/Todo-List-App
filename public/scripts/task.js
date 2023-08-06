// ---------------------------------- Task section

// To check whichcategory is active
function checkActive() {
    let classID = $('input[type="radio"]:checked').attr('id');

    if($('.task-panel').children().hasClass(`${classID}`)) {
        $('.task-panel').children().addClass('hide');
        $(`.${classID}`).removeClass('hide');
    }
}

// To add new Task category
function addTaskCategory() {
    let categoryNumber = $('.task-panel div').length;
    let categoryCount = $('.categories-panel div').length;
    let categoryTitle = $('.categories-panel div:last input[type=radio]').attr('id');

    let newTaskCategory = 
        `<div class='category-${categoryNumber+1} ${categoryTitle}'>` + 
        '<h1>Kiklu</h1>' +
        '</div>';
    
    if(categoryNumber < 4) {
        $('.task-panel').append(newTaskCategory);
    }

    categoryNumber = $('.task-panel div').length;
    if(categoryNumber != categoryCount) {
        $(`.task-panel .category-${categoryNumber}`).remove();
    }
    checkActive();
}

checkActive();