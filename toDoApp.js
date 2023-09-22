var tableBody = document.getElementById('tableBody')
var budget = document.getElementById('budgetCount')
var marquee = document.getElementById('marquee')
var total = document.getElementById('totalCount')
var totalValue = 0; // Initialize the total expense value

function AddTable() {
    var getValue1 = document.getElementById('inp')
    var getValue2 = document.getElementById('inp1')
    var getValue3 = document.getElementById('inp2')

    // Check if the input fields are empty
    if (getValue1.value === '' || getValue2.value === '' ) {
        alert("Please fill all the fields");
        return; // Exit the function without processing empty inputs
    }
    
    var parseValue2 = parseInt(getValue2.value);
    var parseValue3 = parseInt(getValue3.value);

if (getValue1.value === '' || getValue2.value === ''&&!isNaN(parseValue3)) {
        // Update the budget display
        budget.textContent = parseValue3;

        // Clear the third input field
        getValue3.value = '';
        return; // Exit the function after updating the budget value
    }
    // Update the totalValue by adding the current expense value
    totalValue += parseValue2;

    var createTr = document.createElement('tr')
    var createTd1 = document.createElement('td')
    createTd1.textContent = getValue1.value
    createTd1.style.whiteSpace = 'normal'

    var createTd2 = document.createElement('td')
    createTd2.textContent = getValue2.value
    createTd2.style.whiteSpace = 'normal'

    var createTd3 = document.createElement('td')

    var hideButton = document.createElement('button')
    var hideButtonText = document.createTextNode('::')
    hideButton.appendChild(hideButtonText)

    var buttonDiv = document.createElement('div')
    buttonDiv.setAttribute('class', 'buttonDiv');

    var deleteButton = document.createElement('button')
    deleteButton.textContent = "Delete"
    deleteButton.classList.add('delButton')

    var editButton = document.createElement('button')
    editButton.textContent = "Edit"
    editButton.classList.add('editButton')

    buttonDiv.appendChild(deleteButton)
    buttonDiv.appendChild(editButton)
    hideButton.appendChild(buttonDiv)

    buttonDiv.style.display = 'none'

    hideButton.style.cursor = 'pointer'
    hideButton.addEventListener('click', function () {
        var getButtonDiv = createTr.querySelector('.buttonDiv')
        if (getButtonDiv.style.display == 'none') {
            setTimeout(() => {
                getButtonDiv.style.transition = '0 0.2s ease'
                getButtonDiv.style.display = 'block'
                hideButton.style.backgroundColor = 'gray'
                hideButton.style.color = 'black'
            }, 500)
        } else {
            getButtonDiv.style.display = 'none'
            hideButton.style.backgroundColor = 'black'
            hideButton.style.color = 'white'
        }
    })

    deleteButton.addEventListener('click', function () {
        // Subtract the deleted expense value from the totalValue
        totalValue -= parseValue2
        updateTotal() // Update the total display
        deleteRow(this)
    })

    editButton.addEventListener('click', function () {
        updateTotal()
        edit(this)
    })

    createTd3.appendChild(hideButton)
    createTr.appendChild(createTd1);
    createTr.appendChild(createTd2);
    createTr.appendChild(createTd3);
    tableBody.appendChild(createTr);

    // Update the total display
    updateTotal();
    // Update the budget display
    budget.textContent = parseValue3;
    if (parseValue3 < totalValue) {
        marquee.innerHTML = 'Please manage your budget, your budget is less from your total expenses';
        alert('Check your budget')
    } else if (parseValue3 > totalValue) {
        marquee.innerHTML = ''
    }

    // Clear input fields after adding a row
    document.getElementById('inp').value = ''
    document.getElementById('inp1').value = ''
    // document.getElementById('inp2').value = '' // Clear the budget input field
}


function updateTotal() {
    // Update the total display with the current totalValue
    total.textContent = totalValue
}

function deleteRow(e) {
    var row = e.parentNode.parentNode.parentNode.parentNode
    row.remove()
    updateTotal();
}

function DeleteAll() {
    tableBody.innerHTML = ''
    totalValue = 0
    updateTotal()
}

function edit(e) {
    var row = e.parentNode.parentNode.parentNode.parentNode; // Get the table row
    var firstTd = row.querySelector('td:first-child'); // Get the first cell in the row
    var secondTd = row.querySelector('td:nth-child(2)'); // Get the second cell in the row

    // Edit the content of the first cell
    var textNode1 = firstTd.firstChild;
    if (textNode1 && textNode1.nodeType === Node.TEXT_NODE) {
        var editing1 = prompt("Edit this..", textNode1.nodeValue);
        if (editing1 !== null) {
            if (editing1 === '') {
                alert("Don't want to edit the first cell!");
            } else {
                textNode1.nodeValue = editing1; // Update the text node's value
            }
        }
    }

    // Edit the content of the second cell
    var textNode2 = secondTd.firstChild;
    if (textNode2 && textNode2.nodeType === Node.TEXT_NODE) {
        var oldValue = parseInt(textNode2.nodeValue);
        var editing2 = prompt("Edit this..", oldValue);
        if (editing2 !== null) {
            if (editing2 === '') {
                alert("Don't want to edit the second cell!");
            } else {
                textNode2.nodeValue = editing2; // Update the text node's value
                // Subtract the old value and add the edited value to totalValue
                totalValue = totalValue - oldValue + parseInt(editing2);
                updateTotal();

                // Compare totalValue with the budget and update the marquee and display an alert
                budgetValue = parseInt(budget.textContent);
                if (budgetValue < totalValue) {
                    marquee.innerHTML = 'Please manage your budget, your budget is less than your total expense';
                    alert('Check your budget');
                } else {
                    marquee.innerHTML = '';
                }
            }
        }
    }
}


