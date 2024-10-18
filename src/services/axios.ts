import axios from "axios";

export type Category = {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
};

export const getCategoryList = async (): Promise<Category[]> => {
  try {
    const response = await axios.get(
      "https://www.themealdb.com/api/json/v1/1/categories.php"
    );

    console.log(response.data.categories);

    return response.data.categories;
  } catch (error) {
    console.log(error);
    throw new Error(`Terjadi kesalahan dalam mendapatkan data kategori`);
  }
};

export type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

export const getMealList = async (
  category: string
): Promise<{ meals: Meal[]; categoryDescription: string }> => {
  try {
    // Ambil data makanan berdasarkan kategori
    const mealResponse = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
    );

    console.log(mealResponse.data.meals);

    // Ambil data kategori untuk mendapatkan deskripsi
    const categoryResponse = await axios.get(
      "https://www.themealdb.com/api/json/v1/1/categories.php"
    );

    const categoryData = categoryResponse.data.categories.find(
      (cat: Category) => cat.strCategory === category
    );

    if (!categoryData) {
      throw new Error(`Kategori ${category} tidak ditemukan`);
    }

    return {
      meals: mealResponse.data.meals,
      categoryDescription: categoryData.strCategoryDescription,
    };
  } catch (error) {
    console.log(error);
    throw new Error(`Terjadi kesalahan dalam mendapatkan data makanan`);
  }
};

export type MealDetail = {
  idMeal: string;
  strMeal: string;
  strDrinkAlternate?: string | null;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags?: string | null;
  strYoutube?: string | null;
  strIngredient1?: string | null;
  strIngredient2?: string | null;
  strIngredient3?: string | null;
  strIngredient4?: string | null;
  strIngredient5?: string | null;
  strIngredient6?: string | null;
  strIngredient7?: string | null;
  strIngredient8?: string | null;
  strIngredient9?: string | null;
  strIngredient10?: string | null;
  strIngredient11?: string | null;
  strIngredient12?: string | null;
  strIngredient13?: string | null;
  strIngredient14?: string | null;
  strIngredient15?: string | null;
  strIngredient16?: string | null;
  strIngredient17?: string | null;
  strIngredient18?: string | null;
  strIngredient19?: string | null;
  strIngredient20?: string | null;
  strMeasure1?: string | null;
  strMeasure2?: string | null;
  strMeasure3?: string | null;
  strMeasure4?: string | null;
  strMeasure5?: string | null;
  strMeasure6?: string | null;
  strMeasure7?: string | null;
  strMeasure8?: string | null;
  strMeasure9?: string | null;
  strMeasure10?: string | null;
  strMeasure11?: string | null;
  strMeasure12?: string | null;
  strMeasure13?: string | null;
  strMeasure14?: string | null;
  strMeasure15?: string | null;
  strMeasure16?: string | null;
  strMeasure17?: string | null;
  strMeasure18?: string | null;
  strMeasure19?: string | null;
  strMeasure20?: string | null;
};

export const getMealDetail = async (idMeal: string): Promise<MealDetail> => {
  try {
    const response = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
    );

    return response.data.meals[0];
  } catch (error) {
    console.log(error);
    throw new Error(`Terjadi kesalahan dalam mendapatkan detail makanan`);
  }
};
