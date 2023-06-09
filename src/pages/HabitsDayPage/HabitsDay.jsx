import { useLocation } from "react-router-dom";
import { HabitsDayContainer, HabitContainer, Legenda } from "./styled";

export default function HabitsDay() {
    const location = useLocation();
    const { day, habits } = location.state;

    return (
        <HabitsDayContainer>
            <h1>Hábitos de {day}</h1>
            {
                habits.map(h => (
                    <HabitContainer 
                        done={h.done}
                        key={h.id}>
                        <span>{h.name}</span>
                        <span>{h.highest}</span>
                    </HabitContainer>)
                )
            }
            <Legenda>
                <div>
                    <div></div>
                    <div><span>Completou!</span><ion-icon name="happy-outline"></ion-icon></div>
                </div>
                <div>
                    <div></div>
                    <div><span>Não completou...</span><ion-icon name="sad-outline"></ion-icon></div>
                </div>
            </Legenda>
        </HabitsDayContainer>
    )
}