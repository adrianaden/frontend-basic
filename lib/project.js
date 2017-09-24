$(document).ready(function() {
  // events
  $('#submit-comment').on('click', function() {
    var comment = $('#input-comment').val();
    if (comment.length < 3) {
      alert('Please input min 3 characters')
    } else {
      $('#comment').append(`<p>${comment}</p><hr>`)
      $('#input-comment').val('');
    }
  });
  $('#show-more').click(function() {
    $('#profile-additional').toggle();
    if ($('#profile-additional').is(":visible")) {
      $('#show-more').text('show less')
    } else {
      $('#show-more').text('show more')
    }
  });

  //objects
  var profile = {
    name: 'Adrian Adendrata',
    summary: 'Hello my name is ' + name + ' but you can call me Aden. I\'m working at Fin-Tech Company in Indonesia as Fullstack Software Engginer. Now, i focus on learing HTML + JavaScript with Hacktiv8',
    skills: 'Java, Java Script, C#, PHP, HTML, Groovy, TypeScript',
    hobbies: 'Programming, Photography',
    favorites: 'Youtube, Facebook, Detik, Stackoverflow',
  }

  $('#profile-additional').toggle();
  loadProfile(profile);
  loadFriends(friends)

  // functions
  function loadProfile(profile) {
    $("#profile-name").text(profile.name)
    $("#profile-summary").text(profile.summary)
    var injector = '';
    var skills = profile.skills.split(',');
    skills.forEach((skill) => $("#profile-skills").append(`<button type="button" class="btn btn-info" style="margin-left:5px">${skill}</button>`))

    var hobbies = profile.hobbies.split(',');
    hobbies.forEach((hobby) => $("#profile-hobbies").append(`<button type="button" class="btn btn-info" style="margin-left:5px">${hobby}</button>`))

    var favorites = profile.favorites.split(',');
    favorites.forEach((favorite) => $("#profile-favorites").append(`<button type="button" class="btn btn-info" style="margin-left:5px">${favorite}</button>`))

    $('.profile-picture').attr('src', 'assets/picture/profile-picture.png')
    $('.cover-photo').css({
      'background-image': 'url("https://timdorr.com/press/wp-content/uploads/2016/01/Code_feat.jpg")'
    })
  }

  function loadFriends(friends) {
    $.ajax({
      url: 'https://randomuser.me/api?results=5',
      dataType: 'json',
      beforeSend: function() {
        $('#friends').html('<div class="loader"></div>')
      },
      success: function(data) {
        $('#friends').html('')
        var results = data.results;
        results.forEach((result) => {
          var picture = result.picture.medium;
          var fullName = result.name.first + ' ' + result.name.last;
          var location = result.location.street + ', ' + result.location.city + ', ' + result.location.state
          var injector = `
          <div class="media">
            <div class="media-left">
              <a href="#">
                  <img class="media-object" src="${picture}" alt="friend picture not found">
                </a>
            </div>
            <div class="media-body">
              <h4 class="media-heading">${fullName}</h4> ${location}
            </div>
          </div>
          `
          $('#friends').append(injector)
        });
      },
      complete: function() {
        console.log('complete');
      }
    });
  };
})
