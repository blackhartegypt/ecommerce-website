import styles from "./Search.module.scss";
import {BiSearch} from "react-icons/bi";


const Search=()=>{
    return(
        <div className={styles.search}>
            <BiSearch size={18} className={styles.icon}/>
            <input 
                type="text"
                placeHolder="Search By Name"
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

export default Search;