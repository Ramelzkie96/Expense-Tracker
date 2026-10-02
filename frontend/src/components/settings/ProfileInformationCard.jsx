import { useRef, useState } from "react";
import { toast } from "sonner";
import { format } from "date-fns";
import { Pencil, Mail, Phone, CalendarCheck, Camera, Loader2 } from "lucide-react";
import { useUser, useClerk } from "@clerk/clerk-react";

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-50">
        <Icon size={16} strokeWidth={2} className="text-slate-500" />
      </div>
      <div>
        <p className="text-[12.5px] text-slate-500">{label}</p>
        <p className="text-[13.5px] font-semibold text-slate-800">{value}</p>
      </div>
    </div>
  );
}

export default function ProfileInformationCard() {
  const { user, isLoaded } = useUser();
  const { openUserProfile } = useClerk();
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);

  const handlePhotoClick = () => {
    if (isUploading) return;
    fileInputRef.current?.click();
  };

  const handlePhotoChange = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // allow picking the same file again later
    if (!file || !user) return;

    setIsUploading(true);
    try {
      await user.setProfileImage({ file });
      toast.success("Profile photo updated.");
    } catch (err) {
      console.error("Failed to update profile photo:", err);
      toast.error("Failed to update profile photo. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const name = isLoaded ? user?.fullName || user?.username || "My Account" : "Loading...";
  const email = isLoaded ? user?.primaryEmailAddress?.emailAddress ?? "" : "";
  const phone = isLoaded ? user?.primaryPhoneNumber?.phoneNumber ?? "Not provided" : "";
  const memberSince =
    isLoaded && user?.createdAt ? format(user.createdAt, "MMMM yyyy") : "";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h3 className="text-[16px] font-bold text-slate-800">Profile Information</h3>
          <p className="mt-0.5 text-[13px] text-slate-500">
            Update your personal details and profile picture.
          </p>
        </div>

        <button
          onClick={() => openUserProfile()}
          className="flex h-[36px] items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 text-[13px] font-semibold text-slate-700 transition-colors hover:bg-slate-50"
        >
          <Pencil size={14} strokeWidth={2.2} />
          Edit Profile
        </button>
      </div>

      <div className="mb-6 flex items-center gap-4">
        <div className="relative">
          <div className="h-16 w-16 overflow-hidden rounded-full bg-slate-200">
            {isLoaded && user?.imageUrl ? (
              <img src={user.imageUrl} alt={name} className="h-full w-full object-cover" />
            ) : (
              <div className="h-full w-full animate-pulse bg-slate-200" />
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="hidden"
          />

          <button
            type="button"
            onClick={handlePhotoClick}
            disabled={isUploading}
            aria-label="Change photo"
            className="absolute -bottom-0.5 -right-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-white shadow-sm transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isUploading ? (
              <Loader2 size={12} strokeWidth={2.2} className="animate-spin" />
            ) : (
              <Camera size={12} strokeWidth={2.2} />
            )}
          </button>
        </div>

        <div>
          <p className="text-[16px] font-bold text-slate-800">{name}</p>
          <p className="text-[13.5px] text-slate-500">{email}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <InfoRow icon={Mail} label="Email Address" value={email} />
        <InfoRow icon={Phone} label="Phone Number" value={phone} />
        <InfoRow icon={CalendarCheck} label="Member Since" value={memberSince} />
      </div>
    </div>
  );
}