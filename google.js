var input = document.getElementById('userplace');
var options = {
    // componentRestrictions: {        
    //     country: "us"    
    // }
};

// Create the autocomplete object, restricting the search
// to geographical location types.
var autocomplete = new google.maps.places.Autocomplete(input, options);

// When the user selects an address from the dropdown,
// populate the address fields in the form.
google.maps.event.addListener(autocomplete, "place_changed", function() {

    var place = autocomplete.getPlace()            
    var country;

    //Test to see which country it is
    for (var i = 0; i < place.address_components.length; i++) {
        var typesArray = place.address_components[i].types;
        if (typesArray.indexOf("country") > -1) {
            country = place.address_components[i].long_name;
        }
    }

    //If US, use city/state, if not, use city/country.
    if (country == "United States") {
        var newLocation = place.address_components[0].long_name + ', ' + place.address_components[2].long_name;         
        $('#userplace').val(newLocation);
    } else {
        var newLocation = place.address_components[0].long_name + ', ' + country;
        $('#userplace').val(newLocation);
    }




});