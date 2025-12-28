const pricing = {
    core: {
        mdf: {
            base: 725,
            tall: 770,
            wall: 560,
            shelf: 130,
            tandem: 130
        },
        hdhmr: {
            base: 860,
            tall: 880,
            wall: 640,
            shelf: 175,
            tandem: 175
        },
        bwr: {
            base: 840,
            tall: 860,
            wall: 630,
            shelf: 160,
            tandem: 160
        },
        bwp: {
            base: 905,
            tall: 915,
            wall: 665,
            shelf: 185,
            tandem: 180
        }
    },
    shutter: {
        "0.8mm": 279,
        "1mm": 325,
        pvc: 329,
        acrylic: 399
    }
};

const hardwareInventoryCatalog = {
    hafele: [
  {
    id: "hafele_0",
    item_name: "Side pullout, 300mm, solid base, Anthracite basket",
    mrp: "19425"
  },
  {
    id: "hafele_1",
    item_name: "Bottle Pullout 150 mm Door With Solid Base, Anthracite Basket",
    mrp: "11355"
  },
  {
    id: "hafele_2",
    item_name: "Matrixbox Premium +, Soft Close, Metallic Anthracite, 40Kg, Nominal Length 500MM",
    mrp: "6400"
  },
  {
    id: "hafele_3",
    item_name: "Matrixbox Premium +, Soft Close, Metallic Anthracite, 70Kg, Nominal Length 500MM",
    mrp: "8400"
  },
  {
    id: "hafele_4",
    item_name: "Matrixbox Premium, Rectangular Gallery Set, Metallic Anthracite, Nominal Length 500MM",
    mrp: "1250"
  },
  {
    id: "hafele_5",
    item_name: "Wicker Basket with Handle 600mm",
    mrp: "13550"
  },
  {
    id: "hafele_6",
    item_name: "Dish Rack for Cabinet Width 900mm, SS and Plastic",
    mrp: "17090"
  },
  {
    id: "hafele_7",
    item_name: "Plates Organisation 500/60/Silver D Texture",
    mrp: "4150"
  },
  {
    id: "hafele_8",
    item_name: "Ergo-Fit, Sky Cutlery Tray for 600 mm Drawer Silver Grey",
    mrp: "2205"
  },
  {
    id: "hafele_9",
    item_name: "Corner Unit 450mm Door Width, Solid Anthracite Basket Right/Left",
    mrp: "57750"
  },
  {
    id: "hafele_10",
    item_name: "Pantry Unit, 1900-2200 mm, 05 Set Solid Base, Anthracite Basket, Cabinet Width 450",
    mrp: "77325"
  },
  {
    id: "hafele_11",
    item_name: "Pantry Unit, 1900-2200 mm, 05 Set Solid Base, Anthracite Basket, Cabinet Width 600",
    mrp: "80570"
  }

],
    ebco: [
  {
    id: "ebco_0",
    item_name: "Pro Motion Drawer System 90 - Slim2, 50 Kg (90x500)",
    mrp: "3196"
  },
  {
    id: "ebco_1",
    item_name: "Pro Motion Drawer System 120 - Slim2, 50 Kg (120x500)",
    mrp: "3426"
  },
  {
    id: "ebco_2",
    item_name: "Pro Motion Drawer System 175 - Slim2, 50 Kg (175x500)",
    mrp: "3870"
  },
  {
    id: "ebco_3",
    item_name: "Kitchen Cutlery",
    mrp: "1117"
  },
  {
    id: "ebco_4",
    item_name: "Kitchen Cutlery",
    mrp: "2112"
  },
  {
    id: "ebco_5",
    item_name: "Kitchen Cutlery",
    mrp: "2409"
  },
  {
    id: "ebco_6",
    item_name: "Plastic Wicker Basket (With Wooden Frame and Side)",
    mrp: "7329"
  },
  {
    id: "ebco_7",
    item_name: "Plastic Wicker Basket (With Wooden Frame and Side)",
    mrp: ""
  },
  {
    id: "ebco_8",
    item_name: "Plain Basket SS",
    mrp: "3219"
  },
  {
    id: "ebco_9",
    item_name: "Plain Basket SS",
    mrp: "3837"
  },
  {
    id: "ebco_10",
    item_name: "Right Angle Cutlery Basket - SS",
    mrp: "6031"
  },
  {
    id: "ebco_11",
    item_name: "Right Angle Cup & Saucer Kitchen Basket - SS",
    mrp: "3648"
  },
  {
    id: "ebco_12",
    item_name: "Right Angle Thali Kitchen Basket - SS",
    mrp: "3251"
  },
  {
    id: "ebco_13",
    item_name: "Magic Corner System - Right/Left ((868-928)x535x585 mm)",
    mrp: "26754"
  },
  {
    id: "ebco_14",
    item_name: "Kitchen Pantry Unit 450mm - Soft Close (With Set of 6+6 Shelves)",
    mrp: "30618"
  },
  {
    id: "ebco_15",
    item_name: "Kitchen Pantry Unit 600mm - Soft Close (With Set of 6+6 Shelves)",
    mrp: "35543"
  },
  {
    id: "ebco_16",
    item_name: "ROLL TOP PRO - Vertical (600x1350)",
    mrp: "14131"
  },
  {
    id: "ebco_17",
    item_name: "Bottle PullOut - 200 mm Cabinet Width",
    mrp: "9343"
  },
  {
    id: "ebco_18",
    item_name: "Bottle PullOut - 250 mm Cabinet Width",
    mrp: "9708"
  },
  {
    id: "ebco_19",
    item_name: "Bottle PullOut - 300 mm Cabinet Width",
    mrp: "10376"
  },
  {
    id: "ebco_20",
    item_name: "Kitchen Pulldown System 600mm Mechanism with Glass Baskets",
    mrp: "24812"
  },
  {
    id: "ebco_21",
    item_name: "Kitchen Pulldown System 900mm Mechanism with Glass Baskets",
    mrp: "27724"
  },
  {
    id: "ebco_22",
    item_name: "Kitchen Glass Tray Plate Tray - 550x240x90",
    mrp: "7400"
  },
  {
    id: "ebco_23",
    item_name: "PVC Skirting Coextruded - Black in 3.0 mtr length",
    mrp: "1242"
  }

],
    ozone: [
  { id: "ozone_0", item_name: "PVC Cutlery tray (500 Depth) W:530xD:485xH:50 (600 mm)", mrp: "965" },
  { id: "ozone_1", item_name: "PVC Cutlery tray (500 Depth) W:830xD:485xH:50 (900 mm)", mrp: "1940" },

  { id: "ozone_2", item_name: "OE-DWDS-PRO-S TNDM - 4\" - S Size 84x500 (Anthgrey) 25 Kg", mrp: "3480" },
  { id: "ozone_3", item_name: "OE-DWDS-PRO-S TNDM - 6\" - M Size 116x500 (Anthgrey) 25 Kg", mrp: "3690" },
  { id: "ozone_4", item_name: "OE-DWDS-PRO-S - TNDM 8\" - L Size 167x500 (Anthgrey) 25 Kg", mrp: "3905" },

  { id: "ozone_5", item_name: "OK-BPO-GB-02-R Tndm BPO 2-Rack (Width 200 mm) LR", mrp: "10130" },
  { id: "ozone_6", item_name: "OK-BPO-GB-02-R Tndm BPO 2-Rack (Width 300 mm) LR", mrp: "11205" },
  { id: "ozone_7", item_name: "Bottle Pullout (500) Chrome Basket 2-Rack (Width 150 mm) LR", mrp: "9300" },

  { id: "ozone_8", item_name: "Bottle Pullout - SS (6\") 150x500x450 mm", mrp: "2360" },
  { id: "ozone_9", item_name: "Bottle Pullout - SS (8\") 200x500x450 mm", mrp: "2955" },

  { id: "ozone_10", item_name: "OE-RS-M Rolling Shutter System Finish - Silver (PVC Material) (600x1400)", mrp: "23530" },

  { id: "ozone_11", item_name: "Wicker Baskets - PVC (Cab Size 600) W:564xD:508xH:100", mrp: "6825" },
  { id: "ozone_12", item_name: "Wicker Baskets - PVC (Cab Size 600) W:564xD:508xH:150", mrp: "7655" },
  { id: "ozone_13", item_name: "Wicker Baskets - PVC (Cab Size 600) W:564xD:508xH:200", mrp: "8385" },

  { id: "ozone_14", item_name: "Universal Magic Corner (20Kg) SSS (900 MM) Min (W:1000xD:500xH:650) SS Basket Glass", mrp: "9680" },
  { id: "ozone_15", item_name: "Universal Magic Corner (20Kg) GREY (900 MM) Min (W:1000xD:500xH:650) SS Basket Glass", mrp: "22160" },

  { id: "ozone_16", item_name: "S-Carrousel 900 mm (LR)", mrp: "30565" },

  { id: "ozone_17", item_name: "SS - Thali Basket (20\") W:530xD:500xH:200", mrp: "2710" },
  { id: "ozone_18", item_name: "SS Cutlery Basket (500 Depth) W:530xD:500xH:100", mrp: "3975" },
  { id: "ozone_19", item_name: "SS - Plain Vegetable Basket (4\" Height) W:429xD:500xH:150", mrp: "2425" },
  { id: "ozone_20", item_name: "SS - Plate Basket (6\" Height) W:530xD:500xH:150", mrp: "2540" },
  { id: "ozone_21", item_name: "SS - Plain Basket (8\" Height) W:530xD:500xH:200", mrp: "2620" },
  { id: "ozone_22", item_name: "SS - Grain Trolley Basket W:530xD:500xH:200", mrp: "2830" },

  { id: "ozone_23", item_name: "Full Extension Ball Bearing Slides (Channels) Soft Close (20 Inch) SS - 45 Kg", mrp: "2345" },
  { id: "ozone_24", item_name: "Full Extension Ball Bearing Slides (Channels) Soft Close (20 Inch) Zinc - 35 Kg", mrp: "1005" },

  { id: "ozone_25", item_name: "Kitchen Pantry Unit Mechanism SS 450 mm W x 2160 H (6+6 Cabinet Basket)", mrp: "37850" },
  { id: "ozone_26", item_name: "Kitchen Pantry Unit Mechanism SS 600 mm W x 2160 H (6+6 Shelves)", mrp: "47125" },

  { id: "ozone_27", item_name: "SS Dish Rack / GTPT - SS 600 MM", mrp: "2880" },
  { id: "ozone_28", item_name: "Swing Out Waste Bin 10 Ltr", mrp: "3905" },
  { id: "ozone_29", item_name: "Detergent Rack 253x155x383 mm", mrp: "985" },

  // Hardware - OZONE
  { id: "ozone_30", item_name: "Clear Glass 4mm thickness (psf cost)", mrp: "60" },
  { id: "ozone_31", item_name: "Hinges - 0 Degree Soft Close 0 Degree", mrp: "705" },
  { id: "ozone_32", item_name: "Corner Hinge (OEC35) 135 Degree", mrp: "305" },
  { id: "ozone_33", item_name: "Corner Hinge Soft Close (OEC352) 165 Degree", mrp: "495" },
  { id: "ozone_34", item_name: "Blind Corner Hinge Blind Corner", mrp: "605" },

  { id: "ozone_35", item_name: "C Gola Profile Black (3 Mtr)", mrp: "2185" },
  { id: "ozone_36", item_name: "J Gola Profile Black (3 Mtr)", mrp: "1860" },
  { id: "ozone_37", item_name: "C & J Profile Connector 4 Pc Set", mrp: "120" },
  { id: "ozone_38", item_name: "G Handle Profile (Groove In) Black Matt (3 Mtr)", mrp: "2165" },
  { id: "ozone_39", item_name: "Glass Frame Profile 03 Mtr", mrp: "2600" },
  { id: "ozone_40", item_name: "Glass Handle Profile 03 Mtr", mrp: "3100" },
  { id: "ozone_41", item_name: "Shutter Profile Connector For Glass Shutter (1 Set = 4 Pc)", mrp: "150" }

]

};
const accessoryInventoryCatalog = {
       ozone: [
  { id: "ozone_0", item_name: "PVC Cutlery tray (500 Depth) W:530xD:485xH:50 (600 mm)", mrp: "965" },
  { id: "ozone_1", item_name: "PVC Cutlery tray (500 Depth) W:830xD:485xH:50 (900 mm)", mrp: "1940" },

  { id: "ozone_2", item_name: "OE-DWDS-PRO-S TNDM - 4\" - S Size 84x500 (Anthgrey) 25 Kg", mrp: "3480" },
  { id: "ozone_3", item_name: "OE-DWDS-PRO-S TNDM - 6\" - M Size 116x500 (Anthgrey) 25 Kg", mrp: "3690" },
  { id: "ozone_4", item_name: "OE-DWDS-PRO-S - TNDM 8\" - L Size 167x500 (Anthgrey) 25 Kg", mrp: "3905" },

  { id: "ozone_5", item_name: "OK-BPO-GB-02-R Tndm BPO 2-Rack (Width 200 mm) LR", mrp: "10130" },
  { id: "ozone_6", item_name: "OK-BPO-GB-02-R Tndm BPO 2-Rack (Width 300 mm) LR", mrp: "11205" },
  { id: "ozone_7", item_name: "Bottle Pullout (500) Chrome Basket 2-Rack (Width 150 mm) LR", mrp: "9300" },

  { id: "ozone_8", item_name: "Bottle Pullout - SS (6\") 150x500x450 mm", mrp: "2360" },
  { id: "ozone_9", item_name: "Bottle Pullout - SS (8\") 200x500x450 mm", mrp: "2955" },

  { id: "ozone_10", item_name: "OE-RS-M Rolling Shutter System Finish - Silver (PVC Material) (600x1400)", mrp: "23530" },

  { id: "ozone_11", item_name: "Wicker Baskets - PVC (Cab Size 600) W:564xD:508xH:100", mrp: "6825" },
  { id: "ozone_12", item_name: "Wicker Baskets - PVC (Cab Size 600) W:564xD:508xH:150", mrp: "7655" },
  { id: "ozone_13", item_name: "Wicker Baskets - PVC (Cab Size 600) W:564xD:508xH:200", mrp: "8385" },

  { id: "ozone_14", item_name: "Universal Magic Corner (20Kg) SSS (900 MM) Min (W:1000xD:500xH:650) SS Basket Glass", mrp: "9680" },
  { id: "ozone_15", item_name: "Universal Magic Corner (20Kg) GREY (900 MM) Min (W:1000xD:500xH:650) SS Basket Glass", mrp: "22160" },

  { id: "ozone_16", item_name: "S-Carrousel 900 mm (LR)", mrp: "30565" },

  { id: "ozone_17", item_name: "SS - Thali Basket (20\") W:530xD:500xH:200", mrp: "2710" },
  { id: "ozone_18", item_name: "SS Cutlery Basket (500 Depth) W:530xD:500xH:100", mrp: "3975" },
  { id: "ozone_19", item_name: "SS - Plain Vegetable Basket (4\" Height) W:429xD:500xH:150", mrp: "2425" },
  { id: "ozone_20", item_name: "SS - Plate Basket (6\" Height) W:530xD:500xH:150", mrp: "2540" },
  { id: "ozone_21", item_name: "SS - Plain Basket (8\" Height) W:530xD:500xH:200", mrp: "2620" },
  { id: "ozone_22", item_name: "SS - Grain Trolley Basket W:530xD:500xH:200", mrp: "2830" },

  { id: "ozone_23", item_name: "Full Extension Ball Bearing Slides (Channels) Soft Close (20 Inch) SS - 45 Kg", mrp: "2345" },
  { id: "ozone_24", item_name: "Full Extension Ball Bearing Slides (Channels) Soft Close (20 Inch) Zinc - 35 Kg", mrp: "1005" },

  { id: "ozone_25", item_name: "Kitchen Pantry Unit Mechanism SS 450 mm W x 2160 H (6+6 Cabinet Basket)", mrp: "37850" },
  { id: "ozone_26", item_name: "Kitchen Pantry Unit Mechanism SS 600 mm W x 2160 H (6+6 Shelves)", mrp: "47125" },

  { id: "ozone_27", item_name: "SS Dish Rack / GTPT - SS 600 MM", mrp: "2880" },
  { id: "ozone_28", item_name: "Swing Out Waste Bin 10 Ltr", mrp: "3905" },
  { id: "ozone_29", item_name: "Detergent Rack 253x155x383 mm", mrp: "985" },

  // Hardware - OZONE
  { id: "ozone_30", item_name: "Clear Glass 4mm thickness (psf cost)", mrp: "60" },
  { id: "ozone_31", item_name: "Hinges - 0 Degree Soft Close 0 Degree", mrp: "705" },
  { id: "ozone_32", item_name: "Corner Hinge (OEC35) 135 Degree", mrp: "305" },
  { id: "ozone_33", item_name: "Corner Hinge Soft Close (OEC352) 165 Degree", mrp: "495" },
  { id: "ozone_34", item_name: "Blind Corner Hinge Blind Corner", mrp: "605" },

  { id: "ozone_35", item_name: "C Gola Profile Black (3 Mtr)", mrp: "2185" },
  { id: "ozone_36", item_name: "J Gola Profile Black (3 Mtr)", mrp: "1860" },
  { id: "ozone_37", item_name: "C & J Profile Connector 4 Pc Set", mrp: "120" },
  { id: "ozone_38", item_name: "G Handle Profile (Groove In) Black Matt (3 Mtr)", mrp: "2165" },
  { id: "ozone_39", item_name: "Glass Frame Profile 03 Mtr", mrp: "2600" },
  { id: "ozone_40", item_name: "Glass Handle Profile 03 Mtr", mrp: "3100" },
  { id: "ozone_41", item_name: "Shutter Profile Connector For Glass Shutter (1 Set = 4 Pc)", mrp: "150" }

]
};
const installation = 25;

export  { pricing , hardwareInventoryCatalog , accessoryInventoryCatalog, installation }