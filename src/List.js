import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
import styled from 'styled-components'
const List = ({ items, removeItem, editItem }) => {
  return (
    <Wrapper>
      <div className="grocery-list">
        {
          items.map((item) => {
            const { id, title } = item;
            return <article key={id} className="grocery-item">
              <p className="title">{title}</p>
              <div className="btn-container">
                <button type='button' className="edit-btn" onClick={() => editItem(id)}>
                  <FaEdit />
                </button>
                <button type='button' className="delete-btn" onClick={() => { removeItem(id) }}>
                  <FaTrash />
                </button>
              </div>
            </article>
          })
        }
      </div>
    </Wrapper>
  )
}
const Wrapper = styled.section`
.grocery-item{
 display: flex;
 justify-content: space-between;
 transition: var(--transition);
 padding-left: 1rem;
 padding-right: 1rem;
 border-radius: var(--radius);
 margin-bottom: 0.5rem;
}
.title{
  text-transform: capitalize;
  color: var(--clr-grey-1);
  letter-spacing: var(--spacing);
  margin-top: 0;
  margin-bottom: 0;
}
.edit-btn,.delete-btn{
  border-color: transparent;
  background: transparent;
}
.edit-btn{
  margin-right: 0.1rem;
  color: var(--clr-green-light);
  cursor: pointer;
}
.delete-btn{
  color: var(--clr-red-dark);
  cursor: pointer;
}
.grocery-item:hover{
  background: var(--clr-grey-10);
}
.grocery-list{
  margin-bottom: 1rem;
}
`
export default List
