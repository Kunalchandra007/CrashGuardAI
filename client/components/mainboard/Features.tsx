import React from "react";
import MaxWidthContainer from "../layouts/MaxWidthContainer";
import {
  Map,
  Cctv,
  LocateFixed,
  FireExtinguisher,
  BellRing,
} from "lucide-react";

type Props = {};

const allFeatures = [
  {
    icon: Cctv,
    title: "Real-time Detection",
    description:
      "Advanced CNN deep learning analyzes CCTV feeds in real-time to instantly detect vehicle collisions.",
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-gray-800",
  },
  {
    icon: LocateFixed,
    title: "Location Tracking",
    description:
      "Integrated GPS services pinpoint exact accident locations for swift emergency response coordination.",
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-gray-800",
  },
  {
    icon: FireExtinguisher,
    title: "Emergency Alerts",
    description:
      "Automatic emergency alerts sent to authorities with location data for immediate response deployment.",
    color: "from-red-500 to-orange-500",
    bgColor: "bg-gray-800",
  },
  {
    icon: BellRing,
    title: "Multi-Channel Alerts",
    description:
      "SMS and email notifications with video links ensure traffic authorities receive coordinated updates.",
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-gray-800",
  },
];

export default function Features({}: Props) {
  return (
    <section className="py-20 bg-gray-900">
      <MaxWidthContainer>
        <div className="text-center mb-16">
          <span className="bg-gray-700 text-gray-200 px-4 py-2 rounded-full text-sm font-semibold inline-block mb-4">
            ⚡ Key Features
          </span>
          <h2 className="font-black text-3xl sm:text-4xl md:text-5xl pb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Powerful AI-Driven Safety
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Advanced technology working 24/7 to keep roads safer
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {allFeatures.map((singleFeature, index) => {
            return (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-2xl ${singleFeature.bgColor} p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-gray-700 hover:border-gray-500`}
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${singleFeature.color} opacity-10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500`}></div>
                <div className="relative z-10">
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${singleFeature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <singleFeature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">
                    {singleFeature.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {singleFeature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </MaxWidthContainer>
    </section>
  );
}
