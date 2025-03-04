import { useParams,Link,useNavigate} from 'react-router-dom'
import { useContext } from 'react';
import api from './api/posts';
import DataContext from './context/DataContext';
const PostPage = () => {
  const {posts,setPosts}= useContext(DataContext);
  const {id}= useParams();
  const navigate=useNavigate();
  const post=posts.find(post => (post.id).toString() === id);  
  //Delete function
      const handleDelete=async (id)=>{
          try{
            const response=await api.delete(`/posts/${id}`)
            const postList =posts.filter(post => post.id !== id);
            setPosts(postList);
            navigate('/');
          }catch(err){
            if(err.response){
              //Not in the 200 response range
              console.log(err.response.data);
              console.log(err.response.status);
              console.log(err.response.headers);
            }else{
              console.log(`Error:${err.message}`)
            }
          } 
      }
  return (
    <main className='PostPage'>
      <article className='post'>
        {post && 
            <>
                <h2>{post.title}</h2>
                <p className="postDate">{post.datetime}</p>
                <p className='postBody'>{post.body}</p>
                <Link to={`/edit/${post.id}`}>
                  <button className='editButton'>
                    Edit Post
                  </button>
                </Link>
                <button className='deleteButton' onClick={()=>handleDelete(post.id)}>
                    Delete Post
                </button>
            </>
        }
        {!post && 
            <>
                <h2>Post Not Found</h2>
                <p>Well, that's disappointing</p>
                <p>
                    <Link to='/'>Visit Our Home Page</Link>
                </p>
            </>

        }
      </article>
    </main>
  )
}

export default PostPage
