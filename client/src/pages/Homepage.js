import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import axios from "axios";
import { Col, Row } from "antd";
import Item from "../components/Item";
import "../resourses/items.css";
import { useDispatch } from "react-redux";
function Homepage() {
  const [itemsData, setItemsData] = useState([]);
  const [selectedCategory, setSelectedCategoty] = useState("fruits");
  const categories = [
    {
      name: "camisetas",
      imageURL:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmVMIhxiMcwDQhZZvIXUbUikNmHoTmrBLEOikmLcKiSowjj3e23iKXNAbH3DCy29BAy3Y&usqp=CAU",
    },
    {
      name: "conjuntos",
      imageURL:
        "https://cf.shopee.com.co/file/2cb10ce1e7427f96d03a211e2cca9f79",
    },
    {
      name: "chompas",
      imageURL:
        "https://nairo.com.co/wp-content/uploads/2021/09/Buso-Gris-2.jpeg",
    },
  ];
  const dispatch = useDispatch();
  const getAllItems = () => {
    dispatch({ type: "showLoading" });
    axios
      .get("/api/items/get-all-items")
      .then((response) => {
        dispatch({ type: "hideLoading" });
        setItemsData(response.data);
      })
      .catch((error) => {
        dispatch({ type: "hideLoading" });
        console.log(error);
      });
  };

  useEffect(() => {
    getAllItems();
  }, []);

  return (
    <DefaultLayout>

      <div className="d-flex categories">
            {categories.map((category)=>{
              return <div 
              onClick={()=>setSelectedCategoty(category.name)}
              className={`d-flex category ${selectedCategory===category.name && 'selected-category'}`}>
                      <h4>{category.name}</h4>
                      <img src={category.imageURL} height='60' width='80' />
              </div>
            })}
      </div>

      <Row gutter={20}>

        {itemsData.filter((i)=>i.category===selectedCategory).map((item) => {
          return (
            <Col xs={24} lg={6} md={12} sm={6}>
              <Item item={item} />
            </Col>
          );
        })}
      </Row>
    </DefaultLayout>
  );
}

export default Homepage;