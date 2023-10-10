import LoginPage from "../components/LoginPage";
import BlogPage from "../components/BlogPage";
import { useSelector } from "react-redux";
import { setBlogs } from "../app/reducers/blogReducer";
import { selectSortedBlogs } from "../app/selectors";
import NewBlog from "../components/NewBlog";
import ToggleableComponent from "../components/ToggleableComponent";

const HomePage = () => {
  const blogs = useSelector((state) => selectSortedBlogs(state));
  const user = useSelector((state) => state.user);
  // const [user, setUser] = useState(
  //   JSON.parse(window.localStorage.getItem("user"))
  // );
  return (
    <div>
      {" "}
      <ToggleableComponent
        showButtonLabel={"Add a new blog"}
        closeButtonLabel={"close"}
      >
        <NewBlog user={user} />
      </ToggleableComponent>
      {/* since this user object is a state that you are going to store an object inside, you should use a === null comparator to make it truthy / falsy */}
      {(user === null || user === undefined) && <LoginPage user={user} />}
      {user !== null && user !== undefined && (
        <BlogPage blogs={blogs} user={user} setBlogs={setBlogs} />
      )}
    </div>
  );
};

export default HomePage;
