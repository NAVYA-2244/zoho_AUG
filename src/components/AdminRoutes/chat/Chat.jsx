import React, { useState } from "react";
import { useThemeContext } from "../../Contexts/ThemesContext";
import dummyUser from "../../../assets/Header/dummy-user.jpg";
import { Link } from "react-router-dom";
import { HiMiniAdjustmentsVertical } from "react-icons/hi2";
import { MdOutlineAdd, MdOutlineClear, MdAttachFile } from "react-icons/md";
import { IoMdSend } from "react-icons/io";
import { LuSettings2 } from "react-icons/lu";
import { CgSearch } from "react-icons/cg";
import ChatImage from "../../../assets/images/chat-image.png";
import { TbMessageChatbot } from "react-icons/tb";
import { HiHashtag } from "react-icons/hi";
import { CgOrganisation } from "react-icons/cg";

const Chat = () => {
  const { applicationColor } = useThemeContext();
  const [users, setUsers] = useState([
    { id: 1, name: "Sai Ramakrsihna", avatar: dummyUser, messages: [] },
    { id: 2, name: "Raghava", avatar: dummyUser, messages: [] },
    { id: 3, name: "Sai Murari", avatar: dummyUser, messages: [] },
    { id: 4, name: "Chan Basha", avatar: dummyUser, messages: [] },
    { id: 5, name: "Vennela", avatar: dummyUser, messages: [] },
  ]);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentMessage, setCurrentMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newChatName, setNewChatName] = useState("");
  const [newChannelName, setNewChannelName] = useState("");
  const [newChannelDescription, setNewChannelDescription] = useState("");
  const [channels, setChannels] = useState([
    { id: 1, name: "Channel 1" },
    { id: 2, name: "Channel 2" },
    { id: 3, name: "Channel 3" },
  ]);

  const handleUserClick = (user) => {
    setCurrentUser(user);
  };
  const handleSendMessage = () => {
    if ((currentMessage.trim() || selectedFile) && currentUser) {
      const newMessage = selectedFile
        ? {
            text: selectedFile.name,
            sender: "me",
            type: "file",
            file: selectedFile,
          }
        : { text: currentMessage, sender: "me", type: "text" };

      const updatedUsers = users.map((user) =>
        user.id === currentUser.id
          ? { ...user, messages: [...user.messages, newMessage] }
          : user
      );

      setUsers(updatedUsers);
      setCurrentMessage("");
      setSelectedFile(null);
    }
  };

  const handleFileInput = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setCurrentMessage(file.name);
  };

  const handleAddChat = () => {
    setShowAddModal(true);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setNewChatName("");
  };

  const handleSubmitNewChat = () => {
    if (newChatName.trim()) {
      const newChatUser = {
        id: users.length + 1,
        name: newChatName,
        avatar: dummyUser,
        messages: [],
      };

      setUsers([...users, newChatUser]);
      setShowAddModal(false);
      setNewChatName("");
    }
  };

  const handleDelete = (userId) => {
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);

    if (currentUser && currentUser.id === userId) {
      setCurrentUser(null);
    }
  };

  const handleChannelDelete = (channelId) => {
    const updatedChannels = channels.filter(
      (channel) => channel.id !== channelId
    );

    setChannels(updatedChannels);

    if (currentUser && currentUser.id === channelId) {
      setCurrentUser(null);
    }
  };

  const clearAllChat = () => {
    setUsers([]);
    setCurrentUser(null);
  };

  const handleSubmitNewChannel = () => {
    if (newChannelName.trim()) {
      const newChannel = {
        id: channels.length + 1,
        name: newChannelName,
        description: newChannelDescription,
      };

      setChannels([...channels, newChannel]);
      setNewChannelName("");
      setNewChannelDescription("");
    }
  };

  const handleNewChannelNameChange = (e) => {
    setNewChannelName(e.target.value);
  };

  const handleNewChannelDescriptionChange = (e) => {
    setNewChannelDescription(e.target.value);
  };

  return (
    <div
      style={{
        background: applicationColor.cardBg1,
        color: applicationColor.readColor1,
      }}
      className="chat-page p-2"
    >
      <div className="row">
        <div className="col-xl-4 border">
          <h4 className="my-3">Messages</h4>
          <ul
            className="nav nav-pills d-inline-flex flex-nowrap rounded-3 py-2 default-shadow messages"
            id="pills-tab"
            role="tablist"
            style={{
              background: applicationColor.cardBg1,
              color: applicationColor.readColor1,
            }}
          >
            <li className="nav-item">
              <a
                className="nav-link active"
                id="chats-tab"
                data-bs-toggle="pill"
                role="tab"
                href="#chats"
                aria-controls="chats"
                aria-selected="true"
              >
                <TbMessageChatbot />
                <span className="ms-1">Chats</span>
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                id="channels-tab"
                data-bs-toggle="pill"
                role="tab"
                href="#channels"
                aria-controls="channels"
                aria-selected="false"
              >
                <HiHashtag />
                <span className="ms-1">Channels</span>
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                id="organization-tab"
                data-bs-toggle="pill"
                role="tab"
                href="#organization"
                aria-controls="organization"
                aria-selected="false"
              >
                <CgOrganisation />
                <span className="ms-1">Organization</span>
              </a>
            </li>
          </ul>

          <div className="tab-content" id="pills-tabContent">
            <div
              className="tab-pane fade show active"
              id="chats"
              role="tabpanel"
              aria-labelledby="admin-roles-tab"
            >
              <div className="d-flex justify-content-between align-items-center my-3">
                <p className="mb-0 fw-semibold">Recent Chats</p>
                <div className="dropdown">
                  <Link data-bs-toggle="dropdown" aria-expanded="false">
                    <HiMiniAdjustmentsVertical />
                  </Link>
                  <ul className="dropdown-menu dropdown-menu-end user-dropdown">
                    <li>
                      <Link
                        className="dropdown-item d-inline-flex"
                        onClick={handleAddChat}
                      >
                        <MdOutlineAdd />
                        Add Chats
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item d-inline-flex"
                        onClick={clearAllChat}
                      >
                        <MdOutlineClear />
                        Clear
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <ul className="recent-users">
                {users.map((user) => (
                  <li key={user.id} onClick={() => handleUserClick(user)}>
                    <Link className="d-flex">
                      <img
                        alt="users"
                        src={user.avatar}
                        width={35}
                        height={35}
                        className="rounded-circle"
                      />
                      <div className="ms-2 flex-fill">
                        <p className="mb-1 fw-medium">{user.name}</p>
                        <small className="text-muted">
                          {user.messages.slice(-1)[0]?.text ||
                            "No messages yet"}
                        </small>
                      </div>
                      <div
                        className="user-delete"
                        onClick={() => handleDelete(user.id)}
                      >
                        <MdOutlineClear />
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div
              className="tab-pane fade"
              id="channels"
              role="tabpanel"
              aria-labelledby="admin-roles-tab"
            >
              <div className="channels-search my-4">
                <CgSearch />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Type something here..."
                />
              </div>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <p className="mb-0 fw-semibold">Channels</p>
                <div
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasRight"
                  aria-controls="offcanvasRight"
                  className="add-channels"
                >
                  <MdOutlineAdd />
                </div>
              </div>
              <ul className="allchannels">
                {channels.map((channel) => (
                  <li key={channel.id}>
                    <Link className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center">
                        <span>#</span>
                        <p className="ms-2 mb-0 channels-name">
                          {channel.name}
                        </p>
                      </div>
                      <div
                        className="user-delete"
                        onClick={() => handleChannelDelete(channel.id)}
                      >
                        <MdOutlineClear />
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div
              className="tab-pane fade"
              id="organization"
              role="tabpanel"
              aria-labelledby="admin-roles-tab"
            >
              Organization
            </div>
          </div>
        </div>
        <div className="col-xl-8 border px-0 d-lg-block">
          <div className="d-flex flex-column">
            {currentUser ? (
              <>
                <div
                  style={{
                    background: applicationColor.tableHeadBg,
                    color: applicationColor.readColor1,
                  }}
                  className="chat-header p-2 d-flex justify-content-between align-items-center"
                >
                  <div className="d-flex">
                    <img
                      alt="userImage"
                      src={currentUser.avatar}
                      width={35}
                      height={35}
                      className="rounded-circle"
                    />
                    <div className="ms-2">
                      <p className="mb-1 fw-semibold">{currentUser.name}</p>
                      <span>online</span>
                    </div>
                  </div>
                  <div>
                    <div className="dropdown">
                      <Link
                        className="user-image"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <LuSettings2 />
                      </Link>

                      <ul className="dropdown-menu user-dropdown">
                        <Link className="dropdown-item">Block</Link>
                        <Link className="dropdown-item">Report</Link>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="chat-body p-4">
                  {currentUser.messages.map((message, index) => (
                    <div key={index} className={`message ${message.sender}`}>
                      <div className="message-content d-flex">
                        <img
                          alt="userImage"
                          src={currentUser.avatar}
                          width={35}
                          height={35}
                          className="rounded-circle"
                        />
                        <div className="message-details ms-2">
                          <p className="mb-1 user-name">{currentUser.name}</p>
                          {message.type === "file" ? (
                            <div>
                              {message.file.type.startsWith("image/") ? (
                                <img
                                  src={URL.createObjectURL(message.file)}
                                  alt={message.file.name}
                                  style={{
                                    maxWidth: "100%",
                                    maxHeight: "200px",
                                  }}
                                />
                              ) : (
                                <>
                                  <a
                                    href={URL.createObjectURL(message.file)}
                                    download
                                  >
                                    Download File
                                  </a>
                                </>
                              )}
                            </div>
                          ) : (
                            <p className="mb-0 user-text">{message.text}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="chat-footer">
                  <div className="p-2 d-flex align-items-center flex-nowrap">
                    <div className="input-group">
                      <label
                        className="input-group-text"
                        htmlFor="fileInput"
                        style={{ cursor: "pointer" }}
                      >
                        <MdAttachFile />
                      </label>
                      <input
                        type="file"
                        id="fileInput"
                        style={{ display: "none" }}
                        onChange={handleFileInput}
                      />
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Type something here..."
                        aria-label="Type something here..."
                        aria-describedby="chat-input"
                        value={currentMessage}
                        onChange={(e) => setCurrentMessage(e.target.value)}
                      />
                    </div>
                    <button
                      className="btn btn-primary"
                      onClick={handleSendMessage}
                    >
                      <IoMdSend />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="welcom-chat d-flex justify-content-center align-items-center p-2 position-relative">
                <h4 className="chat-info">
                  {" "}
                  Select a user to start chatting...
                </h4>
                <img alt="chatimage" src={ChatImage} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Chat Modal */}
      <div
        className={`modal fade ${showAddModal ? "show" : ""}`}
        id="addChatModal"
        tabIndex="-1"
        aria-labelledby="addChatModalLabel"
        aria-hidden={!showAddModal}
        style={{ display: showAddModal ? "block" : "none" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addChatModalLabel">
                Add New Chat
              </h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={handleCloseModal}
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="chatName" className="form-label">
                    Chat Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="chatName"
                    value={newChatName}
                    onChange={(e) => setNewChatName(e.target.value)}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCloseModal}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmitNewChat}
              >
                Add Chat
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Add channels */}
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header bg-light">
          <h4 id="offcanvasRightLabel">Create Channel</h4>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <p className="mt-2 text-muted create-channel-info">
            Channels are meant for enhanced collaboration across your
            organization. You can create channels for the entire organization,
            your team or across multiple teams.
          </p>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Channel name"
            id="newChannelName"
            value={newChannelName}
            onChange={handleNewChannelNameChange}
          />
          <textarea
            className="form-control"
            placeholder="Channel description"
            id="newChannelDescription"
            value={newChannelDescription}
            onChange={handleNewChannelDescriptionChange}
          ></textarea>
          <button
            className="btn btn-primary mt-3"
            type="button"
            onClick={handleSubmitNewChannel}
          >
            Add Channel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
