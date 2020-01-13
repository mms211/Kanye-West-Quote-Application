//Global Variables
$(document).ready(function () {
  var cuisines = "none";
  $("#cuisineSelect").click(function () {
    cuisines = $(this).val();
  });
  $("#cuisineSelect").click(function () {
    localStorage.value = cuisines
  });
  var apiKey = "apiKey=e62ae879a14347278adb83fabc36f7a1&ip="
  var ipAddress = localStorage.address
  var getLocation = "https://api.ipgeolocation.io/ipgeo?" + apiKey + ipAddress
  var lat = localStorage.latitude
  var lon = localStorage.longitude
  var cuisines = localStorage.value
  var searchButton = $("#srchBtn")

  var leftContainer = $(".leftContainer")

  // $("#foodImg").empty()
  $(".leftContainer").remove()

  //Retrieve IP Address
  $(function getIP() {
    $.getJSON("https://api6.ipify.org?format=jsonp&callback=?",
      function (json) {
        localStorage.address = (json.ip)
      }
    );
  });
  //Getting coordinates based on IP
  $.ajax({
    url: getLocation,
    method: "GET",
    dataType: 'JSON',
  })
    .then(function (response) {
      localStorage.latitude = response.latitude
      localStorage.longitude = response.longitude
      var cityHeader = $("<h1>").html(response.city)
      cityHeader.addClass("cityHeader")
      $(".cityHeadContainer").append(cityHeader)

    });
  (searchButton).on("click", function generateAPI() {
    var cuisines = localStorage.value
    // $(".grid-x.grid-frame").remove(cityHeader)
    $(".cityHeadContainer").remove()
    $(".float-left").append(leftContainer)
    function loaderTimeout() {
      setTimeout(function(){ $(".loader").remove(); }, 1000);
    }
    loaderTimeout()

    $.ajax({
      type: 'GET',
      dataType: 'json',
      beforeSend: function (response) {
        response.setRequestHeader('user-key', '736fc2557bb7bf4c8f77bc93b98b55f0');
      },
      url: "https://developers.zomato.com/api/v2.1/search?lat=" + lat + "&lon=" + lon + "&cuisines=" + cuisines,
      success: function (response) {
        var res = response.restaurants[Math.floor(Math.random() * 19)]
        var data = {}
        data.name = res.restaurant.name
        data.location = res.restaurant.location.address
        data.avgCost = res.restaurant.average_cost_for_two
        data.number = res.restaurant.phone_numbers
        data.img = res.restaurant.featured_image
        displayRes(data)
      },
      error: function (response) {
        alert("City Name Valid")
      }
    });
  });
  function displayRes(data) {
    $("#name").html(data.name)
    $("#address").html("Address: " + data.location)
    $("#address").attr("href", "https://www.google.com/search?q=" + data.location + " " + data.name)
    $("#avgCost").html("Average cost for two people: $" + data.avgCost)
    $("#number").html(data.number)
    // var dataImg = 
    $("#foodImg").attr("src",data.img)
    // $(".float-left").append(dataImg)


  }
});
