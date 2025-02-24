import  { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/config";
import { useSelector } from 'react-redux';
import { ColorRing } from "react-loader-spinner";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userData: currentUser } = useSelector((state) => state?.auth);
  
  useEffect(() => {
    document.title = "All Posts"
    const currentUserId = currentUser?.$id;

    appwriteService.getPosts(currentUserId).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
        setLoading((prev) => !prev);
      }
    });
    
  }, []);

  if(loading){
    return (
        <div className="flex justify-center">
            <ColorRing
              visible={true}
              height="200"
              width="200"
              ariaLabel="color-ring-loading"
              wrapperStyle={{}}
              wrapperClass="color-ring-wrapper"
              colors={['#000000']}
            />
      </div>
    );
  }
  
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap justify-center">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-full mobile:w-[300px]">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
