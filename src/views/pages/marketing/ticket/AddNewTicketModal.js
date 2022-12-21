import React, { useEffect, useRef } from "react";

import { Checkbox, Form, Input, Modal, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { add_new_ticket } from "../../../../redux/actions/marketing/ticket";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

const AddNewTicketModal = (props) => {
  const [form] = Form.useForm();
  const ticketName = Form.useWatch("ticketName", form);
  const reqName = Form.useWatch("reqName", form);
  const reqEmail = Form.useWatch("reqEmail", form);
  const priority = Form.useWatch("priority", form);
  const message = Form.useWatch("message", form);
  const history = useHistory();

  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
  };


  const { add_new_ticket, customers, contactlistSelectedIndex, messages } = props;
  const handleOk = async () => {
    let oldmessages = [];
    if(props.saveFromlivechat){
      const selectedCustomer = customers[contactlistSelectedIndex];
      oldmessages = messages.filter((message) => message.machineId === selectedCustomer.machineId && message.userInfo.email === selectedCustomer.userInfo.email);
      console.log("oldmessages", oldmessages);
    }
    const newTicket = await add_new_ticket({
        userId: localStorage.getItem('user_id'),
        ticketName,
        reqEmail,
        reqName,
        status: 'Open',
        priority,
        messages: [
          ...oldmessages.map((item) => {
            return {
              sender: item.type,
              msg: item.msg,
            }
          }),
          {
            sender: "adminMessage",
            msg: message,
        }]
    })
    history.push(`/app/ticket/ticketview/${newTicket._id}`);
  };
  const handleFinish = (values) => {
    console.log("on finish called", values);
  };
  return (
    <Modal
      title="Add New Ticket"
      open={props.open}
      onOk={(e) => handleOk()}
      onCancel={props.onCancel}
    >
      <Form
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        onFinish={handleFinish}
        validateMessages={validateMessages}
      >
        <Form.Item
          label="Ticket Name"
          name="ticketName"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Requester Name"
          name="reqName"
          rules={[{ required: true }]}
        >
          <Input defaultValue={props.userInfo?.username}/>
        </Form.Item>
        <Form.Item
          label="Requester Email"
          name="reqEmail"
          rules={[{ required: true }]}
        >
          <Input defaultValue={props.userInfo?.email}/>
        </Form.Item>
        <Form.Item label="Priority" name="priority">
          <Select>
            <Select.Option value="low">Low</Select.Option>
            <Select.Option value="medium">Medium</Select.Option>
            <Select.Option value="high">High</Select.Option>
            <Select.Option value="urgent">Urgent</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Message" name="message">
          <TextArea rows={4} />
        </Form.Item>
        {
            props.saveFromlivechat ? 
            <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
              <Checkbox>Save chat history</Checkbox>
            </Form.Item>
          : null
        }
      </Form>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    tickts: state.ticket.tickets,
    customers: state.livechat.customers,
    messages: state.livechat.messages,
    contactlistSelectedIndex: state.livechat.contactlistSelectedIndex,
  };
};

export default connect(mapStateToProps, { add_new_ticket })(AddNewTicketModal);
