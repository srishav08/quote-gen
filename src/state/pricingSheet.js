const pricing = {
    core: {
        mdf: {
            base: 725,
            tall: 770,
            wall: 560,
            shelf: 135,
            tandem: 135
        },
        hdhmr: {
            base: 860,
            tall: 880,
            wall: 640,
            shelf: 180,
            tandem: 180
        },
        bwr: {
            base: 840,
            tall: 860,
            wall: 630,
            shelf: 165,
            tandem: 165
        },
        bwp: {
            base: 905,
            tall: 915,
            wall: 665,
            shelf: 185,
            tandem: 185
        }
    },
    shutter: {
        "0.8mm": 299,
        "1mm": 325,
        pvc: 349,
        acrylic: 399
    }
};

const hardwareCatlog = {
    hafele: [
  {
    article: "549.09.313",
    item_name: "Side pullout, 300mm, solid base, Anthracite basket",
    mrp: "19425"
  },
  {
    article: "549.37.300",
    item_name: "Bottle Pullout 150 mm Door With Solid Base, Anthracite Basket",
    mrp: "11355"
  },
  {
    article: "513.04.316",
    item_name: "Matrixbox Premium +, Soft Close, Metallic Anthracite, 40Kg, Nominal Length 500MM",
    mrp: "6400"
  },
  {
    article: "513.04.395",
    item_name: "Matrixbox Premium +, Soft Close, Metallic Anthracite, 70Kg, Nominal Length 500MM",
    mrp: "8400"
  },
  {
    article: "551.60.345",
    item_name: "Matrixbox Premium, Rectangular Gallery Set, Metallic Anthracite, Nominal Length 500MM",
    mrp: "1250"
  },
  {
    article: "540.57.055",
    item_name: "Wicker Basket with Handle 600mm",
    mrp: "13550"
  },
  {
    article: "544.07.086",
    item_name: "Dish Rack for Cabinet Width 900mm, SS and Plastic",
    mrp: "17090"
  },
  {
    article: "556.50.556",
    item_name: "Plates Organisation 500/60/Silver D Texture",
    mrp: "4150"
  },
  {
    article: "556.55.526",
    item_name: "Ergo-Fit, Sky Cutlery Tray for 600 mm Drawer Silver Grey",
    mrp: "2205"
  },
  {
    article: "542.00.303/04",
    item_name: "Corner Unit 450mm Door Width, Solid Anthracite Basket Right/Left",
    mrp: "57750"
  },
  {
    article: "546.80.345",
    item_name: "Pantry Unit, 1900-2200 mm, 05 Set Solid Base, Anthracite Basket, Cabinet Width 450",
    mrp: "77325"
  },
  {
    article: "546.81.353",
    item_name: "Pantry Unit, 1900-2200 mm, 05 Set Solid Base, Anthracite Basket, Cabinet Width 600",
    mrp: "80570"
  }

],
    ebco: [
  {
    article: "PMDS1-55-S3",
    item_name: "Pro Motion Drawer System 90 - Slim2, 50 Kg (90x500)",
    mrp: "3196"
  },
  {
    article: "PMDS2-50-S3-OK",
    item_name: "Pro Motion Drawer System 120 - Slim2, 50 Kg (120x500)",
    mrp: "3426"
  },
  {
    article: "PMDS3-50-S3-OK",
    item_name: "Pro Motion Drawer System 175 - Slim2, 50 Kg (175x500)",
    mrp: "3870"
  },
  {
    article: "KCT4-60-AT",
    item_name: "Kitchen Cutlery",
    mrp: "1117"
  },
  {
    article: "KCT4-80-AT",
    item_name: "Kitchen Cutlery",
    mrp: "2112"
  },
  {
    article: "KCT2-90-AT",
    item_name: "Kitchen Cutlery",
    mrp: "2409"
  },
  {
    article: "PWB-22-20-06",
    item_name: "Plastic Wicker Basket (With Wooden Frame and Side)",
    mrp: "7329"
  },
  {
    article: "PWB-22-20-07",
    item_name: "Plastic Wicker Basket (With Wooden Frame and Side)",
    mrp: ""
  },
  {
    article: "RA-BCCS1-21-20-4",
    item_name: "Plain Basket SS",
    mrp: "3219"
  },
  {
    article: "RA-BCCS1-21-20-8",
    item_name: "Plain Basket SS",
    mrp: "3837"
  },
  {
    article: "RA-BCCS1-21-20-4-CT",
    item_name: "Right Angle Cutlery Basket - SS",
    mrp: "6031"
  },
  {
    article: "RA-BCCS1-21-20-4-CS",
    item_name: "Right Angle Cup & Saucer Kitchen Basket - SS",
    mrp: "3648"
  },
  {
    article: "RA-BCCS1-21-20-8-TH",
    item_name: "Right Angle Thali Kitchen Basket - SS",
    mrp: "3251"
  },
  {
    article: "MC90-R/L",
    item_name: "Magic Corner System - Right/Left ((868-928)x535x585 mm)",
    mrp: "26754"
  },
  {
    article: "KPUSC1-45",
    item_name: "Kitchen Pantry Unit 450mm - Soft Close (With Set of 6+6 Shelves)",
    mrp: "30618"
  },
  {
    article: "KPUSC1-60",
    item_name: "Kitchen Pantry Unit 600mm - Soft Close (With Set of 6+6 Shelves)",
    mrp: "35543"
  },
  {
    article: "RTPV-60130-SL",
    item_name: "ROLL TOP PRO - Vertical (600x1350)",
    mrp: "14131"
  },
  {
    article: "BPO2SC2G-150-AT",
    item_name: "Bottle PullOut - 200 mm Cabinet Width",
    mrp: "9343"
  },
  {
    article: "BPO2SC2G-200-AT",
    item_name: "Bottle PullOut - 250 mm Cabinet Width",
    mrp: "9708"
  },
  {
    article: "BPO2SC2G-250-AT",
    item_name: "Bottle PullOut - 300 mm Cabinet Width",
    mrp: "10376"
  },
  {
    article: "KPDSG60-AT",
    item_name: "Kitchen Pulldown System 600mm Mechanism with Glass Baskets",
    mrp: "24812"
  },
  {
    article: "KPDSG90-AT",
    item_name: "Kitchen Pulldown System 900mm Mechanism with Glass Baskets",
    mrp: "27724"
  },
  {
    article: "GTPT",
    item_name: "Kitchen Glass Tray Plate Tray - 550x240x90",
    mrp: "7400"
  },
  {
    article: "PVCSE-10-BL-30",
    item_name: "PVC Skirting Coextruded - Black in 3.0 mtr length",
    mrp: "1242"
  }

],
    ozone: [
  { article: "PVC Cutlery tray (500 Depth)", item_name: "W:530xD:485xH:50 (600 mm)", mrp: "965" },
  { article: "PVC Cutlery tray (500 Depth)", item_name: "W:830xD:485xH:50 (900 mm)", mrp: "1940" },

  { article: "OE-DWDS-PRO-S TNDM - 4\" - S Size", item_name: "84x500 (Anthgrey) 25 Kg", mrp: "3480" },
  { article: "OE-DWDS-PRO-S TNDM - 6\" - M Size", item_name: "116x500 (Anthgrey) 25 Kg", mrp: "3690" },
  { article: "OE-DWDS-PRO-S - TNDM 8\" - L Size", item_name: "167x500 (Anthgrey) 25 Kg", mrp: "3905" },

  { article: "OK-BPO-GB-02-R Tndm BPO", item_name: "2-Rack (Width 200 mm) LR", mrp: "10130" },
  { article: "OK-BPO-GB-02-R Tndm BPO", item_name: "2-Rack (Width 300 mm) LR", mrp: "11205" },
  { article: "Bottle Pullout (500) Chrome Basket", item_name: "2-Rack (Width 150 mm) LR", mrp: "9300" },

  { article: "Bottle Pullout - SS (6\")", item_name: "150x500x450 mm", mrp: "2360" },
  { article: "Bottle Pullout - SS (8\")", item_name: "200x500x450 mm", mrp: "2955" },

  { article: "OE-RS-M Rolling Shutter System", item_name: "Finish - Silver (PVC Material) (600x1400)", mrp: "23530" },

  { article: "Wicker Baskets - PVC (Cab Size 600)", item_name: "W:564xD:508xH:100", mrp: "6825" },
  { article: "Wicker Baskets - PVC (Cab Size 600)", item_name: "W:564xD:508xH:150", mrp: "7655" },
  { article: "Wicker Baskets - PVC (Cab Size 600)", item_name: "W:564xD:508xH:200", mrp: "8385" },

  { article: "Universal Magic Corner (20Kg) SSS (900 MM)", item_name: "Min (W:1000xD:500xH:650) SS Basket Glass", mrp: "9680" },
  { article: "Universal Magic Corner (20Kg) GREY (900 MM)", item_name: "Min (W:1000xD:500xH:650) SS Basket Glass", mrp: "22160" },

  { article: "S-Carrousel", item_name: "900 mm (LR)", mrp: "30565" },

  { article: "SS - Thali Basket (20\")", item_name: "W:530xD:500xH:200", mrp: "2710" },
  { article: "SS Cutlery Basket (500 Depth)", item_name: "W:530xD:500xH:100", mrp: "3975" },
  { article: "SS - Plain Vegetable Basket (4\" Height)", item_name: "W:429xD:500xH:150", mrp: "2425" },
  { article: "SS - Plate Basket (6\" Height)", item_name: "W:530xD:500xH:150", mrp: "2540" },
  { article: "SS - Plain Basket (8\" Height)", item_name: "W:530xD:500xH:200", mrp: "2620" },
  { article: "SS - Grain Trolley Basket", item_name: "W:530xD:500xH:200", mrp: "2830" },

  { article: "Full Extension Ball Bearing Slides (Channels)", item_name: "Soft Close (20 Inch) SS - 45 Kg", mrp: "2345" },
  { article: "Full Extension Ball Bearing Slides (Channels)", item_name: "Soft Close (20 Inch) Zinc - 35 Kg", mrp: "1005" },

  { article: "Kitchen Pantry Unit Mechanism SS", item_name: "450 mm W x 2160 H (6+6 Cabinet Basket)", mrp: "37850" },
  { article: "Kitchen Pantry Unit Mechanism SS", item_name: "600 mm W x 2160 H (6+6 Shelves)", mrp: "47125" },

  { article: "SS Dish Rack / GTPT - SS", item_name: "600 MM", mrp: "2880" },
  { article: "Swing Out Waste Bin", item_name: "10 Ltr", mrp: "3905" },
  { article: "Detergent Rack", item_name: "253x155x383 mm", mrp: "985" },

  // Hardware - OZONE
  { article: "Clear Glass", item_name: "4mm thickness (psf cost)", mrp: "60" },
  { article: "Hinges - 0 Degree Soft Close", item_name: "0 Degree", mrp: "705" },
  { article: "Corner Hinge (OEC35)", item_name: "135 Degree", mrp: "305" },
  { article: "Corner Hinge Soft Close (OEC352)", item_name: "165 Degree", mrp: "495" },
  { article: "Blind Corner Hinge", item_name: "Blind Corner", mrp: "605" },

  { article: "C Gola Profile", item_name: "Black (3 Mtr)", mrp: "2185" },
  { article: "J Gola Profile", item_name: "Black (3 Mtr)", mrp: "1860" },
  { article: "C & J Profile Connector", item_name: "4 Pc Set", mrp: "120" },
  { article: "G Handle Profile (Groove In)", item_name: "Black Matt (3 Mtr)", mrp: "2165" },
  { article: "Glass Frame Profile", item_name: "03 Mtr", mrp: "2600" },
  { article: "Glass Handle Profile", item_name: "03 Mtr", mrp: "3100" },
  { article: "Shutter Profile Connector", item_name: "For Glass Shutter (1 Set = 4 Pc)", mrp: "150" }

]

};
const accessoryCatlog = {
       ozone: [
  { article: "PVC Cutlery tray (500 Depth)", item_name: "W:530xD:485xH:50 (600 mm)", mrp: "965" },
  { article: "PVC Cutlery tray (500 Depth)", item_name: "W:830xD:485xH:50 (900 mm)", mrp: "1940" },

  { article: "OE-DWDS-PRO-S TNDM - 4\" - S Size", item_name: "84x500 (Anthgrey) 25 Kg", mrp: "3480" },
  { article: "OE-DWDS-PRO-S TNDM - 6\" - M Size", item_name: "116x500 (Anthgrey) 25 Kg", mrp: "3690" },
  { article: "OE-DWDS-PRO-S - TNDM 8\" - L Size", item_name: "167x500 (Anthgrey) 25 Kg", mrp: "3905" },

  { article: "OK-BPO-GB-02-R Tndm BPO", item_name: "2-Rack (Width 200 mm) LR", mrp: "10130" },
  { article: "OK-BPO-GB-02-R Tndm BPO", item_name: "2-Rack (Width 300 mm) LR", mrp: "11205" },
  { article: "Bottle Pullout (500) Chrome Basket", item_name: "2-Rack (Width 150 mm) LR", mrp: "9300" },

  { article: "Bottle Pullout - SS (6\")", item_name: "150x500x450 mm", mrp: "2360" },
  { article: "Bottle Pullout - SS (8\")", item_name: "200x500x450 mm", mrp: "2955" },

  { article: "OE-RS-M Rolling Shutter System", item_name: "Finish - Silver (PVC Material) (600x1400)", mrp: "23530" },

  { article: "Wicker Baskets - PVC (Cab Size 600)", item_name: "W:564xD:508xH:100", mrp: "6825" },
  { article: "Wicker Baskets - PVC (Cab Size 600)", item_name: "W:564xD:508xH:150", mrp: "7655" },
  { article: "Wicker Baskets - PVC (Cab Size 600)", item_name: "W:564xD:508xH:200", mrp: "8385" },

  { article: "Universal Magic Corner (20Kg) SSS (900 MM)", item_name: "Min (W:1000xD:500xH:650) SS Basket Glass", mrp: "9680" },
  { article: "Universal Magic Corner (20Kg) GREY (900 MM)", item_name: "Min (W:1000xD:500xH:650) SS Basket Glass", mrp: "22160" },

  { article: "S-Carrousel", item_name: "900 mm (LR)", mrp: "30565" },

  { article: "SS - Thali Basket (20\")", item_name: "W:530xD:500xH:200", mrp: "2710" },
  { article: "SS Cutlery Basket (500 Depth)", item_name: "W:530xD:500xH:100", mrp: "3975" },
  { article: "SS - Plain Vegetable Basket (4\" Height)", item_name: "W:429xD:500xH:150", mrp: "2425" },
  { article: "SS - Plate Basket (6\" Height)", item_name: "W:530xD:500xH:150", mrp: "2540" },
  { article: "SS - Plain Basket (8\" Height)", item_name: "W:530xD:500xH:200", mrp: "2620" },
  { article: "SS - Grain Trolley Basket", item_name: "W:530xD:500xH:200", mrp: "2830" },

  { article: "Full Extension Ball Bearing Slides (Channels)", item_name: "Soft Close (20 Inch) SS - 45 Kg", mrp: "2345" },
  { article: "Full Extension Ball Bearing Slides (Channels)", item_name: "Soft Close (20 Inch) Zinc - 35 Kg", mrp: "1005" },

  { article: "Kitchen Pantry Unit Mechanism SS", item_name: "450 mm W x 2160 H (6+6 Cabinet Basket)", mrp: "37850" },
  { article: "Kitchen Pantry Unit Mechanism SS", item_name: "600 mm W x 2160 H (6+6 Shelves)", mrp: "47125" },

  { article: "SS Dish Rack / GTPT - SS", item_name: "600 MM", mrp: "2880" },
  { article: "Swing Out Waste Bin", item_name: "10 Ltr", mrp: "3905" },
  { article: "Detergent Rack", item_name: "253x155x383 mm", mrp: "985" },

  // Hardware - OZONE
  { article: "Clear Glass", item_name: "4mm thickness (psf cost)", mrp: "60" },
  { article: "Hinges - 0 Degree Soft Close", item_name: "0 Degree", mrp: "705" },
  { article: "Corner Hinge (OEC35)", item_name: "135 Degree", mrp: "305" },
  { article: "Corner Hinge Soft Close (OEC352)", item_name: "165 Degree", mrp: "495" },
  { article: "Blind Corner Hinge", item_name: "Blind Corner", mrp: "605" },

  { article: "C Gola Profile", item_name: "Black (3 Mtr)", mrp: "2185" },
  { article: "J Gola Profile", item_name: "Black (3 Mtr)", mrp: "1860" },
  { article: "C & J Profile Connector", item_name: "4 Pc Set", mrp: "120" },
  { article: "G Handle Profile (Groove In)", item_name: "Black Matt (3 Mtr)", mrp: "2165" },
  { article: "Glass Frame Profile", item_name: "03 Mtr", mrp: "2600" },
  { article: "Glass Handle Profile", item_name: "03 Mtr", mrp: "3100" },
  { article: "Shutter Profile Connector", item_name: "For Glass Shutter (1 Set = 4 Pc)", mrp: "150" }

]
};

export  { pricing , hardwareCatlog , accessoryCatlog }