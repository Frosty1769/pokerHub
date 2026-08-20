import { Link } from 'react-router-dom';
import { User, Award, BarChart2, Calendar, ChevronRight, LogOut, Settings } from 'lucide-react';

const AccountPage = () => {
    // Заглушка данных пользователя
    const user = {
        name: 'Алексей Смирнов',
        avatar: 'https://i.pravatar.cc/150?img=12',
        rating: 1420,
        rank: 'Золотой игрок',
        gamesPlayed: 37,
        wins: 18,
        winRate: '48%',
        totalEarned: 12450,
        biggestWin: 3200,
    };

    const recentGames = [
        { id: 1, game: 'Texas Hold\'em', date: '18.08.2026', place: 3, winnings: 0 },
        { id: 2, game: 'Omaha Hi-Lo', date: '15.08.2026', place: 1, winnings: 5400 },
        { id: 3, game: 'Texas Hold\'em', date: '12.08.2026', place: 2, winnings: 1200 },
    ];

    return (
        <div className="min-h-screen bg-[#0f0e12] text-[#f0f0f0]">
            {/* Шапка */}
            <header className="bg-[#1a1a24]/80 backdrop-blur-md border-b border-[#2a2a3a] sticky top-0 z-10">
                <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-[#f5b544] rounded-md flex items-center justify-center font-bold text-[#0f0e12] text-lg">♠</div>
                        <span className="text-xl font-bold tracking-tight text-[#f0f0f0]">Poker<span className="text-[#f5b544]">Hub</span></span>
                    </Link>
                    <Link to="/" className="text-[#a0a0b0] hover:text-[#f5b544] transition-colors text-sm">
                        На главную
                    </Link>
                </div>
            </header>

            <main className="container mx-auto px-4 py-6 max-w-3xl">
                {/* Профиль */}
                <div className="bg-[#1a1a24] rounded-xl p-6 shadow-[0_8px_24px_rgba(0,0,0,0.4)] border border-[#2a2a3a] mb-6 flex flex-wrap items-center gap-6">
                    <div className="relative">
                        <img src={user.avatar} alt="Avatar" className="w-24 h-24 rounded-full border-4 border-[#f5b544]" />
                        <span className="absolute bottom-0 right-0 bg-[#44d47c] w-4 h-4 rounded-full border-2 border-[#1a1a24]"></span>
                    </div>
                    <div className="flex-1">
                        <h1 className="text-2xl font-bold text-[#f0f0f0]">{user.name}</h1>
                        <div className="flex flex-wrap items-center gap-3 text-sm">
                            <span className="text-[#f5b544] font-medium">{user.rank}</span>
                            <span className="text-[#a0a0b0]">• Рейтинг: {user.rating}</span>
                        </div>
                        <div className="flex flex-wrap gap-4 mt-2 text-sm">
                            <span className="flex items-center gap-1 text-[#a0a0b0]"><Award size={16} /> Игр: {user.gamesPlayed}</span>
                            <span className="flex items-center gap-1 text-[#44d47c]"><Award size={16} /> Побед: {user.wins}</span>
                            <span className="flex items-center gap-1 text-[#a0a0b0]"><BarChart2 size={16} /> Winrate: {user.winRate}</span>
                        </div>
                    </div>
                    <div className="flex gap-2 self-start">
                        <button className="p-2 bg-[#2a2a3a] rounded-lg hover:bg-[#2a2a3a]/70 transition-colors">
                            <Settings size={20} className="text-[#a0a0b0]" />
                        </button>
                        <button className="p-2 bg-[#2a2a3a] rounded-lg hover:bg-red-500/20 transition-colors">
                            <LogOut size={20} className="text-[#ff6b6b]" />
                        </button>
                    </div>
                </div>

                {/* Статистика */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                    <div className="bg-[#1a1a24] rounded-lg p-4 text-center border border-[#2a2a3a]">
                        <p className="text-[#a0a0b0] text-xs">Всего заработано</p>
                        <p className="text-xl font-bold text-[#44d47c]">{user.totalEarned} ₽</p>
                    </div>
                    <div className="bg-[#1a1a24] rounded-lg p-4 text-center border border-[#2a2a3a]">
                        <p className="text-[#a0a0b0] text-xs">Крупный выигрыш</p>
                        <p className="text-xl font-bold text-[#f5b544]">{user.biggestWin} ₽</p>
                    </div>
                    <div className="bg-[#1a1a24] rounded-lg p-4 text-center border border-[#2a2a3a]">
                        <p className="text-[#a0a0b0] text-xs">Место в клубе</p>
                        <p className="text-xl font-bold text-[#f0f0f0]">#12</p>
                    </div>
                    <div className="bg-[#1a1a24] rounded-lg p-4 text-center border border-[#2a2a3a]">
                        <p className="text-[#a0a0b0] text-xs">Текущая серия</p>
                        <p className="text-xl font-bold text-[#f5b544]">3</p>
                    </div>
                </div>

                {/* Недавние игры */}
                <div className="bg-[#1a1a24] rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.4)] border border-[#2a2a3a] overflow-hidden">
                    <div className="px-6 py-4 border-b border-[#2a2a3a] flex justify-between items-center">
                        <h2 className="text-lg font-semibold flex items-center gap-2 text-[#f0f0f0]">
                            <Calendar size={20} className="text-[#f5b544]" /> История игр
                        </h2>
                        <button className="text-[#f5b544] text-sm hover:underline">Показать все</button>
                    </div>
                    <div className="divide-y divide-[#2a2a3a]">
                        {recentGames.map((game, index) => (
                            <div key={index} className="px-6 py-3 flex flex-wrap justify-between items-center gap-2">
                                <div>
                                    <p className="font-medium text-[#f0f0f0]">{game.game}</p>
                                    <p className="text-[#a0a0b0] text-xs">{game.date}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className={`text-sm font-medium ${game.place === 1 ? 'text-[#f5b544]' : 'text-[#a0a0b0]'}`}>
                                        {game.place === 1 ? '🥇' : game.place === 2 ? '🥈' : game.place === 3 ? '🥉' : `${game.place}-е`}
                                    </span>
                                    <span className={`text-sm font-bold ${game.winnings > 0 ? 'text-[#44d47c]' : 'text-[#ff6b6b]'}`}>
                                        {game.winnings > 0 ? `+${game.winnings}` : game.winnings} ₽
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AccountPage;