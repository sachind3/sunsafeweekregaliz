import { useContext, useEffect } from "react";
import { AppContext } from "../context";
import { useNavigate } from "react-router-dom";
import TEMP1 from "./../assets/template1.png";
import TEMP2 from "./../assets/template2.png";
import TEMP3 from "./../assets/template3.png";
import TEMP4 from "./../assets/template4.png";
import TEMP5 from "./../assets/template5.png";
import TEMP6 from "./../assets/template6.png";
import TEMP7 from "./../assets/template7.png";
import { BsFileImage, BsFilePdf, BsArrowClockwise } from "react-icons/bs";
import html2canvas from "html2canvas";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

export default function DownloadPoster() {
  const navigate = useNavigate();
  const { docInfo, setIsLoading } = useContext(AppContext);
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
    // let pdfPhoto = "";
    // const canvas = document.createElement("canvas");
    // const ctx = canvas.getContext("2d");
    // const img = new Image();
    // img.crossOrigin = "";
    // img.src = docInfo.photo;
    // img.onload = () => {
    //   canvas.width = 512;
    //   canvas.height = 512;
    //   if (tempInfo.design === 2) {
    //     hexshap(ctx, 0, 0, 512, 512, 512 / 2);
    //   } else {
    //     roundedImage(ctx, 0, 0, 512, 512, 512 / 2);
    //   }
    //   ctx.clip();
    //   ctx.drawImage(img, 0, 0, 512, 512);
    //   pdfPhoto = canvas.toDataURL("image/png");
    // };
    // const existingPdfBytes = await fetch(myPdf).then((res) =>
    //   res.arrayBuffer()
    // );
    // const pngImageBytes = await fetch(pdfPhoto).then((res) =>
    //   res.arrayBuffer()
    // );
    // const pdfDoc = await PDFDocument.load(existingPdfBytes);
    // const pngImage = await pdfDoc.embedPng(pngImageBytes);
    // const helveticaFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    // const pages = pdfDoc.getPages();
    // const firstPage = pages[0];
    // firstPage.drawText(docInfo.fullName, {
    //   x:
    //     firstPage.getWidth() / 2 -
    //     helveticaFont.widthOfTextAtSize(
    //       docInfo.fullName,
    //       tempInfo.pdf.name.size
    //     ) /
    //       2,
    //   y: tempInfo.pdf.name.y,
    //   size: tempInfo.pdf.name.size,
    //   font: helveticaFont,
    //   color: tempInfo.design === 2 ? rgb(1, 1, 1) : rgb(0, 0, 0),
    // });
    // firstPage.drawImage(pngImage, {
    //   x: tempInfo.pdf.img.x,
    //   y: tempInfo.pdf.img.y,
    //   width: tempInfo.pdf.img.width,
    //   height: tempInfo.pdf.img.height,
    // });
    // const pdfBytes = await pdfDoc.save();
    // download(pdfBytes, `pdf.pdf`, "application/pdf");
  };
  return (
    <>
      <div className="relative w-full mt-auto mb-auto">
        <div
          id="fullImg"
          className="fullImg w-[310px] mx-auto bg-white relative"
        >
          {new Date().getDate() > 17 && new Date().getDate() < 22 && (
            <img src={TEMP1} alt="poster" />
          )}
          {new Date().getDate() === 22 && <img src={TEMP2} alt="poster" />}
          {new Date().getDate() === 23 && <img src={TEMP3} alt="poster" />}
          {new Date().getDate() === 24 && <img src={TEMP4} alt="poster" />}
          {new Date().getDate() === 25 && <img src={TEMP5} alt="poster" />}
          {new Date().getDate() === 26 && <img src={TEMP6} alt="poster" />}
          {new Date().getDate() === 27 && <img src={TEMP7} alt="poster" />}

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