var rotating = document.getElementById('word')
var rotatingParagraph = ["You can add your expenditure here..",
    "You can also delete and edit in your expense chart..",
    "Due to this you can make a plan to manage your budget.."]
var currentIndex = 0

function wordReplacing() {
    rotating.style.opacity = '0'
    rotating.style.transform = 'scale(0.9)'
    setTimeout(() => {
        rotating.textContent = rotatingParagraph[currentIndex]
        rotating.style.opacity = '1'
        rotating.style.transform = 'scale(1)'
        currentIndex++
        if (currentIndex >= rotatingParagraph.length) {
            currentIndex = 0
        }
    }, 1000)
}
wordReplacing();
setInterval(wordReplacing, 5000)

function addName() {
    var para = document.getElementById('welcomePara')
    var getName = localStorage.getItem('Name')
    if (getName == null) {
        para.innerHTML = 'Welcome'
    }
    else {

        para.innerHTML = `Welcome ${getName}`
    }
    para.style.color = ''
}
addName()





// var getTable = document.getElementById('table')
// function AddTable(){
//     var getValue1=document.getElementById('inp')
//     var getValue2=document.getElementById('inp1')
//     var getValue3=document.getElementById('inp2')
//     var createTr= document.createElement('tr')
//     var createTd1= document.createElement('td')
//     var createTd2= document.createElement('td')
//     var createTd3= document.createElement('td')
//     var hideButton = document.createElement('button')
//     var hideButtonText = document.createTextNode("::")
//     hideButton.appendChild(hideButtonText)
//     var buttonDiv = document.createElement('div')
//     buttonDiv.setAttribute('class', 'buttonDiv')
//     var deleteButton = document.createElement('button')
//     var deleteButtonText = document.createTextNode("Delete")
//     deleteButton.setAttribute('class', 'delButton')
//     deleteButton.appendChild(deleteButtonText)
//     var editButton = document.createElement('button')
//     editButton.setAttribute('class', 'editButton')
//     var editButtonText = document.createTextNode("Edit")
//     editButton.appendChild(editButtonText)
//     buttonDiv.appendChild(deleteButton)
//     buttonDiv.appendChild(editButton)
//     hideButton.appendChild(buttonDiv)
//     createTd3.appendChild(hideButton)
//     var td1Text = document.createTextNode(getValue1.value)
//     var td2Text = document.createTextNode(getValue2.value)
//     var budgetValue = getValue3.value
//     createTd1.appendChild(td1Text)
//     createTd2.appendChild(td2Text)
//     createTr.appendChild(createTd1)
//     createTr.appendChild(createTd2)
//     createTr.appendChild(createTd3)
//     getTable.appendChild(createTr)
//     if(getValue1.value==''||getValue2.value==''||getValue3.value==''){
//         alert("Please fill all the fields")
//         createTr.style.display='none'
//     }
//     buttonDiv.style.display = 'none'
//     hideButton.setAttribute('class', 'hide')
//     hideButton.addEventListener('click', function () {
//         var getButtonDiv = createTr.querySelector('.buttonDiv');
//         if (getButtonDiv.style.display == 'none') {
//             setTimeout(() => {
//                 getButtonDiv.style.transition = '0 0.2s ease'
//                 getButtonDiv.style.display = 'block'
//                 hideButton.style.backgroundColor = 'silver';
//                 hideButton.style.color = 'black'
//             }, 500)
//         }
//         else {
//             getButtonDiv.style.display = 'none'
//             hideButton.style.backgroundColor = 'black';
//             hideButton.style.color = 'white'

//         }

//     })
//     deleteButton.setAttribute("onclick", 'deleted(this)')
//     editButton.setAttribute('onclick', 'edit(this)')

//     getValue1.value = ''
//     getValue2.value=''
// }



// CRUD :Create,Read,edit(update) ,delete,deleteAll
// var image = document.createElement('img');  // Define the image element
// image.src = 'your_image_url_here.png';  // Set the image source
// image.alt = 'Image Alt Text';  // Set the alt text for accessibility
// li.appendChild(image);  // Append the image to the li element
// getAttribute = to get the attribute
// hasAttribute = to check having attribute or not
// setAttribute(attribute name, value) = to set attribute
// .appendChild(Element): merged with parent element
// .createTextNode: create the text portion
// .parentNode : to get parent
// .firstChild: to get first child of parent
// .nodeValue: value 
