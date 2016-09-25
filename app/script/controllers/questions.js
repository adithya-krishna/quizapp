'use strict';

/**
 * @ngdoc function
 * @name quizApp.controller: QuestionsCtrl
 * @description
 * # QuestionsCtrl
 * Controller of the quizApp
 */

angular.module('quizApp')
    .controller('QuestionsCtrl', ['$scope', '$mdMedia', '$mdDialog', '$state', '$timeout', 'sessionService', function ($scope, $mdMedia, $mdDialog, $state, $timeout, sessionService) {
        $scope.answerSelectRipple = "#4CAF50";
        $scope.answerIndexMap = ["a", "b", "c", "d"];
        $scope.mdMedia = $mdMedia;
        $scope.activeUser = sessionService.getUserDetail();
        $scope.selectedTabIndex = 0;
        $scope.testComplete = false;
        $scope.chartData = [];
        $scope.testResult = 0;
        $scope.successMessage = ["Better luck next time.", "Great Job!", "Wow!"];
        $scope.successMessageIndex = 0;
        $scope.chart = {
            data: [0, 0, 0, 0, 0],
            datasetOverride: {
                fill: false,
                pointBorderColor: '#03a9f4',
                pointBackgroundColor: '#03a9f4'
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            min: 0,
                            max: 100,
                            stepSize: 10
                        }
                    }]
                }
            },
            labels: ["Q1", "Q2", "Q3", "Q4", "Q5"]
        };

        $scope.questions = [
            {
                title: "Question 1",
                titleSmall: "Q1",
                image: "app/images/q1.jpg",
                questionString: "Grand Central Terminal, Park Avenue, New York is the world's",
                answerOptions: ["largest railway station", "highest railway station", "longest railway station", "None of the above"],
                correctAnswer: 0,
                chosenAnswer: null,
                isTabDisabled: false,
                resultsTab: false,
                answerCorrect: false
            },
            {
                title: "Question 2",
                titleSmall: "Q2",
                image: "app/images/q2.jpeg",
                questionString: "For which of the following disciplines is Nobel Prize awarded?",
                answerOptions: ["Physics and Chemistry", "Physiology or Medicine", "Literature, Peace and Economics", "All of the above"],
                correctAnswer: 3,
                chosenAnswer: null,
                isTabDisabled: true,
                resultsTab: false,
                answerCorrect: false
            },
            {
                title: "Question 3",
                titleSmall: "Q3",
                image: "app/images/q3.jpg",
                questionString: "Galileo was an Italian astronomer who",
                answerOptions: ["developed the telescope", "discovered four satellites of Jupiter", "discovered that the movement of pendulum produces a regular time measurement", "All of the above"],
                correctAnswer: 3,
                chosenAnswer: null,
                isTabDisabled: true,
                resultsTab: false,
                answerCorrect: false
            },
            {
                title: "Question 4",
                titleSmall: "Q4",
                image: "app/images/q4.jpg",
                questionString: "Exposure to sunlight helps a person improve his health because",
                answerOptions: ["the infrared light kills bacteria in the body", "resistance power increases", "the pigment cells in the skin get stimulated and produce a healthy tan", "the ultraviolet rays convert skin oil into Vitamin D"],
                correctAnswer: 3,
                chosenAnswer: null,
                isTabDisabled: true,
                resultsTab: false,
                answerCorrect: false
            },
            {
                title: "Question 5",
                titleSmall: "Q5",
                image: "app/images/q5.jpg",
                questionString: "The ozone layer restricts",
                answerOptions: ["Visible light", "Infrared radiation", "X-rays and gamma rays", "Ultraviolet radiation"],
                correctAnswer: 3,
                chosenAnswer: null,
                isTabDisabled: true,
                resultsTab: false,
                answerCorrect: false
            }
        ];

        $scope.answerSelected = function (question, questionIndex, index) {
            question.chosenAnswer = index;
            if( questionIndex != 4 ){
                $scope.questions[questionIndex + 1].isTabDisabled = false;
                $timeout(function () {
                    $scope.selectedTabIndex = questionIndex + 1;
                }, 400);
            }

            if( questionIndex === 4 ){
                $scope.showTestCompletedDialog();
            }
        };

        $scope.showTestCompletedDialog = function () {
            var confirm = $mdDialog.confirm()
                .title('Great job!')
                .textContent('You have successfully completed the quiz. Would you like to see your results?')
                .ariaLabel('Test Complete')
                .ok('Yes!')
                .cancel('Nope, not yet.');

            $mdDialog.show(confirm).then(function() {
                $scope.testComplete = true;
                $scope.questions.push({
                    title: "Results",
                    titleSmall: "Results",
                    isTabDisabled: false,
                    resultsTab: true
                });
                $scope.calculateResult();
            });
        };

        $scope.calculateResult = function(){
            $scope.testResult = _.reduce($scope.questions, function (sum, qValue, qKey) {
                if( !qValue.resultsTab ){
                    if( (qValue.chosenAnswer === qValue.correctAnswer) ){
                        $scope.questions[qKey].answerCorrect = true;
                        $scope.chartData.push(sum += 20);
                        return sum;
                    }else{
                        $scope.chartData.push(sum);
                        return sum;
                    }
                }
                return sum;
            }, 0);
            if( $scope.testResult == 0 ){
                $scope.successMessageIndex = 0;
            }else if($scope.testResult >= 20 && $scope.testResult < 80){
                $scope.successMessageIndex = 1;
            }else{
                $scope.successMessageIndex = 2;
            }
        };

        $scope.showResults = function(resultsTab){
            if( resultsTab ){
                $timeout(function () {
                    $scope.chart.data = $scope.chartData;
                }, 500);
            }
        };

        $scope.moveToFirstTab = function () {
            $scope.selectedTabIndex = 0;
        };

        $scope.logoutUser = function () {
            sessionService.destroy();
            $state.go('login');
        };
    }]);