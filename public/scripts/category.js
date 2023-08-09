// Global functions
function camelCase(str) {
    let arr = str.toLowerCase().split(" ");
    let temp = "";
    for(let i = 1; i < arr.length; i++)
    {
        temp = temp + arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    return arr[0] + temp;
}


// ---------------------------------- Category section
// Store the add-icon button



function inputCategory() {
    let categoryCount = $('.categories-panel').children('div').length;
    let mainCount = $('.categories-panel').children('main').length;

    if(categoryCount != 4 && mainCount == 0) {
        $("#category-add").remove();
        
        let inputNewCategory = 
            "<main class='flex-row temp-input-box'>" + 
            "<div style='position: relative; width: 50%'>" + 
            "<input type='text' class='font category-input' id='categoryTitle' placeholder='Add Category' maxlength=12></input>" + 
            "<span class='input-bar'></span>" + 
            "</div>" + 
            "<button class='category-push' id='category-submit' onclick='push()'><i class='icon fa-solid fa-check'></i></button>" + 
            "<button class='category-cancel' id='category-submit' onclick='removeNew()'><i class='icon fa-solid fa-xmark'></i></button>" + 
            "</main>";

        $('.categories-panel').append(inputNewCategory);
        $('.categories-panel .temp-input-box').animate({opacity: '1'});
    }
    else {
        $('#category-add').remove();
    }
}
function push() {
    let categoryTitle = $('#categoryTitle').val().trim().toString().replace(/[^a-z0-9 \b]/gi, '');

    let storeID = camelCase(categoryTitle);

    $('.categories-panel div input[type="radio"]').each(function () {
        if((storeID) == $(this).attr('id'))
        {
            storeID = storeID+1;
        }
    });

    if(storeID == $('.categories-panel div input[type="radio"]').attr('id')) {
        storeID = storeID+1;
    }

    if(categoryTitle.length > 0 && categoryTitle.length < 13) {
        let newCategory = 
            `<div class='extra-category' id='${storeID}'>` + 
            `<input type='radio' id='${storeID}' name='category' value='${categoryTitle.split(" ").join("-").toLowerCase()}'></input>` + 
            `<label for='${storeID}' class="category-label font">${categoryTitle}</label>` +
            `<button class='remove-category' id='removeCategory' onclick=''><i class='icon fa-solid fa-xmark'></i></button>` + 
            `</div>`;

        $('.categories-panel .temp-input-box').remove();
        $('.categories-panel').append(newCategory);
        addTaskCategory();

        const addButton = "<button id='category-add' class='add-icon font' title='Add Category' onclick='inputCategory()'><i class='icon fa-solid fa-plus'></i></button>";
        let categoryCount = $('.categories-panel').children('div').length;
        if(categoryCount != 4) {
            $('.categories-panel').append(addButton);
        }
    }
}
function removeNew() {
    const addButton = "<button id='category-add' class='add-icon font' title='Add Category' onclick='inputCategory()'><i class='icon fa-solid fa-plus'></i></button>";
    let categoryCount = $('.categories-panel').children('div').length;
    let buttonCount = $('.categories-panel').children('button').length;

    $('.categories-panel .temp-input-box').remove();

    if((categoryCount == 2 || categoryCount == 3) && buttonCount != 1) {
        $('.categories-panel').append(addButton);
    }
}


$(document).on('click', '#removeCategory', function () {
    removeAdded($(this).parent().attr('id'));
});
function removeAdded(blockToRemove) {
    const addButton = "<button id='category-add' class='add-icon font' title='Add Category' onclick='inputCategory()'><i class='icon fa-solid fa-plus'></i></button>";
    let categoryCount = $('.categories-panel').children('div').length - 1;

    if(categoryCount+1 > 2) {
        $(`.categories-panel div#${blockToRemove}`).remove();
        $(`.task-panel div.${blockToRemove}`).remove();
    }

    if(categoryCount >= 2) {
        $('.categories-panel').append(addButton);
    }
    // To check and remove extra add category icon
    
    if (categoryCount == 2) {
        $('#category-add').remove();
    }
}

$(document).on('keyup', '#categoryTitle', function (event) {
    if(event.key == "Enter") {
        push();
    }
    if(event.key == "Escape") {
        removeNew();
    }
});

$(document).on('click', '.categories-panel div label', function(e) {
    if($(`.categories-panel div label[for='${this.htmlFor}']`).hasClass('active') == false) {
        $('.categories-panel div label').removeClass('active');
        $('.categories-panel div input[type="radio"]').prop('checked', false);

        $(`.categories-panel div input[id='${this.htmlFor}'`).prop('checked', true);
        $(`.categories-panel div label[for='${this.htmlFor}']`).addClass('active');
        checkActive();
    }
});
// ---------------------------------- Category section end