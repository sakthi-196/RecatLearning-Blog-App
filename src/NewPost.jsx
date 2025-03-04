import { useState,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {format, set} from 'date-fns';
import api from './api/posts'
import DataContext from './context/DataContext';
const NewPost = () => {
  const [postTitle,setPostTitle]=useState('');
  const [postBody,setPostBody]=useState('');
  const { posts,setPosts}= useContext(DataContext);
  const navigate=useNavigate();
  //submit function
      const handleSubmit =async (e)=>{
          e.preventDefault();
          const id= posts.length ? posts[posts.length -1].id + 1 : 1;
          const datetime=format(new Date(),'MMM dd,yyyy pp');
          const newPost={id,title: postTitle,datetime,body:postBody};
          try{
            const response=await api.post('/posts',newPost);
            const allPosts=[...posts,response.data];
            setPosts(allPosts);
            setPostTitle('');
            setPostBody('');
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

    <main className='NewPost'>
       <h2>NewPost</h2> 
       <form className='newPostForm' onSubmit={handleSubmit}>
            <label htmlFor="post Title">Title:</label>
            <input 
                type="text" 
                id='postTitle'
                required
                value={postTitle}
                onChange={(e)=>setPostTitle(e.target.value)}
            />
            <label htmlFor="post Body">Post:</label>
            <textarea 
                name="" 
                id="postBody"
                required
                value={postBody}
                onChange={(e)=>setPostBody(e.target.value)}
            />
            <button type='submit'>Submit</button>
       </form>
    </main>
  )
}

export default NewPost
