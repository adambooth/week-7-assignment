import { useState } from "react";

export default function CreatePostForm() {
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  function HandleDescriptionChange(event) {
    setDescription(event.target.value);
  }

  function HandleNameChange(event) {
    setName(event.target.value);
  }

  function HandleCategoryChange(event) {
    setCategory(event.target.value);
  }

  async function handleFormSubmit(event) {
    event.preventDefault();

    const postData = {
      creator: name,
      description: description,
      category: category,
    };

    try {
      const response = await fetch("http://localhost:8080/new-post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Post submitted successfully!");
        setName("");
        setDescription("");
        setCategory("");
      } else {
        alert("Failed to submit post: " + result.message);
      }
    } catch (error) {
      console.error("Error submitting post:", error);
    }
  }

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="staffName">Name: </label>
        <input
          type="text"
          name="staffName"
          value={name}
          required
          onChange={HandleNameChange}
        />

        <label htmlFor="description">Description: </label>
        <input
          type="text"
          name="description"
          value={description}
          required
          onChange={HandleDescriptionChange}
        />

        <label htmlFor="category">Category: </label>
        <label htmlFor="category">Category: </label>
        <select
          id="category"
          name="category"
          value={category}
          onChange={HandleCategoryChange}
          required
        >
          <option value="">All Categories</option>
          <option value="Art">Art</option>
          <option value="Music">Music</option>
          <option value="Books">Books</option>
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Photography">Photography</option>
          <option value="Fitness">Fitness</option>
          <option value="Pets">Pets</option>
          <option value="Adventure">Adventure</option>
          <option value="Tech">Technology</option>
          <option value="Games">Games</option>
          <option value="Hobbies">Hobbies</option>
          <option value="Education">Education</option>
          <option value="Wellness">Wellness</option>
          <option value="Entertainment">Entertainment</option>
        </select>

        <button type="submit">Submit</button>
      </form>
    </>
  );
}
