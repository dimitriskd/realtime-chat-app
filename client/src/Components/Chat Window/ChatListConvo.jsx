export const ChatListConvo = ({ data }) => {
  const { username, avatar, message } = data;
  return (
    <a href="#" className="flex px-3 py-4 border-b border-cod-gray-900 hover:bg-shark-200 dark:hover:bg-darkBg">
      <div className="avatar">
        <div className="w-10 rounded-full">
          <img src={avatar} alt="user avatar" />
        </div>
      </div>
      <div className="grid ml-2">
        <p className="font-semibold dark:text-white">{username}</p>
        <p className="truncate ...">{message}</p>
      </div>
    </a>
  );
};
