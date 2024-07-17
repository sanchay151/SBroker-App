import axios from "axios";
import { useState, useEffect } from "react";
import Spner from "./Spner";

const HomeCards = ({ gains, onClick }) => {
  const [data, setData] = useState({});
  const compname = gains.symbol;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://financialmodelingprep.com/api/v3/profile/${compname}?apikey=qe1euZUsQoZdqrjiPxFjR6Jtu8CEW9DO`);
        setData(response.data[0]);
      } catch (error) {
        console.error('Error fetching overview data:', error);
      }
    };

    if (compname) {
      fetchData();
    }
  }, [compname]);

  useEffect(() => {
    if (!data.image) {
      setLoading(false);
    }
  }, [data.image]);

  const handleImageLoad = () => {
    setLoading(false);
  };

  const handleImageError = () => {
    setLoading(false);
  };

  if (loading) {
    return <Spner />;
  }

  return (
    <div onClick={onClick} className="w-40 h-auto hover:scale-125
     bg-[#1B1B1B] rounded-lg p-4 flex flex-col
      justify-between text-white cursor-pointer
       transition-all hover:bg-[#333333] ml-2 mr-2">
      <div className="flex flex-col items-center">
        {data.image && (
          <img
            className="w-10 h-10 mb-2" 
            src={data.image} 
            alt="NA" 
            onLoad={handleImageLoad} 
            onError={handleImageError}
          />
        )}
        <div className="text-center">
          <div className="text-sm font-bold mb-2">{gains.name}</div>
          <div className="text-lg font-bold mb-1">₹{gains.price}</div>
          <div className={`text-sm ${gains.changesPercentage < 0 ? 'text-red-600' : 'text-green-600'}`}>
            {gains.changesPercentage}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeCards;
