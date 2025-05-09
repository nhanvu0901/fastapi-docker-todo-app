import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Form, Input, Button, Card, Typography, message} from 'antd';
import {UserOutlined, LockOutlined, MailOutlined} from '@ant-design/icons';
import {useMutation} from '@tanstack/react-query';
import {useDispatch} from 'react-redux';

import {login} from '../../redux/uiSlice';
import {registerUser} from "../../api/auth";

const {Title} = Typography;

const RegisterPage = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const registerMutation = useMutation(
        {
            mutationFn: registerUser,
            onSuccess: (data) => {
                dispatch(login(data));
                message.success('Registration successful!');
                navigate('/');
            },
            onError: (error) => {
                message.error(error.message || 'Registration failed. Please try again.');
            },
            onSettled: () => {
                setLoading(false);
            }
        }
    );

    const handleSubmit = (values) => {
        setLoading(true);
        registerMutation.mutate(values);
    };

    return (
        <div style={{maxWidth: '400px', margin: '0 auto', marginTop: '50px'}}>
            <Card>
                <Title level={2} style={{textAlign: 'center', marginBottom: '30px'}}>
                    Register
                </Title>

                <Form
                    form={form}
                    name="register"
                    layout="vertical"
                    onFinish={handleSubmit}
                    autoComplete="off"
                >
                    <Form.Item
                        name="username"
                        rules={[
                            {required: true, message: 'Please input your username!'},
                            {min: 3, message: 'Username must be at least 3 characters!'}
                        ]}
                    >
                        <Input
                            prefix={<UserOutlined/>}
                            placeholder="Username"
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        rules={[
                            {required: true, message: 'Please input your email!'},
                            {type: 'email', message: 'Please enter a valid email address!'}
                        ]}
                    >
                        <Input
                            prefix={<MailOutlined/>}
                            placeholder="Email"
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            {required: true, message: 'Please input your password!'},
                            {min: 6, message: 'Password must be at least 6 characters!'}
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined/>}
                            placeholder="Password"
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item
                        name="confirmPassword"
                        dependencies={['password']}
                        rules={[
                            {required: true, message: 'Please confirm your password!'},
                            ({getFieldValue}) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The two passwords do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined/>}
                            placeholder="Confirm Password"
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            size="large"
                            loading={loading}
                        >
                            Register
                        </Button>
                    </Form.Item>

                    <div style={{textAlign: 'center'}}>
                        Already have an account? <Link to="/login">Login now</Link>
                    </div>
                </Form>
            </Card>
        </div>
    );
};

export default RegisterPage;