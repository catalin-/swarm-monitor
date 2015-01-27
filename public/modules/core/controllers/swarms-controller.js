/**
 *
 * @author Catalin Manolescu <cc.manolescu@gmail.com>
 */
'use strict';

SwarmMonitor.controller('SwarmsController', ['$scope', '$state', '$rootScope',
    function($scope, $state, $rootScope) {
        var swarms = ['log.js', 'login.js', 'BenchMark.js', 'startRemoteSwarm.js'];
        
        $scope.swarms = swarms;
        /*setTimeout(function(){
            console.log('new swarm');
            $scope.swarms.push('NewSwarm');
            $scope.$apply();
        },10000);*/
        $scope.selectSwarm = function(event, swarm) {
            event.preventDefault();
            $scope.swarmContent = '';
            $scope.selectedSwarm = swarm;
            
            //get swarm from server
            $scope.swarmContent = atob(mockup.swarmContent);
        }
    }
]);