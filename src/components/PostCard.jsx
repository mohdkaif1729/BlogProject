
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";

function PostCard(
{ 
  $id, 
  title, 
  featuredImage, 
  $createdAt,
  name
}) {
  // const { userData: currentUser } = useSelector((state) => state?.auth);
  const createAt = new Date($createdAt)
  const completeDate = createAt.toDateString();
  const titleIsGreaterThan50Char = title.substring(0, 25);
  const lengthOfTitle = title.length;

  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-md p-3 hover:shadow-xl">
        <div className="w-full justify-center mb-2">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="rounded-xl h-[250px] object-cover w-full"
          />
        </div>
        <div>
        {lengthOfTitle > 22 ? <h2 className="text-xl font-bold first-letter:uppercase mb-2">{titleIsGreaterThan50Char}...</h2> : <h2 className="text-xl font-bold first-letter:uppercase mb-2">{title}</h2>}
        </div>
        <div className="mb-2">
          <p>{name}</p>
        </div>
        <div>
          <p className="text-[1rem] mb-5">{completeDate}</p>
        </div>

        <div>
          <p className="text-blue-600 font-semibold">Learn more &gt;</p>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
