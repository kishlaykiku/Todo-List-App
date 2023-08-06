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
// Input field for new category
let inputNewCategory;
// New category
let newCategory;
// For max category
let categoryCount = 2;
// Store the add-icon button
const addButton = "<button id='category-add' class='add-icon font' title='Add Category' onclick='inputCategory()'><i class='icon fa-solid fa-plus'></i></button>"


function inputCategory() {
    if(categoryCount != 4) {
        $("#category-add").remove();
        
        inputNewCategory = 
            "<div class='flex-row temp-input-box'>" + 
            "<div style='position: relative; width: 50%'>" + 
            "<input type='text' class='font category-input' id='categoryTitle' placeholder='Add Category' maxlength=12></input>" + 
            "<span class='input-bar'></span>" + 
            "</div>" + 
            "<button class='category-push' id='category-submit' onclick='push()'><i class='icon fa-solid fa-check'></i></button>" + 
            "<button class='category-cancel' id='category-submit' onclick='removeNew()'><i class='icon fa-solid fa-xmark'></i></button>";

        $('.categories-panel').append(inputNewCategory);
        $('.temp-input-box').animate({opacity: '1'});
        keyInputs();
        categoryCount++;
    }
    else {
        $('#category-add').remove();
    }
}
function push() {
    let categoryTitle = $('#categoryTitle').val().trim().toString();
    if(categoryTitle.length > 0 && categoryTitle.length < 13) {
        newCategory = 
            `<div class='extra-category' id='classCategory'>` + 
            `<input type='radio' id='${camelCase(categoryTitle)}' name='category' value='${categoryTitle.split(" ").join("-").toLowerCase()}'></input>` + 
            `<label for='${camelCase(categoryTitle)}' class="category-label font">${categoryTitle}</label>` +
            `<button class='remove-category' id='removeCategory' onclick='removeAdded()'><i class='icon fa-solid fa-xmark'></i></button>` + 
            `</div>`;

        $('.temp-input-box').remove();
        $('.categories-panel').append(newCategory);
        selectedCategory();
        if(categoryCount != 4) {
            $('.categories-panel').append(addButton);
        }
    }
}
function removeNew() {
    $('.temp-input-box').remove();
    $('.categories-panel').append(addButton);
    categoryCount--;
}
function removeAdded() {
    let blockToRemove = $('#removeCategory').parent().attr('id');
    $(`#${blockToRemove}`).remove();
    $('.categories-panel').append(addButton);
    categoryCount--;
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
            console.log(this.htmlFor);
            $('label').removeClass('active');
            $('input[type="radio"]').prop('checked', false);

            $(`input[id='${this.htmlFor}'`).prop('checked', true);
            $(`label[for='${this.htmlFor}']`).addClass('active');
        }
    });
}
selectedCategory();
// ---------------------------------- Category section end