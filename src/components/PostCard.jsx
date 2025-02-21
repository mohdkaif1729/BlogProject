
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-2 hover:shadow-xl">
        <div className="w-full justify-center mb-2">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="rounded-xl h-[250px] object-cover w-full"
          />
        </div>
        <h2 className="text-xl font-bold text-center overflow-clip">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
