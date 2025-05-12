import React from "react";
import { motion } from "framer-motion";
import { FaRupeeSign } from "react-icons/fa";
import moment from "moment";
const PropertyInfo = ({ propertyData }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="flex gap-10 flex-wrap bg-[#396d8c] rounded-xl p-8 backdrop-blur-sm bg-slate-900/50 box-shadow2  "
    >
      {/* property info */}
      <h1 className="text-2xl capitalize ">Property Info :</h1>

      <div className="flex flex-wrap gap-4 ">
        {propertyData?.propertyType && (
          <div className="flex gap-3 px-4 border-r-[1px]">
            {/* property type */}
            <p className="capitalize text-xl ">property type :</p>
            <p className="capitalize text-xl ">{propertyData?.propertyType}</p>
          </div>
        )}

        {propertyData?.pgAvailableFor && (
          <div className="flex gap-3 px-4 border-r-[1px]">
            {/* for  */}
            <p className="capitalize text-xl ">available for :</p>
            <p className="capitalize text-xl ">{propertyData?.pgAvailableFor}</p>
          </div>
        )}

        {propertyData?.durationOfAgreement && (
          <div className="flex gap-3 px-4 border-r-[1px]">
            {/* agreement duration  */}
            <p className="capitalize text-xl ">rent agreement : </p>
            <p className="capitalize text-xl ">
              {propertyData?.durationOfAgreement} months
            </p>
          </div>
        )}

        {propertyData?.securityDeposit && (
          <div className="flex gap-3 px-4 border-r-[1px]">
            {/* security deposit  */}
            <p className="capitalize text-xl ">Security Deposit :</p>
            <p className="capitalize text-xl flex items-center gap-1 ">
              <span className="text-sm">
                <FaRupeeSign />
              </span>
              {propertyData?.securityDeposit}
            </p>

          
          </div>
        )}

        
        {propertyData?.availableFrom && (
          <div className="flex gap-3 px-4 border-r-[1px]">
            {/* available from  */}
            <p className="capitalize text-xl ">Available from :</p>
            <p className="capitalize text-xl ">{moment(propertyData?.availableFrom).format("DD-MM-YYYY") }</p>
          </div>
        )}

        <div className="flex gap-3">
          {/* charges included in rent  */}
          <p></p>
          <p></p>
        </div>

        {propertyData?.noticeMonths && (
          <div className="flex gap-3 px-4 border-r-[1px]">
            {/* months of notice */}
            <p className="capitalize text-xl ">notice months :</p>
            <p className="capitalize text-xl ">{propertyData?.noticeMonths}</p>
          </div>
        )}
        {propertyData?.pgCapacity && (
          <div className="flex gap-3 px-4 border-r-[1px]">
            {/* total beds */}
            <p className="capitalize text-xl ">PG capacity (total beds) : </p>
            <p className="capitalize text-xl ">
              {propertyData?.pgCapacity} beds
            </p>
          </div>
        )}

        {propertyData?.pgSuitableFor && (
          <div className="flex gap-3 px-4 border-r-[1px]">
            {/* pg suitable for */}
            <p className="capitalize text-xl ">PG Suitable for :  </p>
            <p className="capitalize text-xl ">
              {propertyData?.pgSuitableFor} 
            </p>
          </div>
        )}  

        
        {propertyData?.propertyFlooring && (
          <div className="flex gap-3 px-4 border-r-[1px]">
            {/* flooring */}
            <p className="capitalize text-xl ">Flooring :</p>
            <p className="capitalize text-xl ">
              {propertyData?.propertyFlooring}
            </p>
          </div>
        )}

        {propertyData?.propertyAge && (
          <div className="flex gap-3 px-4 border-r-[1px]">
            {/* property age */}
            <p className="capitalize text-xl ">Property Age :</p>
            <p className="capitalize text-xl ">{propertyData?.propertyAge}</p>
          </div>
        )}

        {propertyData?.furnishing && (
          <div className="flex gap-3 px-4 border-r-[1px]">
            {/* furnishing */}
            <p className="capitalize text-xl ">Furnishing :</p>
            <p className="capitalize text-xl ">{propertyData?.furnishing}</p>
          </div>
        )}
        {propertyData?.floorNumber && (
          <div className="flex gap-3 px-4 border-r-[1px]">
            {/* floor number */}
            <p className="capitalize text-xl ">floor Number :</p>
            <p className="capitalize text-xl ">{propertyData?.floorNumber}</p>
          </div>
        )}
        {propertyData?.totalFloors && (
          <div className="flex gap-3 px-4 border-r-[1px]">
            {/* floor number */}
            <p className="capitalize text-xl ">total floors :</p>
            <p className="capitalize text-xl ">{propertyData?.totalFloors}</p>
          </div>
        )}

        {propertyData?.pgRoomType && (
          <div className="flex gap-3 px-4 border-r-[1px]">
            {/* room type */}
            <p className="capitalize text-xl ">room type :</p>
            <p className="capitalize text-xl ">{propertyData?.roomType}</p>
          </div>
        )}

        {propertyData?.food && (
          <div className="flex gap-3 px-4 border-r-[1px]">
            {/* food available */}
            <p className="capitalize text-xl ">Food :</p>
            <p className="capitalize text-xl ">{propertyData?.food}</p>
          </div>
        )}

        {propertyData?.mealType?.length !== 0 && (
          <div className="flex gap-3 px-4 border-r-[1px] items-center ">
            {/* meal type */}
            <p className="capitalize text-xl ">Meal type :</p>
            <div className="flex gap-2">
              {propertyData?.mealType?.map((item, index) => {
                return (
                  <button
                    key={index}
                    className="px-3 py-1 rounded-full border-2 capitalize"
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </div>
        )}
        
        {propertyData?.mealTimings?.length !== 0 && (
          <div className="flex gap-3 px-4 border-r-[1px] items-center ">
            {/* meal type */}
            <p className="capitalize text-xl ">Meals :</p>
            <div className="flex gap-2">
              {propertyData?.mealTimings?.map((item, index) => {
                return (
                  <button
                    key={index}
                    className="px-3 py-1 rounded-full border-2 capitalize"
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* other rooms  */}

        {propertyData?.otherRooms && propertyData?.otherRooms?.length !== 0 && (
          <div className="flex gap-3 px-4 border-r-[1px] items-center ">
            {/* other rooms  */}
            <p className="capitalize text-xl ">Other rooms in this property</p>
            <div className="flex gap-2">
              {propertyData?.otherRooms?.map((room, index) => {
                return (
                  <button
                    key={index}
                    className="px-3 py-1 rounded-full border-2 capitalize"
                  >
                    {room}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        
        {propertyData?.foodCharges && (
          <div className="flex gap-3 px-4 border-r-[1px] ">
            <p className="capitalize text-xl ">Food Charges</p>
            <p className="capitalize text-xl ">({propertyData?.foodCharges})</p>
            {/* sharing people count */}
          </div>
        )}

        {propertyData?.foodCharges && (
          <div className="flex gap-3 px-4 border-r-[1px] ">
            <p className="capitalize text-xl ">Food Charges</p>
            <p className="capitalize text-xl ">({propertyData?.foodCharges})</p>
            {/* sharing people count */}
          </div>
        )}

        {(propertyData?.coveredParking || propertyData?.openParking  ) && (
          <div className="flex gap-3 px-4 border-r-[1px] ">
            <p className="capitalize text-xl ">Parking Space : </p>
            {propertyData?.coveredParking  && <p className="capitalize text-xl ">coverred parking  = ({propertyData?.coveredParking})</p>}
            {propertyData?.openParking && <p className="capitalize text-xl ">open parking = ({propertyData?.openParking})</p>}
            {/* sharing people count */}
          </div>
        )}

        {propertyData?.sharingPeopleCount && (
          <div className="flex gap-3  px-4 border-r-[1px] ">
            <p className="capitalize text-xl ">Sharing people per room :</p>
            <p className="capitalize text-xl ">
              {propertyData?.sharingPeopleCount}
            </p>
            {/* sharing people count */}
          </div>
        )}



        {/* plot */}
        {propertyData?.plotArea && (
          <div className="flex gap-3 px-4 border-r-[1px]  ">
            <p className="capitalize text-xl ">Plot Area : </p>
            <p className="capitalize text-xl flex gap-2 items-center ">
              {propertyData?.plotArea} 
              <span className="text-blue-500">sq ft.</span>
            </p>
            {/*  */}
          </div>
        )}

        {propertyData?.NoOfOpenSides && (
          <div className="flex gap-3 px-4 border-r-[1px]  ">
            <p className="capitalize text-xl ">No of open sides : </p>
            <p className="capitalize text-xl ">
              {propertyData?.NoOfOpenSides}
            </p>
            {/* */}
          </div>
        )}
        {propertyData?.isBoundaryWall && (
          <div className="flex gap-3 px-4 border-r-[1px]  ">
            <p className="capitalize text-xl ">is there any boundary wall on the plot ? :  </p>
            <p className="capitalize text-xl ">
              {propertyData?.isBoundaryWall}
            </p>
            {/*  */}
          </div>
        )}
        {propertyData?.isConstructionDone && (
          <div className="flex gap-3 px-4 border-r-[1px]  ">
            <p className="capitalize text-xl ">Any construction done on the property ? :  </p>
            <p className="capitalize text-xl ">
              {propertyData?.isConstructionDone}
            </p>
            {/*  */}
          </div>
        )}
        {propertyData?.noOfAllowedFloorConstruction && (
          <div className="flex gap-3 px-4 border-r-[1px]  ">
            <p className="capitalize text-xl ">No of allowed floor for construction on plot :  </p>
            <p className="capitalize text-xl ">
              {propertyData?.noOfAllowedFloorConstruction}
            </p>
            {/*  */}
          </div>
        )}





      </div>

      {/* <div className="flex gap-3">charges for food</div> */}
    </motion.div>
  );
};

export default PropertyInfo;
