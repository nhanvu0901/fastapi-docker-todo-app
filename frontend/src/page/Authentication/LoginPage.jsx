import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Form, Input, Button, Card, Typography, message} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import {useMutation} from '@tanstack/react-query';
import {useDispatch} from 'react-redux';
import {loginUser} from '../../api/auth';
import {login} from '../../redux/uiSlice';


const {Title} = Typography;

const LoginPage = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const loginMutation = useMutation(
        {
            mutationFn: loginUser,
            onSuccess: (data) => {
                dispatch(login(data));
                message.success('Login successful!');
                navigate('/');
                setLoading(false);
            },
            onError: (error) => {
                message.error(error.message || 'Failed to login. Please check your credentials.');
                setLoading(false);
            },

        }
    );

    const handleSubmit = (values) => {
        setLoading(true);
        loginMutation.mutate(values);
    };

    return (
        <div style={{maxWidth: '400px', margin: '0 auto', marginTop: '50px'}}>
            <Card>
                <Title level={2} style={{textAlign: 'center', marginBottom: '30px'}}>
                    Login
                </Title>

                <Form
                    form={form}
                    name="login"
                    layout="vertical"
                    initialValues={{remember: true}}
                    onFinish={handleSubmit}
                    autoComplete="off"
                >
                    <Form.Item
                        name="username"
                        rules={[
                            {required: true, message: 'Please input your email!'},
                            {type: 'email', message: 'Please enter a valid email address!'}
                        ]}
                    >
                        <Input
                            prefix={<UserOutlined/>}
                            placeholder="Email"
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{required: true, message: 'Please input your password!'}]}
                    >
                        <Input.Password
                            prefix={<LockOutlined/>}
                            placeholder="Password"
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
                            Log In
                        </Button>
                    </Form.Item>

                    <div style={{textAlign: 'center'}}>
                        Don't have an account? <Link to="/register">Register now</Link>
                    </div>
                </Form>
            </Card>
        </div>
    );
};

export default LoginPage;