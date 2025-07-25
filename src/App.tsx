
import React, { useState, useEffect } from 'react';
import { Button } from './components/ui/Button';
import { Progress } from './components/ui/Progress';
import { ScrollArea } from './components/ui/ScrollArea';
import { Separator } from './components/ui/Separator';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './components/ui/Collapsible';
import { Home as HomeComponent } from './components/Home';
import { About } from './components/About';
import { LessonBrowser } from './components/LessonBrowser';
import { LessonViewer } from './components/LessonViewer';
import { ExamplesBrowser } from './components/ExamplesBrowser';
import { QuizzesBrowser } from './components/QuizzesBrowser';
import { StandaloneQuizViewer } from './components/StandaloneQuizViewer';
import { ProgressDashboard } from './components/ProgressDashboard';
import { HelpModal } from './components/HelpModal';
import { SettingsModal } from './components/SettingsModal';
import { ToastContainer } from './components/ToastContainer';
import { loadLesson, loadAllLessons, loadAllExamples, loadAllQuizzes, loadAllAchievements } from './utils/contentLoader';
import type { MarkdownLesson, UserProgress, LabviewExample, StandaloneQuiz, Achievement } from './types';
import { 
  Library,
  LayoutGrid,
  Brain, 
  BarChart3, 
  Menu,
  X,
  ChevronsUpDown,
  Home,
  Settings,
  HelpCircle,
  Loader2,
  Info,
  Flame
} from 'lucide-react';

interface ToastMessage {
  id: string;
  type: 'success' | 'info';
  title: string;
  description: string;
}

type Theme = 'light' | 'dark' | 'system';

