// Global functions
function camelCase(str) {

    // Store the string and split them according to spaces as delimeter
    let arr = str.toLowerCase().split(" ");
    // Initialize an empty temporary string storage variable
    let temp = "";

    // Loop through the splited string array
    for(let i = 1; i < arr.length; i++)
    {
        // Camel casing
        temp = temp + arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    // Return the camel cased string
    return arr[0] + temp;
}

    
// ---------------------------------- Category section ----------------------------------

// When add-icon button is clicked, call this function to display temporary input field for new category
function inputCategory() {

    // Keep count of the number of categories already in the categories-panel
    let categoryCount = $('.categories-panel').children('div').length;
    // Keep count of the number of temporary input field in the categories-panel
    let mainCount = $('.categories-panel').children('main').length;

    // If the number of categories is less than = 4 and temporary input filed is not present in the categories-panel, validate the condition
    if(categoryCount != 4 && mainCount == 0) {
        // First remove the add-icon button
        $("#category-add").remove();
        
        // Create a new temporary input field which will hold the new category title
        let inputNewCategory = 
            "<main class='flex-row temp-input-box'>" + 
            "<form method='POST' id='newCategoryForm'>" + 
            "<div style='position: relative; width: 50%'>" + 
            "<input type='text' class='font category-input' id='categoryTitle' name='category' placeholder='Add Category' maxlength=12></input>" + 
            "<span class='input-bar'></span>" + 
            "</div>" + 
            "<button class='category-push' type='submit' id='category-submit' onclick='push()'><i class='icon fa-solid fa-check'></i></button>" + 
            "<button class='category-cancel' type='button' id='category-submit' onclick='removeNew()'><i class='icon fa-solid fa-xmark'></i></button>" + 
            "</form>" + 
            "</main>";

        // Now append the temporary input field for new category in the categories-panel
        $('.categories-panel').append(inputNewCategory);
        $('.categories-panel .temp-input-box').animate({opacity: '1'});
    }
    // If number of categories is more than 4, then remove the add-icon button for new category (Limit the no. of categories to 4)
    else {
        $('#category-add').remove();
    }
}

// Call when new category is to be pushed in the categories-panel
function push() {
    // Store the input string and replace all the special characters with empty character
    let categoryTitle = $('#categoryTitle').val().trim().toString().replace(/[^a-z0-9 \b]/gi, '');

    // Camel Case the new category title
    let storeID = camelCase(categoryTitle);

    // Loop to check if a category with the same ID is already present
    $('.categories-panel div input[type="radio"]').each(function () {
        // If yes then add 1 at the end of the title to make it distinguishable
        if((storeID) == $(this).attr('id'))
        {
            storeID = storeID+1;
        }
    });

    // Validate the length of the new category title
    if(categoryTitle.length > 0 && categoryTitle.length < 13) {

        // Create a new category that displays the new category title
        let newCategory = 
            `<div class='extra-category' id='${storeID}'>` + 
            `<input type='radio' id='${storeID}' name='category' value='${categoryTitle.split(" ").join("-").toLowerCase()}'></input>` + 
            `<label for='${storeID}' class="category-label font">${categoryTitle}</label>` +
            `<form method='POST' id='newAddedCategoryForm'>` +
            `<button type='submit' class='remove-category' id='removeCategory' onclick=''><i class='icon fa-solid fa-xmark'></i></button>` +
            `</form>` +
            `</div>`;

        
        // Send an AJAX request for every new category added (Send Category name and the ID associated with it)
        // ID is sent so that category can be removed with the same ID(=blockToRemove)
        $.ajax({
            url: '/addcategory',
            type: 'POST',
            data: {
                category: categoryTitle,
                id: storeID
            }
        });

        // Remove the temporary input box for new category
        $('.categories-panel .temp-input-box').remove();

        // Append the new category in categories-panel
        $('.categories-panel').append(newCategory);

        // Calling this function to create a divin task-panel section that will display the tasks under the new added category
        addTaskCategory();

        // Make the new category selected by default
        makeNewActive(storeID);

        // Initialize the add-icon button
        const addButton = "<button type='button' id='category-add' class='add-icon font' title='Add Category' onclick='inputCategory()'><i class='icon fa-solid fa-plus'></i></button>";
        // Get the length of the number of categories in categories-panel
        let categoryCount = $('.categories-panel').children('div').length;
        // Limit the number of categories to 4. Don't display the add-icon button if there are already 4 categories
        if(categoryCount != 4) {
            $('.categories-panel').append(addButton);
        }
    }
}

// Call this function when adding new category is canceled
function removeNew() {

    // Initialize the add-icon button
    const addButton = "<button type='button' id='category-add' class='add-icon font' title='Add Category' onclick='inputCategory()'><i class='icon fa-solid fa-plus'></i></button>";
    // Get the length of the number of categories in categories-panel
    let categoryCount = $('.categories-panel').children('div').length;
    // Get the number of buttons in the categories-panel
    let buttonCount = $('.categories-panel').children('button').length;

    // Remove the temporary input field for new category
    $('.categories-panel .temp-input-box').remove();

    // Append the add-icon button only when there are at most 3 categories and also only one add-icon button can be present in the categories-panel
    if((categoryCount == 2 || categoryCount == 3) && buttonCount != 1) {
        $('.categories-panel').append(addButton);
    }
}

// Call this when already existing category is to be removed
$(document).on('click', '#removeCategory', function () {
    // First get the ID of the category to be removed then pass it to the next function
    removeAdded($(this).parent().parent().attr('id'));
});
function removeAdded(blockToRemove) {

    // Initialize the add-icon button
    const addButton = "<button type='button' id='category-add' class='add-icon font' title='Add Category' onclick='inputCategory()'><i class='icon fa-solid fa-plus'></i></button>";
    // Get the length of the number of categories in categories-panel and subtract 1 from it
    let categoryCount = $('.categories-panel').children('div').length - 1;

    
    // Send an AJAX request for any category to be removed (Here blockToRemove is the ID associated with the category to be removed)
    $.ajax({
        url: '/removecategory',
        type: 'POST',
        data: {
            categoryToRemove: blockToRemove,
        }
    });

    // Remove the category fron the categories-panel and remove the task lists associated with that category from the task-panel
    if(categoryCount+1 > 2) {
        $(`.categories-panel div#${blockToRemove}`).remove();
        $(`.task-panel div.${blockToRemove}`).remove();
    }

    // Append the add-icon button if category count is 3
    if(categoryCount >= 2) {
        $('.categories-panel').append(addButton);
    }

    // Remove the extra add-icon button if there are 2 categories. (So that it doesn't display 2 add-icon button)
    if (categoryCount == 2) {
        $('#category-add').remove();
    }

    // If all the categories are deleted then make the first category selected by default
    if(categoryCount == 2) {
        makeNewActive($('.categories-panel div:first input[type=radio]').attr('id'));
    }
    // Make the new added category selected only if the default categories are not selected
    else if($('.categories-panel div input[id="dailies"]').prop('checked') != true && $('.categories-panel div input[id="work"]').prop('checked') != true) {
        makeNewActive($('.categories-panel div:last input[type=radio]').attr('id'));
    }
}

// Keyboard event
$(document).on('keyup', '#categoryTitle', function (event) {
    // If user presses enter, push the new category
    if(event.key == "Enter") {
        push();
    }
    // If user presses escape, cancel the category addition procedure
    if(event.key == "Escape") {
        removeNew();
    }
});

// Call when new category is added to make it selected
function makeNewActive(storeID) {
    // First remove the active class from all the labels in the categories-panel
    $('.categories-panel div label').removeClass('active');
    // Chnage the checked property of every input in the categories-panel to false
    $('.categories-panel div input[type="radio"]').prop('checked', false);

    // Change the checked property of the new category in the categories-panel to true
    $(`.categories-panel div input[id='${storeID}'`).prop('checked', true);
    // Lastly add the active class to the new category in the categories-panel
    $(`.categories-panel div label[for='${storeID}']`).addClass('active');

    // Call this function to display contents of the selected category
    checkActive();
}

// Mouse event(For category selection)
$(document).on('click', '.categories-panel div label', function(e) {

    // Check if the clicked category has active class or not
    if($(`.categories-panel div label[for='${this.htmlFor}']`).hasClass('active') == false) {

        // First remove the active class from all the labels in the categories-panel
        $('.categories-panel div label').removeClass('active');
        // Chnage the checked property of every input in the categories-panel to false
        $('.categories-panel div input[type="radio"]').prop('checked', false);

        // Change the checked property of the category that was clicked in the categories-panel to true
        $(`.categories-panel div input[id='${this.htmlFor}'`).prop('checked', true);
        // Lastly add the active class to the category that was clicked in the categories-panel
        $(`.categories-panel div label[for='${this.htmlFor}']`).addClass('active');

        // Call this function to display contents of the selected category
        checkActive();
    }
});

// ---------------------------------- Category section end ----------------------------------