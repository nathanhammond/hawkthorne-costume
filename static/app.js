$(document).ready(function() {
  var baseUrl = 'https://github.com/kyleconroy/hawkthorne-journey/raw/master/src/images/';

  function updateUrl() {
    if (window.history && history.pushState) {
      var character = $("#character").val();
      var costume = $("#url").val();

      var data = ({
        character: character,
        costume: costume
      })

      var url = "/" + character;

      if (costume) {
        url = url + "/" + encodeURIComponent(costume);
      }

      history.replaceState(data, window.title, url);
    }
  }

  function updateCostume(url) {
    if (url) {
      $("#newhotness").show();
      $("#oldbusted").hide();
      $("#newhotness").attr('src', url);
    } else {
      $("#newhotness").attr('src', '');
      $("#newhotness").hide();
      $("#oldbusted").show();
    }
  }

  function updateOriginal(character) {
    var imgUrl = baseUrl + character + ".png";
    $("#oldbusted").attr('src', imgUrl);
  }


  $('#character').change(function(e) { 
    updateOriginal($(this).val());
    updateUrl();
  });

  $('#toolbar .description').click(function(e) {
    e.preventDefault();
    $('.spritesheet').toggle();
  });

  $('#toolbar .costume').click(function(e) { 
    e.preventDefault();
    $("#newhotness").toggle();
    $("#oldbusted").toggle();
  });

  var bgtoggle = 0;

  $('#toolbar .bg').click(function(e) { 
    e.preventDefault();
    bgtoggle++;
    $("#artboard").css('background', bgtoggle % 2 ? '#34c429' : '');
  });


  $('#costume').submit(function(e) { 
    e.preventDefault();
  })

  $('#url').on('change', function(e) {
    updateCostume($(this).val());
    updateUrl();
  });

  window.onpopstate = function(event) {  
    if (event.state) {
      $("#url").val(event.state.costume);
      $("#character").val(event.state.character);

      updateCostume(event.state.costume);
      updateOriginal(event.state.character);
    }

  }; 
});


var sprites = {
  left: [
    {name: 'idle', count: 1, description: 'The character while standing still.'},
    {name: 'profile', count: 1, description: 'The character in perfect profile.'},
    {count:1},
    {name: 'walk', count: 3, description: 'The character while walking.'},
    {name: 'talk', count: 3, description: 'The character while talking.'},
    {name: 'jump', count: 3, description: 'The character while jumping.'},
    {name: 'drag', count: 3, description: 'The character while dragging.'},
    {name: 'push', count: 3, description: 'The character while pushing.'},
    {name: 'punch low', count: 1, description: 'The character punching low.'},
    {name: 'walk punch low', count: 3, description: 'The character walking while low punching.'},
    {count:1},
    {name: 'punch center', count: 1, description: 'The character punching center.'},
    {name: 'walk punch center', count: 3, description: 'The character walking while center punching.'},
    {name: 'punch high', count: 1, description: 'The character punching high.'},
    {name: 'walk punch high', count: 3, description: 'The character walking while high punching.'},
    {count:1},
    {name: 'kick', count: 1, description: 'The character kicking.'},
    {name: 'slide kick', count: 1, description: 'The character slide kicking.'},
    {name: 'jump kick', count: 1, description: 'The character jump kicking.'},
    {count:1},
    {name: 'crouch', count: 1, description: 'The character crouching.'},
    {name: 'dig', count: 1, description: 'The character with both hands on the ground.'},
    {name: 'acquire', count: 1, description: 'The character looking up with arms out to both sides at 45º.'},
    {name: 'look down', count: 1, description: 'The character looking down.'},
    {name: 'look up', count: 1, description: 'The character looking up.'},
    {count:1},
    {name: 'take damage', count: 2, description: 'The character taking damage.'},
    {name: 'dead', count: 1, description: 'The character dead.'},
    {name: 'lift', count: 3, description: 'The character lifting an item above their head arms to one side at: -45º, 45º, 90º. Ends in "carry" state.'},
    {name: 'walk carry', count: 3, description: 'The character carrying a lifted item.'},
    {count:3},
  ],
  holding: [
    {name: 'idle', count: 1, description: 'The character standing still while holding an item.'},
    {name: 'look up', count: 1, description: 'The character looking up while holding an item.'},
    {name: 'look down', count: 1, description: 'The character looking up while holding an item.'},
    {name: 'take damage', count: 2, description: 'The character taking damage while holding an item.'},
    {count:4},
    {name: 'walk', count: 3, description: 'The character walking while holding an item.'},
    {name: 'talk', count: 3, description: 'The character talking while holding an item.'},
    {name: 'jump', count: 3, description: 'The character jumping while holding an item.'},
    {name: 'attack one', count: 3, description: 'The character performing the primary attack with the item.'},
    {name: 'attack two', count: 3, description: 'The character performing the secondary attack with the item.'},
    {name: 'attack three', count: 3, description: 'The character performing the tertiary attack with the item.'}
  ],
  forward: [
    {name: 'idle', count: 1, description: 'The character directly facing the screen.'},
    {name: 'walk', count: 3, description: 'The character walking directly toward the screen.'},
    {name: 'talk', count: 3, description: 'The character talking while directly facing the screen.'},
    {count:2}
  ],
  backward: [
    {name: 'idle', count: 1, description: 'The character facing away from the screen.'},
    {name: 'walk', count: 3, description: 'The character walking directly away the screen.'},
    {count:5}
  ],
  extended: [
    {name: 'custom', count: 18, description: 'Sprites specifically for unique character actions.'}
  ]
};

$(document).ready(function() {
  var buildstring = '';
  var layoutstring = '<tr>'+"\r\n";
  var tempcount = 0;

  for (var x in sprites) {
    if (!sprites.hasOwnProperty(x)) { continue; }

    for (var i = 0; i < sprites[x].length; i++) {
      if (sprites[x][i].name) {
        buildstring += '<tr><td>'+x+'</td><td>'+sprites[x][i].count+'</td><td>'+sprites[x][i].name+'</td><td>'+sprites[x][i].description+'</td></tr>';
      }

      for (var j = 1; j <= sprites[x][i].count; j++) {
        if (sprites[x][i].name) {
          layoutstring += '<td>'+x[0]+'<wbr>_'+sprites[x][i].name.replace(/\W/g,'<wbr>')+'<wbr>_'+j+'</td>'+"\r\n";
        } else {
          layoutstring += '<td></td>'+"\r\n";
        }
        tempcount++;
        if (tempcount % 9 === 0) {
          layoutstring += '</tr>'+"\r\n"+'<tr>'+"\r\n";
        }
      }
    }

  }
  
  layoutstring += '</tr>';
  
  $(buildstring).appendTo('.spritelisting tbody');
  $(layoutstring).appendTo('.spritesheet tbody');
});