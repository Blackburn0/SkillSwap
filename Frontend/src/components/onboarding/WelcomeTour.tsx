import Button from '@/components/ui/Button';
import ProgressBar from './ProgressBar';
import { ArrowRight, Code2, Music, Wrench } from 'lucide-react';
import myImage from '@/assets/images/20770304_Sandy_Eco-08_Single-02-removebg-preview.png';

interface WelcomeTourProps {
  onNext: () => void;
  onGoTo: (index: number) => void;
  step: number;
}


// const WelcomeTour = ({ onNext }: WelcomeTourProps) => {
const WelcomeTour = ({ onNext, onGoTo, step }: WelcomeTourProps) => {

  return (
    <section className="flex flex-col items-center justify-between min-h-screen bg-gradient-to-b from-[#FF4D4D] via-[#FFE5E5] to-white text-center px-6 py-10">
      {/* Icons */}
      <div className="flex-1 flex flex-col justify-center items-center space-y-6">
        <div className="relative flex justify-center items-center">
          <div className="absolute top-0 right-10 bg-white p-4 rounded-full shadow-md">
            <Code2 className="text-black" size={22} />
          </div>
          <div className="absolute bottom-0 left-10 bg-white p-4 rounded-full shadow-md">
            <Music className="text-black" size={22} />
          </div>
          <div className="absolute bottom-0 right-[-1rem] bg-white p-4 rounded-full shadow-md">
            <Wrench className="text-black" size={22} />
          </div>

          <div className="w-64 h-64 bg-contain bg-no-repeat bg-center opacity-70" style={{ backgroundImage: `url(${myImage})` }} />
        </div>

        <div className="space-y-3">
          <h1 className="text-2xl font-bold text-gray-900">
            Trade your skills, unlock new ones
          </h1>
          <p className="text-gray-600 text-base leading-relaxed">
            Exchange your expertise with others and learn new skills in return.
          </p>
        </div>
      </div>

      {/* Progress + Button */}
      <div className="space-y-6 w-full max-w-xs">
        <ProgressBar total={3} current={step} onChange={onGoTo} />

        <Button
          onClick={onNext}
          className="bg-[#FF2E2E] py-3 text-lg font-semibold flex items-center justify-center gap-2"
        >
          Get Started
          <ArrowRight size={20} />
        </Button>
      </div>
    </section>
  );
};

export default WelcomeTour;
