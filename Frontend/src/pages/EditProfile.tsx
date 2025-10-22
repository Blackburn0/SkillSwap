import { useState, type ChangeEvent } from "react";
import { ArrowLeft, Pencil } from "lucide-react";
import Button from "@/components/ui/Button";

const EditProfile = () => {
  const [avatar, setAvatar] = useState("https://img.icons8.com/office/40/person-male.png");
  const [name, setName] = useState("Sophia Carter");
  const [bio, setBio] = useState(
    "Creative soul with a passion for design and technology. Let's build something beautiful together."
  );
  const [email, setEmail] = useState("sophia.carter@example.com");
  const [phone, setPhone] = useState("(555) 123-4567");

  // Handle avatar upload
  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatar(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    console.log({
      name,
      bio,
      email,
      phone,
      avatar,
    });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-5 md:px-8 max-w-xl mx-auto w-full">
        <button
          onClick={() => window.history.back()}
          className="p-2 hover:bg-gray-100 rounded-full transition"
          aria-label="Go back"
        >
          <ArrowLeft size={22} className="text-gray-800" />
        </button>
        <h1 className="text-lg md:text-xl font-semibold text-gray-900">
          Edit Profile
        </h1>
        <div className="w-6" /> {/* Spacer for alignment */}
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto px-4 md:px-8 pb-20">
        <div className="max-w-xl mx-auto w-full flex flex-col items-center">
          {/* Profile Picture */}
          <div className="relative mb-8">
            <img
              src={avatar}
              alt="Profile"
              className="w-32 h-32 md:w-36 md:h-36 rounded-full object-cover border border-gray-200"
            />
            <label
              htmlFor="avatarUpload"
              className="absolute bottom-2 right-2 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full cursor-pointer shadow-md transition"
            >
              <Pencil size={16} />
              <input
                id="avatarUpload"
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
            </label>
          </div>

          {/* Form Fields */}
          <form className="space-y-5 w-full">
            {/* Name */}
            <div>
              <label className="block text-gray-800 font-medium mb-1">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg bg-gray-50 border border-gray-200 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            {/* Bio */}
            <div>
              <label className="block text-gray-800 font-medium mb-1">Bio</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={4}
                className="w-full rounded-lg bg-gray-50 border border-gray-200 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-800 font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg bg-gray-50 border border-gray-200 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-gray-800 font-medium mb-1">
                Phone
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-lg bg-gray-50 border border-gray-200 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </form>
        </div>
      </main>

      {/* Save Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-3 md:px-8 shadow-sm">
        <div className="max-w-xl mx-auto">
          <Button
            onClick={handleSave}
            fullWidth
            className="bg-red-600 hover:bg-red-700 text-white py-3 text-lg rounded-xl"
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
