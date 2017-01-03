(function() {

// dataservice factory
angular
    .module('app.core', [])
    .factory('itemsService', itemsService);

itemsService.$inject = ['$http'];

function dataservice($http) {
    return {
        getItem: getItem,
        getItems: getItems,
        updateItem: updateItem,
        createItem: createItem,
        deleteItem: deleteItem
    };

    // Gets a single item.
    function getItem(item) {
      // This is the simplest example. This returns the promise created by
      // $http. The promise will resolve in the caller's (Controller's) scope
      // once the request completes. The controller will need to handle the
      // success or error response.
      return $http.get('/api/items/' + item.id);
    }

    // Gets the array of all items.
    getItems() {
      return $http.get('/api/items');
    }

    function updateItem(item) {
      // This is a slightly more elegant example. The service handles the
      // response appropriately depending on whether a success or error HTTP
      // code was returned from the server.
      return $http.put('/api/items' + item.id, item).then(updateSuccess, updateError);

      // The update succeeded. Return the updated item.
      function updateSuccess(response) {
          return response.data;
      }

      // The update failed.
      function updateError(error) {
          console.warn('The update failed.')
      }
    }

    function createItem(item) {
      // In some cases, you may not want to return the original promise.
      var deferred = $q.defer();

      return $http.post('/api/items', item).then(createSuccess, createError);

      // The create succeeded. Return the new item.
      function createSuccess(response) {
          // Adding our own toString method for printing items.
          var item = response.data;
          item.prototype.toString = function itemToString() {
            return item.name + ': ' + item.description;
          }
          defer.resolve(item);
      }

      // The create failed.
      function createError(error) {
          defer.reject('The update failed because: ' + error)
      }

      return defer.promise;
    }

    function deleteItem(item) {
      return $http.delete('/api/items', item.id);
    }
}
	
}());