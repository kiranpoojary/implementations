import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import config from "../../configuration/config";
import { v4 as uuidv4 } from "uuid";
let defaultChatRooms = {
  india: { roomname: "India", id: "india", chats: [] },
  usa: { roomname: "USA", id: "usa", chats: [] },
  uk: { roomname: "UK", id: "uk", chats: [] },
};
function ChatApp() {
  const [mySocketId, setMySocketId] = useState();
  const [myUserId, setMyUserId] = useState(uuidv4());
  const [messages, setMessages] = useState({
    public: [],
    rooms: defaultChatRooms,
    private: {},
  });
  const [activePrivateChat, setactivePrivateChat] = useState(null);
  const [activeChatRoom, setActiveChatRoom] = useState(
    Object.keys(defaultChatRooms)?.[0] || null
  );
  const [availableRooms, setAvailableRooms] = useState(defaultChatRooms);

  const [onlineUsers, setOnlineUsers] = useState([]);
  const [message, setMessage] = useState({
    publicMsg: "",
    privateMsg: "",
    roomMsg: "",
  });
  const socketRef = useRef();

  useEffect(() => {
    if (!socketRef?.current) {
      socketRef.current = io.connect(config.SERVER_HOST);
    }
    return () => {
      //component will unmunt
      socketRef.current.emit("useroffline", myUserId);
    };
  }, []);

  useEffect(() => {
    //set you as onlineand get all online users
    socketRef.current.on("yourID", (response) => {
      setMySocketId(response.usersocketid);
      setOnlineUsers([
        ...response.allOnlineUsers,
        { userid: myUserId, socketid: response.usersocketid, me: true },
      ]);

      //tell other to set new online users
      socketRef?.current?.emit("joinsuccess", [
        ...response.allOnlineUsers,
        { userid: myUserId, socketid: response.usersocketid, me: true },
      ]);

      //join all available rooms
      socketRef?.current?.emit("joinrooms", Object.keys(availableRooms));
    });

    //other comes online
    socketRef.current.on(
      "resetonlineusers",
      (onlineusers, disconnecteduser) => {
        setOnlineUsers(onlineusers);
        if (
          disconnecteduser &&
          activePrivateChat &&
          activePrivateChat?.userid === disconnecteduser?.userid
        )
          setactivePrivateChat(null);
      }
    );

    socketRef.current.on("newpublicmsg", (msg) => {
      console.log(msg);
      setMessages({ ...messages, public: [...messages.public, msg] });
    });

    socketRef.current.on("newprivatemsg", (msg) => {
      let userchat = {};

      if (messages.private[msg.userid]) {
        userchat = {
          ...messages.private[msg.userid],
          chats: [...messages.private[msg.userid]?.chats, msg],
        };
      } else {
        userchat = {
          userid: msg.userid,
          socketid: msg.socketid,
          chats: [msg],
        };
      }

      setMessages({
        ...messages,
        private: {
          ...messages.private,
          [msg.userid]: userchat,
        },
      });
    });

    socketRef.current.on("newroommsg", ({ message, roomid }) => {
      let roomdetails = messages?.rooms[roomid];
      console.log(roomdetails.chats);
      roomdetails = { ...roomdetails, chats: [...roomdetails.chats, message] };
      setMessages({
        ...messages,
        rooms: { ...messages.rooms, [roomid]: roomdetails },
      });
    });
  });

  function sendPublicMsg(e) {
    if (message.publicMsg) {
      e.preventDefault();
      const msgObj = {
        text: message.publicMsg,
        socketid: mySocketId,
        userid: myUserId,
        time: "na",
        sent: false,
        seen: false,
      };

      setMessage({ ...message, publicMsg: "" });
      socketRef.current.emit("sendpublicmsg", msgObj);
    }
  }

  function sendPvtMsg(e) {
    if (message.privateMsg) {
      e.preventDefault();
      const msgObj = {
        text: message.privateMsg,
        socketid: mySocketId,
        userid: myUserId,
        time: "na",
        sent: false,
        seen: false,
      };

      let attachedmsg = [];

      if (messages.private[activePrivateChat.userid]) {
        attachedmsg = {
          userid: msgObj?.userid,
          socketid: msgObj?.socketid,
          chats: [...messages.private[activePrivateChat.userid].chats, msgObj],
        };
      } else {
        attachedmsg = {
          userid: msgObj?.userid,
          socketid: msgObj?.socketid,
          chats: [msgObj],
        };
      }
      setMessages({
        ...messages,
        private: {
          ...messages.private,
          [activePrivateChat.userid]: attachedmsg,
        },
      });

      setMessage({ ...message, privateMsg: "" });
      socketRef.current.emit("sendpvtmsg", {
        message: msgObj,
        tosocket: activePrivateChat.socketid,
      });
    }
  }

  function sendRoomMsg(e) {
    if (message.roomMsg) {
      e.preventDefault();
      const msgObj = {
        text: message.roomMsg,
        socketid: mySocketId,
        userid: myUserId,
        time: "na",
        sent: false,
        seen: false,
      };

      setMessage({ ...message, roomMsg: "" });
      socketRef.current.emit("sendroommsg", {
        message: msgObj,
        roomid: activeChatRoom,
      });
    }
  }

  return (
    <div className="ch-mt-1 w-100 d-flex flex-column align-items-center">
      <div className="ch-pl-2">Your User ID :{myUserId}</div>
      <div className="d-flex flex-column flex-lg-row  flex-md-row  flex-sm-col">
        <div className="d-flex flex-column ch-p-1">
          <div>Public</div>
          {socketRef.current ? (
            <div className="p-2" style={{ border: "1px solid grey" }}>
              <div style={{ maxHeight: "20rem", overflowY: "auto" }}>
                {messages?.public.map((msg, i) =>
                  msg.userid === myUserId ? (
                    <div key={i} className="ch-snd-msg">
                      {msg.text}
                    </div>
                  ) : (
                    <div key={i} className="ch-rcv-msg">
                      {msg.text}
                    </div>
                  )
                )}
              </div>
              <div style={{ marginTop: "0.5rem" }}>
                <input
                  className="border-2 border-primary"
                  onChange={(e) => {
                    setMessage({ ...message, publicMsg: e.target.value });
                  }}
                  type="text"
                  id="msg"
                  placeholder="Type message here"
                  value={message.publicMsg}
                ></input>
                <button
                  className="border-1 rounded-md px-2 hover:bg bg-primary-100 text-white"
                  onClick={sendPublicMsg}
                >
                  send
                </button>
              </div>
            </div>
          ) : (
            <div>Not Connected</div>
          )}
        </div>
        <div className="d-flex flex-column ch-p-1">
          <div>Private</div>
          {socketRef.current ? (
            <div className="p-2" style={{ border: "1px solid grey" }}>
              {activePrivateChat?.userid && activePrivateChat?.socketid ? (
                <>
                  <div style={{ maxHeight: "20rem", overflowY: "auto" }}>
                    {messages?.private?.[activePrivateChat?.userid]?.chats.map(
                      (msg, i) =>
                        msg.userid === myUserId ? (
                          <div key={i} className="ch-snd-msg">
                            {msg.text}
                          </div>
                        ) : (
                          <div key={i} className="ch-rcv-msg">
                            {msg.text}
                          </div>
                        )
                    )}
                  </div>
                  <div style={{ marginTop: "0.5rem" }}>
                    <input
                      className="border-2 border-primary"
                      onChange={(e) => {
                        setMessage({
                          ...messages,
                          privateMsg: e.target.value,
                        });
                      }}
                      type="text"
                      id="msg"
                      placeholder="Type message here"
                      value={message.privateMsg}
                    ></input>
                    <button
                      className="border-1 rounded-md px-2 hover:bg bg-primary-100 text-white"
                      onClick={sendPvtMsg}
                    >
                      send
                    </button>
                  </div>
                </>
              ) : (
                <div>Select user below</div>
              )}
              <div className="d-flex flex-column">
                <div className="h6 ch-mt-2">Users Online</div>
                {onlineUsers
                  .filter((u) => u.userid !== myUserId)
                  .map((user, i) => (
                    <button
                      key={i}
                      className="ch-mt-025"
                      onClick={() => {
                        setactivePrivateChat({
                          userid: user.userid,
                          socketid: user.socketid,
                        });
                      }}
                    >
                      {user.userid}
                    </button>
                  ))}
              </div>
            </div>
          ) : (
            <div>Not Connected</div>
          )}
        </div>
        <div className="d-flex flex-column ch-p-1">
          <div>Rooms</div>
          {socketRef.current ? (
            <div className="p-2" style={{ border: "1px solid grey" }}>
              <div className="d-flex flex-row">
                {Object.keys(availableRooms).map((roomkey, i) => (
                  <div key={i} className="ch-pr-1">
                    <input
                      checked={availableRooms[roomkey].id === activeChatRoom}
                      onChange={(e) => {
                        setActiveChatRoom(e.target.value);
                      }}
                      type="radio"
                      name={"room"}
                      value={availableRooms[roomkey].id}
                    />
                    {availableRooms[roomkey].roomname}
                  </div>
                ))}
              </div>
              <div style={{ maxHeight: "20rem", overflowY: "auto" }}>
                {messages?.rooms[activeChatRoom]?.chats.map((msg, i) =>
                  msg.id === mySocketId ? (
                    <div key={i} className="ch-snd-msg">
                      {msg.text}
                    </div>
                  ) : (
                    <div key={i} className="ch-rcv-msg">
                      {msg.text}
                    </div>
                  )
                )}
              </div>
              <div style={{ marginTop: "0.5rem" }}>
                <input
                  className="border-2 border-primary"
                  onChange={(e) =>
                    setMessage({ ...message, roomMsg: e.target.value })
                  }
                  type="text"
                  id="msg"
                  placeholder="Type message here"
                  value={message.roomMsg}
                ></input>
                <button
                  className="border-1 rounded-md px-2 hover:bg bg-primary-100 text-white"
                  onClick={sendRoomMsg}
                >
                  send
                </button>
              </div>
            </div>
          ) : (
            <div>Not Connected</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatApp;
