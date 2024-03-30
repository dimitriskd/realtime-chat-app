import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useEffect, useRef, useState } from "react";
import { nanoid } from "nanoid";

export default function ChatInput() {
  const [input, setInput] = useState("");
  const [files, setFiles] = useState([]);
  const fileRef = useRef();

  function handleChange(e) {
    setInput(e.target.value);
  }

  function handleEmojiSelect(emoji) {
    setInput((prevInput) => prevInput + emoji.native);
  }

  const handleFiles = (e) => {
    const fileList = e.target.files;
    const fileArray = Array.from(fileList);
    if (fileArray.length <= 2) {
      setFiles(fileArray);
    } else {
      alert("Only up to 2 files are allowed.");
      e.target.value = null;
    }
  };

  const handleCancel = (name) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== name));
  };

  return (
    <div className="w-full min-h-20 bg-shark-100 dark:bg-chatsBg flex items-center p-3 shadow-lg rounded-br-2xl z-50">
      <div className="flex items-center">
        <button className="button-sent" onClick={() => fileRef.current.click()}>
          <span className="material-symbols-outlined">attachment</span>
        </button>
        <input
          ref={fileRef}
          onChange={(e) => handleFiles(e)}
          type="file"
          className="hidden"
          multiple
        />
      </div>
      <div className="dropdown dropdown-top">
        <div tabIndex={0} role="button" className="button-sent">
          <span className="material-symbols-outlined filled">mood</span>
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu shadow bg-darkBg rounded-box w-fit h-fit"
        >
          <Picker data={data} onEmojiSelect={handleEmojiSelect} theme="auto" />
        </ul>
      </div>
      <div className="flex items-center input-sent focus-within:ring focus-within:ring-accent">
        <div className="flex mr-2 gap-1">
          {files.map((file) => {
            return (
              <div className="p-1 gap-1 text-sm text-white bg-darkBg flex items-center rounded-lg" key={nanoid()}>
                <span onClick={() => handleCancel(file.name)} className="material-symbols-outlined text-base cursor-pointer">cancel</span>
                <p>{file.name}</p>
              </div>
            );
          })}
        </div>
        <input
          type="text"
          className="w-full bg-transparent focus:outline-none "
          placeholder="Type your message..."
          value={input}
          onChange={handleChange}
        />
      </div>
      <button className="button-sent">
        <span className="material-symbols-outlined filled text-3xl p-1">
          send
        </span>
      </button>
    </div>
  );
}
