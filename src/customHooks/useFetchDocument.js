import {doc,getDoc} from "firebase/firestore";
import {useEffect,useState} from "react";
import {toast} from "react-toastify";
import {db} from "../firebase/config";

//find a way of toasting the error message or a way you could get the error if you use async function
const useFetchDocument=(collectionName,documentID)=>{
    const [document,setDocument]=useState(null);

    
    const getDocument=async()=>{
        const docRef=doc(db,collectionName,documentID);
        const docSnap=await getDoc(docRef);

        if (docSnap.exists()){
            const obj={
                id:documentID.collectionName,
                ...docSnap.data(),
            };

            setDocument(obj);
        }else(
            toast.error("document Not found")
        )
    };

    useEffect(()=>{
        getDocument();

    },[]);

    return {document};
}


export default useFetchDocument