import React from 'react'   
import { connect } from 'react-redux'
import { getAllCustomer, deleteCustomer, createCustomer } from '../actions'

import { Table, Popconfirm, Row, Col, Card, Button, Modal, Form, Input, Space, Select } from 'antd';
import '../App.css';
const { Option } = Select;

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not validate email!',
        number: '${label} is not a validate number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};
class Customer extends React.Component {

    constructor(props) {
        super(props);
        this.Delete = this.Delete.bind(this);
        this.Edit = this.Edit.bind(this);
        this.onFinish = this.onFinish.bind(this);
        this.showModal = this.showModal.bind(this);
        this.state = { visible: false, email: '', role: '', form: null };
    }
    componentWillMount() {
        this.props.getAllCustomer();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('componentDidUpdate');
        // this.props.getAllCustomer();

    }
    Delete(id) {
        console.log('record', id);
        this.props.deleteCustomer(id);
        this.props.getAllCustomer()
    }
    Edit = (record) =>{
        this.showModal(record);
    }
    showModal = (record) => {
        console.log('record', record);
            this.setState({
            visible: true,
            email: record.email, 
            role: record.role
        });
    };
    onFinish = (values) => {
        this.props.createCustomer(values);
        this.setState({
            visible: false
        });
        this.props.getAllCustomer();
    };
    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(this.props.form);
        this.setState({
            visible: false,
        });
    };
    render() {
        let { customer } = this.props;
        return <div className="site-card-wrapper">
            <Row gutter={16}>
                <Col span={16}>
                    <Card title="List customers" bordered={true}>
                        <div>
                            <Button type="primary" onClick={this.showModal}>
                                ADD
                            </Button>
                            <Modal
                                title="Customer"
                                visible={this.state.visible}
                                onCancel={this.handleCancel}
                                footer={null}
                            >
                                <Form {...layout} name="nest-messages"  onFinish={(values) => this.onFinish(values)} validateMessages={validateMessages}>
                                    <Form.Item name={['email']} label="Email" rules={[{ required: true, type: 'email' }]}>
                                        <Input value={this.state.email}/>
                                    </Form.Item>
                                    <Form.Item name={['role']} label="Role" >
                                        <Select
                                            placeholder="Select a option "
                                        >
                                            <Option value="customer">Customer</Option>
                                            <Option value="admin">Admin</Option>
                                            <Option value="user">User</Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                                        <Button type="primary" htmlType="submit">
                                            Submit
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </Modal>
                        </div>
                        <Table
                            columns={
                                [
                                    {
                                        title: 'ID',
                                        dataIndex: 'customerID',
                                        key: 'customerID',
                                        render: text => <a>{text}</a>,
                                    },
                                    {
                                        title: 'Email',
                                        dataIndex: 'email',
                                        key: 'email',
                                    },
                                    {
                                        title: 'Role',
                                        dataIndex: 'role',
                                        key: 'role',
                                    },
                                    {
                                        title: 'Action',
                                        key: 'action',
                                        render: (text, record) => (
                                                <Space  size="middle">
                                                <a onClick={()=> this.Edit(record)}>Edit</a>
                                                <Popconfirm title="Sure to delete?" onConfirm={() => this.Delete(record.customerID)}>
                                                    <a>Delete</a>
                                                </Popconfirm>

                                                </Space>

                                        ),
                                    },
                                ]
                            }
                            dataSource={customer}
                            rowKey="customerID"
                        />
                    </Card>
                </Col>
            </Row>
        </div>



    }
}
const mapStateToProps = (state) => ({
    customer: state.customer
})
export default connect(mapStateToProps, { getAllCustomer, deleteCustomer, createCustomer })(Customer)
// import React, { useState } from 'react';
// import { Table, Input, InputNumber, Popconfirm, Form, Space } from 'antd';

// let originData = [];

// const EditableCell = ({
//     editing,
//     dataIndex,
//     title,
//     inputType,
//     record,
//     index,
//     children,
//     ...restProps
// }) => {
//     const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
//     return (
//         <td {...restProps}>
//             {editing ? (
//                 <Form.Item
//                     name={dataIndex}
//                     style={{
//                         margin: 0,
//                     }}
//                     rules={[
//                         {
//                             required: true,
//                             message: `Please Input ${title}!`,
//                         },
//                     ]}
//                 >
//                     {inputNode}
//                 </Form.Item>
//             ) : (
//                     children
//                 )}
//         </td>
//     );
// };

