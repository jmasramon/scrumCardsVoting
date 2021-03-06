(function(){
  'use strict';

  var colours = ['rgba(242, 29, 67, 0.2)','rgba(255, 171, 60, 0.2)','rgba(196, 214, 74, 0.2)','rgba(0, 177, 113, 0.2)','rgba(25, 187, 174, 0.2)'];
  var socket = io();
  var user = '';
  var room = '';
  var user_has_voted = false;
  var vote = 0;

  $(document).ready(function(){
    $("#storyChooshing").hide();
    $("#voting").hide();

    $('#loginButton').on('click', function(){
      socket.emit('login message', {name: $('#inputName').val() });
    });

    socket.on('authorized message', function(){
      user = $('#inputName').val();
      $('#subTitle').text($('#subTitle').text() + ', Mr/Ms ' + user + '.' );
      $("#userLogin").hide();
      socket.emit('give me available stories');
    });

    socket.on('available stories', function(stories){
      createStoryList(stories);
      $('button.list-group-item').on('click', function (){
        enterTheStoryRoom(this);
      });
      $("#storyChooshing").show();
    });

    function createStoryList(stories){
      stories.forEach(function(story) {
        $("#stories_list").append('<button type="button" id="'+ story.name +'" class="list-group-item">'+ story.name +': '+ story.description +'</button>');
      });
    }

    function enterTheStoryRoom(clicked_story) {
      $("#storyChooshing").hide();
      $("#voting").show();
      room = $(clicked_story).attr('id');
      socket.emit('join room', room);
    }

    socket.on('welcome to room', function(room){
      console.log('room ' + room + ' joined');
      // TODO: show room name in title
      $('#subTitle').text($('#subTitle').text() + ' You are now voting for  ' + room );
    });

    socket.on('vote message', function(votes){
      resetChart(votes);
    });

    function resetChart(votes) {
      var dataset = votingResultsChart.datasets[0];
      var highestBar;

      resetBars(dataset, votes);
      highestBar = getHighestBar(dataset,votes);
      dataset.bars[highestBar].fillColor = strongColour(highestBar);

      votingResultsChart.update();
    }

    function resetBars(dataset, votes){
      for(var key in votes) {
        var currentBar = dataset.bars[key-1];

        currentBar.fillColor = colours[key-1];
        currentBar.value = votes[key];

      }
    }

    function getHighestBar(dataset, votes) {
      var highestBar = 0;
      for(var key in votes) {
        var currentBar = dataset.bars[key-1];
        if (currentBar.value > dataset.bars[highestBar].value){
          highestBar = key-1;
        }
      }
      return highestBar;
    }

    function strongColour(bar) {
      return colours[bar].replace('0.2', '1');
    }


    $('div.card').on('click', function (){
      var mes = {room: room, voterName: user, votedCardNumber: $(this).attr('id').slice(-1)};

      if (!user_has_voted) {
        socket.emit('vote message', mes);
      } else {
        mes.oldVote = vote;
        socket.emit('update message', mes);
      }
      user_has_voted = true;
      vote = mes.votedCardNumber;
    });
  });

  var ctx = document.getElementById("votingResults").getContext("2d");
  var data = {
    labels: ["1 h", "2 h", "4 h", "1 d", "1 w"],
    datasets: [
        {
            label: "Voting results",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [0, 0, 0, 0, 0]
        },
    ]
  };
  var options = {
    scaleShowGridLines : true,
    scaleGridLineColor : "rgba(0,0,0,.05)",
    scaleGridLineWidth : 1,
  };
  var votingResultsChart = new Chart(ctx).Bar(data, options);
})();
