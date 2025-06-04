import "../styles/NewPost.css";
import { useState } from "react";
export default function NewPost({ isOpenPost, onClosePost, setPosts }) {
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  function handleSubmit(e) {
    e.preventDefault();

    let imgSrc = "";

    if (imageFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        imgSrc = reader.result;

        setPosts((prev) => [
          ...prev,
          {
            id: Date.now(),
            src: imgSrc,
            alt: description,
            liked: false,
          },
        ]);
        resetForm();
      };
      reader.readAsDataURL(imageFile);
    } else if (imageUrl) {
      imgSrc = imageUrl;
      setPosts((prev) => [
        ...prev,
        {
          id: Date.now(),
          src: imgSrc,
          alt: description,
          liked: false,
        },
      ]);
      resetForm();
    }
  }
  function resetForm() {
    setDescription("");
    setImageFile(null);
    setImageUrl("");
		onClosePost();
  }
  return (
    <div>
      {isOpenPost && (
        <div className="modal-overlay">
          <div className="newPostDialog">
            <button
              onClick={onClosePost}
              type="button"
              className="closeDialog"
              style={{ float: "right" }}
            >
              ✖
            </button>
            <div className="wrapperrr">
              <h2>New Post</h2>
              <span style={{ fontSize: "1rem" }}>
                Upload Image or Paste URL
              </span>
              <form className="formm" classNameName="newPostForm">
                <input
                  type="text"
									value={description}
									onChange={(e) => setDescription(e.target.value)}
                  name="text"
                  placeholder="Enter name"
                  required
                />
                <input
                  type="file"
                  name="imageFile"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files[0])}
                />
                <input
                  type="url"
                  name="imageUrl"
                  placeholder="Image URL"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
                <button
                  onClick={handleSubmit}
                  className="submitBtn"
                  type="submit"
                >
                  Add Card
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
