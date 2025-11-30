import React from "react";
import MaxWidthContainer from "../layouts/MaxWidthContainer";
import InputForm from "../InputForm";
type Props = {};

export default function ModelTest({}: Props) {
  return (
    <section id="model-test" className="bg-gradient-to-b from-gray-800 to-gray-900 py-20">
      <MaxWidthContainer className="py-10">
        <div className="text-center mb-12">
          <span className="bg-gray-700 text-gray-200 px-4 py-2 rounded-full text-sm font-semibold inline-block mb-4">
            🎯 Live Demo
          </span>
          <h2 className="font-black text-3xl sm:text-4xl md:text-5xl pb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Test Our AI Model
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Upload your video and watch our advanced AI detect accidents in real-time
          </p>
        </div>
        <div className="max-w-4xl mx-auto">
          <InputForm />
        </div>
      </MaxWidthContainer>
    </section>
  );
}
