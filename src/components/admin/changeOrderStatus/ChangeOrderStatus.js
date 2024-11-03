import {doc,setDoc,Timestamp} from "firebase/firestore";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {db} from "../../../firebase/config";
import Card from "../../card/Card";
import Loader from "../../loader/Loader";
import styles from "./ChangeOrderStatus.module.scss";




const ChangeOrderStatus=({order,id})=>{

    const [status,setStatus]=useState("");
    const [isLoading,setIsLoading] =useState(false);
    const navigate=useNavigate();

    const editOrder=(e,id)=>{
        e.preventDefault();
        setIsLoading(true);

        const orderConfig={...order,orderStatus:status,}

        try{
            setDoc(doc(db,"orders",id),orderConfig);
            setIsLoading(false);
            toast.success("status of your order has been successfully changed");
            navigate("/admin/orders");
        }catch(err){
            setIsLoading(false);
            toast.error(err.message);
        }
    }

    return(
        <>
        {isLoading && <Loader/>}
        <div className={styles.status}>
            <Card cardClass={styles.card}>
                <h4>Update Order Status</h4>
                <form onSubmit={(e)=>editOrder(e,id)}>
                    <span>
                        <select 
                         value={status}
                         onChange={(e)=>setStatus(e.target.value)}
                         >
                            <option value="" disabled>
                        -- Choose one --
                        </option>
                        <option value="Order Placed...">Order Placed...</option>
                        <option value="Processing...">Processing...</option>
                        <option value="Shipped...">Shipped...</option>
                        <option value="Delivered">Delivered</option>

                         </select>
                    </span>

                    <span>
                    <button type="submit" className="--btn --btn-primary">
                        Update Status
                    </button>
                    </span>
                </form>
            </Card>
        </div>
        </>
        
    )
}

export default ChangeOrderStatus;