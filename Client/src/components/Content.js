import React from 'react'
import ContentFooter from './ContentFooter'
import Todo from './Todo'

function Content() {
  return (
    <section className="main">
		<input className="toggle-all" type="checkbox" />
		<label htmlFor="toggle-all">
			Mark all as complete
		</label>
	
    <Todo/>
    <ContentFooter/>
	</section>

  )
}

export default Content