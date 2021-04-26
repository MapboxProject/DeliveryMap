// Map via Mapbox GL
mapboxgl.accessToken = 'pk.eyJ1IjoibWV0cmljb24iLCJhIjoiY2l3eTQxMWl3MDBmYTJ6cWg3YmZtdjdsMSJ9.2vDbTw3ysscpy3YWkHo6aA';
var map = new mapboxgl.Map({
  container: 'map', // Container ID
  style: 'mapbox://styles/mapbox/light-v10',
  center: [-79.69347, 44.377433], // Starting position [lng, lat]
  zoom: 12 // Starting zoom level
});

map.addControl(new mapboxgl.FullscreenControl());
map.addControl(new mapboxgl.NavigationControl());

var panel_element = document.getElementById('deal-panel');


function openDealPanel() {
  document.getElementById('deal-panel').style.display = "block";
  document.getElementById('show-btn').style.display = "none";
  document.getElementById('close-btn').style.display = "block";
}

function closePanel() {
  document.getElementById('deal-panel').style.display = "none";
  document.getElementById('show-btn').style.display = "block";
  document.getElementById('close-btn').style.display = "none";
}

function buildDealList(data) {
  console.log(data);
  $('#dealList').empty();
  var listings = document.getElementById('dealList');
  var listing = listings.appendChild(document.createElement('div'));
  listing.className = 'carousel-inner';
  var counter = 0;
  var today = new Date().getTime();
  data.forEach(function(store, i){
    if (store.business.storedeals.length > 0
      && Date.parse(store.business.storedeals[0].dlsExpireDate) > today
      && store.business.storedeals[0].media) {

      counter = counter + 1;

      var carousel = listing.appendChild(document.createElement('div'));
      carousel.className = "carousel-item";

      if (counter == 1) {
        carousel.className = "carousel-item active"
      }
      //Create anchor to see deal
      var link = carousel.appendChild(document.createElement('a'));
      link.href = '';
      link.style = "color: black";
      // Create div with deal content
      var dealColumn = link.appendChild(document.createElement('div'));
      dealColumn.className = 'row pt-2 pt-md-2';
      dealColumn.style = "line-height: 0";

      // Create Div with deal images
      var dealImage = dealColumn.appendChild(document.createElement('div'));
      dealImage.className = 'col-md-5 col-5';

      // Create image tag
      var productImage = dealImage.appendChild(document.createElement('img'));
      productImage.src = 'https://dz8osaahf9pd7.cloudfront.net/filters:format(webp)/storage/' + store.business.storedeals[0].media.mdaLocalFileName;
      productImage.className = 'img-fluid';
      productImage.style = 'max-widht: 10em';

      // Create Div with deal informations
      var dealInformation = dealColumn.appendChild(document.createElement('div'));
      dealInformation.className = 'col-md col pt-3';

      var dealTittle = dealInformation.appendChild(document.createElement('h4'));
      dealTittle.className = 'bold pb-2';
      dealTittle.innerHTML = store.business.storedeals[0].dlsName;

      var dealParagraph = dealInformation.appendChild(document.createElement('p'));
      dealParagraph.innerHTML = store.business.storedeals[0].dlsApplyTo;

      var dealParagraph = dealInformation.appendChild(document.createElement('p'));
      dealParagraph.style = 'line-height: normal';
      dealParagraph.innerHTML = store.business.storeName;

      var dealType = dealInformation.appendChild(document.createElement('p'));
      dealType.innerHTML = store.business.storeplType;


    }

  });
}

