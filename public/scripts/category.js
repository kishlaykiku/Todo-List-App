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
    let categoryCount = $('.categories-panel div').length;
    let mainCount = $('.categories-panel main').length;

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
        $('.temp-input-box').animate({opacity: '1'});
        keyInputs();
    }
    else {
        $('#category-add').remove();
    }
}
function push() {
    
    let categoryTitle = $('#categoryTitle').val().trim().toString();

    let storeID = camelCase(categoryTitle);

    $('input[type="radio"]').each(function () {
        if((storeID) == $(this).attr('id'))
        {
            storeID = storeID+1;
        }
    });

    if(storeID == $('input[type="radio"]').attr('id')) {
        storeID = storeID+1;
    }

    if(categoryTitle.length > 0 && categoryTitle.length < 13) {
        let newCategory = 
            `<div class='extra-category' id='classCategory'>` + 
            `<input type='radio' id='${storeID}' name='category' value='${categoryTitle.split(" ").join("-").toLowerCase()}'></input>` + 
            `<label for='${storeID}' class="category-label font">${categoryTitle}</label>` +
            `<button class='remove-category' id='removeCategory' onclick='removeAdded()'><i class='icon fa-solid fa-xmark'></i></button>` + 
            `</div>`;

        $('.temp-input-box').remove();
        $('.categories-panel').append(newCategory);
        addTaskCategory();
        selectedCategory();

        const addButton = "<button id='category-add' class='add-icon font' title='Add Category' onclick='inputCategory()'><i class='icon fa-solid fa-plus'></i></button>";
        let categoryCount = $('.categories-panel div').length;
        if(categoryCount != 4) {
            $('.categories-panel').append(addButton);
        }
    }
}
function removeNew() {
    const addButton = "<button id='category-add' class='add-icon font' title='Add Category' onclick='inputCategory()'><i class='icon fa-solid fa-plus'></i></button>";
    $('.temp-input-box').remove();

    let buttonCount = $('.categories-panel button').length;
    if(buttonCount == 0) {
        $('.categories-panel').append(addButton);
    }
}
function removeAdded() {
    const addButton = "<button id='category-add' class='add-icon font' title='Add Category' onclick='inputCategory()'><i class='icon fa-solid fa-plus'></i></button>";
    let categoryCount = $('.categories-panel div').length - 1;
    let blockToRemove = $('#removeCategory').parent().attr('id');

    $(`#${blockToRemove}`).remove();

    if(categoryCount >= 2) {
        $('.categories-panel').append(addButton);
    }
    // To check and remove extra add category icon
    
    if (categoryCount == 2) {
        $('#category-add').remove();
    }
}
function keyInputs() {
    $('#categoryTitle').on("keyup", function (event) {
        if(event.key == "Enter") {
            push();
        }
        if(event.key == "Escape") {
            removeNew();
        }
    });
}
function selectedCategory() {
    $('label').on('click', function(e) {
        if($(`label[for='${this.htmlFor}']`).hasClass('active') == false) {
            $('label').removeClass('active');
            $('input[type="radio"]').prop('checked', false);

            $(`input[id='${this.htmlFor}'`).prop('checked', true);
            $(`label[for='${this.htmlFor}']`).addClass('active');
            checkActive();
        }
    });
}
selectedCategory();
// ---------------------------------- Category section end