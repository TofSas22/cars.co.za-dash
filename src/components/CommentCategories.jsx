export default function CommentCategories({ categories }) {
    if (!categories) return null;
  
    return (
      <div className="comment-categories">
        {Object.entries(categories).map(([category, comments]) => (
          <div key={category} className="category-section">
            <h4>{category.replace(/_/g, " ").toUpperCase()}</h4>
            <ul>
              {comments.map((comment, i) => (
                <li key={i}>"{comment}"</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  }
  