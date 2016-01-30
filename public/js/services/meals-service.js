(function() {
    'use strict';

    var mealsService = function($http) {
        this.getMeals = function() {
            return $http.get('/api/meals');
        };

        this.addMeal = function(meal) {
            return $http.post('/api/meal', { name: meal.name });
        };

        this.getMeal = function(id) {
            return $http.get('api/meal/' + id);
        };

        this.addIngredient = function(mealId, ingredientId, ingredientQuantity) {
            return $http.put('/api/meal/' + mealId, {id: ingredientId, quantity: ingredientQuantity});
        };

        this.deleteIngredientFromMeal = function(mealId, ingredientId) {
            return $http.delete('/api/meal/' + mealId + '/' + ingredientId);
        };

        this.calculateValues = function(meal) {
            var calculatedMeal = {};

            calculatedMeal.id = meal.id;
            calculatedMeal.name = meal.name;
            calculatedMeal.ingredients = [];

            for (var i = 0; i < meal.ingredients.length; i++) {
                calculatedMeal.ingredients[i] = {};
                var originalMeal = meal.ingredients[i];
                var ratio = originalMeal.ingredientMeals.quantity / originalMeal.portionSize;
                calculatedMeal.ingredients[i].id = originalMeal.id;
                calculatedMeal.ingredients[i].name = originalMeal.name;
                calculatedMeal.ingredients[i].portionSize = originalMeal.portionSize;
                calculatedMeal.ingredients[i].measurement = originalMeal.measurement;
                calculatedMeal.ingredients[i].quantity = originalMeal.ingredientMeals.quantity;
                calculatedMeal.ingredients[i].calories = originalMeal.calories * ratio;
                calculatedMeal.ingredients[i].fat = originalMeal.fat * ratio;
                calculatedMeal.ingredients[i].carbohydrates = originalMeal.carbohydrates * ratio;
                calculatedMeal.ingredients[i].protein = originalMeal.protein * ratio;
            }

            return calculatedMeal;
        };
    };

    mealsService.$inject = ['$http'];

    angular.module('foodApp').service('mealsService', mealsService);
})();