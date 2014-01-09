require([
  '$api/models',
], function(models) {
  'use strict';

  var playlistUrl;

  var popTopTrack = function () {
    return $.getJSON( playlistUrl + "/api/popTopTrack", null, function (response) {
      models.player.playTrack(models.Track.fromURI(response.href));
    });
  };

  $( document ).ready( function () {
    var $button = $( "button" );
    $button.click( function (event) {
      event.preventDefault();
      $button.button( "loading" );
      playlistUrl = "http://" + $( "input" ).val() + ".meteor.com";
      popTopTrack().then( function () {
        $( "form" ).slideUp();
      });
    });

    models.player.addEventListener('change', function(event) {
      if (event.data.playing === false) {
        popTopTrack();
      }
    });
  });
});
