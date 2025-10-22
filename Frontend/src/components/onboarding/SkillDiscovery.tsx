import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import Button from '@/components/ui/Button';
import ProgressBar from './ProgressBar';

interface SkillDiscoveryProps {
  onNext: () => void;
  onGoTo: (index: number) => void;
  step: number;
}

const SkillDiscovery = ({ onNext, onGoTo, step }: SkillDiscoveryProps) => {
  const [skills, setSkills] = useState<string[]>([
    'Photography',
    'Graphic Design',
    'Video Editing',
  ]);
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

  const removeSkill = (s: string) =>
    setSkills(skills.filter((skill) => skill !== s));
  const removeLooking = (s: string) =>
    setLookingFor(lookingFor.filter((skill) => skill !== s));

  return (
    <section className="flex min-h-screen flex-col justify-between bg-white px-6 py-10 text-center md:py-14">
      {/* Content */}
      <div className="flex-1 md:mx-auto md:max-w-2xl">
        <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
          What are you great at?
        </h1>
        <p className="mt-2 text-gray-600 md:text-lg">
          Add skills you can offer and skills you're looking for in return.
        </p>

        {/* Your Skills */}
        <div className="mt-8 space-y-3 text-left md:space-y-4">
          <label className="block font-medium text-gray-800 md:text-lg">
            Your Skills
          </label>
          <div className="flex items-center rounded-xl border border-gray-300 px-4 py-2 md:py-3">
            <input
              type="text"
              placeholder="e.g., Web Design, Marketing"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              className="flex-1 bg-transparent text-gray-700 outline-none placeholder:text-gray-400 md:text-base"
            />
            <button onClick={addSkill}>
              <Plus className="text-gray-500" size={20} />
            </button>
          </div>

          <div className="mt-3 flex flex-wrap gap-2 md:mt-4">
            {skills.map((s) => (
              <span
                key={s}
                className="flex items-center gap-2 rounded-full bg-red-50 px-3 py-1.5 text-sm font-medium text-red-600 md:text-base"
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
        <div className="mt-8 space-y-3 text-left md:space-y-4">
          <label className="block font-medium text-gray-800 md:text-lg">
            Looking for
          </label>
          <div className="flex items-center rounded-xl border border-gray-300 px-4 py-2 md:py-3">
            <input
              type="text"
              placeholder="e.g., Copywriting, SEO"
              value={lookingInput}
              onChange={(e) => setLookingInput(e.target.value)}
              className="flex-1 bg-transparent text-gray-700 outline-none placeholder:text-gray-400 md:text-base"
            />
            <button onClick={addLooking}>
              <Plus className="text-gray-500" size={20} />
            </button>
          </div>

          <div className="mt-3 flex flex-wrap gap-2 md:mt-4">
            {lookingFor.map((s) => (
              <span
                key={s}
                className="flex items-center gap-2 rounded-full bg-red-50 px-3 py-1.5 text-sm font-medium text-red-600 md:text-base"
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
      <div>
        {/* Progress */}
        {/* <div className="flex justify-center space-x-2 mb-8 md:mb-12">
        <div className="w-8 h-1 bg-gray-200 rounded-full"></div>
        <div className="w-8 h-1 bg-[#FF4D4D] rounded-full"></div>
        <div className="w-8 h-1 bg-gray-200 rounded-full"></div>
      </div> */}
        <ProgressBar total={3} current={step} onChange={onGoTo} />
        <Button onClick={onNext} className="mx-auto mt-6 w-full bg-[#FF2E2E]">
          Next
        </Button>
      </div>
    </section>
  );
};

export default SkillDiscovery;
