// This script shall listen for chamges when DOM loaded
$(document).ready(function () {
  const lst = {};
  const $checkamenit = $('input[type=checkbox]');
  const $amenitSelect = $('div.amenities h4');
  const $apiStatus = $('div#api_status');
  const statUrl = 'http://localhost:5001/api/v1/status/';

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
});
