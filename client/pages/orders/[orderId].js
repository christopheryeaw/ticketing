import { useEffect, useState } from "react";
import StripeCheckout from 'react-stripe-checkout';
import useRequest from '../../hooks/use-request';
import Router from 'next/router';

const OrderShow = ({ order, currentUser }) => {
  const [ timeLeft, setTimeLeft ] = useState(0);
  const { doRequest, errors } = useRequest({
    url:'/api/payments',
    method: 'post',
    body: {
      orderId: order.id
    },
    onSuccess: (payment) => Router.push('/orders'),
  });

  useEffect(() => {
    const findTimeLeft = () => {
      const msleft = new Date(order.expiresAt) - new Date();
      setTimeLeft(Math.round(msleft / 1000));
    };

    findTimeLeft();
    const timerId = setInterval(findTimeLeft, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [order]);

  if (timeLeft < 0) {
    return <div>Order Expired</div>;
  }

  const msleft = new Date(order.expiresAt) - new Date();

  return (
    <div>
      Time left to pay: {timeLeft} seconds
      <StripeCheckout 
        token={({ id }) => doRequest({ token: id })}
        stripeKey="pk_test_51R8hrGFTpuBqHk1A5pu7YJ0Dqr48kNFyXCazvW3ogAEPNOGvF2340DzlxS4pE1aVRQ8UOeuvmY8ERzkjQBEB9Ej500eysm5wan"
        amount={order.ticket.price * 100}
        email={currentUser.email}
      />
      {errors}
    </div>
  );
};

OrderShow.getInitialProps = async (useContext, client) => {
  const { orderId } = useContext.query;
  const { data } = await client.get(`/api/orders/${orderId}`);

  return { order: data };
};

export default OrderShow;