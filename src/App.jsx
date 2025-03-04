import Layout from './Layout.jsx';
import Home from './Home.jsx';
import NewPost from './NewPost.jsx';
import PostPage from './PostPage.jsx';
import EditPost from './EditPost.jsx';
import About from './About.jsx';
import Missing from './Missing.jsx';
import {Route,Routes} from 'react-router-dom';

function App() {
  
  return (
    <div className='App'>
      
        <Routes>
          <Route  path='/' element={<Layout/>}>
            <Route index element={<Home />} />
            <Route path='post'>
              <Route index element ={<NewPost/>} />
              <Route path=':id' element={<PostPage/>} />
            </Route> 
            <Route path='/edit/:id' element ={<EditPost/>} />
            <Route path='about' element={<About />}/>
            <Route path='*' element={<Missing />} />
          </Route>  
        </Routes>
       
    </div>  
  )
}

export default App

