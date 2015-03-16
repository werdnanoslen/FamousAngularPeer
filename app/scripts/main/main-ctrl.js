'use strict';

angular.module('famousAngularStarter')

.controller('DraggableCtrl', function ($scope, $famous) {
    var EventHandler = $famous['famous/core/EventHandler'];

    // Compatibility shim
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

    // PeerJS object
    var peer = new Peer({ key: '', debug: 3});

    peer.on('open', function(){
        $scope.yourId = peer.id;
        $scope.$apply();
    });

    // Receiving a call
    peer.on('call', function(call){
        // Answer the call automatically (instead of prompting user) for demo purposes
        call.answer(window.localStream);
        step3(call);
    });
    peer.on('error', function(err){
        alert(err.message);
        // Return to step 2 if error occurs
        step2();
    });

    // Click handlers setup
    $scope.makeCall = function(){
        // Initiate a call!
        var call = peer.call($scope.calltoId, window.localStream);
        step3(call);
    }

    $scope.endCall = function(){
        window.existingCall.close();
        step2();
    }

    // Get things started
    step1();

    function step1 () {
        // Get audio/video stream
        navigator.getUserMedia({audio: true, video: true}, function(stream){
            // Set your video displays
            $('#my-video').prop('src', URL.createObjectURL(stream));
            window.localStream = stream;
            step2();
        }, function(e){
            console.err(e);
        });
    }

    function step2 () {
      $('#step3').hide();
      $('#step2').show();
    }

    function step3 (call) {
        console.log('calling: ', call);
      // Hang up on an existing call if present
      if (window.existingCall) {
          console.log('closing existing call');
          window.existingCall.close();
      }

      // Wait for stream on the call, then set peer video display
      call.on('stream', function(stream){
          console.log('streaming: ', stream);
        $('#their-video').prop('src', URL.createObjectURL(stream));
      });

      // UI stuff
      window.existingCall = call;
      $scope.theirId = call.peer;
      $scope.$apply();
      call.on('close', step2);
      $('#step2').hide();
      $('#step3').show();
    }


    var data = [];
    data.push( {id: 0, name: 'zero', position: [100, 100], handler: new EventHandler() } );
    data.push( {id: 1, name: 'one',  position: [1100, 200], handler: new EventHandler() } );
    data.push( {id: 2, name: 'two',  position: [600, 300], handler: new EventHandler() } );

    $scope.nodes = data;
    console.log($scope.nodes);
});
