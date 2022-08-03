import Image from 'next/image'
import Nav from './components/Nav';
import { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import CardImage from './components/CardImage';
export default function Home() {
  const inputTitle = useRef();
  const inputContent = useRef();
  const inputImage = useRef();

  const [todolist, setTodo] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/todo')
      .then(response => {
        if (response.data.length > 0) {

          setTodo(prev => response.data)

        }
      })
      .catch((error) => {
        console.log(error);
      })
  }, []);

  console.log(todolist)

  const handleDelete = (id) => {
    //delete post
    axios.post('http://localhost:5000/todo/delete', id)
      .then(res => console.log(res.data));

    //reGet post from databse  
    axios.get('http://localhost:5000/todo')
      .then(response => {
        if (response.data.length > 0) {
          setTodo(prev => response.data)
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }






  function submitHandler(e) {
    e.preventDefault();
    if (inputContent.current.values == '' || inputTitle.current.value == '' || inputImage.current.value == '') {
      console.log('you must fill all of the inputs ')
      return;
    }
    setTodo((prev) => [
      {
        title: inputTitle.current.value,
        content: inputContent.current.value,
        img: inputImage.current.value

      },
      ...prev,
    ])


    const todo = {
      title: inputTitle.current.value,
      content: inputContent.current.value,
      img: inputImage.current.value
    }
    axios.post('http://localhost:5000/todo/add', todo)
      .then(res => console.log(res.data));
  }
  return (
    <div className='container mx-auto my-1  text-center '>
      <form onSubmit={submitHandler} className='my-3 mx-auto px-4'>
        <input ref={inputTitle} placeholder='write note title here ... ' className=' my-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />
        <input ref={inputContent} type="textarea" placeholder='write note contant here ... ' className=' my-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />
        <input ref={inputImage} placeholder='put the image link here ... ' className=' my-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />
        <button className=' dark:bg-gray-900 hover:bg-red-800 text-white font-bold py-2  px-10  rounded' >Add</button>
      </form>
      <div className=' grid md:grid-cols-3 sm:grid-cols-1 gap-4 rounded justify-center ' >

        {
          todolist.map((item) => <CardImage data={item} key={item._id} handleDelete={handleDelete} />)
        }
      </div>


    </div >
  )
}
