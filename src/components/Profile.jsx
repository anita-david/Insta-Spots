import "../styles/Profile.css";
import EditProfile from "./EditProfile";
import NewPost from "./NewPost";
import { useState } from "react";
export default function Profile({ setPosts}) {
  const [isOpenPost, setIsOpenPost] = useState(false);
  const [isOpenProfile, setIsOpenProfile] = useState(false);
  const [name, setName] = useState(
    () => localStorage.getItem("profileName") || "Bessie Coleman"
  );
  const [jobTitle, setJobTitle] = useState(
    () => localStorage.getItem("profileJobTitle") || "Civil Aviator"
  );
  const [preview, setPreview] = useState(
    () => localStorage.getItem("profileImage") || null
  );

  const [image, setImage] = useState("./Assets/images/Bessie-Coleman.png");
  function handleOpenModal() {
    setIsOpenPost(true);
  }
  function handleCloseModal() {
    setIsOpenPost(false);
  }
  

  function handleOpenProfile() {
    setIsOpenProfile(true);
  }
  function handleCloseProfile() {
    setIsOpenProfile(false);
  }
  function handleSubmitProfile() {
    localStorage.setItem("profileName", name);
    localStorage.setItem("profileJobTitle", jobTitle);
    if (preview) localStorage.setItem("profileImage", preview);
    handleImageChange();
    handleCloseProfile();
  }
  function handleImageChange(e) {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result); // base64 image string
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  }

  return (
    <div>
      <section className="profile">
        <img
          className="profileImage"
          src={preview || image}
          alt="Profile Image"
        />
        <div className="profileDetails">
          <div className="profileNameAndJob">
            <h2 className="profileName">{name}</h2>
            <p className="profileJobTitle">{jobTitle}</p>
          </div>
          <p className="profileEdit" onClick={handleOpenProfile}>
            <img
              className="EditIcon"
              src={"./icons/Edit-Profile-Icon-Light.svg"}
              alt="Edit Image Icon"
            />
            Edit Profile
          </p>
        </div>
        <button onClick={handleOpenModal} className="profileBtn">
          <img
            className="newPostIcon"
            src="./icons/New-Post-Icon.svg"
            alt="New Post Icon"
          />
          New Post
        </button>
        <NewPost
          isOpenPost={isOpenPost}
          onClosePost={handleCloseModal}
          onOpenPost={handleOpenModal}
          setPosts={setPosts}
        />
        <EditProfile
          isOpenProfile={isOpenProfile}
          onCloseProfile={handleCloseProfile}
          onSubmitProfile={handleSubmitProfile}
          onOpenProfile={handleOpenProfile}
          name={name}
          setName={setName}
          jobTitle={jobTitle}
          setJobTitle={setJobTitle}
          image={image}
          setImage={setImage}
          onImageChange={handleImageChange}
          preview={preview}
        />
      </section>
      <div className="thin-line"></div>
    </div>
  );
}
