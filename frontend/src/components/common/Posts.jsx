import Post from "./Post";
import PostSkeleton from "../skeleton/PostSkeleton";
import { POSTS } from "../../utils/db/dummy";

const Posts = ({feedType}) => {
	const isLoading = false;

	const getPostEndpoint = () => {
		switch (feedType) {
			case "forYou":
			  return "/api/posts/all";
			case "following":
			  return "/api/posts/following";
			default:
			  return "/api/posts/all";
		}
	}

	return (
		<>
			{isLoading && (
				<div className='flex flex-col justify-center'>
					<PostSkeleton />
					<PostSkeleton />
					<PostSkeleton />
				</div>
			)}
			{!isLoading && POSTS?.length === 0 && <p className='text-center my-4'>No posts in this tab. Switch 👻</p>}
			{!isLoading && POSTS && (
				<div>
					{POSTS.map((post) => (
						<Post key={post._id} post={post} />
					))}
				</div>
			)}
		</>
	);
};
export default Posts;