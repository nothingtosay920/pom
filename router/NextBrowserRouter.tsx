/* eslint-disable */
import React from 'react'
import { Router } from 'react-router-dom'
import { StaticRouter } from 'react-router-dom/server'
import { Update } from 'history'
import { createNextHistory, MemoryHistoryInstance } from './createNestHistory'

interface CustomBrowserRouterProps {
	asPath: string
}
function NextBrowserRouter({ children, asPath }: React.PropsWithChildren<CustomBrowserRouterProps>) {
	
	if (typeof window !== 'undefined') {
		console.log('history router');
		
		const historyRef = React.useRef<MemoryHistoryInstance>()

		if (historyRef.current == null) {
			historyRef.current = createNextHistory(asPath)
			historyRef.current.listen(update => dispatch(update))
		}

		const history = historyRef.current

		const [state, dispatch] = React.useReducer((_: Update, action: Update) => action, {
			action: history.action,
			location: history.location,
		})
		
		return (
			<Router navigationType={state.action} location={state.location} navigator={history}>
				{children}
			</Router>
		)
    
	} else {
		console.log('static router');
		
		return <StaticRouter location={asPath}>{children}</StaticRouter>
	}
}

export default NextBrowserRouter
