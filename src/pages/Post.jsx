import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
	const [post, setPost] = useState(null);
	console.log("IN POST post: ", post);
	const { slug } = useParams();
	const navigate = useNavigate();

	const userData = useSelector((state) => state.auth.userData);

	const isAuthor = post && userData ? post.userId === userData.$id : false;

	useEffect(() => {
		let postTitle = post?.title;
		if (postTitle === undefined) {
			postTitle = "amazing";
		}
		document.title = `${postTitle}-post`;
		if (slug) {
			appwriteService.getPost(slug).then((post) => {
				if (post) setPost(post);
				else navigate("/");
			});
		} else navigate("/");
	}, [slug, navigate]);

	const deletePost = () => {
		appwriteService.deletePost(post.$id).then((status) => {
			if (status) {
				appwriteService.deleteFile(post.featuredImage);
				navigate("/");
			}
		});
	};

	return post ? (
		<div className="relative py-4">
			{isAuthor && (
				<div className="absolute right-6 top-4">
					<Link to={`/edit-post/${post.$id}`}>
						<Button bgColor="bg-green-500" className="mr-3">
							Edit
						</Button>
					</Link>
					<Button bgColor="bg-red-500" onClick={deletePost}>
						Delete
					</Button>
				</div>
			)}
			<div className="w-[95%] sm:w-[90%] md:w-[70%] xl:w-[60%] 2xl:w-[50%] mx-auto py-8">
				<div className="w-full my-6">
					<h1 className="text-3xl font-bold text-center text-white capitalize">
						{post.title}
					</h1>
				</div>
				<div className="flex justify-center mb-4  p-2">
					<img
						src={appwriteService.getFilePreview(post.featuredImage)}
						alt={post.title}
						className="rounded-xl w-full sm:w-[90%] md:w-[80%] xl:w-[65%] h-[500px] object-cover"
					/>
				</div>

				<div className="browser-css first-letter:uppercase text-white text-md">
					{parse(post.content)}
				</div>
			</div>
		</div>
	) : null;
}
