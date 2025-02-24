import {useEffect, useState} from 'react'
import {Container, PostForm, Button} from '../components'
import appwriteService from "../appwrite/config";
import { useNavigate,  useParams } from 'react-router-dom';

function EditPost() {
    const [post, setPosts] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()
    const handlerRoute = () => {
        navigate('/');
    }

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    setPosts(post)
                }
            })
        } else {
            navigate('/')
        }
    }, [slug, navigate])
  return post ? (
    <div className='py-8'>
        <Container>
            <PostForm post={post} />
            <button onClick={handlerRoute} className='w-full mt-2 bg-blue-500 text-white rounded-lg px-4 py-2'>Cancel</button>
        </Container>
    </div>
  ) : null
}

export default EditPost