import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateRecipe() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    ingredients: "",
    instructions: "",
    prepTimeMinutes: 0,
    cookTimeMinutes: 0,
    cuisine: "",
    difficulty: "",
    tags: "",
    mealTypes: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      setError("Recipe Name is required");
      return;
    }

    // Format array fields
    const data = {
      ...form,
      ingredients: form.ingredients.split(";").map((i) => i.trim()).filter(Boolean),
      instructions: form.instructions.split(";").map((i) => i.trim()).filter(Boolean),
      tags: form.tags.split(";").map((i) => i.trim()).filter(Boolean),
      mealTypes: form.mealTypes.split(";").map((i) => i.trim()).filter(Boolean),
      prepTimeMinutes: Number(form.prepTimeMinutes),
      cookTimeMinutes: Number(form.cookTimeMinutes),
    };

    try {
      await axios.post("http://localhost:9999/recipes", data); 
      alert("Create new Recipe success!");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Failed to create recipe");
    }
  };

  return (
    <div className="container mt-3">
      <h2>Create A New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Recipe Name (*)</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
          {error && <small className="text-danger">{error}</small>}
        </div>

        <div className="form-group">
          <label>Ingredients</label>
          <input
            type="text"
            className="form-control"
            name="ingredients"
            placeholder="Separate ingredients with ;"
            value={form.ingredients}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Instructions</label>
          <input
            type="text"
            className="form-control"
            name="instructions"
            placeholder="Separate instructions with ;"
            value={form.instructions}
            onChange={handleChange}
          />
        </div>

        <div className="form-group d-flex">
          <div className="me-2">
            <label>Preparation Time Minutes</label>
            <input
              type="number"
              className="form-control"
              name="prepTimeMinutes"
              value={form.prepTimeMinutes}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Cook Time Minutes</label>
            <input
              type="number"
              className="form-control"
              name="cookTimeMinutes"
              value={form.cookTimeMinutes}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Cuisine</label>
          <input
            type="text"
            className="form-control"
            name="cuisine"
            value={form.cuisine}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Difficulty</label>
          <input
            type="text"
            className="form-control"
            name="difficulty"
            value={form.difficulty}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Tags</label>
          <input
            type="text"
            className="form-control"
            name="tags"
            placeholder="Separate tags with ;"
            value={form.tags}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Meal Types</label>
          <input
            type="text"
            className="form-control"
            name="mealTypes"
            placeholder="Separate meal types with ;"
            value={form.mealTypes}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary mt-2">Save</button>
      </form>
    </div>
  );
}

export default CreateRecipe;
