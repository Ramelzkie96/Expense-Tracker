import { Pencil, Mail, Phone, CalendarCheck, Camera } from "lucide-react";
import { userProfile } from "../../data/settings";
import profile from "../../assets/profile.jpg"

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
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h3 className="text-[16px] font-bold text-slate-800">Profile Information</h3>
          <p className="mt-0.5 text-[13px] text-slate-500">
            Update your personal details and profile picture.
          </p>
        </div>

        <button className="flex h-[36px] items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 text-[13px] font-semibold text-slate-700 transition-colors hover:bg-slate-50">
          <Pencil size={14} strokeWidth={2.2} />
          Edit Profile
        </button>
      </div>

      <div className="mb-6 flex items-center gap-4">
        <div className="relative">
          <div className="h-16 w-16 overflow-hidden rounded-full bg-slate-200">
            <img
              src={profile}
              alt={userProfile.name}
              className="h-full w-full object-cover"
            />
          </div>
          <button
            aria-label="Change photo"
            className="absolute -bottom-0.5 -right-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-white shadow-sm transition-opacity hover:opacity-90"
          >
            <Camera size={12} strokeWidth={2.2} />
          </button>
        </div>

        <div>
          <p className="text-[16px] font-bold text-slate-800">{userProfile.name}</p>
          <p className="text-[13.5px] text-slate-500">{userProfile.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <InfoRow icon={Mail} label="Email Address" value={userProfile.email} />
        <InfoRow icon={Phone} label="Phone Number" value={userProfile.phone} />
        <InfoRow icon={CalendarCheck} label="Member Since" value={userProfile.memberSince} />
      </div>
    </div>
  );
}