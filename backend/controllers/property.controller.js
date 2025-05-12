import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import Property from "../models/property.model.js";
import mongoose from "mongoose";
import { uploadOnCloundinary } from "../utils/cloundinary.js";
import { PropertySearch } from "../models/propertySearches.model.js";

const registerProperty = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  if (!req.body) {
    throw new ApiError(400, "Empty body recieved");
  }
  const property = await Property.create({ ...req.body });
  if (!property) {
    throw new ApiError(500, "Something went wrong");
  }
  return res.status(201).send(
    new ApiResponse(201, property, {
      message: "property registered successfully",
    })
  );
});

const uploadPhotos = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  if (!id) {
    throw new ApiError(400, "Id field absent");
  }
  if (!mongoose.isValidObjectId(id)) {
    throw new ApiError(400, "Invalid id");
  }
  if (req.files.length == 0) {
    throw new ApiError(400, "Please provide atleast one image");
  }
  const unresolvedImageUrls = req?.files?.map(async (file) => {
    // upload on cloundinary
    const imageUrl = await uploadOnCloundinary(file?.path);
    return imageUrl;
  });
  const resolvedImageUrls = await Promise.all(unresolvedImageUrls);
  const updatedProperty = await Property.findByIdAndUpdate(
    { _id: id },
    { images: resolvedImageUrls },
    { new: true }
  );
  return res.status(200).json(
    new ApiResponse(200, updatedProperty, {
      message: "Images successfully uploaded",
    })
  );
});
const getAllProperty = asyncHandler(async (req, res, next) => {
  console.log(req.query);

  const filteringCondition = req?.query;

  // filters ...
  if (filteringCondition) {
    let filterBy = [];
    for (let key of Object.keys(req?.query)) {
      let value = "";
      // bedrooms

      if (key == "bedrooms") {
        if (req.query[key] == "4>") {
          value = { $gte: Number(req.query[key][0]) };
        } else {
          value = Number(req.query[key]);
        }
      } else if (key == "propertyType") {
        console.log("length = ", req?.query?.["propertyType"].split(","));
        const propertyTypes = req?.query?.["propertyType"].split(",");
        value = { $in: propertyTypes };
      } else if (key == "locality") {
        value = { $regex: `${req.query[key]}`, $options: "i" };
      } else if (key == "subLocality") {
        value = { $regex: `${req.query[key]}`, $options: "i" };
      } else if (key == "postalCode") {
        value = { $regex: `${req.query[key]}`, $options: "i" };
      } else if (key == "price") {
        value = { $lte: Number(req.query[key]) };
      } else if (key == "rent") {
        value = { $lte: Number(req.query[key]) };
      } else {
        value = req.query[key];
      }

      const obj = {
        [key]: value,
      };
      filterBy = [...filterBy, obj];
    }
    if (filterBy.length > 0) {
      console.log(filterBy);

      const properties = await Property.find({ $and: filterBy }).populate(
        "postedBy"
      );
      if (!properties) {
        throw new ApiError(500, "Something went wrong");
      }
      return res
        .status(200)
        .json(
          new ApiResponse(200, properties, { message: "filtered properites" })
        );
    }
  }

  const properties = await Property.find().populate("postedBy");
  if (!properties) {
    throw new ApiError(500, "Something went wrong");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, properties, { message: "all properties" }));
});

const getSingleProperty = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  if (!id) {
    throw new ApiError(400, "Id field absent");
  }
  if (!mongoose.isValidObjectId(id)) {
    throw new ApiError(400, "Invalid id ");
  }
  const property = await Property.findOne({ _id: id }).populate("postedBy");
  if (!property) {
    throw new ApiError(500, "Something went wrong");
  }
  const isPropertyExists = await PropertySearch.findOne({
    property: property?._id,
  });
  if (isPropertyExists) {
    isPropertyExists.count = isPropertyExists.count + 1;
    await isPropertyExists.save();
  } else {
    await PropertySearch.create({ property: property?._id, count: 1 });
  }
  return res
    .status(200)
    .json(new ApiResponse(200, property, { message: "Single property" }));
});

const myProperties = asyncHandler(async (req, res, next) => {
  if (!req?.user) {
    throw new ApiError(401, "Unauthorized user");
  }

  const myProperties = await Property.find({
    postedBy: req?.user?._id,
  }).populate("postedBy");
  if (!myProperties) {
    throw new ApiError(500, "Something went wrong");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, myProperties, { message: "my properties" }));
});

const updatePropertyStatus = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const { propertyStatus } = req.body;

  if (!req?.user) {
    throw new ApiError(401, "Unauthorized user");
  }

  if (!id) {
    throw new ApiError(400, "Id field absent");
  }
  if (!mongoose.isValidObjectId(id)) {
    throw new ApiError(400, "Invalid id ");
  }

  const updatedPropertyStatus = await Property.findByIdAndUpdate(
    { _id: id },
    { propertyStatus },
    { new: true }
  );
  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedPropertyStatus, {
        message: "Property status updated",
      })
    );
});

const sortPropertyBasedOnDate = asyncHandler(async (req, res, next) => {
  const properties = await Property.find().sort({ createdAt: -1 });
  if (!properties) {
    throw new ApiError(500, "Something went wrong");
  }
  return res
    .status(200)
    .json(
      new ApiResponse(200, properties, {
        message: "properties sorted according to date",
      })
    );
});

export {
  registerProperty,
  getAllProperty,
  getSingleProperty,
  uploadPhotos,
  myProperties,
  updatePropertyStatus,
};
