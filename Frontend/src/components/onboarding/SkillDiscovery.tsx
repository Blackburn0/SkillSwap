import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import Button from '@/components/ui/Button';
import ProgressBar from './ProgressBar';


interface SkillDiscoveryProps {
  onNext: () => void;
  onGoTo: (index: number) => void;
  step: number;
}

const SkillDiscovery = ({ onNext, onGoTo, step  }: SkillDiscoveryProps) => {
  const [skills, setSkills] = useState<string[]>(['Photography', 'Graphic Design', 'Video Editing']);
  const [lookingFor, setLookingFor] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState('');
  const [lookingInput, setLookingInput] = useState('');

  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput)) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const addLooking = () => {
    if (lookingInput.trim() && !lookingFor.includes(lookingInput)) {
      setLookingFor([...lookingFor, lookingInput.trim()]);
      setLookingInput('');
    }
  };

  const removeSkill = (s: string) => setSkills(skills.filter((skill) => skill !== s));
  const removeLooking = (s: string) => setLookingFor(lookingFor.filter((skill) => skill !== s));

  return (
    <section className="flex flex-col justify-between min-h-screen bg-white px-6 py-10 text-center md:px-16 md:py-14">
      {/* Progress */}
      {/* <div className="flex justify-center space-x-2 mb-8 md:mb-12">
        <div className="w-8 h-1 bg-gray-200 rounded-full"></div>
        <div className="w-8 h-1 bg-[#FF4D4D] rounded-full"></div>
        <div className="w-8 h-1 bg-gray-200 rounded-full"></div>
      </div> */}
      <ProgressBar total={3} current={step} onChange={onGoTo} />


      {/* Content */}
      <div className="flex-1 md:max-w-2xl md:mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">What are you great at?</h1>
        <p className="text-gray-600 mt-2 md:text-lg">
          Add skills you can offer and skills you're looking for in return.
        </p>

        {/* Your Skills */}
        <div className="text-left mt-8 space-y-3 md:space-y-4">
          <label className="block text-gray-800 font-medium md:text-lg">Your Skills</label>
          <div className="flex items-center border border-gray-300 rounded-xl px-4 py-2 md:py-3">
            <input
              type="text"
              placeholder="e.g., Web Design, Marketing"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              className="flex-1 outline-none bg-transparent text-gray-700 placeholder:text-gray-400 md:text-base"
            />
            <button onClick={addSkill}>
              <Plus className="text-gray-500" size={20} />
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mt-3 md:mt-4">
            {skills.map((s) => (
              <span
                key={s}
                className="flex items-center gap-2 bg-red-50 text-red-600 px-3 py-1.5 rounded-full text-sm font-medium md:text-base"
              >
                {s}
                <button onClick={() => removeSkill(s)}>
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Looking For */}
        <div className="text-left mt-8 space-y-3 md:space-y-4">
          <label className="block text-gray-800 font-medium md:text-lg">Looking for</label>
          <div className="flex items-center border border-gray-300 rounded-xl px-4 py-2 md:py-3">
            <input
              type="text"
              placeholder="e.g., Copywriting, SEO"
              value={lookingInput}
              onChange={(e) => setLookingInput(e.target.value)}
              className="flex-1 outline-none bg-transparent text-gray-700 placeholder:text-gray-400 md:text-base"
            />
            <button onClick={addLooking}>
              <Plus className="text-gray-500" size={20} />
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mt-3 md:mt-4">
            {lookingFor.map((s) => (
              <span
                key={s}
                className="flex items-center gap-2 bg-red-50 text-red-600 px-3 py-1.5 rounded-full text-sm font-medium md:text-base"
              >
                {s}
                <button onClick={() => removeLooking(s)}>
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Next Button */}
      <div className="mt-8 md:mt-12">
        <Button
          onClick={onNext}
          className="bg-[#FF2E2E] py-3 text-lg font-semibold w-full md:w-[60%] md:max-w-md mx-auto"
        >
          Next
        </Button>
      </div>
    </section>
  );
};

export default SkillDiscovery;
