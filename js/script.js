document.addEventListener('DOMContentLoaded', function(event) {
  if(document.querySelector('.work__slider')){
      new Swiper('.work__slider', {
        speed: 600,
   			  navigation: {
			    nextEl: '.swiper-button-next',
			    prevEl: '.swiper-button-prev',
			  },
		    breakpoints: {
		        1081: {
		        	spaceBetween: 110,
		            slidesPerView: 3.3,
		        },		    		
		        651: {
		        		spaceBetween: 40,
		            slidesPerView: 2.3,
		        },
		        0: {
		            slidesPerView: 1.2,
		            spaceBetween: 45,
		        },
        
		    }
      });
   }

	ymaps.ready(init);
	var points = [
	  {
	    coordinates: [55.751574, 37.573856], // Координаты точки 1
	    iconPath: 'img/store.svg', // Путь к иконке для точки 1
	    group: 'store'
	  },
	  {
	    coordinates: [55.752084, 37.582835], // Координаты точки 2
	    iconPath: 'img/kindergarten.svg', // Путь к иконке для точки 2
	    group: 'kindergarten'
	  },
	  {
	    coordinates: [55.753094, 37.562885], // Координаты точки 3
	    iconPath: 'img/edu.svg', // Путь к иконке для точки 3
	    group: 'edu'
	  },
	  {
	    coordinates: [55.750064, 37.572895], // Координаты точки 4
	    iconPath: 'img/health.svg', // Путь к иконке для точки 4
	    group: 'health'
	  },
	  {
	    coordinates: [55.754054, 37.557805], // Координаты точки 5
	    iconPath: 'img/rest.svg', // Путь к иконке для точки 5
	    group: 'rest'
	  },
	  {
	    coordinates: [55.753271, 37.576526], // Координаты точки 6
	    iconPath: 'img/store.svg', // Путь к иконке для точки 6
	    group: 'store'
	  },
	  {
	    coordinates: [55.755453, 37.578522], // Координаты точки 7
	    iconPath: 'img/kindergarten.svg', // Путь к иконке для точки 7
	    group: 'kindergarten'
	  },
	  {
	    coordinates: [55.752915, 37.574801], // Координаты точки 8
	    iconPath: 'img/edu.svg', // Путь к иконке для точки 8
	    group: 'edu'
	  },
	  {
	    coordinates: [55.754974, 37.561282], // Координаты точки 9
	    iconPath: 'img/beauty.svg', // Путь к иконке для точки 9
	    group: 'health'
	  },
	  {
	    coordinates: [55.754217, 37.554567], // Координаты точки 10
	    iconPath: 'img/rest.svg', // Путь к иконке для точки 10
	    group: 'rest'
	  },
	  {
	    coordinates: [55.751942, 37.580379], // Координаты точки 11
	    iconPath: 'img/store.svg', // Путь к иконке для точки 11
	    group: 'store'
	  },
	  {
	    coordinates: [55.753865, 37.589414], // Координаты точки 12
	    iconPath: 'img/kindergarten.svg', // Путь к иконке для точки 12
	    group: 'kindergarten'
	  },
	  {
	    coordinates: [55.755196, 37.567297], // Координаты точки 13
	    iconPath: 'img/edu.svg', // Путь к иконке для точки 13
	    group: 'edu'
	  },
	  {
	    coordinates: [55.749750, 37.578888], // Координаты точки 14
	    iconPath: 'img/health.svg', // Путь к иконке для точки 14
	    group: 'health'
	  },
	  {
	    coordinates: [55.751156, 37.556416], // Координаты точки 15
	    iconPath: 'img/fun.svg', // Путь к иконке для точки 15
	    group: 'rest'
	  }
	];
	var groupCounts = {};

	for (var i = 0; i < points.length; i++) {
	  var point = points[i];
	  var group = point.group;

	  if (groupCounts[group]) {
	    groupCounts[group]++;
	  } else {
	    groupCounts[group] = 1;
	  }
	}
	var listEl = document.querySelectorAll('.map__tabs li');
	listEl.forEach(function (element) {
	  var group = element.getAttribute('data-group');
	  if (groupCounts[group]) {
	    var count = groupCounts[group];
	    element.querySelector('b').innerHTML = count ;
	  }
	});
	function init() {
	  var map = new ymaps.Map("map", {
	    center: [55.751574, 37.573856],
	    zoom: 15
	  });
	  var markers = [];
	  for (var i = 0; i < points.length; i++) {
	    var point = points[i];

	    var customIcon = new ymaps.Placemark(
	      point.coordinates,
	      {},
	      {
	        iconLayout: 'default#image',
	        iconImageHref: point.iconPath,
	        iconImageSize: [92, 92],
	        iconImageOffset: [0, 0]
	      }
	    );
	    customIcon.properties.set('group', point.group);
	    markers.push(customIcon);
	    map.geoObjects.add(customIcon);
	  }
	  var listItems = document.querySelectorAll('.map__tabs li');
		listItems.forEach(function (item) {
		  item.addEventListener('click', function () {
		    var group = this.getAttribute('data-group');
		    if (this.classList.contains('active')) {
		      this.classList.remove('active');
		    } else {
		      listItems.forEach(function (listItem) {
		        listItem.classList.remove('active');
		      });
		      this.classList.add('active');
		    }
		    map.geoObjects.removeAll();
		    if (group && this.classList.contains('active')) {
		      var filteredMarkers = markers.filter(function (marker) {
		        return marker.properties.get('group') === group;
		      });
		      if (filteredMarkers.length > 0) {
		        filteredMarkers.forEach(function (filteredMarker) {
		          map.geoObjects.add(filteredMarker);
		        });
		        var bounds = map.geoObjects.getBounds();
		        map.panTo(bounds[0], {
		          flying: true,
		          duration: 1000
		        });
		      }
		    } else {
		      markers.forEach(function (marker) {
		        map.geoObjects.add(marker);
		      });
		    }
		  });
		});
	}
});

