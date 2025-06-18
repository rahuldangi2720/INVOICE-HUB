"use client";

import React, { useContext, useEffect, useRef } from "react";
import Navbar from "./Navbar";
import Dashboard from "./Dashbard";
import { AuthContext } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";

const Home = () => {
  const { AuthData } = useContext(AuthContext);
  const router = useRouter();

  const pdfRef = useRef();

  useEffect(() => {
    if (!AuthData?.token) {
      router.push("/");
    }
  }, [AuthData]);

  const downloadPDF = () => {
    const input = pdfRef.current;

    if (!input) return;

    toPng(input, { cacheBust: true })
      .then((imgData) => {
        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        const img = new Image();
        img.src = imgData;

        img.onload = () => {
          const ratio = Math.min(pdfWidth / img.width, pdfHeight / img.height);
          const imgX = (pdfWidth - img.width * ratio) / 2;
          const imgY = 10;

          pdf.addImage(
            img,
            "PNG",
            imgX,
            imgY,
            img.width * ratio,
            img.height * ratio
          );
          pdf.save("invoice.pdf");
        };
      })
      .catch((err) => {
        console.error("PDF generation failed:", err);
      });
  };

  return (
    <>
      {/* ✅ Wrap both Navbar + Dashboard inside one ref */}
      <div ref={pdfRef} className="bg-white text-black p-4">
        <Navbar />
        <Dashboard />
      </div>

      {/* ✅ Trigger button can be outside */}
      <div className="p-4">
        <button
          onClick={downloadPDF}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Download Full Invoice
        </button>
      </div>
    </>
  );
};

export default Home;
