document.getElementById('searchButton').addEventListener('click', () => {
    const searchInput = document.getElementById('searchInput').value.trim();
    const recipesContainer = document.getElementById('recipes');
    const errorContainer = document.getElementById('error');
    
    // Clear previous results and errors
    recipesContainer.innerHTML = '';
    errorContainer.textContent = '';
  
    if (searchInput === '') {
      errorContainer.textContent = 'Please enter a recipe name!';
      return;
    }
  
    const apiKey = '1'; // Free API key (No registration required for MealDB)
    const url = `https://www.themealdb.com/api/json/v1/${apiKey}/search.php?s=${searchInput}`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.meals) {
          data.meals.forEach(meal => {
            const recipeCard = document.createElement('div');
            recipeCard.classList.add('recipe');
  
            // Extract ingredients and measurements
            const ingredients = [];
            for (let i = 1; i <= 20; i++) {
              const ingredient = meal[`strIngredient${i}`];
              const measure = meal[`strMeasure${i}`];
              if (ingredient && ingredient.trim() !== '') {
                ingredients.push(`${measure || ''} ${ingredient}`.trim());
              }
            }
  
            // Create the recipe card
            recipeCard.innerHTML = `
              <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
              <h3>${meal.strMeal}</h3>
              <p><strong>Category:</strong> ${meal.strCategory}</p>
              <h4>Ingredients:</h4>
              <ul>
                ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
              </ul>
              <h4>Instructions:</h4>
              <p>${meal.strInstructions}</p>
              <a href="${meal.strSource || '#'}" target="_blank">View Full Recipe</a>
            `;
  
            recipesContainer.appendChild(recipeCard);
          });
        } else {
          errorContainer.textContent = 'No recipes found. Try a different search!';
        }
      })
      .catch(err => {
        console.error('Error fetching recipes:', err);
        errorContainer.textContent = 'Something went wrong. Please try again later.';
      });
  });
  