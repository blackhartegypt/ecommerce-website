import {collection,onSnapshot,orderBy,query} from "firebase/firesotre";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {db} from "../firebase/config";


const useFetchCollection=(collectionName)=>{
    const [data,setData]=useState([]);
    const [isLoading,setIsLoading]=useState(false);

    const getCollection=()=>{
        setIsLoading(true);
        try{
            const docRef=collection(db,collectionName);
            const q=query(docRef,orderBy("createdAt","desc"));
            onSnapshot(q,(snapshot)=>{
                const allData=snapshot.docs.map((doc)=>({
                    id:doc.id,
                    ...doc.data(),
                }));

                setData(allData);
                setIsLoading(false)
            })

        }catch(err){
            setIsLoading(false);
            toast.error(err.message);
        }
    };

    useEffect(()=>{
        getCollection();
    },[]);

    return {data,isLoading};
}

export default useFetchCollection;