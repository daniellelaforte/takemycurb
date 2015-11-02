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

    initMap();
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

		}

    $scope.Submit = function () {

      $scope.showaddressform = false;
      $scope.showmap = true;
     
      $scope.address = $scope.street + " " + $scope.city + " " + $scope.state + " " + $scope.zip;
      $scope.startit = new Date(Number($scope.year), Number($scope.month) - 1, Number($scope.day), Number($scope.time1)).getTime();
      $scope.stopit =  new Date(Number($scope.year), Number($scope.month) - 1, Number($scope.day), Number($scope.time2)).getTime();

      var ownerobj = {address: $scope.address, startTime: $scope.startit, endTime: $scope.stopit};

      $http.post('/api/owner', ownerobj)
                .then(function(returnData){
                  console.log(returnData.data);

      })
    }





		$scope.addMarker = function (arg) {

        
         var parkimage = 'curbtopark.png';
         var caricon = 'blackcar.png';

      // $http.get('/api/me')
      // .then(function(returnData){
      //   $scope.userid = returnData.data.googleId
      //   console.log($scope.userid);
      // })


                
               

                // });

			  var geocoder = new google.maps.Geocoder();
        console.log("***/////", geocoder);
				function geocodeAddress(geocoder, resultsMap) {
  				// var address = $scope.address;  //this I will need when I finish testing this
          var address=arg;
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
        				title: "title",
        				icon: caricon,
        				times: "times"


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

// // closes the address get
// });

// closes the addMarker function
}

 $scope.getDocs = function () {

      $http.get('/api/address')
                .then(function(returnData){
                  console.log("*****", returnData.data)
                  var timenow = new Date().getTime();
                  console.log(timenow);




                  for (var i=0; i<returnData.data.length; i++){
                    if ((timenow > returnData.data[i].startTime) && ((timenow < returnData.data[i].endTime) && (returnData.data[i].flag==true))){
                          console.log(returnData.data[i].address);
                          var arg = returnData.data[i].address;
                      
                          $scope.addMarker(arg);
                    }
                  }



                });



  }

  $scope.getDocs();



}



//Registering the controller: mainController
angular.module('driveway').controller('drivewayController',['$scope', '$http', drivewayControllerFunc])