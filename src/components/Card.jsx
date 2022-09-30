const Card = ({ follower }) => {
  return (
    <article className="card">
      <img src={follower.avatar_url} alt={follower.login} />
      <h4>{follower.login}</h4>
      <a
        target="_blank"
        rel="noreferrer"
        href={follower.html_url}
        className="btn"
      >
        view profile
      </a>
    </article>
  );
};

export default Card;
