"use client";
import React, { useContext, useRef, useState } from "react";
import axios from "axios";
import signature from "./Image/signature.png";
import { AuthContext } from "@/app/context/AuthContext";
import { baseURL } from "@/Utils/Utils";
export default function Dashboard({ pdfRef, downloadPDF }) {
  // console.log(signature);

  const [items, setItems] = useState([
    {
      itemname: "",
      qty: 1,
      rate: 0,
      subitems: [{ subitemname: "seal replacement", qty: 1, rate: 0 }],
    },
  ]);

  const [customerDetails, setCustomerDetails] = useState({
    customername: "",
    address: "",
    gstNo: "",
  });

  const [transportDetails, setTransportDetails] = useState({
    vehiclename: "",
    from: "",
    to: "",
  });

  const [code, SetCode] = useState({});



  const [cgstPercent, setCgstPercent] = useState(0);
  const [sgstPercent, setSgstPercent] = useState(0);
  const [igstPercent, setIgstPercent] = useState(0);

  const handleCustomerChange = (field, value) => {
    setCustomerDetails({ ...customerDetails, [field]: value });
  };

  const handleTransportChange = (field, value) => {
    setTransportDetails({ ...transportDetails, [field]: value });
  };

  const handleChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = field === "itemname" ? value : Number(value) || 0;
    setItems(updated);
  };

  const handleSubItemChange = (itemIndex, subIndex, field, value) => {
    const updated = [...items];
    const subitem = updated[itemIndex].subitems[subIndex];
    subitem[field] = field === "subitemname" ? value : Number(value) || 0;
    setItems(updated);
  };

  const addSubItem = (index) => {
    const updated = [...items];
    updated[index].subitems.push({ subitemname: "", qty: 1, rate: 0 });
    setItems(updated);
  };

  const removeSubItem = (itemIndex, subIndex) => {
    const updated = [...items];
    updated[itemIndex].subitems.splice(subIndex, 1);
    setItems(updated);
  };

  const addRows = () => {
    setItems([...items, { itemname: "", qty: 1, rate: 0, subitems: [] }]);
  };

  const removeRow = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const totalAmount = items.reduce((sum, item) => {
    const subSum = item.subitems?.reduce((s, sub) => s + sub.qty * sub.rate, 0);
    return sum + item.qty * item.rate + subSum;
  }, 0);

  const cgstAmount = (totalAmount * cgstPercent) / 100;
  const sgstAmount = (totalAmount * sgstPercent) / 100;
  const igstAmount = (totalAmount * igstPercent) / 100;
  const totalAfterTax = totalAmount + cgstAmount + sgstAmount + igstAmount;
  const {AuthData} = useContext(AuthContext)

  async function AddData() {
    try {
      const body = {
        transportDetails,
        customerDetails,
        items,
        igstPercent,
        sgstPercent,
        cgstPercent,
        code,
        userId:AuthData.userId
      };

      const response = await axios.post(
        `${baseURL}/balaji/post`,
        body
      );
      if (response) alert("History Successfully Saved");
    } catch (error) {
      console.error("Error posting data:", error);
    }
  }

  return (
    <div ref={pdfRef}>
      <div className="relative bg-amber-50 text-black min-h-screen p-4 space-y-6">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -rotate-40 text-blue-600 opacity-20 text-[80px] font-extrabold whitespace-nowrap z-0 pointer-events-none select-none">
          Balaji Pump Repair Center
        </div>

        <div className="relative z-10 space-y-6">
          {/* Invoice Info */}
          {/* Invoice Info */}
          <div className="flex justify-between gap-6">
            <div className="w-1/5">
              <h2 className="font-semibold mb-1">INVOICE NO</h2>
              <input
                type="text"
                placeholder="Invoice No"
                className="border border-amber-300 px-2 py-1 rounded w-full"
                onChange={(e) =>
                  SetCode((prev) => ({ ...prev, InvoiceNo: e.target.value }))
                }
              />
            </div>

            <div className="w-1/5 text-right">
              <h2 className="font-semibold mb-1">STATE CODE</h2>
              <input
                type="text"
                placeholder="State Code"
                className="border border-amber-300 px-2 py-1 rounded w-full text-right"
                onChange={(e) =>
                  SetCode((prev) => ({ ...prev, state: e.target.value }))
                }
              />
            </div>
          </div>

          {/* Customer and Transport Details */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h2 className="font-semibold">Purchaser Details</h2>
              <input
                className="w-full border border-amber-300 px-2 py-1 rounded  bg-[#FFFBEB]"
                placeholder="Customer Name"
                value={customerDetails.customername}
                onChange={(e) =>
                  handleCustomerChange("customername", e.target.value)
                }
              />
              <input
                className="w-full border border-amber-300 px-2 py-1 rounded  bg-[#FFFBEB]"
                placeholder="Address"
                value={customerDetails.address}
                onChange={(e) =>
                  handleCustomerChange("address", e.target.value)
                }
              />
              <input
                className="w-full border border-amber-300 px-2 py-1 rounded  bg-[#FFFBEB]"
                placeholder="GST Number"
                value={customerDetails.gstNo}
                onChange={(e) => handleCustomerChange("gstNo", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <h2 className="font-semibold">Transport Details</h2>
              <input
                className="w-full border border-amber-300 px-2 py-1 rounded bg-[#FFFBEB]"
                placeholder="Vehicle No"
                value={transportDetails.vehiclename}
                onChange={(e) =>
                  handleTransportChange("vehiclename", e.target.value)
                }
              />
              <input
                className="w-full border border-amber-300 px-2 py-1 rounded  bg-[#FFFBEB]"
                placeholder="From"
                value={transportDetails.from}
                onChange={(e) => handleTransportChange("from", e.target.value)}
              />
              <input
                className="w-full border border-amber-300 px-2 py-1 rounded  bg-[#FFFBEB]"
                placeholder="To"
                value={transportDetails.to}
                onChange={(e) => handleTransportChange("to", e.target.value)}
              />
            </div>
          </div>

          {/* Item Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-amber-300  bg-[#FFFBEB]">
              <thead className="bg-amber-400 text-black">
                <tr>
                  <th className="border px-2 py-1">S.No</th>
                  <th className="border px-2 py-1">Item</th>
                  <th className="border px-2 py-1">Qty</th>
                  <th className="border px-2 py-1">Rate</th>
                  <th className="border px-2 py-1">Amount</th>
                  <th className="border px-2 py-1">Remove</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, i) => (
                  <React.Fragment key={i}>
                    <tr>
                      <td className="border px-2 py-1 text-center">{i + 1}</td>
                      <td className="border px-2 py-1">
                        <input
                          className="w-full border border-amber-300 px-1 rounded"
                          value={item.itemname}
                          onChange={(e) =>
                            handleChange(i, "itemname", e.target.value)
                          }
                        />
                        <button
                          onClick={() => addSubItem(i)}
                          className="text-xs mt-1 text-blue-600 hover:underline"
                        >
                          ➕ Add Sub Item
                        </button>
                      </td>
                      <td className="border px-2 py-1 text-center">
                        <input
                          type="number"
                          className="w-full border border-amber-300 px-1 rounded text-center"
                          value={item.qty}
                          onChange={(e) =>
                            handleChange(i, "qty", e.target.value)
                          }
                        />
                      </td>
                      <td className="border px-2 py-1 text-right">
                        <input
                          type="number"
                          className="w-full border border-amber-300 px-1 rounded text-right"
                          value={item.rate}
                          onChange={(e) =>
                            handleChange(i, "rate", e.target.value)
                          }
                        />
                      </td>
                      <td className="border px-2 py-1 text-right">
                        ₹{(item.qty * item.rate).toFixed(2)}
                      </td>
                      <td className="border px-2 py-1 text-center">
                        <button
                          onClick={() => removeRow(i)}
                          className="text-red-600 hover:text-red-800"
                        >
                          ❌
                        </button>
                      </td>
                    </tr>

                    {/* Sub Items */}
                    {item.subitems?.map((sub, j) => (
                      <tr key={`${i}-sub-${j}`} className="bg-amber-50 text-xs">
                        <td></td>
                        <td className="border px-2 py-1 pl-6">
                          ↳
                          <input
                            className="ml-1 border border-amber-300 px-1 rounded w-3/4"
                            value={sub.subitemname}
                            placeholder="Sub Item Name"
                            onChange={(e) =>
                              handleSubItemChange(
                                i,
                                j,
                                "subitemname",
                                e.target.value
                              )
                            }
                          />
                        </td>
                        <td className="border px-2 py-1 text-center">
                          <input
                            type="number"
                            className="w-full border border-amber-300 px-1 rounded text-center"
                            value={sub.qty}
                            onChange={(e) =>
                              handleSubItemChange(i, j, "qty", e.target.value)
                            }
                          />
                        </td>
                        <td className="border px-2 py-1 text-right">
                          <input
                            type="number"
                            className="w-full border border-amber-300 px-1 rounded text-right"
                            value={sub.rate}
                            onChange={(e) =>
                              handleSubItemChange(i, j, "rate", e.target.value)
                            }
                          />
                        </td>
                        <td className="border px-2 py-1 text-right">
                          ₹{(sub.qty * sub.rate).toFixed(2)}
                        </td>
                        <td className="border px-2 py-1 text-center">
                          <button
                            onClick={() => removeSubItem(i, j)}
                            className="text-red-500 hover:text-red-700"
                          >
                            🗑
                          </button>
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>

            <div className="mt-4 flex gap-3">
              <button
                onClick={addRows}
                className=" print:hidden px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600"
              >
                ➕ Add Item
              </button>
              <button
                onClick={AddData}
                className=" print:hidden px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                💾 Save
              </button>
            </div>
          </div>

          {/* Summary */}
          <div className="flex justify-end">
            <table className="text-sm border border-amber-300 w-full max-w-md">
              <tbody>
                <tr>
                  <td className="border px-3 py-1 text-right bg-amber-100 font-semibold">
                    Total Amount:
                  </td>
                  <td className="border px-3 py-1 text-right">
                    ₹{totalAmount.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td className="border px-3 py-1 text-right bg-amber-100 font-semibold">
                    ADD : CGST (%)
                  </td>
                  <td className="border px-3 py-1 text-right">
                    <input
                      type="number"
                      className="w-1/2 border border-amber-300 px-1 rounded text-right"
                      value={cgstPercent}
                      onChange={(e) => setCgstPercent(Number(e.target.value))}
                    />
                    <span className="ml-2">₹{cgstAmount.toFixed(2)}</span>
                  </td>
                </tr>
                <tr>
                  <td className="border px-3 py-1 text-right bg-amber-100 font-semibold">
                    ADD : SGST (%)
                  </td>
                  <td className="border px-3 py-1 text-right">
                    <input
                      type="number"
                      className="w-1/2 border border-amber-300 px-1 rounded text-right"
                      value={sgstPercent}
                      onChange={(e) => setSgstPercent(Number(e.target.value))}
                    />
                    <span className="ml-2">₹{sgstAmount.toFixed(2)}</span>
                  </td>
                </tr>
                <tr>
                  <td className="border px-3 py-1 text-right bg-amber-100 font-semibold">
                    ADD : IGST (%)
                  </td>
                  <td className="border px-3 py-1 text-right">
                    <input
                      type="number"
                      className="w-1/2 border border-amber-300 px-1 rounded text-right"
                      value={igstPercent}
                      onChange={(e) => setIgstPercent(Number(e.target.value))}
                    />
                    <span className="ml-2">₹{igstAmount.toFixed(2)}</span>
                  </td>
                </tr>
                <tr>
                  <td className="border px-3 py-1 text-right bg-amber-200 font-bold text-amber-900">
                    Total After Tax:
                  </td>
                  <td className="border px-3 py-1 text-right font-bold bg-amber-200 text-amber-900">
                    ₹{totalAfterTax.toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Bank Details & Footer */}
          <div className="text-sm space-y-1">
            <p>
              <strong>Bank:</strong> Axis Bank, Narela Delhi-110040
            </p>
            <p>
              <strong>Account No:</strong> 919020012035899
            </p>
            <p>
              <strong>IFSC:</strong> UTIB0001260
            </p>
          </div>

          <div className="relative text-right">
            {/* Stamp */}
            <div className="absolute -top-6 right-0 transform rotate-[-12deg] z-10 opacity-80 pointer-events-none select-none">
              <div className="border-2 border-blue-700 text-blue-700 text-sm font-bold uppercase px-4 py-1 tracking-wide rounded">
                Bala Ji Pump Repair Center
              </div>
            </div>

            {/* Signature Content */}

            <p className="mt-1">Authorised Signatory</p>
            <div className="absolute bottom-4 right-4 z-50">
              <img src={signature.src} alt="Signature" className="h-16" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
