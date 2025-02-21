
import { useEffect } from 'react';
import { Container, PostForm } from '../components'


function AddPost() {
  console.log('IN ADD POST: ')
   useEffect(() => {
      document.title = "Add Post"
    }, []);
  return (
    <div className='py-8'>
        <Container>
            <PostForm />
        </Container>
    </div>
  )
}

export default AddPost