function buildStoreList(data) {
  console.log(data);
  $('#storeList').empty();
  var listings = document.getElementById('storeList');

  data.forEach(function(store, i){

      var listing = listings.appendChild(document.createElement('div'));
      listing.className = 'store-listing'
      //Create anchor to see deal
      var link = listing.appendChild(document.createElement('a'));
      link.href = '';
      link.style = "color: black";
      // Create div with deal content
      var storeColumn = link.appendChild(document.createElement('div'));
      storeColumn.className = 'row';
      storeColumn.style = "line-height: 0";

      // Create Div with store images
      var storeImage = storeColumn.appendChild(document.createElement('div'));
      storeImage.className = 'col-md-6';

      // Create image tag
      var productImage = storeImage.appendChild(document.createElement('img'));
      productImage.src = store.storebizLogo;
      productImage.className = 'img-fluid';
      productImage.style = 'max-widht: 10em';

      // Create Div with store informations
      var storeInformation = storeColumn.appendChild(document.createElement('div'));
      storeInformation.className = 'row col-md-6';

      var storeTittle = storeInformation.appendChild(document.createElement('div'));
      storeTittle.className = 'col-md-12 pb-3';

      var storeName = storeTittle.appendChild(document.createElement('h4'));
      storeName.className = 'bold pb-2';
      storeName.innerHTML = store.business.storeName;

      var storeStars = storeInformation.appendChild(document.createElement('div'));
      storeStars.className = 'col-md-12 pb-3';

      var storeRating = storeStars.appendChild(document.createElement('span'));
      storeRating.className = 'las la-star';
      storeRating.innerHTML = store.business.storervwAverage + ' ' + '(' + store.business.storervwCount + ')';

      var storeSubtittle = storeInformation.appendChild(document.createElement('div'));
      storeSubtittle.className = 'col-md-12 pb-3';

      var storeType = storeSubtittle.appendChild(document.createElement('p'));
      storeType.innerHTML = store.business.storeplType;

      var storeParagraph = storeInformation.appendChild(document.createElement('div'));
      storeParagraph.className = 'col-md-12 pb-3';

      var storeLocation = storeParagraph.appendChild(document.createElement('p'));
      storeLocation.innerHTML = store.storebizLocation + '</br>';

      var storeButton = storeColumn.appendChild(document.createElement('div'));
      storeButton.className = 'col-md-12 pb-3';

      var storeViewMenu = storeButton.appendChild(document.createElement('a'));
      storeViewMenu.href = '';
      storeViewMenu.className = 'btn btn-outline-primary view-menu';
      storeViewMenu.innerHTML = 'View Menu';



  });
}


var stores = data;

Vue.component('map-location-filter', {
  template: '<div class="dropdown">\
              <button type="button" class="btn dropdown-toggle rounded-pill bg-white" id="cityFilterToggle" data-toggle="dropdown">\
                <i class="las la-map-marker"></i>\
                <span class="ml-1 mr-2">Barrie, ON</span>\
              </button>\
              <div class="dropdown-container p-4 dropdown-menu">\
                <div class="row mx-sm-5">\
                  <div class="col-12 col-md-6">\
                    <input type="text" v-model="search" @keyup="inputChanged"/>\
                    <div class="city-options">\
                      <div v-for="city in filteredCities" v-show="isOpen">\
                          <a class="city-list">{{ city }}</a>\
                        <br>\
                      </div>\
                    </div>\
                  </div>\
                </div>\
                <hr class="filter-divider">\
                <section>\
                  <div class="">\
                    <nav class="popular">\
                      <input value="Popular Areas" type="button" class="popular">\
                      <input value="A-Z" type="button" class="alphabetical">\
                      <input value="Near By" type="button" class="nearBy pt-3 pt-lg1 pt-md1">\
                    </nav>\
                    <div class="col-12">\
                      <div class="pl-4" style="width: 50%">\
                      </div>\
                      <div class="container">\
                        <div class="col" v-for="city in city_filter">\
                          <a class="cities">\
                            <p>{{ city }}</p>\
                          </a>\
                        </div>\
                      </div>\
                    </div>\
                  </div>\
                </section>\
              </div>\
            </div>',
  props: ['atts'],
  data: function () {
    return {
      result: [],
      filteredCities: [],
      isOpen: false,
      search: ''
    }
  },
  created: function() {
    this.result = stores;
  },
  computed: {
    city_filter: function(){
      return [...new Set(this.result.map(i => i.storebizLocation))].sort()
    }
  },
  methods: {
    inputChanged(event) {
      if (event.code == "ArrowUp" || event.code == "ArrowDown")
        return;

      this.filteredCities = [...new Set(this.result.map(i => i.storebizLocation))].sort();

      if (event.code == "Enter")
        return;

      var filtered = this.filteredCities.filter((filteredCities) => {
        return filteredCities.match(this.search)
      });

      this.isOpen = true
      this.filteredCities.push(...filtered)
    }

    }
});

