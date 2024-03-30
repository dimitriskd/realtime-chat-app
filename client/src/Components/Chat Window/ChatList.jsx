import { ChatListConvo } from "./ChatListConvo";

export default function ChatList() {
  const convo = {
    username: "Dimitris",
    avatar:
      "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
    message:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum rerum quae, obcaecati quibusdam illo alias! Alias labore voluptate quae nobis aperiam quaerat! Voluptatem repellat dignissimos, aliquid provident nulla cumque mollitia.",
  };

  return (
    <section className="flex flex-col w-full h-full">
      <div className="w-full border-b border-cod-gray-900">
        <p className="text-lg p-4 dark:text-white">Conversations</p>
      </div>
      <div
        id="list"
        className="flex flex-col w-full overflow-auto scrollbar"
      >
        {[...Array(10)].map((_, index) => (
          <ChatListConvo key={index} data={convo} />
        ))}
      </div>
    </section>
  );
}

