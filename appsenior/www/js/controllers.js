angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
})

.controller('RecursosController', function($scope, $rootScope, $stateParams, $http, $state, $timeout, $ionicLoading, $ionicPopup) {
  var vm = $scope,
      rs = $rootScope;
      
      vm.contactsearch = {};
      vm.contactsearch.search = "";

  $ionicLoading.show({
      template: '<p>Carregando dados...</p><ion-spinner></ion-spinner>'
  });

  $http({
    method: 'get',
    url: 'http://200.172.49.6:2785/agendaweb/agenda/api/v1/listar/DF5TC89D9XFA923FFD/101',
    // url: 'json.json',
    params: {format: 'json',callback: 'JSON_CALLBACK'}
  }).success(function (resp) {
      $ionicLoading.hide();
      vm.resp = resp;
  }).error(function (resp) {
      $ionicLoading.hide();
      $ionicPopup.alert({
        title: 'Erro!',
        content: 'Ocorreu um erro ao carregar os dados, tente mais tarde!'
      });
      vm.resp = 'error';
  });

  vm.userselect = 'contact-list';


  

  vm.showdata = function(user, index){
    vm.contactsearch.search = "";
    // vm.userselect = 'contact-agenda';
    // vm.datauser = user;
    // vm.hasdata = index;
    // vm.tarefasData = user.tarefasData;
    $state.go('app.tarefas', {userData: user});
  }
  

  vm.showtarefa = function(tarefa){
      
    vm.$apply(function(){
    })
    vm.modaldata = tarefa;
    $('#modaltarefa').modal("show");
  }



})

.controller('TarefasController', function($scope, $state, $stateParams, $ionicModal) {
  var vm = $scope;
  
  vm.view = true;
  if($stateParams.userData == null){$state.go('app.recursos');}
  console.log($stateParams.userData);
  console.log($stateParams);
  vm.data = $stateParams.userData;



  $ionicModal.fromTemplateUrl('modaltarefa.html', {
    scope: vm,
    animation: 'slide-in-up'
  }).then(function(modal) {
    vm.modal = modal;
  });

  vm.openModal = function(data,user) {
    vm.modaluser = user;
    vm.datashow = data;
    vm.modal.show();
  };
  vm.closeModal = function() {
    vm.datashow = null;
    vm.modal.hide();
  };
})


;
