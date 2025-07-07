export default function MetadataCard({ metadata }) {
    if (!metadata) return null;
  
    return (
      <div className="metadata-card">
        <h2>{metadata.title}</h2>
        <p>{metadata.description}</p>
        <ul>
          <li>
            <strong>Channel:</strong> {metadata.channelTitle}
          </li>
          <li>
            <strong>Published:</strong>{" "}
            {new Date(metadata.publishedAt).toLocaleDateString()}
          </li>
          <li>
            <strong>Views:</strong> {metadata.viewCount.toLocaleString()}
          </li>
          <li>
            <strong>Likes:</strong> {metadata.likeCount.toLocaleString()}
          </li>
          <li>
            <strong>Comments:</strong> {metadata.commentCount.toLocaleString()}
          </li>
        </ul>
      </div>
    );
  }
  