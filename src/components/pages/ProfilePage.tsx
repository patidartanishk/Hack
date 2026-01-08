import { useState } from "react";
import {
  User,
  Mail,
  MapPin,
  Building,
  Target,
  Calendar,
  Edit2,
  Save,
  X,
  Coins,
  Award,
  Flame,
  Heart
} from "lucide-react";
import { AppLayout } from "@/components/ui/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/components/context/AuthContext";
import { toast } from "@/components/hooks/use-toast";

export default function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  type ProfileFormData = {
    fullName: string;
    location: string;
    institution: string;
    careerGoal: string;
    educationLevel: string;
  };

  const [formData, setFormData] = useState<ProfileFormData>({
    fullName: user?.fullName || "",
    location: user?.location || "",
    institution: user?.institution || "",
    careerGoal: user?.careerGoal || "",
    educationLevel: user?.educationLevel || ""
  });

  const handleSave = () => {
    updateProfile();
    setIsEditing(false);

    toast({
      title: "Profile Updated",
      description: "Your profile has been saved."
    });
  };

  const handleCancel = () => {
    setFormData({
      fullName: user?.fullName || "",
      location: user?.location || "",
      institution: user?.institution || "",
      careerGoal: user?.careerGoal || "",
      educationLevel: user?.educationLevel || ""
    });
    setIsEditing(false);
  };

  const memberSince = user?.joinedDate
    ? new Date(user.joinedDate).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric"
    })
    : "N/A";

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8 max-w-4xl space-y-8">

        {/* Header */}
        <div className="border rounded-xl p-6 flex flex-col md:flex-row items-center gap-6 bg-white dark:bg-card">
          <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-secondary flex items-center justify-center text-2xl font-semibold">
            {user?.fullName?.charAt(0) || "U"}
          </div>

          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl font-bold">{user?.fullName || "User"}</h1>
            <p className="text-gray-500 dark:text-muted-foreground">{user?.email}</p>

            <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-600 dark:text-muted-foreground justify-center md:justify-start">
              <span className="flex items-center gap-1">
                <Calendar size={14} /> Member since {memberSince}
              </span>
              {user?.educationLevel && (
                <span className="flex items-center gap-1">
                  🎓 {user.educationLevel}
                </span>
              )}
            </div>
          </div>

          <Button
            onClick={() => setIsEditing(!isEditing)}
            variant={isEditing ? "destructive" : "outline"}
            className="gap-2"
          >
            {isEditing ? (
              <>
                <X size={16} />
                Cancel
              </>
            ) : (
              <>
                <Edit2 size={16} />
                Edit Profile
              </>
            )}
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Tokens", value: user?.tokens || 0, icon: Coins },
            { label: "Certifications", value: user?.certifications || 0, icon: Award },
            { label: "Day Streak", value: user?.streak || 1, icon: Flame }
          ].map((s) => (
            <div key={s.label} className="border rounded-xl p-5 text-center bg-white dark:bg-card">
              <s.icon className="mx-auto mb-2" />
              <h3 className="text-2xl font-bold">{s.value}</h3>
              <p className="text-sm text-gray-500">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Profile Info */}
        <div className="border rounded-xl p-6 bg-white dark:bg-card">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <User size={18} />
            Profile Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <Label>Full Name</Label>
              {isEditing ? (
                <Input
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />
              ) : (
                <div className="border rounded-lg p-3 flex items-center gap-2">
                  <User size={16} />
                  {user?.fullName}
                </div>
              )}
            </div>

            {/* Email */}
            <div>
              <Label>Email</Label>
              <div className="border rounded-lg p-3 flex items-center gap-2 bg-gray-50 dark:bg-secondary">
                <Mail size={16} />
                {user?.email}
              </div>
            </div>

            {/* Location */}
            <div>
              <Label>Location</Label>
              {isEditing ? (
                <Input
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                />
              ) : (
                <div className="border rounded-lg p-3 flex items-center gap-2">
                  <MapPin size={16} />
                  {user?.location}
                </div>
              )}
            </div>

            {/* Institution */}
            <div>
              <Label>Institution</Label>
              {isEditing ? (
                <Input
                  value={formData.institution}
                  onChange={(e) =>
                    setFormData({ ...formData, institution: e.target.value })
                  }
                />
              ) : (
                <div className="border rounded-lg p-3 flex items-center gap-2">
                  <Building size={16} />
                  {user?.institution}
                </div>
              )}
            </div>

            {/* Career Goal */}
            <div className="md:col-span-2">
              <Label>Career Goal</Label>
              {isEditing ? (
                <Input
                  value={formData.careerGoal}
                  onChange={(e) =>
                    setFormData({ ...formData, careerGoal: e.target.value })
                  }
                />
              ) : (
                <div className="border rounded-lg p-3 flex items-center gap-2">
                  <Target size={16} />
                  {user?.careerGoal}
                </div>
              )}
            </div>
          </div>

          {isEditing && (
            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                <Save size={14} className="mr-1" />
                Save
              </Button>
            </div>
          )}
        </div>

        {/* Interests */}
        <div className="border rounded-xl p-6 bg-white dark:bg-card">
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Heart size={18} />
            Interests
          </h2>

          <div className="flex flex-wrap gap-2">
            {user?.interests?.length ? (
              user.interests.map((i) => (
                <span
                  key={i}
                  className="px-3 py-1 border rounded-full text-sm"
                >
                  {i}
                </span>
              ))
            ) : (
              <p className="text-sm text-gray-500">No interests added yet.</p>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
