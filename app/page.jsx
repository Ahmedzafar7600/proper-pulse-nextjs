import React, { Fragment } from "react";
import Link from "next/link";
import Hero from "@/components/Hero";
import InfoBoxes from "@/components/InfoBoxes";
import HomeProperties from "@/components/HomeProperties";


const HomePage = () => {
    return <Fragment>
       {/* <LoadingPage/> */}
       <Hero></Hero>
       <InfoBoxes></InfoBoxes>
       <HomeProperties></HomeProperties>
    </Fragment>
  return <div className="text-2xl">HomePage</div>;
};
export default HomePage;

// export default function HomePage() {
//   return (
//     <div className='text-2xl'>
//       HomePage
//     </div>
//   );
// }
