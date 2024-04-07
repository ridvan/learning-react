export default function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>Add some items to get started.</em>
      </p>
    );

  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);

  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "Everything is ready! Lets go"
          : `🧳 You have ${numItems} items on your list, and you already packed ${numPacked} (${percentage}%)`}
      </em>
    </footer>
  );
}
