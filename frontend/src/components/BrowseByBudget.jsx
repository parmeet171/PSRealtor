import React , {useState}  from 'react'
import budget from '../assets/budget.png' ;
import rupee from '../assets/rupee.png' ;
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {motion} from 'framer-motion' ;

const BrowseByBudget = () => {
    const [budgets , setBudgets] = useState(["Affordable" , "mid-segment" , "Luxury"]) ; 
    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
          <div
            className={className}
            style={{ ...style, display: "block", background: "white" }}
            onClick={onClick}
          />
        );
      }
      
      function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
          <div
            className={className}
            style={{ ...style, display: "block", background: "white" }}
            onClick={onClick}
          />
        );
      }
    const  settings = {
        dots: true,
        infinite: true,
        centerMode: true,
        centerPadding: "60px",
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true, 
        autoplaySpeed: 3500 ,
        cssEase: "linear",
        pauseOnHover: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
      };
  return (
    <motion.div initial = {{opacity : 0  , scale : 1.2  }} whileInView = {{opacity : 1 , scale : 1   }} transition={{duration  :1 , ease : "easeInOut"   }}  className='w-[70%] flex flex-col gap-4 items-center p-4      bg-slate-900  text-[#f4f5f7] rounded-xl'>
        <div  className='flex items-center self-start mt-[-150px]     gap-4'>
            <div>
                <img className='w-20' src = {budget}/>

            </div>
            <div className='flex flex-col text-[#f4f5f7]   '>
                <h1 className='text-4xl font-medium tracking-wider '>Have a budget in mind?</h1>
                <p className='text-[1rem] '>
                Browse by budget</p>
            </div>
        </div>

        <div className='w-full '>
        <Slider {...settings} >
           {
            budgets.map((item , index )=> {
                return <>
                <motion.div key={index} whileHover={{scale : 1.1}} className='border-2 text-[#001f3f] shadow-xl rounded-xl bg-[#f4f5f7] mx-4 items-center  p-6 flex flex-col gap-4'>
                    <img className='w-16' src = {rupee}/>
                    <p className='text-xl uppercase  font-medium '>{`${item} project`}</p>
                    <p className='text-[1rem] font-medium '>100+ Properties</p>
                </motion.div>
                </>
            })
           }
           </Slider>
        </div>
      
    </motion.div>
  )
}

export default BrowseByBudget
