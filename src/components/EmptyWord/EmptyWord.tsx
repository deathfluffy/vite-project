import React from "react";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import { useNavigate } from "react-router-dom";

const EmptyWord: React.FC = () => {
  const navigate = useNavigate();
  const { openModal } = useGlobalContext();

  const handleAddWord = () => {
    openModal(true, null);
  };

  const handleCancel = () => {
    navigate("/dictionary");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 md:px-12 xl:px-0">
      <img
        src="/src/img/report.jpg"
        alt="Vocabulary Builder"
        className="w-[144px] h-[166px] sm:w-[180px] sm:h-[200px] md:w-[220px] md:h-[250px] xl:w-[260px] xl:h-[300px]"
      />

      <div className="mt-[33px] mb-[80px] sm:mb-[100px] md:mb-[120px] xl:mb-[132px] text-center max-w-[320px] sm:max-w-[400px] md:max-w-[600px] xl:max-w-[800px]">
        <h2 className="text-[16px] sm:text-[18px] md:text-[20px] xl:text-[20px] font-semibold text-primary">
          You don't have a single word to learn right now.
        </h2>
        <p className="mt-4 text-[14px] sm:text-[14px] md:text-[16px] xl:text-[16px] text-gray-600">
          Please create or add a word to start the workout. We want to improve
          your vocabulary and develop your knowledge, so please share the words
          you are interested in adding to your study.
        </p>
      </div>

      <button
        onClick={handleAddWord}
        className="w-full max-w-[320px] bg-[#839e95] mb-[8px] rounded-full font-bold text-white text-base py-3 shadow-md hover:bg-[#708775] transition-colors sm:max-w-[360px] md:max-w-[400px] xl:max-w-[420px]"
      >
        Add word
      </button>

      <button
        onClick={handleCancel}
        className="w-full max-w-[320px] mx-auto text-center text-sm sm:text-base text-grey-bg cursor-pointer select-none hover:text-[#708775] transition-colors sm:max-w-[360px] md:max-w-[400px] xl:max-w-[420px]"
        aria-label="Cancel translation input"
      >
        Cancel
      </button>
    </div>
  );
};

export default EmptyWord;
