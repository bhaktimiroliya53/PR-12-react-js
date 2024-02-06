
import React, { useEffect, useState } from 'react'
import { RiDeleteBin5Fill } from "react-icons/ri";
import { addDoc, collection, deleteDoc, doc, getDocs } from 'firebase/firestore'
import {db}from"../firebase-config"
import "./add.css"

function From() {
    const [list, setList] = useState("");
    const [record, setrecord] = useState([])

    let tbl = collection(db, "user");

    const submit = async () => {
        try {
            await addDoc(tbl, { list: list })
            setList("")
            getuser()
        } catch (error) {
            console.log(error);
            return false
        }
    }
    const getuser = async() => {
        try {
            let data = await getDocs(tbl);
            let res = data.docs.map((val) => ((
                {...val.data(), id: val.id}
            )
            ));
            console.log(res);
            setrecord(res)
        } catch (err) {
            console.log(err);
            return false
        }
    }
    const deleteData = async(id) => {
        try{
            await deleteDoc(doc(db,'user',id));
            alert('record Delete')
            getuser()

        }catch(err){
            console.log(err);
            return false
        }
    }
    useEffect(()=>{
        getuser()
    },[])
    return (
        <>
            <center>
                <div className="crud-section">
                    <div className="container">
                        <div className="row">
                            <div className="main">
                                <div className="header">
                                    <h1>To Do List</h1>
                                </div>
                                <div className="add-data">
                                    <div className="form">
                                        <form >
                                            <input type="text" placeholder='Add a Todo...' onChange={(e) => setList(e.target.value)} value={list} />
                                            <button onClick={submit} type='button'>Submit</button>

                                            <br /><br /><br />


                                            {
                                                record.map((val, i) => {
                                                    return (
                                                        <div className="listData">
                                                            <div class="container">
                                                                <div className="list">
                                                                    <li required="" type="text" name="text" class="input" style={{ listStyle: "none" }}>
                                                                        <h3>{val.list}</h3>
                                                                        <span>
                                                                            <button type='button' onClick={ () => deleteData(val.id) }><RiDeleteBin5Fill /></button>
                                                                        </span>
                                                                    </li> 
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </center>
        </>
    )
}

export default From