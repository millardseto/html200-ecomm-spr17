$q(function() {   // fire event when iframe is ready
  $q('#testframe').on('load', function() {
        // Get the jQuery Object from the original code
        $ = window.frames[0].jQuery;
    });
});
