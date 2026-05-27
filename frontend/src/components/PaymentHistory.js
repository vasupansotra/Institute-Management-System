import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const PaymentHistory = () => {
  const [paymentHistory, setPaymentHistory] = useState([]);

  const getPaymentHistory = () => {
    axios
      .get('http://localhost:4200/fee/payment-history', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
      .then((res) => {
        setPaymentHistory(res.data.paymentHistory || []);
      })
      .catch((err) => {
        console.log(err);
        toast.error('something is wrong...');
      });
  };

  useEffect(() => {
    getPaymentHistory();

    const handler = () => getPaymentHistory();
    window.addEventListener('payment_updated', handler);
    return () => window.removeEventListener('payment_updated', handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Payment History</h1>

      {paymentHistory.length ? (
        <div className='course-wrapper'>
          {paymentHistory.map((p) => (
            <div className='course-box' key={p._id}>
              <div className='course-content' style={{ height: 'auto', minHeight: 150 }}>
                <h2 className='course-title'>{p.fullName}</h2>
                <p className='course-price'>Rs. {p.amount}</p>
                <p className='course-description'>Phone: {p.phone}</p>
                {p.remark && <p className='course-description'>Remark: {p.remark}</p>}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ padding: 10 }}>No payment history</div>
      )}
    </div>
  );
};

export default PaymentHistory;

