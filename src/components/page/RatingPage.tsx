import { Link } from 'react-router-dom';
import { Trophy, Medal, ChevronLeft, User, TrendingUp } from 'lucide-react';

const RatingPage = () => {
    // Заглушка данных рейтинга
    const ratingData = [
        { id: 1, name: 'Алексей С.', games: 42, winRate: 62, points: 2450, avatar: 'https://i.pravatar.cc/150?img=1' },
        { id: 2, name: 'Дмитрий П.', games: 38, winRate: 55, points: 2100, avatar: 'https://i.pravatar.cc/150?img=2' },
        { id: 3, name: 'Сергей К.', games: 51, winRate: 48, points: 1980, avatar: 'https://i.pravatar.cc/150?img=3' },
        { id: 4, name: 'Анна И.', games: 29, winRate: 72, points: 1850, avatar: 'https://i.pravatar.cc/150?img=4' },
        { id: 5, name: 'Михаил С.', games: 33, winRate: 53, points: 1720, avatar: 'https://i.pravatar.cc/150?img=5' },
        { id: 6, name: 'Екатерина В.', games: 40, winRate: 45, points: 1610, avatar: 'https://i.pravatar.cc/150?img=6' },
        { id: 7, name: 'Игорь Н.', games: 27, winRate: 59, points: 1550, avatar: 'https://i.pravatar.cc/150?img=7' },
        { id: 8, name: 'Ольга Д.', games: 31, winRate: 41, points: 1430, avatar: 'https://i.pravatar.cc/150?img=8' },
    ];

    // Функция для получения иконки места
    const getMedal = (index: number) => {
        if (index === 0) return <Trophy size={20} className="text-[#f5b544]" />;
        if (index === 1) return <Medal size={20} className="text-[#a0a0b0]" />;
        if (index === 2) return <Medal size={20} className="text-orange-600" />;
        return <span className="text-[#a0a0b0] text-sm font-medium w-5 text-center">#{index + 1}</span>;
    };

    return (
        <div className="min-h-screen bg-[#0f0e12] text-[#f0f0f0]">
            {/* Шапка */}
            <header className="bg-[#1a1a24]/80 backdrop-blur-md border-b border-[#2a2a3a] sticky top-0 z-10">
                <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-[#f5b544] rounded-md flex items-center justify-center font-bold text-[#0f0e12] text-lg">♠</div>
                        <span className="text-xl font-bold tracking-tight text-[#f0f0f0]">Poker<span className="text-[#f5b544]">Hub</span></span>
                    </Link>
                    <Link to="/" className="text-[#a0a0b0] hover:text-[#f5b544] transition-colors text-sm flex items-center gap-1">
                        <ChevronLeft size={16} /> На главную
                    </Link>
                </div>
            </header>

            <main className="container mx-auto px-4 py-6 max-w-3xl">
                <div className="flex items-center gap-3 mb-6">
                    <Trophy size={28} className="text-[#f5b544]" />
                    <h1 className="text-2xl font-bold text-[#f0f0f0]">Рейтинг клуба</h1>
                </div>

                {/* Таблица рейтинга */}
                <div className="bg-[#1a1a24] rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.4)] border border-[#2a2a3a] overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-[#2a2a3a]/50 border-b border-[#2a2a3a]">
                                <tr>
                                    <th className="px-4 py-3 text-left text-[#a0a0b0] text-sm font-medium">#</th>
                                    <th className="px-4 py-3 text-left text-[#a0a0b0] text-sm font-medium">Игрок</th>
                                    <th className="px-4 py-3 text-center text-[#a0a0b0] text-sm font-medium hidden sm:table-cell">Игр</th>
                                    <th className="px-4 py-3 text-center text-[#a0a0b0] text-sm font-medium hidden sm:table-cell">Winrate</th>
                                    <th className="px-4 py-3 text-right text-[#a0a0b0] text-sm font-medium">Рейтинг</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#2a2a3a]">
                                {ratingData.map((player, index) => (
                                    <tr key={player.id} className="hover:bg-[#2a2a3a]/30 transition-colors">
                                        <td className="px-4 py-4 text-center">{getMedal(index)}</td>
                                        <td className="px-4 py-4">
                                            <div className="flex items-center gap-3">
                                                <img src={player.avatar} alt={player.name} className="w-8 h-8 rounded-full border border-[#2a2a3a]" />
                                                <span className="font-medium text-[#f0f0f0]">{player.name}</span>
                                                {index === 0 && <span className="bg-[#f5b544]/20 text-[#f5b544] text-xs font-bold px-2 py-0.5 rounded-full">#1</span>}
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-center text-[#a0a0b0] hidden sm:table-cell">{player.games}</td>
                                        <td className="px-4 py-4 text-center hidden sm:table-cell">
                                            <div className="flex items-center justify-center gap-1">
                                                <TrendingUp size={14} className={player.winRate > 50 ? 'text-[#44d47c]' : 'text-[#ff6b6b]'} />
                                                <span className={player.winRate > 50 ? 'text-[#44d47c]' : 'text-[#ff6b6b]'}>{player.winRate}%</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-right font-bold text-[#f5b544]">{player.points}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Информация о рейтинге */}
                <div className="mt-6 bg-[#1a1a24]/50 rounded-lg p-4 border border-[#2a2a3a]/50 text-[#a0a0b0] text-sm">
                    <p className="flex items-center gap-2"><Trophy size={16} className="text-[#f5b544]" /> Рейтинг обновляется после каждой игры. Бонусные очки начисляются за победы в турнирах.</p>
                </div>
            </main>
        </div>
    );
};

export default RatingPage;