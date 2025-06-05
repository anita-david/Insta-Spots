import Footer from "./Footer.jsx";
import Profile from "./Profile.jsx";
import Gallery from "./Gallery.jsx";
import Header from "./Header.jsx";
import { pictures } from "../../public/data.jsx";
import { useEffect, useState } from "react";

export default function App() {
  const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem("posts");
    return saved ? JSON.parse(saved) : pictures;
  });
  useEffect(()=> {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  function handleOpenPreview(post) {
    setSelectedPost(post);
    setIsPreviewOpen(true);
  }
  function handleClosePreview() {
    setSelectedPost(null);
    setIsPreviewOpen(false);
  }
  function handleDeletePost(id) {
    setPosts((prev) => prev.filter((post) => post.id !== id));
    handleClosePreview();
  }
  return (
    <div>
      <Header />
      <Profile  setPosts={setPosts} />
      <Gallery posts={posts} setPosts={setPosts} onPostClick={handleOpenPreview}
      isOpen={isPreviewOpen}
        onClose={handleClosePreview}
        post={selectedPost}
        onDelete={handleDeletePost} />
      <Footer />
    </div>
  );
}
