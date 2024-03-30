import Convo from "../Components/Chat Window/Convo";
import ChatList from "../Components/Chat Window/ChatList";

export default function Chat(props) {
  return (
    <main className="window-size mt-3 bg-shark-200 dark:bg-darkBg rounded-2xl flex">
      <div className="h-full flex">
        <section className="rounded-l-2xl w-2/6 h-full bg-shark-100 dark:bg-chatsBg">
          <ChatList />
        </section>
        <div className="w-full h-full border-l border-cod-gray-900">
          {props === null ? (
            <div className="h-full w-full flex flex-col justify-center items-center select-none">
              <h2 className="text-7xl text-shark-900 font-bold tracking-tighter m-1">
                chappy.
              </h2>
              <p className="text-xl text-shark-900 font-bold">
                Who you wanna catch up with?
              </p>
            </div>
          ) : (
            <Convo />
          )}
        </div>
      </div>
    </main>
  );
}
