import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'
import styled from 'styled-components'

const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  if (list) {
    return JSON.parse(localStorage.getItem('list'))
  }
  else {
    return []
  }
}

function App() {
  const [name, setName] = useState('')
  const [list, setList] = useState(getLocalStorage)
  const [isEditing, setIsEditing] = useState(false)
  const [editId, setEditId] = useState(null)
  const [alert, setAlert] = useState({ show: false, msg: '', type: '' })
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name) {
      // display alert
      showAlert(true, 'danger', 'please enter value')
    } else if (name && isEditing) {
      setList(list.map((item) => {
        if (item.id === editId) {
          return { ...item, title: name }
        }
        return item
      }))
      setName('');
      setEditId(null);
      setIsEditing(false);
      showAlert(true, 'success', 'value changed')
    } else {
      showAlert(true, 'success', 'item added to the list')
      const newItem = { id: new Date().getTime().toString(), title: name }
      setList([...list, newItem])
      setName('')
    }
  }

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg })
  }

  const clearList = () => {
    showAlert(true, 'danger', 'empty list')
    setList([])
  }

  const removeItem = (id) => {
    showAlert(true, 'danger', 'item removed')
    setList(list.filter((item) => item.id !== id))
  }

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id)
    setIsEditing(true)
    setEditId(id)
    setName(specificItem.title)
  }

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
  }, [list])
  return (
    <Wrapper>
      <section className="section-center">
        <form className='grocery-form' onSubmit={handleSubmit}>
          {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
          <h3>grocery bud</h3>
          <div className="form-control">
            <input
              type="text"
              value={name}
              placeholder="eg. eggs"
              onChange={(e) => setName(e.target.value)}
            />
            <button type="submit" className="submit-btn">{
              isEditing ? 'edit' : 'submit'
            }</button>
          </div>
        </form>
        {
          list.length > 0 && (
            <div className="grocery-container">
              <List items={list} removeItem={removeItem} editItem={editItem} />
              <button className='clear-btn' onClick={clearList}>clear items</button>
            </div>
          )
        }
      </section>
    </Wrapper>
  )
}
const Wrapper = styled.section`
.section-center{
text-align: center;
background: var(--clr-white);
padding: 1.5rem 2rem;
border-radius: var(--radius);
transition: var(--transition);
}
.section-center:hover{
  box-shadow: var(--light-shadow);
}

h3{
  margin-bottom: 1rem;
}
.form-control{
 input{
   width: 70%;
   font-size: 1.2rem;
   border-color: transparent;
   border-top-left-radius: var(--radius);
   border-bottom-left-radius: var(--radius);
   background: var(--clr-grey-10);
   padding: 0.25rem 0.5rem;
 }
 button{
   font-size: 1.2rem;
   border-color: transparent;
   background: var(--clr-primary-5);
   border-top-right-radius: var(--radius);
   border-bottom-right-radius: var(--radius);
   color: var(--clr-white);
   text-transform: capitalize;
   cursor: pointer;
   padding: 0.25rem 0.5rem;
 }
 padding-bottom: 2rem;
}

form{
  margin-bottom: 1rem;
}

.clear-btn{
  font-size: 1rem;
  text-transform: capitalize;
  color: var(--clr-red-dark);
  cursor: pointer;
  background: transparent;
  border-color: transparent;
  letter-spacing: var(--spacing);
}

`

export default App
