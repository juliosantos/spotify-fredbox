require([
  '$api/models',
], function(models) {
  'use strict';

  window.popTopTrack = function () {
    return $.getJSON( "http://fredbox.meteor.com/api/popTopTrack", null, function (response) {
      console.log(response.name);
      models.player.playTrack(models.Track.fromURI(response.href));
    });
  };

  $( document ).ready( function () {
    var $button = $( "button" );
    $button.click( function (event) {
      event.preventDefault();
      $button.button( "loading" );
      popTopTrack().then( function () {
        $button.slideUp();
      });
    });

    models.player.addEventListener('change', function(event) {
      if (event.data.playing === false) {
        popTopTrack();
      }
    });
  });
});
