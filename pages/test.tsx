import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function TestUs(props: any) {
	return (
		<section>
			<Link to={'/test/about'}>

				Lorem ipsum dolor sit amet, consectetur adipiscing elit. 

      </Link>
			<div>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
				Integer vitae mauris arcu, eu pretium nisi. Praesent fringilla ornare ullamcorper. 
				Pellentesque diam orci, sodales in blandit ut, placerat quis felis. 
				Vestibulum at sem massa, in tempus nisi. 
				Vivamus ut fermentum odio. Etiam porttitor faucibus volutpat. 
				Vivamus vitae mi ligula, non hendrerit urna. Suspendisse potenti. 
				Quisque eget massa a massa semper mollis.
			</div>
      <Outlet></Outlet>
		</section>
	)
}
