import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import socket, { connectSocket } from "../config/socket";
import documentService from "../services/Document";
import { toast } from "react-toastify";
import { UserDataContext } from "../context/UserContext";

const Document = () => {
  let { id } = useParams();
  const [editValue, seteditValue] = useState("");
  const [isDisabled, setisDisabled] = useState(true);
  const [isSaved, setisSaved] = useState(false);

  let {user} = useContext(UserDataContext)

  useEffect(() => {
    connectSocket();

    socket.on("load-content", function (data) {
      seteditValue(data.content);
    });

    socket.on("receive-changes", (value) => {
      seteditValue(value);
    });
  }, [id]);

  function handleEditorChange(e) {
    let value = e.target.value;
    seteditValue(value);
    setisDisabled(false);
    socket.emit("send-changes", { id, value });
  }

  function handleSaveChanges() {
    try {
      documentService
        .saveDocument(id, editValue)
        .then(function () {
          setisSaved(true);
        })
        .then(function () {
          setTimeout(() => {
            setisSaved(false);
            setisDisabled(true)
          }, 2000);

        });
    } catch (error) {
      toast.error(
        error?.response?.data?.message || error?.response?.data?.errorMessage
      );
    }
  }

  function handleLeaveRoom() {
    socket.emit("leave-document", {id,user});
    toast.success("Document Left Success");
  }

  return (
    <div className="w-full h-screen bg-zinc-900 text-white p-10">
      {isSaved && <span>Saved</span>}
      <div className="w-full flex items-center justify-between">
        <h1 className="text-3xl font-semibold mb-5">Write and Collaborate</h1>
        <Link onClick={handleLeaveRoom} to={"/home"} className="text-blue-600">
          Go to home
        </Link>
      </div>
      <textarea
        placeholder="Write Something"
        onChange={handleEditorChange}
        value={editValue}
        className="w-full h-[200px] px-3 py-2 bg-slate-800 outline-none resize-none"
      />
      <button
        disabled={isDisabled}
        onClick={handleSaveChanges}
        className={`px-3 py-2 ${
          isDisabled ? "bg-gray-600" : "bg-blue-600"
        } rounded-lg mt-3`}
      >
        Save
      </button>
    </div>
  );
};

export default Document;
