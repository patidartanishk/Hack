import { GraduationCap, Coins, Award, Target, Calendar, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="min-h-screen pt-16 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="border rounded-lg p-4 mb-6">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-sm text-gray-500">
            Overview of scholarships, tokens and your learning journey.
          </p>
        </div>

        {/* Simple Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="border rounded-lg p-4">
            <div className="flex items-center gap-2">
              <Coins size={18} />
              <span className="font-semibold text-sm">Tokens</span>
            </div>
            <p className="text-xl font-bold mt-2">120</p>
          </div>

          <div className="border rounded-lg p-4">
            <div className="flex items-center gap-2">
              <Award size={18} />
              <span className="font-semibold text-sm">Certifications</span>
            </div>
            <p className="text-xl font-bold mt-2">2</p>
          </div>

          <div className="border rounded-lg p-4">
            <div className="flex items-center gap-2">
              <Target size={18} />
              <span className="font-semibold text-sm">Progress</span>
            </div>
            <p className="text-xl font-bold mt-2">In Progress</p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Link to="/explore" className="border rounded-lg p-4 hover:bg-gray-50">
            <GraduationCap size={20} />
            <h3 className="font-semibold mt-2">Find Scholarships</h3>
            <p className="text-sm text-gray-500">View available opportunities</p>
          </Link>

          <Link to="/pathway" className="border rounded-lg p-4 hover:bg-gray-50">
            <Target size={20} />
            <h3 className="font-semibold mt-2">AI Pathway</h3>
            <p className="text-sm text-gray-500">Check your learning journey</p>
          </Link>

          <Link to="/tokens" className="border rounded-lg p-4 hover:bg-gray-50">
            <Coins size={20} />
            <h3 className="font-semibold mt-2">Token System</h3>
            <p className="text-sm text-gray-500">See how tokens work</p>
          </Link>
        </div>

        {/* Scholarships Section */}
        <div className="border rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-semibold text-lg">Top Scholarships</h2>
            <Link to="/explore" className="text-sm flex items-center gap-1">
              View All <ChevronRight size={14} />
            </Link>
          </div>

          <div className="space-y-3">
            {[
              { name: "Google Developer Scholarship", amount: "$10,000", deadline: "15 days" },
              { name: "AWS ML Scholarship", amount: "$5,000", deadline: "23 days" },
              { name: "Microsoft Azure Grant", amount: "$7,500", deadline: "30 days" },
            ].map((sch) => (
              <div
                key={sch.name}
                className="border rounded-lg p-3 flex justify-between items-center"
              >
                <div>
                  <p className="font-medium text-sm">{sch.name}</p>
                  <p className="text-xs text-gray-500">{sch.amount}</p>
                </div>
                <span className="text-xs flex items-center gap-1 text-gray-500">
                  <Calendar size={12} /> {sch.deadline}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Pathway */}
        <div className="border rounded-lg p-4">
          <h2 className="font-semibold text-lg mb-3">Learning Pathway</h2>

          <div className="space-y-3">
            <div className="border rounded-lg p-3">
              <p className="font-medium text-sm">Python Basics</p>
              <p className="text-xs text-gray-500">Completed</p>
            </div>

            <div className="border rounded-lg p-3">
              <p className="font-medium text-sm">Data Structures</p>
              <p className="text-xs text-gray-500">In Progress</p>
            </div>

            <div className="border rounded-lg p-3">
              <p className="font-medium text-sm">Machine Learning</p>
              <p className="text-xs text-gray-500">Upcoming</p>
            </div>
          </div>

          <Link
            to="/pathway"
            className="mt-4 inline-block border rounded-md px-4 py-2 text-sm hover:bg-gray-50"
          >
            Continue Learning
          </Link>
        </div>
      </div>
    </div>
  );
}