// const EditableTable = () => {
//     const [form] = Form.useForm();
//     const [data, setData] = useState(originData);
//     console.log('originData', originData)
//     const [editingKey, setEditingKey] = useState('');

//     const isEditing = record => record.customerID === editingKey;

//     const edit = record => {
//         form.setFieldsValue({
//             ...record,
//         });
//         setEditingKey(record.customerID);
//     };

//     const cancel = () => {
//         setEditingKey('');
//     };
//     const Delete = (id)=> {
//         console.log('record', id);
//         this.props.deleteCustomer(id);
//         this.props.getAllCustomer()
//     };
//     const save = async customerID => {
//         try {
//             const row = await form.validateFields();
//             const newData = [...data];
//             const index = newData.findIndex(item => customerID === item.customerID);

//             if (index > -1) {
//                 const item = newData[index];
//                 newData.splice(index, 1, { ...item, ...row });
//                 setData(newData);
//                 setEditingKey('');
//             } else {
//                 newData.push(row);
//                 setData(newData);
//                 setEditingKey('');
//             }
//         } catch (errInfo) {
//             console.log('Validate Failed:', errInfo);
//         }
//     };

//     const columns = [
//         {
//             title: 'ID',
//             dataIndex: 'customerID',
//             key: 'customerID',
//             render: text => <a>{text}</a>,
//         },
//         {
//             title: 'Email',
//             dataIndex: 'email',
//             key: 'email',
//             width: '25%',
//             editable: true,
//         },
//         {
//             title: 'Role',
//             dataIndex: 'role',
//             key: 'role',
//             width: '25%',
//             editable: true,
//         },
//         {
//             title: 'operation',
//             dataIndex: 'operation',
//             render: (_, record) => {
//                 const editable = isEditing(record);
//                 return editable ? (
//                     <span>
//                         <a
//                             onClick={() => save(record.customerID)}
//                             style={{
//                                 marginRight: 8,
//                             }}
//                         >
//                             Save
//             </a>
//                         <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
//                             <a>Cancel</a>
//                         </Popconfirm>
//                     </span>
//                 ) : (
//                         <Space size="middle">
//                             <a disabled={editingKey !== ''} onClick={() => edit(record)}>
//                                 Edit
//                             </a>
//                             <Popconfirm title="Sure to delete?" onConfirm={() => Delete(record.customerID)}>
//                                 <a>Delete</a>
//                             </Popconfirm>

//                         </Space>

//                     );
//             },
//         },
//     ];
//     const mergedColumns = columns.map(col => {
//         if (!col.editable) {
//             return col;
//         }

//         return {
//             ...col,
//             onCell: record => ({
//                 record,
//                 inputType: 'text',
//                 dataIndex: col.dataIndex,
//                 title: col.title,
//                 editing: isEditing(record),
//             }),
//         };
//     });
//     return (
//         <Form form={form} component={false}>
//             <Table
//                 components={{
//                     body: {
//                         cell: EditableCell,
//                     },
//                 }}
//                 bordered
//                 rowKey="customerID"
//                 dataSource={originData}
//                 columns={mergedColumns}
//                 rowClassName="editable-row"
//                 pagination={{
//                     onChange: cancel,
//                 }}
//             />
//         </Form>
//     );
// };
// class Customer extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = { visible: false, email: '', role: '', form: null };
//         this.Delete = this.Delete.bind(this);
//     }
//     componentWillMount() {
//         this.props.getAllCustomer();
//     }
//     Delete(id) {
//         console.log('record', id);
//         this.props.deleteCustomer(id);
//         this.props.getAllCustomer()
//     }
//     render() {
//         let { customer } = this.props;
//         originData = customer;
//         return <EditableTable></EditableTable>
//     }
// }
// const mapStateToProps = (state) => ({
//     customer: state.customer
// })
// export default connect(mapStateToProps, { getAllCustomer, deleteCustomer, createCustomer })(Customer)