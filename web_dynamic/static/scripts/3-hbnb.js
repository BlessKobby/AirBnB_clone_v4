//this script shall listen for changes
$(document).ready(function () {
  const lst = {};
  const $checkamenit = $('input[type=checkbox]');
  const $amenitSelect = $('div.amenities h4');
  const $apiStatus = $('div#api_status');
  const statUrl = 'http://localhost:5001/api/v1/status/';
  const placesUrl = 'http://localhost:5001/api/v1/places_search/';
  const $plces = $('section.places');

  function gstMax (guests) {
    if (guests !== 1) {
      return `<div class="max_guest">${guests} Guests</div>`;
    }

    return `<div class="max_guest">${guests} Guest</div>`;
  }

  function roomMk (rooms) {
    if (rooms !== 1) {
      return `<div class="number_rooms">${rooms} Bedrooms</div>`;
    }

    return `<div class="number_rooms">${rooms} Bedrooms</div>`; 
  }

  function bathMk (bathrooms) {
    if (bathrooms !== 1) {
      return `<div class="number_bathrooms">${bathrooms} Bathrooms</div>`;
    }

    return `<div class="number_bathrooms">${bathrooms} Bathroom</div>`;
  }

  function placeMk (place) {
    return `<article>
      <div class="title_box">
        <h2>${place.name}</h2>
        <div class="price_by_night">$${place.price_by_night}</div>
      </div>
      ${gstMax(place.max_guest)}
      ${roomMk(place.number_rooms)}
      ${bathMk(place.number_bathrooms)}
    </article>`;
  }

  function articleInfo (guests, rooms, bathrooms) {
    return `<div class="title_box">
      <h2>${place.name}</h2>
      <div class="price_by_night">$${place.price_by_night}</div>
    </div>
    ${gstMax(guests)}
    ${roomMk(rooms)}
    ${bathMk(bathrooms)}`;
  }

  function articleTitre (titre, prix) {
    return `<div class="title_box">
      <h2>${titre}</h2>
      <div class="price_by_night">$${prix}</div>
    </div>`;
  }

  function articleDisc (description) {
    return `<div class="information">
      <div class="max_guest">${description}</div>
    </div>`;
  }

  $checkamenit.change(function () {
    if ($(this).is(':checked')) {
      lst[$(this).data('id')] = $(this).data('name');
      $amenitSelect.text(Object.values(lst).join(', '));
    } else {
      delete lst[$(this).data('id')];
      $amenitSelect.text(Object.values(lst).join(', '));
    }
  });

  $.ajax({
    url: statUrl,
    type: 'GET',
    dataType: 'json',
    success: function (data) {
      if (data.status === 'OK') {
        $apiStatus.addClass('available');
      } else {
        $apiStatus.removeClass('available');
        $apiStatus.addClass('unavailable');
      }
    }
  });

  $.ajax({
    url: placesUrl,
    type: 'POST',
    contentType: 'application/json',
    data: '{}',
    dataType: 'json',
    success: function (data) {
      for (const place of data) {
        $plces.append(placeMk(place));
      }
    }
  });
});
