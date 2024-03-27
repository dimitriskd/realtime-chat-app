import ChatHeader from "./ChatHeader";
import Convo from "./Convo";

export default function Chat(props) {
  return (
    <div className="h-full relative">
      {/* <div className="nav">
        <ChatHeader />
      </div> */}
      <div className="w-full h-full">
        <Convo />
      </div>
    </div>
  );
}
