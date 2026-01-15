export default function FilterContainer() {
  return (
    <>
      <div className="filter-container">
        <h2>Filters</h2>
        <select id="filter-select" aria-label="Category">
          <option value="">Category</option>
          <option value="Arts and crafts">Arts & Crafts</option>
          <option value="Convention">Convention</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Funfair">Funfair</option>
          <option value="Sports">Sports</option>
          <option value="Social Group">Social Group</option>
          <option value="Other">Other</option>
        </select>
      </div>
    </>
  );
}
