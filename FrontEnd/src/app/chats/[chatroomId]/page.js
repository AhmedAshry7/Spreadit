"use client";
import Image from "next/image";
import styles from "../page.module.css";
import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import apiHandler from "../../utils/apiHandler";
import getCookies from "@/app/utils/getCookies";
import { useRouter } from "next/navigation";
import leaveIcon from "../../assets/post-images/hide.svg";
import gearIcon from "../../assets/gear.svg";
import addIcon from "../../assets/person-add.svg";
import aboutIcon from "../../assets/info-circle.svg";
import ChatUsers from "../../components/UI/ChatUsers";
import { app, firestore } from "../../../../lib/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import ChatRoom from "../../components/UI/ChatRoom";
import PostDropDownMenu from "../../components/post/PostDropDownMenu";
import PostDropDownItem from "../../components/post/PostDropDownItem";
import toast from "react-hot-toast";
import Blockmute from "@/app/components/UI/Blockmute";
import Blockedmuted from "@/app/components/UI/Blockedmuted";
import UserCard from "@/app/components/UI/UserCard";
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  orderBy,
  updateDoc,
} from "firebase/firestore";

const Home = ({ params: { chatroomId } }) => {
  const router = useRouter();
  const auth = getAuth(app);
  const [user, setUser] = useState(null);
  const [selectedChatroom, setSelectedChatroom] = useState(null);
  const [showRightBar, setShowRightBar] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [users, setUsers] = useState([]);
  const [addedUsers, setAddedUsers] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (!chatroomId) return;

    const fetchChatroom = async () => {
      try {
        if (!user) {
          return;
        }
        const chatroomRef = doc(firestore, "chatrooms", chatroomId);
        const snapshot = await getDoc(chatroomRef);
        const chatroomDoc = snapshot.data();

        if (snapshot.exists()) {
          const chatroomData = {
            id: snapshot.id,
            myData: user,
            usersData: chatroomDoc.usersData,
            users: chatroomDoc.users,
            groupname: chatroomDoc.groupname,
          };
          setSelectedChatroom(chatroomData);
          
        } else {
          
          setSelectedChatroom(null);
        }
      } catch (error) {
        console.error("Error fetching chatroom:", error);
      }
    };
    fetchChatroom();
    // No need for cleanup since this useEffect doesn't set any listeners
  }, [chatroomId, user]);

  useEffect(() => {
    async function cookiesfn() {
      const cookies = await getCookies();
      if (cookies !== null && cookies.access_token && cookies.username) {
        setUsername(cookies.username);
      } else {
        router.push("/login");
      }
    }
    cookiesfn();
  }, []);

  useEffect(() => {
    const tasksQuery = query(collection(firestore, "users"));

    const unsubscribe = onSnapshot(tasksQuery, (snapshot) => {
      const users = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setUsers(users);
    });
    return () => unsubscribe();
  }, []);

  const addToChatRoom = async () => {
    try {
      const chatroomRef = doc(firestore, "chatrooms", selectedChatroom.id);

      // Update the users array with the new users
      const updatedChatroom = {
        users: [
          ...selectedChatroom.users,
          ...addedUsers.map((User) => User.id),
        ],
      };
      await updateDoc(chatroomRef, updatedChatroom);

      // Update the usersData object with the new user objects
      const newUsersData = { ...selectedChatroom.usersData };
      addedUsers.forEach((User) => {
        newUsersData[User.id] = {
          name: User.name,
          avatarUrl: User.avatarUrl,
          email: User.email,
        }; // Assuming user.id is unique
      });

      const updatedChatroomData = { usersData: newUsersData };
      await updateDoc(chatroomRef, updatedChatroomData);

      // Reset addedUsers state
      setAddedUsers([]);
    } catch (error) {
      console.error("Error adding users to chatroom:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(firestore, "users", user.uid);
        const userSnap = await getDoc(userRef);
        const userData = { id: userSnap.id, ...userSnap.data() };
        setUser(userData);
        
      } else {
        setUser(null);
        
      }
    });
    return () => unsubscribe();
  }, [auth, router]);

  const onSelect = (data) => {
    setSelectedChatroom(data);
    router.push(`/chats/${data.id}`);
  };

  function toggleDropdown() {
    setShowDropdown((prevShowDropdown) => !prevShowDropdown);
  }

  const handleAbout = () => {
    setShowDropdown(false);
    setShowAdd(false);
    setShowRightBar(true);
    setShowAbout(true);
  };

  const handleLeave = async () => {
    try {
      const chatroomRef = doc(firestore, "chatrooms", selectedChatroom.id);

      // Remove the current user's ID from the users array
      const updatedUsers = selectedChatroom.users.filter(
        (userId) => userId !== user.id,
      );
      const updatedChatroom = { users: updatedUsers };
      await updateDoc(chatroomRef, updatedChatroom);

      // Remove the current user's data from the usersData object
      const newUsersData = { ...selectedChatroom.usersData };
      delete newUsersData[user.id];
      const updatedChatroomData = { usersData: newUsersData };
      await updateDoc(chatroomRef, updatedChatroomData);

      // Navigate back to the main page or some other appropriate page
      router.push("/chats");
    } catch (error) {
      console.error("Error leaving chat:", error);
    }
  };

  const handleInvite = () => {
    setShowDropdown(false);
    setShowAbout(false);
    setShowRightBar(true);
    setShowAdd(true);
  };

  const handleStart = (event) => {
    event.preventDefault();
    if (addedUsers.length !== 0) {
      addToChatRoom();
    }
  };

  const addProfile = (newName) => {
    if (newName === username) {
      toast.error("this is your acount");
      return;
    }
    
    if (selectedChatroom && selectedChatroom.usersData) {
      const userExists = Object.values(selectedChatroom.usersData).some(
        (userData) => userData.name === newName,
      );
      if (userExists) {
        toast.error("This user is already in the chatroom");
        return;
      }
    }
    const newAddedUsers = [
      ...addedUsers,
      users.find((user) => user.name === newName),
    ].filter(Boolean);
    setAddedUsers(newAddedUsers);
  };

  const removeProfile = async (nameToRemove) => {
    const newAddedUsers = addedUsers.filter(
      (user) => user.name !== nameToRemove,
    );
    setAddedUsers(newAddedUsers);
  };

  const handleCloseRightbar = () => {
    setShowDropdown(false);
    setShowRightBar(false);
    setShowAdd(false);
    setShowAbout(false);
  };
  const isButtonDisabled = addedUsers.length == 0;

  return (
    <div className={styles.page}>
      <div className={styles.leftbar}>
        <ChatUsers
          selectedChatroom={selectedChatroom}
          onSelect={onSelect}
          userData={user}
        />
      </div>
      <div className={showRightBar ? styles.divided : styles.mainbar}>
        <div className={styles.topbar}>
          <h5>
            {selectedChatroom?.groupname !== ""
              ? selectedChatroom?.groupname
              : selectedChatroom?.usersData[
                  selectedChatroom?.users.find((id) => id !== user?.id)
                ].name}
          </h5>
          {selectedChatroom?.groupname !== "" && (
            <div className={styles.dropdowncontainer}>
              <Image
                src={gearIcon}
                className={styles.icons}
                onClick={toggleDropdown}
              />

              <PostDropDownMenu
                showDropdown={showDropdown}
                setShowDropDown={setShowDropdown}
              >
                <PostDropDownItem
                  icon={aboutIcon}
                  iconAlt="about icon"
                  description="About"
                  onClick={handleAbout}
                />
                <PostDropDownItem
                  icon={addIcon}
                  iconAlt="add Icon"
                  description="Invite"
                  onClick={handleInvite}
                />
                <PostDropDownItem
                  icon={leaveIcon}
                  iconAlt="Leave Icon"
                  description="Leave Chat"
                  onClick={handleLeave}
                />
              </PostDropDownMenu>
            </div>
          )}
        </div>
        <ChatRoom selectedChatroom={selectedChatroom} user={user} />
      </div>
      {showRightBar && (
        <div className={styles.rightbar}>
          {showAdd && (
            <div className={styles.rowflex}>
              <div className={styles.pageheader}>
                <div className={styles.righttitle}>
                  <h5>Add to group</h5>
                  <button
                    className={styles.Xbutton}
                    onClick={handleCloseRightbar}
                  >
                    X
                  </button>
                </div>
                <Blockmute
                  type=""
                  description=""
                  onAdd={(newName) => addProfile(newName)}
                  inputmsg="Type username(s)"
                />
                {addedUsers.map((profile, index) => (
                  <Blockedmuted
                    key={index}
                    profilename={profile.name}
                    path={2}
                    onRemove={removeProfile}
                  />
                ))}
              </div>
              <button
                className={styles.addbutton}
                disabled={isButtonDisabled}
                onClick={handleStart}
              >
                Add
              </button>
            </div>
          )}
          {showAbout && (
            <div className={styles.rowflexinfo}>
              <div className={styles.pageheader}>
                <div className={styles.righttitle}>
                  <h5>Chat information</h5>
                  <button
                    className={styles.Xbutton}
                    onClick={handleCloseRightbar}
                  >
                    X
                  </button>
                </div>
                <div className={styles.groupcontainer}>
                  <h4>Group Name</h4>
                  <h6>{selectedChatroom?.groupname}</h6>
                </div>
                <div className={styles.groupcontainer}>
                  <h6>
                    {Object.keys(selectedChatroom.usersData).length} Members
                  </h6>
                </div>
                <div className={styles.userscontainers}>
                  {selectedChatroom.usersData &&
                    Object.values(selectedChatroom.usersData).map((user) => (
                      <div
                        key={user.id}
                        onClick={() => {
                          router.push(`/profile/${user.name}`);
                        }}
                      >
                        <UserCard
                          name={user.name}
                          profilePicture={user.avatarUrl}
                          latestMessageText=""
                          isSelected={false}
                          display={true}
                        />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
