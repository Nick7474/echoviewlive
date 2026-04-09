import { useState } from 'react';
import { 
  Users, 
  HandHelping, 
  MessageSquare, 
  Lightbulb, 
  Target, 
  Heart, 
  Info,
  ChevronRight,
  ArrowRight,
  Globe,
  Star,
  Calendar,
  MapPin,
  Clock,
  Download,
  Award,
  Zap,
  CheckCircle2,
  Megaphone,
  Search,
  Filter,
  Plus,
  ThumbsUp,
  Eye,
  MessageCircle
} from 'lucide-react';
import { motion } from 'motion/react';

export default function CitizenParticipationAction() {
  const [activeTab, setActiveTab] = useState('전체');

  const categories = ['전체', '정책 제안', '시민 토론', '설문 조사', '시민 위원회'];

  const activities = [
    {
      id: 1,
      category: '정책 제안',
      title: '우리 동네 스마트 쓰레기통 설치 확대 제안',
      desc: '상업 지구 주변에 스마트 쓰레기통을 더 많이 설치하여 거리 청결도를 높여주세요.',
      author: '김*명',
      date: '2024.03.20',
      likes: 124,
      views: 1245,
      comments: 12,
      status: '검토 중',
      statusColor: 'bg-blue-100 text-blue-700'
    },
    {
      id: 2,
      category: '시민 토론',
      title: '광명시 탄소중립 실천 포인트 확대 방안 토론',
      desc: '현재 시행 중인 기후의병 포인트 제도를 더 효과적으로 운영하기 위한 시민들의 의견을 구합니다.',
      author: '이*준',
      date: '2024.03.18',
      likes: 86,
      views: 842,
      comments: 45,
      status: '토론 중',
      statusColor: 'bg-emerald-100 text-emerald-700'
    },
    {
      id: 3,
      category: '설문 조사',
      title: '광명시 스마트도시 서비스 만족도 조사',
      desc: '현재 제공되고 있는 스마트도시 서비스에 대한 시민 여러분의 만족도를 조사합니다.',
      author: '관리자',
      date: '2024.03.15',
      likes: 0,
      views: 3240,
      comments: 0,
      status: '진행 중',
      statusColor: 'bg-amber-100 text-amber-700'
    },
    {
      id: 4,
      category: '시민 위원회',
      title: '제3기 광명시 시민참여 위원 모집 안내',
      desc: '광명시의 주요 정책을 함께 고민하고 결정할 시민 위원을 모집합니다.',
      author: '관리자',
      date: '2024.03.10',
      likes: 42,
      views: 1560,
      comments: 8,
      status: '모집 중',
      statusColor: 'bg-purple-100 text-purple-700'
    }
  ];

  return (
    <div className="max-w-[1560px] mx-auto space-y-12 pb-20">
      {/* Header Section */}
      <section className="bg-white rounded-[16px] p-10 shadow-sm border border-line-normal flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="space-y-4 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-black rounded uppercase tracking-widest">
            <Users size={12} /> Citizen Participation
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
            시민 참여 활동
          </h1>
          <p className="text-slate-500 text-lg font-medium max-w-2xl">
            광명시의 정책 결정 과정에 직접 참여하고 의견을 나누는 공간입니다. <br className="hidden lg:block" />
            시민 여러분의 소중한 의견이 광명을 변화시킵니다.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button className="px-8 py-4 bg-[var(--color-primary)] text-white rounded-2xl font-black text-sm hover:bg-[var(--color-primary-hover)] transition-all flex items-center gap-2 shadow-xl shadow-[var(--color-primary)]/20">
            <Plus size={20} /> 제안하기
          </button>
        </div>
      </section>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: '누적 제안 수', value: '1,245', unit: '건', icon: <Lightbulb size={24} />, color: 'text-amber-500', bg: 'bg-amber-50' },
          { label: '진행 중인 토론', value: '12', unit: '건', icon: <MessageSquare size={24} />, color: 'text-blue-500', bg: 'bg-blue-50' },
          { label: '참여 시민 수', value: '12,450', unit: '명', icon: <Users size={24} />, color: 'text-emerald-500', bg: 'bg-emerald-50' },
          { label: '정책 반영률', value: '32.4', unit: '%', icon: <Target size={24} />, color: 'text-indigo-500', bg: 'bg-indigo-50' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white p-8 rounded-[16px] shadow-sm border border-line-normal flex items-center gap-6 group hover:shadow-xl transition-all duration-500">
            <div className={`w-16 h-16 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-slate-900">{stat.value}</span>
                <span className="text-sm font-bold text-slate-400">{stat.unit}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filter & Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-white p-6 rounded-[16px] shadow-sm border border-line-normal">
        <div className="flex bg-slate-50 p-1.5 rounded-xl overflow-x-auto max-w-full">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-6 py-2 rounded-xl text-sm font-black transition-all whitespace-nowrap ${
                activeTab === cat ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-grow md:w-64">
            <input 
              type="text" 
              placeholder="제목, 내용 검색..." 
              className="w-full pl-12 pr-6 py-3 bg-slate-50 border border-line-normal rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-border)]/20 transition-all"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          </div>
          <button className="p-3 bg-slate-50 text-slate-400 rounded-2xl hover:text-emerald-500 transition-colors">
            <Filter size={24} />
          </button>
        </div>
      </div>

      {/* Activities List */}
      <div className="grid grid-cols-1 gap-6">
        {activities.map((activity, idx) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-8 rounded-[16px] shadow-sm border border-line-normal flex flex-col md:flex-row items-start md:items-center justify-between gap-8 group hover:shadow-2xl transition-all duration-500 cursor-pointer"
          >
            <div className="space-y-4 flex-grow">
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 ${activity.statusColor} text-[10px] font-black rounded uppercase tracking-widest`}>
                  {activity.status}
                </span>
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{activity.category}</span>
              </div>
              <div className="space-y-2">
                <h4 className="text-xl font-black text-slate-900 group-hover:text-emerald-600 transition-colors">{activity.title}</h4>
                <p className="text-slate-500 font-medium line-clamp-1">{activity.desc}</p>
              </div>
              <div className="flex items-center gap-6 text-xs font-bold text-slate-400">
                <span className="flex items-center gap-1"><Users size={14} /> {activity.author}</span>
                <span className="flex items-center gap-1"><Calendar size={14} /> {activity.date}</span>
                <div className="flex items-center gap-4 border-l border-line-normal pl-6">
                  <span className="flex items-center gap-1"><ThumbsUp size={14} /> {activity.likes}</span>
                  <span className="flex items-center gap-1"><Eye size={14} /> {activity.views}</span>
                  <span className="flex items-center gap-1"><MessageCircle size={14} /> {activity.comments}</span>
                </div>
              </div>
            </div>
            <button className="w-12 h-12 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center group-hover:bg-[var(--color-primary)] group-hover:text-white transition-all duration-500">
              <ChevronRight size={24} />
            </button>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2 pt-10">
        {[1, 2, 3, 4, 5].map((p) => (
          <button key={p} className={`w-10 h-10 rounded-xl font-black text-sm transition-all ${p === 1 ? 'bg-slate-900 text-white' : 'bg-white text-slate-400 border border-line-normal hover:bg-gray-50'}`}>
            {p}
          </button>
        ))}
      </div>

      {/* Bottom Info */}
      <section className="bg-slate-50 rounded-[16px] p-10 flex flex-col md:flex-row items-center justify-between gap-8 border border-line-normal">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-emerald-500 shadow-sm">
            <Award size={32} />
          </div>
          <div className="space-y-1">
            <h4 className="text-xl font-black text-slate-900">활동 포인트 혜택 안내</h4>
            <p className="text-slate-500 font-medium">제안 및 토론 참여 시 활동 포인트를 지급하며, 우수 제안자에게는 연말 포상을 실시합니다.</p>
          </div>
        </div>
        <button className="px-10 py-4 bg-white border border-line-normal text-slate-900 rounded-2xl font-black text-sm hover:bg-gray-50 transition-all shadow-sm flex items-center gap-2">
          포인트 제도 안내 <ChevronRight size={20} />
        </button>
      </section>
    </div>
  );
}
