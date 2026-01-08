import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Coins,
  Gift,
  History,
  ArrowRight,
  Check,
  Star,
  Trophy,
  Target,
  BookOpen,
  Award
} from "lucide-react";

import { AppLayout } from "@/components/ui/AppLayout";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/context/AuthContext";
import { toast } from "@/components/hooks/use-toast";

interface DiscountTier {
  id: string;
  discount: number;
  tokensRequired: number;
  label: string;
}

interface TokenHistory {
  id: string;
  type: "earned" | "spent";
  amount: number;
  description: string;
  date: string;
}

interface RewardItem {
  id: string;
  title: string;
  description: string;
  tokensRequired: number;
  icon: any;
}

const discountTiers: DiscountTier[] = [
  { id: "1", discount: 10, tokensRequired: 100, label: "Starter" },
  { id: "2", discount: 25, tokensRequired: 250, label: "Silver" },
  { id: "3", discount: 50, tokensRequired: 500, label: "Gold" },
  { id: "4", discount: 100, tokensRequired: 1000, label: "Platinum" }
];

const historyData: TokenHistory[] = [
  { id: "1", type: "earned", amount: 50, description: "Completed Python Course", date: "2024-01-20" },
  { id: "2", type: "earned", amount: 25, description: "Login Streak (7 days)", date: "2024-01-18" },
  { id: "3", type: "spent", amount: 100, description: "Discount Redeem", date: "2024-01-15" },
  { id: "4", type: "earned", amount: 100, description: "Welcome Bonus", date: "2024-01-10" }
];

const rewards: RewardItem[] = [
  { id: "1", title: "Priority Application Review", description: "Get applications reviewed first", tokensRequired: 150, icon: Star },
  { id: "2", title: "AI Resume Review", description: "Detailed improvement suggestions", tokensRequired: 75, icon: Target },
  { id: "3", title: "Exclusive Webinar", description: "Career guidance session", tokensRequired: 200, icon: BookOpen },
  { id: "4", title: "Certificate Badge", description: "Premium digital badge", tokensRequired: 50, icon: Award }
];

export default function TokensPage() {
  const { user, spendTokens } = useAuth();
  const [tab, setTab] = useState<"wallet" | "rewards" | "history">("wallet");

  const tokens = user?.tokens || 0;

  const redeem = (amount: number, title: string) => {
    if (spendTokens()) {
      toast({
        title: "Redeemed Successfully",
        description: title
      });
    } else {
      toast({
        title: "Not Enough Tokens",
        description: "Earn more tokens to unlock this",
        variant: "destructive"
      });
    }
  };

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8 space-y-8">

        {/* Header */}
        <div className="border rounded-2xl p-6 flex items-center justify-between bg-card">
          <div>
            <p className="text-sm text-muted-foreground">Available Tokens</p>
            <h1 className="text-4xl font-bold">{tokens}</h1>
          </div>

          <div className="w-16 h-16 rounded-xl bg-secondary flex items-center justify-center">
            <Coins size={30} />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border rounded-xl p-1 w-fit">
          {[
            { id: "wallet", label: "Discounts", icon: Coins },
            { id: "rewards", label: "Rewards", icon: Gift },
            { id: "history", label: "History", icon: History }
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm
                ${tab === t.id ? "bg-card shadow-sm font-medium" : "text-muted-foreground"}`}
            >
              <t.icon size={16} />
              {t.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">

          {/* Discounts */}
          {tab === "wallet" && (
            <motion.div
              key="wallet"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <h2 className="text-xl font-semibold">Certification Discounts</h2>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {discountTiers.map(t => {
                  const unlocked = tokens >= t.tokensRequired;

                  return (
                    <div
                      key={t.id}
                      className={`border rounded-xl p-4 ${
                        unlocked ? "border-green-500 bg-green-50 dark:bg-green-900/10" : ""
                      }`}
                    >
                      <div className="text-3xl font-bold mb-1">
                        {t.discount}%
                      </div>

                      <p className="font-medium">{t.label}</p>
                      <p className="text-sm text-muted-foreground mb-3">
                        Requires {t.tokensRequired} tokens
                      </p>

                      {unlocked ? (
                        <p className="text-sm text-green-600 flex items-center gap-1">
                          <Check size={14} />
                          Unlocked
                        </p>
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          {t.tokensRequired - tokens} more needed
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Earn Tokens Info */}
              <div className="border rounded-xl p-6">
                <h3 className="font-semibold mb-4">How to Earn Tokens</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { title: "Complete Courses", gain: "+50", icon: BookOpen },
                    { title: "Login Streaks", gain: "+25", icon: Trophy },
                    { title: "Certifications", gain: "+100", icon: Award }
                  ].map(item => (
                    <div key={item.title} className="flex items-center gap-3 p-3 border rounded-xl">
                      <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-secondary">
                        <item.icon size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{item.title}</p>
                        <p className="text-sm text-green-600">{item.gain}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Rewards */}
          {tab === "rewards" && (
            <motion.div
              key="rewards"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <h2 className="text-xl font-semibold">Reward Store</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {rewards.map(r => {
                  const canRedeem = tokens >= r.tokensRequired;
                  const Icon = r.icon;

                  return (
                    <div key={r.id} className="border rounded-xl p-5 flex gap-4">
                      <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center">
                        <Icon size={20} />
                      </div>

                      <div className="flex-1">
                        <p className="font-semibold">{r.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {r.description}
                        </p>

                        <div className="flex justify-between mt-3">
                          <span className="text-sm font-semibold flex items-center gap-1">
                            <Coins size={14} /> {r.tokensRequired}
                          </span>

                          <Button
                            size="sm"
                            disabled={!canRedeem}
                            onClick={() => redeem(r.tokensRequired, r.title)}
                          >
                            Redeem
                            <ArrowRight size={14} className="ml-1" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* History */}
          {tab === "history" && (
            <motion.div
              key="history"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <h2 className="text-xl font-semibold">Token History</h2>

              <div className="border rounded-xl divide-y">
                {historyData.map(item => (
                  <div key={item.id} className="p-4 flex justify-between">
                    <div>
                      <p className="text-sm font-medium">{item.description}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(item.date).toDateString()}
                      </p>
                    </div>

                    <span
                      className={`font-semibold ${
                        item.type === "earned" ? "text-green-600" : "text-red-500"
                      }`}
                    >
                      {item.type === "earned" ? "+" : "-"}
                      {item.amount}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AppLayout>
  );
}
