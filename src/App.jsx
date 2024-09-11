
import Comment from './components/CommentSection'
// import './index.css'
function App() {
  return (
    <>
      <div id='app' className='min-h-screen h-auto min-w-screen w-full bg-zinc-600 '>
        <div id='innerapp' className='min-h-screen h-auto min-w-screen w-full bg-zinc-600 '>
        <Comment />
        </div>
      </div>
    </>
  )
}
export default App
