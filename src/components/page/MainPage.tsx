import { useEffect, useState } from "react"
import SearchIcon from "../icon/SwordIcon"
import ScrollArea from "../layout/ScrollArea"

import TehasImage from "../../assets/texas.png"
import HeaderImage from "../../assets/header.png"
import BackImage from "../../assets/background.png"



interface GameBar {
    id: String
    name: String
}

interface IProps {

}

export const MainPage = (props: IProps) => {
    const [gameList, setGameList] = useState<GameBar[]>([
        { id: "0", name: "Game 1" },
        { id: "1", name: "Game 2" },
        { id: "2", name: "Game 3" },
        { id: "3", name: "Game 4" },
        { id: "4", name: "Game 5" },
        { id: "5", name: "Game 6" },
        { id: "6", name: "Game 7" }])

    useEffect(() => { }, [])


    return (
        <div
            className="flex flex-1 h-screen max-w-[400px] flex-col "
            style={{
                backgroundImage: `url(${BackImage}) `,
                backgroundSize: '100% 100%',
                backgroundPosition: 'top',
                backgroundRepeat: "no-repeat"
            }}
        >
            {/* Header */}
            <div
                className="relative flex flex-col h-[400px] w-full"

            >

                <div className="flex rounded-2xl items-center border justify-center p-2 ">
                    <SearchIcon className="text-white  font-bold" />
                </div>
            </div>
            <ScrollArea className="flex flex-1 w-full ">
                <div className="flex flex-1 flex-col gap-2 text-white font-bold">
                    {gameList.map((item, index) => (
                        <div
                            key={index}
                            className="relative w-full flex flex-col items-center
                             justify-end  border-2 border-amber-700 rounded-2xl bg-cover
                             overflow-hidden h-100"
                            style={{
                                backgroundImage: `url(${TehasImage})`,
                                backgroundSize: "104% 150%",
                                backgroundPosition: 'center top -100px',  // Сдвиг вверх на 100px
                                backgroundRepeat: "no-repeat"
                            }}
                        >
                            <div className="flex flex-col w-full h-40 shadow-[inset_0_-150px_100px_-50px_rgba(0,0,0,0.8)] text-white p-4 z-10">
                                <div className="flex flex-col h-full px-12 gap-4 items-stretch">
                                    <h1>{item.name}</h1>
                                    <h1>{item.name}</h1>
                                </div>
                                <div className="flex items-center justify-center py-3 rounded-2xl border-3 border-orange-800 bg-amber-500">
                                    Регистрация
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </div>
    )
}