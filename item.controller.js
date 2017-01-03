(function() {

// Usage of this service in a controller:
angular
    .module('app.items', ['app.core', '_'])
    .controller('ItemsController', ItemsController);

ItemsController.$inject = ['dataservice', '_'];

function ItemsController(dataservice, _) {
    var vm = this;
    vm.items = [];
    vm.updateItem = updateItem;
    vm.deleteItem = deleteItem;

    activate(); // The controller's 'init' method.

    function activate() {
        // handling the http response since the data service didn't.
        dataservice.getItems().then(function(response) {
          vm.items = response.data;
        } function(response) {
          console.warn("Something broke!");
        })
    }

    function updateItem(item) {
      // Receiving the item rather than the HTTP response since the service handled it for us.
      dataservice.updateItem(item).then(function(updatedItem) {
        
        // Replace the item in the items list with the newly updated item.
        // Using underscore/lodash in this example, but this could also be achieved with jQuery/native JavaScript.
        var index = _.indexOf(vm.items, _.find(vm.items, function(item) { return item.id === updatedItem.id });
        vm.items.splice(index, 1, updatedItem);
      })
    }
}

}());