Vue.component('map-brands-filter', {
  template: '<div class="order-1 order-lg-2 col-12 col-lg-7 mt-2 mt-lg-0 px-0">\
                <div data-toggle="dropdown">\
                  <input type="text" v-model="searchBrand" class="form-control bg-light" placeholder="Search Brands, Products, Services and more."/>\
                </div>\
                <div class="dropdown-container p-4 dropdown-menu">\
                  <div class="search-content">\
                      <a v-for="value in filteredList" class="cities" v-on:click="filterOnMap(value.business.storeLatitude, value.business.storeLongitude)">\
                        <div class="row">\
                          <div class="col-sm-6">\
                            <div class="row">\
                              <div class="col-md-12">\
                                <strong>{{value.business.storeName}}</strong>\
                              </div>\
                              <div class="col-md-12">\
                                <small>{{value.business.storeplType}}</small>\
                              </div>\
                            </div>\
                            <br>\
                          </div>\
                        </div>\
                      </a>\
              </div>\
            </div>',
  data: function () {
    return {
      result: [],
      searchBrand: ''
    }
  },
  created: function() {
    this.result = stores;
  },
  methods: {
    filterOnMap(lat, long) {
      buildDealList(this.filteredList);
      buildStoreList(this.filteredList)
      map.flyTo({
        center: [long, lat],
        essential: true
  });
},

  hasDeals(element) {
    if (element.business.storedeals.length > 0) {
    return true
    }
    return false
  }

  },
  computed: {
    filteredList: function() {
      var self = this;
      var isSearchStore = this.result.some(el => el.business.storeName.includes(self.searchBrand));
      var isSearchService = this.result.some((el) => el.business.storeplType.includes(self.searchBrand));
      var isSearchDeal = this.result.some((el) => this.hasDeals(el) ? el.business.storedeals[0].dlsName.includes(self.searchBrand) : false);
      var isSearchProd = this.result.some((el) => this.hasDeals(el) ? el.business.storedeals[0].dlsApplyTo.includes(self.searchBrand) : false);
      switch (true) {
        case isSearchStore:
          return this.result.filter(function (value) {
            return value.business.storeName.toLowerCase().includes(self.searchBrand.toLowerCase())
          })
          break;
        case isSearchService:
        return this.result.filter(function (value) {
          return value.business.storeplType.toLowerCase().includes(self.searchBrand.toLowerCase())
        })
        break;
        case isSearchDeal:
        return this.result.filter(function (value) {
          return value.business.storedeals[0].dlsName.toLowerCase().includes(self.searchBrand.toLowerCase())
        })
        break;
        case isSearchProd:
        return this.result.filter(function (value) {
          return value.business.storedeals[0].dlsApplyTo.toLowerCase().includes(self.searchBrand.toLowerCase())
        })
        break;
      }
    },
  }
});

var map_container = new Vue({
  el: '#vue-filter',
  data: {
    stores: stores
  },
  template: '<div class="order-2 text-center w-100 row mx-0" style="height: 5em">\
              <div class="order-1 order-lg-2 col-12 col-lg-7 mt-2 mt-lg-0 px-0">\
                <map-brands-filter :atts="atts"/>\
              </div>\
              <div class="order-2 order-lg-1 mt-3 mt-lg-0 px-0 col-lg-4">\
                <map-location-filter :atts="atts"/>\
              </div>\
            </div>',
  created: function() {
    this.atts = stores;
  }
})

function get_marker_type(store) {
var isStoreFeatured = (store.business.storeIsFeatured == 1);
var isStoreVerified = (store.business.storeIsVerified == 1);


  switch (true) {
    case isStoreVerified:
    return 'marker-orange';
    break;
    case isStoreFeatured:
      return 'marker-yellow'
      break;
    default:
      return 'marker-blue';

  }
}

map.on('load', function() {
console.log(stores);
 stores.forEach(function(store, i) {
     var el = document.createElement('div');
     el.className = get_marker_type(store);
     new mapboxgl.Marker(el)
     .setLngLat([store.business.storeLongitude,store.business.storeLatitude])
     .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
     .setHTML(
       '<div class="limbet-square">' +
        '<div class="limbet-img">' +
          '<img src=' + store.storebizLogo + '>' +
        '</div>' +
        '<div class="limbet-header">' +
          '<strong>' + store.business.storeName + '</strong>' +
          '<div class="small">' +
            '<strong>' + store.storebizLocation + '</strong>' +
          '<br>' +
            '<div>' +
              '<span class="las la-star"></span>' + store.business.storervwAverage +
            '</div>' +
          '</div>' +
        '</div>' +
       '</div>'
     ))
     .addTo(map);
 });

 buildDealList(stores);
 buildStoreList(stores);

});
