import { useEffect, useState } from "react"
import SearchIcon from "../icon/SwordIcon"
import ScrollArea from "../layout/ScrollArea"

import TehasImage from "../../assets/texas.png"
import HeaderImage from "../../assets/header.png"
import BackImage from "../../assets/background.png"
import JockerImage from "../../assets/jockerbounty.png"
import Typography from "../../Typography"
import Button from "../../input/Button"
import { replace, useNavigate } from "react-router-dom"
import type { GameBar } from "../../interfaces/Game"
import { ReadGames } from "../../api/functions"
import type { ResponseContainer } from "../../api/base"
import { Path } from "../../enum/Path"


interface IProps {

}

const MainPage = (props: IProps) => {
    const navigate = useNavigate()
    const [gameList, setGameList] = useState<GameBar[]>([
    ])

    useEffect(() => {
        ReadGames((resp: ResponseContainer<GameBar[]>) => {
            // setIsChecked(true);
            if (resp.status === 'ok') {
                if (resp.data) {
                    setGameList([...resp.data])
                }
            }
        })
    }, [])

    const openGame = (id: String) => {
        console.log(id)
        navigate(Path.PGame + '/' + id)
    }

    return (
        <div
            className="flex flex-1 h-screen max-w-[400px] flex-col "
        // style={{
        //     backgroundImage: `url(${BackImage}) `,
        //     backgroundSize: '100% 100%',
        //     backgroundPosition: 'top',
        //     backgroundRepeat: "no-repeat"
        // }}
        >
            {/* Header */}
            <div className="flex font-bold   bg-[#150f07] items-center justify-center p-2 ">
                {/* <SearchIcon className="text-white  font-bold" /> */}
                <Typography size="h4" className="text-[#c09d36]">PokerHub Club</Typography>
            </div>
            <div
                className="relative flex flex-col h-[400px] pt-6 px-4 w-full "
            >
                <Typography size="h5" className="text-[#5e5e5e] font-extralight">PokerHub</Typography>
                <div className="flex items-start justify-center flex-col">
                    <Typography size="h1" className="text-white " >Спортивный покер —</Typography>
                    <span className="text-[#cb9d33] text-[20px]">это не про деньги</span>
                </div>
                <Typography className="text-[#807f7f] text-[14px] pt-4">Турниры, рейтинги и живое комьюнити. Выбирай <br /> турнир и присоединяйся!</Typography>

                <div className="flex justify-start gap-4 pt-4">
                    <Button size="small">Войти</Button>
                    <Button size="small" variant="tetriary">Зарегистрироваться</Button>
                </div>
                <Typography size="h6" className="text-[#5e5e5e] pt-2 font-extralight">Ближайшие турниры</Typography>
            </div>
            <ScrollArea className="flex flex-1 w-full ">
                <div className="flex flex-1 flex-col gap-2 px-4 text-white font-bold">
                    {gameList.map((item, index) => (
                        <div
                            key={index}
                            className="relative w-full flex flex-col items-center
                             justify-end  border-2 border-amber-600/20 rounded-2xl bg-cover
                             overflow-hidden h-100"
                        >
                            <div className="flex justify-center items-center w-full"><img src={JockerImage} alt="" /></div>
                            <div className="flex flex-col w-full h-40  text-white px-4 pt-1 z-10">
                                <div className="flex flex-col h-full items-stretch">
                                    <Typography size="h4">{item.name}</Typography>
                                    <Typography className="text-[#5e5e5e]" size="h5">{item.player_count}/{item.player_maxcount} участников</Typography>
                                    <Typography className="text-[#c09d36] pt-8" size="h5">Депозит: {item.deposit}₽</Typography>
                                </div>
                                <Button size="big" onClick={() => { console.log(item); openGame(item.id) }}>Регистрация на турнир</Button>
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </div>
    )
}

export default MainPage;