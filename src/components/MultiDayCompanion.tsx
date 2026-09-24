import React, { useState } from 'react';
import { Sparkles, Calendar, Heart, ChevronLeft, ChevronRight, Gift } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';

interface DayMessage {
  day: number;
  title: string;
  subtitle: string;
  content: string;
  accent: string;
  iconText: string;
}

const DAILY_MESSAGES: DayMessage[] = [
  {
    day: 1,
    title: '第一天 · 坏情绪清零日',
    subtitle: '旧事翻篇，大步向前',
    content: '所有的糟糕都留在昨天，今天先去吃一顿最喜欢的美食吧！不顺心的事别往心里放，爱你的人都在为你托底。',
    accent: 'from-amber-500/20 to-orange-500/20 border-amber-400/40 text-amber-200',
    iconText: '🍃',
  },
  {
    day: 2,
    title: '第二天 · 收集阳光日',
    subtitle: '抬头看，万物皆有裂隙，那是光照进来的地方',
    content: '今天出门别走太急，抬头看看天上的云。如果感到疲惫，就放慢脚步，阳光会为你拂去所有阴霾。',
    accent: 'from-yellow-500/20 to-amber-500/20 border-yellow-400/40 text-yellow-200',
    iconText: '☀️',
  },
  {
    day: 3,
    title: '第三天 · 做自己最酷日',
    subtitle: '不必符合所有人的期待',
    content: '你不需要总是那么坚强或者完美，做真实、轻松的自己就足够耀眼。今天只取悦自己，做一件让自己开心的事！',
    accent: 'from-pink-500/20 to-rose-500/20 border-pink-400/40 text-pink-200',
    iconText: '💖',
  },
  {
    day: 4,
    title: '第四天 · 能量满格日',
    subtitle: '生活常有小惊喜，正悄悄奔向你',
    content: '今天会有一件让你嘴角微微上扬的小确幸发生！可能是一杯好喝的饮料，或是一阵刚刚好吹过的晚风。',
    accent: 'from-emerald-500/20 to-teal-500/20 border-emerald-400/40 text-emerald-200',
    iconText: '🍀',
  },
  {
    day: 5,
    title: '第五天 · 深度休息日',
    subtitle: '累了就安心睡一大觉',
    content: '世界很大，烦心事很小，什么都比不上你睡个好觉。把手机调静音，好好拥抱被窝，明天又是崭新的一天。',
    accent: 'from-blue-500/20 to-cyan-500/20 border-blue-400/40 text-blue-200',
    iconText: '🌙',
  },
  {
    day: 6,
    title: '第六天 · 被爱包围日',
    subtitle: '你比想象中更加值得被爱',
    content: '任何时候感到孤独，请记住有很多人在默默牵挂着你、真诚地爱你。你的快乐对爱你的我们来说特别重要。',
    accent: 'from-purple-500/20 to-indigo-500/20 border-purple-400/40 text-purple-200',
    iconText: '✨',
  },
  {
    day: 7,
    title: '第七天 · 奔赴热爱日',
    subtitle: '岁岁常欢愉，万事皆胜意',
    content: '去见想见的人，去做想做的事！带着满满的爱与底气出发，新的一岁，愿 JING YI 一路繁花，天天开心！',
    accent: 'from-rose-500/20 to-amber-500/20 border-rose-400/40 text-rose-200',
    iconText: '🎂',
  },
];

