const HistoryModel = require("../Model/HistoryModel");

exports.AddHistory = async (req, res) => {
  try {
    const { transportDetails, customerDetails, items, igstPercent, sgstPercent, cgstPercent, code } = req.body;
    console.log(code);
    
   
    const totalAmount = items.reduce((sum, item) => {
      const itemTotal = item.qty * item.rate;
      const subitemsTotal = item.subitems?.reduce((subSum, sub) => subSum + sub.qty * sub.rate, 0) || 0;
      return sum + itemTotal + subitemsTotal;
    }, 0);

    const cgstAmount = (totalAmount * cgstPercent) / 100;
    const sgstAmount = (totalAmount * sgstPercent) / 100;
    const igstAmount = (totalAmount * igstPercent) / 100;
    const totalAfterTax = totalAmount + cgstAmount + sgstAmount + igstAmount;

    const dataToSave = {
      transportDetails,
      customerDetails,
      items,
      gst: {
        igstPercent,
        sgstPercent,
        cgstPercent
      },
      totalAmount,
      cgstAmount,
      sgstAmount,
      igstAmount,
      totalAfterTax,
      State:code.state,
      InvoiceNo:code.InvoiceNo
    };

    const addhistory = new HistoryModel(dataToSave);
    await addhistory.save();

    res.status(201).json({ message: "History saved successfully", data: addhistory });
  } catch (error) {
    console.error("❌ Error adding history:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getAllHistory = async (req, res) => {
  try {
    const allHistory = await HistoryModel.find().sort({ createdAt: -1 });
    res.status(200).json({ message: "Fetched History Successfully", data: allHistory });
  } catch (error) {
    console.error("❌ Error in getAllHistory:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
