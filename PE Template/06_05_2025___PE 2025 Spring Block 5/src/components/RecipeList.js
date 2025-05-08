import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Accordion,
  Card,
  Button,
  Form,
  Row,
  Col,
  Container,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";


const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [filters, setFilters] = useState({
    cuisine: [],
    mealType: [],
    tags: [],
  });
  const [search, setSearch] = useState("");
  const [uniqueFilters, setUniqueFilters] = useState({
    cuisine: [],
    mealType: [],
    tags: [],
  });

  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:9999/recipes").then((res) => {
      const sorted = res.data.sort((a, b) => b.rating - a.rating);
      setRecipes(sorted);

      // Extract unique filters
      const cuisines = [...new Set(res.data.map(r => r.cuisine))];
      const mealTypes = [...new Set(res.data.flatMap(r => r.mealType))];
      const tags = [...new Set(res.data.flatMap(r => r.tags))];
      setUniqueFilters({ cuisine: cuisines, mealType: mealTypes, tags });
    });
  }, []);

  const handleFilterChange = (type, value) => {
    setFilters((prev) => {
      const values = prev[type];
      return {
        ...prev,
        [type]: values.includes(value)
          ? values.filter((v) => v !== value)
          : [...values, value],
      };
    });
  };

  const filteredRecipes = recipes.filter((recipe) => {
    const matchSearch = recipe.name.toLowerCase().startsWith(search.toLowerCase());

    const matchCuisine =
      filters.cuisine.length === 0 || filters.cuisine.includes(recipe.cuisine);

    const matchMealType =
      filters.mealType.length === 0 ||
      recipe.mealType.some((m) => filters.mealType.includes(m));

    const matchTags =
      filters.tags.length === 0 ||
      recipe.tags.some((t) => filters.tags.includes(t));

    return matchSearch && matchCuisine && matchMealType && matchTags;
  });

  return (
    <Container fluid className="p-4">
      <h2 className="text-center mb-4">RECIPES FORUM</h2>
      <Row className="mb-3 justify-content-center">
        <Col md={6}>
          <Form.Control
            type="text"
            placeholder="Enter Recipe Name to search ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>
         <Col md="auto">
    <Button variant="primary" onClick={() => navigate("/recipe/create")}>
      Create Recipe
    </Button>
  </Col>
      </Row>

      <Row>
        <Col md={2}>
          <h5>Tags</h5>
          {uniqueFilters.tags.map((tag) => (
            <Form.Check
              key={tag}
              label={tag}
              onChange={() => handleFilterChange("tags", tag)}
            />
          ))}
        </Col>

        <Col md={8}>
          <Accordion defaultActiveKey="0">
            {filteredRecipes.map((recipe, idx) => (
              <Accordion.Item eventKey={idx.toString()} key={recipe.id}>
                <Accordion.Header>
                  <strong>{recipe.name}</strong> - Rating: {recipe.rating}
                </Accordion.Header>
                <Accordion.Body>
                  <Row>
                    <Col md={9}>
                      <p><strong>Preparation Time Minutes:</strong> {recipe.prepTimeMinutes}</p>
                      <p><strong>Cook Time Minutes:</strong> {recipe.cookTimeMinutes}</p>
                      <p><strong>Difficulty:</strong> {recipe.difficulty}</p>
                      <p><strong>Cuisine:</strong> {recipe.cuisine}</p>
                      <p><strong>Meal Types:</strong> {recipe.mealType?.join("; ")}</p>
                      <p><strong>Tags:</strong> {recipe.tags?.join("; ")}</p>
                      <p><strong>Ingredients:</strong></p>
                      <ul>{recipe.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}</ul>
                      <p><strong>Instructions:</strong></p>
                      <ul>{recipe.instructions.map((ins, i) => <li key={i}>{ins}</li>)}</ul>
                    </Col>
                    <Col md={3}>
                      <img
                        src={`/images/${recipe.image}`}
                        alt={recipe.name}
                        className="img-fluid rounded"
                      />
                    </Col>
                  </Row>
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </Col>

        <Col md={2}>
          <h5>Cuisine</h5>
          {uniqueFilters.cuisine.map((c) => (
            <Form.Check
              key={c}
              label={c}
              onChange={() => handleFilterChange("cuisine", c)}
            />
          ))}

          <h5 className="mt-4">Meal Type</h5>
          {uniqueFilters.mealType.map((m) => (
            <Form.Check
              key={m}
              label={m}
              onChange={() => handleFilterChange("mealType", m)}
            />
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default RecipeList;
