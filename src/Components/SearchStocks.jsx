import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Modal, Button, Input, message } from 'antd';
import Data from '../stockData.json';
import { CaretUpFilled, CaretDownFilled, PlusOutlined } from '@ant-design/icons';
import styles from './Search.module.css'

function SearchStocks({data1, setData1}){
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [searchStocks, setSearchStocks] = useState('');
    

    const addStocks = (el ,id) => {
        if(!el[0].split("::")[0]){

        }
        else{
            message.success('The stock is added to the list!')
            setData1([...data1, el]);
            setSearchStocks('');
        }
    }

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    //console.log(Data)
    return (
        <div>       
           <Button onClick={showModal} size='large' hover= 'false'
            style={{
               width: "100%",
               textAlign: "left",
               fontSize: "17px",
               cursor: "text",
               border: "1px solid #D9D9D9",
           }}>Search stocks...</Button>
           <Modal 
             width={627}
             visible={isModalVisible} 
             onOk={handleOk} 
             onCancel={handleCancel}
             closable={false}
           > 
           <Input placeholder='Search stocks...' size='large'
                onChange={(el) => setSearchStocks(el.target.value)}
           />
            <div style={{
                overflowY: "scroll",
                height: "350px"
            }}>
                {Data.filter((val) => {

                    if(searchStocks === ''){
                       return val;
                    }
                    else if(val[0].split("::")[0].toLowerCase().includes(searchStocks.toLowerCase())){
                        return val;
                    }
                }).map((val, inx) => {
                    let data1 = val[0].split("::");
                    let stockName = data1[0];
                    let nse = data1[1];
                    let lat = Number(val[1]);
                    let prev = Number(val[2]);
                    let nsePer = ((lat - prev)/prev).toFixed(2);
                    
                    return(
                        <>
                        <div 
                        className= {styles["div-hover"]}
                        key={inx}
                        style={{
                            width: "95%",
                            margin: "auto",
                            padding: "1%",
                            border: "1px solid #F0F0F0",
                            position: "relative"
                        }}>
                            <div 
                            style={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "space-between",
                                color: lat - prev > 0 ? "#29C5C1" : "#E7592E",
                                fontSize: "17px",
                                fontWeight: "600"
                            }}>
                                <div>{stockName}</div>  
                                <div>{lat}</div>
                            </div>
                            <div style={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "space-between",
                                fontWeight: "600",
                                fontSize: "15px"
                            }}>
                                <div style={{
                                     color: "#898989",
                                     padding: "1%",
                                     backgroundColor: "#FAFAFA"
                                }}>{nse}</div> 
                                <div>
                                    {lat - prev > 0 ?  <CaretUpFilled style={{
                                    color: "#29C5C1"
                                }}/> : <CaretDownFilled style={{
                                    color: "#E7572E" 
                                 }}/>} 
                                {nsePer}%</div>
                            </div>
                            <div  className= {styles["buttonAdd"]}>
                                <PlusOutlined className={styles["plus-buttn"]} onClick={() => addStocks(val ,inx)}/>
                            </div>
                        </div>
                        </>
                    )
                })}
            </div>
           </Modal>
        </div>
    )
}
export { SearchStocks };

