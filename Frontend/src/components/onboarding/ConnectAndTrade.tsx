import Button from '@/components/ui/Button';
import ProgressBar from './ProgressBar';
import myImage from '@/assets/images/microsites-illustration.png';

interface ConnectAndTradeProps {
  onGoTo: (index: number) => void;
  step: number;
}

const ConnectAndTrade = ({ step, onGoTo }: ConnectAndTradeProps) => {
  return (
    <section className="flex flex-col justify-between min-h-screen bg-white text-center px-6 py-10">
      <div className="mt-10 flex flex-col items-center space-y-3">
        <h1 className="text-3xl font-bold text-gray-900">Connect & Trade</h1>
        <p className="text-gray-600 leading-relaxed max-w-md">
          Find people with skills you need and offer your own in return. It's a community of mutual growth and support.
        </p>
      </div>

      <div className="flex justify-center">
        <img
          src={myImage}
          alt="Connect and Trade illustration"
          className="max-w-[360px] w-full h-auto object-contain mt-10"
        />
      </div>
 
      <div className="flex flex-col items-center space-y-6 mb-6">
        {/* Progress */}
        {/* <div className="flex justify-center space-x-2">
          <span className="w-8 h-1 bg-gray-200 rounded-full"></span>
          <span className="w-8 h-1 bg-gray-200 rounded-full"></span>
          <span className="w-8 h-1 bg-[#FF4D4D] rounded-full"></span>
        </div> */}
        <ProgressBar total={3} current={step} onChange={onGoTo} />


        <Button className="bg-[#FF2E2E] py-3 text-lg font-semibold w-full max-w-xs">
          Start Browsing
        </Button>
      </div>
    </section>
  );
};

export default ConnectAndTrade;
