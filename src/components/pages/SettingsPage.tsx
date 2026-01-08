import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  Lock,
  Trash2,
  Moon,
  Sun,
  Shield,
  AlertTriangle
} from "lucide-react";

import { AppLayout } from "@/components/ui/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/components/context/AuthContext";
import { useTheme } from "@/components/context/ThemeContext";
import { toast } from "@/components/hooks/use-toast";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";

export default function SettingsPage() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const [notifications, setNotifications] = useState({
    scholarships: true,
    pathwayUpdates: true,
    tokenRewards: true,
    emailDigest: false
  });

  const [passwordForm, setPasswordForm] = useState({
    current: "",
    new: "",
    confirm: ""
  });

  const [changingPassword, setChangingPassword] = useState(false);

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));

    toast({
      title: "Notification Updated",
      description: "Your preferences have been saved."
    });
  };

  const handlePasswordChange = async () => {
    if (passwordForm.new !== passwordForm.confirm) {
      toast({
        title: "Passwords do not match",
        variant: "destructive"
      });
      return;
    }

    if (passwordForm.new.length < 6) {
      toast({
        title: "Weak Password",
        description: "Password must be at least 6 characters.",
        variant: "destructive"
      });
      return;
    }

    setChangingPassword(true);
    await new Promise(res => setTimeout(res, 1200));
    setChangingPassword(false);

    setPasswordForm({
      current: "",
      new: "",
      confirm: ""
    });

    toast({
      title: "Password Updated",
      description: "Your password has been changed."
    });
  };

  const handleDeleteAccount = () => {
    logout();
    navigate("/");

    toast({
      title: "Account Deleted",
      description: "Your account has been removed."
    });
  };

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8 max-w-3xl space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-1">Settings</h1>
          <p className="text-muted-foreground">
            Manage how your account behaves
          </p>
        </div>

        {/* Appearance */}
        <div className="border rounded-xl p-6 bg-white dark:bg-card">
          <div className="flex items-center gap-2 mb-4">
            {theme === "dark" ? <Moon size={18} /> : <Sun size={18} />}
            <h2 className="text-lg font-semibold">Appearance</h2>
          </div>

          <div className="flex items-center justify-between border rounded-xl p-4">
            <div>
              <p className="font-medium">Dark Mode</p>
              <p className="text-sm text-muted-foreground">
                Switch between light and dark theme
              </p>
            </div>
            <Switch checked={theme === "dark"} onCheckedChange={toggleTheme} />
          </div>
        </div>

        {/* Notifications */}
        <div className="border rounded-xl p-6 bg-white dark:bg-card">
          <div className="flex items-center gap-2 mb-4">
            <Bell size={18} />
            <h2 className="text-lg font-semibold">Notifications</h2>
          </div>

          <div className="space-y-3">
            {[
              {
                key: "scholarships",
                label: "Scholarship Matches",
                desc: "Alerts for scholarship opportunities"
              },
              {
                key: "pathwayUpdates",
                label: "Pathway Updates",
                desc: "Learning reminders and progress alerts"
              },
              {
                key: "tokenRewards",
                label: "Token Rewards",
                desc: "When you earn new tokens"
              },
              {
                key: "emailDigest",
                label: "Weekly Email Summary",
                desc: "Weekly report sent to your email"
              }
            ].map(item => (
              <div
                key={item.key}
                className="flex items-center justify-between border rounded-xl p-4"
              >
                <div>
                  <p className="font-medium">{item.label}</p>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>

                <Switch
                  checked={
                    notifications[item.key as keyof typeof notifications]
                  }
                  onCheckedChange={() =>
                    handleNotificationChange(
                      item.key as keyof typeof notifications
                    )
                  }
                />
              </div>
            ))}
          </div>
        </div>

        {/* Security */}
        <div className="border rounded-xl p-6 bg-white dark:bg-card">
          <div className="flex items-center gap-2 mb-4">
            <Lock size={18} />
            <h2 className="text-lg font-semibold">Security</h2>
          </div>

          <div className="space-y-4">
            <div>
              <Label>Current Password</Label>
              <Input
                type="password"
                className="mt-1"
                value={passwordForm.current}
                onChange={e =>
                  setPasswordForm(prev => ({
                    ...prev,
                    current: e.target.value
                  }))
                }
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>New Password</Label>
                <Input
                  type="password"
                  className="mt-1"
                  value={passwordForm.new}
                  onChange={e =>
                    setPasswordForm(prev => ({
                      ...prev,
                      new: e.target.value
                    }))
                  }
                />
              </div>

              <div>
                <Label>Confirm Password</Label>
                <Input
                  type="password"
                  className="mt-1"
                  value={passwordForm.confirm}
                  onChange={e =>
                    setPasswordForm(prev => ({
                      ...prev,
                      confirm: e.target.value
                    }))
                  }
                />
              </div>
            </div>

            <Button
              disabled={
                !passwordForm.current ||
                !passwordForm.new ||
                !passwordForm.confirm ||
                changingPassword
              }
              onClick={handlePasswordChange}
              className="gap-2"
            >
              {changingPassword ? (
                <Shield size={16} className="animate-spin" />
              ) : (
                <Shield size={16} />
              )}
              Update Password
            </Button>
          </div>
        </div>

        {/* Danger Section */}
        <div className="border rounded-xl p-6 bg-white dark:bg-card">
          <div className="flex items-center gap-2 mb-4 text-red-600">
            <AlertTriangle size={18} />
            <h2 className="text-lg font-semibold">Danger Zone</h2>
          </div>

          <div className="border rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-red-600">Delete Account</p>
                <p className="text-sm text-muted-foreground">
                  Permanently remove your account and data
                </p>
              </div>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="gap-2">
                    <Trash2 size={16} />
                    Delete
                  </Button>
                </AlertDialogTrigger>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      This action cannot be undone
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Your account, tokens, progress, and data will be
                      permanently removed.
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>

                    <AlertDialogAction
                      onClick={handleDeleteAccount}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Delete Account
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
