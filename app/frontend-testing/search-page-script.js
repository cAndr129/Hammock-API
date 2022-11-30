const propertyDisplay = document.querySelector("property-display")
const searchButton = document.querySelector(".search-btn")

const searchInputLocation = document.getElementById("text-input-location");
const searchInputStartDate = document.getElementById("start-date");
const searchInputEndDate = document.getElementById("end-date");
const searchInputGuests = document.getElementById("guests");

var createLineItem = function (item) {
    return '<div>' + item.firstName + ' ' + item.lastName + '</div>';
}

$(searchButton).click(function () {
    event.preventDefault();

    let inputLocation = searchInputLocation.value;
    let inputStartDate = searchInputStartDate.value;
    let inputEndDate = searchInputEndDate.value;
    let inputGuests = searchInputGuests.value;

    console.log("search button clicked!");

    fetchSearchResults()
        .then(response => {
            console.log("Fetching search results for " + inputLocation);
        });
    async function fetchSearchResults() {
        const response = await fetch('http://localhost:8080/api/properties' + "?location=" + inputLocation);
    }

    localStorage.setItem('location', inputLocation);
    localStorage.setItem('start-date', inputStartDate);
    localStorage.setItem('end-date', inputEndDate);
    localStorage.setItem('guests', inputGuests);

    /*$("#search-form").validate({
        rules: {
            "text-input-location": {
                required: true
            },
            "start-date": {
                required: true
            },
            messages: {
                "text-input-location": "This field is required",
                "start-date": "This field is required",
            }
        }
    });*/

    if(inputLocation === "") {
        document.getElementById("form-location").style.borderColor = "#eb4034";
        document.getElementById("form-location").style.borderWidth = "2px";
        alert("Location cannot be empty");
    }

    else if (dateCompare(inputEndDate, inputStartDate)) {
        console.log("Dates are incorrect")
        document.getElementById("form-dates").style.borderColor = "#eb4034";
        document.getElementById("form-dates").style.borderWidth = "2px";
        alert("Date range must be valid");
    }
    else {
        window.location.href = 'results-page.html';
    }





    /*$.ajax(
    {
        type: "GET",
        url: 'http://localhost:8080/api/properties' + "?location=" + inputLocation,
        dataType: "json",
        success: function(result) {

        },
        error: function(x, e) {
        }
    });*/

    /*fetch('http://localhost:8080/api/properties' + "?location=" + inputLocation)
        //.then(response => response)
        .then( response => {
            console.log(response.json());
        });*/

    //console.log(fetch('http://localhost:8080/api/properties' + "?location=" + inputLocation))



    /*fetch('http://localhost:8080/api/properties')
    .then(data => {
        data.forEach(property => {
            const title = `<h3>` + property.title + `</h3>` //or is it property.id?
            propertyDisplay.insertAdjacentElement("beforeend", title)
        })
  })*/



})

function dateCompare(date1, date2){
    return new Date(date2) > new Date(date1);
}

/*$(document).ready(function () {
    $(searchButton).click(function () {

        console.log("search button clicked");

        $.ajax({
            url: "http://localhost:8080/api/properties", success: function (result) {
                debugger;
                var listOfItems = '';

                for (var x = 0; x < result.length; x++) {
                    listOfItems += createLineItem(result[x]);
                }

                $('#div1').html(listOfItems);
            }
        });
    });
});*/

/*searchButton.addEventListener('click', ()=> {
    //console.log("search button clicked")

    fetch('http://localhost:8080/api/properties')
        .then(data => {
            data.forEach(property => {
                const title = `<h3>` + property.title + `</h3>` //or is it property.id?
                propertyDisplay.insertAdjacentElement("beforeend", title)
            })
      })
});*/

