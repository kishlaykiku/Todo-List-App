// ---------------------------------- Task section

// To check whichcategory is active
function checkActive() {
    let classID = $('.categories-panel div input[type="radio"]:checked').attr('id');

    if($('.task-panel').children('div').hasClass(`${classID}`)) {
        $('.task-panel').children('div').addClass('hide');
        $(`.task-panel div.${classID}`).removeClass('hide');
    }
}

// To add new Task category
function addTaskCategory() {
    let categoryNumber = $('.task-panel').children('div').length;
    let categoryCount = $('.categories-panel').children('div').length;
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
        $(`.task-panel div.category-${categoryNumber}`).remove();
    }
    checkActive();
}

checkActive();