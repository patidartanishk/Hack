import { motion } from 'framer-motion';
import { 
  Target, 
  CheckCircle2, 
  Circle, 
  Lock,
  BookOpen,
  Award,
  Clock,
  ChevronRight,
  Sparkles,
  TrendingUp,
  Play
} from 'lucide-react';
import { AppLayout } from '@/components/ui/AppLayout';
import { Button } from '@/components/ui/button';
import { staggerContainer, fadeInUp } from '@/components/lib/animations';
import { useAuth } from '@/components/context/AuthContext';

interface PathwayStep {
  id: string;
  title: string;
  description: string;
  duration: string;
  status: 'completed' | 'current' | 'locked';
  progress: number;
  type: 'course' | 'project' | 'certification';
  skills: string[];
}

const pathwaySteps: PathwayStep[] = [
  {
    id: '1',
    title: 'Programming Fundamentals',
    description: 'Master the basics of programming with Python, including variables, loops, and functions.',
    duration: '4 weeks',
    status: 'completed',
    progress: 100,
    type: 'course',
    skills: ['Python', 'Logic', 'Problem Solving'],
  },
  {
    id: '2',
    title: 'Data Structures & Algorithms',
    description: 'Learn essential data structures and algorithmic thinking for technical interviews.',
    duration: '6 weeks',
    status: 'current',
    progress: 65,
    type: 'course',
    skills: ['Arrays', 'Trees', 'Graphs', 'Dynamic Programming'],
  },
  {
    id: '3',
    title: 'Build a Portfolio Project',
    description: 'Apply your skills by building a real-world application from scratch.',
    duration: '3 weeks',
    status: 'locked',
    progress: 0,
    type: 'project',
    skills: ['Full Stack', 'Git', 'Deployment'],
  },
  {
    id: '4',
    title: 'Machine Learning Basics',
    description: 'Introduction to machine learning concepts, algorithms, and practical applications.',
    duration: '8 weeks',
    status: 'locked',
    progress: 0,
    type: 'course',
    skills: ['ML', 'Statistics', 'TensorFlow'],
  },
  {
    id: '5',
    title: 'AWS Cloud Practitioner',
    description: 'Earn your first cloud certification and understand cloud computing fundamentals.',
    duration: '4 weeks',
    status: 'locked',
    progress: 0,
    type: 'certification',
    skills: ['AWS', 'Cloud', 'Infrastructure'],
  },
  {
    id: '6',
    title: 'Capstone: AI Application',
    description: 'Build and deploy a complete AI-powered application as your capstone project.',
    duration: '6 weeks',
    status: 'locked',
    progress: 0,
    type: 'project',
    skills: ['AI', 'APIs', 'Production'],
  },
];

