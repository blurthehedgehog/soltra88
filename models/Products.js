const mongoose = require('mongoose');

const ScreenSchema = new mongoose.Schema({
  diagonal: { type: String, required: true },             
  resolution: { type: String, required: true },          
  panelType: { type: String, required: true },           
  screenFormat: { type: String, required: true },         
  lighting: { type: String, required: true },            
  refreshRateHz: { type: Number, required: true }         
});


const ProcessorSchema = new mongoose.Schema({
  manufacturer: { type: String, required: true },         
  chipsetType: { type: String, required: true },         
  model: { type: String, required: true },                
  cores: { type: Number, required: true },                
  threads: { type: Number, required: true },              
  lithography: { type: String, required: true },         
  cache: { type: String, required: true },                
  maxSpeedGHz: { type: Number, required: true },          
  integratedGraphics: { type: Boolean, required: true },  
  gpuModel: { type: String, required: true }              
});

const MemorySchema = new mongoose.Schema({
  ramSizeGB: { type: Number, required: true },          
  ramType: { type: String, required: true },              
  ssdInterface: { type: String, required: true },         
  ssdSizeGB: { type: Number, required: true }             
});

const WebcamSchema = new mongoose.Schema({
  hasWebcam: { type: Boolean, required: true },         
  resolution: { type: String, required: true }            
});

const SoundSchema = new mongoose.Schema({
  stereoSound: { type: Boolean, required: true },         
  speakersCount: { type: Number, required: true },        
  hasMicrophone: { type: Boolean, required: true }        
});

const InterfaceSchema = new mongoose.Schema({
  hdmi: { type: Number, required: true },                  
  usb32: { type: Number, required: true },                
  audioJack35mm: { type: Number, required: true }         
});

const OpticalDriveSchema = new mongoose.Schema({
  hasOpticalDrive: { type: Boolean, required: true }       
});

const ConnectivitySchema = new mongoose.Schema({
  wifi: { type: String, required: true },                  
  bluetooth: { type: String, required: true }              
});

const KeyboardSchema = new mongoose.Schema({
  hasNumLock: { type: Boolean, required: true }           
});

const BatterySchema = new mongoose.Schema({
  description: { type: String, required: true }            
});

const OSschema = new mongoose.Schema({
  os: { type: String, required: true }                      
});

const ColorSchema = new mongoose.Schema({
  color: { type: String, required: true }                  
});

const DimensionsSchema = new mongoose.Schema({
  heightCm: { type: Number, required: true },              
  widthCm: { type: Number, required: true },                
  depthCm: { type: Number, required: true }                
});

const WeightSchema = new mongoose.Schema({
  weightKg: { type: Number, required: true }                
});

const WarrantySchema = new mongoose.Schema({
  warrantyMonths: { type: Number, required: true }       
});



const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  category: { type: String, required: true, trim: true },
    parentCategory: { type: String, required: false },
  stock: { type: Number, required: true, min: 0 },
  price: { type: Number, required: true, min: 0 },
  ratings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Rating' }],
  images: { type: [String], required: true },
  brand: { type: String, required: true },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], 
  desc: {
    screen: { type: ScreenSchema, required: true },
    processor: { type: ProcessorSchema, required: true },
    memory: { type: MemorySchema, required: true },
    webcam: { type: WebcamSchema, required: true },
    sound: { type: SoundSchema, required: true },
    interface: { type: InterfaceSchema, required: true },
    opticalDrive: { type: OpticalDriveSchema, required: true },
    connectivity: { type: ConnectivitySchema, required: true },
    keyboard: { type: KeyboardSchema, required: true },
    battery: { type: BatterySchema, required: true },
    os: { type: OSschema, required: true },
    color: { type: ColorSchema, required: true },
    dimensions: { type: DimensionsSchema, required: true },
    weight: { type: WeightSchema, required: true },
    warranty: { type: WarrantySchema, required: true }
  },
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);