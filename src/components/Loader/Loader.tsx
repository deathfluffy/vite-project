import { Ring } from "ldrs/react";
import "ldrs/react/Ring.css";

const Loader: React.FC = () => (
  <>
  <div className="flex items-center justify-center flex-col min-h-screen">
    <Ring size="60" stroke="5" bgOpacity="0" speed="2" color="#85AA9F" />
  </div>
  </>
);

export default Loader;
