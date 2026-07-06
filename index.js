async function getDishes() {
  const dishRef = document.getElementById("dishname");
  const dishname = dishRef.value.trim();

  // Agar input empty hai
  if (dishname === "") {
    alert("Please enter a dish name first!");
    return;
  }

  const mealsRef = document.getElementById("meals");
  mealsRef.innerHTML =
    "<p style='color: #ff9f43;'>Fetching from Chef's Kitchen...</p>";

  try {
    const recipeAPIRef = await fetch(
      `https://themealdb.com/api/json/v1/1/search.php?s=${dishname}`,
    );
    const recipeJSON = await recipeAPIRef.json();
    const meals = recipeJSON.meals;

    // Clear loading screen
    mealsRef.innerHTML = "";

    // Agar result nahi milta
    if (meals === null) {
      mealsRef.innerHTML =
        "<p class='status-msg'>No dishes found. Try another appetizing name!</p>";
      console.log("Search Result: No dishes found for '" + dishname + "'");
      return;
    }

    // 1. Console mein result show karna
    console.log(
      `%c Found ${meals.length} items for: "${dishname}"`,
      "color: #ff9f43; font-weight: bold;",
    );
    console.log("Dishes Data:", meals);

    // 2. Sirf top 6 ya 7 dishes nikalna (slice use kiya hai)
    const limitedMeals = meals.slice(0, 7);
    console.log("Displaying Top Dishes (Max 7):", limitedMeals);

    // 3. UI par results render karna
    limitedMeals.map((ml) => {
      mealsRef.innerHTML += `
                <div class="dish-card">
                    <img src="${ml.strMealThumb}" alt="${ml.strMeal}" />
                    <h2>${ml.strMeal}</h2>
                </div>
            `;
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    mealsRef.innerHTML =
      "<p class='status-msg'>Something went wrong. Please check your connection.</p>";
  }
}
