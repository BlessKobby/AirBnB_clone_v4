// This script shall listen for chamges when DOM loaded
$(document).ready(function () {
  const lst = [];
  $('input:checkbox').change(function () {
    if ($(this).is(':checked')) {
      lst.push($(this).attr('data-name'));
    } else {
      const ind = lst.indexOf($(this).attr('data-name'));
      lst.splice(ind, 1);
    }
    $('div#api_list').text(lst.join(', '));
  });
});
