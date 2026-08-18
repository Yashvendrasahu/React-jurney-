import { useState } from 'react'
import './App.css'

function App() {
  const [color, setColor] = useState('red')

  return (
    <div
      className='w-full h-screen duration-200'
      style={{ backgroundColor: color }}
    >
      <div className='fixed flex flex-wrap justify-center bottom-12 inset-x-0 px-2'>
        <div className='flex flex-wrap justify-center gap-3 shadow-sm bg-white px-4 py-2 rounded-full'>
          <button
            onClick={() => setColor('red')}
            className='outline-none px-4 py-1 rounded-full text-white shadow-lg'
            style={{ backgroundColor: 'red' }}
          >
            Red
          </button>

          <button
            onClick={() => setColor('blue')}
            className='outline-none px-4 py-1 rounded-full text-white shadow-lg'
            style={{ backgroundColor: 'blue' }}
          >
            Blue
          </button>
          
          <button
            onClick={() => setColor('yellow')}
            className='outline-none px-4 py-1 rounded-full text-white shadow-lg'
            style={{ backgroundColor: 'yellow' }}
          >
            yellow
          </button>
          
          <button
            onClick={() => setColor('orange')}
            className='outline-none px-4 py-1 rounded-full text-white shadow-lg'
            style={{ backgroundColor: 'orange' }}
          >
            orange
          </button>
          
          <button
            onClick={() => setColor('purple')}
            className='outline-none px-4 py-1 rounded-full text-black shadow-lg'
            style={{ backgroundColor: 'purple' }}
          >
            purple
          </button>
          
          
          <button
            onClick={() => setColor('pink')}
            className='outline-none px-4 py-1 rounded-full text-white shadow-lg'
            style={{ backgroundColor: 'pink' }}
          >
            pink
          </button>
          
          
          <button
            onClick={() => setColor('black')}
            className='outline-none px-4 py-1 rounded-full text-white shadow-lg'
            style={{ backgroundColor: 'black' }}
          >
            Black
          </button>
          
          
          <button
            onClick={() => setColor('white')}
            className='outline-none px-4 py-1 rounded-full text-black shadow-lg'
            style={{ backgroundColor: 'white' }}
          >
            white
          </button>
          
          
          <button
            onClick={() => setColor('gray')}
            className='outline-none px-4 py-1 rounded-full text-white shadow-lg'
            style={{ backgroundColor: 'gray' }}
          >
            gray
          </button>
        </div>
      </div>
    </div>
  )
}

export default App