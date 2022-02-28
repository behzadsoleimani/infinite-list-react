import React from "react";
import {useSelector } from "react-redux";
import "./index.scss";

export default () => {
  const stateItems = useSelector((state: any) => state.data && state.data.items) || [];
  const items = stateItems.filter((item: any) => item.type === "VENDOR")

  return (
    <>
      <div className="card"

      >
        {(items || []).map((item: any) => (
          <section className="card__content--content" key={item.id}>
            <header className="card__content--header">
              <div className="card__content--img-parent">
                <img src={item.data.backgroundImage}
                  alt={item.data.title}
                />
              </div>
              <div className="best-coupon-title">{item.data.best_coupon}
              </div>
              <div className="logo-parent">
                <img
                  src={item.data.defLogo} alt={item.data.title}
                />
              </div></header>
            <div className="footer-content">
              <div className="title-holder">
                <div className="title-item-grid">
                  <h3 className="title-item">
                    {item.data.title}</h3>
                  <div className="discount-title">
                    <div className="discount-measure" >
                      <span >تا</span>
                      <span >{item.data.discountValueForView}%</span>
                    </div>
                  </div>
                </div>
                  <div >
                    {item.data.description.replace(/,/g, "")}</div>
              </div>
            </div>
          </section>))}
      </div>
    </>
  );
};

