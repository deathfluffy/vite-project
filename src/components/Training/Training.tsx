import { useEffect, useState } from "react";
import EmptyWord from "../EmptyWord/EmptyWord";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { fetchAllWords } from "../../redux/thunks/wordThunk";
import { toast } from "react-toastify";

const Training = () => {
  const dispatch = useAppDispatch();
  const [translation, setTranslation] = useState("");
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadWords = async () => {
      try {
        const result = await dispatch(fetchAllWords());
        if (fetchAllWords.fulfilled.match(result)) {
          setWords(result.payload);
        }
      } catch (error: unknown) {
        const errorMessage = (error as Error).message;
        toast.error(`"Failed to fetch words:", ${errorMessage}`);
      } finally {
        setLoading(false);
      }
    };

    loadWords();
  }, [dispatch]);

  const handleCancel = () => {
    setTranslation("");
  };

  const handleSave = () => {
    // Implement save logic here
  };

  if (loading) return <div>Loading...</div>;

  if (!words || words.length === 0) {
    return <EmptyWord />;
  }
  return (
    <div className="min-h-screen bg-[#f8faf7] pt-[76px]">
      <div
        className="max-w-[403px] bg-white mb-10 mx-auto rounded-lg shadow-md relative"
        role="main"
        aria-labelledby="page-title"
      >
        <section className="max-h-[195px] px-[22px] py-[19px] border-b border-[#f2f3f2]">
          <input
            type="text"
            value={translation}
            onChange={(e) => setTranslation(e.target.value)}
            placeholder="Введіть переклад"
            className="min-w-[360px] text-[16px] text-primary placeholder:text-primary border-none outline-none focus:ring-0"
          />
          <div className="mt-[106px] flex justify-between text-sm">
            <div className="flex items-center ">
              <span className="text-[#b0c0b8] text-[16px]">Next</span>
              <svg
                width="20px"
                height="20px"
                className="stroke-transparent fill-[#85AA9F]"
              >
                <use href="/src/icons/icons.svg#icon-next"></use>
              </svg>
            </div>
            <div className="flex items-center gap-[8px]">
              <svg width="20px" height="20px">
                <use href="/src/icons/icons.svg#icon-ukraine"></use>
              </svg>
              <span className="text-primary">Ukrainian</span>
            </div>
          </div>
        </section>

        <section className="h-[195px] px-[22px] py-[19px] border-b border-[#f2f3f2]">
          <span className="mb-4 leading-relaxed text-primary">Break in</span>
          <div className="flex justify-end text-sm mt-[108px]">
            <div className="flex items-center gap-[8px]">
              <svg width="20px" height="20px">
                <use href="/src/icons/icons.svg#icon-united-kingdom"></use>
              </svg>
              <span>English</span>
            </div>
          </div>
        </section>
      </div>
      <button
        type="button"
        onClick={handleSave}
        className="block w-[320px] mx-auto mt-4 mb-2 bg-[#839e95] rounded-full font-bold text-white text-base py-3 shadow-md hover:bg-[#708775] transition-colors"
        aria-label="Save translation"
      >
        Save
      </button>
      <button
        onClick={handleCancel}
        className="block w-[320px] mx-auto text-center text-sm text-[#89978e] cursor-pointer select-none"
        aria-label="Cancel translation input"
      >
        Cancel
      </button>
    </div>
  );
};

export default Training;
