import  { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/config";
import { useSelector } from 'react-redux';

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const { userData: currentUser } = useSelector((state) => state?.auth);
  
  useEffect(() => {
    document.title = "All Posts"
    const currentUserId = currentUser?.$id;

    appwriteService.getPosts(currentUserId).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
    
  }, []);
  
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
