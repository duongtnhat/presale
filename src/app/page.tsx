"use client";

import Banner from "@/app/banner";
import Plan from "@/app/plan";
import Top from "@/app/top";
import BuyCrypt from "@/app/buy";

export default function Home() {
  return (
    <div className="ant-row flex flex-col items-center justify-center css-192e8ur">
      <Banner />
      <Plan />
      <div className="ant-col ant-col-24 w-full mt-4 css-192e8ur">
        <div className="w-full flex justify-center items-center mt-6 gap-5 buy-now" style={{height: "1000px"}}>
          <BuyCrypt />
          <Top />
        </div>
      </div>
    </div>
  );
}
