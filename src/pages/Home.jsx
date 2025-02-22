import {useEffect, useState} from 'react'
import appwriteService from "../appwrite/config";
import {Container, MobileNavBar, PostCard } from '../components'
import { useSelector } from 'react-redux';


function Home() {
    const [posts, setPosts] = useState([]);
    const { userData: currentUser } = useSelector((state) => state?.auth);
    const { status } = useSelector((state) => state?.auth);

    useEffect(() => {
       
        document.title = "Home"

        const currentUserId = currentUser?.$id;

        appwriteService.getPosts(currentUserId).then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])
    

    
    if(!status){
        return (
        <div className="w-full py-8 mt-4 text-center">
            <Container>
                <div className="flex flex-wrap">
                    <div className="p-2 w-full">
                        <h1 className="text-2xl font-bold text-white">
                            Login to read posts
                        </h1>
                    </div>
                </div>
            </Container>
        </div>
        )
    }

    else if(posts.length === 0){
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold text-white">
                                No post yet
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap justify-center'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-full mobile:w-[300px]'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home