import { AdvancedImage } from '@cloudinary/react'
import { type FunctionComponent, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import cloudinary from '../lib/cloudinary'
import type { PostData, RawPost } from '../lib/types'
import Comment from './Comment'

const token =
	'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmZmI2NmM5ZC1hYjIxLTQ2YmMtOWE2NC1mNDkzNzQyYzI4MjciLCJ0eXBlIjoibG9naW4iLCJpYXQiOjE3NzY2MjM2MjEzNTIsImV4cCI6MTc3NjYyNDIyNjE1Mn0.Non1H_PCZ1PrIX7_63sIQMuw4r0hktsZgnVT_InvIVkh29wKe03lCBzosJcbNBW-Wf71t3rCaGbQMKLWwyW4bFTieshzSQFSOcrSEsOmujlxyGkhc-tr7PQnLIGkGH3wEKmCfV0wbs4XbqEB6i0Z_O6xDQj4dr3QCQbItybq6pIMPKw0rOReg8CsSJN03AU-te4CHEjeP6IELY77Bv40HYqcUUXumtjwRu3JYh8H2HvIFF71ufOEz88MoGgqYZhaN-2MKG4hHjbuqZgDYWhm-Xeck6o2sZP-DbhEso05lvJtXr460L2qQDl0dJSBsh-G6oLSn9NbU7Ut0u7R9b1XER_-ELVkns6hW8P_Kr70qGmPYRUGp7xvtbAu13zxiJ0LGoWwxgN34WqyuOtVwai8PIYDOGqxNadvkn2v949Bx92VpwL36RyxSiCboCD9RKZ51UnfW7cY6w5z9v2wBNjR2uzXpHnl2D2tQuDZJ_CMicSaxHgWFvzKnq-XqbS-4kS2BelQMiBA7szCdhf8kQyqnRTz-przK9CHCGO_iNANmXNQmzJXhoF_4Fk2SAi3LbK-Rxb5NSNZY5MUKd1cwXCqu68zLgT-EZUGtGC9w-7fqskpV5x-rDmxuwltPGPqEbd8tm_0oIStA5S-V328fD7-pAhf8EDQo4R0CSQnNZHyxy8'

const Post: FunctionComponent = () => {
	const { id } = useParams()
	const [post, setPost] = useState<PostData | null>(null)

	useEffect(() => {
		async function getPost() {
			const url = `http://localhost:3000/post/${id}`
			const response = await fetch(url, {
				headers: {
					authorization: token
				}
			})
			const json: RawPost = await response.json()

			const data: PostData = {
				...json,
				createdAt: new Date(json.createdAt),
				author: {
					...json.author,
					avatar: cloudinary.image(json.author.avatar)
				},
				comments: json.comments.map((c) => ({
					...c,
					author: { ...c.author, avatar: cloudinary.image(c.author.avatar) }
				}))
			}
			setPost(data)
		}
		getPost()
	}, [id])

	if (post === null) return
	return (
		<div className='p-4'>
			<div className='flex-col mb-3'>
				<div className='flex gap-2 mb-2'>
					<AdvancedImage
						cldImg={post.author.avatar}
						className='w-8 h-8 rounded-full'
					/>
					<p className='text-lg'>{post.author.display}</p>
				</div>
				<h3 className='font-semibold text-lg'>{post.title}</h3>
				<p className='ml-1'>{post.content}</p>
			</div>
			<div className='flex-col ml-2 mr-2'>
				{post.comments.map((c) => (
					<Comment key={c.id} data={c} />
				))}
			</div>
		</div>
	)
}

export default Post
