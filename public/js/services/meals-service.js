(function() {
    'use strict';

    var mealsService = function($http) {
        this.getMeal = function(mealId) {
            return $http.get('api/meal/' + mealId);
        };

        this.getMeals = function() {
            return $http.get('/api/meals');
        };

        this.addMeal = function(meal) {
            return $http.post('/api/meal', { name: meal.name });
        };

        this.addIngredient = function(mealId, ingredientId, ingredientQuantity) {
            return $http.post('/api/meal/' + mealId, { id: ingredientId, quantity: ingredientQuantity });
        };

        this.deleteIngredientFromMeal = function(mealId, ingredientId) {
            return $http.delete('/api/meal/' + mealId + '/' + ingredientId);
        };

        this.calculateSums = function(meal) {
            meal.sums = meal.sums || {};
            meal.sums.calories = 0;
            meal.sums.fat = 0;
            meal.sums.carbohydrates = 0;
            meal.sums.protein = 0;

            for (var i = 0; i < meal.ingredients.length; i++) {
                var ingredient = meal.ingredients[i];
                var ratio = ingredient.ingredientMeals.quantity / ingredient.portionSize;

                meal.sums.calories += ingredient.calories * ratio;
                meal.sums.fat += ingredient.fat * ratio;
                meal.sums.carbohydrates += ingredient.carbohydrates * ratio;
                meal.sums.protein += ingredient.protein * ratio;
            }
        };

        this.renameMeal = function(mealId, mealName) {
            return $http.put('api/meal/' + mealId, { name: mealName });
        };

        this.deleteMeal = function(mealId) {
            return $http.delete('api/meal/' + mealId);
        };
    };

    mealsService.$inject = ['$http'];

    angular.module('foodApp').service('mealsService', mealsService);
})();