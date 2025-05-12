import mongoose from "mongoose";
const propertySchema = new mongoose.Schema(
  {
    propertyFor: {
      type: String,
    },

    propertyCategory: {
      type: String,
    },
    propertyType: {
      type: String,
    },
    commercialPropertyType: {
      type: String,
    },
    images: {
      type  : []  ,
      default : []
    } ,
    postalCode: {
      type: String,
    },
    premise: {
      type: String,
    },
    subLocality: {
      type: String,
    },
    locality: {
      type: String,
    },
    houseNo: {
      type: String,
    },
    bedrooms: {
      type: Number,
    },
    bathrooms: {
      type: Number,
    },
    balconies: {
      type: Number,
    },
    carpetArea: {
      type: Number,
    },
    builtUpArea: {
      type: Number,
    },
    superBuiltUpArea: {
      type: Number,
    },
    openParking: {
      type: Number,
    },

    coveredParking: {
      type: Number,
    },
    floorNumber: {
      type: String,
    },
    furnishing: {
      type: String,
    },
    totalFloors: {
      type: Number,
    },
    otherRooms: [
      {
        type: String,
      },
    ],
    availabilityStatus: {
      type: String,
    },
    propertyAge: {
      type: String,
    },
    possesionIn: {
      type: String,
    },
    furnishingDetails: [{}],
    otherFurnishingDetails: {
      type: [],
    },
    price: {
      type: Number,
    },
    amenities: {
      type: [],
    },
    locationAdvantages: {
      type: [],
    },
    otherFeatures: {
      type: [],
    },
    propertyFeatures: {
      type: [],
    },
    propertyFacing: {
      type: String,
    },
    propertyFlooring: {
      type: String,
    },
    rentOutTo: {
      type: String,
    },
    availableFrom: {
      type: Date,
    },
    securityDeposit: {
      type: Number,
    },
    durationOfAgreement: {
      type: Number,
    },
    noticeMonths: {
      type: String,
    },
    houseRules: {
      type: String,
    },

    //pg
    pgAvailableFor: {
      type: String,
    },
    pgRoomType: {
      type: String,
    },
    pgInfo: {
      type: [],
    },
    sharingPeopleCount: {
      type: String,
    },
    pgCapacity: {
      type: Number,
    },

    food: {
      type: String,
    },
    mealType: [{ type: String }],
    mealTimings: [{ type: String }],
    foodCharges: {
      type: String,
    },
    pgSuitableFor: {
      type: String,
    },
    rent: {
      type: Number,
    },
    // plot
    plotArea: {
      type: Number,
    },
    NoOfOpenSides: {
      type: String,
    },
    isBoundaryWall: {
      type: String,
    },
    isConstructionDone: {
      type: String,
    },
    noOfAllowedFloorConstruction: {
      type: Number,
    }, 
    postedBy : {
      type : mongoose.Schema.Types.ObjectId , 
      ref : 'User' , 
      required : true  
    }, 
    propertyStatus : {
      type : String , 
      default  : 'Active'
    },
  },
  { timestamps: true }
);
const Property = mongoose.model("Property", propertySchema);
export default Property;
