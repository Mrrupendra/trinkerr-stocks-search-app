import { SearchStocks } from "./SearchStocks";
import styles from "./Search.module.css";
import { DeleteOutlined, EditOutlined , CaretDownFilled, CaretUpFilled} from '@ant-design/icons';
import { useState } from "react";
import { message } from "antd";

function WatchList () {
    const [data1, setData1] = useState([]);
    const deleteStocks = (id) => {
        const deleteSome = data1.filter((el,ind) => {
            return ind !== id;
        });
        message.success('Removed from list.')
        setData1(deleteSome);
    }


    return (
        <div>
            <div className={styles["search-butt"]}>
                <SearchStocks data1 = {data1} setData1 = {setData1} />
            </div>
            <div className={styles["add-stock-list"]}>
                <div className={styles["add-stock-title"]}>
                    <div style={{
                        fontSize: "22px",
                        fontWeight: "600"
                    }}>Rupendra</div>

                    <div style={{
                        display: "flex",
                        gap: "50%",
                        
                    }}>
                        <EditOutlined style={{fontSize: "22px"}}/>
                        <DeleteOutlined style={{fontSize: "22px", color: "#FF0000"}}/>
                    </div>
                </div>
                <div style={{
                   width: "100%",
                   margin: "auto",
                   marginTop: "4%" ,
                   overflowY: "scroll",
                   height: "300px",
                   position: "relative"
                }}>
                    {data1 !== null ? data1.map((val, inx) => {
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
                                width: "100%",
                                margin: "auto",
                                paddingTop: "2%",
                                paddingBottom: "2%",
                                paddingLeft: "1%",
                                paddingRight: "1%",
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
                                    <DeleteOutlined  
                                     onClick = {() => deleteStocks(inx)}
                                    style={{
                                        color: "#FF0000",
                                        fontSize: "25px",
                                        border: "1px solid #D9D9D9",
                                        padding: "1%",
                                        position: "absolute",
                                        width: "7%",
                                        top: "30px",
                                        left: "500px",
                                        backgroundColor: "white",
                                        cursor: "pointer"
                                    }}/>
                                </div>
                            </div>
                            </>
                        )
                    })
                    : '' }

                </div>
            </div>
        </div>
    )
}
export { WatchList };