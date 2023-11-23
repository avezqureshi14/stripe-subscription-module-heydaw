import React, { useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { Form, Input, Button, Card, message } from 'antd';

const PaymentForm = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [coupon, setCoupon] = useState('');
    const stripe = useStripe();
    const elements = useElements();

    const onFinish = async (values) => {
        try {
            setLoading(true); 

            const paymentMethod = await stripe.createPaymentMethod({
                type: 'card',
                card: elements.getElement(CardElement),
            });

            const response = await fetch('https://avez-heydaw.onrender.com/api/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: values.name,
                    email: values.email,
                    paymentMethod: paymentMethod.paymentMethod.id,
                    coupon,
                }),
            });

            if (!response.ok) {
                message.error('Payment Unsuccessful!');
                setLoading(false); 
                return;
            }

            const data = await response.json();
            const confirm = await stripe.confirmCardPayment(data.clientSecret);

            if (confirm.error) {
                message.error('Payment unsuccessful');
                setLoading(false); 
                return;
            }

            message.success('Payment successful! Thanks for subscribing');
        } catch (error) {
            console.log(error);
            message.error('Payment failed' + error.message);
        } finally {
            setLoading(false); 
        }
    };

    return (
        <section class="subscription" >
        <div className="subscribe">
        <div class="heading">
            <h2 id='subscription' >Subscribe to our monthly plan 🎯 </h2>
        </div>
        <Card style={{ width: '100%' }}>
            <Form form={form} onFinish={onFinish}>
                <Form.Item name="name" rules={[{ required: true, message: 'Please enter your name' }]}>
                    <Input placeholder="Enter name" />
                </Form.Item>
                <Form.Item name="email" rules={[{ required: true, message: 'Please enter your email' }]}>
                    <Input type="email" placeholder="Enter email" />
                </Form.Item>
                <Form.Item name="coupon">
                    <Input placeholder="Enter coupon code" value={coupon} onChange={(e) => setCoupon(e.target.value)} />
                </Form.Item>
                <Form.Item name="cardDetails" rules={[{ required: true, message: 'Please enter card details' }]}>
                    <CardElement style={{ base: { fontSize: '16px' } }} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Subscribe
                    </Button>
                </Form.Item>
            </Form>
        </Card>
        </div>
    </section>

    );
};

export default PaymentForm;
