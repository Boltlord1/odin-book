import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import routes from './routes.tsx'
import './main.css'

const root = document.getElementById('root')

if (root !== null) {
	const router = createBrowserRouter(routes)
	createRoot(root).render(
		<StrictMode>
			<RouterProvider router={router} />
		</StrictMode>
	)
}
