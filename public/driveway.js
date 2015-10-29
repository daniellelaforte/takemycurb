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
		}

//     $scope.markerPlacer = function () {
//       $http.get('/putmarkers')
//         .then(function(returnData){
//           console.log("))))", returnData.data[0].geoAddress);
//           lat = returnData.data[0].geoAddress.lat;
//           lng = returnData.data[0].geoAddress.lng;
//            });

//         $scope.street = "5717 Arapahoe";
//         $scope.city = "Boulder";
//         $scope.state = "CO";
//         $scope.zip = "80303";


//         var geocoder = new google.maps.Geocoder();
//         function geocodeAddress(geocoder, resultsMap) {
//           $scope.address = $scope.street + " " + $scope.city + " " + $scope.state + " " + $scope.zip;
//           var address = $scope.address;
//           geocoder.geocode({'address': address}, function(results, status) {
//           if (status === google.maps.GeocoderStatus.OK) {
//               resultsMap.setCenter(results[0].geometry.location);
//               console.log("***", results[0].geometry.location);
                
             

//               var marker = new google.maps.Marker({
//                 map: resultsMap,
//                 position: results[0].geometry.location,
//                 // position: new google.maps.LatLng(lat, lng),
//                 title: $scope.street,
//                 icon: image,
//                 times: $scope.time1
//               })

//           var contentString = '<div id="content">'+
//             '<div id="siteNotice">'+
//             '</div>'+
//             '<div id="bodyContent">' + 
//             '<p><b>' + marker.title + '</b><br>' +
//             'Available: ' + marker.times + '</p>'+
//             '<img src="curbtopark.png"'+
//             '</div>'+
//             '</div>';


//         var infowindow = new google.maps.InfoWindow({
//             content: contentString,
//             maxWidth: 200
//               });



//         google.maps.event.addListener(marker, 'click', function(event) {
//                 // marker.setMap(null);
//               clickedMarkerTitle = marker;

//           }); 

//             document.getElementById('parkhere').addEventListener('click', function() {
//             clickedMarkerTitle.setMap(null);      
//           });
                
//           google.maps.event.addListener(marker, 'click', function(event) {
//               infowindow.open(map, marker);
//           });


//           } else {
//               alert('Geocode was not successful for the following reason: ' + status);
//               }
//           });
    
    
//     }


      
//         geocodeAddress(geocoder, map);



// };















    
   
      

    // $scope.markerPlacer();


		$scope.Submit = function () {

      $http.get('/api/me')
      .then(function(returnData){
        $scope.userid = returnData.data.googleId
        console.log($scope.userid);
      })


			$scope.showaddressform = false;
			$scope.showmap = true;
			var parkimage = 'curbtopark.png';
			var image = 'blackcar.png';
			$scope.address = $scope.street + " " + $scope.city + " " + $scope.state + " " + $scope.zip;

      $http.get('/api/address')
                .then(function(returnData){
                  $scope.address = returnData.data[1].address;
                // });

			var geocoder = new google.maps.Geocoder();
				function geocodeAddress(geocoder, resultsMap) {
  				var address = $scope.address;
  				geocoder.geocode({'address': address}, function(results, status) {
    			if (status === google.maps.GeocoderStatus.OK) {
      				resultsMap.setCenter(results[0].geometry.location);
              console.log(results[0].geometry.location);

              var lat = results[0].geometry.location.lat();
              var lng = results[0].geometry.location.lng();

              // var llobj = {lat: lat, lng: lng};
              // 
              

               // $http.post('/api/geo', llobj)
               //  .then(function(returnData){
               //    console.log(returnData.data.lat, returnData.data.lng);
                
               //  });


               

      				var marker = new google.maps.Marker({
        				map: resultsMap,
        				position: results[0].geometry.location,
                //position: new google.maps.LatLng(lat, lng),
        				title: $scope.street,
        				icon: image,
        				times: $scope.time1


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

// I put it here
});

}

}



//Registering the controller: mainController
angular.module('driveway').controller('drivewayController',['$scope', '$http', drivewayControllerFunc])