"use strict"

###
The authentication controller (login & facebook)
###
habitrpg.controller "AuthCtrl", ($scope, $rootScope, Facebook, LocalAuth, User, $http, $location, API_URL) ->
  $scope.useUUID = false
  debugger
  $scope.toggleUUID = ->
    if showedFacebookMessage is false
      alert "Until we add Facebook, use your UUID and API Token to log in (found at https://habitrpg.com > Options > Settings)."
      showedFacebookMessage = true
    $scope.useUUID = not $scope.useUUID

  $scope.register = ->
    #TODO highlight invalid inputs
    # we have this as a workaround for https://github.com/HabitRPG/habitrpg-mobile/issues/64
    return  if $scope.registrationForm.$invalid
    $http.post(API_URL + "/api/v1/register", $scope.registerVals).success((data, status, headers, config) ->
      User.authenticate data.id, data.apiToken, (err) ->
        $location.path "/habit"

    ).error (data, status, headers, config) ->
      if status is 0
        alert "Server not currently reachable, try again later"
      else if !!data and !!data.err
        alert data.err
      else
        alert "ERROR: " + status


  $scope.auth = ->
    data =
      username: $scope.loginUsername
      password: $scope.loginPassword

    runAuth = (id, token) ->
      User.authenticate id, token, (err) ->
        $location.path "/habit"


    if $scope.useUUID
      runAuth $scope.loginUsername, $scope.loginPassword
    else
      $http.post(API_URL + "/api/v1/user/auth/local", data)
        .success((data, status, headers, config) ->
          runAuth data.id, data.token
          $scope.showing = false
        ).error (data, status, headers, config) ->
          if status is 0
            alert "Server not currently reachable, try again later"
          else if !!data and !!data.err
            alert data.err
          else
            alert "ERROR: " + status
