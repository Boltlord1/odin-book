import { AdvancedImage } from '@cloudinary/react'
import {
	ChatCircleIcon,
	HeartStraightIcon,
	ShareFatIcon
} from '@phosphor-icons/react'
import { type FunctionComponent, type MouseEventHandler, useRef, useState } from 'react'
import { Link } from 'react-router'
import getImg from '../../lib/cloudinary'
import type { PostData } from '../../types/data'
import Icon from '../general/Icon'
import Slideshow from './Slideshow'
import { backendUrl } from '../../lib/variables'

interface Props {
	post: PostData
	feed: boolean
}

const Post: FunctionComponent<Props> = ({ post, feed }) => {
  const [liked, setLiked] = useState(post.liked)
  const abortRef = useRef<AbortController | null>(null)

  const changeLiked: MouseEventHandler = async () => {
    const changed = !liked
    setLiked(changed)

    if (abortRef.current) {
      abortRef.current.abort()
    }

    const controller = new AbortController()
    abortRef.current = controller

    try {
      const response = await fetch(`${backendUrl}/post/${post.id}`, { method: changed ? 'put' : 'delete', credentials: 'include', signal: controller.signal })
			if (!response.ok) {
				throw new Error()
			}
    } catch (err: unknown) {
			if (err instanceof Error && err.name === 'AbortError') {
				return
			}

			setLiked(!changed)
			console.log('Failed to like post.')
    }
  }

	const title = <h3 className='pl-4 pr-4 font-semibold text-lg'>{post.title}</h3>
	const comments = <Icon Icon={ChatCircleIcon} text={post.comments} />

	return (
		<div className='flex flex-col gap-4'>
			<div className='flex flex-col gap-2'>
				<div className='pl-4 pr-4 flex gap-2'>
					<AdvancedImage
						cldImg={getImg(post.author.avatar)}
						className='w-8 h-8 rounded-full'
					/>
					<p className='text-lg'>{post.author.display}</p>
				</div>
				{feed ? <Link to={`/app/post/${post.id}`}>{title}</Link> : title}
				{post.images.length > 0 && <Slideshow data={post.images} />}
				{post.content && <p className='pl-4 pr-4'>{post.content}</p>}
			</div>
			<div className='pl-4 pr-4 flex gap-4'>
				<Icon
					Icon={HeartStraightIcon}
					text={liked ? post.likes + 1 : post.likes}
					divProps={{ onClick: changeLiked }}
					iconProps={{
						className: `${liked ? 'liked' : 'like'}`,
						weight: liked ? 'fill' : 'bold'
					}}
				/>
				{feed ? (
					<Link to={`/app/post/${post.id}`}>{comments}</Link>
				) : (
					comments
				)}
				<Icon Icon={ShareFatIcon} text='Share' />
			</div>
		</div>
	)
}

export default Post
