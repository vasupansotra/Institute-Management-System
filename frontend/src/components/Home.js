import React, { useEffect, useState } from 'react';
import axios from 'axios';


const Home = () => {
  const [courseCount, setCourseCount] = useState(0);
  const [studentCount, setStudentCount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const [latestStudents, setLatestStudents] = useState([]);

  const getDashboardData = () => {
    // counts
    axios
      .get('https://ims-backend-vsr9.onrender.com/course/all-courses', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })

      .then((res) => {
        const courses = res.data.courses || [];
        setCourseCount(courses.length);
      })
      .catch(() => {
        // ignore
      });

    axios
      .get('https://ims-backend-vsr9.onrender.com/student/all-students', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })

      .then((res) => {
        const students = res.data.students || [];
        setStudentCount(students.length);

        // show some latest students
        setLatestStudents(students.slice(0, 4));
      })
      .catch(() => {
        // ignore
      });

    axios
      .get('https://ims-backend-vsr9.onrender.com/fee/payment-history', {

        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
      .then((res) => {
        const history = res.data.paymentHistory || [];
        const sum = history.reduce((acc, item) => acc + Number(item.amount || 0), 0);
        setTotalAmount(sum);
      })
      .catch(() => {
        // ignore
      });
  };

  useEffect(() => {
    getDashboardData();

    const handler = () => getDashboardData();
    window.addEventListener('payment_updated', handler);
    return () => window.removeEventListener('payment_updated', handler);
  }, []);

  const formatMoney = (n) => {
    try {
      return `Rs${Number(n || 0).toLocaleString('en-IN')}`;
    } catch {
      return `Rs${n || 0}`;
    }
  };

  return (
    <div className='home-wrapper'>
      <div className='home-stats-box'>
        <div className='home-stat'>
          <div className='home-stat-num'>{String(courseCount).padStart(3, '0')}</div>
          <div className='home-stat-label'>Courses</div>
          <div className='home-stat-sub' />
        </div>

        <div className='home-stat'>
          <div className='home-stat-num'>{String(studentCount).padStart(3, '0')}</div>
          <div className='home-stat-label'>Student</div>
          <div className='home-stat-sub' />
        </div>

        <div className='home-stat home-stat-amount'>
          <div className='home-stat-num'>
            {totalAmount ? totalAmount.toLocaleString('en-IN') : '0'}
          </div>
          <div className='home-stat-label'>Total Amount</div>
          <div className='home-stat-sub'>{formatMoney(totalAmount)}</div>
        </div>
      </div>

      <div className='home-student-grid'>
        {latestStudents.map((s, idx) => (
          <div className='home-student-card' key={s._id || idx}>
            <div className='home-student-top'>
              <div className='home-student-avatar-wrap'>
                {s.imageUrl ? (
                  <img className='home-student-avatar' src={s.imageUrl} alt={s.fullName} />
                ) : (
                  <div className='home-student-avatar home-student-avatar-placeholder' />
                )}
              </div>
              <div>
                <div className='home-student-name'>{s.fullName}</div>
                <div className='home-student-phone'>{s.phone}</div>
                <div className='home-student-email'>{s.email}</div>
              </div>
            </div>

            {/* Using payment history to show transaction-like info below (student name/date/time/amount/remark) */}
            <div className='home-student-tx'>
              <p className='home-student-tx-line'>
                <span className='home-student-tx-label'>Name:</span> {s.fullName}
              </p>
              <p className='home-student-tx-line'>
                <span className='home-student-tx-label'>Date:</span> {s.createdAt ? new Date(s.createdAt).toLocaleDateString() : '—'}
                {s.createdAt && (
                  <>
                    {' '}
                    <span className='home-student-tx-label'>Time:</span>{' '}
                    {new Date(s.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </>
                )}
              </p>
              <p className='home-student-tx-line'>
                <span className='home-student-tx-label'>Amount:</span> {formatMoney(0)}
              </p>
              <p className='home-student-tx-line'>
                <span className='home-student-tx-label'>Remark:</span> —
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;


