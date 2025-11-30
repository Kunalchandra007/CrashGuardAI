import React from "react";
import MaxWidthContainer from "../layouts/MaxWidthContainer";
import GridContainer from "../layouts/GridContainer";
import Image from "next/image";
import Tenor from "@/public/assets/images/tenor.gif";
import { Button } from "../ui/button";
import Link from "next/link";

type Props = {};

export default function Hero({}: Props) {
  return (
    <section className="bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gray-600 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-gray-700 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-gray-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      <MaxWidthContainer>
        <GridContainer className="min-h-[80vh] grid-cols-1 items-center justify-between py-16 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 relative z-10">
          <div className="space-y-8">
            <div className="inline-block">
              <span className="bg-gray-700/30 text-gray-200 px-4 py-2 rounded-full text-sm font-semibold border border-gray-500/30">
                🚨 AI-Powered Detection
              </span>
            </div>
            <h1 className="text-4xl font-black md:text-5xl lg:text-6xl leading-tight">
              Real-Time Accident Detection System
            </h1>
            <p className="text-xl text-gray-200 leading-relaxed">
              Advanced CNN-based vehicle collision detection that monitors CCTV feeds 24/7 
              and instantly alerts emergency services for rapid response.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href={"#model-test"}
                className="inline-flex items-center justify-center text-lg bg-white text-gray-900 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Test Your Video
              </Link>
              <Link
                href={"/dashboard"}
                className="inline-flex items-center justify-center text-lg bg-gray-700/20 text-white px-8 py-4 rounded-lg font-bold hover:bg-gray-700/30 transition-all border-2 border-gray-500/30"
              >
                View Dashboard
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-600 to-gray-700 rounded-2xl blur-2xl opacity-30"></div>
            <Image
              src={Tenor}
              className="w-full rounded-2xl border-4 border-white/20 shadow-2xl relative z-10 transform hover:scale-105 transition-transform duration-300"
              width={500}
              height={500}
              alt="IncideDetect"
            />
          </div>
        </GridContainer>
      </MaxWidthContainer>
    </section>
  );
}
