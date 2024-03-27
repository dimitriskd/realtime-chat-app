export const ReceivedBubble = ({data}) => {
  const { username, timestamp, message } = data;

  return (
    <div className="chat chat-start">
      <div className="chat-header">
        { username }
        <time className="text-xs opacity-50 ml-1">{ timestamp }</time>
      </div>
      <div className="chat-bubble bg-accent text-white"> { message } </div>
      <div className="chat-footer opacity-50">Seen</div>
    </div>
  );
}

export const SentBubble = ({data}) => {
  const { username, timestamp, message } = data;
  return (
    <div className="chat chat-end">
      <div className="chat-header">
        { username }
        <time className="text-xs opacity-50 ml-1">{ timestamp }</time>
      </div>
      <div className="chat-bubble bg-daccent text-white"> { message } </div>
    </div>
  )
}