import Feed from './Feed.jsx';
import { useContext } from 'react';
import DataContext from './context/DataContext';
const Home = () => {
  const {searchResults,fetchError,isLoading}= useContext(DataContext);
  return (
    <main className="Home">
      {/*the following step is for the usual fetch API*/}
      {/* {posts.length ? (
        <Feed posts={posts} />
       ) : (
        <p style={{marginTop: '2rem'}}>
            No posts to display
        </p>
      )} */}
      {/* this following is for customHook useAxiosFetch */}
      {isLoading && <p className='statusMsg'>Loading posts...</p>}
      {!isLoading && fetchError && <p className='statusMsg' style={{color: "red"}}>{fetchError}</p>}
      {!isLoading && !fetchError && (searchResults.length ? <Feed posts={searchResults} /> : <p className='statusMsg'>No posts to display</p>)}
    </main>
  )
}

export default Home
