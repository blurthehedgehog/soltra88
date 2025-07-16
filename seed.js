const mongoose = require('mongoose');
const Product = require('./models/Products');
const connectDB = require('./config/db');
require('dotenv').config();

const BASE_URL = "http://localhost:5000"; 

const products = [
  {
    name: "Acer Aspire 5 A515-58P – Steel Gray",
    category: "Business Laptop",
    parentCategory: "PCs and Laptops",
    stock: Math.floor(Math.random() * 100) + 1,
    price: 1399.00,
    brand: "Acer",
    images: [
      `${BASE_URL}/uploads/Acer-Aspire-5-A515-58P-NX.KHJER_.002-Steel-Gray1.png`,
      `${BASE_URL}/uploads/Acer-Aspire-5-A515-58P-NX.KHJER_.002-Steel-Gray2.png`,
      `${BASE_URL}/uploads/Acer-Aspire-5-A515-58P-NX.KHJER_.002-Steel-Gray3.png`,
      `${BASE_URL}/uploads/Acer-Aspire-5-A515-58P-NX.KHJER_.002-Steel-Gray4.png`
    ],
    desc: {
      screen: {
        diagonal: "15.6“",
        resolution: "1920 x 1080",
        panelType: "LCD",
        screenFormat: "16 : 9",
        lighting: "LED",
        refreshRateHz: 60
      },
      processor: {
        manufacturer: "Intel",
        chipsetType: "Intel Core i3",
        model: "1315U",
        cores: 6,
        threads: 8,
        lithography: "7nm",
        cache: "10MB Smart Cache",
        maxSpeedGHz: 4.5,
        integratedGraphics: true,
        gpuModel: "Intel UHD Graphics"
      },
      memory: {
        ramSizeGB: 8,
        ramType: "LPDDR5",
        ssdInterface: "PCIe Nvme",
        ssdSizeGB: 512
      },
      webcam: {
        hasWebcam: true,
        resolution: "720p"
      },
      sound: {
        stereoSound: true,
        speakersCount: 2,
        hasMicrophone: true
      },
      interface: {
        hdmi: 1,
        usb32: 2,
        audioJack35mm: 1
      },
      opticalDrive: {
        hasOpticalDrive: false
      },
      connectivity: {
        wifi: "802.11 a/b/g/n/ac/ax",
        bluetooth: "5.1"
      },
      keyboard: {
        hasNumLock: true
      },
      battery: {
        description: "3-Cell 50 Wh"
      },
      os: {
        os: "სისტემის გარეშე"
      },
      color: {
        color: "Steel Gray"
      },
      dimensions: {
        heightCm: 1.79,
        widthCm: 36.29,
        depthCm: 23.75
      },
      weight: {
        weightKg: 1.78
      },
      warranty: {
        warrantyMonths: 24
      } 
    },
    ratings:[]
  },
  {
    name: "Acer NITRO 5 ",
    category: "Gaming Laptop",
        parentCategory: "PCs and Laptops",
    stock: Math.floor(Math.random() * 100) + 1,
    price: 2499.00,
    brand: "Acer",
    images: [
      `${BASE_URL}/uploads/Acer-NITRO-5-NH.QNDER_.002-Obsidian-Black1.png`,
      `${BASE_URL}/uploads/Acer-NITRO-5-NH.QNDER_.002-Obsidian-Black2.png`,
      `${BASE_URL}/uploads/Acer-NITRO-5-NH.QNDER_.002-Obsidian-Black3.png`
    ],
  desc: {
  screen: {
  diagonal: "15.6“",
  resolution: "1920 x 1080",
  panelType: "IPS",
  screenFormat: "16 : 9",
  screenSurface: "Anti-glare",
  brightness: "250 cd/m²",
  refreshRateHz: 144,
  lighting: "LED" 
},
processor: {
  manufacturer: "Intel",
  chipsetType: "Intel Core i5",
  model: "13420H",
  cores: 8,
  threads: 12,
  cache: "12MB SmartCache",
  maxSpeedGHz: 4.6,
  lithography: "10nm",
  integratedGraphics: false, 
  gpuModel: "NVIDIA GeForce RTX 2050" 
},
  memory: {
    ramSizeGB: 16,
    ramType: "DDR5",
    ramSpeedMHz: 5200,
    ssdInterface: "M.2 PCIe",
    ssdSizeGB: 512
  },
  gpu: {
    type: "დისკრეტული",
    gpuModel: "NVIDIA GeForce RTX 2050",
    vramSizeGB: 4,
    vramType: "GDDR6"
  },
  webcam: {
    hasWebcam: true,
    resolution: "720p"
  },
  sound: {
    stereoSound: true,
    speakersCount: 2,
    hasMicrophone: true
  },
  interface: {
    hdmi: 1,
    usb32: 3,
    audioJack35mm: 1,
    rj45: 1
  },
  opticalDrive: {
    hasOpticalDrive: false
  },
  connectivity: {
    wifi: "802.11 a/b/g/n/ac/ax",
    bluetooth: true
  },
  keyboard: {
    hasNumLock: true,
    hasBacklight: true
  },
  battery: {
    type: "Li-Ion",
    description: "3-Cell 57Wh"
  },
  os: {
    os: "სისტემის გარეშე"
  },
  color: {
    color: "Obsidian Black"
  },
  dimensions: {
    heightCm: 2.49,
    widthCm: 36.3,
    depthCm: 27.1
  },
  weight: {
    weightKg: 2.1
  },
  warranty: {
    warrantyMonths: 24
  }
},
    ratings:[]
  },
  {
  name: "Acer Predator Helios Neo 16",
  category: "Gaming Laptop",
      parentCategory: "PCs and Laptops",
  stock: Math.floor(Math.random() * 100) + 1,
  price: 4299.00,
  brand: "Acer",
  images: [
    `${BASE_URL}/uploads/Acer-Predator-Helios-Neo-161.png`,
    `${BASE_URL}/uploads/Acer-Predator-Helios-Neo-16-NH.QRFER_.003-Black3.png`,
    `${BASE_URL}/uploads/Acer-Predator-Helios-Neo-16-NH.QRFER_.003-Black4.png`
  ],
  desc: {
    screen: {
      diagonal: "16″",
      resolution: "2560 x 1600",
      panelType: "IPS",
      screenFormat: "16 : 10",
      lighting: "LED",
      refreshRateHz: 165
    },
    processor: {
      manufacturer: "Intel",
      chipsetType: "Intel Core i7",
      model: "13700HX",
      cores: 16,
      threads: 24,
      lithography: "10nm",
      cache: "30MB Smart Cache",
      maxSpeedGHz: 5.0,
      integratedGraphics: true,
      gpuModel: "Intel UHD Graphics"
    },
    memory: {
      ramSizeGB: 16,
      ramType: "DDR5",
      ssdInterface: "PCIe 4.0",
      ssdSizeGB: 1000
    },
    gpu: {
      type: "დისკრეტული",
      gpuModel: "NVIDIA GeForce RTX 4060",
      vramSizeGB: 8,
      vramType: "GDDR6"
    },
    webcam: {
      hasWebcam: true,
      resolution: "720p"
    },
    sound: {
      stereoSound: true,
      speakersCount: 2,
      hasMicrophone: true
    },
    interface: {
      hdmi: 1,
      usb32: 3,
      audioJack35mm: 1,
      rj45: 1
    },
    opticalDrive: {
      hasOpticalDrive: false
    },
    connectivity: {
      wifi: "802.11ax",
      bluetooth: "5.2"
    },
    keyboard: {
      hasNumLock: true,
      hasBacklight: true
    },
    battery: {
      description: "4-Cell 90Wh"
    },
    os: {
      os: "Windows 11 Home"
    },
    color: {
      color: "Obsidian Black"
    },
    dimensions: {
      heightCm: 2.79,
      widthCm: 35.9,
      depthCm: 26.2
    },
    weight: {
      weightKg: 2.6
    },
    warranty: {
      warrantyMonths: 24
    }
  },
  ratings: []
},
{
  name: "Apple MacBook Air 13 ",
  category: "Apple MacBook",
      parentCategory: "PCs and Laptops",
  stock: Math.floor(Math.random() * 100) + 1,
  price: 3699.00,
  brand: "Apple",
  images: [
    `${BASE_URL}/uploads/Apple-MacBook-Air-13-M3-8-core-CPU-and-8-core-GPU-8GB256GB-SSD-Space-Grey1.png`,
    `${BASE_URL}/uploads/Apple-MacBook-Air-13-M3-8-core-CPU-and-8-core-GPU-8GB256GB-SSD-Space-Grey2-scaled.jpg`
  ],
  desc: {
    screen: {
      diagonal: "13.6″",
      resolution: "2560 x 1664",
      panelType: "Liquid Retina",
      screenFormat: "16 : 10",
      lighting: "LED",
      refreshRateHz: 60
    },
    processor: {
      manufacturer: "Apple",
      chipsetType: "Apple M3",
      model: "M3",
      cores: 8,
      threads: 8,
      lithography: "3nm",
      cache: "16MB",
      maxSpeedGHz: 3.5,
      integratedGraphics: true,
      gpuModel: "Apple 8-core GPU"
    },
    memory: {
      ramSizeGB: 8,
      ramType: "Unified",
      ssdInterface: "NVMe",
      ssdSizeGB: 256
    },
    webcam: {
      hasWebcam: true,
      resolution: "1080p"
    },
    sound: {
      stereoSound: true,
      speakersCount: 4,
      hasMicrophone: true
    },
    interface: {
      hdmi: 0,
      usb32: 2,
      audioJack35mm: 1,
      rj45: 0
    },
    opticalDrive: {
      hasOpticalDrive: false
    },
    connectivity: {
      wifi: "802.11ax",
      bluetooth: "5.3"
    },
    keyboard: {
      hasNumLock: false,
      hasBacklight: true
    },
    battery: {
      description: "Built-in 52.6Wh"
    },
    os: {
      os: "macOS Sonoma"
    },
    color: {
      color: "Space Grey"
    },
    dimensions: {
      heightCm: 1.13,
      widthCm: 30.41,
      depthCm: 21.5
    },
    weight: {
      weightKg: 1.24
    },
    warranty: {
      warrantyMonths: 12
    }
  },
  ratings: []
},
{
  name: "Asus TUF Gaming 15 ",
  category: "Gaming Laptop",
      parentCategory: "PCs and Laptops",
  stock: Math.floor(Math.random() * 100) + 1,
  price: 1999.00,
  brand: "Asus",
  images: [
    `${BASE_URL}/uploads/Asus-TUF-Gaming-15-FA506NCR-HN044-Black1.png`,
    `${BASE_URL}/uploads/Asus-TUF-Gaming-15-FA506NCR-HN044-Black2.png`,
    `${BASE_URL}/uploads/Asus-TUF-Gaming-15-FA506NCR-HN044-Black3.png`
  ],
  desc: {
    screen: {
      diagonal: "15.6″",
      resolution: "1920 x 1080",
      panelType: "IPS",
      screenFormat: "16 : 9",
      lighting: "LED",
      refreshRateHz: 144
    },
    processor: {
      manufacturer: "AMD",
      chipsetType: "Ryzen 5",
      model: "4600H",
      cores: 6,
      threads: 12,
      lithography: "7nm",
      cache: "8MB",
      maxSpeedGHz: 4.0,
      integratedGraphics: false,
      gpuModel: "AMD Radeon Graphics"
    },
    memory: {
      ramSizeGB: 16,
      ramType: "DDR4",
      ssdInterface: "PCIe NVMe",
      ssdSizeGB: 512
    },
    gpu: {
      type: "დისკრეტული",
      gpuModel: "NVIDIA GeForce GTX 1650",
      vramSizeGB: 4,
      vramType: "GDDR6"
    },
    webcam: {
      hasWebcam: true,
      resolution: "720p"
    },
    sound: {
      stereoSound: true,
      speakersCount: 2,
      hasMicrophone: true
    },
    interface: {
      hdmi: 1,
      usb32: 3,
      audioJack35mm: 1,
      rj45: 1
    },
    opticalDrive: {
      hasOpticalDrive: false
    },
    connectivity: {
      wifi: "802.11ax",
      bluetooth: "5.0"
    },
    keyboard: {
      hasNumLock: true,
      hasBacklight: true
    },
    battery: {
      description: "3-Cell 48Wh"
    },
    os: {
      os: "Windows 10"
    },
    color: {
      color: "Black Gray"
    },
    dimensions: {
      heightCm: 2.3,
      widthCm: 35.9,
      depthCm: 25.4
    },
    weight: {
      weightKg: 2.3
    },
    warranty: {
      warrantyMonths: 24
    }
  },
  ratings: []
},
{
    name: "HP Dragonfly Wolf Pro Security Edition ",
    category: "Business Laptop",
        parentCategory: "PCs and Laptops",
    stock: Math.floor(Math.random() * 100) + 1,
    price: 2499.00,
    brand: "Acer",
    images: [
      `${BASE_URL}/uploads/HP_Dragonfly_G4_Sandwalker_13_WWAN_SlateBlue_T_IRcam_nonODD_FPR_Win11_CoreSet_WhiteBG_FrontLeft_M1547026.png`,
      `${BASE_URL}/uploads/HP_Dragonfly_G4_Sandwalker_13_WWAN_SlateBlue_T_IRcam_nonODD_FPR_Win11_CoreSet_WhiteBG_FrontOpen_M1547025.png`,
      `${BASE_URL}/uploads/HP_Dragonfly_G4_Sandwalker_13_WWAN_SlateBlue_T_IRcam_nonODD_FPR_Win11_CoreSet_WhiteBG_FrontRight_M1547024.jpg`
    ],
  desc: {
  screen: {
  diagonal: "15.6“",
  resolution: "1920 x 1080",
  panelType: "IPS",
  screenFormat: "16 : 9",
  screenSurface: "Anti-glare",
  brightness: "250 cd/m²",
  refreshRateHz: 144,
  lighting: "LED" 
},
processor: {
  manufacturer: "Intel",
  chipsetType: "Intel Core i5",
  model: "13420H",
  cores: 8,
  threads: 12,
  cache: "12MB SmartCache",
  maxSpeedGHz: 4.6,
  lithography: "10nm",
  integratedGraphics: false, 
  gpuModel: "NVIDIA GeForce RTX 2050" 
},
  memory: {
    ramSizeGB: 16,
    ramType: "DDR5",
    ramSpeedMHz: 5200,
    ssdInterface: "M.2 PCIe",
    ssdSizeGB: 512
  },
  gpu: {
    type: "დისკრეტული",
    gpuModel: "NVIDIA GeForce RTX 2050",
    vramSizeGB: 4,
    vramType: "GDDR6"
  },
  webcam: {
    hasWebcam: true,
    resolution: "720p"
  },
  sound: {
    stereoSound: true,
    speakersCount: 2,
    hasMicrophone: true
  },
  interface: {
    hdmi: 1,
    usb32: 3,
    audioJack35mm: 1,
    rj45: 1
  },
  opticalDrive: {
    hasOpticalDrive: false
  },
  connectivity: {
    wifi: "802.11 a/b/g/n/ac/ax",
    bluetooth: true
  },
  keyboard: {
    hasNumLock: true,
    hasBacklight: true
  },
  battery: {
    type: "Li-Ion",
    description: "3-Cell 57Wh"
  },
  os: {
    os: "სისტემის გარეშე"
  },
  color: {
    color: "Obsidian Black"
  },
  dimensions: {
    heightCm: 2.49,
    widthCm: 36.3,
    depthCm: 27.1
  },
  weight: {
    weightKg: 2.1
  },
  warranty: {
    warrantyMonths: 24
  }
},
    ratings:[]
  },
  {
    name: " ZALMAN Z10 PLUS ATX",
    category: "Cases",
        parentCategory: "Servers and Components",
    stock: Math.floor(Math.random() * 100) + 1,
    price: 2499.00,
    brand: "Acer",
    images: [
      `${BASE_URL}/uploads/ZALMAN_Z10_PLUS_black_1-378x378.png`,
      `${BASE_URL}/uploads/ZALMAN_Z10_PLUS_black-378x378.png`
    ],
  desc: {
  screen: {
  diagonal: "15.6“",
  resolution: "1920 x 1080",
  panelType: "IPS",
  screenFormat: "16 : 9",
  screenSurface: "Anti-glare",
  brightness: "250 cd/m²",
  refreshRateHz: 144,
  lighting: "LED" 
},
processor: {
  manufacturer: "Intel",
  chipsetType: "Intel Core i5",
  model: "13420H",
  cores: 8,
  threads: 12,
  cache: "12MB SmartCache",
  maxSpeedGHz: 4.6,
  lithography: "10nm",
  integratedGraphics: false, 
  gpuModel: "NVIDIA GeForce RTX 2050" 
},
  memory: {
    ramSizeGB: 16,
    ramType: "DDR5",
    ramSpeedMHz: 5200,
    ssdInterface: "M.2 PCIe",
    ssdSizeGB: 512
  },
  gpu: {
    type: "დისკრეტული",
    gpuModel: "NVIDIA GeForce RTX 2050",
    vramSizeGB: 4,
    vramType: "GDDR6"
  },
  webcam: {
    hasWebcam: true,
    resolution: "720p"
  },
  sound: {
    stereoSound: true,
    speakersCount: 2,
    hasMicrophone: true
  },
  interface: {
    hdmi: 1,
    usb32: 3,
    audioJack35mm: 1,
    rj45: 1
  },
  opticalDrive: {
    hasOpticalDrive: false
  },
  connectivity: {
    wifi: "802.11 a/b/g/n/ac/ax",
    bluetooth: true
  },
  keyboard: {
    hasNumLock: true,
    hasBacklight: true
  },
  battery: {
    type: "Li-Ion",
    description: "3-Cell 57Wh"
  },
  os: {
    os: "სისტემის გარეშე"
  },
  color: {
    color: "Obsidian Black"
  },
  dimensions: {
    heightCm: 2.49,
    widthCm: 36.3,
    depthCm: 27.1
  },
  weight: {
    weightKg: 2.1
  },
  warranty: {
    warrantyMonths: 24
  }
},
    ratings:[]
  },
  {
    name: " Obsidian 7 Ryzen 7 7800X3D RTX 5070 Ti 16GB X870-P RAM 32GB SSD 1TB",
    category: "Gaming PC",
        parentCategory: "PCs And Laptops",
    stock: Math.floor(Math.random() * 100) + 1,
    price: 2499.00,
    brand: "Acer",
    images: [
      `${BASE_URL}/uploads/I33855.jpg`
    ],
  desc: {
  screen: {
  diagonal: "15.6“",
  resolution: "1920 x 1080",
  panelType: "IPS",
  screenFormat: "16 : 9",
  screenSurface: "Anti-glare",
  brightness: "250 cd/m²",
  refreshRateHz: 144,
  lighting: "LED" 
},
processor: {
  manufacturer: "Intel",
  chipsetType: "Intel Core i5",
  model: "13420H",
  cores: 8,
  threads: 12,
  cache: "12MB SmartCache",
  maxSpeedGHz: 4.6,
  lithography: "10nm",
  integratedGraphics: false, 
  gpuModel: "NVIDIA GeForce RTX 2050" 
},
  memory: {
    ramSizeGB: 16,
    ramType: "DDR5",
    ramSpeedMHz: 5200,
    ssdInterface: "M.2 PCIe",
    ssdSizeGB: 512
  },
  gpu: {
    type: "დისკრეტული",
    gpuModel: "NVIDIA GeForce RTX 2050",
    vramSizeGB: 4,
    vramType: "GDDR6"
  },
  webcam: {
    hasWebcam: true,
    resolution: "720p"
  },
  sound: {
    stereoSound: true,
    speakersCount: 2,
    hasMicrophone: true
  },
  interface: {
    hdmi: 1,
    usb32: 3,
    audioJack35mm: 1,
    rj45: 1
  },
  opticalDrive: {
    hasOpticalDrive: false
  },
  connectivity: {
    wifi: "802.11 a/b/g/n/ac/ax",
    bluetooth: true
  },
  keyboard: {
    hasNumLock: true,
    hasBacklight: true
  },
  battery: {
    type: "Li-Ion",
    description: "3-Cell 57Wh"
  },
  os: {
    os: "სისტემის გარეშე"
  },
  color: {
    color: "Obsidian Black"
  },
  dimensions: {
    heightCm: 2.49,
    widthCm: 36.3,
    depthCm: 27.1
  },
  weight: {
    weightKg: 2.1
  },
  warranty: {
    warrantyMonths: 24
  }
},
    ratings:[]
  },
   {
    name: " Obsidian 7 Ryzen 7 7800X3D RTX 5070 Ti 16GB X870-P RAM 32GB SSD 1TB",
    category: "Gaming PC",
        parentCategory: "PCs And Laptops",
    stock: Math.floor(Math.random() * 100) + 1,
    price: 2499.00,
    brand: "Acer",
    images: [
      `${BASE_URL}/uploads/I33855.jpg`
    ],
  desc: {
  screen: {
  diagonal: "15.6“",
  resolution: "1920 x 1080",
  panelType: "IPS",
  screenFormat: "16 : 9",
  screenSurface: "Anti-glare",
  brightness: "250 cd/m²",
  refreshRateHz: 144,
  lighting: "LED" 
},
processor: {
  manufacturer: "Intel",
  chipsetType: "Intel Core i5",
  model: "13420H",
  cores: 8,
  threads: 12,
  cache: "12MB SmartCache",
  maxSpeedGHz: 4.6,
  lithography: "10nm",
  integratedGraphics: false, 
  gpuModel: "NVIDIA GeForce RTX 2050" 
},
  memory: {
    ramSizeGB: 16,
    ramType: "DDR5",
    ramSpeedMHz: 5200,
    ssdInterface: "M.2 PCIe",
    ssdSizeGB: 512
  },
  gpu: {
    type: "დისკრეტული",
    gpuModel: "NVIDIA GeForce RTX 2050",
    vramSizeGB: 4,
    vramType: "GDDR6"
  },
  webcam: {
    hasWebcam: true,
    resolution: "720p"
  },
  sound: {
    stereoSound: true,
    speakersCount: 2,
    hasMicrophone: true
  },
  interface: {
    hdmi: 1,
    usb32: 3,
    audioJack35mm: 1,
    rj45: 1
  },
  opticalDrive: {
    hasOpticalDrive: false
  },
  connectivity: {
    wifi: "802.11 a/b/g/n/ac/ax",
    bluetooth: true
  },
  keyboard: {
    hasNumLock: true,
    hasBacklight: true
  },
  battery: {
    type: "Li-Ion",
    description: "3-Cell 57Wh"
  },
  os: {
    os: "სისტემის გარეშე"
  },
  color: {
    color: "Obsidian Black"
  },
  dimensions: {
    heightCm: 2.49,
    widthCm: 36.3,
    depthCm: 27.1
  },
  weight: {
    weightKg: 2.1
  },
  warranty: {
    warrantyMonths: 24
  }
},
    ratings:[]
  },
];

const seedDB = async () => {
  try {
    await connectDB();
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log("Database seeded with uploads images!");
    mongoose.connection.close();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedDB();