import "../styles/Gallery.css";
import PreviewModal from "./PreviewModal";
export default function Gallery({ posts, setPosts,onPostClick, isOpen, onClose, post, onDelete }) {
  return (
    <div>
      <section className="gallery_container">
        <div className="gallery_grid">
          {posts.map((picture) => (
            <GalleryItem key={picture.id} post={picture} setPosts={setPosts} onClick={onPostClick} isOpen={isOpen} onClose={onClose} clickPost={post} onDelete={onDelete} />
          ))}
        </div>
      </section>
      <div className="thin-line"></div>
    </div>
  );
}
function GalleryItem({ post, setPosts, onClick, isOpen, onClose, clickPost, onDelete }) {
  const { src, alt, id } = post;
  const toggleLike = () => {
    setPosts((prev) =>
      prev.map((p) => (p.id === post.id ? { ...p, liked: !p.liked } : p))
    );
  };
  return (
    <div>
      <div className="gallery_1 .img1" onClick={() => onClick(post)}>
        <img className="img1" src={src} alt={alt} />
        <div className="content">
          <p className={id}>{alt}</p>
          <div onClick={(e) =>{e.stopPropagation(); toggleLike()}}>
            {post.liked ? (
              <i className="fa-solid fa-heart"></i>
            ) : (
              <i className="fa-regular fa-heart"></i>
            )}
          </div>
        </div>
      </div>
      <PreviewModal
        isOpen={isOpen}
        onClose={onClose}
        clickPost={clickPost}
        onDelete={onDelete}
      />
    </div>
  );
}
