import { TrophyIcon } from "@heroicons/react/24/outline";
import Confetti from "react-confetti";

const NoPendingVersionsOverlay = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-5">
      <Confetti width={window.innerWidth} height={window.innerHeight} />
      <TrophyIcon className="text-yellow-500 text-xl" />
      <h2 className="text-2xl text-black">Great job! No pending versions.</h2>
      <p className="text-lg text-gray-500">Keep up the good work! Check back often to stay on top of things.</p>
    </div>
  );
};

export default NoPendingVersionsOverlay;
