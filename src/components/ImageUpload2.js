import React, { useEffect, useState } from "react";
import BasicUpload2 from "./Utils/BasicUpload2";
import useTricera from "./hooks/useTricera";
import MainHeader from "./Utils/Header";
import axios from "axios";

// to manage cart quantity in header
const baseUrl = process.env.REACT_APP_API_URL;
const cartinfo = localStorage.getItem("checkoutdata");
const cartValidity = localStorage.getItem("cartValidity");

const ImageUpload2 = ({ setShowIcons, setcartQuantity }) => {
  const [file, setFile] = useState("");
  const { getUUID, setConfigSession } = useTricera();

  useEffect(() => {
    let cartproducts;
    let cartProductsQuantity;
    let sum = 0;
    if (cartinfo) {
      async function fetchdata() {
        const cartId = JSON.parse(cartinfo);
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: cartId.cart_id }),
        };
        await fetch(`${baseUrl}/user/cartValid`, requestOptions)
          .then((response) => response.json())
          .then((data) => {
            cartproducts = data;
            if (cartproducts.data.cart == null) {
              // localStorage.clear();
              setShowIcons(false);
            } else {
              if(sessionStorage.getItem('tricera-configs')){
                setShowIcons(true);
                //  localStorage.clear();
              }
              else{
                setShowIcons(false);
                // localStorage.clear();
              }
              cartproducts = cartproducts.data.cart.lines.edges;
              cartProductsQuantity = cartproducts.map((i) => {
                return i.node.quantity;
              });
              sum = cartProductsQuantity.reduce((pv, cv) => pv + cv, 0);
              setcartQuantity(sum);
            }
          });
      }
      fetchdata();
    }
    else {
      if(sessionStorage.getItem('tricera-configs')){
        setShowIcons(true);
      }
      else{
        // to clear cart when user removes all images from the session
        localStorage.removeItem('tricera-uuid');
        setShowIcons(false);
        // localStorage.clear();

      }
      // console.log(sessionStorage.getItem('tricera-configs'));
      // setcartQuantity(0);
    }
  }, [setShowIcons, setcartQuantity]);

  const checkoutlocalStorage = async () => {
    const dataCheckout = JSON.parse(localStorage.getItem("checkoutdata"));
    if (dataCheckout) {
      await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}/user/cartValid`,
        headers: {
          "Content-Type": "application/json",
        },
        processData: false,
        data: { id: dataCheckout?.cart_id },
      }).then((res2) => {
        if (res2) {
          if (res2?.data?.data?.cart == null) {
            // localStorage.removeItem("checkoutdata");
            // localStorage.removeItem("checkoutButton");
            setcartQuantity("");
          }
        }
      });
    }
  };

  useEffect(() => {
    checkoutlocalStorage();
  }, []);

  return (
    <>
      {/* <MainHeader/> */}
      <div className="home-banner">
        <div className="container">
          {/* <div className="flex bg-color makeorder flex-orders"> */}
          <div className="row">
            {/* <div className="w-full select-section grid-upload-left"> */}
            <div className="col-sm-5">
              <div className="text_area text-center">
                <div className="heading-wrapper">
                  <h1>WE ARE OBSESSED WITH THE DETAILS</h1>
                  <h2 className="perfect-prints-guara">
                    Perfect prints guaranteed.
                  </h2>
                </div>
                <BasicUpload2
                  setConfigSession={setConfigSession}
                  getUUID={getUUID}
                  setShowIcons={setShowIcons}
                />
              </div>
            </div>
            <div className="col-sm-7">
              <>
                {/* <div className="homeimagefull">
              </div> */}
                {/* className="homeimage" */}
                <img className="banner_img" src="../images/treicera1.png" />
              </>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ImageUpload2;
