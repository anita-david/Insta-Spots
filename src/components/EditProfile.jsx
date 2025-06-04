import "../styles/EditProfile.css";
export default function EditProfile({
  isOpenProfile,
  onCloseProfile,
  name,
  setName,
  jobTitle,
  setJobTitle,
  onImageChange,
  onSubmitProfile,
}) {
  return (
    <div>
      {isOpenProfile && (
        <div className="modal-overlay">
          <div className="flex">
            <div className="modal-content">
              <p onClick={onCloseProfile} className="closeBtn">
                ❌
              </p>
              <h2>Edit Profile</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  onCloseProfile();
                }}
              >
                <label htmlFor="name">Name:</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Name"
                  className="editName"
                  required
                />
                <label htmlFor="jobTitle">Job Title</label>
                <input
                  type="text"
                  placeholder="Job Title"
                  className="editJob"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  required
                />

                <input
                  onChange={onImageChange}
                  type="file"
                  name="imageFile"
                  className="editImage"
                  accept="image/*"
                />

                <button onClick={onSubmitProfile} className="saveProfile">
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
