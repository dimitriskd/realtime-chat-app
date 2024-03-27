export default function ChatHeader(props) {
    return (
        <div className="w-full h-20 bg-shark-300 dark:bg-chatsBg dark:text-white flex justify-between items-center p-3 shadow-lg rounded-tr-2xl z-50">
          <div className="flex justify-between items-center">
              <div className="avatar online">
                <div className="w-14 rounded-full">
                  <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="User Avatar"/>
                </div>
              </div>
              <div className="user p-3 ml-2">
                  <h2 className="font-medium text-xl">Dimitris</h2>
                  <p className="text-sm">Last Active 15m</p>
              </div>
          </div>
          <div className="flex justify-between items-center gap-4 mr-2">
              <button>
                  <span className="material-symbols-outlined filled">phone</span>
              </button>
              <button>
                  <span className="material-symbols-outlined filled">videocam</span>
              </button>
          </div>
        </div>
    );
  }
  