export const MultiDayCompanion: React.FC<{ recipientName: string }> = ({ recipientName }) => {
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [openedDays, setOpenedDays] = useState<number[]>([1]);

  const currentMsg = DAILY_MESSAGES.find((m) => m.day === selectedDay) || DAILY_MESSAGES[0];

  const handleSelectDay = (day: number) => {
    setSelectedDay(day);
    sound.playChime(700 + day * 40, 0.4);
    if (!openedDays.includes(day)) {
      setOpenedDays((prev) => [...prev, day]);
      confetti({
        particleCount: 25,
        spread: 50,
        origin: { y: 0.65 },
        colors: ['#ffeaa7', '#fd79a8', '#a29bfe'],
        scalar: 0.8,
      });
    }
  };

  const handleNext = () => {
    if (selectedDay < 7) handleSelectDay(selectedDay + 1);
  };

  const handlePrev = () => {
    if (selectedDay > 1) handleSelectDay(selectedDay - 1);
  };

  return (
    <div className="w-full my-6 flex flex-col items-center select-none">
      {/* Container Card */}
      <div className="w-full rounded-3xl glass-panel p-5 sm:p-7 border border-amber-300/30 shadow-[0_15px_45px_rgba(0,0,0,0.6)]">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-amber-400/20 border border-amber-300/40 flex items-center justify-center text-amber-300">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-1.5">
                写给 {recipientName} 的多天暖心小笺
              </h3>
              <p className="text-[11px] text-amber-200/70">
                每天拆开一封，愿你天天都被爱意与快乐包围
              </p>
            </div>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-white/10 border border-white/15 text-amber-300">
            {selectedDay} / 7
          </span>
        </div>

        {/* Day Selector Pills */}
        <div className="grid grid-cols-7 gap-1.5 sm:gap-2 mb-5">
          {DAILY_MESSAGES.map((item) => {
            const isSelected = item.day === selectedDay;
            const isOpened = openedDays.includes(item.day);
            return (
              <button
                key={item.day}
                type="button"
                onClick={() => handleSelectDay(item.day)}
                className={`py-2 px-1 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 border ${
                  isSelected
                    ? 'bg-gradient-to-b from-amber-400 to-amber-500 text-black border-amber-200 font-bold shadow-[0_0_15px_rgba(255,200,80,0.5)] scale-105'
                    : isOpened
                    ? 'bg-white/10 text-white/90 border-white/20 hover:bg-white/15'
                    : 'bg-black/30 text-white/40 border-white/5 hover:border-white/20'
                }`}
              >
                <span className="text-[10px] opacity-80 leading-none">DAY</span>
                <span className="text-xs sm:text-sm font-semibold mt-0.5">{item.day}</span>
                <span className="text-[11px] mt-0.5">{item.iconText}</span>
              </button>
            );
          })}
        </div>

        {/* Letter Card Display */}
        <div className={`p-4 sm:p-5 rounded-2xl bg-gradient-to-br ${currentMsg.accent} border backdrop-blur-md transition-all duration-500 shadow-inner`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs sm:text-sm font-bold tracking-wide flex items-center gap-1.5">
              <span>{currentMsg.iconText}</span>
              <span>{currentMsg.title}</span>
            </span>
            <span className="text-[11px] opacity-75">{currentMsg.subtitle}</span>
          </div>

          <p className="text-sm sm:text-base font-serif-sc leading-relaxed my-3 text-white/95">
            {currentMsg.content}
          </p>

          <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[11px] text-white/70">
            <span className="flex items-center gap-1">
              <Heart className="w-3 h-3 text-pink-400 fill-pink-400/60" />
              不管哪一天，都愿你开开心心
            </span>
            <span className="opacity-60">TO: {recipientName}</span>
          </div>
        </div>

        {/* Navigation Arrows */}
        <div className="flex items-center justify-between mt-4 px-1">
          <button
            type="button"
            onClick={handlePrev}
            disabled={selectedDay === 1}
            className={`px-3 py-1.5 rounded-xl border flex items-center gap-1 text-xs transition-all ${
              selectedDay === 1
                ? 'opacity-30 border-white/5 cursor-not-allowed'
                : 'bg-white/10 border-white/20 hover:bg-white/20 text-white'
            }`}
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>前一天</span>
          </button>

          <div className="flex items-center gap-1 text-[11px] text-amber-200/80">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>点击上方天数直接翻阅</span>
          </div>

          <button
            type="button"
            onClick={handleNext}
            disabled={selectedDay === 7}
            className={`px-3 py-1.5 rounded-xl border flex items-center gap-1 text-xs transition-all ${
              selectedDay === 7
                ? 'opacity-30 border-white/5 cursor-not-allowed'
                : 'bg-white/10 border-white/20 hover:bg-white/20 text-white'
            }`}
          >
            <span>后一天</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
