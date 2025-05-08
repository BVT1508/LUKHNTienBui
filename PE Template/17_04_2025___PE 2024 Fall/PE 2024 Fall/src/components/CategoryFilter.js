import React, { useContext } from "react";
import { ProductContext } from "../context/ProductContext";

const CategoryFilter = () => {
    const { categories, category, setCategory } = useContext(ProductContext);

    return (
        <div>
            <h5>Categories</h5>
            {categories.map((cat) => (
                <div className="form-check" key={cat.id}>
                    <input
                        className="form-check-input"
                        type="radio"
                        name="category"
                        value={cat.id}
                        checked={Number(category) === cat.id}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                    <label className="form-check-label">{cat.name}</label>
                </div>
            ))}
        </div>
    );
};

export default CategoryFilter;
