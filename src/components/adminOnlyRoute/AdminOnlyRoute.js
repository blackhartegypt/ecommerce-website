require(dotenv).config();
import { useSelector } from "react-redux";
import {Link} from "react-router-dom";
import { selectEmail } from "../../redux/slices/authSlice";

const AdminOnlyRoute=({children})=>{
    const userEmail=useSelector(selectEmail);

    if (userEmail === process.env.ADMIN_EMAIL){
        return children;
    }

    return(
        <section style={{ height: "80vh" }}>
      <div className="container">
        <h2>Permission Denied.</h2>
        <p>This page can only be view by an Admin user.</p>
        <br />
        <Link to="/">
          <button className="--btn">&larr; Back To Home</button>
        </Link>
      </div>
    </section>
    )
}

export const AdminOnlyLink=({children})=>{
    if(useSelector(selectEmail) === process.env.ADMIN_EMAIL) return children;
    return null;
}

export default AdminOnlyRoute;