import React, { useContext, useEffect, useState } from "react";
import documentService from "../services/Document";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import userService from "../services/User";
import { UserDataContext } from "../context/UserContext";
import { DocumentDataContext } from "../context/DocumentContext";
import socket, { connectSocket, disconnectSocket } from "../config/socket";

const Home = () => {
  const [title, settitle] = useState("");
  let navigate = useNavigate();
  let { user, setuser, setisLoggedin } = useContext(UserDataContext);

  let { allDocs, setallDocs } = useContext(DocumentDataContext);

  useEffect(() => {
    connectSocket();

    
  }, []);

  async function fetchLoggedinUser() {
    try {
      let userData = await userService.getLoggedinUser();
      if (userData.status === 200) {
        setuser(userData.data);
      }
    } catch (error) {
      console.log(
        error?.response?.data?.message || error?.response?.data?.errorMessage
      );
    }
  }

  async function fetchAllDocuments() {
    try {
      let allDocsRes = await documentService.getUserDocs();
      if (allDocsRes.status === 200) {
        setallDocs(allDocsRes.data);
      }
    } catch (error) {
      console.log(
        error?.response?.data?.message || error?.response?.data?.errorMessage
      );
    }
  }

  useEffect(() => {
    fetchLoggedinUser();
  }, []);

  useEffect(() => {
    fetchAllDocuments();
  }, []);

  async function handleCreateDocument(e) {
    e.preventDefault();

    try {
      let createDocRes = await documentService.createDocument({ title });
      toast.success("Document Created Successfully");

      fetchAllDocuments();

      settitle('')
    } catch (error) {
      toast.error(
        error?.response?.data?.message || error?.response?.data?.errorMessage
      );
    }
  }

  async function handleLogout() {
    try {
      await userService.logoutAccount();
      toast.success("Logout Success")
      setisLoggedin(false)
      setuser({})
      disconnectSocket()
      navigate("/login")
    } catch (error) {
      toast.error(
        error?.response?.data?.message || error?.response?.data?.errorMessage
      );
    }
  }

  function handleJoinDocument(documentId) {
    navigate(`/document/${documentId}`)
    toast.success("Successfully Joined")
    socket.emit("join-document",documentId)
  }

  return (
    <div className="w-full h-screen bg-zinc-900 text-white p-10">
      <span
        onClick={handleLogout}
        className="text-red-500 absolute right-5 cursor-pointer"
      >
        Logout
      </span>
      <div>
        <h1 className="text-3xl font-semibold mb-5">Hello, {user?.name}</h1>
        <h1 className="text-2xl font-semibold mb-5">Create Document</h1>
      </div>
      <form onSubmit={handleCreateDocument}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            className="px-3 py-2 w-[250px] block mt-2 mb-3 bg-zinc-700 outline-none"
            type="text"
            placeholder="Title"
            name="title"
            value={title}
            onChange={(e) => settitle(e.target.value)}
          />
        </div>
        <button type="submit" className="px-3 py-2 bg-blue-600 rounded-lg">
          Create
        </button>
      </form>
      {allDocs?.length > 0 && (
        <>
          <h2 className="mt-2 text-xl">Or</h2>
          <h2 className="text-lg">Join the existing ones</h2>

          <div className="mt-4">
            {allDocs?.map((doc, index) => (
              <div
                key={index}
                className="w-[600px] h-fit mb-3 flex items-center justify-between"
              >
                <h2>{doc?.title}</h2>
                <button onClick={() => handleJoinDocument(doc?._id)} className="px-3 py-2 bg-blue-600 rounded-lg">
                  Join
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
