import {useEffect, useState} from 'react'
import appwriteService from "../appwrite/config";
import {Container, PostCard } from '../components'
import { useSelector } from 'react-redux';
import EmptyPost  from "../assets/EmptyPost.png"
import { ColorRing } from "react-loader-spinner";


function Home() {
    const [posts, setPosts] = useState([]);
    const { userData: currentUser } = useSelector((state) => state?.auth);
    // console.log(currentUser)
    const { status } = useSelector((state) => state?.auth);
    const [loading, setLoading] = useState(true);
    console.log('all posts', posts);
    
    useEffect(() => {
       
        document.title = "Home"

        // const currentUserId = currentUser?.$id;

        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents);
                setLoading(false);
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
                            Login to read posts or Sign up to create posts
                        </h1>
                    </div>
                </div>
            </Container>
        </div>
        )
    }

    else if(loading){
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

    else if(posts.length === 0){
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-col flex-wrap items-center gap-y-4">
                        <img src={EmptyPost} alt="" className='h-[200px] w-[200px]' />
                        <p className='text-xl text-white font-bold'>Empty</p>
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <div className='w-full py-8'>
            <Container>
                {currentUser && <div className='mb-8'>
                    <p className='text-xl text-white font-bold'>Hi, {currentUser.name}</p>
                </div>}
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