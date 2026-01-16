export default function FilterContainer({ filter, setFilter }) {
  return (
    <div className="filter-container">
      <h2 className="filters-title">Filters</h2>
      <select
        size={10}
        id="filter-select"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
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
    </div>
  );
}