export default function App() {
  type View = 'home' | 'browser' | 'lesson' | 'examples' | 'quizzes' | 'standaloneQuiz' | 'progress' | 'about';
  const [currentView, setCurrentView] = useState<View>('home');
  const [currentLesson, setCurrentLesson] = useState<MarkdownLesson | null>(null);
  const [currentQuiz, setCurrentQuiz] = useState<StandaloneQuiz | null>(null);
  const [lessons, setLessons] = useState<MarkdownLesson[]>([]);
  const [examples, setExamples] = useState<LabviewExample[]>([]);
  const [quizzes, setQuizzes] = useState<StandaloneQuiz[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [lessonLoading, setLessonLoading] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>('system');
  const [userProgress, setUserProgress] = useState<UserProgress>({
    completedLessons: [],
    currentLesson: null,
    lessonQuizScores: {},
    standaloneQuizScores: {},
    totalTimeSpent: 0,
    unlockedAchievements: [],
    learningStreak: { count: 0, lastActivityDate: '' },
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [quickAccessOpen, setQuickAccessOpen] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('labview-learning-theme') as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    localStorage.setItem('labview-learning-theme', theme);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const updateTheme = () => {
      if (theme === 'dark' || (theme === 'system' && mediaQuery.matches)) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    };

    updateTheme();

    if (theme === 'system') {
      mediaQuery.addEventListener('change', updateTheme);
      return () => mediaQuery.removeEventListener('change', updateTheme);
    }
  }, [theme]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [loadedLessons, loadedExamples, loadedQuizzes, loadedAchievements] = await Promise.all([
          loadAllLessons(),
          loadAllExamples(),
          loadAllQuizzes(),
          loadAllAchievements(),
        ]);
        
        setLessons(loadedLessons);
        setExamples(loadedExamples);
        setQuizzes(loadedQuizzes);
        setAchievements(loadedAchievements);

        const savedProgress = localStorage.getItem('labview-learning-progress');
        if (savedProgress) {
          const progress = JSON.parse(savedProgress) as UserProgress;
          // Ensure new fields exist for backward compatibility
          progress.unlockedAchievements = progress.unlockedAchievements || [];
          progress.lessonQuizScores = progress.lessonQuizScores || (progress as any).quizScores || {};
          progress.standaloneQuizScores = progress.standaloneQuizScores || {};
          progress.totalTimeSpent = progress.totalTimeSpent || 0;
          progress.learningStreak = progress.learningStreak || { count: 0, lastActivityDate: '' };
          
          setUserProgress(progress);
          setLessons(prev => prev.map(lesson => ({
            ...lesson,
            completed: progress.completedLessons.includes(lesson.id)
          })));
        }
      } catch (error) {
        console.error('Failed to load initial data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);
  
  const saveProgress = (newProgress: UserProgress) => {
    setUserProgress(newProgress);
    localStorage.setItem('labview-learning-progress', JSON.stringify(newProgress));
  };

  const handleResetProgress = () => {
    if (window.confirm('Are you sure you want to reset all your progress? This action cannot be undone.')) {
        localStorage.removeItem('labview-learning-progress');
        window.location.reload();
    }
  };

  const addToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { ...toast, id }]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };
  
  const completedCount = userProgress.completedLessons.length;
  const progressPercentage = lessons.length > 0 ? (completedCount / lessons.length) * 100 : 0;

  const handleLessonSelect = async (lessonId: string) => {
    const lessonMeta = lessons.find(l => l.id === lessonId);
    if (!lessonMeta) return;

    try {
      setLessonLoading(true);
      setSidebarOpen(false);
      
      const fullLesson = await loadLesson(lessonMeta.id);
      fullLesson.completed = userProgress.completedLessons.includes(fullLesson.id);
      
      setCurrentLesson(fullLesson);
      setCurrentView('lesson');
    } catch (error) {
      console.error('Failed to load lesson:', error);
    } finally {
      setLessonLoading(false);
    }
  };

  const updateLearningStreak = (progress: UserProgress): UserProgress => {
      const today = new Date();
      const lastActivity = progress.learningStreak.lastActivityDate ? new Date(progress.learningStreak.lastActivityDate) : null;
      let newStreakCount = progress.learningStreak.count;

      if (lastActivity) {
          const todayDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
          const lastActivityDay = new Date(lastActivity.getFullYear(), lastActivity.getMonth(), lastActivity.getDate());
          
          const diffTime = todayDay.getTime() - lastActivityDay.getTime();
          const diffDays = Math.round(diffTime / (1000 * 3600 * 24));

          if (diffDays === 1) {
              newStreakCount++;
          } else if (diffDays > 1) {
              newStreakCount = 1;
          }
      } else {
          newStreakCount = 1;
      }
      
      return {
          ...progress,
          learningStreak: {
              count: newStreakCount,
              lastActivityDate: today.toISOString()
          }
      };
  };

  const checkAndUnlockAchievements = (progress: UserProgress, completedLesson?: MarkdownLesson): { nextProgress: UserProgress, newlyUnlocked: Achievement[] } => {
      const newlyUnlockedIds: string[] = [];
      achievements.forEach(ach => {
        if (progress.unlockedAchievements.includes(ach.id)) return;

        let achieved = false;
        if (ach.type === 'complete_first_lesson' && progress.completedLessons.length === 1) {
          achieved = true;
        } else if (ach.type === 'complete_n_lessons' && ach.goal.count && progress.completedLessons.length >= ach.goal.count) {
          achieved = true;
        } else if (ach.type === 'complete_category' && completedLesson && ach.goal.category === completedLesson.category) {
          const categoryLessons = lessons.filter(l => l.category === ach.goal.category);
          const allInCategoryCompleted = categoryLessons.every(l => progress.completedLessons.includes(l.id));
          if (allInCategoryCompleted) {
            achieved = true;
          }
        } else if (ach.type === 'pass_quiz') {
            const allScores = {...progress.lessonQuizScores, ...progress.standaloneQuizScores};
            if (Object.values(allScores).some(s => (s.score / s.total) >= 0.8)) { // e.g. pass is 80%
                achieved = true;
            }
        }

        if (achieved) {
          newlyUnlockedIds.push(ach.id);
        }
      });

      if (newlyUnlockedIds.length > 0) {
        progress.unlockedAchievements = [...progress.unlockedAchievements, ...newlyUnlockedIds];
      }

      const newlyUnlocked = achievements.filter(ach => newlyUnlockedIds.includes(ach.id));
      
      return { nextProgress: progress, newlyUnlocked };
  }

  const handleLessonComplete = (lessonId: string, result: { score: number, total: number }) => {
    if (userProgress.completedLessons.includes(lessonId)) return;
    
    const completedLesson = lessons.find(l => l.id === lessonId);
    if (!completedLesson) return;

    let newProgress: UserProgress = {
      ...userProgress,
      completedLessons: [...userProgress.completedLessons, lessonId],
      totalTimeSpent: userProgress.totalTimeSpent + (completedLesson.estimatedTime || 0),
      lessonQuizScores: {
        ...userProgress.lessonQuizScores,
        [lessonId]: {
          ...result,
          date: new Date().toISOString(),
        }
      }
    };
    
    newProgress = updateLearningStreak(newProgress);
    const { nextProgress, newlyUnlocked } = checkAndUnlockAchievements(newProgress, completedLesson);
    
    saveProgress(nextProgress);
    
    if (newlyUnlocked.length > 0) {
        newlyUnlocked.forEach(ach => addToast({ type: 'success', title: 'Achievement Unlocked!', description: ach.title }));
    }

    setLessons(prev => prev.map(lesson => 
      lesson.id === lessonId ? { ...lesson, completed: true } : lesson
    ));
    
    if (currentLesson?.id === lessonId) {
      setCurrentLesson(prev => prev ? { ...prev, completed: true } : null);
    }
  };

  const handleStartStandaloneQuiz = (quizId: string) => {
    const quiz = quizzes.find(q => q.id === quizId);
    if (quiz) {
      setCurrentQuiz(quiz);
      setCurrentView('standaloneQuiz');
      setSidebarOpen(false);
    }
  };

  const handleStandaloneQuizComplete = (quizId: string, result: { score: number, total: number }) => {
      let newProgress: UserProgress = {
      ...userProgress,
      standaloneQuizScores: {
        ...userProgress.standaloneQuizScores,
        [quizId]: {
          ...result,
          date: new Date().toISOString(),
        }
      }
    };

    newProgress = updateLearningStreak(newProgress);
    const { nextProgress, newlyUnlocked } = checkAndUnlockAchievements(newProgress);
    saveProgress(nextProgress);
    
    if (newlyUnlocked.length > 0) {
        newlyUnlocked.forEach(ach => addToast({ type: 'success', title: 'Achievement Unlocked!', description: ach.title }));
    }

    setCurrentView('quizzes');
    setCurrentQuiz(null);
  };


  const handleLessonNavigation = (direction: 'prev' | 'next') => {
    if (!currentLesson) return;
    const currentIndex = lessons.findIndex(lesson => lesson.id === currentLesson.id);
    if (currentIndex === -1) return;
    const nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    if (nextIndex >= 0 && nextIndex < lessons.length) {
      handleLessonSelect(lessons[nextIndex].id);
    }
  };

  const getNavigationState = () => {
    if (!currentLesson) return { prev: false, next: false };
    const currentIndex = lessons.findIndex(lesson => lesson.id === currentLesson.id);
    return {
      prev: currentIndex > 0,
      next: currentIndex < lessons.length - 1
    };
  };

  const navigationItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'browser', label: 'Lessons', icon: Library },
    { id: 'examples', label: 'Examples & References', icon: LayoutGrid },
    { id: 'quizzes', label: 'Quizzes', icon: Brain },
    { id: 'progress', label: 'Progress', icon: BarChart3 },
  ];

  const viewConfig = {
    home: { title: 'Home', icon: Home },
    browser: { title: 'Lessons', icon: Library },
    lesson: { title: currentLesson?.title || 'Lesson', icon: Library },
    examples: { title: 'Examples & References', icon: LayoutGrid },
    quizzes: { title: 'Quizzes', icon: Brain },
    standaloneQuiz: { title: currentQuiz?.title || 'Quiz', icon: Brain },
    progress: { title: 'Progress', icon: BarChart3 },
    about: { title: 'About', icon: Info },
  };

  const currentViewConfig = viewConfig[currentView];

  const changeView = (view: View) => {
    setCurrentView(view);
    setCurrentLesson(null);
    setCurrentQuiz(null);
    setSidebarOpen(false);
  }

  const renderContent = () => {
    if (lessonLoading || loading) {
       return (
         <div className="flex items-center justify-center h-full">
           <Loader2 className="h-8 w-8 animate-spin mr-4 text-text-subtle" />
           <span className="text-lg text-text-secondary">Loading...</span>
         </div>
       );
    }

    switch (currentView) {
      case 'home':
        return <HomeComponent onStart={() => changeView('browser')} />;
      case 'about':
        return <About />;
      case 'lesson':
        return currentLesson ? (
          <LessonViewer 
            lesson={currentLesson}
            onComplete={(result) => handleLessonComplete(currentLesson.id, result)}
            isCompleted={userProgress.completedLessons.includes(currentLesson.id)}
            onNavigate={handleLessonNavigation}
            canNavigate={getNavigationState()}
          />
        ) : <div className="text-center py-12"><p>No lesson selected.</p></div>;
      case 'browser':
        return <LessonBrowser lessons={lessons} onLessonSelect={handleLessonSelect} userProgress={userProgress} />;
      case 'examples':
        return <ExamplesBrowser examples={examples} />;
      case 'quizzes':
        return <QuizzesBrowser quizzes={quizzes} onStartQuiz={handleStartStandaloneQuiz} />;
      case 'standaloneQuiz':
        return currentQuiz ? (
            <StandaloneQuizViewer 
                quiz={currentQuiz}
                onComplete={(result) => handleStandaloneQuizComplete(currentQuiz.id, result)}
                onBack={() => changeView('quizzes')}
            />
        ) : <div className="text-center py-12"><p>No quiz selected.</p></div>;
      case 'progress':
        return <ProgressDashboard userProgress={userProgress} lessons={lessons} achievements={achievements} onReviewLesson={handleLessonSelect}/>;
      default:
        return <div className="text-center py-12"><p>This section is under construction.</p></div>;
    }
  }

  const handleBreadcrumbClick = () => {
    if (currentView === 'lesson') {
      changeView('browser');
    } else if (currentView === 'standaloneQuiz') {
      changeView('quizzes');
    }
  };

  return (
    <div className="flex h-screen text-text-primary">
      <Button variant="outline" size="icon" className="md:hidden fixed top-4 left-4 z-50 bg-background-card" onClick={() => setSidebarOpen(!sidebarOpen)}>
        {sidebarOpen ? <X className="h-5 w-5"/> : <Menu className="h-5 w-5"/>}
      </Button>

      <div className={`fixed md:relative inset-y-0 left-0 z-40 w-72 bg-background-sidebar border-r border-border transform transition-transform duration-200 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className="flex flex-col h-full pt-16 md:pt-0">
          <div className="p-6 border-b border-border">
            <h1 className="text-xl font-semibold text-text-primary">LabVIEW Learning</h1>
            <p className="text-sm text-text-subtle mt-1">Master graphical programming</p>
            <div className="mt-6">
              <div className="flex items-center justify-between text-xs text-text-subtle mb-1">
                <span>Overall Progress</span>
                <span>{completedCount}/{lessons.length}</span>
              </div>
              <Progress value={progressPercentage} />
            </div>
          </div>

          <ScrollArea className="flex-1 p-4">
            <nav className="space-y-1">
              {navigationItems.map((item) => {
                 const isActive = currentView === item.id || (currentView === 'lesson' && item.id === 'browser');
                 return (
                    <Button key={item.id} variant="ghost" className={`w-full justify-start text-sm font-medium h-10 ${isActive ? 'bg-background-active text-text-accent' : 'text-text-secondary hover:bg-background-hover hover:text-text-primary'}`} onClick={() => changeView(item.id as View)}>
                      <item.icon className={`mr-3 h-5 w-5 ${isActive ? 'text-text-accent' : 'text-text-subtle'}`} />
                      {item.label}
                    </Button>
                 );
              })}
            </nav>
            <Separator className="my-4" />
            <Collapsible open={quickAccessOpen} onOpenChange={setQuickAccessOpen}>
              <CollapsibleTrigger className="flex items-center justify-between w-full px-2 py-1 text-sm font-semibold text-text-subtle hover:text-text-primary transition-colors rounded-md">
                <span>Quick Access</span>
                <ChevronsUpDown className="h-4 w-4" />
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-1 mt-2">
                 <Button variant="ghost" className="w-full justify-start text-sm font-medium h-10 text-text-secondary hover:bg-background-hover hover:text-text-primary" onClick={() => changeView('about')}>
                    <Info className="mr-3 h-5 w-5 text-text-subtle" />
                    About
                 </Button>
              </CollapsibleContent>
            </Collapsible>
          </ScrollArea>
        </div>
      </div>

      {sidebarOpen && <div className="fixed inset-0 bg-black/60 z-30 md:hidden" onClick={() => setSidebarOpen(false)} />}

      <div className="flex-1 flex flex-col md:ml-0 h-screen">
        <header className="bg-background-header border-b border-border sticky top-0 z-20">
          <div className="flex items-center justify-between px-6 h-16">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                <Button variant="ghost" size="sm" className="font-medium" onClick={() => changeView('home')}>
                   <Home className="h-4 w-4 mr-2" />
                </Button>
                <span className="text-border">/</span>
                <Button variant="ghost" size="sm" className="font-medium" onClick={handleBreadcrumbClick}>
                  {React.createElement(currentViewConfig.icon, { className: "h-4 w-4 mr-2" })}
                  {currentView === 'lesson' ? 'Lessons' : currentView === 'standaloneQuiz' ? 'Quizzes' : currentViewConfig.title}
                </Button>
                {(currentView === 'lesson' || currentView === 'standaloneQuiz') && (
                    <>
                        <span className="text-border">/</span>
                         <span className="font-medium text-text-primary px-2">{currentViewConfig.title}</span>
                    </>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-orange-500 font-medium" title={`Current learning streak: ${userProgress.learningStreak.count} day(s)`}>
                <Flame className="h-5 w-5" />
                <span>{userProgress.learningStreak.count}</span>
              </div>
              <Button variant="ghost" size="icon" className="text-text-subtle hover:text-text-primary" onClick={() => setIsHelpOpen(true)}>
                <HelpCircle className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-text-subtle hover:text-text-primary" onClick={() => setIsSettingsOpen(true)}>
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-background flex flex-col">
          {renderContent()}
        </main>
      </div>
      {isHelpOpen && <HelpModal onClose={() => setIsHelpOpen(false)} />}
      {isSettingsOpen && <SettingsModal 
          onClose={() => setIsSettingsOpen(false)}
          currentTheme={theme}
          onSetTheme={setTheme}
          onResetProgress={handleResetProgress}
        />}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}
