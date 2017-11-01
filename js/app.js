(function() {
  'use strict';

  var app = {
    isLoading: true,
    container: document.querySelector('.container')
  };

  // BEGIN event listeners for UI elements
  document.getElementById('btnAddTea').addEventListener('click', function() {
    // Open/show the add new tea dialog
    app.toggleAddDialog(true);
  });

  // TODO: Replace btnAddTea here with the proper ID (once it exists)
  document.getElementById('btnAddTea').addEventListener('click', function() {
    // Add the newly selected tea
    var select = document.getElementById('selectTeaToAdd');
    var selected = select.options[select.selectedIndex];
    var key = selected.value;
    var label = selected.textContent;
    if (!app.selectedTeas) {
      app.selectedTeas = [];
    }
    app.getTeaDefaultTime(key, label);
    app.saveSelectedTea();
    app.toggleAddDialog(false);
  });

  // TODO: Add listener for cancelling tea add


  document.getElementById('btnColors').addEventListener('click', function() {
    // toggle colors between dark and light
    app.toggleColors(true);
  });

  document.getElementById('btnSound').addEventListener('click', function() {
    // toggle sound between on and off
    app.toggleSound(true);
  });

  document.getElementById('btnSubtractTime').addEventListener('click', function() {
    // subtract time from timer
    app.subtractTime();
  });

  document.getElementById('btnAddTime').addEventListener('click', function() {
    // add time to timer
    app.addTime();
  });

  // TODO: add btnStart
  document.getElementById('btnStart').addEventListener('click', function() {
    // start timer countdown
    app.startTimer();
  });

  document.getElementById('btnReset').addEventListener('click', function() {
    // reset the timer to the tea's default time
    app.resetTimer();
  });

  // buttons for switching selected teas
  document.getElementById('btnSelectedTea[i]').addEventListener('click', function() {
    // change which tea timer is shown
    var clickedTea = i;
    app.switchSelectedTea(clickedTea);
  });
  // END event listeners for UI elements


  // BEGIN functions for updating the UI
  // Toggles the visibility of the add new tea dialog
  app.toggleAddDialog = function(visible) {
    if (visible) {
      app.addDialog.classList.add('dialog-container--visible');
    } else {
      app.addDialog.classList.remove('dialog-container--visible');
    }
  };

  app.addTea = function(teaColor) {
    // TODO: write addTea code
  };

  app.toggleColors = function(colorsOn) {
    if (colorsOn) {
      // TODO: add code for turning colors on
    } else {
      // TODO: add code for turning colors off
    }
  };

  app.toggleSound = function(soundOn) {
    if (soundOn) {
      // TODO: add code for turning sound on
    } else {
      // TODO: add code for turning sound off
    }
  };

  app.subtractTime = function() {
    // TODO: write subtractTime function
  };

  app.addTime = function() {
    // TODO: write addTime function
  };

  app.startTimer = function() {
    // TODO: write startTimer (countdown) function
  };

  app.resetTimer = function() {
    // TODO: write resetTimer function
  };
  
  app.switchSelectedTea = function(clickedTea) {

  }
  // END functions for updating the UI


  // register service worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('./service-worker.js')
             .then(function() { console.log('Service Worker Registered'); });
  }

})();