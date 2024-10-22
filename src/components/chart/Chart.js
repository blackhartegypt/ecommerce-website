import {
    Chart as ChartJS,CategoryScale,BarElement,
    Title,Tooltip,Legend,LinearScale
} from "chart.js"
import {Bar} from "react-toastify";
import Card from "../../card/Card";
import styles from "./Chart.module.scss";
import {selectOrderHistory} from "../../redux/slice/orderSlice";
import {useSelector} from "react-redux";

ChartJS.register(
    CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend
);

export const options={
    responsive:true,
    plugins:{
        legend:{
            position:"top",
        },
        title:{
            display:false,
            text: "Chart.js Bar Chart",
        },
    },
}

const Chart=()=>{
    const orders=useSelector(selectOrderHistory);
    const array=orders.map(({orderStatus})=>orderStatus)

    const getOrderCount=((arr,value)=> arr.filter((n)===value).length)

    const [q1,q2,q3,q4]=[
        "Order Placed...",
        "Processing...",
        "Shipped...",
        "Delivered ",
    ];

    const placed=getOrderCount(array,q1);
    const processing=getOrderCount(array,q2);
    const shipped=getOrderCount(array,q3);
    const delivered=getOrderCount(array,q4);

    const data={
        labels:["Placed Orders", "Processing", "Shipped", "Delivered"],
        datasets:[
            {
                label: "Order count",
                data:[placed,processing,shipped,delivered],
                backgroundColor: "rgba(255,99,132,0.5)",
            },
        ],
    }

    return(
        <div className={styles.charts}>
            <Card cardClass={styles.card}>
                <h3>Order Status Chart</h3>
                <Bar options={options} data={data}/>
            </Card>
        </div>
    )

}


export default Chart;