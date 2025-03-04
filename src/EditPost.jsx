import { useState,useEffect,useContext } from "react";
import { useParams, Link,useNavigate} from "react-router-dom";
import DataContext from './context/DataContext';
import api from './api/posts';
import {format} from 'date-fns';
const EditPost = ()=> {
    const [editTitle,setEditTitle]=useState('');
    const [editBody,setEditBody]=useState('');
    const { posts,setPosts}=useContext(DataContext);
    const navigate=useNavigate();
    const {id} =useParams();
    const post= posts.find(post => (post.id).toString() === id);
    useEffect(()=>{
        if(post){
            setEditTitle(post.title);
            setEditBody(post.body);
        }
    },[post,setEditTitle,setEditBody])
    //edit function
        const handleEdit = async(id)=>{
            const datetime=format(new Date(),'MMM dd,yyyy pp');
            const updatedPost={id,title: editTitle,datetime,body:editBody};
            try{
              const response=await api.put(`/posts/${id}`,updatedPost);
              setPosts(posts.map(post => post.id === id ? {...response.data}: post));
              setEditTitle('')
              setEditBody('')
              navigate('/')
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
            {post ? ( 
                <>
                    <h2>Edit Post</h2> 
                    <form className='newPostForm' onSubmit={(e)=>e.preventDefault()}>
                            <label htmlFor="post Title">Title:</label>
                            <input 
                                type="text" 
                                id='postTitle'
                                required
                                value={editTitle}
                                onChange={(e)=>setEditTitle(e.target.value)}
                            />
                            <label htmlFor="postBody">Post:</label>
                            <textarea 
                                id="postBody"
                                required
                                value={editBody}
                                onChange={(e)=>setEditBody(e.target.value)}
                            />
                            <button type='submit' onClick={()=>handleEdit(post.id)}>Submit</button>
                    </form>
                </>    
            ) : (
            
                <>
                    <h2>Post Not Found</h2>
                        <p>Well, that's disappointing</p>
                        <p>
                            <Link to='/'>Visit Our Home Page</Link>
                        </p>
                </>
            
        )}
    </main>
  )
}

export default EditPost