export default function PathwayPage() {
  const { user } = useAuth();
  
  const completedSteps = pathwaySteps.filter(s => s.status === 'completed').length;
  const overallProgress = Math.round((completedSteps / pathwaySteps.length) * 100);

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="space-y-8"
        >
          {/* Header */}
          <motion.div variants={fadeInUp} className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 text-success mb-4">
              <Sparkles size={16} />
              <span className="text-sm font-medium">AI-Powered Learning Path</span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Your Path to <span className="gradient-text-accent">{user?.careerGoal || 'Success'}</span>
            </h1>
            <p className="text-muted-foreground">
              A personalized learning journey designed by AI based on your goals and current skills
            </p>
          </motion.div>

          {/* Progress Overview */}
          <motion.div variants={fadeInUp} className="bg-card border border-border rounded-2xl p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl gradient-bg-primary flex items-center justify-center">
                  <Target size={28} className="text-primary-foreground" />
                </div>
                <div>
                  <h2 className="font-display text-xl font-semibold">Journey Progress</h2>
                  <p className="text-muted-foreground">{completedSteps} of {pathwaySteps.length} milestones completed</p>
                </div>
              </div>
              
              <div className="flex-1 max-w-md">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Overall Progress</span>
                  <span className="font-semibold">{overallProgress}%</span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full gradient-bg-success rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${overallProgress}%` }}
                    transition={{ duration: 1, delay: 0.3 }}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Timeline */}
          <motion.div variants={fadeInUp} className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2" />
            
            <div className="space-y-8">
              {pathwaySteps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative flex flex-col md:flex-row gap-4 md:gap-8 ${
                    index % 2 === 0 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Node */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      step.status === 'completed' 
                        ? 'gradient-bg-success' 
                        : step.status === 'current'
                          ? 'gradient-bg-accent shadow-accent-glow'
                          : 'bg-muted'
                    }`}>
                      {step.status === 'completed' ? (
                        <CheckCircle2 size={22} className="text-success-foreground" />
                      ) : step.status === 'current' ? (
                        <Play size={20} className="text-accent-foreground" />
                      ) : (
                        <Lock size={18} className="text-muted-foreground" />
                      )}
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className={`ml-20 md:ml-0 md:w-5/12 ${index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'}`}>
                    <motion.div
                      whileHover={step.status !== 'locked' ? { scale: 1.02 } : undefined}
                      className={`bg-card border rounded-2xl p-6 ${
                        step.status === 'current' 
                          ? 'border-accent shadow-lg' 
                          : 'border-border'
                      } ${step.status === 'locked' ? 'opacity-60' : ''}`}
                    >
                      {/* Type Badge */}
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          step.type === 'course' 
                            ? 'bg-primary/10 text-primary'
                            : step.type === 'project'
                              ? 'bg-accent/10 text-accent'
                              : 'bg-success/10 text-success'
                        }`}>
                          {step.type === 'course' ? (
                            <span className="flex items-center gap-1"><BookOpen size={12} /> Course</span>
                          ) : step.type === 'project' ? (
                            <span className="flex items-center gap-1"><Target size={12} /> Project</span>
                          ) : (
                            <span className="flex items-center gap-1"><Award size={12} /> Certification</span>
                          )}
                        </span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock size={12} /> {step.duration}
                        </span>
                      </div>

                      <h3 className="font-display text-lg font-semibold mb-2">{step.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{step.description}</p>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {step.skills.map((skill) => (
                          <span 
                            key={skill}
                            className="px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground text-xs"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      {/* Progress Bar */}
                      {step.status !== 'locked' && (
                        <div className="mb-4">
                          <div className="flex items-center justify-between text-xs mb-1.5">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="font-medium">{step.progress}%</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <motion.div
                              className={`h-full rounded-full ${
                                step.status === 'completed' ? 'gradient-bg-success' : 'gradient-bg-accent'
                              }`}
                              initial={{ width: 0 }}
                              animate={{ width: `${step.progress}%` }}
                              transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                            />
                          </div>
                        </div>
                      )}

                      {/* Action Button */}
                      <Button
                        disabled={step.status === 'locked'}
                        className={`w-full ${
                          step.status === 'current' 
                            ? 'gradient-bg-accent hover:opacity-90 text-accent-foreground' 
                            : step.status === 'completed'
                              ? 'gradient-bg-success hover:opacity-90 text-success-foreground'
                              : ''
                        }`}
                        variant={step.status === 'locked' ? 'secondary' : 'default'}
                      >
                        {step.status === 'completed' ? (
                          <>Review<ChevronRight size={16} className="ml-2" /></>
                        ) : step.status === 'current' ? (
                          <>Continue<ChevronRight size={16} className="ml-2" /></>
                        ) : (
                          <>Locked<Lock size={14} className="ml-2" /></>
                        )}
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Summary Card */}
          <motion.div 
            variants={fadeInUp}
            className="bg-card border border-border rounded-2xl p-6 text-center"
          >
            <TrendingUp size={32} className="mx-auto text-success mb-3" />
            <h3 className="font-display text-xl font-semibold mb-2">Estimated Time to Complete</h3>
            <p className="text-3xl font-bold gradient-text-accent mb-2">31 Weeks</p>
            <p className="text-muted-foreground text-sm">Based on 10 hours/week of learning</p>
          </motion.div>
        </motion.div>
      </div>
    </AppLayout>
  );
}
