import { useEffect, useState } from "react"
import Typography from "../../Typography"
import JockerImage from "../../assets/jockerbounty.png"
import Button from "../../input/Button"
import { useLocation, useNavigate } from "react-router-dom"
import type { GameBar } from "../../interfaces/Game"
import { ReadGame } from "../../api/functions"
import type { ResponseContainer } from "../../api/base"

interface IProps {
}

export const GamePage = (props: IProps) => {
    const [game, setGame] = useState<GameBar>()
    const navigate = useNavigate()
    const path = useLocation().pathname;


    const openMenu = () => {
        navigate("/home", { replace: true })
    }

    useEffect(() => {
        ReadGame(path.split("/").slice(-1)[0], (resp: ResponseContainer<GameBar>) => {
            // setIsChecked(true);
            if (resp.status === 'ok') {
                if (resp.data) {
                    setGame(resp.data)
                }
            }
        })
    }, [])

    return (
        <>
            {game && <div
                className="flex flex-1 h-screen max-w-[400px] flex-col bg-[#0c0905]"
            >
                <div className="flex relative font-bold bg-[#150f07] items-center justify-center p-2 ">
                    {/* <SearchIcon className="text-white  font-bold" /> */}
                    <Typography size="h4" className="text-[#c09d36]">PokerHub Club</Typography>
                    <div className="absolute left-4 w-10">
                        <Button onClick={openMenu} size="small">{"\<—"}</Button>
                    </div>
                </div>
                <div className="flex flex-col gap-2 px-6">
                    <div className="flex justify-center items-center w-full">
                        <img src={JockerImage} alt="" />
                    </div>
                    <div className="flex flex-col  px-4 py-4 justify-center border-2 border-amber-600/20 rounded-2xl ">
                        <Button size="big">Записаться</Button>
                        <Typography className="text-[#807f7f] text-[14px] pt-4">Войди или зарегистрироваться - запись завершится автоматически</Typography>
                    </div>
                    <div className="grid grid-cols-2 gap-2 pt-2">
                        <div className="flex flex-col justify-center items-center border-2 border-amber-600/20 rounded-2xl  py-2">
                            <Typography className="text-[#e5e5e5] text-[18px]">{game.deposit}₽</Typography>
                            <Typography className="text-[#807f7f] text-[14px]">ОРГ.ВЗНОС</Typography>
                        </div>
                        <div className="flex flex-col justify-center items-center border-2 border-amber-600/20 rounded-2xl  py-2">
                            <Typography className="text-[#e5e5e5] text-[18px]">{game.deposit}₽</Typography>
                            <Typography className="text-[#807f7f] text-[14px]">РЕ-ЭНТРИ</Typography>
                        </div>
                        <div className="flex flex-col justify-center items-center border-2 border-amber-600/20 rounded-2xl  py-2">
                            <Typography className="text-[#e5e5e5] text-[18px]">{game.deposit * 4}₽</Typography>
                            <Typography className="text-[#807f7f] text-[14px]">СТАРТОВЫЙ СТЕК</Typography>
                        </div>
                        <div className="flex flex-col justify-center items-center border-2 border-amber-600/20 rounded-2xl  py-2">
                            <Typography className="text-[#e5e5e5] text-[18px]">{game.player_count}/{game.player_maxcount}</Typography>
                            <Typography className="text-[#807f7f] text-[14px]">УЧАСТНИКИ</Typography>
                        </div>
                    </div>
                    <div className="flex flex-col py-2 px-4  justify-center border-2 border-amber-600/20 rounded-2xl ">
                        <Typography className="text-[#c09d36] text-[16px]">Описание:</Typography>
                        <Typography className="text-[#807f7f] text-[16px]">{game.description}</Typography>
                    </div>
                </div>
            </div>}
        </>
    )
}