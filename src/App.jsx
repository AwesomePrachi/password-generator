import { useState, useCallback, useEffect, useRef} from 'react'

function App() {
  const [length, setlength] = useState(8)
  const [numAllowed, setNumAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState('')

  const passwordRef = useRef(null)

  const generatePassword = useCallback(()=>{
    let pass="";
    let string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if(numAllowed) string += "0123456789";
    if(charAllowed) string += "!@#$%^&*()_+[]{}|;:,.<>?/~`";
    for(let i=0; i<length; i++){
        let char= Math.floor(Math.random()* string.length+1)
        pass += string.charAt(char);
      }
      setPassword(pass)
    },[length, numAllowed, charAllowed, setPassword])

    const copyPassword = useCallback(()=>{
      window.navigator.clipboard.writeText(password)  
      passwordRef.current.select()  
    },[password])

    useEffect(()=>{
      generatePassword()
    },[length, numAllowed, charAllowed, generatePassword])
  
  return (
    <>
    <div className='w--full max-w-md mx-auto px-4 py-3 my-8 rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 text-white'>
      <h1 className='text-2xl text-white text-center font-serif mb-3'>🔐Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4 bg-amber-50 text-gray-700'>
          <input type="text" value={password} placeholder='password' className='outline-none w-full py-1 px-3' readOnly ref={passwordRef}/>
          <button onClick={copyPassword} className='outline-none bg-pink-700 text-white px-3 py-0.5 shrink-0 hover:bg-blue-700 '>copy</button>
        </div>
        <div className='flex flex-sm gap-x-2 mb-4'>
          <div className='flex items-center gap-x-1 mt-0.5'>
            <input type="range" name="range" min={6} max={32} value={length} className='cursor-pointer' onChange={(e)=>{setlength(e.target.value)}}/>
            <label>Length:{length}</label>&nbsp;&nbsp;
          </div>
          <div className='flex items-center gap-x-1 mt-0.5'>
            <input type="checkbox" name="checkbox" id='numInput' defaultChecked={numAllowed} onChange={()=>{setNumAllowed((prev)=>!prev)}} /> Numbers
          </div>
          <div className='flex items-center gap-x-1 mt-0.5'>
            <input type="checkbox" name="checkbox" id='charInput' defaultChecked={charAllowed} onChange={()=>{setCharAllowed((prev)=>!prev)}} /> Characters
          </div>
        </div>
      </div>
    </>
  )
}

export default App
