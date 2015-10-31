//Setting an Angular module: 
angular.module ('driveway',[])

		var center1;
		var map;
    var lat;
    var lng;



		function initMap() {
    			// var CO = new google.maps.LatLng(40.018005,-105.278430);
    			var mapOptions = {
        			zoom: 14,
        			center: new google.maps.LatLng(40.018005,-105.278430),
    			}

   				map = new google.maps.Map(document.getElementById('map'),mapOptions);

  				// document.getElementById('submit').addEventListener('click', function() {
    			// 	geocodeAddress(geocoder, map);
  				// 	});	
    		function calculateCenter() {
  					center1 = map.getCenter();
				}
			google.maps.event.addDomListener(map, 'idle', function() {
  				calculateCenter();
				});
			google.maps.event.addDomListener(window, 'resize', function() {
  				map.setCenter(center1);
				});
		}		

		var drivewayControllerFunc = function ($scope, $http) {
		$scope.showmap = true;

    
		var clickedMarkerTitle = {};

		$scope.showAddressForm = function () {
			$scope.showaddressform = true;
			$scope.showmap = false;
			$scope.street = "";
			$scope.city = "";
			$scope.state = "";
			$scope.zip = "";
			$scope.time1 = "";
      $scope.time2 = "";
      $scope.date = "";
		}

    $scope.Submit = function () {

      $scope.showaddressform = false;
      $scope.showmap = true;
      var parkimage = 'curbtopark.png';
      var caricon = 'blackcar.png';
      $scope.address = $scope.street + " " + $scope.city + " " + $scope.state + " " + $scope.zip;

      var ownerobj = {address: $scope.address, startTime: $scope.time1, endTime: $scope.time2, date: $scope.date};

      $http.post('/api/owner', ownerobj)
                .then(function(returnData){
                  console.log(returnData.data);

      })
    }


		$scope.addOwner = function () {

      // $http.get('/api/me')
      // .then(function(returnData){
      //   $scope.userid = returnData.data.googleId
      //   console.log($scope.userid);
      // })


                
               

      $http.get('/api/address')
                .then(function(returnData){
                  $scope.address = returnData.data[0].address;
                // });

			var geocoder = new google.maps.Geocoder();
				function geocodeAddress(geocoder, resultsMap) {
  				var address = $scope.address;
  				geocoder.geocode({'address': address}, function(results, status) {
    			if (status === google.maps.GeocoderStatus.OK) {
      				resultsMap.setCenter(results[0].geometry.location);
              console.log(results[0].geometry.location);

              // var lat = results[0].geometry.location.lat();
              // var lng = results[0].geometry.location.lng();

              // var llobj = {lat: lat, lng: lng};
              // 
              

               


               

      				var marker = new google.maps.Marker({
        				map: resultsMap,
        				position: results[0].geometry.location,
                //position: new google.maps.LatLng(lat, lng),
        				title: $scope.street,
        				icon: caricon,
        				times: $scope.time1 + "-" + $scope.time2


      				})

      		var contentString = '<div id="content">'+
      			'<div id="siteNotice">'+
      			'</div>'+
      			'<div id="bodyContent">' + 
      			'<p><b>' + marker.title + '</b><br>' +
      			'Available: ' + marker.times + '</p>'+
      			'<img src="curbtopark.png"'+
      			'</div>'+
      			'</div>';


  			var infowindow = new google.maps.InfoWindow({
    				content: contentString,
    				maxWidth: 200
  						});



				google.maps.event.addListener(marker, 'click', function(event) {
        		 		// marker.setMap(null);
        			clickedMarkerTitle = marker;

    			});	

        		document.getElementById('parkhere').addEventListener('click', function() {
    				// marker.setMap(null);
    				clickedMarkerTitle.setMap(null); 			
    			});
    						
    			google.maps.event.addListener(marker, 'click', function(event) {
       		 		infowindow.open(map, marker);
    			});


    			} else {
      				alert('Geocode was not successful for the following reason: ' + status);
    					}
  				});
		
		
		}


			
        geocodeAddress(geocoder, map);

// closes the address get
});
// closes the owner post
// });


      $scope.street = "";
      $scope.city = "";
      $scope.state = "";
      $scope.zip = "";
      $scope.time1 = "";
      $scope.time2 = "";
      $scope.date = "";
// closes the addOwner function
}

}



//Registering the controller: mainController
angular.module('driveway').controller('drivewayController',['$scope', '$http', drivewayControllerFunc])