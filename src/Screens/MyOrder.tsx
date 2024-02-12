import React, { useEffect, useState } from 'react';
import Footer from '../Components/Footer';
interface OrderDataItem {
  Order_date?: string;
  img: string;
  name: string;
  qty: number;
  size: string;
  price: number;
}

interface OrderResponse {
  orderData?: {
    order_data: OrderDataItem[];
  };
}

const MyOrder: React.FC = () => {
  const [orderData, setOrderData] = useState<OrderResponse | null>(null);

  const fetchMyOrder = async (): Promise<void> => {
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
      try {
        const response = await fetch('http://localhost:5000/api/myOrderData', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: userEmail }),
        });

        const data: OrderResponse = await response.json();
        setOrderData(data);
      } catch (error) {
        console.error('Error fetching order data:', error);
      }
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <div>
      <div className="container">
        <div className="row">
          {orderData?.orderData ? orderData.orderData.order_data
            .slice(0)
            .reverse()
            .map((item, index) => (
              <div key={index}>
                {item.Order_date ? (
                  <div className="m-auto mt-5">
                    {item.Order_date}
                    <hr />
                  </div>
                ) : (
                  <div className="col-12 col-md-6 col-lg-3">
                    <div className="card mt-3" style={{ width: '16rem', maxHeight: '360px' }}>
                      <img src={item.img} className="card-img-top" alt="..." style={{ height: '120px', objectFit: 'fill' }} />
                      <div className="card-body">
                        <h5 className="card-title">{item.name}</h5>
                        <div className="container w-100 p-0" style={{ height: '38px' }}>
                          <span className="m-1">{item.qty}</span>
                          <span className="m-1">{item.size}</span>
                          <span className="m-1">{item.Order_date}</span>
                          <div className="d-inline ms-2 h-100 w-20 fs-5">₹{item.price}/-</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )) : ''}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MyOrder;
