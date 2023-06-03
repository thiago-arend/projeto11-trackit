import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/NavBar/NavBar";
import AddHabitPreview from "../../components/AddHabitPreview/AddHabitPreview";
import AddHabit from "../../components/AddHabit/AddHabit";
import HabitsCreationStatus from "../../components/HabitsCreationStatus/HabitsCreationStatus";
import HabitPlanning from "../../components/HabitPlanning/HabitPlanning";
import { MyHabitsContainer } from "./styled";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { URL_BASE } from "../../constants";
import { UserContext } from "../../contexts/UserContext";

export default function MyHabits() {
    const {preparaConfig} = useContext(UserContext);
    const [showAddHabit, setShowAddHabit] = useState(false);
    const [listaHabitos, setListaHabitos] = useState(null);

    console.log(listaHabitos);

    useEffect(() => {

        axios.get(`${URL_BASE}/habits`, preparaConfig())
            .then((res) => {
                console.log(res);
                setListaHabitos(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (

        <MyHabitsContainer>
            <AddHabitPreview setShowAddHabit={setShowAddHabit} />
            {(showAddHabit) && <AddHabit />}
            {/*<HabitPlanning />*/}
            <HabitsCreationStatus />
        </MyHabitsContainer>
    );
}