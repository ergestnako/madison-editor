'use strict';

var app = angular.module("madisonEditor.documents", ['madisonEditor.config']);

//OPTIONAL! Set socket URL!
// app.config(['$sailsProvider', function ($sailsProvider) {
//     $sailsProvider.url = 'http://localhost:1337';
// }]);

app.controller("DocumentListController", [
  '$scope', '$http', '$routeParams', '$location', 'growl', 'growlMessages',
  function ($scope, $http, $routeParams, $location, growl, growlMessages) {

  $scope.documents = [];
  $http.get("/api/docs/")
    .success(function (data) {
      $scope.documents = data.documents;
    })
    .error(function (data) {
      alert('Houston, we got a problem!');
    });

  $scope.showForm = false;
  $scope.title = 'Untitled Document';
  $scope.showCreateForm = function(){
    $scope.showForm = true;
  };

  $scope.newDocument = '';
  $scope.createDocument = function(){
    if(!$scope.title){
      $scope.title = 'Untitled Document';
    }
    var doc = {document: {'title': $scope.title}};

    $http.post("/api/docs/", doc)
      .success(function (data) {
        $location.path('/documents/' + data.document.id);
      })
      .error(function (data) {
        alert('Houston, we got a problem!');
      });
  }

  $scope.deleteConfirmOpen = [];

  $scope.openDeleteConfirm = function(doc) {
    $scope.deleteConfirmOpen[doc.id] = true;
  }

  $scope.closeDeleteConfirm = function(doc) {
    $scope.deleteConfirmOpen[doc.id] = false;
  }

  $scope.deleteDocument = function(doc) {

    $scope.closeDeleteConfirm(doc);

    $http.delete("/api/docs/" + doc.id)
      .success(function (data) {
        // We've successfully deleted the document from the server.
        // Now we need to find that document and remove it from the page.
        var idx = 0;
        for(idx in $scope.documents) {
          var currentDoc = $scope.documents[idx];
          if(currentDoc === doc) {
            break;
          }
        }

        $scope.documents.splice(idx, 1);
      })
      .error(function (data) {
        alert('Houston, we got a problem!');
      });
  }

}]);

app.controller("DocumentDetailController",
  ['$scope', '$http', '$routeParams', '$location', 'growl', 'growlMessages',
  function ($scope, $http, $routeParams, $location, growl, growlMessages) {

  $http.get("/api/docs/" + $routeParams.id)
    .success(function (data) {
      console.log('found it!', data);
      $scope.document = data.document;

      // Watch for changes to the document.
      $scope.$watch('document', function(newVal, oldVal) {
        if (newVal !== oldVal) {
          console.log('document changed', newVal, oldVal);
          // $http.put("/api/docs/" + $scope.document.id, {document: {title: newVal}})
          //   .success(function (data) {
          //     // Growl: saved
          //   })
          //   .error(function (data) {
          //     alert('Houston, we got a problem!');
          //   });
        }
      });
    })
    .error(function (data) {
      alert('Houston, we got a problem!');
    });
}]);
