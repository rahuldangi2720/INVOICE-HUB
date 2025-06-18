import axios from "axios";
import { useEffect, useState } from "react";
import {
  UserIcon,
  MapPinIcon,
  LandmarkIcon,
  TruckIcon,
  PercentIcon,
  PackageIcon,
  IndianRupeeIcon,
  ClockIcon,
} from "lucide-react";

const History = () => {
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get("http://localhost:8000/balaji/get");
        setHistoryData(response.data.data);
        console.log(response.data.data);
        
      } catch (error) {
        console.error("Error fetching history:", error);
      }
    };
    fetchHistory();
  }, []);

  return (
    <div className="p-6 bg-yellow-50 min-h-screen">
      <h2 className="text-4xl font-bold mb-8 text-yellow-800 border-b-4 border-yellow-500 inline-block pb-2">
        History Records
      </h2>

      <div className="space-y-6">
        {historyData.map((record, index) => (
          <div
            key={index}
            className="border border-yellow-300 p-6 rounded-3xl bg-yellow-100 shadow-md hover:shadow-xl transition-all duration-300 relative"
          >
            <div className="absolute top-2 right-4 text-xs font-medium text-yellow-700">
              #{index + 1}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 text-yellow-900">
              <InfoBlock
                icon={UserIcon}
                label="Customer Name"
                value={record.customerDetails.customername}
              />
              <InfoBlock
                icon={MapPinIcon}
                label="Address"
                value={record.customerDetails.address}
              />
              <InfoBlock
                icon={LandmarkIcon}
                label="GST No"
                value={record.customerDetails.gstNo}
              />
              <InfoBlock
                icon={TruckIcon}
                label="Vehicle"
                value={`${record.transportDetails.vehiclename} (${record.transportDetails.from} → ${record.transportDetails.to})`}
              />
              <InfoBlock
                icon={PercentIcon}
                label="GST Details"
                value={`CGST ${record.gst.cgstPercent}% | SGST ${record.gst.sgstPercent}% | IGST ${record.gst.igstPercent}%`}
              />

              {/* Items + Subitems */}
              <div className="flex items-start gap-2 col-span-full">
                <PackageIcon className="w-5 h-5 mt-1 text-yellow-600" />
                <div>
                  <p className="text-sm text-yellow-700">Items</p>
                  <ul className="list-disc list-inside space-y-1 text-base">
                    {record.items.map((item, idx) => (
                      <li key={idx}>
                        <span className="font-semibold">
                          ITEM-NAME = {item.itemname}
                        </span>{" "}
                        — Qty: {item.qty}, Rate: ₹{item.rate}
                        {/* Render subitems if they exist */}
                        {item.subitems?.length > 0 && (
                          <ul className="ml-5 list-disc text-sm text-yellow-800 mt-1 space-y-0.5">
                            {item.subitems.map((subitem, subIdx) => (
                              <li key={subIdx}>
                                <span className="font-medium">
                                  SUBITEM-NAME = {subitem.subitemname}
                                </span>{" "}
                                — Qty: {subitem.qty}, Rate: ₹{subitem.rate}
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Total Amount */}
              <div className="flex items-start gap-2">
                <IndianRupeeIcon className="w-5 h-5 mt-1 text-yellow-600" />
                <div>
                  <p className="text-sm text-yellow-700">Total Amount</p>
                  <p className="text-lg font-semibold text-yellow-900">
                    ₹{record.totalAmount} + Tax → ₹{record.totalAfterTax}
                  </p>
                </div>
              </div>
            </div>

            {/* Timestamp */}
            <div className="mt-6 flex justify-end items-center gap-2 text-sm text-yellow-700">
              <ClockIcon className="w-4 h-4" />
              <span>{new Date(record.createdAt).toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const InfoBlock = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-2">
    <Icon className="w-5 h-5 mt-1 text-yellow-600" />
    <div>
      <p className="text-sm text-yellow-700">{label}</p>
      <p className="text-lg">{value}</p>
    </div>
  </div>
);

export default History;
