import React, { useEffect, useState } from 'react';


import '../../../assets/scss/grapes-form.css'
import 'grapesjs/dist/css/grapes.min.css';

import 'grapesjs-preset-webpage/dist/grapesjs-preset-webpage.min.css';
import 'grapesjs-preset-webpage/dist/grapesjs-preset-webpage.min.js';
import "../styles/main.scss"

import {connect, useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {GET_FORM, GET_FORM_DATA, GET_SINGLE_FUNNLE, UPDATE_FORM_DATA} from "../../../redux/actions/form-builder/index"
import { toast } from "react-toastify";
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
import {SUBMIT_FORM} from "../../../redux/actions/form-builder";

const View = (props) => {
  const {
    GET_MEMBERSHIP_LIST,
    GET_STUDENT_LIST,
    GET_FORM_DATA,
    studentList,
    membershipList,
    productFolderList,
    form
  } = props;
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()
  const history = useHistory()

  const toastCSS = () => {
    return {
      position: "top-center",
      autoClose: 3000,
      icon: true,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    };
  };
  useEffect(() => {
    let pathlength = window.location.pathname.split('/').length
    let formId = window.location.pathname.split('/')[pathlength - 2]
    let userId = window.location.pathname.split('/')[pathlength - 1]
    GET_FORM_DATA(formId)
    GET_MEMBERSHIP_LIST();
    GET_STUDENT_LIST();
    GET_PRODECT_FOLDER();
    //setForm(getForm)

  }, [GET_FORM_DATA, GET_MEMBERSHIP_LIST, GET_STUDENT_LIST, GET_PRODECT_FOLDER])

  useEffect(() => {

    if (form && form.formData) {
      let formData = JSON.parse(form.formData);
      // if (formData['gjs-components'].replace(/^"|"$/g, "").length > 0) {
      //   editor.setComponents(JSON.parse(formData['gjs-components'].replace(/^"|"$/g, "")))
      // }
      //
      // if(formData['gjs-styles'].replace(/^"|"$/g, "").length > 0){
      //   editor.setStyle(JSON.parse(formData['gjs-styles'].replace(/^"|"$/g, "")))
      // }
      let html = formData["gjs-html"];
      let css = formData["gjs-css"];

      html = html.replace("<body", "<div");
      html = html.replace("</body>", "</div>");
      html = html + `<style>${css}</style>`;
      document.getElementById("editor").innerHTML = html;

      let products = document.getElementsByClassName("product");
      for(let product of products) {
        let totalPrice = "$" + product.getAttribute('totalprice');
        product.querySelector("[name='total_price']").innerHTML = (totalPrice);
        product.querySelector("[name='down_payment']").innerHTML = (totalPrice);
        product.querySelector("[name='total_price_amount']").innerHTML = (totalPrice);
        product.querySelector("[name='pay_now']").addEventListener("click", (e) => {
          submitProduct(product)
        })
      }

      let memberships = document.getElementsByClassName("membership");
      for(let membership of memberships) {
        let totalPrice = "$" + membership.getAttribute('totalprice');
        let registerFee = "$" + membership.getAttribute('registerfee');
        let dPayment = "$" + membership.getAttribute('dpayment');


        membership.querySelector("[name='total_price']").innerHTML = (totalPrice);
        membership.querySelector("[name='down_payment']").innerHTML = (dPayment);
        membership.querySelector("[name='registration_fee']").innerHTML = (registerFee);
        membership.querySelector("[name='total_price_amount']").innerHTML = (totalPrice);
        membership.querySelector("[name='pay_now']").addEventListener("click", (e) => {
          submitMembership(membership)
        })
      }

      let buttons = document.getElementsByClassName("btn-submit");
      for(let button of buttons) {
        button.addEventListener("click", (e) => {
          let selectOption = button.getAttribute('selectedoption');
          if(selectOption == 0) {
            submitOrder()
          } else if(selectOption == 1) {
            submitForm()
          } else if(selectOption == 2) {
            let openUrl = button.getAttribute('openurl');
            let openWay = button.getAttribute('openway');
            showWebSite(openUrl, openWay);
          } else if(selectOption == 3) {
            openPopUp()
          } else if(selectOption == 4) {
            moveNextStep()
          }
        })
      }
    }
  });


  useEffect(() => {

  });

  const setValorPayload = (valorPayload) => {
    let pan = document.getElementsByName("pan")[0].value;
    let cvv = document.getElementsByName("cvv")[0].value;
    let card_holder_name = document.getElementsByName("card_holder_name")[0].value;
    let expiry_date = document.getElementsByName("expiry_date")[0].value;
    let email = document.getElementsByName("email")[0].value;
    let phone = document.getElementsByName("phone")[0].value;
    let amount = document.getElementsByName("amount")[0].value;
    return {
      ...valorPayload,
      pan: pan,
      cvv: cvv,
      card_holder_name: card_holder_name,
      expiry_date: expiry_date,
      email: email,
      phone: phone,
      amount: amount
    }
  }

  const submitProduct = (productElement) => {
    let productId = productElement.getAttribute('productdata');
    let studentId = productElement.getAttribute('studentdata');
    let totalPrice = productElement.getAttribute('totalprice');
    let deposit = productElement.getAttribute('deposit');
    let paymentMoney = productElement.getAttribute('paymentmoney');
    let startPaymentDate = productElement.getAttribute('startpaymentdate');
    let payInout = productElement.getAttribute('payinout');
    let productArray = [];
    for(let productFolder of productFolderList) {
      productArray = productArray.concat(productFolder["products"])
    }
    let studentInfo = null;
    let productInfo = null;
    if(studentList && studentList.active_std) {
      for(let student of studentList.active_std) {
        if(student._id == studentId) {
          studentInfo = student;
        }
      }
    }

    for(let product of productArray) {
      if(product._id == productId) {
        productInfo = product
      }
    }
    let payload = getPayload(productInfo);
    payload.total_price = totalPrice;
    payload.deposite = deposit;
    payload.payment_money = paymentMoney;
    payload.pay_inout = payInout;
    payload.start_payment_date = startPaymentDate;
    payload.valorPayload = setValorPayload(payload.valorPayload);

    apiProductCall(payload, studentInfo, productInfo)
    moveNextStep();
  }

  const getPayload = (product) => {
    return {
      payment_time: 1,
      start_payment_date: moment().format("YYYY-MM-DD"),
      payment_type: product.payment_type,
      deposite: product.deposite ? product.deposite : 0,
      product_name: product.product_name,
      product_description: product.product_description,
      product_type: product.product_type,
      payment_money: product.deposite
        ? product.total_price - product.deposite
        : 0,
      event_date:
        product.product_type === "event"
          ? product.event_date
          : product.product_name,
      next_payment_date: product.next_payment_date,
      total_price: product.total_price,
      balance: product.deposite
        ? product.total_price - product.deposite
        : 0,
      ptype: "credit card",
      pay_inout: "auto pay",
      pay_latter: "cash",
      cheque_no: "",
      valorPayload: {
        amount: product.deposite ? product.deposite : 0,
        address: {},
      }
    }
  }

  const apiProductCall = async (payload, studentData, product) => {
    setLoading(true);
    let copypayload = payload;
    const {deposite, total_price} = payload;
    if (deposite == total_price) {
      copypayload.payment_time = 0;
      copypayload.payment_type = "pif";
      copypayload.isEMI = false;
    } else {
      copypayload.payment_time = 1;
      copypayload.payment_type = "monthly";
      copypayload.isEMI = true;
    }
    const id = payload.id;
    if(studentList && studentList.active_std) {
      for(let student of studentList.active_std) {
        if(student._id == id) {
          copypayload.student_name = student.student_name
        }
      }
    }
    copypayload.studentId = id;
    copypayload.financeId = "61c3807b60ec924314f1e73e";
    copypayload.createdBy = JSON.parse(
      localStorage.getItem("userdata")
    )?.data?.username;
    // if (copypayload?.ptype !== "cash") {
    //     copypayload.valorPayload.pan = copypayload.valorPayload?.pan.replace(
    //       /\s+/g,
    //       ""
    //     );
    //     copypayload.valorPayload.phone = copypayload.valorPayload?.phone.replace(
    //       /\s+/g,
    //       ""
    //     );
    // }
    if (copypayload.valorPayload !== undefined) {
      copypayload.valorPayload.Subscription_valid_for = 1;
    } else if (copypayload.stripePayload !== undefined) {
      copypayload.stripePayload.Subscription_valid_for = "";
      copypayload.stripePayload.subscription_day_of_the_month = "";
      copypayload.stripePayload.subscription_starts_from = copypayload.start_payment_date;
      copypayload.isEMI = false;
    }
    let responce = ""
    if (copypayload.stripePayload !== undefined) {
      let res = await BUY_PRODUCT_STRIPE(id, {product_details: copypayload});
      responce = res
    } else {
      let res = await BUY_PRODUCT(id, {product_details: copypayload});
      responce = res
    }
    if (responce) {
      if (studentData !== undefined) {
        if (studentData?.isPaid === false
        ) {
          let paylodfortestregister = {
            studentId: studentData?.studentId?._id,
            userId: studentData?.userId,
            testId: product._id,
            firstName: studentData?.firstName,
            lastName: studentData?.lastName,
            rating: studentData?.rating,
            current_rank_name: studentData?.current_rank_name,
            next_rank_name: studentData?.next_rank_name,
            current_rank_img: studentData?.current_rank_img,
            next_rank_img: studentData?.next_rank_img,
            date: studentData?.createdAt,
            isDeleted: studentData?.isDeleted,
            phone: studentData?.phone,
            cheque_no: payload.valorPayload?.cheque_no || "",
            memberprofileImage: studentData?.phone,
            lastPromotedDate: studentData?.lastPromotedDate,
            program: studentData?.program,
            isPaid: true,
          };
          await PAY_POROMOTED_STUDNETS(
            paylodfortestregister,
            studentData?._id,
            studentData?.eventId
          );
        } else {
          if (studentData?.isPaid === undefined) {
            let paylodfortestregister = {
              studentId: studentData?.studentId?._id,
              userId: studentData?.userId,
              testId: product._id,
              firstName: studentData?.firstName,
              lastName: studentData?.lastName,
              rating: studentData?.rating,
              current_rank_name: studentData?.current_rank_name,
              next_rank_name: studentData?.next_rank_name,
              current_rank_img: studentData?.current_rank_img,
              next_rank_img: studentData?.next_rank_img,
              date: studentData?.createdAt,
              isDeleted: studentData?.isDeleted,
              method:
                payload.ptype === "cash"
                  ? "Cash"
                  : payload.ptype === "cheque"
                  ? "Check"
                  : "Credit Card",
              phone: studentData?.phone,
              cheque_no: payload.valorPayload?.cheque_no || "",
              memberprofileImage: studentData?.phone,
              lastPromotedDate: studentData?.lastPromotedDate,
              program: studentData?.program,
              isPaid: true,
            };
            await PAY_AND_REGISTER(paylodfortestregister, studentData?.eventId);
          }
        }

      }
      setLoading(false);
      moveNextStep()
    }
  }
  const submitMembership = (membershipElement) => {
    let membershipId = membershipElement.getAttribute('memberdata');
    let studentId = membershipElement.getAttribute('studentdata');


    let studentInfo = null;
    let membershipInfo = null;
    if(studentList && studentList.active_std) {
      for(let student of studentList.active_std) {
        if(student._id == studentId) {
          studentInfo = student;
        }
      }
    }

    if(membershipList && membershipList.data) {
      for(let membership of membershipList.data) {
        if(membership._id == membershipId) {
          membershipInfo = membership
        }
      }
    }
    let payload = getMembershipPayload(membershipInfo);
    let mActivateDate = membershipElement.getAttribute('mActivateDate'.toLowerCase()) || payload.mactive_date;
    let expireDate = membershipElement.getAttribute('expireDate'.toLowerCase()) || payload.expiry_date;
    let totalPrice = membershipElement.getAttribute('totalPrice'.toLowerCase()) || payload.totalp;
    let registerFee = membershipElement.getAttribute('registerFee'.toLowerCase()) || payload.register_fees;
    let dPayment = membershipElement.getAttribute('dPayment'.toLowerCase()) || payload.dpayment;
    let balance = membershipElement.getAttribute('balance'.toLowerCase()) || payload.balance;
    let paymentTime = membershipElement.getAttribute('paymentTime'.toLowerCase()) || payload.payment_time;
    let paymentType = membershipElement.getAttribute('paymentType'.toLowerCase()) || payload.payment_type;
    let paymentMoney = membershipElement.getAttribute('paymentMoney'.toLowerCase()) || payload.payment_money;
    let due = membershipElement.getAttribute('due'.toLowerCase()) || payload.due_every;
    let startPaymentDate = membershipElement.getAttribute('startPaymentDate'.toLowerCase()) || payload.start_payment_Date
    let payInout = membershipElement.getAttribute('payInout'.toLowerCase()) || payload.pay_inout;

    payload.mactive_date = mActivateDate;
    payload.expiry_date = expireDate;
    payload.totalp = totalPrice;
    payload.register_fees = registerFee;
    payload.dpayment = dPayment;
    payload.balance = balance;
    payload.payment_time = paymentTime;
    payload.payment_type = paymentType;
    payload.payment_money = paymentMoney;
    payload.due_every = due;
    payload.pay_inout = payInout;
    payload.start_payment_Date = startPaymentDate;

    payload.valorPayload = setValorPayload(payload.valorPayload);

    apiMembershipCall(payload, studentInfo, membershipInfo)
    moveNextStep();
  }

  const getMembershipPayload = (membershipDetail) => {
    const currentDate = new Date();
    let expiry_date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + parseInt(membershipDetail.duration_time),
      currentDate.getDate() + 1
    );
    let due_every_month = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      currentDate.getDate() + 1
    );
    let start_date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + parseInt(membershipDetail.duration_time),
      currentDate.getDate() + 1
    );
    return {
      membership_duration: membershipDetail.duration_time,
      mactive_date: currentDate.toISOString().split("T")[0],
      register_fees: 0,
      start_payment_Date: start_date.toISOString().split("T")[0],
      expiry_date: expiry_date.toISOString().split("T")[0],
      totalp: membershipDetail.total_price,
      balance:
        parseInt(membershipDetail.total_price) -
        parseInt(membershipDetail.down_payment),
      dpayment: membershipDetail.down_payment || 0,
      ptype: "credit card",
      payment_time: membershipDetail.no_of_payment || 0,
      payment_type: membershipDetail.payment_type,
      payment_money:
        parseInt(membershipDetail.balance) /
        parseInt(membershipDetail.payment_time) || 0,
      due_every: "0",
      due_every_month: due_every_month.toISOString().split("T")[0],
      pay_inout: "In house",
      membership_name: membershipDetail.membership_name,
      membershipId: membershipDetail._id,
      pay_latter: "cash",
      cheque_no: "",
      studentId: null,
      student_name:"",
      financeId: "",
      isPaymentDone: false,
      loading: false,
      valorPayload: {
        card_number: "",
        amount: "",
        card_holder_name: "",
        cvv: "",
        expiry_date: "",
        pan: "",
        email: "",
        phone: "",
        address: {
          address: "",
          street_no: "",
          zip: "",
        },
        Subscription_valid_for: "",
        subscription_day_of_the_month: "",
        subscription_starts_from: currentDate.toISOString().split("T")[0],
      },
    }
  }
  const apiMembershipCall = async (payload, studentData, membershipDetail) => {
    payload.createdBy =  JSON.parse(
      localStorage.getItem("userdata")
    )?.data?.username;
    payload.membership_type = membershipDetail.membership_type;
    // payload.student_name = `${this.props.getStudentInfo?.data?.firstName} ${this.props.getStudentInfo?.data?.lastName}`;
    var updatedPayload = {
      membership_details: {
        ...payload,
      },
    };



    if (payload.payment_type === "monthly" || payload.payment_type === "weekly") {
      updatedPayload.membership_details.isEMI = true;
    } else if (payload.payment_time !== 0 || payload.payment_type === "pif") {
      updatedPayload.membership_details.isEMI = false;
    } else {
      updatedPayload.membership_details.isEMI = true;
      updatedPayload.membership_details.due_every = "0";
      updatedPayload.membership_details.due_every_month = "no_due";
    }
    updatedPayload.membership_details.student_name = `${studentData?.firstName} ${studentData?.lastName}`

    if (payload?.membership_details?.valorPayload) {
      payload.membership_details.valorPayload.phone =
        payload?.membership_details?.valorPayload.phone.replace(/\s+/g, "");
      payload.membership_details.valorPayload.pan =
        payload?.membership_details?.valorPayload.pan.replace(/\s+/g, "");
    }
    console.log("Call Membership")
    await BUY_MEMBERSHIP(
          membershipDetail,
          payload,
          studentData._id,
          true
        );

  }

  const submitForm = async () => {
    const res = await dispatch(SUBMIT_FORM(form._id))
    if(res.data.success) {
      toast.success("Successfully Submit Form", toastCSS());
      await moveNextStep();
    }

  }

  const submitOrder = async () => {
    const res = await dispatch(SUBMIT_FORM(form._id))
    if(res.data.success) {
      toast.success("Successfully Submit Form", toastCSS());
      await moveNextStep();
    }
  }

  const openPopUp = () => {
    alert("Pop Up");
  }

  const findNextStep = (forms) => {
    let answer = null;
    for(var i = 0; i < forms.length - 1; i ++) {
      if(forms[i]._id == form._id) {
        answer = forms[i + 1]._id;
      }
    }
    return answer;
  }
  const moveNextStep = async () => {
    let funnelId = form.funnelId;
    const request = await dispatch(GET_SINGLE_FUNNLE(funnelId))
    let data = request?.data;
    let forms = data.forms;
    let nextStep = findNextStep(forms);
    let userId = localStorage.getItem("user_id");
    console.log(nextStep);
    if(nextStep) {
      window.open(`/builder/view/${nextStep}/${userId}`, '_self');
      //history.push()
    } else {
      toast.info("Completed", toastCSS())
    }
  }

  const showWebSite = (url, way) => {
    if(way != 'other') {
      window.open(url, '_self');
    } else {
      window.open(url, '_blank');
    }
  }



  return (
    <div className="App" id="editor">

    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    studentList: state.shop.studentList,
    membershipList: state.shop.membershipList,
    form: state.FormBuilderReducer?.uform,
    productFolderList: state.shop.getProdectfolder
  };
};

export default connect(mapStateToProps, {
  GET_STUDENT_LIST,
  GET_MEMBERSHIP_LIST,
  GET_FORM_DATA,
  GET_PRODECT_FOLDER,
})(View);
