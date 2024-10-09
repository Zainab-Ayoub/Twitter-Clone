import Post from "./Post";
import PostSkeleton from "../skeleton/PostSkeleton";
import { useEffect } from "react"; // Ensure to import useEffect
import { useQuery } from "@tanstack/react-query";

const Posts = ({ feedType, username, userId }) => {
	const getPostEndpoint = () => {
		switch (feedType) {
			case "forYou":
				return "/api/posts/all";
			case "following":
				return "/api/posts/following";
			case "posts":
				return `/api/posts/user/${username}`;	
			case "likes":
				return `/api/posts/likes/${userId}`;	
			default:
				return "/api/posts/all";
		}
	};

	const POST_ENDPOINT = getPostEndpoint();

	const { data: posts, isLoading, refetch, isRefetching, isError, error } = useQuery({
		queryKey: ["posts", feedType], // Add feedType to queryKey to refetch when it changes
		queryFn: async () => {
			const res = await fetch(POST_ENDPOINT);
			const data = await res.json();

			if (!res.ok) {
				throw new Error(data.error || "Something went wrong");
			}

			return data;
		},
	});

	useEffect(() => {
		refetch();
	}, [feedType, refetch, username]);

	return (
		<>
			{(isLoading || isRefetching) && (
				<div className='flex flex-col justify-center'>
					<PostSkeleton />
					<PostSkeleton />
					<PostSkeleton />
				</div>
			)}
			{isError && (
				<p className='text-red-500 text-center my-4'>{error.message}</p> // Display error message
			)}
			{!isLoading && !isRefetching && posts?.length === 0 && (
				<p className='text-center my-4'>No posts in this tab. Switch 👻</p>
			)}
			{!isLoading && !isRefetching && posts && (
				<div>
					{posts.map((post) => (
						<Post key={post._id} post={post} />
					))}
				</div>
			)}
		</>
	);
};

export default Posts;