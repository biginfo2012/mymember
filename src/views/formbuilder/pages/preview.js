import React, { useEffect, useState } from 'react';


import '../../../assets/scss/grapes-form.css'
import 'grapesjs/dist/css/grapes.min.css';

import 'grapesjs-preset-webpage/dist/grapesjs-preset-webpage.min.css';
import 'grapesjs-preset-webpage/dist/grapesjs-preset-webpage.min.js';
import "../styles/main.scss"

import {connect, useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {GET_FORM, GET_FORM_DATA, GET_SINGLE_FUNNLE, UPDATE_FORM_DATA} from "../../../redux/actions/form-builder/index"
import {
  GET_MEMBERSHIP_LIST,
  GET_STUDENT_LIST,
  GET_PRODECT_FOLDER,
  BUY_PRODUCT, BUY_PRODUCT_STRIPE, BUY_MEMBERSHIP
} from "../../../redux/actions/shop";
import moment from "moment";

import {
  PAY_AND_REGISTER,
  PAY_NOW_INVITE_REGISTER,
  PAY_POROMOTED_STUDNETS,
  PAY_REGISTER_ATTENDED_STUDNETS,
} from "../../../redux/actions/test";

const Preview = () => {


  useEffect(() => {


      let html = localStorage.getItem("gjs-html");
      let css = localStorage.getItem("gjs-css");


      html = html.replace("<body", "<div");
      html = html.replace("</body>", "</div>");
      html = html + `<style>${css}</style>`;
      document.getElementById("editor").innerHTML = html;

      let products = document.getElementsByClassName("product");
      for(let product of products) {
        // let totalPrice = "$" + product.getAttribute('totalprice');
        // product.querySelector("[name='total_price']").innerHTML = (totalPrice);
        // product.querySelector("[name='down_payment']").innerHTML = (totalPrice);
        // product.querySelector("[name='total_price_amount']").innerHTML = (totalPrice);

      }

      let memberships = document.getElementsByClassName("membership");
      for(let membership of memberships) {
        // let totalPrice = "$" + membership.getAttribute('totalprice');
        // let registerFee = "$" + membership.getAttribute('registerfee');
        // let dPayment = "$" + membership.getAttribute('dpayment');
        //
        //
        // membership.querySelector("[name='total_price']").innerHTML = (totalPrice);
        // membership.querySelector("[name='down_payment']").innerHTML = (dPayment);
        // membership.querySelector("[name='registration_fee']").innerHTML = (registerFee);
        // membership.querySelector("[name='total_price_amount']").innerHTML = (totalPrice);

      }

      let buttons = document.getElementsByClassName("btn-submit");
      for(let button of buttons) {
        button.addEventListener("click", (e) => {

        })
      }

  });





  return (
    <div className="App" id="editor">

    </div>
  );
};

export default Preview;
