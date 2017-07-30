(function() {
    'use strict';
    angular
        .module('app')
        .controller('ContactController', ContactController);

        // ContactController.$inject = ['$scope', '$http'];
        function ContactController($scope, $http) {
          var vm = $scope;

          vm.userselect = null;

          swal({
            title: '<div class="loader"><div class="loader__figure"></div></div>',
            customClass: 'swal-loader',
            html: true,
            allowEscapeKey: false,
            allowOutsideClick: false,
            showConfirmButton: false,
          });


          $http({
            method: 'get',
            url: 'http://200.172.49.6:2785/agendaweb/agenda/api/v1/listar/DF5TC89D9XFA923FFD/101',
            params: {format: 'json',callback: 'JSON_CALLBACK'}
          }).success(function (resp) {
              swal.close();
              vm.resp = resp;
          }).error(function (resp) {
              swal.close();
              setTimeout(function(){
                swal({
                  title: "Erro",
                  text: "Ocorreu um erro inesperado, entre em contato com o suporte técnico!",
                  type: "error",
                  confirmButtonColor: "#1cc7cf",
                  confirmButtonText: "Fechar",
                  closeOnConfirm: false
                });  
              },500);
              vm.resp = 'error';
          });

          vm.userselect = 'contact-list';

          vm.showdata = function(user, index){
            vm.contactSearch = '';
            vm.userselect = 'contact-agenda';
            vm.datauser = user;
            vm.hasdata = index;
            vm.view = true;
            vm.tarefasData = user.tarefasData;
          }
          
          vm.showtarefa = function(tarefa){
            vm.modaldata = tarefa;
            $('#modaltarefa').modal("show");
          }

          vm.backContact = function(){
            vm.userselect = 'contact-list';
          }

        

        }
})();
