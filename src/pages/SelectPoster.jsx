import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function SelectPoster() {
  const navigate = useNavigate();
  const [filterImg, setFilterImg] = useState([]);
  const { docInfo, tempData, setTempInfo } = useContext(AppContext);
  useEffect(() => {
    if (!docInfo) {
      navigate("/");
    }
  }, [docInfo, navigate]);
  useEffect(() => {
    const filterset = tempData.filter((item) => {
      return item.date <= new Date().getDate();
    });
    setFilterImg(filterset);
  }, [tempData]);

  const handleSubmit = () => {
    let template_name = document
      .querySelector(".swiper-slide-active")
      .getAttribute("template-name");
    let findTemp = tempData.filter((item) => {
      return item.name === template_name;
    });
    console.log(findTemp);
    setTempInfo(findTemp[0]);
    navigate("/download-poster");
  };
  return (
    <div className="py-3">
      <div className="px-12">
        <Swiper
          pagination={true}
          navigation={{
            prevEl: ".prev",
            nextEl: ".next",
          }}
          modules={[Pagination, Navigation]}
          className="mySwiper shadow-lg border border-slate-200"
        >
          {filterImg?.map((item, i) => {
            return (
              <SwiperSlide
                key={i}
                template-name={item.name}
                template-date={item.date}
              >
                <img
                  src={`../template/${item.name}.png`}
                  alt="temp1"
                  className="w-full"
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
        <div className="swiper-button-prev prev swiperBtn"></div>
        <div className="swiper-button-next next swiperBtn"></div>
      </div>
      <div className="text-center mt-3">
        <button className="btn" onClick={handleSubmit}>
          Select Template
        </button>
      </div>
    </div>
  );
}
