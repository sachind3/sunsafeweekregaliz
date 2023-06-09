import { useContext, useEffect } from "react";
import { AppContext } from "../context";
import { useNavigate } from "react-router-dom";
// import TEMP1 from "./../assets/template1.png";
// import TEMP2 from "./../assets/template2.png";
// import TEMP3 from "./../assets/template3.png";
// import TEMP4 from "./../assets/template4.png";
// import TEMP5 from "./../assets/template5.png";
// import TEMP6 from "./../assets/template6.png";
// import TEMP7 from "./../assets/template7.png";

import { BsFileImage, BsFilePdf, BsArrowClockwise } from "react-icons/bs";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function DownloadPoster() {
  const navigate = useNavigate();
  const { docInfo, setIsLoading, tempInfo } = useContext(AppContext);
  useEffect(() => {
    if (!docInfo) {
      navigate("/");
    }
  }, [docInfo, navigate]);

  const reloadPage = () => {
    window.location.reload();
  };
  const downloadImage = () => {
    setIsLoading(true);
    window.scrollTo(0, 0);
    html2canvas(document.getElementById("fullImg"), {
      allowTaint: true,
      useCORS: true,
      logging: true,
      scrollX: 0,
      scrollY: -window.scrollY,
      onrendered: function (canvas) {
        document.body.appendChild(canvas);
        window.scrollTo(0, 0);
      },
    })
      .then((canvas) => {
        var myImage = canvas.toDataURL("image/jpeg", 1);
        const link = document.createElement("a");
        link.href = myImage;
        link.target = "_blank";
        link.setAttribute("download", "image.jpeg");
        document.body.appendChild(link);
        link.click();
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
        alert("oops, something went wrong!", error);
      });
  };

  const getPDF = async () => {
    setIsLoading(true);
    window.scrollTo(0, 0);
    html2canvas(document.getElementById("fullImg"), {
      allowTaint: true,
      useCORS: true,
      logging: true,
      scrollX: 0,
      scrollY: -window.scrollY,
      onrendered: function (canvas) {
        document.body.appendChild(canvas);
        window.scrollTo(0, 0);
      },
    })
      .then((canvas) => {
        const img = canvas.toDataURL("image/jpeg", 1);
        const pdf = new jsPDF("p", "px", [620, 1104]);
        pdf.addImage(img, "jpeg", 0, 0, 620, 1104);
        pdf.save("file.pdf");
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
        alert("oops, something went wrong!", error);
      });
  };
  return (
    <>
      <div className="relative w-full mt-auto mb-auto">
        <div
          id="fullImg"
          className="fullImg w-[310px] mx-auto bg-white relative"
        >
          {tempInfo?.name && <img src={`../template/${tempInfo?.name}.png`} />}
          {/* {new Date().getDate() > 17 && new Date().getDate() < 22 && (
            <img src={TEMP1} alt="poster" />
          )}
          {new Date().getDate() === 22 && <img src={TEMP2} alt="poster" />}
          {new Date().getDate() === 23 && <img src={TEMP3} alt="poster" />}
          {new Date().getDate() === 24 && <img src={TEMP4} alt="poster" />}
          {new Date().getDate() === 25 && <img src={TEMP5} alt="poster" />}
          {new Date().getDate() === 26 && <img src={TEMP6} alt="poster" />}
          {new Date().getDate() === 27 && <img src={TEMP7} alt="poster" />} */}

          <div className="absolute w-full bottom-16 px-7">
            <div className="w-full relative">
              <div className="rounded-full w-[70px] h-[70px] p-0.5 bg-yellow-600 absolute left-0 top-1/2 -translate-y-1/2">
                <img src={docInfo?.photo} className="w-full rounded-full" />
              </div>
              <div className="w-full bg-white rounded-3xl pl-[75px] py-1">
                <div className="text-sm font-bold">{docInfo?.fullName}</div>
                <div className="text-sm">{docInfo?.mobile}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="actionBtns">
        <button onClick={reloadPage}>
          <BsArrowClockwise />
        </button>
        <button onClick={downloadImage}>
          <BsFileImage />
        </button>
        <button onClick={getPDF}>
          <BsFilePdf />
        </button>
      </div>
    </>
  );
}
